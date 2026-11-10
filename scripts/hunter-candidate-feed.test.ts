import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { parseAccessibilitySupport } from "../lib/accessibilitySupport";
import { maximumNativeBytes, maximumNativeRecords } from "./native-publication";

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
assert.deepEqual([...newRows.keys()].sort(), [...oldRows.keys()].sort(), "Held records cannot alter published membership");
for (const [id, old] of oldRows) {
  const next = newRows.get(id)!;
  for (const field of ["description", "sourceUrl", "registrationUrl", "startDate", "endDate", "lastChecked"]) {
    assert.deepEqual(next[field], old[field], `${id}: ${field} changed`);
  }
  if (next.accessibilitySupport !== undefined) parseAccessibilitySupport(next.accessibilitySupport);
}
for (const id of ["ontario-science-centre-pride-in-stem-2026", "autism-ontario-newmarket-quiet-santa-2026-11-22"]) assert.equal(newRows.has(id), false);
assert(candidate.contentRights.sources.every((row: { status: string }) => row.status === "owner-confirmed-permission"));
console.log(JSON.stringify({ candidateFeed: "held events excluded", records: candidate.count, bytes: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex"), previousDescriptionsAndSourceClocksPreserved: true }));
