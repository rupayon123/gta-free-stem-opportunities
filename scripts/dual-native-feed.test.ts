import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const v1Path = process.env.GTA_REVIEW_V1_PATH;
const v2Path = process.env.GTA_REVIEW_V2_PATH;
if (!v1Path || !v2Path) throw new Error("Both isolated review feed paths are required.");
const legacyBytes = readFileSync(v1Path); const expandedBytes = readFileSync(v2Path);
const v1 = JSON.parse(legacyBytes.toString("utf8")); const v2 = JSON.parse(expandedBytes.toString("utf8"));
const prior = JSON.parse(readFileSync("public/opportunities.json", "utf8"));
const allowed = new Map([["Toronto Public Library", "tpl.bibliocommons.com"], ["Markham Public Library", "markham.bibliocommons.com"]]);
assert.equal(v1.count, v1.opportunities.length); assert.equal(v2.count, v2.opportunities.length);
assert.equal(v1.count, prior.count); assert.equal(v2.count, prior.count + 2);
for (const feed of [v1, v2]) {
  assert(feed.opportunities.length <= 4999);
  assert(feed.contentRights.termsVerifiedAt >= feed.lastDataChange.slice(0, 10));
  assert.equal(new Set(feed.opportunities.map((row: { id: string }) => row.id)).size, feed.count);
}
assert(legacyBytes.length <= 10000000 && expandedBytes.length <= 10000000);
const restricted = new Set(v1.contentRights.restrictedOpportunityIds);
const counts = new Map<string, number>();
for (const row of v1.opportunities) {
  const url = new URL(row.sourceUrl); const host = allowed.get(row.organization);
  assert(host && url.protocol === "https:" && url.hostname === host && url.pathname.startsWith("/events/") && row.registrationUrl === row.sourceUrl);
  assert.equal(row.cost, "Free to join"); assert(!restricted.has(row.id));
  counts.set(row.organization, (counts.get(row.organization) ?? 0) + 1);
}
assert.equal(new Set(v1.contentRights.restrictedOpportunityIds).size, v1.contentRights.restrictedOpportunityIds.length);
assert.equal(v1.contentRights.sources.length, counts.size);
for (const source of v1.contentRights.sources) {
  assert.equal(allowed.get(source.organization), source.sourceHost);
  assert.equal(source.status, "owner-confirmed-permission"); assert.equal(source.records, counts.get(source.organization));
  assert.equal(source.ownerPermission.confirmationID, "gta-library-content-2026-10-25");
  assert.equal(source.ownerPermission.confirmedAt, "2026-10-25");
  assert.deepEqual(source.ownerPermission.scope, ["display-event-listings", "translate-event-listings"]);
}
const v1ById = new Map(v1.opportunities.map((row: { id: string }) => [row.id, row]));
for (const old of prior.opportunities) assert.deepEqual((v1ById.get(old.id) as { description: string }).description, old.description);
const v2ById = new Map(v2.opportunities.map((row: { id: string }) => [row.id, row]));
for (const [id, row] of v1ById) assert.deepEqual(v2ById.get(id), row);
for (const id of ["ontario-science-centre-pride-in-stem-2026", "autism-ontario-newmarket-quiet-santa-2026-11-22"]) {
  assert(!v1ById.has(id)); assert(v2ById.has(id));
}
const digest = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");
console.log(JSON.stringify({ legacy: { count: v1.count, bytes: legacyBytes.length, sha256: digest(legacyBytes) }, expanded: { count: v2.count, bytes: expandedBytes.length, sha256: digest(expandedBytes) }, oldRightsContractAndSharedRows: "passed" }));
