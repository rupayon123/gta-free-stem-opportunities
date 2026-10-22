import assert from "node:assert/strict";
import { searchOpportunities } from "./search";
import type { Opportunity } from "./types";

function fixture(id: string, title: string, description: string, overrides: Partial<Opportunity> = {}): Opportunity {
  return {
    id, title, description, summary: description,
    organization: "Example Public Library", provider: "Example Public Library",
    type: "One-time event", category: "Library & Community", categories: ["Library & Community"],
    communityFocus: ["Open to all"], city: "Toronto", region: "Toronto", address: "Example branch",
    latitude: 43.65, longitude: -79.38, virtual: false, startDate: "2026-12-01",
    ageMin: 6, ages: { min: 6 }, grades: [], language: ["en"], languages: ["en"], cost: "Free to join",
    sourceUrl: "https://example.invalid/test", registrationUrl: "https://example.invalid/test",
    lastChecked: "2026-10-22", lastSeen: "2026-10-22", lastVerified: "2026-10-22", status: "active",
    accessibility: [], equipment: "Check with provider", food: "Check with provider", capacity: "Check with provider",
    commitment: "One session", providerContact: "", freeStatusProof: "Synthetic cache fixture",
    trustedSource: true, volunteerHoursEligible: false, coopEligible: false, paidPosition: false, tags: [], sources: [],
    ...overrides
  };
}

const titleMatch = fixture("title", "Astronomy", "Look at the night sky.");
const descriptionMatch = fixture("description", "Evening Workshop", "An introduction to astronomy and observing the sky.");
const items = [descriptionMatch, titleMatch];
const expected = searchOpportunities(items, "astronomy").map((item) => item.id);
assert.equal(expected[0], titleMatch.id);
const mutableResult = searchOpportunities([...items], "astronomy");
mutableResult.reverse();
mutableResult.pop();
assert.deepEqual(searchOpportunities([...items], "astronomy").map((item) => item.id), expected, "Caller mutations cannot poison cached order or membership");
assert.deepEqual(searchOpportunities([descriptionMatch], "astronomy").map((item) => item.id), [descriptionMatch.id], "Warm broad searches cannot widen a filtered subset");
assert.deepEqual(searchOpportunities([...items], "astronomy").map((item) => item.id), expected, "A subset's cache cannot replace the broader corpus");

const replacement = fixture(titleMatch.id, "Dancing", "An introduction to dance.");
assert.deepEqual(searchOpportunities([titleMatch], "astronomy").map((item) => item.id), [titleMatch.id]);
assert.deepEqual(searchOpportunities([replacement], "astronomy"), [], "Replacement records with the same IDs invalidate earlier text matches");
assert.deepEqual(searchOpportunities(items, "library near me", "en", { proximityResolved: true }).map((item) => item.id).sort(), items.map((item) => item.id).sort());
assert.deepEqual(searchOpportunities(items, "library near me"), [], "A cached resolved query cannot resolve a later missing location");
assert.deepEqual(searchOpportunities(items, "library unknown-signal-829"), []);
assert.deepEqual(searchOpportunities(items, "library unknown-signal-829"), [], "Empty matches are stable on repeated requests");
assert.deepEqual(searchOpportunities(items, "library 2026-12-01").map((item) => item.id).sort(), items.map((item) => item.id).sort());
assert.deepEqual(searchOpportunities(items, "library 2026-12-02"), [], "Dates remain part of the cached query identity");

// Exceed the bounded query cache, then verify the original ranked result can be
// recomputed without stale membership or ordering. No internal cache is mocked.
for (let index = 0; index < 40; index += 1) searchOpportunities(items, `unknown${index}`);
assert.deepEqual(searchOpportunities(items, "astronomy").map((item) => item.id), expected);
console.log(JSON.stringify({ cacheBehaviorChecks: 8, callerArrayIsolation: true, strictSubsetIsolation: true, recordReplacementInvalidates: true, queryConstraintsPreserved: true, evictionPreservesRanking: true }));
