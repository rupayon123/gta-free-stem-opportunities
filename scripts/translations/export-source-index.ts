import { createHash } from "node:crypto";
import { mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { generatedLibraryOpportunities, generatedLibrarySourceHealth } from "../../lib/generatedLibraryOpportunities";
import { publicOpportunities } from "../../lib/opportunityStatus";
import reviewedRestrictedIds from "../../lib/reviewedRestrictedOpportunityIds.json";
import { nativeContentRights } from "../native-content-rights";

const outputIndex = process.argv.indexOf("--output");
const output = outputIndex >= 0 ? process.argv[outputIndex + 1] : undefined;
if (!output) throw new Error("An explicit --output source-index path is required.");
const snapshot = new Date(generatedLibrarySourceHealth.generatedAt);
if (!Number.isFinite(snapshot.getTime())) throw new Error("Invalid translation source collection clock.");
const restricted = new Set(reviewedRestrictedIds);
const current = publicOpportunities(generatedLibraryOpportunities, snapshot);
const rows = current.filter(row => !restricted.has(row.id));
// Apply the same reviewed provider/URL/permission policy; never infer new grants.
nativeContentRights(rows, generatedLibraryOpportunities, snapshot.toISOString().slice(0, 10));
if (!rows.length || rows.length > 15_000) throw new Error("Translation source count is outside its bound.");
const records: Record<string, { organization: string; sourceUrl: string; titleSHA256: string; descriptionSHA256: string }> = {};
const texts: Record<string, string> = {};
for (const row of rows) {
  if (Object.hasOwn(records, row.id) || !row.id || row.id.length > 200) throw new Error("Duplicate or invalid translation source ID.");
  const hash = (text: string) => {
    if (!text.trim() || Buffer.byteLength(text, "utf8") > 100_000) throw new Error("Invalid full source text.");
    const digest = createHash("sha256").update(text, "utf8").digest("hex");
    texts[digest] = text;
    return digest;
  };
  records[row.id] = { organization: row.organization, sourceUrl: row.sourceUrl, titleSHA256: hash(row.title), descriptionSHA256: hash(row.description) };
}
function sorted(value: unknown): unknown {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return Object.fromEntries(Object.entries(value).sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0).map(([key, entry]) => [key, sorted(entry)]));
  }
  return value;
}
const bytes = Buffer.from(`${JSON.stringify(sorted({ schemaVersion: 1, sourceLanguage: "en", records, texts }))}\n`, "utf8");
if (bytes.byteLength > 10_000_000) throw new Error("Source index exceeds its 10 MB response bound; previous index retained.");
mkdirSync(dirname(output), { recursive: true });
const temporary = `${output}.${process.pid}.tmp`;
try {
  writeFileSync(temporary, bytes, { flag: "wx" });
  renameSync(temporary, output);
} finally { rmSync(temporary, { force: true }); }
console.log(JSON.stringify({ fullDescriptionSourceRecords: rows.length, uniqueTexts: Object.keys(texts).length, excludedReviewedRecords: current.length - rows.length, bytes: bytes.byteLength, sha256: createHash("sha256").update(bytes).digest("hex"), sourceSnapshotAt: snapshot.toISOString(), nativeFeedChanged: false }));
