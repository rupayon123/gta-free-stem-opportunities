import assert from "node:assert/strict";
import test from "node:test";
import { getCuratedYouthCatalogue } from "./curatedCatalogue";
import { evaluateYouthListing } from "./model";
import { hasLegacyTeenFilterParams } from "../explorerFilterParams";

const now = "2026-10-30T12:00:00Z";
test("reviewed content never counts a programme intake or directory as an individual role", () => {
  const catalogue = getCuratedYouthCatalogue();
  assert.equal(catalogue.state, "ready"); assert.equal(catalogue.listings.length, 9);
  const decisions = catalogue.listings.map(row => evaluateYouthListing(row, { now }));
  assert.equal(decisions.filter(row => row.verifiedFreeRoles).length, 0);
  assert.equal(decisions.filter(row => row.verifiedFreePrograms).length, 1);
  assert.equal(decisions.filter(row => row.directorySection).length, 2);
  assert(decisions.every(row => !row.mapPin && !row.schoolApproved && row.autoCredit === 0));
});
test("YRES retains overall and virtual monthly commitments without promising a placement", () => {
  const row = getCuratedYouthCatalogue().listings.find(row => row.id === "yres-volunteer-success-program")!;
  assert.equal(row.listingKind, "program");
  const wording = JSON.stringify(row);
  assert.match(wording, /120/); assert.match(wording, /10 hours/i);
  assert.match(wording, /not a guaranteed role|not guaranteed|selection/i);
  assert.deepEqual(new Set(row.regions), new Set(["Toronto", "York", "Peel", "Durham", "Halton"]));
});
test("unknown intakes and necessary Blueprint expenses never receive open/free claims", () => {
  const rows = getCuratedYouthCatalogue().listings;
  for (const row of rows.filter(row => row.id.startsWith("ymca-"))) {
    const decision = evaluateYouthListing(row, { now });
    assert.equal(decision.effectiveStatus, "unknown"); assert.equal(decision.applyNow, false); assert.equal(decision.verifiedFreePrograms, false);
  }
  const blueprint = rows.find(row => row.id === "uoft-blueprint-2027")!;
  const decision = evaluateYouthListing(blueprint, { now });
  assert.equal(decision.effectiveStatus, "upcoming"); assert.equal(decision.freeBadge, false); assert.equal(decision.applyNow, false);
  assert.match(blueprint.cost.original, /travel/i); assert(blueprint.cost.requiredCosts.length > 0);
});
test("existing teen saved-filter and less common legacy links remain explorer entry points", () => {
  for (const search of ["?savedFilter=old-id", "?programLanguage=fr", "?indigenous=1", "?age=18", "?postal=M5T&distance=10"]) assert.equal(hasLegacyTeenFilterParams(search), true, search);
  assert.equal(hasLegacyTeenFilterParams("?pathway=learning"), false);
  assert.equal(hasLegacyTeenFilterParams("?pathway=hours"), false);
});
