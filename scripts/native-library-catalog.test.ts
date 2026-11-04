import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { generatedLibraryOpportunities, generatedLibrarySourceHealth } from "../lib/generatedLibraryOpportunities";
import { publicOpportunities } from "../lib/opportunityStatus";
import { exportReviewCatalog } from "./export-native-library-catalog";
import { evaluateLibraryRefreshHealth } from "../lib/refreshHealth";
import type { Opportunity } from "../lib/types";
import { buildNativeLibraryCatalog, catalogBytes, catalogHash, catalogRevisionFromRaw, catalogRevisionRawSegments, libraryCatalogLimits, verifyNativeLibraryCatalog, writeNativeLibraryCatalog, type LibraryCatalogManifest, type LibraryCatalogPlan } from "./native-library-catalog";

const capture = "2026-10-28T22:37:18.100Z", publication = "2026-10-28T22:39:40.937Z";
const now = new Date("2026-10-28T23:00:00.000Z"), accepted = "b".repeat(40);
const originalBody = "  Complete provider body 🧪\n" + "Café — தமிழ் — 中文. ".repeat(80) + "\nFinal eligibility, dates and contact details.  ";
function rows(count = 30): Opportunity[] {
  return Array.from({ length: count }, (_, index) => ({ ...structuredClone(generatedLibraryOpportunities[0]), id: `catalog-test-${String(index).padStart(5, "0")}`, description: originalBody, startDate: "2026-11-01", endDate: "2026-11-01", deadline: "2026-11-01", lastChecked: "2026-10-28", lastSeen: "2026-10-28", status: "active", ageMin: 0.5, ageMax: 1.5, ageLabel: "6 to 18 months", virtual: false, sources: [{ label: "Provider", url: generatedLibraryOpportunities[0].sourceUrl, capturedAt: capture, confidence: "high" }] }));
}
function health(input: Opportunity[], generatedAt = capture) {
  const organizations = [...new Set(input.map(row => row.organization))];
  return evaluateLibraryRefreshHealth({ generatedAt, acceptedListings: input.length, previousPublishedListings: input.length, sources: organizations.map(organization => ({ sourceId: organization, organization, attemptedPages: 10, successfulPages: 10, acceptedListings: input.filter(row => row.organization === organization).length })) }).health;
}
function build(input = rows(), revision = publication, generatedAt = capture) { return buildNativeLibraryCatalog(input, health(input, generatedAt), accepted, revision, now); }
function manifest(plan: LibraryCatalogPlan): LibraryCatalogManifest { return JSON.parse(plan.manifest.toString("utf8")); }
function verify(plan: LibraryCatalogPlan) { return verifyNativeLibraryCatalog(plan.manifest, path => plan.chunks.get(path)!, now); }
function alterManifest(plan: LibraryCatalogPlan, change: (value: LibraryCatalogManifest) => void) { const value = manifest(plan); change(value); return { ...plan, manifest: catalogBytes(value) }; }
function alterChunk(plan: LibraryCatalogPlan, change: (value: { opportunities: Record<string, unknown>[]; [key: string]: unknown }) => void, index = 0) {
  const value = manifest(plan), descriptor = value.chunks[index], chunks = new Map(plan.chunks);
  const chunk = JSON.parse(chunks.get(descriptor.path)!.toString("utf8")); change(chunk);
  const bytes = catalogBytes(chunk); chunks.delete(descriptor.path);
  value.totalChunkBytes += bytes.length - descriptor.bytes;
  descriptor.bytes = bytes.length; descriptor.sha256 = catalogHash(bytes);
  descriptor.path = `/native-library/${value.catalogueRevision}/${String(index).padStart(3, "0")}-${descriptor.sha256}.json`;
  chunks.set(descriptor.path, bytes); return { manifest: catalogBytes(value), chunks };
}
let passed = 0;
function check(name: string, run: () => void) { run(); passed++; console.log(`PASS ${name}`); }
function rejects(name: string, plan: () => LibraryCatalogPlan, pattern?: RegExp) { check(name, () => { if (pattern) assert.throws(() => verify(plan()), pattern); else assert.throws(() => verify(plan())); }); }
const vectors = JSON.parse(readFileSync(new URL("./native-library-catalog-digest-vectors.json", import.meta.url), "utf8")) as { vectors: { name: string; manifestRawUTF8: string; orderedShardRawUTF8: string[]; expectedSHA256: string; preimageUTF8Bytes: number }[] };
for (const vector of vectors.vectors) check(`independent raw-byte golden vector ${vector.name}`, () => {
  const bytes = Buffer.from(vector.manifestRawUTF8), shards = vector.orderedShardRawUTF8.map(raw => Buffer.from(raw));
  assert.equal(catalogRevisionFromRaw(bytes, shards), vector.expectedSHA256);
  assert.equal([...catalogRevisionRawSegments(bytes, shards)].reduce((sum, part) => sum + part.byteLength, 0), vector.preimageUTF8Bytes);
});
check("digest reference refuses noncanonical integer1.0 without rewriting it", () => { const vector = vectors.vectors[0]; assert.throws(() => catalogRevisionFromRaw(Buffer.from(vector.manifestRawUTF8), vector.orderedShardRawUTF8.map(raw => Buffer.from(raw.replace('"ageMax":1,', '"ageMax":1.0,')))), /noncanonical/); });
check("digest reference refuses Unicode escape substitution despite equivalent decoded text", () => { const vector = vectors.vectors[1]; assert.throws(() => catalogRevisionFromRaw(Buffer.from(vector.manifestRawUTF8), vector.orderedShardRawUTF8.map(raw => Buffer.from(raw.replace('café', 'caf\\u00e9')))), /noncanonical/); });
check("digest reference refuses duplicate record keys", () => { const vector = vectors.vectors[0]; assert.throws(() => catalogRevisionFromRaw(Buffer.from(vector.manifestRawUTF8), vector.orderedShardRawUTF8.map(raw => Buffer.from(raw.replace('"ageMax":1,', '"ageMax":2,"ageMax":1,')))), /noncanonical/); });
const initial = build();
check("preserves complete UTF-8 original body including whitespace and ending", () => assert.deepEqual(Buffer.from(verify(initial)[0].description), Buffer.from(originalBody)));
check("retains non-STEM community listings, decimal ages and original month label", () => { const row = verify(initial)[0]; assert.equal(row.category, "Library & Community"); assert.equal(row.ageMin, 0.5); assert.equal(row.ageMax, 1.5); assert.equal(row.ageLabel, "6 to 18 months"); });
check("preserves Toronto date-only fields without UTC conversion", () => assert.equal(verify(initial)[0].startDate, "2026-11-01"));
check("marks all physical coordinates unverified without inventing delivery language", () => { const row = verify(initial)[0]; assert.equal(row.coordinatePrecision, "unverified"); assert.ok(!("language" in row)); assert.ok(!("languages" in row)); });
check("virtual coordinates explicitly not applicable", () => { const input = rows(); input[0].virtual = true; assert.equal(verify(build(input))[0].coordinatePrecision, "not-applicable"); });
check("input order and later wall clock do not change any artifact bytes", () => { const input = rows().reverse(); const next = buildNativeLibraryCatalog(input, health(rows()), accepted, publication, new Date("2026-10-29T01:00:00.000Z")); assert.deepEqual(next, initial); });
check("actual source revision and exact source body participate in identity", () => { const input = rows(); input[0].description += " correction"; assert.notEqual(manifest(build(input)).catalogueRevision, manifest(initial).catalogueRevision); assert.notEqual(manifest(buildNativeLibraryCatalog(rows(), health(rows()), "c".repeat(40), publication, now)).catalogueRevision, manifest(initial).catalogueRevision); });
check("excludes unavailable records explicitly rather than silently truncating", () => { const input = rows(); input[0].status = "hidden"; const result = manifest(build(input)); assert.equal(result.recordCount, 29); assert.equal(result.coverage.excludedUnavailableRecords, 1); assert.equal(result.coverage.sourceRecords, 30); });
check("splits at 1800 records and retains every stable ID globally ordered", () => { const plan = build(rows(1801).map(row => ({ ...row, description: "Complete short provider description." }))); assert.deepEqual(manifest(plan).chunks.map(chunk => chunk.records), [1800, 1]); assert.equal(new Set(verify(plan).map(row => row.id)).size, 1801); });
check("splits by UTF-8 bytes before record count limit", () => { const input = rows(); for (const row of input) row.description = "🧪".repeat(24_000); const plan = build(input.concat(rows(30).map((row, i) => ({ ...row, id: `z-${i}`, description: "🧪".repeat(24_000) })))); assert.ok(manifest(plan).chunks.length > 1); assert.ok(manifest(plan).chunks.every(chunk => chunk.bytes <= libraryCatalogLimits.chunkBytes)); assert.equal(verify(plan).length, 60); });
check("source floor and duplicate master IDs fail closed", () => { assert.throws(() => build(rows(29)), /health/); const input = rows(); input[1].id = input[0].id; assert.throws(() => build(input), /duplicate source/); });
check("full master upper bound rejected before generation", () => assert.throws(() => build(rows(15001)), /source record bound/));
check("unapproved source host and registration link refused even for hidden rows", () => { const input = rows(); input[0].status = "hidden"; input[0].sourceUrl = "https://evil.example/events/1"; assert.throws(() => build(input), /unapproved/); });
check("weakened and inconsistent source health rejected", () => { const input = rows(), candidate = health(input); candidate.minimumPageSuccessRatio = 0.1; assert.throws(() => buildNativeLibraryCatalog(input, candidate, accepted, publication, now), /threshold/); candidate.minimumPageSuccessRatio = 0.75; candidate.sources[0].acceptedListings--; assert.throws(() => buildNativeLibraryCatalog(input, candidate, accepted, publication, now), /membership/); });
check("stale and future collection clocks refused", () => { assert.throws(() => build(rows(), publication, "2026-10-01T00:00:00.000Z"), /clock/); assert.throws(() => build(rows(), "2026-10-30T00:00:00.000Z", "2026-10-30T00:00:00.000Z"), /clock/); });
check("publication cannot predate actual capture", () => assert.throws(() => build(rows(), "2026-10-28T21:00:00.000Z"), /predates/));
check("full text maximum fails instead of clipping", () => { const input = rows(); input[0].description = "🧪".repeat(25_001); assert.throws(() => build(input), /description/); });
for (const [name, change] of [
  ["incomplete manifest", (m: LibraryCatalogManifest) => { m.complete = false as true; }],
  ["foreign schema", (m: LibraryCatalogManifest) => { m.schemaVersion = 2 as 1; }],
  ["unknown manifest field", (m: LibraryCatalogManifest) => { Object.assign(m, { extra: true }); }],
  ["invalid source revision", (m: LibraryCatalogManifest) => { m.source.acceptedRevision = "HEAD"; }],
  ["modified full source health", (m: LibraryCatalogManifest) => { m.sourceHealth.successfulPages--; }],
  ["coverage count mismatch", (m: LibraryCatalogManifest) => { m.coverage.sourceRecords++; }],
  ["aggregate download overflow", (m: LibraryCatalogManifest) => { m.totalChunkBytes = 32_000_000; }],
  ["global count overflow", (m: LibraryCatalogManifest) => { m.recordCount = 15001; }],
  ["descriptor count overflow", (m: LibraryCatalogManifest) => { m.chunks[0].records = 5000; }],
  ["descriptor byte overflow", (m: LibraryCatalogManifest) => { m.chunks[0].bytes = 10_000_001; }],
  ["traversal path", (m: LibraryCatalogManifest) => { m.chunks[0].path = "/native-library/../opportunities.json"; }],
  ["cross-origin shard", (m: LibraryCatalogManifest) => { m.chunks[0].path = "https://evil.example/shard.json"; }],
  ["wrong generation path", (m: LibraryCatalogManifest) => { m.chunks[0].path = m.chunks[0].path.replace(m.catalogueRevision, "d".repeat(64)); }],
  ["descriptor ordering", (m: LibraryCatalogManifest) => { m.chunks[0].index = 1; }],
  ["wrong ID boundary", (m: LibraryCatalogManifest) => { m.chunks[0].firstID = "other"; }],
  ["changed permission grant", (m: LibraryCatalogManifest) => { m.contentRights.sources[0].ownerPermission.confirmationID = "different"; }],
  ["restricted accepted ID", (m: LibraryCatalogManifest) => { m.contentRights.restrictedOpportunityIds.push("catalog-test-00000"); }],
] as const) rejects(name, () => alterManifest(initial, change));
check("duplicate stable identity across two separate shards is rejected", () => {
  const multiple = build(rows(1801).map(row => ({ ...row, description: "Complete short description." })));
  const corrupted = alterChunk(multiple, chunk => { chunk.opportunities[0].id = "catalog-test-01799"; }, 1);
  assert.throws(() => verify(corrupted), /duplicate or unordered global/);
});
rejects("missing shard", () => ({ ...initial, chunks: new Map() }), /hash mismatch/);
rejects("corrupted exact bytes", () => { const chunks = new Map(initial.chunks); const [path, bytes] = [...chunks][0]; chunks.set(path, Buffer.concat([bytes, Buffer.from(" ")])); return { ...initial, chunks }; }, /hash mismatch/);
rejects("noncanonical JSON", () => ({ ...initial, manifest: Buffer.from(JSON.stringify(manifest(initial), null, 2)) }), /noncanonical/);
rejects("duplicate JSON keys", () => ({ ...initial, manifest: Buffer.from(initial.manifest.toString().replace('"complete":true', '"complete":false,"complete":true')) }), /noncanonical/);
for (const [name, change] of [
  ["mixed shard generation", (c: Record<string, unknown>) => { c.catalogueRevision = "d".repeat(64); }],
  ["unknown shard field", (c: Record<string, unknown>) => { c.extra = "invalid"; }],
  ["duplicate IDs", (c: { opportunities: Record<string, unknown>[] }) => { c.opportunities[1].id = c.opportunities[0].id; }],
  ["unverified coordinates promoted", (c: { opportunities: Record<string, unknown>[] }) => { c.opportunities[0].coordinatePrecision = "verified"; }],
  ["unknown source evidence field", (c: { opportunities: Record<string, unknown>[] }) => { (c.opportunities[0].sources as Record<string, unknown>[])[0].extra = "invalid"; }],
  ["unknown record field", (c: { opportunities: Record<string, unknown>[] }) => { c.opportunities[0].extra = "invalid"; }],
  ["fractional age made negative", (c: { opportunities: Record<string, unknown>[] }) => { c.opportunities[0].ageMin = -0.5; }],
  ["impossible calendar date", (c: { opportunities: Record<string, unknown>[] }) => { c.opportunities[0].startDate = "2026-02-30"; }],
  ["body changed despite updated descriptor hash", (c: { opportunities: Record<string, unknown>[] }) => { c.opportunities[0].description = "clipped"; }],
] as const) rejects(name, () => alterChunk(initial, change));

check("aggregate byte ceiling rejects oversized complete collection without clipping", () => { const input = rows(360).map(row => ({ ...row, description: "x".repeat(99_999) })); assert.throws(() => build(input), /aggregate byte/); });
check("date-only listing remains available through Toronto day after UTC midnight", () => {
  const input = rows().map(row => ({ ...row, startDate: "2026-10-28", endDate: "2026-10-28", deadline: "2026-10-28" }));
  const clock = "2026-10-29T01:00:00.000Z";
  const plan = buildNativeLibraryCatalog(input, health(input, clock), accepted, clock, new Date(clock));
  assert.equal(verifyNativeLibraryCatalog(plan.manifest, path => plan.chunks.get(path)!, new Date(clock)).length, 30);
});
check("real accepted master retains every full title/body and fractional range exactly", () => {
  const clock = new Date(Date.parse(generatedLibrarySourceHealth.generatedAt) + 60_000);
  const source = publicOpportunities(generatedLibraryOpportunities, new Date(generatedLibrarySourceHealth.generatedAt));
  const plan = buildNativeLibraryCatalog(generatedLibraryOpportunities, generatedLibrarySourceHealth, accepted, clock.toISOString(), clock);
  const result = verifyNativeLibraryCatalog(plan.manifest, path => plan.chunks.get(path)!, clock);
  assert.equal(result.length, source.length);
  const indexed = new Map(source.map(row => [row.id, row]));
  for (const row of result) { const original = indexed.get(row.id)!; for (const key of ["title", "description", "ageMin", "ageMax", "ageLabel", "startDate", "endDate"] as const) assert.deepEqual(row[key], original[key]); }
});
check("review CLI requires explicit outside-repository absolute output", () => { assert.throws(() => exportReviewCatalog("relative"), /absolute/); assert.throws(() => exportReviewCatalog(process.cwd()), /inside the repository/); });
const temporary = mkdtempSync(join(tmpdir(), "gta-catalog-test-"));
try {
  const output = join(temporary, "owned");
  check("first complete generation writes and verifies exact files", () => { assert.equal(writeNativeLibraryCatalog(initial, output, now).changed, true); assert.deepEqual(readFileSync(join(output, "manifest.json")), initial.manifest); assert.deepEqual(verifyNativeLibraryCatalog(initial.manifest, path => readFileSync(join(output, path.slice("/native-library/".length))), now), verify(initial)); });
  check("identical publication is byte-identical no-op", () => assert.equal(writeNativeLibraryCatalog(initial, output, now).changed, false));
  const corrected = rows(); corrected[0].description += " Updated end.";
  const next = build(corrected, "2026-10-28T22:45:00.000Z");
  check("precommit failure preserves old manifest and every referenced shard", () => { const priorFiles = readdirSync(output); assert.throws(() => writeNativeLibraryCatalog(next, output, now, () => { throw new Error("simulated interruption"); }), /simulated interruption/); assert.deepEqual(readFileSync(join(output, "manifest.json")), initial.manifest); assert.deepEqual(readdirSync(output), priorFiles); for (const chunk of manifest(initial).chunks) assert.deepEqual(readFileSync(join(output, chunk.path.slice("/native-library/".length))), initial.chunks.get(chunk.path)); });
  check("invalid proposed set never changes active files or retention", () => { assert.throws(() => writeNativeLibraryCatalog({ ...next, chunks: new Map() }, output, now)); assert.deepEqual(readFileSync(join(output, "manifest.json")), initial.manifest); assert.ok(existsSync(join(output, manifest(initial).catalogueRevision))); });
  check("equal revision with conflicting body rejected", () => assert.throws(() => writeNativeLibraryCatalog(build(corrected), output, now), /conflicting equal/));
  for (const kind of ["wrong", "missing", "extra", "symlink"] as const) check(`unknown ${kind} orphan refused without changing previous set`, () => {
    const destination = join(temporary, `orphan-${kind}`);
    writeNativeLibraryCatalog(initial, destination, now);
    const generation = join(destination, manifest(next).catalogueRevision);
    mkdirSync(generation);
    for (const [index, descriptor] of manifest(next).chunks.entries()) {
      const file = join(generation, descriptor.path.split("/").at(-1)!);
      if (kind === "missing" && index === 0) continue;
      if (kind === "symlink" && index === 0) symlinkSync(join(destination, "manifest.json"), file);
      else writeFileSync(file, kind === "wrong" && index === 0 ? Buffer.from("wrong") : next.chunks.get(descriptor.path)!);
    }
    if (kind === "extra") writeFileSync(join(generation, "unrecognized.txt"), "preserve me");
    const inventory = readdirSync(generation);
    assert.throws(() => writeNativeLibraryCatalog(next, destination, now), /orphan/);
    assert.deepEqual(readFileSync(join(destination, "manifest.json")), initial.manifest);
    assert.deepEqual(readdirSync(generation), inventory);
    for (const descriptor of manifest(initial).chunks) assert.deepEqual(readFileSync(join(destination, descriptor.path.slice("/native-library/".length))), initial.chunks.get(descriptor.path));
  });
  check("exact post-rename crash orphan safely reused before manifest commit and pruning", () => {
    // Reproduce on-disk SIGKILL state: old manifest plus renamed complete new
    // generation; no writer finally callback has run or cleaned it up.
    const generation = join(output, manifest(next).catalogueRevision);
    mkdirSync(generation);
    for (const descriptor of manifest(next).chunks) writeFileSync(join(generation, descriptor.path.split("/").at(-1)!), next.chunks.get(descriptor.path)!);
    assert.deepEqual(readFileSync(join(output, "manifest.json")), initial.manifest);
 assert.equal(writeNativeLibraryCatalog(next, output, now).changed, true); assert.deepEqual(readFileSync(join(output, "manifest.json")), next.manifest); assert.ok(!existsSync(join(output, manifest(initial).catalogueRevision))); assert.ok(existsSync(join(output, manifest(next).catalogueRevision))); });
  check("rollback refused without changing accepted successor", () => { assert.throws(() => writeNativeLibraryCatalog(initial, output, now), /rollback/); assert.deepEqual(readFileSync(join(output, "manifest.json")), next.manifest); });
  check("unowned directory and symlink output refused", () => { writeFileSync(join(temporary, "keep.txt"), "keep"); assert.throws(() => writeNativeLibraryCatalog(initial, temporary, now), /not owned/); const link = join(temporary, "linked"); symlinkSync(output, link); assert.throws(() => writeNativeLibraryCatalog(initial, link, now), /not a link/); });
  check("fresh generation can recover an intact but stale previous generation", () => {
    const later = "2026-11-20T22:00:00.000Z";
    const input = rows().map(row => ({ ...row, startDate: "2026-12-01", endDate: "2026-12-01", deadline: "2026-12-01", lastChecked: "2026-11-20", lastSeen: "2026-11-20" }));
    const plan = buildNativeLibraryCatalog(input, health(input, later), accepted, later, new Date(later));
    assert.equal(writeNativeLibraryCatalog(plan, output, new Date(later)).changed, true);
    assert.deepEqual(readFileSync(join(output, "manifest.json")), plan.manifest);
  });
  check("new empty output remains without active manifest after interruption", () => { const empty = join(temporary, "empty"); assert.throws(() => writeNativeLibraryCatalog(initial, empty, now, () => { throw new Error("interrupted"); })); assert.deepEqual(readdirSync(empty), [".native-library-catalog-output"]); });
} finally { rmSync(temporary, { recursive: true, force: true }); }
console.log(`${passed} native full-library catalogue checks passed.`);
