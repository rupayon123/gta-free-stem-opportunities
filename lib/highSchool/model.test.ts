import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { evaluateYouthListing, parseYouthCatalogue, parseYouthListing } from "./model";

import { packet, fixtureListing, fixtureNow as now } from "./fixtures/policy";

test("all fourteen policy fixtures assert every expected field", () => {
  assert.equal(packet.cases.length, 14);
  for (const f of packet.cases) {
    const result = evaluateYouthListing(fixtureListing(f), { now, selectedAge: f.selectedAge });
    for (const [key, value] of Object.entries(f.expected)) assert.deepEqual(result[key as keyof typeof result], value, `${f.id}.${key}`);
  }
});
test("portable full-output goldens match the fourteen evaluated cases", () => {
  const golden = JSON.parse(readFileSync(new URL("./fixtures/eligibility-goldens.json", import.meta.url), "utf8"));
  assert.equal(golden.cases.length, 14);
  for (const row of golden.cases) assert.deepEqual(evaluateYouthListing(row.input, row.context), row.output, row.id);
});
const role = () => fixtureListing(packet.cases[0]);
test("application boundaries, missing confirmation and stale season cannot become open", () => {
  const x = role();
  x.availability.opensAt = now; x.availability.closesAt = "2026-10-30T12:00:00-04:00";
  assert.equal(evaluateYouthListing(x, { now }).applyNow, true);
  assert.equal(evaluateYouthListing(x, { now: x.availability.closesAt }).effectiveStatus, "closed");
  x.availability.status = "upcoming";
  assert.equal(evaluateYouthListing(x, { now }).effectiveStatus, "unknown");
  x.availability.status = "open"; x.availability.seasonEndsOn = "2026-08-31";
  assert.equal(evaluateYouthListing(x, { now }).effectiveStatus, "closed", "CVC past-season CTA cannot create a future opening");
});
test("conflicts and holds override optimistic provider text", () => {
  const x = role(); x.availability.conflicting = true;
  assert.equal(evaluateYouthListing(x, { now }).applyNow, false);
  assert.equal(evaluateYouthListing(x, { now }).statusLabel, "Confirm with provider");
  x.availability.conflicting = false; x.reviewStatus = "hold";
  assert.equal(evaluateYouthListing(x, { now }).teenHub, false, "Strides staging copy remains unapproved");
  assert.equal(evaluateYouthListing(x, { now }).freeBadge, false);
});
test("evidence freshness, unknown mandatory expenses and requirements survive", () => {
  const x = role(); x.audience.residency = "Canadian residence"; x.audience.restrictions = ["Provider identity requirement; do not infer"];
  assert.equal(evaluateYouthListing(x, { now: "2026-11-29T12:00:00-05:00" }).evidenceCurrent, false);
  assert.equal(evaluateYouthListing(x, { now: "2026-10-28T12:00:00-04:00" }).reviewed, false);
  x.cost.requiredCosts = [{ description: "Required check", mandatory: true, amount: 20, currency: "CAD" }];
  assert.equal(evaluateYouthListing(x, { now }).costLabel, "Required cost");
  assert.equal(evaluateYouthListing(x, { now }).verifiedFreeRoles, false);
  x.cost.requiredCosts[0].amount = undefined;
  assert.equal(evaluateYouthListing(x, { now }).freeBadge, false);
  assert.equal(evaluateYouthListing(x, { now }).residency, "Canadian residence");
  assert.deepEqual(evaluateYouthListing(x, { now }).restrictions, x.audience.restrictions);
});
test("selected age and grade constraints are independent; no automatic age conversion", () => {
  const x = fixtureListing(packet.cases[1]);
  assert.equal(evaluateYouthListing(x, { now, selectedAge: 18, selectedGrade: 12 }).teenHub, true);
  assert.equal(evaluateYouthListing(x, { now, selectedAge: 17, selectedGrade: 12 }).teenHub, false);
  assert.equal(evaluateYouthListing(x, { now, selectedAge: 18, selectedGrade: 9 }).teenHub, false);
  const gradesOnly = fixtureListing(packet.cases[11]);
  assert.equal(evaluateYouthListing(gradesOnly, { now, selectedAge: 18 }).selectedAgeEligible, null);
});
test("invalid schema, URLs, dates, duplicate IDs and contradictory bounds reject", () => {
  for (const patch of [
    { sourceUrl: "javascript:alert(1)" }, { sourceUrl: "https://user:secret@example.org/" }, { schemaVersion: 2 },
    ...["https://localhost/", "https://127.0.0.1/", "https://10.0.0.1/", "https://169.254.169.254/", "https://[::1]/", "https://2130706433/", "https://device.local/"].map(sourceUrl => ({ sourceUrl })),
    { audience: { ...role().audience, ageMin: 18, ageMax: 14 } },
    { audience: { ...role().audience, grades: [9, 9] } },
    { availability: { ...role().availability, closesAt: "2026-02-30T12:00:00Z" } },
  ]) assert.throws(() => parseYouthListing({ ...role(), ...patch }));
  assert.throws(() => parseYouthCatalogue([role(), role()]));
  const x = role(); const parsed = parseYouthListing(x); parsed.audience.original = "changed";
  assert.notEqual(x.audience.original, parsed.audience.original);
});
