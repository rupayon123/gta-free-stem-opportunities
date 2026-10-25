import assert from "node:assert/strict";
import { prepareNativePublication, publicationRevisionTime, serializeNativeFeed } from "./native-publication";

const now = new Date("2026-10-25T22:30:00.000Z");
const candidate = { count: 1, lastDataChange: "2026-10-25", opportunities: [{ id: "new-program", description: "Full provider text" }] };
let passed = 0;
function check(name: string, run: () => void) { run(); passed++; console.log(`PASS ${name}`); }

check("legacy source bootstraps once without changing data freshness", () => {
  const result = prepareNativePublication(candidate, JSON.stringify(candidate), "publish", now);
  assert.equal(result.publicationRevision, now.toISOString());
  assert.equal(JSON.parse(result.contents).lastDataChange, candidate.lastDataChange);
  const later = prepareNativePublication(candidate, result.contents, "publish", new Date(now.getTime() + 86_400_000));
  assert.deepEqual(later, { ...result, changed: false });
});

const first = prepareNativePublication(candidate, undefined, "publish", now);
check("same-day correction receives a strictly newer revision, even with a backwards clock", () => {
  const correction = { ...candidate, opportunities: [{ id: "corrected-program" }] };
  const result = prepareNativePublication(correction, first.contents, "publish", new Date(now.getTime() - 1000));
  assert.equal(result.publicationRevision, "2026-10-25T22:30:00.001Z");
  assert.equal(JSON.parse(result.contents).opportunities[0].id, "corrected-program");
});
check("all accepted payload fields participate in revision identity", () => {
  const result = prepareNativePublication({ ...candidate, coverage: { cities: ["Toronto"] } }, first.contents, "publish", now);
  assert.notEqual(result.publicationRevision, first.publicationRevision);
});
check("unchanged publication retains exact accepted bytes and revision", () => {
  const compact = JSON.stringify(JSON.parse(first.contents));
  const result = prepareNativePublication({ ...candidate, optional: undefined }, compact, "publish", new Date(now.getTime() + 5000));
  assert.equal(result.contents, compact);
  assert.equal(result.changed, false);
});
check("delayed builds reuse the old accepted revision and cannot leapfrog a correction", () => {
  const correction = prepareNativePublication({ ...candidate, opportunities: [{ id: "corrected-program" }] }, first.contents, "publish", now);
  const oldBuild = prepareNativePublication(candidate, first.contents, "verify", new Date(now.getTime() + 7 * 86_400_000));
  assert.equal(oldBuild.contents, first.contents);
  assert(oldBuild.publicationRevision < correction.publicationRevision);
});
check("read-only build rejects changed source, missing output and missing revision", () => {
  assert.throws(() => prepareNativePublication({ ...candidate, opportunities: [{ id: "unpublished" }] }, first.contents, "verify", now), /builds never assign/);
  assert.throws(() => prepareNativePublication(candidate, undefined, "verify", now), /builds never assign/);
  assert.throws(() => prepareNativePublication(candidate, JSON.stringify(candidate), "verify", now), /builds never assign/);
});
check("incoming candidate revision cannot forge the assigned source revision", () => {
  const forged = prepareNativePublication({ ...candidate, publicationRevision: "2099-01-01T00:00:00.000Z" }, undefined, "publish", now);
  assert.equal(forged.publicationRevision, now.toISOString());
});
check("malformed, null, noncanonical and future accepted revisions fail closed", () => {
  for (const revision of [null, 42, "", "2026-10-25", "2026-10-25T22:30:00Z", "2026-02-30T22:30:00.000Z", "1970-01-01T00:00:00.000Z", "2026-10-25T22:35:00.001Z"]) {
    for (const mode of ["publish", "verify"] as const) {
      assert.throws(() => prepareNativePublication(candidate, JSON.stringify({ ...candidate, publicationRevision: revision }), mode, now));
    }
  }
});
check("five-minute clock boundary is exact and cannot overflow on a new publication", () => {
  const boundary = "2026-10-25T22:35:00.000Z";
  assert.equal(publicationRevisionTime(boundary, now.getTime()), now.getTime() + 300_000);
  const previous = JSON.stringify({ ...candidate, publicationRevision: boundary });
  assert.equal(prepareNativePublication(candidate, previous, "publish", now).contents, previous);
  assert.throws(() => prepareNativePublication({ ...candidate, count: 0, opportunities: [] }, previous, "publish", now), /future/);
});
check("bad predecessor JSON, counts and oversized bytes fail before publication", () => {
  for (const previous of ["{", "null", "[]", JSON.stringify({ ...candidate, count: 2 }), JSON.stringify({ ...candidate, padding: "x".repeat(10_000_001) })]) {
    assert.throws(() => prepareNativePublication(candidate, previous, "publish", now));
  }
});
check("native UTF-8 byte and record bounds also include new metadata", () => {
  assert.throws(() => serializeNativeFeed({ count: 5000, opportunities: Array(5000).fill({}) }), /records/);
  assert.throws(() => prepareNativePublication({ count: 1, opportunities: [{ body: "🧪".repeat(2_500_000) }] }, first.contents, "publish", now), /UTF-8/);
  for (const count of [-1, 0.5, Number.NaN]) assert.throws(() => serializeNativeFeed({ count, opportunities: [] }), /inconsistent/);
});
check("retries assign against the newly accepted predecessor", () => {
  const concurrent = prepareNativePublication({ ...candidate, opportunities: [{ id: "concurrent" }] }, first.contents, "publish", now);
  const retry = prepareNativePublication({ ...candidate, opportunities: [{ id: "retry" }] }, concurrent.contents, "publish", now);
  assert(retry.publicationRevision > concurrent.publicationRevision);
  assert.equal(retry.publicationRevision, "2026-10-25T22:30:00.002Z");
});
console.log(JSON.stringify({ nativePublicationTests: passed, buildMintingAllowed: false, nativeBoundsRetained: true }));
