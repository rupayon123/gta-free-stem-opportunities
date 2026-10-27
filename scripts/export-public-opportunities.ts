import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { publicationSnapshotTime, sourceOpportunities } from "../lib/data";
import { generatedDiscoverySummary } from "../lib/generatedDiscoveryReview";
import { generatedLibrarySourceHealth, generatedLibraryCollectionHealth } from "../lib/generatedCoreLibraryOpportunities";
import { publicOpportunities } from "../lib/opportunityStatus";
import { type FeedPayload, prepareNativePublication, serializeNativeFeed } from "./native-publication";
import { nativeContentRights } from "./native-content-rights";
export { serializeNativeFeed } from "./native-publication";

const outputPath = process.env.GTA_PUBLIC_OPPORTUNITIES_EXPORT ?? "public/opportunities.json";

const publicListings = publicOpportunities(sourceOpportunities, publicationSnapshotTime()).map((opportunity) => ({
  id: opportunity.id,
  title: opportunity.title,
  organization: opportunity.organization,
  description: opportunity.description,
  city: opportunity.city,
  region: opportunity.region,
  ageMin: opportunity.ageMin,
  ageMax: opportunity.ageMax,
  category: opportunity.category,
  categories: opportunity.categories,
  cost: opportunity.cost,
  language: opportunity.language,
  deadline: opportunity.deadline,
  startDate: opportunity.startDate,
  endDate: opportunity.endDate,
  sourceUrl: opportunity.sourceUrl,
  registrationUrl: opportunity.registrationUrl,
  lastChecked: opportunity.lastChecked,
  lastSeen: opportunity.lastSeen,
  status: opportunity.status,
  tags: opportunity.tags,
  communityFocus: opportunity.communityFocus,
  latitude: opportunity.latitude,
  longitude: opportunity.longitude,
  address: opportunity.address,
  virtual: opportunity.virtual,
  volunteerHoursEligible: opportunity.volunteerHoursEligible,
  coopEligible: opportunity.coopEligible,
  trustedSource: opportunity.trustedSource,
  sources: opportunity.sources
}));

const lastDataChange = publicListings
  .flatMap((opportunity) => [opportunity.lastChecked, opportunity.lastSeen].filter(Boolean))
  .sort()
  .at(-1);

const payload = {
  name: "GTA FREE STEM Opportunities public feed",
  schemaVersion: 1,
  count: publicListings.length,
  lastDataChange,
  coverage: {
    regions: [...new Set(publicListings.map((opportunity) => opportunity.region))].sort(),
    cities: [...new Set(publicListings.map((opportunity) => opportunity.city))].sort(),
    organizations: [...new Set(publicListings.map((opportunity) => opportunity.organization))].sort()
  },
  sourceHealth: {
    library: generatedLibrarySourceHealth,
    libraryCollection: generatedLibraryCollectionHealth,
    discovery: {
      ...generatedDiscoverySummary.sourceHealth,
      reviewCandidates: generatedDiscoverySummary.newCandidates
    }
  },
  contentRights: nativeContentRights(publicListings, sourceOpportunities, publicationSnapshotTime().toISOString().slice(0, 10)),
  opportunities: publicListings
};

function writeNativeFeed(path: string, value: FeedPayload) {
  const contents = serializeNativeFeed(value);
  // All size/count checks finish before any destination directory/file write.
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents);
  return Buffer.byteLength(contents, "utf8");
}

if (process.argv.includes("--self-test")) {
  const previous = readFileSync(outputPath, "utf8");
  assert.equal(prepareNativePublication(payload, previous, "verify").contents, previous);
  const actual = serializeNativeFeed(payload);
  assert.equal(JSON.parse(actual).opportunities.length, publicListings.length);
  const exportedRows = JSON.parse(actual).opportunities;
  const originalRows = publicOpportunities(sourceOpportunities, publicationSnapshotTime());
  assert(exportedRows.every((row: Record<string, unknown>) => typeof row.virtual === "boolean"), "Every native row must preserve its explicit virtual flag");
  assert.deepEqual(exportedRows.map((row: { id: string; virtual: boolean }) => [row.id, row.virtual]), originalRows.map((row) => [row.id, row.virtual]), "Native virtual flags must align exactly with source identities");
  assert.deepEqual(exportedRows.map((row: { id: string; description: string }) => [row.id, row.description]), originalRows.map((row) => [row.id, row.description]), "Adding virtual metadata must preserve full original bodies and IDs");
  assert(publicListings.every((row) => !Object.hasOwn(row, "translations")));
  const optional = { count: 2, opportunities: [{ id: "missing-translation" }, { id: "empty-translation", translations: {} }] };
  assert.deepEqual(JSON.parse(serializeNativeFeed(optional)).opportunities, optional.opportunities);
  assert.throws(() => serializeNativeFeed({ count: 5000, opportunities: Array(5000).fill(null) }), /records/);
  assert.throws(() => serializeNativeFeed({ count: 2, opportunities: [] }), /inconsistent/);
  const oversized = { count: 1, opportunities: [{ text: "🧪".repeat(2_500_001) }] };
  const directory = mkdtempSync(join(tmpdir(), "gta-native-byte-gate-"));
  try {
    const path = join(directory, "retained.json");
    writeFileSync(path, "retained");
    assert.throws(() => writeNativeFeed(path, oversized), /UTF-8 bytes/);
    assert.equal(readFileSync(path, "utf8"), "retained");
  } finally { rmSync(directory, { recursive: true, force: true }); }
  console.log(JSON.stringify({ nativeExportSelfTest: true, records: publicListings.length, bytes: Buffer.byteLength(actual, "utf8"), optionalTranslations: "missing and empty accepted", virtualFlagsMatchSource: true, virtualRecords: exportedRows.filter((row: { virtual: boolean }) => row.virtual).length, overflowPreservesPreviousFile: true }));
} else {
  const mode = process.argv.includes("--publish") ? "publish" : "verify";
  const previous = existsSync(outputPath) ? readFileSync(outputPath, "utf8") : undefined;
  const publication = prepareNativePublication(payload, previous, mode);
  if (publication.changed) {
    mkdirSync(dirname(outputPath), { recursive: true });
    const temporary = `${outputPath}.${process.pid}.tmp`;
    try {
      writeFileSync(temporary, publication.contents, { flag: "wx" });
      renameSync(temporary, outputPath);
    } finally { rmSync(temporary, { force: true }); }
  }
  console.log(`${mode === "publish" ? "Published" : "Verified committed"} ${publicListings.length} public opportunities (${Buffer.byteLength(publication.contents, "utf8")} bytes; revision ${publication.publicationRevision})${publication.changed ? "" : "; preserved exact accepted bytes"}`);
}
