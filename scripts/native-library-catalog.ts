import { createHash, randomUUID } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { isDeepStrictEqual } from "node:util";
import type { Opportunity } from "../lib/types";
import type { LibrarySourceHealth } from "../lib/refreshHealth";
import { evaluateLibraryRefreshHealth } from "../lib/refreshHealth";
import { publicOpportunities } from "../lib/opportunityStatus";
import { nativeContentRights } from "./native-content-rights";

export const libraryCatalogLimits = Object.freeze({
  manifestBytes: 65_536, responseBytes: 10_000_000, chunkBytes: 4_000_000,
  responseRecords: 4_999, chunkRecords: 1_800, totalRecords: 15_000,
  totalBytes: 32_000_000, chunks: 16, textBytes: 100_000
});
const PREFIX = "/native-library/";
const MARKER = ".native-library-catalog-output";
const MARKER_VALUE = "native-library-catalog-output-v1\n";
const hashPattern = /^[a-f0-9]{64}$/;
function requireValue(value: unknown, message: string): asserts value {
  if (!value) throw new Error(`Native library catalog refused: ${message}`);
}
function object(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function keys(value: Record<string, unknown>, allowed: readonly string[], label: string) {
  requireValue(Object.keys(value).every(key => allowed.includes(key)), `unknown ${label} field`);
}
function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (object(value)) return Object.fromEntries(Object.keys(value).sort().filter(key => value[key] !== undefined).map(key => [key, canonical(value[key])]));
  requireValue(value === null || typeof value === "string" || typeof value === "boolean" || (typeof value === "number" && Number.isFinite(value)), "non-JSON value");
  return value;
}
export function catalogBytes(value: unknown): Buffer { return Buffer.from(JSON.stringify(canonical(value)) + "\n", "utf8"); }
export function catalogHash(value: Uint8Array): string { return createHash("sha256").update(value).digest("hex"); }
function parse(bytes: Uint8Array, limit: number): unknown {
  requireValue(bytes.byteLength > 0 && bytes.byteLength <= limit, "response byte bound");
  const value: unknown = JSON.parse(Buffer.from(bytes).toString("utf8"));
  requireValue(Buffer.from(bytes).equals(catalogBytes(value)), "noncanonical or invalid UTF-8 JSON");
  return value;
}
function integer(value: unknown, min: number, max = Number.MAX_SAFE_INTEGER): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= min && value <= max;
}
function text(value: unknown, maximum: number = libraryCatalogLimits.textBytes): value is string {
  return typeof value === "string" && value.trim().length > 0 && Buffer.byteLength(value) <= maximum;
}
function date(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return Number.isFinite(Date.parse(value)) && new Date(value + "T00:00:00.000Z").toISOString().slice(0, 10) === value;
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(value)) return false;
  // Reject impossible date/time components instead of Date.parse's normalization.
  return date(value.slice(0, 10)) && Number(value.slice(11, 13)) < 24 && Number(value.slice(14, 16)) < 60 && Number(value.slice(17, 19)) < 60 && Number.isFinite(Date.parse(value));
}
function utc(value: unknown): value is string {
  return date(value) && new Date(value).toISOString() === value;
}
function currentClock(value: string, now: Date) {
  const elapsed = now.getTime() - Date.parse(value);
  requireValue(Number.isFinite(elapsed) && elapsed >= -300_000 && elapsed <= 14 * 86_400_000, "stale or future accepted source clock");
}
function validateHealth(health: LibrarySourceHealth, sourceRows?: readonly Opportunity[]) {
  requireValue(object(health) && health.schemaVersion === 1 && health.status === "healthy" && Array.isArray(health.failureReasons) && health.failureReasons.length === 0 && utc(health.generatedAt), "full collection health");
  requireValue(integer(health.acceptedListings, 30, libraryCatalogLimits.totalRecords) && integer(health.previousPublishedListings, 0, libraryCatalogLimits.totalRecords) && integer(health.minimumAcceptedListings, Math.max(30, Math.ceil(health.previousPublishedListings * 0.65))), "collection count policy");
  requireValue(health.minimumPageSuccessRatio >= 0.75 && health.minimumPageSuccessRatio <= 1 && health.minimumPerSourceSuccessRatio >= 0.5 && health.minimumPerSourceSuccessRatio <= 1 && Array.isArray(health.sources), "collection source thresholds");
  const sourceIds = new Set<string>(), organizations = new Set<string>();
  for (const source of health.sources) {
    requireValue(text(source.sourceId, 256) && text(source.organization, 256) && !sourceIds.has(source.sourceId) && !organizations.has(source.organization), "duplicate collection source");
    sourceIds.add(source.sourceId); organizations.add(source.organization);
    requireValue(integer(source.attemptedPages, 1) && integer(source.successfulPages, 0, source.attemptedPages) && integer(source.acceptedListings, 0), "invalid source page/count values");
    if (sourceRows) requireValue(sourceRows.filter(row => row.organization === source.organization).length === source.acceptedListings, "source membership disagrees with collection health");
  }
  const evaluated = evaluateLibraryRefreshHealth({ generatedAt: health.generatedAt, sources: health.sources.map(({ sourceId, organization, attemptedPages, successfulPages, acceptedListings }) => ({ sourceId, organization, attemptedPages, successfulPages, acceptedListings })), acceptedListings: health.acceptedListings, previousPublishedListings: health.previousPublishedListings, minimumPageSuccessRatio: health.minimumPageSuccessRatio, minimumPerSourceSuccessRatio: health.minimumPerSourceSuccessRatio, minimumPublishedListings: health.minimumAcceptedListings });
  requireValue(isDeepStrictEqual(health, evaluated.health), "collection aggregates/status were changed or weakened");
  requireValue(health.sources.reduce((total, source) => total + source.acceptedListings, 0) === health.acceptedListings, "source collection count sum");
  if (sourceRows) requireValue(sourceRows.length === health.acceptedListings, "full master count disagrees with health");
}

export type NativeLibraryRecord = Pick<Opportunity,
  "id" | "title" | "organization" | "description" | "category" | "categories" | "city" | "region" | "address" |
  "startDate" | "endDate" | "deadline" | "ageMin" | "ageMax" | "ageLabel" | "cost" | "sourceUrl" | "registrationUrl" |
  "lastChecked" | "lastSeen" | "status" | "tags" | "communityFocus" | "latitude" | "longitude" | "virtual" |
  "volunteerHoursEligible" | "coopEligible" | "trustedSource" | "sources"> & {
    coordinatePrecision: "unverified" | "not-applicable";
  };
const recordKeys = ["id", "title", "organization", "description", "category", "categories", "city", "region", "address", "startDate", "endDate", "deadline", "ageMin", "ageMax", "ageLabel", "cost", "sourceUrl", "registrationUrl", "lastChecked", "lastSeen", "status", "tags", "communityFocus", "latitude", "longitude", "virtual", "volunteerHoursEligible", "coopEligible", "trustedSource", "sources", "coordinatePrecision"];
function validateRecord(record: NativeLibraryRecord) {
  requireValue(object(record) && Object.keys(record).every(key => recordKeys.includes(key)), "unknown record field");
  for (const key of ["id", "title", "organization", "description", "category", "city", "region", "address", "sourceUrl", "registrationUrl"] as const) requireValue(text(record[key], key === "id" ? 256 : libraryCatalogLimits.textBytes), `invalid full record ${key}`);
  requireValue(record.cost === "Free to join" && record.status === "active" && record.trustedSource === true, "not an accepted free active listing");
  for (const key of ["categories", "tags", "communityFocus"] as const) requireValue(Array.isArray(record[key]) && record[key].length <= 256 && record[key].every(item => text(item, 256)), `invalid ${key}`);
  requireValue(record.categories.length > 0 && record.categories.includes(record.category), "record category mismatch");
  requireValue(Number.isFinite(record.ageMin) && record.ageMin >= 0 && record.ageMin <= 130 && (record.ageMax === undefined || (Number.isFinite(record.ageMax) && record.ageMax >= record.ageMin && record.ageMax <= 130)), "age range must preserve finite decimal years");
  requireValue(record.ageLabel === undefined || text(record.ageLabel, 512), "invalid original age label");
  for (const key of ["startDate", "lastChecked", "lastSeen"] as const) requireValue(date(record[key]), `invalid ${key}`);
  for (const key of ["endDate", "deadline"] as const) requireValue(record[key] === undefined || date(record[key]), `invalid supplied ${key}`);
  requireValue(Number.isFinite(record.latitude) && Math.abs(record.latitude) <= 90 && Number.isFinite(record.longitude) && Math.abs(record.longitude) <= 180, "invalid raw coordinates");
  for (const key of ["virtual", "volunteerHoursEligible", "coopEligible"] as const) requireValue(typeof record[key] === "boolean", `invalid ${key}`);
  requireValue(record.coordinatePrecision === (record.virtual ? "not-applicable" : "unverified"), "unproven verified venue coordinates");
  requireValue(Array.isArray(record.sources) && record.sources.length > 0 && record.sources.length <= 16 && record.sources.every(source => object(source) && Object.keys(source).every(key => ["label", "url", "capturedAt", "confidence"].includes(key)) && ["high", "medium", "needs-review"].includes(source.confidence) && text(source.label, 512) && source.url === record.sourceUrl && date(source.capturedAt)), "missing original source evidence");
}
function project(row: Opportunity): NativeLibraryRecord {
  const record = Object.fromEntries(recordKeys.filter(key => key !== "coordinatePrecision" && row[key as keyof Opportunity] !== undefined).map(key => [key, row[key as keyof Opportunity]])) as unknown as NativeLibraryRecord;
  record.coordinatePrecision = row.virtual ? "not-applicable" : "unverified";
  validateRecord(record);
  return record;
}
/** Raw JSON span boundaries, after canonical parse validation. Never re-encode numbers. */
function rawValueEnd(bytes: Buffer, start: number): number {
  if (bytes[start] === 34) {
    for (let index = start + 1; index < bytes.length; index++) {
      if (bytes[index] === 92) index++;
      else if (bytes[index] === 34) return index + 1;
    }
  } else if (bytes[start] === 123 || bytes[start] === 91) {
    let depth = 0;
    for (let index = start; index < bytes.length; index++) {
      const byte = bytes[index];
      if (byte === 34) index = rawValueEnd(bytes, index) - 1;
      else if (byte === 123 || byte === 91) depth++;
      else if ((byte === 125 || byte === 93) && --depth === 0) return index + 1;
    }
  } else {
    let index = start;
    while (index < bytes.length && ![44, 93, 125].includes(bytes[index])) index++;
    return index;
  }
  throw new Error("Invalid raw JSON value span");
}
function rawObjectValues(bytes: Buffer): Map<string, Buffer> {
  requireValue(bytes[0] === 123, "raw object expected");
  const values = new Map<string, Buffer>();
  let index = 1;
  while (bytes[index] !== 125) {
    const keyEnd = rawValueEnd(bytes, index), key = JSON.parse(bytes.subarray(index, keyEnd).toString("utf8")) as string;
    requireValue(!values.has(key) && bytes[keyEnd] === 58, "duplicate raw key or missing colon");
    index = keyEnd + 1;
    const end = rawValueEnd(bytes, index); values.set(key, bytes.subarray(index, end)); index = end;
    if (bytes[index] !== 44) break;
    index++;
  }
  return values;
}
function* rawArrayValues(bytes: Buffer): Generator<Buffer> {
  requireValue(bytes[0] === 91, "raw array expected");
  let index = 1;
  while (bytes[index] !== 93) {
    const end = rawValueEnd(bytes, index); yield bytes.subarray(index, end); index = end;
    if (bytes[index] !== 44) break;
    index++;
  }
}
/** Digest recipe only, not a replacement for complete-set/schema/rights validation.
 * Stream these raw slices in Swift/Kotlin; do not serialize decoded doubles/strings.
 */
export function* catalogRevisionRawSegments(manifestBytes: Uint8Array, orderedShards: readonly Uint8Array[]): Generator<Uint8Array> {
  const manifest = parse(manifestBytes, libraryCatalogLimits.manifestBytes);
  requireValue(object(manifest) && Array.isArray(manifest.chunks) && manifest.chunks.length === orderedShards.length, "raw digest shard inventory");
  const facts = rawObjectValues(Buffer.from(manifestBytes));
  const names = ["contentRights", "coverage", "publicationRevision", "records", "source", "sourceHealth"];
  yield Buffer.from("{");
  for (const [index, name] of names.entries()) {
    yield Buffer.from(`${index ? "," : ""}"${name}":`);
    if (name === "records") {
      yield Buffer.from("["); let first = true;
      for (const raw of orderedShards) {
        const shard = parse(raw, libraryCatalogLimits.chunkBytes);
        requireValue(object(shard) && Array.isArray(shard.opportunities), "raw digest shard opportunities");
        const array = rawObjectValues(Buffer.from(raw)).get("opportunities")!;
        for (const record of rawArrayValues(array)) {
          if (!first) yield Buffer.from(","); first = false; yield record;
        }
      }
      yield Buffer.from("]");
    } else {
      requireValue(facts.has(name), "raw digest missing bound fact"); yield facts.get(name)!;
    }
  }
  yield Buffer.from("}\n");
}
export function catalogRevisionFromRaw(manifestBytes: Uint8Array, orderedShards: readonly Uint8Array[]): string {
  const hash = createHash("sha256");
  for (const segment of catalogRevisionRawSegments(manifestBytes, orderedShards)) hash.update(segment);
  return hash.digest("hex");
}
export type LibraryCatalogSource = { acceptedRevision: string; generatedAt: string; masterSHA256: string };
type Coverage = { scope: "accepted-free-library-collection"; sourceRecords: number; excludedUnavailableRecords: number; fullOriginalDescriptions: true; ageSemantics: "source-derived-guidance-in-decimal-years"; coordinateSemantics: "raw-coordinates-without-venue-verification" };
type Descriptor = { path: string; sha256: string; bytes: number; records: number; index: number; firstID: string; lastID: string };
export type LibraryCatalogManifest = {
  schemaVersion: 1; artifactType: "native-library-catalog-manifest"; complete: true;
  publicationRevision: string; catalogueRevision: string; source: LibraryCatalogSource;
  coverage: Coverage; sourceHealth: LibrarySourceHealth; contentRights: ReturnType<typeof nativeContentRights>;
  recordCount: number; totalChunkBytes: number; chunks: Descriptor[];
};
export type LibraryCatalogPlan = { manifest: Buffer; chunks: ReadonlyMap<string, Buffer> };
function revisionFor(manifest: Pick<LibraryCatalogManifest, "publicationRevision" | "source" | "coverage" | "sourceHealth" | "contentRights">, records: NativeLibraryRecord[]) {
  return catalogHash(catalogBytes({ publicationRevision: manifest.publicationRevision, source: manifest.source, coverage: manifest.coverage, sourceHealth: manifest.sourceHealth, contentRights: manifest.contentRights, records }));
}
function chunkFor(records: NativeLibraryRecord[], catalogueRevision: string, index: number) {
  return catalogBytes({ schemaVersion: 1, artifactType: "native-library-catalog-shard", catalogueRevision, index, recordCount: records.length, opportunities: records });
}

export function buildNativeLibraryCatalog(rows: readonly Opportunity[], health: LibrarySourceHealth, acceptedRevision: string, publicationRevision: string, now = new Date()): LibraryCatalogPlan {
  requireValue(Array.isArray(rows) && rows.length > 0 && rows.length <= libraryCatalogLimits.totalRecords, "full source record bound");
  requireValue(/^[a-f0-9]{40}$/.test(acceptedRevision) && utc(publicationRevision), "accepted source revision");
  validateHealth(health, rows); currentClock(health.generatedAt, now); currentClock(publicationRevision, now);
  requireValue(Date.parse(publicationRevision) >= Date.parse(health.generatedAt), "publication predates source collection");
  const ordered = [...rows].sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  requireValue(new Set(ordered.map(row => row.id)).size === rows.length, "duplicate source identities");
  nativeContentRights(ordered, ordered, health.generatedAt.slice(0, 10));
  const records = publicOpportunities(ordered, new Date(health.generatedAt)).map(project);
  requireValue(records.length > 0, "empty accepted catalog");
  const source = { acceptedRevision, generatedAt: health.generatedAt, masterSHA256: catalogHash(catalogBytes(ordered)) };
  const coverage: Coverage = { scope: "accepted-free-library-collection", sourceRecords: rows.length, excludedUnavailableRecords: rows.length - records.length, fullOriginalDescriptions: true, ageSemantics: "source-derived-guidance-in-decimal-years", coordinateSemantics: "raw-coordinates-without-venue-verification" };
  const contentRights = nativeContentRights(records, ordered, health.generatedAt.slice(0, 10));
  const facts = { publicationRevision, source, coverage, sourceHealth: health, contentRights };
  const catalogueRevision = revisionFor(facts, records);
  const chunks = new Map<string, Buffer>(), descriptors: Descriptor[] = [];
  let batch: NativeLibraryRecord[] = [], totalChunkBytes = 0;
  const flush = () => {
    if (!batch.length) return;
    const index = descriptors.length, bytes = chunkFor(batch, catalogueRevision, index), sha256 = catalogHash(bytes);
    requireValue(bytes.length <= libraryCatalogLimits.chunkBytes && batch.length <= libraryCatalogLimits.chunkRecords, "chunk target bound");
    const path = `${PREFIX}${catalogueRevision}/${String(index).padStart(3, "0")}-${sha256}.json`;
    descriptors.push({ path, sha256, bytes: bytes.length, records: batch.length, index, firstID: batch[0].id, lastID: batch.at(-1)!.id });
    chunks.set(path, bytes); totalChunkBytes += bytes.length;
    requireValue(totalChunkBytes <= libraryCatalogLimits.totalBytes && descriptors.length <= libraryCatalogLimits.chunks, "aggregate byte/chunk bound");
    batch = [];
  };
  // Canonical records are serialized once here; exact final envelopes are checked at flush.
  let batchBytes = 0;
  const overhead = chunkFor([], catalogueRevision, libraryCatalogLimits.chunks).length + 10; // Count/index digit growth. A conservative bound, never a truncation.
  for (const record of records) {
    const bytes = catalogBytes(record).length; // Its newline replaces the array delimiter byte.
    if (batch.length && (batch.length >= libraryCatalogLimits.chunkRecords || overhead + batchBytes + bytes > libraryCatalogLimits.chunkBytes)) { flush(); batchBytes = 0; }
    requireValue(overhead + bytes <= libraryCatalogLimits.chunkBytes, "single record exceeds chunk target");
    batch.push(record); batchBytes += bytes;
  }
  flush();
  const manifest: LibraryCatalogManifest = { schemaVersion: 1, artifactType: "native-library-catalog-manifest", complete: true, ...facts, catalogueRevision, recordCount: records.length, totalChunkBytes, chunks: descriptors };
  const result = { manifest: catalogBytes(manifest), chunks };
  verifyNativeLibraryCatalog(result.manifest, path => chunks.get(path)!, now);
  return result;
}

/** Complete-set verifier. Never return rows from an incomplete generation. */
export function verifyNativeLibraryCatalog(bytes: Uint8Array, readChunk: (path: string) => Uint8Array, now = new Date()): NativeLibraryRecord[] {
  const value = parse(bytes, libraryCatalogLimits.manifestBytes);
  requireValue(object(value) && value.schemaVersion === 1 && value.artifactType === "native-library-catalog-manifest" && value.complete === true, "manifest type/completeness");
  keys(value, ["schemaVersion", "artifactType", "complete", "publicationRevision", "catalogueRevision", "source", "coverage", "sourceHealth", "contentRights", "recordCount", "totalChunkBytes", "chunks"], "manifest");
  const manifest = value as unknown as LibraryCatalogManifest;
  requireValue(utc(manifest.publicationRevision) && hashPattern.test(manifest.catalogueRevision) && object(manifest.source) && /^[a-f0-9]{40}$/.test(manifest.source.acceptedRevision) && hashPattern.test(manifest.source.masterSHA256) && manifest.source.generatedAt === manifest.sourceHealth?.generatedAt, "manifest source identity");
  keys(manifest.source, ["acceptedRevision", "generatedAt", "masterSHA256"], "source");
  validateHealth(manifest.sourceHealth); currentClock(manifest.source.generatedAt, now); currentClock(manifest.publicationRevision, now);
  requireValue(Date.parse(manifest.publicationRevision) >= Date.parse(manifest.source.generatedAt), "manifest publication predates source");
  requireValue(integer(manifest.recordCount, 1, libraryCatalogLimits.totalRecords) && integer(manifest.totalChunkBytes, 1, libraryCatalogLimits.totalBytes - bytes.byteLength), "aggregate manifest bounds");
  requireValue(object(manifest.coverage) && manifest.coverage.scope === "accepted-free-library-collection" && manifest.coverage.fullOriginalDescriptions === true && manifest.coverage.ageSemantics === "source-derived-guidance-in-decimal-years" && manifest.coverage.coordinateSemantics === "raw-coordinates-without-venue-verification" && manifest.coverage.sourceRecords === manifest.sourceHealth.acceptedListings && integer(manifest.coverage.excludedUnavailableRecords, 0) && manifest.coverage.excludedUnavailableRecords + manifest.recordCount === manifest.coverage.sourceRecords, "coverage count/semantics");
  keys(manifest.coverage, ["scope", "sourceRecords", "excludedUnavailableRecords", "fullOriginalDescriptions", "ageSemantics", "coordinateSemantics"], "coverage");
  requireValue(Array.isArray(manifest.chunks) && manifest.chunks.length > 0 && manifest.chunks.length <= libraryCatalogLimits.chunks, "chunk count bound");
  const records: NativeLibraryRecord[] = [], checkedShards: Uint8Array[] = []; let total = 0, previousID = "";
  for (const [index, descriptor] of manifest.chunks.entries()) {
    requireValue(object(descriptor) && descriptor.index === index && integer(descriptor.records, 1, Math.min(libraryCatalogLimits.chunkRecords, libraryCatalogLimits.responseRecords)) && integer(descriptor.bytes, 1, Math.min(libraryCatalogLimits.chunkBytes, libraryCatalogLimits.responseBytes)) && hashPattern.test(descriptor.sha256), "invalid descriptor");
    keys(descriptor, ["path", "sha256", "bytes", "records", "index", "firstID", "lastID"], "descriptor");
    const expected = `${PREFIX}${manifest.catalogueRevision}/${String(index).padStart(3, "0")}-${descriptor.sha256}.json`;
    requireValue(descriptor.path === expected, "cross-origin/traversal/mixed-generation chunk path");
    const chunkBytes = readChunk(descriptor.path);
    requireValue(chunkBytes instanceof Uint8Array && chunkBytes.byteLength === descriptor.bytes && catalogHash(chunkBytes) === descriptor.sha256, "chunk byte/hash mismatch");
    checkedShards.push(chunkBytes);
    total += chunkBytes.byteLength; requireValue(total <= libraryCatalogLimits.totalBytes - bytes.byteLength, "aggregate download bytes");
    const chunk = parse(chunkBytes, libraryCatalogLimits.responseBytes);
    requireValue(object(chunk) && chunk.schemaVersion === 1 && chunk.artifactType === "native-library-catalog-shard" && chunk.catalogueRevision === manifest.catalogueRevision && chunk.index === index && chunk.recordCount === descriptor.records && Array.isArray(chunk.opportunities) && chunk.opportunities.length === descriptor.records, "mixed/incomplete chunk envelope");
    keys(chunk, ["schemaVersion", "artifactType", "catalogueRevision", "index", "recordCount", "opportunities"], "shard");
    const items = chunk.opportunities as NativeLibraryRecord[];
    for (const record of items) {
      validateRecord(record); requireValue(record.id > previousID, "duplicate or unordered global identities"); previousID = record.id; records.push(record);
      requireValue(records.length <= manifest.recordCount, "aggregate record overflow");
    }
    requireValue(items[0].id === descriptor.firstID && items.at(-1)!.id === descriptor.lastID, "descriptor identity boundaries");
  }
  requireValue(total === manifest.totalChunkBytes && records.length === manifest.recordCount, "incomplete aggregate");
  requireValue(records.every(row => manifest.sourceHealth.sources.some(source => source.organization === row.organization)) && manifest.sourceHealth.sources.every(source => records.filter(row => row.organization === source.organization).length <= source.acceptedListings), "record membership exceeds full source health");
  const rights = nativeContentRights(records, records, manifest.source.generatedAt.slice(0, 10));
  // The generator's restricted list also includes non-public source records. It may be a
  // superset of the fixed exclusions, but none may intersect the accepted complete set.
  requireValue(object(manifest.contentRights) && Array.isArray(manifest.contentRights.restrictedOpportunityIds) && manifest.contentRights.restrictedOpportunityIds.every(id => typeof id === "string") && new Set(manifest.contentRights.restrictedOpportunityIds).size === manifest.contentRights.restrictedOpportunityIds.length && rights.restrictedOpportunityIds.every(id => manifest.contentRights.restrictedOpportunityIds.includes(id)) && !records.some(row => manifest.contentRights.restrictedOpportunityIds.includes(row.id)) && isDeepStrictEqual(manifest.contentRights.sources, rights.sources) && manifest.contentRights.termsVerifiedAt === rights.termsVerifiedAt, "rights policy/provenance changed");
  keys(manifest.contentRights, ["termsVerifiedAt", "restrictedOpportunityIds", "sources"], "rights");
  requireValue(manifest.catalogueRevision === revisionFor(manifest, records), "catalogue revision does not bind complete content");
  requireValue(manifest.catalogueRevision === catalogRevisionFromRaw(bytes, checkedShards), "raw complete-set digest mismatch");
  return records;
}
function diskPath(root: string, path: string) {
  requireValue(path.startsWith(PREFIX) && !path.includes("..") && !path.includes("\\"), "unsafe output path");
  return join(root, path.slice(PREFIX.length));
}

/** Review-output writer; not wired to public export, collector, build or deployment. */
export function writeNativeLibraryCatalog(plan: LibraryCatalogPlan, root: string, now = new Date(), beforeCommit?: () => void) {
  verifyNativeLibraryCatalog(plan.manifest, path => plan.chunks.get(path)!, now);
  const next = JSON.parse(plan.manifest.toString("utf8")) as LibraryCatalogManifest;
  requireValue(plan.chunks.size === next.chunks.length, "extra/unreferenced plan chunks");
  if (existsSync(root)) {
    requireValue(lstatSync(root).isDirectory() && !lstatSync(root).isSymbolicLink(), "output root must be a directory, not a link");
    if (readdirSync(root).length) requireValue(existsSync(join(root, MARKER)) && !lstatSync(join(root, MARKER)).isSymbolicLink() && readFileSync(join(root, MARKER), "utf8") === MARKER_VALUE, "output root is not owned by this exporter");
  }
  const active = join(root, "manifest.json");
  if (existsSync(active)) {
    requireValue(!lstatSync(active).isSymbolicLink(), "active manifest is a link");
    const previous = readFileSync(active);
    requireValue(previous.byteLength <= libraryCatalogLimits.manifestBytes, "cached manifest byte bound");
    const old = JSON.parse(previous.toString("utf8")) as LibraryCatalogManifest;
    // An intact old generation may be stale today. Validate its original acceptance
    // clock so a fresh successor can recover, while the incoming generation stays fresh.
    verifyNativeLibraryCatalog(previous, path => {
      const file = diskPath(root, path);
      requireValue(!lstatSync(join(root, old.catalogueRevision)).isSymbolicLink() && !lstatSync(file).isSymbolicLink(), "cached shard is a link");
      return readFileSync(file);
    }, new Date(old.publicationRevision));
    requireValue(Date.parse(next.publicationRevision) >= Date.parse(old.publicationRevision), "publication rollback");
    if (next.publicationRevision === old.publicationRevision) {
      requireValue(previous.equals(plan.manifest), "conflicting equal publication revision");
      return { changed: false, catalogueRevision: next.catalogueRevision, pruningComplete: true };
    }
  }
  mkdirSync(root, { recursive: true }); writeFileSync(join(root, MARKER), MARKER_VALUE);
  const staging = join(root, `.staging-${randomUUID()}`), generation = join(root, next.catalogueRevision);
  const temporaryManifest = join(root, `.manifest-${randomUUID()}.tmp`);
  let moved = false, committed = false;
  try {
    if (existsSync(generation)) {
      // A hard interruption after generation rename cannot run finally. Reuse only
      // this exact complete plan; never delete or overwrite an unknown orphan.
      requireValue(lstatSync(generation).isDirectory() && !lstatSync(generation).isSymbolicLink(), "orphan generation is not a real directory");
      const expected = next.chunks.map(descriptor => descriptor.path.split("/").at(-1)!).sort();
      requireValue(isDeepStrictEqual(readdirSync(generation).sort(), expected), "orphan generation inventory differs");
      for (const descriptor of next.chunks) {
        const file = diskPath(root, descriptor.path);
        requireValue(lstatSync(file).isFile() && !lstatSync(file).isSymbolicLink() && lstatSync(file).size === descriptor.bytes && readFileSync(file).equals(plan.chunks.get(descriptor.path)!), "orphan shard differs from accepted plan");
      }
      verifyNativeLibraryCatalog(plan.manifest, path => readFileSync(diskPath(root, path)), now);
    } else {
      mkdirSync(staging);
      for (const descriptor of next.chunks) writeFileSync(join(staging, descriptor.path.split("/").at(-1)!), plan.chunks.get(descriptor.path)!, { flag: "wx" });
      verifyNativeLibraryCatalog(plan.manifest, path => readFileSync(join(staging, path.split("/").at(-1)!)), now);
      renameSync(staging, generation); moved = true;
    }
    writeFileSync(temporaryManifest, plan.manifest, { flag: "wx" });
    beforeCommit?.();
    renameSync(temporaryManifest, active); committed = true;
  } finally {
    rmSync(staging, { recursive: true, force: true }); rmSync(temporaryManifest, { force: true });
    if (moved && !committed) rmSync(generation, { recursive: true, force: true });
  }
  // Only the active immutable generation is published. Offline clients retain their own
  // verified cache; a stale network manifest must be refetched rather than mixed.
  let pruningComplete = true;
  for (const name of readdirSync(root)) if (hashPattern.test(name) && name !== next.catalogueRevision) {
    try { requireValue(!lstatSync(join(root, name)).isSymbolicLink(), "generation is a link"); rmSync(join(root, name), { recursive: true }); }
    catch { pruningComplete = false; }
  }
  return { changed: true, catalogueRevision: next.catalogueRevision, pruningComplete };
}
