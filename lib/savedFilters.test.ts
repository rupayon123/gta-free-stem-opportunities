import assert from "node:assert/strict";
import { readSavedFilters, saveNamedFilter, deleteNamedFilter, savedFilterHref, SAVED_FILTERS_KEY } from "./savedFilters";
import type { Filters } from "./types";

// Independent storage, never a browser's personal history or saved activities.
class MemoryStorage {
  values = new Map<string, string>();
  blocked = false;
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { if (this.blocked) throw new Error("QuotaExceeded"); this.values.set(key, value); }
}
const criteria = (age: string, query = ""): Filters => ({
  query, region: "All", city: "", category: "All", age, language: "all", distanceKm: 25,
  postalCode: "", nearMe: false, blackFocused: false, girlsFocused: false, indigenousFocused: false,
  volunteerHours: false, coop: false, mentorship: false, leadership: false
});
const storage = new MemoryStorage();
storage.values.set("gta-stem-opportunities-saved-anonymous", '["preserved-bookmark"]');
assert.deepEqual(readSavedFilters(storage), []);
let rows = saveNamedFilter(storage, { name: "Age 4 robots", filters: criteria("4", "robots"), highSchool: false }, new Date("2026-10-29T12:00:00Z"));
const first = rows[0];
rows = saveNamedFilter(storage, { name: "Age 10 art", filters: criteria("10", "art"), highSchool: false });
rows = saveNamedFilter(storage, { name: "Teen volunteering", filters: { ...criteria("16"), volunteerHours: true }, highSchool: true });
assert.deepEqual(rows.map(row => row.filters.age), ["4", "10", "16"]);
assert.equal(rows[2].filters.volunteerHours, true);
assert.match(savedFilterHref(rows[2]), /^\/high-school\/\?savedFilter=/);
assert.match(savedFilterHref(rows[0]), /^\/opportunities\/\?savedFilter=/);
assert(!savedFilterHref(rows[0]).includes("robots"), "A local filter link does not disclose its query");
const selection = structuredClone(readSavedFilters(storage)[0]);
selection.filters.age = "5";
assert.equal(readSavedFilters(storage)[0].filters.age, "4", "Editing a selection never silently persists it");
rows = saveNamedFilter(storage, { ...selection, name: "Age 5 robots" }, new Date("2026-10-29T13:00:00Z"));
assert.equal(rows[0].id, first.id);
assert.equal(rows[0].createdAt, first.createdAt);
assert.equal(rows[0].updatedAt, "2026-10-29T13:00:00.000Z");
assert.equal(rows[1].filters.age, "10", "An explicit update leaves other filters unchanged");
assert.throws(() => saveNamedFilter(storage, { name: "AGE 10 ART", filters: criteria("11"), highSchool: false }), /already has this name/);
assert.throws(() => saveNamedFilter(storage, { name: " ", filters: criteria("4"), highSchool: false }), /1–80/);
assert.throws(() => saveNamedFilter(storage, { name: "a".repeat(81), filters: criteria("4"), highSchool: false }), /1–80/);
assert.throws(() => saveNamedFilter(storage, { name: "Near me", filters: { ...criteria("4"), nearMe: true }, highSchool: false }), /device location is not stored/);
rows = saveNamedFilter(storage, { name: "日本語 العربية বাংলা", filters: { ...criteria("0.5", "図書館"), postalCode: "m5t", language: "ar" }, highSchool: false });
assert.equal(rows.at(-1)?.filters.postalCode, "M5T");
assert.equal(rows.at(-1)?.filters.language, "all", "Legacy provider language never hides saved matches");
assert.equal(readSavedFilters(storage).at(-1)?.name, "日本語 العربية বাংলা");
const beforeFailure = storage.getItem(SAVED_FILTERS_KEY);
storage.blocked = true;
assert.throws(() => saveNamedFilter(storage, { name: "Blocked", filters: criteria("10"), highSchool: false }), /could not be saved/);
assert.throws(() => deleteNamedFilter(storage, first.id), /could not be saved/);
assert.equal(storage.getItem(SAVED_FILTERS_KEY), beforeFailure, "Failure leaves persisted data intact and does not report success");
storage.blocked = false;
deleteNamedFilter(storage, first.id);
assert.throws(() => saveNamedFilter(storage, { ...first, filters: criteria("4") }), /removed in another tab/);
assert.equal(readSavedFilters(storage).length, 3, "A stale update cannot resurrect a removed entry");
assert.equal(storage.getItem("gta-stem-opportunities-saved-anonymous"), '["preserved-bookmark"]');
const validArchive = storage.getItem(SAVED_FILTERS_KEY)!;
for (const corrupt of ['{', '{"version":2,"filters":[]}', '{"version":1,"filters":{}}']) {
  storage.setItem(SAVED_FILTERS_KEY, corrupt);
  assert.throws(() => readSavedFilters(storage), /could not be read/);
  assert.throws(() => saveNamedFilter(storage, { name: "New", filters: criteria("4"), highSchool: false }), /could not be read/);
  assert.equal(storage.getItem(SAVED_FILTERS_KEY), corrupt, "Malformed/unknown archives are preserved, never replaced");
}
storage.setItem(SAVED_FILTERS_KEY, validArchive);
const archive = JSON.parse(validArchive);
archive.filters.push(archive.filters[0]);
storage.setItem(SAVED_FILTERS_KEY, JSON.stringify(archive));
assert.throws(() => readSavedFilters(storage), /could not be read/, "Ambiguous duplicate identities are rejected");
assert.throws(() => readSavedFilters({ getItem: () => { throw new Error("SecurityError"); } }), /storage is unavailable/);
storage.setItem(SAVED_FILTERS_KEY, validArchive);
const tainted = JSON.parse(validArchive);
tainted.filters[0].filters.latitude = 43.65;
tainted.filters[0].filters.longitude = -79.38;
storage.setItem(SAVED_FILTERS_KEY, JSON.stringify(tainted));
const sanitized = readSavedFilters(storage)[0];
assert(!("latitude" in sanitized.filters));
assert(!("longitude" in sanitized.filters));
console.log("PASS saved filters: independent ages, explicit update, local routes, Unicode, school scope, privacy, storage failure, corrupt archive, stale edit/delete and bookmark preservation");
