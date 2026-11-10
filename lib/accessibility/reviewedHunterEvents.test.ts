import assert from "node:assert/strict";
import { sourceOpportunities } from "../data";
import { matchAccessibilitySelection } from "../accessibilitySelection";
import { attachReviewedHunterEventSupport } from "./reviewedHunterEvents";

const science = sourceOpportunities.find((row) => row.id === "ontario-science-centre-pride-in-stem-2026")!;
const autism = sourceOpportunities.find((row) => row.id === "autism-ontario-newmarket-quiet-santa-2026-11-22")!;
assert.equal(science.status, "needs_review");
assert.equal(autism.status, "needs_review");
const now = "2026-11-10T12:00:00.000Z";
const wheelchair = { schemaVersion: 1 as const, categories: ["mobility-wheelchair" as const], includeOnRequest: false };
const sensory = { schemaVersion: 1 as const, categories: ["sensory-friendly" as const], includeOnRequest: false };
assert.equal(matchAccessibilitySelection(science, wheelchair, { now, reviewedVenueId: "evergreen-brick-works-550-bayview" }).matches, true);
assert.equal(matchAccessibilitySelection(science, wheelchair, { now, reviewedVenueId: "different-venue" }).matches, false);
assert.equal(matchAccessibilitySelection(science, sensory, { now }).matches, false);
assert.equal(matchAccessibilitySelection(autism, sensory, { now }).matches, true);
assert.equal(matchAccessibilitySelection(autism, wheelchair, { now }).matches, false);
assert.equal(matchAccessibilitySelection(autism, sensory, { now: "2026-12-12T12:00:00.000Z" }).matches, false);
for (const row of [science, autism]) {
  const { accessibilitySupport: _ignored, ...withoutSupport } = row;
  assert.equal(attachReviewedHunterEventSupport({ ...withoutSupport, address: "Changed address" }).accessibilitySupport, undefined);
  assert.equal(attachReviewedHunterEventSupport({ ...withoutSupport, sourceUrl: "https://example.org/" }).accessibilitySupport, undefined);
  assert.throws(() => attachReviewedHunterEventSupport(row), /review existing/i);
}
console.log("Exact event evidence, scope, expiry and venue bindings passed.");
