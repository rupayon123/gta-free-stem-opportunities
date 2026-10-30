import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { HighSchoolDiscovery } from "../../components/high-school/HighSchoolDiscovery";
import { YouthListingDetail } from "../../components/high-school/YouthListingDetail";
import { buildPublicYouthFeed } from "../youthHunter/feed";
import { combineYouthCatalogue } from "./combinedCatalogue";
import { fixtureListing, fixtureNow, packet } from "./fixtures/policy";
import type { YouthListing } from "./model";

// Synthetic rendering fixtures only; never part of a provider feed or curation.
function role(subject: "reading" | "math"): YouthListing {
  const base = fixtureListing(packet.cases.find(c => c.id === "teen-free-role")!);
  return { ...base, id: `synthetic-${subject}`, title: `Synthetic ${subject} volunteer`,
    cost: { status: "unknown", original: "Costs not confirmed in this synthetic case.", requiredCosts: [] },
    roleDetails: { contentMode: "authored-facts", description: `Help with ${subject} practice.`, responsibilities: [`Support a ${subject} activity.`],
      requirements: ["Grades 9–12.", "Submit only one application."], commitment: "Ten one-hour sessions; planned time is not completed time.",
      selection: "An application does not guarantee selection.", costNotes: "Costs and screening expenses are unconfirmed. Not verified free.",
      applicationUrl: `https://example.org/${subject}-application`, applicationInstructions: "Submit only one application. Read the provider conditions before applying." } };
}
function feed() { return buildPublicYouthFeed({ schemaVersion: 1, roles: [role("reading"), role("math")], fingerprints: {}, retiredIds: [] }, fixtureNow); }

test("cost-unconfirmed roles are visible as leads without a collapsed section, free badge or directory count", () => {
  const html = renderToStaticMarkup(<HighSchoolDiscovery listings={feed().opportunities} pathway="volunteer" now={fixtureNow} catalogueState="ready" />);
  assert(html.includes("2 role leads with unconfirmed costs"));
  assert(html.includes("Volunteer roles — costs need confirmation"));
  assert(html.includes("Help with reading practice.") && html.includes("Help with math practice."));
  assert(!html.includes("<details>") && !html.includes("provider directories") && !html.includes("Provider lists it as free"));
  assert(!html.includes("Individual roles are still being reviewed"));
});
test("full authored responsibilities, conditions and distinct provider application routes survive detail rendering", () => {
  for (const subject of ["reading", "math"] as const) {
    const html = renderToStaticMarkup(<YouthListingDetail listing={role(subject)} now={fixtureNow} onBack={() => {}} />);
    assert(html.includes(`Support a ${subject} activity.`));
    assert(html.includes("Submit only one application."));
    assert(html.includes("Ten one-hour sessions; planned time is not completed time."));
    assert(html.includes("Costs and screening expenses are unconfirmed. Not verified free."));
    assert(html.includes(`href="https://example.org/${subject}-application"`));
    assert(html.includes("Review provider application"));
    assert(!html.includes("Apply now") && !html.includes("10 recorded hours"));
  }
});
test("current feed wins duplicate IDs while source descriptions and static records remain untouched", () => {
  const current = feed(); const old = { ...role("reading"), title: "Old synthetic role" };
  const before = JSON.stringify(old);
  const combined = combineYouthCatalogue([old], current, fixtureNow);
  assert.equal(combined.invalidRoleFeed, false);
  assert.equal(combined.listings.length, 2);
  assert(!combined.listings.some(r => r.title === "Old synthetic role"));
  assert.equal(JSON.stringify(old), before);
});
test("malformed role feed preserves curated data but is an explicit role-feed failure, not ready-empty", () => {
  const base = role("reading");
  const originalWire = JSON.stringify([base]);
  const combined = combineYouthCatalogue([base], { ...feed(), count: 99 }, fixtureNow);
  assert.equal(combined.invalidRoleFeed, true);
  assert.equal(combined.feed, undefined);
  // The canonical parser deliberately drops JS-only undefined properties.
  // Compare every wire field rather than requiring non-JSON placeholder keys.
  assert.equal(JSON.stringify(combined.listings), originalWire);
  assert.equal(JSON.stringify([base]), originalWire, "The caller's original data is unchanged");
});
test("an expired source check cannot remain a role through a duplicate static fallback or renewed feed date", () => {
  const source = feed();
  const combined = combineYouthCatalogue([role("reading")], source, "2026-12-10T12:00:00.000Z");
  assert.equal(combined.feed?.count, 0);
  assert.equal(combined.feed?.generatedAt, source.generatedAt);
  assert.equal(combined.listings.length, 0);
  assert.equal(combined.displayedFeedState, "stale", "An earlier ready snapshot cannot become fresh zero after its checks expire");
  const empty = buildPublicYouthFeed({ schemaVersion: 1, roles: [], fingerprints: {}, retiredIds: [] }, fixtureNow);
  const boundary = new Date(Date.parse(fixtureNow) + 30 * 86_400_000).toISOString();
  const expired = new Date(Date.parse(boundary) + 1).toISOString();
  assert.equal(combineYouthCatalogue([], empty, fixtureNow).displayedFeedState, "ready");
  assert.equal(combineYouthCatalogue([], empty, boundary).displayedFeedState, "ready");
  assert.equal(combineYouthCatalogue([], empty, expired).displayedFeedState, "stale", "Even an empty old envelope becomes stale");
  assert.equal(combineYouthCatalogue([], empty, new Date(Date.parse(fixtureNow) - 1).toISOString()).invalidRoleFeed, true);
});
