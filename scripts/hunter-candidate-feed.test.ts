import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { parseAccessibilitySupport } from "../lib/accessibilitySupport";
import { maximumNativeBytes, maximumNativeRecords } from "./native-publication";
import { sourceOpportunities } from "../lib/data";
import { isAllowedNativeSource } from "./native-source-policy";

const path = process.env.GTA_PUBLIC_OPPORTUNITIES_EXPORT;
if (!path) throw new Error("A temporary candidate feed path is required.");
const bytes = readFileSync(path);
const candidate = JSON.parse(bytes.toString("utf8"));
const previous = JSON.parse(readFileSync("public/opportunities.json", "utf8"));
assert.equal(candidate.count, candidate.opportunities.length);
assert(candidate.count <= maximumNativeRecords && bytes.length <= maximumNativeBytes);
const oldRows = new Map<string, Record<string, unknown>>(previous.opportunities.map((row: Record<string, unknown>) => [row.id as string, row]));
const newRows = new Map<string, Record<string, unknown>>(candidate.opportunities.map((row: Record<string, unknown>) => [row.id as string, row]));
assert.equal(newRows.size, candidate.count, "IDs must be unique");
const reviewedIds = ["ontario-science-centre-pride-in-stem-2026", "autism-ontario-newmarket-quiet-santa-2026-11-22"];
assert.deepEqual([...newRows.keys()].sort(), [...oldRows.keys(), ...reviewedIds].sort(), "Only the two reviewed records may be added");
for (const [id, old] of oldRows) {
  const next = newRows.get(id)!;
  for (const field of ["description", "sourceUrl", "registrationUrl", "startDate", "endDate", "lastChecked"]) {
    assert.deepEqual(next[field], old[field], `${id}: ${field} changed`);
  }
  if (next.accessibilitySupport !== undefined) parseAccessibilitySupport(next.accessibilitySupport);
}
for (const id of reviewedIds) {
  const row = newRows.get(id)!;
  const source = sourceOpportunities.find(item => item.id === id)!;
  assert(row && source && isAllowedNativeSource(source));
  assert.equal(row.description, source.description);
  assert.equal(row.sourceUrl, source.sourceUrl);
  assert.deepEqual(row.accessibilitySupport, source.accessibilitySupport);
  assert.equal(row.status, "active");
  const rights = candidate.contentRights.sources.find((item: { organization: string }) => item.organization === source.organization);
  assert.equal(rights.status, "original-factual-summary");
  assert.equal(rights.records, 1);
  assert.equal(rights.ownerPermission, undefined);
}
console.log(JSON.stringify({ candidateFeed: "review-only with two active events", records: candidate.count, bytes: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex"), previousDescriptionsAndSourceClocksPreserved: true }));
