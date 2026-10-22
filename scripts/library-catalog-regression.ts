import assert from "node:assert/strict";
import { decodeLibraryCatalog } from "../lib/libraryCatalog";
import { generatedLibraryOpportunities, generatedLibrarySourceHealth } from "../lib/generatedLibraryOpportunities";

const now = new Date();
const seed = generatedLibraryOpportunities[0];
assert(seed, "A source-backed library fixture is required.");
const payload = { schemaVersion: 1, generatedAt: now.toISOString(), count: 1, sourceHealth: { library: generatedLibrarySourceHealth }, opportunities: [{ ...seed, id: "catalog-fixture", category: "Library & Community", categories: ["Library & Community"], ages: { min: 0, max: 1.5 }, ageMin: 0, ageMax: 1.5, ageLabel: "Ages 0–18 months" }] };
assert.equal(decodeLibraryCatalog(payload, now)[0].ageLabel, "Ages 0–18 months");
const mutations: Array<[string, (value: typeof payload) => void]> = [
  ["count mismatch", value => { value.count = 2; }],
  ["stale catalog", value => { value.generatedAt = "2020-01-01T00:00:00Z"; }],
  ["duplicate IDs", value => { value.opportunities.push(value.opportunities[0]); value.count = 2; }],
  ["source health", value => { value.sourceHealth.library.status = "failed" as never; }],
  ["page coverage", value => { value.sourceHealth.library.pageSuccessRatio = 0; }],
  ["output floor", value => { value.sourceHealth.library.acceptedListings = 0; }],
  ["age inconsistency", value => { value.opportunities[0].ageMax = 18; }],
  ["unsafe source", value => { value.opportunities[0].sourceUrl = "javascript:alert(1)"; }],
  ["cost uncertainty", value => { value.opportunities[0].cost = "Unknown" as never; }],
  ["missing source evidence", value => { value.opportunities[0].sources = []; }],
  ["unknown start date", value => { value.opportunities[0].startDate = "sometime"; }],
  ["invalid coordinates", value => { value.opportunities[0].latitude = NaN; }]
];
for (const [name, mutate] of mutations) {
  const value = structuredClone(payload);
  mutate(value);
  assert.throws(() => decodeLibraryCatalog(value, now), name);
}
console.log(`Library catalog validation passed: exact month ages and ${mutations.length} fail-closed cases.`);
