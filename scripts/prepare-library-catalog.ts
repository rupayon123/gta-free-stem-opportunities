import assert from "node:assert/strict";
import { existsSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { generatedLibraryOpportunities, generatedLibrarySourceHealth } from "../lib/generatedLibraryOpportunities";
import { publicOpportunities } from "../lib/opportunityStatus";
import type { LibrarySourceHealth } from "../lib/refreshHealth";
import type { Opportunity } from "../lib/types";

const MAX_CATALOG_RECORDS = 15_000;
const MAX_CORE_RECORDS = 4_999;
const corePath = "lib/generatedCoreLibraryOpportunities.ts";
const catalogPath = "public/library-catalog.json";

function ensure(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Library catalog preparation refused: ${message}`);
}

function validHttps(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch { return false; }
}

function validDate(value: string) {
  return typeof value === "string" && value.length > 0 && Number.isFinite(Date.parse(value));
}

function assertCollectionHealth(rows: readonly Opportunity[], health: LibrarySourceHealth) {
  ensure(health && health.schemaVersion === 1 && health.status === "healthy", "collection health is not healthy schema 1");
  ensure(Array.isArray(health.failureReasons) && health.failureReasons.length === 0, "collection has declared failures");
  ensure(validDate(health.generatedAt), "collection timestamp is invalid");
  ensure(Array.isArray(health.sources) && health.sources.length > 0 && health.sourceCount === health.sources.length, "source count is inconsistent");
  ensure(Number.isInteger(health.previousPublishedListings) && health.previousPublishedListings >= 0, "previous collection count is invalid");
  ensure(health.minimumPageSuccessRatio >= 0.75 && health.minimumPageSuccessRatio <= 1 && health.minimumPerSourceSuccessRatio >= 0.5 && health.minimumPerSourceSuccessRatio <= 1, "collection page thresholds were weakened or malformed");
  ensure(Number.isInteger(health.minimumAcceptedListings) && health.minimumAcceptedListings >= Math.max(30, Math.ceil(health.previousPublishedListings * 0.65)), "collection output threshold was weakened or malformed");
  ensure(health.acceptedListings === rows.length && rows.length >= health.minimumAcceptedListings, "collection output count does not satisfy its declared health gate");
  const sourceIds = new Set<string>();
  const organizations = new Set<string>();
  for (const source of health.sources) {
    ensure(typeof source.sourceId === "string" && source.sourceId.length > 0 && !sourceIds.has(source.sourceId), "source IDs are invalid or duplicated");
    ensure(typeof source.organization === "string" && source.organization.length > 0 && !organizations.has(source.organization), "source organizations are invalid or duplicated");
    sourceIds.add(source.sourceId);
    organizations.add(source.organization);
    ensure(Number.isInteger(source.attemptedPages) && source.attemptedPages > 0 && Number.isInteger(source.successfulPages) && source.successfulPages >= 0 && source.successfulPages <= source.attemptedPages, "source page counts are invalid");
    ensure(source.failedPages === source.attemptedPages - source.successfulPages && Math.abs(source.pageSuccessRatio - source.successfulPages / source.attemptedPages) <= 0.0001, "source success metrics are inconsistent");
    ensure(source.pageSuccessRatio >= health.minimumPerSourceSuccessRatio, "a source failed its original page gate");
    ensure(Number.isInteger(source.acceptedListings) && source.acceptedListings >= 0, "source accepted count is invalid");
  }
  const total = (field: "attemptedPages" | "successfulPages" | "acceptedListings") => health.sources.reduce((sum, source) => sum + source[field], 0);
  ensure(health.attemptedPages === total("attemptedPages") && health.successfulPages === total("successfulPages") && health.acceptedListings === total("acceptedListings"), "aggregate source counts are inconsistent");
  ensure(health.failedPages === health.attemptedPages - health.successfulPages && Math.abs(health.pageSuccessRatio - health.successfulPages / health.attemptedPages) <= 0.0001 && health.pageSuccessRatio >= health.minimumPageSuccessRatio, "aggregate page gate is invalid or failed");
  ensure(rows.every((row) => organizations.has(row.organization)), "a row names an undeclared source organization");
}

function assertRows(rows: readonly Opportunity[]) {
  ensure(Array.isArray(rows) && rows.length > 0, "the master library collection is empty or malformed");
  ensure(rows.length <= MAX_CATALOG_RECORDS, `master exceeds the ${MAX_CATALOG_RECORDS}-record bound`);
  const ids = new Set<string>();
  const requiredStrings: readonly (keyof Opportunity)[] = ["id", "title", "organization", "provider", "description", "summary", "type", "category", "city", "region", "address", "equipment", "food", "capacity", "commitment", "registrationUrl", "providerContact", "freeStatusProof", "sourceUrl", "lastChecked", "lastSeen", "lastVerified", "cost", "status"];
  const requiredLists: readonly (keyof Opportunity)[] = ["categories", "communityFocus", "grades", "language", "languages", "accessibility", "tags"];
  for (const row of rows) {
    ensure(row && typeof row === "object", "a master row is not an object");
    ensure(requiredStrings.every((key) => typeof row[key] === "string"), "a required text field is missing or malformed");
    ensure(row.id.trim() === row.id && row.id.length > 0 && row.id.length <= 256 && !ids.has(row.id), "IDs are empty, duplicated, inconsistent or too long");
    ids.add(row.id);
    ensure(row.title.trim().length > 0 && row.title.length <= 300 && row.organization.trim().length > 0 && row.provider.trim().length > 0 && row.description.trim().length > 0 && row.summary.trim().length > 0, `required listing text is invalid: ${row.id}`);
    ensure(requiredLists.every((key) => Array.isArray(row[key]) && row[key].every((value: unknown) => typeof value === "string")), `a required string array is invalid: ${row.id}`);
    ensure(row.categories.length > 0 && row.categories.includes(row.category), `primary category is absent from category list: ${row.id}`);
    ensure(row.cost === "Free to join" && row.status === "active" && row.freeStatusProof.trim().length > 0, `a row lacks active/free evidence: ${row.id}`);
    ensure(typeof row.virtual === "boolean" && typeof row.trustedSource === "boolean" && typeof row.volunteerHoursEligible === "boolean" && typeof row.coopEligible === "boolean" && typeof row.paidPosition === "boolean", `a required boolean is invalid: ${row.id}`);
    ensure(Number.isFinite(row.latitude) && row.latitude >= -90 && row.latitude <= 90 && Number.isFinite(row.longitude) && row.longitude >= -180 && row.longitude <= 180, `coordinates are invalid: ${row.id}`);
    ensure(Number.isFinite(row.ageMin) && row.ageMin >= 0 && row.ageMin <= 130 && row.ages && row.ages.min === row.ageMin && (row.ageMax === undefined || (Number.isFinite(row.ageMax) && row.ageMax >= row.ageMin && row.ageMax <= 130)) && row.ages.max === row.ageMax, `age fields are invalid or inconsistent: ${row.id}`);
    ensure(row.ageLabel === undefined || (typeof row.ageLabel === "string" && row.ageLabel.trim().length > 0), `age label is malformed: ${row.id}`);
    ensure(validDate(row.startDate) && validDate(row.lastChecked) && validDate(row.lastSeen) && validDate(row.lastVerified) && (row.endDate === undefined || (validDate(row.endDate) && Date.parse(row.endDate) >= Date.parse(row.startDate))) && (row.deadline === undefined || validDate(row.deadline)), `date fields are invalid: ${row.id}`);
    ensure(validHttps(row.sourceUrl) && validHttps(row.registrationUrl), `source or registration URL is unsafe: ${row.id}`);
    ensure(Array.isArray(row.sources) && row.sources.length > 0 && row.sources.every((source: Opportunity["sources"][number]) => source && typeof source.label === "string" && source.label.length > 0 && validHttps(source.url) && validDate(source.capturedAt) && ["high", "medium", "needs-review"].includes(source.confidence)), `source evidence is invalid: ${row.id}`);
  }
}

function excerpt(value: string, maximum: number) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= maximum) return text;
  let shortened = text.slice(0, maximum - 1).trimEnd();
  const boundary = shortened.lastIndexOf(" ");
  if (boundary > maximum * 0.7) shortened = shortened.slice(0, boundary);
  if (/[\uD800-\uDBFF]$/.test(shortened)) shortened = shortened.slice(0, -1);
  return `${shortened}…`;
}

function browserRow(row: Opportunity): Opportunity {
  // Explicit fields keep this separate catalog small and prevent generated
  // translations, audit logs or unknown master metadata from reaching browsers.
  return {
    id: row.id, title: row.title, organization: row.organization, provider: row.provider,
    description: excerpt(row.description, 320), summary: excerpt(row.summary, 256),
    type: row.type, category: row.category, categories: row.categories,
    communityFocus: row.communityFocus, city: row.city, region: row.region,
    address: row.address, latitude: row.latitude, longitude: row.longitude,
    virtual: row.virtual, startDate: row.startDate, endDate: row.endDate,
    deadline: row.deadline, ageMin: row.ageMin, ageMax: row.ageMax,
    ageLabel: row.ageLabel, ages: row.ages, grades: row.grades,
    language: row.language, languages: row.languages, cost: row.cost,
    sourceUrl: row.sourceUrl, lastChecked: row.lastChecked, lastSeen: row.lastSeen,
    status: row.status, accessibility: row.accessibility, equipment: row.equipment,
    food: row.food, capacity: row.capacity, commitment: row.commitment,
    registrationUrl: row.registrationUrl, providerContact: row.providerContact,
    freeStatusProof: row.freeStatusProof, lastVerified: row.lastVerified,
    trustedSource: row.trustedSource, volunteerHoursEligible: row.volunteerHoursEligible,
    coopEligible: row.coopEligible, paidPosition: row.paidPosition,
    tags: row.tags, sources: row.sources
  };
}

export function partitionLibraryCatalog(rows: readonly Opportunity[], collectionHealth: LibrarySourceHealth, previousNativeCount: number, now = new Date()) {
  assertRows(rows);
  assertCollectionHealth(rows, collectionHealth);
  ensure(Number.isInteger(previousNativeCount) && previousNativeCount >= 0 && previousNativeCount <= MAX_CORE_RECORDS, "previous native payload count is invalid");
  const eligible = publicOpportunities(Array.from(rows), now);
  const core = eligible.filter((row) => row.categories.includes("STEM") && row.category !== "Library & Community" && Number.isInteger(row.ageMin) && (row.ageMax === undefined || Number.isInteger(row.ageMax)) && !/month/i.test(row.ageLabel ?? ""));
  ensure(core.length <= MAX_CORE_RECORDS, `native STEM core exceeds the ${MAX_CORE_RECORDS}-record bound`);
  const minimumAcceptedListings = Math.max(30, Math.ceil(previousNativeCount * 0.65));
  ensure(core.length >= minimumAcceptedListings, `native core has ${core.length} records; its separate publication minimum is ${minimumAcceptedListings}`);
  const coreHealth = {
    ...collectionHealth,
    scope: "stem-core-publication" as const,
    acceptedListings: core.length,
    previousPublishedListings: previousNativeCount,
    minimumAcceptedListings,
    sources: collectionHealth.sources.map((source) => ({ ...source, acceptedListings: core.filter((row) => row.organization === source.organization).length }))
  };
  const coreIds = new Set(core.map((row) => row.id));
  const expanded = eligible.filter((row) => !coreIds.has(row.id)).map(browserRow);
  ensure(core.length + expanded.length === eligible.length, "partition omitted or duplicated eligible rows");
  const catalog = { schemaVersion: 1 as const, generatedAt: collectionHealth.generatedAt, sourceHealth: { library: collectionHealth }, count: expanded.length, opportunities: expanded };
  return { core, coreHealth, collectionHealth, catalog, eligibleCount: eligible.length, excludedUnavailableCount: rows.length - eligible.length };
}

function previousNativeCount() {
  const payload: unknown = JSON.parse(readFileSync("public/opportunities.json", "utf8"));
  ensure(payload && typeof payload === "object" && "opportunities" in payload && Array.isArray(payload.opportunities) && "count" in payload && payload.count === payload.opportunities.length, "existing native envelope count is inconsistent");
  return payload.opportunities.length;
}

function writeChanged(path: string, contents: string) {
  if (existsSync(path) && readFileSync(path, "utf8") === contents) return;
  const temporary = `${path}.tmp-${process.pid}`;
  try {
    writeFileSync(temporary, contents);
    renameSync(temporary, path);
  } finally { rmSync(temporary, { force: true }); }
}

function prepare() {
  const result = partitionLibraryCatalog(generatedLibraryOpportunities, generatedLibrarySourceHealth, previousNativeCount());
  const coreContents = `// Generated by prepare:library. Do not edit or commit.\nimport type { Opportunity } from "./types";\nimport type { LibrarySourceHealth } from "./refreshHealth";\n\nexport const generatedLibraryOpportunities = ${JSON.stringify(result.core, null, 2)} satisfies Opportunity[];\n\nexport const generatedLibrarySourceHealth = ${JSON.stringify(result.coreHealth, null, 2)} satisfies LibrarySourceHealth & { scope: "stem-core-publication" };\n\nexport const generatedLibraryCollectionHealth = ${JSON.stringify(result.collectionHealth, null, 2)} satisfies LibrarySourceHealth;\n`;
  const catalogContents = `${JSON.stringify(result.catalog)}\n`;
  writeChanged(corePath, coreContents);
  writeChanged(catalogPath, catalogContents);
  console.log(JSON.stringify({ preparedLibraryCatalog: true, master: generatedLibraryOpportunities.length, eligible: result.eligibleCount, core: result.core.length, expanded: result.catalog.count, excludedUnavailable: result.excludedUnavailableCount, nativeMinimum: result.coreHealth.minimumAcceptedListings, coreBytes: Buffer.byteLength(coreContents), catalogBytes: Buffer.byteLength(catalogContents) }));
}

function selfTest() {
  const now = new Date("2030-01-01T12:00:00Z");
  const seed = generatedLibraryOpportunities[0];
  ensure(seed, "self-test requires a source fixture");
  const makeRow = (index: number, stem = false): Opportunity => ({ ...seed, id: `fixture-${index}`, category: stem ? "Science & Engineering" : "Library & Community", categories: stem ? ["STEM", "Science & Engineering"] : ["Library & Community"], ageMin: 8, ageMax: 12, ages: { min: 8, max: 12 }, ageLabel: undefined, status: "active", startDate: "2030-01-02T15:00:00Z", endDate: "2030-01-02T16:00:00Z", deadline: undefined, lastChecked: "2030-01-01", lastSeen: "2030-01-01", lastVerified: "2030-01-01", description: "Original provider facts. ".repeat(40), summary: "Source summary. ".repeat(30) });
  const healthFor = (count: number): LibrarySourceHealth => ({ schemaVersion: 1, generatedAt: now.toISOString(), status: "healthy", failureReasons: [], sourceCount: 1, attemptedPages: 100, successfulPages: 100, failedPages: 0, pageSuccessRatio: 1, minimumPageSuccessRatio: 0.75, minimumPerSourceSuccessRatio: 0.5, acceptedListings: count, previousPublishedListings: 110, minimumAcceptedListings: 72, sources: [{ sourceId: "fixture", organization: seed.organization, attemptedPages: 100, successfulPages: 100, failedPages: 0, pageSuccessRatio: 1, acceptedListings: count }] });
  const tenThousand = Array.from({ length: 10_000 }, (_, index) => makeRow(index, index < 100));
  const originalHealth = { ...healthFor(tenThousand.length), previousPublishedListings: 10_000, minimumAcceptedListings: 6500 };
  const prepared = partitionLibraryCatalog(tenThousand, originalHealth, 110, now);
  assert.equal(prepared.core.length, 100);
  assert.equal(prepared.coreHealth.minimumAcceptedListings, 72);
  assert.equal(prepared.catalog.count, 9900);
  assert.deepEqual(prepared.collectionHealth, originalHealth);
  assert.deepEqual(prepared.catalog.sourceHealth.library, originalHealth);
  assert.equal(prepared.coreHealth.sources[0].acceptedListings, 100);
  const roundTrip = JSON.parse(JSON.stringify(prepared.catalog));
  assert.equal(roundTrip.count, roundTrip.opportunities.length);
  assert(roundTrip.opportunities.every((row: Opportunity) => row.description.length <= 320 && row.summary.length <= 256 && !prepared.core.some((core) => core.id === row.id)));
  assert(roundTrip.opportunities.every((row: Opportunity) => typeof row.providerContact === "string" && Array.isArray(row.sources) && row.ageMin === row.ages.min));
  assert(!JSON.stringify(roundTrip).includes('"translations"'));
  assert.throws(() => partitionLibraryCatalog(tenThousand.map((row, index) => index >= 60 && index < 100 ? { ...row, category: "Library & Community", categories: ["Library & Community"] } : row), originalHealth, 110, now), /separate publication minimum is 72/);
  assert.throws(() => partitionLibraryCatalog(tenThousand, { ...originalHealth, status: "rejected" }, 110, now), /not healthy/);
  assert.throws(() => partitionLibraryCatalog(tenThousand, { ...originalHealth, pageSuccessRatio: 0.5 }, 110, now), /aggregate page gate/);
  const mixed = Array.from({ length: 102 }, (_, index) => makeRow(index, true));
  mixed[100] = { ...mixed[100], ageMin: 0.5, ageMax: 1.5, ages: { min: 0.5, max: 1.5 }, ageLabel: "6–18 months" };
  mixed[101] = { ...mixed[101], ageMin: 0, ageMax: 2, ages: { min: 0, max: 2 }, ageLabel: "0–24 months" };
  const safeAges = partitionLibraryCatalog(mixed, healthFor(mixed.length), 110, now);
  assert.equal(safeAges.core.length, 100);
  assert.deepEqual(safeAges.catalog.opportunities.map((row) => row.ageLabel), ["6–18 months", "0–24 months"]);
  assert.throws(() => partitionLibraryCatalog([], healthFor(0), 110, now), /empty or malformed/);
  assert.throws(() => partitionLibraryCatalog([mixed[0], mixed[0]], healthFor(2), 0, now), /duplicated/);
  assert.throws(() => partitionLibraryCatalog(Array.from({ length: 15_001 }, (_, index) => makeRow(index)), healthFor(15_001), 110, now), /record bound/);
  assert.throws(() => partitionLibraryCatalog(Array.from({ length: 5000 }, (_, index) => makeRow(index, true)), healthFor(5000), 110, now), /native STEM core/);
  const malformed = { ...mixed[0], ages: { min: 9, max: 12 } };
  assert.throws(() => partitionLibraryCatalog([malformed], healthFor(1), 0, now), /inconsistent/);
  console.log("Library catalog partition self-test passed: 10,000-row round trip, disjoint IDs, thin fields, month/fraction exclusion, independent core minimum, full-health rejection, duplicate/age/overflow failures.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  if (process.argv.includes("--self-test")) selfTest();
  else prepare();
}
