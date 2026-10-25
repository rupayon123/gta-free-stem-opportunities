import assert from "node:assert/strict";
import { nativeContentRights } from "./native-content-rights";

const toronto = { id: "tpl-test-current", organization: "Toronto Public Library", sourceUrl: "https://tpl.bibliocommons.com/events/123", registrationUrl: "https://tpl.bibliocommons.com/events/123" };
const markham = { id: "markham-test-current", organization: "Markham Public Library", sourceUrl: "https://markham.bibliocommons.com/events/456", registrationUrl: "https://markham.bibliocommons.com/events/456" };
const unapproved = { ...toronto, id: "unknown", organization: "Other Library" };
const manifest = nativeContentRights([toronto, markham], [toronto, markham, unapproved], "2026-10-25");
assert.deepEqual(manifest.sources.map((source) => [source.organization, source.records]), [["Toronto Public Library", 1], ["Markham Public Library", 1]]);
assert(manifest.restrictedOpportunityIds.includes("unknown"));
assert.equal(new Set(manifest.restrictedOpportunityIds).size, manifest.restrictedOpportunityIds.length);
assert.equal(manifest.restrictedOpportunityIds.filter((id) => id !== "unknown").length, 77);
assert(manifest.sources.every((source) => source.status === "owner-confirmed-permission" && source.ownerPermission.confirmedAt === "2026-10-25"));
const later = nativeContentRights([toronto], [toronto], "2026-10-26");
assert.equal(later.termsVerifiedAt, "2026-10-26");
assert.deepEqual(later.sources[0].ownerPermission, manifest.sources[0].ownerPermission);
assert(!Object.hasOwn(later.sources[0], "termsVersion"));
for (const invalid of [
  unapproved,
  { ...toronto, sourceUrl: "https://tpl.bibliocommons.com.attacker.example/events/123" },
  { ...toronto, sourceUrl: "http://tpl.bibliocommons.com/events/123" },
  { ...toronto, sourceUrl: "https://user@tpl.bibliocommons.com/events/123" },
  { ...toronto, sourceUrl: "https://tpl.bibliocommons.com:444/events/123" },
  { ...toronto, sourceUrl: "https://tpl.bibliocommons.com/other/123" },
  { ...toronto, registrationUrl: "https://unapproved.example/" },
  { ...toronto, sourceUrl: "invalid" },
  { ...toronto, id: "tpl-animation-piskel-kids-2026-06-03" }
]) assert.throws(() => nativeContentRights([invalid], [invalid], "2026-10-25"), /unapproved|restricted/);
assert.throws(() => nativeContentRights([toronto], [toronto], "2026-10-24"), /date/);
console.log(JSON.stringify({ nativeRightsContract: "owner-confirmed two-provider permission", positiveSnapshots: 2, negativeCases: 10, knownHistoricalRestrictedIds: 77, unknownProvidersDenied: true, permissionDateNeverRenewedByRefresh: true }));
