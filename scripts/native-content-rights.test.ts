import assert from "node:assert/strict";
import { nativeContentRights } from "./native-content-rights";
import { scienceCentreFactualSummary, autismOntarioFactualSummary } from "./native-source-policy";

const toronto = { id: "tpl-test-current", organization: "Toronto Public Library", sourceUrl: "https://tpl.bibliocommons.com/events/123", registrationUrl: "https://tpl.bibliocommons.com/events/123" };
const markham = { id: "markham-test-current", organization: "Markham Public Library", sourceUrl: "https://markham.bibliocommons.com/events/456", registrationUrl: "https://markham.bibliocommons.com/events/456" };
const scienceCentreURL = "https://www.ontariosciencecentre.ca/whats-on/pop-ups-plus-events/pride-in-stem-2026";
const scienceCentre = { id: "ontario-science-centre-pride-in-stem-2026", organization: "Ontario Science Centre", sourceUrl: scienceCentreURL, registrationUrl: scienceCentreURL, description: scienceCentreFactualSummary, title: "Pride in STEM 2026", startDate: "2026-11-21T09:00:00-05:00", endDate: "2026-11-21T15:00:00-05:00", city: "Toronto", region: "Toronto", address: "Evergreen Brick Works, 550 Bayview Avenue, Toronto, ON M4W 3X8", ageMin: 0, cost: "Free to join", accessibilitySupport: [{ kind: "wheelchair", status: "confirmed", evidenceUrl: scienceCentreURL, sourceExcerpt: "Evergreen Brick Works is wheelchair accessible and accessible by public transit.", checkedAt: "2026-11-10" }] };
const autismURL = "https://www.autismontario.com/civicrm/event/info?id=13084";
const autismEvent = { id: "autism-ontario-newmarket-quiet-santa-2026-11-22", organization: "Autism Ontario", sourceUrl: autismURL, registrationUrl: autismURL, description: autismOntarioFactualSummary, title: "Quiet Time with Santa — Newmarket", startDate: "2026-11-22T08:30:00-05:00", endDate: "2026-11-22T10:30:00-05:00", city: "Newmarket", region: "York", address: "Upper Canada Mall, 17600 Yonge Street, Newmarket, ON L3Y 4Z1", ageMin: 0, cost: "Free to join" };
const unapproved = { ...toronto, id: "unknown", organization: "Other Library" };
const manifest = nativeContentRights([toronto, markham], [toronto, markham, unapproved], "2026-10-25");
assert.deepEqual(manifest.sources.map((source) => [source.organization, source.records]), [["Toronto Public Library", 1], ["Markham Public Library", 1]]);
assert(manifest.restrictedOpportunityIds.includes("unknown"));
assert.equal(new Set(manifest.restrictedOpportunityIds).size, manifest.restrictedOpportunityIds.length);
assert.equal(manifest.restrictedOpportunityIds.filter((id) => id !== "unknown").length, 77);
assert(manifest.sources.every((source) => source.status === "owner-confirmed-permission" && source.ownerPermission?.confirmedAt === "2026-10-25"));
const later = nativeContentRights([toronto], [toronto], "2026-10-26");
assert.equal(later.termsVerifiedAt, "2026-10-26");
assert.deepEqual(later.sources[0].ownerPermission, manifest.sources[0].ownerPermission);
assert(!Object.hasOwn(later.sources[0], "termsVersion"));
const expanded = nativeContentRights([toronto, scienceCentre, autismEvent], [toronto, scienceCentre, autismEvent], "2026-11-10");
const scienceRights = expanded.sources.find((source) => source.organization === "Ontario Science Centre");
assert.equal(scienceRights?.status, "original-factual-summary");
assert.equal(scienceRights?.ownerPermission, undefined, "Do not invent an agreement or confirmation date.");
assert.equal(expanded.sources.find((source) => source.organization === "Autism Ontario")?.status, "original-factual-summary");
for (const invalid of [
  unapproved,
  { ...toronto, sourceUrl: "https://tpl.bibliocommons.com.attacker.example/events/123" },
  { ...toronto, sourceUrl: "http://tpl.bibliocommons.com/events/123" },
  { ...toronto, sourceUrl: "https://user@tpl.bibliocommons.com/events/123" },
  { ...toronto, sourceUrl: "https://tpl.bibliocommons.com:444/events/123" },
  { ...toronto, sourceUrl: "https://tpl.bibliocommons.com/other/123" },
  { ...toronto, registrationUrl: "https://unapproved.example/" },
  { ...toronto, sourceUrl: "invalid" },
  { ...toronto, id: "tpl-animation-piskel-kids-2026-06-03" },
  { ...scienceCentre, id: "unexpected-id" },
  { ...scienceCentre, description: scienceCentreFactualSummary + " altered" },
  { ...scienceCentre, startDate: "2026-11-21T10:00:00-05:00" },
  { ...scienceCentre, sourceUrl: scienceCentre.sourceUrl + "-different", registrationUrl: scienceCentre.sourceUrl + "-different" },
  { ...scienceCentre, registrationUrl: "https://www.eventbrite.ca/" },
  { ...autismEvent, accessibilitySupport: [] },
  { ...autismEvent, description: autismOntarioFactualSummary + " altered" }
]) assert.throws(() => nativeContentRights([invalid], [invalid], "2026-10-25"), /unapproved|restricted/);
assert.throws(() => nativeContentRights([toronto], [toronto], "2026-10-24"), /date/);
console.log(JSON.stringify({ nativeRightsContract: "owner-confirmed two-provider permission", positiveSnapshots: 2, negativeCases: 10, knownHistoricalRestrictedIds: 77, unknownProvidersDenied: true, permissionDateNeverRenewedByRefresh: true }));
