import assert from "node:assert/strict";
import test from "node:test";
import { matchAccessibilitySelection, parseAccessibilitySelection, emptyAccessibilitySelection } from "./accessibilitySelection";
import type { AccessibilitySupport, AccessibilitySupportEvidence } from "./accessibilitySupport";

const now = "2026-10-30T07:00:00.000Z";
// Synthetic decision fixtures only; never provider records or published evidence.
function proof(category: AccessibilitySupportEvidence["category"], status: AccessibilitySupportEvidence["status"], scope: AccessibilitySupportEvidence["scope"]): AccessibilitySupportEvidence {
  return { category, status, scope, checkedAt: now, sourceUrl: "https://example.org/accessibility", evidenceText: "Synthetic support fixture", reviewStatus: "approved",
    ...(scope === "venue" ? { venue: { id: "reviewed-venue", name: "Synthetic venue" } } : {}) };
}
const metadata = (...evidence: AccessibilitySupportEvidence[]): { accessibilitySupport: AccessibilitySupport } => ({ accessibilitySupport: { schemaVersion: 1, evidence } });
test("all selected supports are required; a title or one matching category cannot satisfy two needs", () => {
  const selection = parseAccessibilitySelection({ schemaVersion: 1, categories: ["sign-language", "sensory-friendly"], includeOnRequest: false });
  assert.equal(matchAccessibilitySelection(metadata(proof("sign-language", "provided", "activity")), selection, { now }).matches, false);
  assert.equal(matchAccessibilitySelection(metadata(proof("sign-language", "provided", "activity"), proof("sensory-friendly", "provided", "activity")), selection, { now }).matches, true);
});
test("provider request policies need explicit opt-in and never become provided activity services", () => {
  const selection = { schemaVersion: 1 as const, categories: ["sign-language" as const], includeOnRequest: false };
  assert.equal(matchAccessibilitySelection(metadata(proof("sign-language", "on-request", "provider-policy")), selection, { now }).matches, false);
  const opted = matchAccessibilitySelection(metadata(proof("sign-language", "on-request", "provider-policy")), { ...selection, includeOnRequest: true }, { now });
  assert.equal(opted.matches, true); assert.equal(opted.decisions[0].status, "on-request"); assert.equal(opted.decisions[0].scope, "provider-policy");
  assert.equal(matchAccessibilitySelection(metadata(proof("sign-language", "provided", "provider-policy")), { ...selection, includeOnRequest: true }, { now }).matches, false);
});
test("specific negative or conflicting activity proof cannot be bypassed by a broad request policy", () => {
  const selection = { schemaVersion: 1 as const, categories: ["sign-language" as const], includeOnRequest: true };
  const denied = matchAccessibilitySelection(metadata(proof("sign-language", "not-available", "activity"), proof("sign-language", "on-request", "provider-policy")), selection, { now });
  assert.equal(denied.matches, false); assert.equal(denied.decisions[0].status, "not-available");
  assert.equal(matchAccessibilitySelection(metadata(proof("sign-language", "not-available", "activity"), proof("sign-language", "provided", "activity"), proof("sign-language", "on-request", "provider-policy")), selection, { now }).matches, false);
});
test("mobility matches require the exact reviewed venue binding", () => {
  const selection = { schemaVersion: 1 as const, categories: ["mobility-wheelchair" as const], includeOnRequest: false };
  const item = metadata(proof("mobility-wheelchair", "provided", "venue"));
  assert.equal(matchAccessibilitySelection(item, selection, { now }).matches, false);
  assert.equal(matchAccessibilitySelection(item, selection, { now, reviewedVenueId: "another-branch" }).matches, false);
  assert.equal(matchAccessibilitySelection(item, selection, { now, reviewedVenueId: "reviewed-venue" }).matches, true);
});
test("malformed optional proof stays unknown without hiding base events when no support criterion is selected", () => {
  const item = { accessibilitySupport: { schemaVersion: 999, evidence: [] } };
  assert.equal(matchAccessibilitySelection(item, emptyAccessibilitySelection(), { now }).matches, true);
  const selection = { schemaVersion: 1 as const, categories: ["support-person" as const], includeOnRequest: true };
  assert.equal(matchAccessibilitySelection(item, selection, { now }).matches, false);
  assert.equal(matchAccessibilitySelection({ ...metadata(proof("support-person", "provided", "activity")), accessibilitySupportUnavailable: true }, selection, { now }).matches, false);
});
