import assert from "node:assert/strict";
import test from "node:test";
import identities from "./fixtures/source-identities-20261030.json";
import youth from "../highSchool/curatedListings.json";
import { attachReviewedTplProgramPolicy, tplProgramSupportObservation } from "./reviewedPolicies";
import type { Opportunity } from "../types";

test("the exact tracked TPL provider/type/source sample gains only three conditional request policies", () => {
  // The identity fixture contains only the exact fields the mapper reads; it is
  // not a substitute for catalogue-wide Opportunity schema validation.
  const row = identities.tpl as unknown as Opportunity;
  const before = JSON.stringify(row);
  const attached = attachReviewedTplProgramPolicy(row, tplProgramSupportObservation);
  assert.deepEqual(attached.accessibilitySupport?.evidence.map(e => e.category), ["sign-language", "hearing-captioning", "support-person"]);
  assert(attached.accessibilitySupport?.evidence.every(e => e.scope === "provider-policy" && e.status === "on-request" && e.reviewStatus === "approved"));
  assert(attached.accessibilitySupport?.evidence.every(e => e.conditions?.some(c => c.includes("two weeks"))));
  assert(attached.accessibilitySupport?.evidence.find(e => e.category === "support-person")?.conditions?.some(c => c.includes("does not confirm that you may bring your own")));
  assert.deepEqual(attached.accessibility, row.accessibility);
  assert.equal(JSON.stringify(row), before);
});
test("actual MPL/YRES/directory identities and a different event host gain no TPL claim", () => {
  const yres = youth.find(r => r.provider === "York Region Educational Services")!;
  const directory = youth.find(r => r.listingKind === "provider-directory")!;
  assert(yres && directory);
  const rows = [identities.mpl, yres, directory, { ...identities.tpl, sourceUrl: identities.tpl.sourceUrl.replace("tpl.bibliocommons.com", "another.bibliocommons.com") }];
  for (const row of rows) assert.equal(attachReviewedTplProgramPolicy(row as unknown as Opportunity, tplProgramSupportObservation), row);
});
test("a reviewed policy revision replaces only its exact policy records, retaining event negatives and notes", () => {
  const row = identities.tpl as unknown as Opportunity;
  const attached = attachReviewedTplProgramPolicy(row, tplProgramSupportObservation);
  const negative = { ...tplProgramSupportObservation.evidence[0], scope: "activity" as const, status: "not-available" as const };
  attached.accessibilitySupport!.evidence.push(negative);
  // Synthetic manual revision only; no production source check is advanced.
  const revision = { schemaVersion: 1 as const, evidence: tplProgramSupportObservation.evidence.map(e => ({ ...e, checkedAt: "2026-10-31T06:51:08.000Z" })) };
  const updated = attachReviewedTplProgramPolicy(attached, revision);
  assert.equal(updated.accessibilitySupport?.evidence.length, 4);
  assert(updated.accessibilitySupport?.evidence.includes(negative) === false, "Parser clones evidence rather than sharing mutable input");
  assert(updated.accessibilitySupport?.evidence.some(e => e.scope === "activity" && e.status === "not-available" && e.checkedAt === negative.checkedAt));
  assert(updated.accessibilitySupport?.evidence.filter(e => e.scope === "provider-policy").every(e => e.checkedAt === revision.evidence[0].checkedAt));
  assert.deepEqual(updated.accessibility, row.accessibility);
});
test("ordinary imports do not renew policy checks or turn held proof into approved metadata", () => {
  const row = identities.tpl as unknown as Opportunity;
  const attached = attachReviewedTplProgramPolicy(row, tplProgramSupportObservation);
  const repeated = attachReviewedTplProgramPolicy(attached, tplProgramSupportObservation);
  assert.deepEqual(repeated.accessibilitySupport, attached.accessibilitySupport);
  assert.throws(() => attachReviewedTplProgramPolicy(row, { schemaVersion: 1, evidence: tplProgramSupportObservation.evidence.map(e => ({ ...e, reviewStatus: "hold" as const })) }));
});
