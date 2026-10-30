import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import type { YouthListing } from "../model";
type Fixture = { id: string; listingKind: YouthListing["listingKind"]; audience: string; pathway: YouthListing["pathway"]; costStatus: YouthListing["cost"]["status"]; applicationStatus: YouthListing["availability"]["status"]; ageMin?: number; ageMax?: number; grades?: number[]; selectedAge?: number; requiredCosts?: string; availabilityEvidence?: string[]; opensAt?: string; closesAt?: string; providerHours?: number; expected: Record<string, unknown> };
export const packet = JSON.parse(readFileSync(new URL("./eligibility.json", import.meta.url), "utf8")) as { cases: Fixture[] };
export const fixtureNow = "2026-10-29T12:00:00-04:00";
const contexts: Record<string, YouthListing["audience"]["context"]> = {
  "teen-free-role": "high-school", "grade12-age18": "high-school", "adult-only-mentor": "adult",
  "child-parent-workshop": "child-with-adult", "volunteers-mentioned-attendance": "teen",
  "required-background-check-cost": "high-school", "unpaid-cost-unknown": "high-school",
  "provider-directory": "unknown", "closed-teen-role": "high-school", "conflicting-source-status": "high-school",
  "opens-next-week": "high-school", "grade-not-inferred-age": "high-school",
  "school-approval-separate": "high-school", "universal-free-claim-invalid": "teen",
};
/** Explicit synthetic curation adapter. Never used to infer audience from live text. */
export function fixtureListing(f: Fixture): YouthListing {
  assert.ok(contexts[f.id], `Missing explicit context for ${f.id}`);
  return {
    schemaVersion: 1, id: f.id, listingKind: f.listingKind, pathway: f.pathway, title: f.id,
    provider: "Synthetic fixture provider", sourceUrl: `https://example.org/${f.id}`, checkedAt: fixtureNow, reviewStatus: "approved",
    audience: { context: contexts[f.id], original: f.audience, ageMin: f.ageMin, ageMax: f.ageMax, grades: f.grades },
    cost: { status: f.costStatus, original: f.requiredCosts ?? `Synthetic evidence: ${f.costStatus}`, requiredCosts: f.requiredCosts ? [{ description: f.requiredCosts, mandatory: true }] : [] },
    availability: { status: f.applicationStatus, original: f.availabilityEvidence?.join("; ") ?? f.applicationStatus, conflicting: !!f.availabilityEvidence, opensAt: f.opensAt, closesAt: f.closesAt },
    hours: f.providerHours === undefined ? { status: "not-stated" } : { status: "provider-stated", minutes: f.providerHours * 60, original: `Provider states ${f.providerHours} hours` },
  };
}
