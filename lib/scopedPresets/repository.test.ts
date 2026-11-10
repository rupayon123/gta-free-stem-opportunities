import assert from "node:assert/strict";
import test from "node:test";
import { createScopedPresetRepository, SCOPED_PRESETS_KEY, type AtomicPresetStorage, type PresetScope } from "./repository";
import { SAVED_FILTERS_KEY } from "../savedFilters";

const now = "2026-10-30T12:00:00.000Z";
const next = "2026-10-30T12:01:00.000Z";
// Synthetic repository criteria only. Production must provide the separately
// reviewed strict activity/youth/support decoder; this is not support evidence.
type Criteria = { query: string; age: string; testSelection?: string[] };
function criteria(_scope: PresetScope, value: unknown): Criteria {
  const x = value as Criteria;
  if (!x || typeof x.query !== "string" || typeof x.age !== "string" || (x.testSelection !== undefined && (!Array.isArray(x.testSelection) || x.testSelection.some(v => typeof v !== "string")))) throw new Error("criteria");
  return { query: x.query, age: x.age, ...(x.testSelection === undefined ? {} : { testSelection: [...x.testSelection] }) };
}
class MemoryAtomic implements AtomicPresetStorage {
  values = new Map<string, string>();
  writes = 0;
  failRead = false;
  failWrite = false;
  async read(key: string) { if (this.failRead) throw new Error("read"); return this.values.get(key) ?? null; }
  async compareAndSwap(key: string, expected: string | null, replacement: string) {
    this.writes += 1;
    if (this.failWrite) throw new Error("abort");
    if ((this.values.get(key) ?? null) !== expected) return false;
    this.values.set(key, replacement); return true;
  }
}
function fixture() {
  const legacy = new Map<string, string>();
  const oldFilters = { query: "robotics", region: "All", city: "", category: "All", age: "16", language: "all", distanceKm: 25, postalCode: "", nearMe: false,
    blackFocused: false, girlsFocused: false, indigenousFocused: false, volunteerHours: true, coop: false, mentorship: false, leadership: false };
  const raw = JSON.stringify({ version: 1, filters: [{ id: "existing-filter", name: "日本語 العربية", highSchool: true, filters: oldFilters, createdAt: now, updatedAt: now }] });
  legacy.set(SAVED_FILTERS_KEY, raw);
  legacy.set("gta-stem-opportunities-saved-anonymous", '["keep-bookmark"]');
  const storage = new MemoryAtomic();
  const repo = createScopedPresetRepository(storage, { getItem: key => legacy.get(key) ?? null }, criteria);
  return { legacy, raw, storage, repo };
}

test("one-time migration commits old identities, exact backup and scope without rewriting v1 or bookmarks", async () => {
  const f = fixture(); const result = await f.repo.load(now); assert(result.ok);
  const p = result.value.archive.presets[0];
  assert.deepEqual({ id: p.id, name: p.name, scope: p.scope, createdAt: p.createdAt, updatedAt: p.updatedAt, revision: p.revision },
    { id: "existing-filter", name: "日本語 العربية", scope: "teen-activities", createdAt: now, updatedAt: now, revision: 1 });
  assert.equal(result.value.archive.legacyBackups[0].raw, f.raw);
  assert.equal(f.legacy.get(SAVED_FILTERS_KEY), f.raw);
  assert.equal(f.legacy.get("gta-stem-opportunities-saved-anonymous"), '["keep-bookmark"]');
  const before = f.storage.values.get(SCOPED_PRESETS_KEY);
  assert((await f.repo.load(next)).ok);
  assert.equal(f.storage.values.get(SCOPED_PRESETS_KEY), before, "Later loads never rewrite the migrated archive");
});

test("two concurrent saves have one atomic winner; stale save/delete never overwrite it", async () => {
  const f = fixture(); assert((await f.repo.load(now)).ok);
  const results = await Promise.all(["first", "second"].map(query => f.repo.save({ id: "existing-filter", name: "日本語 العربية", scope: "teen-activities", criteria: { query, age: "16", testSelection: [query] } }, next, 1)));
  assert.equal(results.filter(r => r.ok).length, 1);
  const winner = results.find(r => r.ok)!; assert(winner.ok);
  const persisted = f.storage.values.get(SCOPED_PRESETS_KEY);
  assert.deepEqual(await f.repo.save({ id: "existing-filter", name: "Old draft", scope: "teen-activities", criteria: { query: "stale", age: "16" } }, next, 1), { ok: false, error: "conflict" });
  assert.deepEqual(await f.repo.remove("existing-filter", 1, next), { ok: false, error: "conflict" });
  assert.equal(f.storage.values.get(SCOPED_PRESETS_KEY), persisted);
  assert.equal(winner.value.presets[0].revision, 2);
});

test("an older tab change blocks writes until explicit recovery; v2 selection and original backup survive", async () => {
  const f = fixture(); assert((await f.repo.load(now)).ok);
  const saved = await f.repo.save({ id: "existing-filter", name: "Keep selection", scope: "teen-activities", criteria: { query: "science", age: "16", testSelection: ["synthetic"] } }, next, 1); assert(saved.ok);
  const changed = '{"version":1,"filters":[]}'; f.legacy.set(SAVED_FILTERS_KEY, changed);
  const read = await f.repo.load(next); assert(read.ok && read.value.legacyChanged);
  assert.deepEqual(await f.repo.remove("existing-filter", 2, next), { ok: false, error: "legacy-changed" });
  assert.deepEqual(await f.repo.keepCurrentAfterLegacyChange(f.raw, read.value.archive.revision, next), { ok: false, error: "conflict" });
  const recovered = await f.repo.keepCurrentAfterLegacyChange(changed, read.value.archive.revision, next); assert(recovered.ok);
  assert.deepEqual(recovered.value.presets[0].criteria.testSelection, ["synthetic"]);
  assert.deepEqual(recovered.value.legacyBackups.map(b => b.raw), [f.raw, changed]);
  assert.equal(f.legacy.get(SAVED_FILTERS_KEY), changed);
});

test("malformed/future archives and failed migration preserve exact old and new bytes", async () => {
  const f = fixture(); f.storage.failWrite = true;
  assert.deepEqual(await f.repo.load(now), { ok: false, error: "write-failed" });
  assert.equal(f.storage.values.size, 0); assert.equal(f.legacy.get(SAVED_FILTERS_KEY), f.raw);
  f.storage.failWrite = false;
  for (const raw of ["{", '{"schemaVersion":99}', '{"schemaVersion":2,"revision":1,"presets":[],"legacyBackups":[]}']) {
    f.storage.values.set(SCOPED_PRESETS_KEY, raw);
    assert.deepEqual(await f.repo.load(now), { ok: false, error: "invalid-archive" });
    assert.equal(f.storage.values.get(SCOPED_PRESETS_KEY), raw);
  }
  f.storage.failRead = true;
  assert.deepEqual(await f.repo.load(now), { ok: false, error: "read-failed" });
});

test("save success waits for the adapter's commit acknowledgement and abort never claims success", async () => {
  const f = fixture(); assert((await f.repo.load(now)).ok);
  let finish!: (ok: boolean) => void;
  let reachedCommit!: () => void;
  const ready = new Promise<void>(resolve => { reachedCommit = resolve; });
  const held: AtomicPresetStorage = { read: key => f.storage.read(key), compareAndSwap: () => new Promise(resolve => { finish = resolve; reachedCommit(); }) };
  const repo = createScopedPresetRepository(held, { getItem: key => f.legacy.get(key) ?? null }, criteria);
  let completed = false;
  const pending = repo.save({ id: "new-filter", name: "New", scope: "youth-guide", criteria: { query: "", age: "14" } }, next).then(r => { completed = true; return r; });
  await ready;
  assert.equal(completed, false);
  assert.equal(typeof finish, "function"); finish(false);
  assert.deepEqual(await pending, { ok: false, error: "conflict" });
  f.storage.failWrite = true;
  assert.deepEqual(await f.repo.remove("existing-filter", 1, next), { ok: false, error: "write-failed" });
});


test("home shortcut reads never migrate, write, repair or change v1 bytes", async () => {
  const { readHomePresetLinks } = await import("./homeLinks");
  const f = fixture();
  const links = await readHomePresetLinks(f.storage, { getItem: key => f.legacy.get(key) ?? null });
  assert.equal(links[0].id, "existing-filter");
  assert.equal(f.storage.writes, 0);
  assert.equal(f.storage.values.has(SCOPED_PRESETS_KEY), false);
  assert.equal(f.legacy.get(SAVED_FILTERS_KEY), f.raw);
  f.storage.values.set(SCOPED_PRESETS_KEY, '{"schemaVersion":999}');
  await assert.rejects(readHomePresetLinks(f.storage, { getItem: key => f.legacy.get(key) ?? null }), /unsupported or damaged/);
  assert.equal(f.storage.writes, 0);
  assert.equal(f.storage.values.get(SCOPED_PRESETS_KEY), '{"schemaVersion":999}');
  assert.equal(f.legacy.get(SAVED_FILTERS_KEY), f.raw);
  const existing = fixture();
  const { parseScopedCriteria } = await import("./criteria");
  const production = createScopedPresetRepository(existing.storage, { getItem: key => existing.legacy.get(key) ?? null }, parseScopedCriteria);
  assert((await production.load(now)).ok);
  const priorWrites = existing.storage.writes;
  const priorBytes = existing.storage.values.get(SCOPED_PRESETS_KEY);
  const readOnly = { read: async () => { throw new Error("Creating read path must not be used"); }, readExisting: async (key: string) => existing.storage.values.get(key) ?? null, compareAndSwap: async () => { throw new Error("Home must never write"); } };
  assert.equal((await readHomePresetLinks(readOnly, { getItem: key => existing.legacy.get(key) ?? null }))[0].id, "existing-filter");
  assert.equal(existing.storage.writes, priorWrites);
  assert.equal(existing.storage.values.get(SCOPED_PRESETS_KEY), priorBytes);
  assert.equal(existing.legacy.get(SAVED_FILTERS_KEY), existing.raw);
});
