import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { publicationSnapshotTime, sourceOpportunities } from "../lib/data";
import { generatedDiscoverySummary } from "../lib/generatedDiscoveryReview";
import { generatedLibrarySourceHealth, generatedLibraryCollectionHealth } from "../lib/generatedCoreLibraryOpportunities";
import { publicOpportunities } from "../lib/opportunityStatus";

const outputPath = process.env.GTA_PUBLIC_OPPORTUNITIES_EXPORT ?? "public/opportunities.json";
const maximumNativeBytes = 10_000_000;
const maximumNativeRecords = 4999;

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
  opportunities: publicListings
};

type FeedPayload = { count: number; opportunities: readonly unknown[] };
export function serializeNativeFeed(value: FeedPayload) {
  if (value.count !== value.opportunities.length || value.count > maximumNativeRecords) {
    throw new Error(`Native feed count is inconsistent or exceeds ${maximumNativeRecords} records. Previous output was retained.`);
  }
  // Optional per-record translations are intentionally omitted. Both native
  // clients have category/UI localization and factual original-text fallbacks;
  // repeated generated templates would exceed their shared 10 MB input limit.
  const contents = `${JSON.stringify(value, null, 2)}\n`;
  if (Buffer.byteLength(contents, "utf8") > maximumNativeBytes) {
    throw new Error(`Native feed exceeds ${maximumNativeBytes} UTF-8 bytes. Previous output was retained.`);
  }
  return contents;
}

function writeNativeFeed(path: string, value: FeedPayload) {
  const contents = serializeNativeFeed(value);
  // All size/count checks finish before any destination directory/file write.
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents);
  return Buffer.byteLength(contents, "utf8");
}

if (process.argv.includes("--self-test")) {
  const actual = serializeNativeFeed(payload);
  assert.equal(JSON.parse(actual).opportunities.length, publicListings.length);
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
  console.log(JSON.stringify({ nativeExportSelfTest: true, records: publicListings.length, bytes: Buffer.byteLength(actual, "utf8"), optionalTranslations: "missing and empty accepted", overflowPreservesPreviousFile: true }));
} else {
  const bytes = writeNativeFeed(outputPath, payload);
  console.log(`Exported ${publicListings.length} public opportunities (${bytes} bytes, original provider text) to ${outputPath}`);
}
