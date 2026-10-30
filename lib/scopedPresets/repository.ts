import { readSavedFilters, SAVED_FILTERS_KEY } from "../savedFilters";

export const SCOPED_PRESETS_KEY = "gta.scopedPresets.v2";
export type PresetScope = "browse" | "teen-activities" | "youth-guide";
export interface AtomicPresetStorage {
  read(key: string): Promise<string | null>;
  /** Optional browser path that also avoids creating a missing database. */
  readExisting?(key: string): Promise<string | null>;
  compareAndSwap(key: string, expected: string | null, replacement: string): Promise<boolean>;
}
export interface ScopedPreset<C> {
  id: string;
  revision: number;
  name: string;
  scope: PresetScope;
  criteria: C;
  createdAt: string;
  updatedAt: string;
}
export interface ScopedPresetArchive<C> {
  schemaVersion: 2;
  revision: number;
  presets: ScopedPreset<C>[];
  /** Exact read-only v1 snapshots. Migration never writes the old storage key. */
  legacyBackups: { raw: string | null; seenAt: string }[];
}
export type PresetError = "read-failed" | "invalid-archive" | "invalid-preset" | "write-failed" | "conflict" | "legacy-changed" | "not-found" | "limit-reached";
export type PresetResult<T> = { ok: true; value: T } | { ok: false; error: PresetError };
export type PresetSnapshot<C> = { archive: ScopedPresetArchive<C>; legacyChanged: boolean; observedLegacyRaw: string | null };
type LegacyReader = Pick<Storage, "getItem">;
const MAX_BYTES = 2_000_000;
// Match the v1 decoder's UTF-16 limit; do not reject a valid Unicode archive
// merely because its UTF-8 byte count is larger than its character count.
const MAX_LEGACY_CHARACTERS = 512_000;
const MAX_PRESETS = 100;
const scopes: PresetScope[] = ["browse", "teen-activities", "youth-guide"];
const object = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const bytes = (s: string) => new TextEncoder().encode(s).length;
const instant = (v: unknown): v is string => typeof v === "string" && Number.isFinite(Date.parse(v));
const canonicalInstant = (v: string) => instant(v) && new Date(v).toISOString() === v;
const identity = (v: unknown): v is string => typeof v === "string" && /^[a-zA-Z0-9-]{1,80}$/.test(v);
const revision = (v: unknown): v is number => Number.isSafeInteger(v) && (v as number) > 0;
const exactKeys = (v: Record<string, unknown>, keys: string[]) => Object.keys(v).length === keys.length && keys.every(k => Object.hasOwn(v, k));
function name(value: unknown): string {
  if (typeof value !== "string" || !value.trim() || [...value.trim()].length > 80) throw new Error("name");
  return value.trim();
}
const failure = (error: PresetError): { ok: false; error: PresetError } => ({ ok: false, error });

/** Metadata/storage foundation only. A production caller MUST supply the strict,
 * scope-aware criteria decoder after the canonical support/youth contracts land.
 * No permissive default decoder, UI wiring or automatic service is supplied here.
 */
export function createScopedPresetRepository<C>(
  storage: AtomicPresetStorage,
  legacyStorage: LegacyReader,
  parseCriteria: (scope: PresetScope, value: unknown) => C
) {
  function parseArchive(raw: string): ScopedPresetArchive<C> {
    if (bytes(raw) > MAX_BYTES) throw new Error("size");
    const value: unknown = JSON.parse(raw);
    if (!object(value) || !exactKeys(value, ["schemaVersion", "revision", "presets", "legacyBackups"]) || value.schemaVersion !== 2 || !revision(value.revision) ||
        !Array.isArray(value.presets) || value.presets.length > MAX_PRESETS || !Array.isArray(value.legacyBackups) || value.legacyBackups.length < 1 || value.legacyBackups.length > 20) throw new Error("archive");
    const presets = value.presets.map((item): ScopedPreset<C> => {
      if (!object(item) || !exactKeys(item, ["id", "revision", "name", "scope", "criteria", "createdAt", "updatedAt"]) || !identity(item.id) || !revision(item.revision) ||
          !scopes.includes(item.scope as PresetScope) || !instant(item.createdAt) || !instant(item.updatedAt) || Date.parse(item.createdAt) > Date.parse(item.updatedAt)) throw new Error("preset");
      return { id: item.id, revision: item.revision, name: name(item.name), scope: item.scope as PresetScope,
        criteria: parseCriteria(item.scope as PresetScope, item.criteria), createdAt: item.createdAt, updatedAt: item.updatedAt };
    });
    if (new Set(presets.map(p => p.id)).size !== presets.length) throw new Error("duplicate ID");
    const names = presets.map(p => `${p.scope}:${p.name.normalize("NFKC").toLowerCase()}`);
    if (new Set(names).size !== names.length) throw new Error("duplicate name");
    const legacyBackups = value.legacyBackups.map(item => {
      if (!object(item) || !exactKeys(item, ["raw", "seenAt"]) || (item.raw !== null && (typeof item.raw !== "string" || item.raw.length > MAX_LEGACY_CHARACTERS)) ||
          typeof item.seenAt !== "string" || !canonicalInstant(item.seenAt)) throw new Error("legacy backup");
      return { raw: item.raw as string | null, seenAt: item.seenAt };
    });
    return { schemaVersion: 2, revision: value.revision, presets, legacyBackups };
  }
  function legacyRaw(): string | null {
    const raw = legacyStorage.getItem(SAVED_FILTERS_KEY);
    if (raw !== null && raw.length > MAX_LEGACY_CHARACTERS) throw new Error("legacy size");
    return raw;
  }
  async function commit(prior: string | null, archive: ScopedPresetArchive<C>): Promise<PresetResult<ScopedPresetArchive<C>>> {
    let raw: string;
    try { raw = JSON.stringify(archive); archive = parseArchive(raw); }
    catch { return failure("invalid-preset"); }
    try {
      if (!await storage.compareAndSwap(SCOPED_PRESETS_KEY, prior, raw)) return failure("conflict");
    } catch { return failure("write-failed"); }
    return { ok: true, value: archive };
  }
  async function read(now: string): Promise<PresetResult<{ raw: string; snapshot: PresetSnapshot<C> }>> {
    if (!canonicalInstant(now)) return failure("invalid-preset");
    let raw: string | null, observedLegacyRaw: string | null;
    try { raw = await storage.read(SCOPED_PRESETS_KEY); observedLegacyRaw = legacyRaw(); }
    catch { return failure("read-failed"); }
    if (raw === null) {
      let archive: ScopedPresetArchive<C>;
      try {
        // Normalise only through the existing strict v1 decoder, preserving IDs,
        // names, creation/update dates and the original bytes in the same commit.
        const records = readSavedFilters({ getItem: () => observedLegacyRaw });
        archive = { schemaVersion: 2, revision: 1, legacyBackups: [{ raw: observedLegacyRaw, seenAt: now }], presets: records.map(p => {
          const scope = p.highSchool ? "teen-activities" : "browse";
          return { id: p.id, revision: 1, name: p.name, scope, criteria: parseCriteria(scope, p.filters), createdAt: p.createdAt, updatedAt: p.updatedAt };
        }) };
      } catch { return failure("invalid-archive"); }
      const imported = await commit(null, archive);
      if (!imported.ok) return imported;
      // Read the committed bytes, not a re-serialised decoder result. Another
      // tab may already have made a valid update after the import transaction.
      try { raw = await storage.read(SCOPED_PRESETS_KEY); }
      catch { return failure("read-failed"); }
      if (raw === null) return failure("read-failed");
    }
    let archive: ScopedPresetArchive<C>;
    try { archive = parseArchive(raw); } catch { return failure("invalid-archive"); }
    // localStorage and IndexedDB cannot share a transaction. A later old-client
    // write is detected on the next read, never silently merged into this archive.
    return { ok: true, value: { raw, snapshot: { archive, observedLegacyRaw,
      legacyChanged: archive.legacyBackups[archive.legacyBackups.length - 1].raw !== observedLegacyRaw } } };
  }
  /** Read existing v2 bytes only. Home shortcuts must never trigger migration. */
  async function peek(): Promise<PresetResult<ScopedPresetArchive<C> | null>> {
    let raw: string | null;
    try { raw = await (storage.readExisting ? storage.readExisting(SCOPED_PRESETS_KEY) : storage.read(SCOPED_PRESETS_KEY)); }
    catch { return failure("read-failed"); }
    if (raw === null) return { ok: true, value: null };
    try { return { ok: true, value: parseArchive(raw) }; }
    catch { return failure("invalid-archive"); }
  }
  async function load(now: string): Promise<PresetResult<PresetSnapshot<C>>> {
    const result = await read(now);
    return result.ok ? { ok: true, value: result.value.snapshot } : result;
  }
  async function save(input: { id: string; name: string; scope: PresetScope; criteria: unknown }, now: string, expectedRevision?: number): Promise<PresetResult<ScopedPresetArchive<C>>> {
    let criteria: C, presetName: string;
    try {
      if (!identity(input.id) || !scopes.includes(input.scope)) return failure("invalid-preset");
      criteria = parseCriteria(input.scope, input.criteria); presetName = name(input.name);
    } catch { return failure("invalid-preset"); }
    const loaded = await read(now);
    if (!loaded.ok) return loaded;
    const { archive, legacyChanged } = loaded.value.snapshot;
    if (legacyChanged) return failure("legacy-changed");
    const previous = archive.presets.find(p => p.id === input.id);
    if (!previous && expectedRevision !== undefined) return failure("not-found");
    if (previous && previous.revision !== expectedRevision) return failure("conflict");
    if (previous && (previous.scope !== input.scope || Date.parse(previous.updatedAt) > Date.parse(now))) return failure("invalid-preset");
    if (!previous && archive.presets.length >= MAX_PRESETS) return failure("limit-reached");
    if (archive.presets.some(p => p.id !== input.id && p.scope === input.scope && p.name.normalize("NFKC").toLowerCase() === presetName.normalize("NFKC").toLowerCase())) return failure("invalid-preset");
    const preset: ScopedPreset<C> = { id: input.id, revision: (previous?.revision ?? 0) + 1, name: presetName, scope: input.scope, criteria,
      createdAt: previous?.createdAt ?? now, updatedAt: now };
    return commit(loaded.value.raw, { ...archive, revision: archive.revision + 1,
      presets: previous ? archive.presets.map(p => p.id === preset.id ? preset : p) : [...archive.presets, preset] });
  }
  async function remove(id: string, expectedRevision: number, now: string): Promise<PresetResult<ScopedPresetArchive<C>>> {
    const loaded = await read(now);
    if (!loaded.ok) return loaded;
    const { archive, legacyChanged } = loaded.value.snapshot;
    if (legacyChanged) return failure("legacy-changed");
    const previous = archive.presets.find(p => p.id === id);
    if (!previous) return failure("not-found");
    if (previous.revision !== expectedRevision) return failure("conflict");
    return commit(loaded.value.raw, { ...archive, revision: archive.revision + 1, presets: archive.presets.filter(p => p.id !== id) });
  }
  /** Explicit recovery: keep current v2 presets, back up the exact observed old
   * archive, then recognise it. Never overwrite v2 edits with older tab criteria.
   * The UI must explain this choice and retain any unsaved draft on failure. */
  async function keepCurrentAfterLegacyChange(observedLegacyRaw: string | null, expectedArchiveRevision: number, now: string): Promise<PresetResult<ScopedPresetArchive<C>>> {
    const loaded = await read(now);
    if (!loaded.ok) return loaded;
    const { archive, observedLegacyRaw: current } = loaded.value.snapshot;
    if (archive.revision !== expectedArchiveRevision || current !== observedLegacyRaw) return failure("conflict");
    if (!loaded.value.snapshot.legacyChanged) return { ok: true, value: archive };
    if (archive.legacyBackups.length >= 20) return failure("limit-reached");
    return commit(loaded.value.raw, { ...archive, revision: archive.revision + 1,
      legacyBackups: [...archive.legacyBackups, { raw: current, seenAt: now }] });
  }
  return { peek, load, save, remove, keepCurrentAfterLegacyChange };
}
