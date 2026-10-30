import { validLocalDate, validTimestamp } from "./model";

export const NOTEBOOK_KEY = "gta.highSchool.actualMinutes.v1";
export const MAX_NOTEBOOK_BYTES = 2_000_000;
export interface HoursEntry {
  id: string;
  revision: number;
  curatedRoleId?: string;
  provider: string;
  role: string;
  activityLocalDate: string;
  actualMinutes: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
export interface HoursArchive { schemaVersion: 1; entries: HoursEntry[] }
export type NotebookError = "read-failed" | "invalid-archive" | "invalid-entry" | "write-failed" | "conflict" | "not-found";
export type NotebookResult<T> = { ok: true; value: T } | { ok: false; error: NotebookError };

/** Platform adapter MUST serialize CAS across all writers and acknowledge only durable
 * commits. A plain localStorage get/set pair does not meet this contract. Web UI
 * must supply an exclusive-lock adapter; native adapters can use an atomic file/DB.
 * No platform storage, account, telemetry or background work is started here. */
export interface AtomicNotebookStorage {
  read(key: string): Promise<string | null>;
  compareAndSwap(key: string, expected: string | null, replacement: string): Promise<boolean>;
}
const idPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const byteLength = (s: string) => new TextEncoder().encode(s).length;
const bounded = (s: unknown, max: number, allowEmpty = false): s is string => typeof s === "string" && s.length <= max && (allowEmpty || s.trim().length > 0);
function validateEntry(input: unknown, today: string): HoursEntry {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("entry");
  const x = input as HoursEntry;
  const keys = ["id", "revision", "curatedRoleId", "provider", "role", "activityLocalDate", "actualMinutes", "notes", "createdAt", "updatedAt"];
  if (Object.keys(x).some(k => !keys.includes(k)) || !idPattern.test(x.id) || !Number.isSafeInteger(x.revision) || x.revision < 1 ||
      !bounded(x.provider, 160) || !bounded(x.role, 160) || !bounded(x.notes, 2000, true) ||
      (x.curatedRoleId !== undefined && !bounded(x.curatedRoleId, 120)) ||
      !validLocalDate(x.activityLocalDate) || x.activityLocalDate > today ||
      !Number.isSafeInteger(x.actualMinutes) || x.actualMinutes < 1 || x.actualMinutes > 1440 ||
      !validTimestamp(x.createdAt) || !validTimestamp(x.updatedAt) || Date.parse(x.createdAt) > Date.parse(x.updatedAt)) throw new Error("entry");
  return { ...x };
}
export function parseHoursArchive(raw: string | null, today: string): HoursArchive {
  if (!validLocalDate(today)) throw new Error("today");
  if (raw === null) return { schemaVersion: 1, entries: [] };
  if (byteLength(raw) > MAX_NOTEBOOK_BYTES) throw new Error("size");
  const x = JSON.parse(raw) as HoursArchive;
  if (!x || x.schemaVersion !== 1 || Object.keys(x).some(k => !["schemaVersion", "entries"].includes(k)) || !Array.isArray(x.entries) || x.entries.length > 2000) throw new Error("archive");
  const entries = x.entries.map(e => validateEntry(e, today));
  if (new Set(entries.map(e => e.id)).size !== entries.length) throw new Error("duplicate ID");
  const daily = new Map<string, number>();
  for (const e of entries) {
    const total = (daily.get(e.activityLocalDate) ?? 0) + e.actualMinutes;
    if (total > 1440) throw new Error("more than a day");
    daily.set(e.activityLocalDate, total);
  }
  return { schemaVersion: 1, entries };
}
async function read(storage: AtomicNotebookStorage, today: string): Promise<NotebookResult<{ raw: string | null; archive: HoursArchive }>> {
  let raw: string | null;
  try { raw = await storage.read(NOTEBOOK_KEY); } catch { return { ok: false, error: "read-failed" }; }
  try { return { ok: true, value: { raw, archive: parseHoursArchive(raw, today) } }; }
  catch { return { ok: false, error: "invalid-archive" }; }
}
export async function loadHoursNotebook(storage: AtomicNotebookStorage, today: string): Promise<NotebookResult<HoursArchive>> {
  const result = await read(storage, today);
  return result.ok ? { ok: true, value: result.value.archive } : result;
}
async function commit(storage: AtomicNotebookStorage, prior: string | null, next: HoursArchive, today: string): Promise<NotebookResult<HoursArchive>> {
  const raw = JSON.stringify(next);
  try { parseHoursArchive(raw, today); } catch { return { ok: false, error: "invalid-entry" }; }
  try {
    if (!await storage.compareAndSwap(NOTEBOOK_KEY, prior, raw)) return { ok: false, error: "conflict" };
  } catch { return { ok: false, error: "write-failed" }; }
  return { ok: true, value: next };
}
/** Caller supplies actual completed minutes and an opaque ID; no provider estimate
 * or scheduled commitment is ever converted into recorded credit. */
export async function saveHoursEntry(storage: AtomicNotebookStorage, input: HoursEntry, today: string, expectedRevision?: number): Promise<NotebookResult<HoursArchive>> {
  let entry: HoursEntry;
  try { entry = validateEntry(input, today); } catch { return { ok: false, error: "invalid-entry" }; }
  const loaded = await read(storage, today);
  if (!loaded.ok) return loaded;
  const { archive, raw } = loaded.value;
  const existing = archive.entries.find(e => e.id === entry.id);
  if (existing && expectedRevision !== existing.revision) return { ok: false, error: "conflict" };
  if ((!existing && entry.revision !== 1) || (existing && entry.revision !== existing.revision + 1)) return { ok: false, error: "invalid-entry" };
  if (!existing && expectedRevision !== undefined) return { ok: false, error: "not-found" };
  if (existing && (existing.createdAt !== entry.createdAt || Date.parse(entry.updatedAt) < Date.parse(existing.updatedAt))) return { ok: false, error: "invalid-entry" };
  const entries = existing ? archive.entries.map(e => e.id === entry.id ? entry : e) : [...archive.entries, entry];
  return commit(storage, raw, { schemaVersion: 1, entries }, today);
}
export async function deleteHoursEntry(storage: AtomicNotebookStorage, id: string, today: string, expectedRevision: number): Promise<NotebookResult<HoursArchive>> {
  const loaded = await read(storage, today);
  if (!loaded.ok) return loaded;
  const existing = loaded.value.archive.entries.find(e => e.id === id);
  if (!existing) return { ok: false, error: "not-found" };
  if (expectedRevision !== existing.revision) return { ok: false, error: "conflict" };
  return commit(storage, loaded.value.raw, { schemaVersion: 1, entries: loaded.value.archive.entries.filter(e => e.id !== id) }, today);
}
export function recordedMinutes(archive: HoursArchive, today: string): number {
  return parseHoursArchive(JSON.stringify(archive), today).entries.reduce((sum, e) => sum + e.actualMinutes, 0);
}
export function formatRecordedMinutes(minutes: number): { hours: number; minutes: number } {
  if (!Number.isSafeInteger(minutes) || minutes < 0) throw new Error("Invalid actual minutes");
  return { hours: Math.floor(minutes / 60), minutes: minutes % 60 };
}
const csvCell = (value: string) => `"${value.replace(/"/g, '""')}"`;
/** Every user-controlled text cell is text-prefixed, even after whitespace/BOM.
 * CSV quoting alone does not prevent spreadsheet formula execution. */
const userCell = (value: string) => csvCell(`'${value}`);
export function exportHoursCsv(archive: HoursArchive, today: string): string {
  const rows = parseHoursArchive(JSON.stringify(archive), today).entries;
  const header = ["Activity local date", "Provider", "Role", "Actual minutes", "Notes", "Record type"].map(csvCell).join(",");
  return [header, ...rows.map(e => [csvCell(e.activityLocalDate), userCell(e.provider), userCell(e.role), csvCell(String(e.actualMinutes)), userCell(e.notes), csvCell("Self-recorded; not school approval")].join(","))].join("\r\n") + "\r\n";
}
