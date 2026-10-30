/** REVIEW DRAFT. Copy only into the isolated candidate's scripts directory after
 * a runtime grant. Execute once with existing TSX, no install or provider calls.
 * Args: candidate root, evidence directory. Never publish or invoke a collector.
 */
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, renameSync } from "node:fs";
import { resolve, join } from "node:path";
import { createHash } from "node:crypto";
import { attachReviewedTplProgramPolicy, tplProgramSupportObservation } from "../lib/accessibility/reviewedPolicies";
import type { Opportunity } from "../lib/types";

const root = resolve(process.argv[2]);
const evidence = resolve(process.argv[3]);
globalThis.fetch = async () => { throw new Error("Offline reconciliation forbids network"); };
const mapperBytes = readFileSync(join(root, "lib/accessibility/reviewedPolicies.ts"));
assert.equal(createHash("sha1").update(`blob ${mapperBytes.length}\0`).update(mapperBytes).digest("hex"),
  "77b58b819ac751768856a822d0543a500e2fc4c0", "Approved mapper source changed");
const relative = "lib/generatedLibraryOpportunities.ts";
const original = readFileSync(join(evidence, "baseline", relative), "utf8");
assert.equal(readFileSync(join(root, relative), "utf8"), original, "Candidate must start at exact fresh main");
const marker = "export const generatedLibraryOpportunities = ";
const start = original.indexOf(marker) + marker.length;
const ending = "\n] satisfies Opportunity[];";
const end = original.indexOf(ending, start) + 2;
assert(start >= marker.length && end > start && original.indexOf(marker, start) === -1, "Unexpected generated source shape");
const rows = JSON.parse(original.slice(start, end)) as Opportunity[];
assert(Array.isArray(rows) && rows.length > 0 && rows.length <= 15_000);
assert.equal(new Set(rows.map(row => row.id)).size, rows.length, "Duplicate fresh IDs");
const untouchedRows = JSON.stringify(rows);
assert(tplProgramSupportObservation.evidence.length === 3);
assert(tplProgramSupportObservation.evidence.every(row => row.checkedAt === "2026-10-30T06:51:08.000Z"));
const stripProof = ({ accessibilitySupport: _proof, ...rest }: Opportunity) => rest;
const ownedCategories = new Set(["sign-language", "hearing-captioning", "support-person"]);
const isOwnedReplacement = (proof: { sourceUrl: string; scope: string; category: string }) =>
  proof.sourceUrl === "https://tpl.ca/accessibility/accessibility-supports/programs-and-events/"
  && proof.scope === "provider-policy" && ownedCategories.has(proof.category);
const mapped = rows.map(row => attachReviewedTplProgramPolicy(row, tplProgramSupportObservation));
assert.equal(JSON.stringify(rows), untouchedRows, "Mapper mutated fresh input");
assert.deepEqual(mapped.map(stripProof), rows.map(stripProof), "Every non-proof field, order, ID, description and timestamp must survive");
for (let i = 0; i < rows.length; i++) {
  const previous = rows[i].accessibilitySupport?.evidence ?? [];
  for (const proof of previous.filter(item => !isOwnedReplacement(item))) {
    assert(mapped[i].accessibilitySupport?.evidence.some(item => JSON.stringify(item) === JSON.stringify(proof)), "Every unrelated proof, including other provider policies and event/venue negatives, must survive");
  }
}
const updated = original.slice(0, start) + JSON.stringify(mapped, null, 2) + original.slice(end);
assert.equal(updated.slice(updated.indexOf(ending) + ending.length), original.slice(end + " satisfies Opportunity[];".length), "Source-health suffix must remain byte-exact");
const changed = mapped.filter((row, i) => JSON.stringify(row) !== JSON.stringify(rows[i])).length;
assert(changed > 0, "Expected proof overlay absent; stop for review");
const temp = join(root, relative + ".reconcile.tmp");
writeFileSync(temp, updated, { flag: "wx" });
renameSync(temp, join(root, relative));
const hash = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
const paired = ["data/youth-hunter-state.json", "data/youth-hunter-manifest.json", "public/youth-opportunities.json"];
for (const path of ["lib/generatedDiscoveryReview.ts", ...paired]) {
  assert(readFileSync(join(root, path)).equals(readFileSync(join(evidence, "baseline", path))), "Unrelated snapshot changed: " + path);
}
writeFileSync(join(evidence, "overlay.json"), JSON.stringify({ rows: rows.length, changed, nonProofEquality: true,
  policyCheckedAt: "2026-10-30T06:51:08.000Z", masterBeforeSHA256: hash(original), masterAfterSHA256: hash(updated),
  captureSuffixUnchanged: true, discoveryAndYouthByteExact: true, providerRequests: 0 }, null, 2) + "\n", { flag: "wx" });
