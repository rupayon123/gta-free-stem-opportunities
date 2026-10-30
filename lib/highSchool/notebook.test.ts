import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { deleteHoursEntry, exportHoursCsv, formatRecordedMinutes, loadHoursNotebook, NOTEBOOK_KEY, parseHoursArchive, recordedMinutes, saveHoursEntry, type AtomicNotebookStorage, type HoursEntry } from "./notebook";

const today = "2026-10-30";
test("portable notebook golden retains date, integer minutes and exact safe CSV", () => {
  const g = JSON.parse(readFileSync(new URL("./fixtures/notebook-golden.json", import.meta.url), "utf8"));
  assert.equal(recordedMinutes(g.archive, g.today), g.totalActualMinutes);
  assert.deepEqual(formatRecordedMinutes(g.totalActualMinutes), g.formatted);
  assert.equal(exportHoursCsv(g.archive, g.today), g.csv);
});
const entry = (patch: Partial<HoursEntry> = {}): HoursEntry => ({ id: "9fd00ad4-ffec-4bed-bef9-15146cd6d605", revision: 1, provider: "Library", role: "Reading buddy", activityLocalDate: "2026-10-29", actualMinutes: 95, notes: "Completed work", createdAt: "2026-10-30T01:00:00Z", updatedAt: "2026-10-30T01:00:00Z", ...patch });
class MemoryStorage implements AtomicNotebookStorage {
  raw: string | null = null;
  readFails = false; writeFails = false; conflict = false; writes = 0;
  async read(key: string) { assert.equal(key, NOTEBOOK_KEY); if (this.readFails) throw new Error("denied"); return this.raw; }
  async compareAndSwap(key: string, expected: string | null, next: string) {
    assert.equal(key, NOTEBOOK_KEY); this.writes++;
    if (this.writeFails) throw new Error("disk/quota");
    if (this.conflict || this.raw !== expected) return false;
    this.raw = next; return true;
  }
}
test("create, restart, edit, actual-minute totals and delete are durable", async () => {
  const s = new MemoryStorage();
  assert.equal((await saveHoursEntry(s, entry(), today)).ok, true);
  let loaded = await loadHoursNotebook(s, today); assert.ok(loaded.ok);
  assert.equal(recordedMinutes(loaded.value, today), 95);
  assert.deepEqual(formatRecordedMinutes(95), { hours: 1, minutes: 35 });
  const edit = entry({ actualMinutes: 20, revision: 2, updatedAt: "2026-10-30T02:00:00Z" });
  assert.equal((await saveHoursEntry(s, edit, today, 1)).ok, true);
  loaded = await loadHoursNotebook(s, today); assert.ok(loaded.ok); assert.deepEqual(loaded.value.entries, [edit]);
  assert.equal((await deleteHoursEntry(s, edit.id, today, 2)).ok, true);
  loaded = await loadHoursNotebook(s, today); assert.ok(loaded.ok); assert.deepEqual(loaded.value.entries, []);
});
test("read/write/delete failures and conflicts never claim successful mutations", async () => {
  const s = new MemoryStorage(); await saveHoursEntry(s, entry(), today); const prior = s.raw;
  s.writeFails = true;
  assert.deepEqual(await saveHoursEntry(s, entry({ actualMinutes: 30, revision: 2 }), today, 1), { ok: false, error: "write-failed" });
  assert.deepEqual(await deleteHoursEntry(s, entry().id, today, 1), { ok: false, error: "write-failed" });
  assert.equal(s.raw, prior);
  s.writeFails = false; s.conflict = true;
  assert.deepEqual(await saveHoursEntry(s, entry({ revision: 2 }), today, 1), { ok: false, error: "conflict" });
  assert.equal(s.raw, prior);
  s.readFails = true;
  assert.deepEqual(await loadHoursNotebook(s, today), { ok: false, error: "read-failed" });
});
test("unknown/corrupt archives retain exact original bytes and never write", async () => {
  for (const raw of ["broken", '{"schemaVersion":2,"entries":[]}', '{"schemaVersion":1,"entries":[{}]}']) {
    const s = new MemoryStorage(); s.raw = raw;
    assert.deepEqual(await saveHoursEntry(s, entry(), today), { ok: false, error: "invalid-archive" });
    assert.equal(s.raw, raw); assert.equal(s.writes, 0);
  }
});
test("stale editor/delete revision cannot overwrite a newer entry", async () => {
  const s = new MemoryStorage(); await saveHoursEntry(s, entry(), today);
  await saveHoursEntry(s, entry({ revision: 2, actualMinutes: 30 }), today, 1);
  const prior = s.raw;
  assert.deepEqual(await saveHoursEntry(s, entry({ revision: 2, actualMinutes: 10 }), today, 1), { ok: false, error: "conflict" });
  assert.deepEqual(await deleteHoursEntry(s, entry().id, today, 1), { ok: false, error: "conflict" });
  assert.equal(s.raw, prior);
});
test("local dates are calendar dates through leap days and DST without UTC conversion", () => {
  for (const activityLocalDate of ["2024-02-29", "2026-03-08", "2026-10-29"]) {
    const archive = parseHoursArchive(JSON.stringify({ schemaVersion: 1, entries: [entry({ activityLocalDate })] }), today);
    assert.equal(archive.entries[0].activityLocalDate, activityLocalDate);
    assert.ok(exportHoursCsv(archive, today).includes(`"${activityLocalDate}"`));
  }
  for (const activityLocalDate of ["2026-02-29", "2026-04-31", "2026-11-01", "2026-10-29T00:00:00Z"]) {
    assert.throws(() => parseHoursArchive(JSON.stringify({ schemaVersion: 1, entries: [entry({ activityLocalDate })] }), today));
  }
});
test("invalid minutes, future dates, duplicate IDs and impossible daily totals reject", async () => {
  const s = new MemoryStorage();
  for (const actualMinutes of [0, -1, 1.5, 1441, NaN, Infinity]) assert.deepEqual(await saveHoursEntry(s, entry({ actualMinutes }), today), { ok: false, error: "invalid-entry" });
  assert.equal(s.raw, null);
  const base = entry({ actualMinutes: 1400 }); await saveHoursEntry(s, base, today); const prior = s.raw;
  assert.deepEqual(await saveHoursEntry(s, entry({ id: "095bd3dc-33e2-4ea9-b060-d09b90aa4700", actualMinutes: 45 }), today), { ok: false, error: "invalid-entry" });
  assert.equal(s.raw, prior);
  assert.throws(() => parseHoursArchive(JSON.stringify({ schemaVersion: 1, entries: [base, base] }), today));
});
test("every user cell is text-prefixed; CSV escapes formulas, tabs, BOM, quotes and newlines", () => {
  for (const payload of ['=HYPERLINK("https://example.org")', "+SUM(1,2)", "-2+3", "@SUM(A1)", " \t=1+1", "\r=1+1", "\uFEFF=1+1"]) {
    const archive = { schemaVersion: 1 as const, entries: [entry({ provider: payload, role: payload, notes: payload })] };
    const csv = exportHoursCsv(archive, today);
    assert.equal(csv.split(`"'${payload.replace(/"/g, '""')}"`).length - 1, 3);
    assert.ok(csv.includes("Self-recorded; not school approval"));
    assert.equal(archive.entries[0].notes, payload);
  }
  const csv = exportHoursCsv({ schemaVersion: 1, entries: [entry({ notes: 'One, "two"\nthree' })] }, today);
  assert.ok(csv.includes('"\'One, ""two""\nthree"'));
});
