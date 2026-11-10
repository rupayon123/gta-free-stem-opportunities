import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

async function test() {
  const dir = mkdtempSync(join(tmpdir(), "gta-discovery-pipeline-"));
  const path = join(dir, "review.ts");
  const calls: string[] = [];
  const index = readFileSync("scripts/fixtures/autism-ontario-index-2026-11-10.html", "utf8").replaceAll("2026", "2030");
  const oldFetch = globalThis.fetch;
  const oldArgs = process.argv;
  const previousOutput = process.env.GTA_DISCOVERY_REVIEW_OUTPUT;
  const previousMinimum = process.env.GTA_MIN_DISCOVERY_SOURCE_SUCCESS_RATIO;
  try {
    process.argv = [process.execPath, "scripts/discover-opportunities.ts", "--summary", "--write-review"];
    process.env.GTA_DISCOVERY_REVIEW_OUTPUT = path;
    process.env.GTA_MIN_DISCOVERY_SOURCE_SUCCESS_RATIO = "0";
    globalThis.fetch = (async (input: string | URL | Request) => {
      const url = String(input); calls.push(url);
      if (url.startsWith("https://www.autismontario.com/events")) return new Response(index);
      return new Response('<a href="/events/community-family-art">Community Family Art</a>');
    }) as typeof fetch;
    const { discoveryRun } = await import("./discover-opportunities");
    await discoveryRun;
    const output = readFileSync(path, "utf8");
    const match = output.match(/generatedDiscoveryReviewCandidates = ([\s\S]*?) satisfies DiscoveredOpportunity/);
    assert(match);
    const rows = JSON.parse(match[1]);
    const lead = rows.find((row: { sourceUrl: string }) => row.sourceUrl === "https://www.autismontario.com/civicrm/event/info?id=13014");
    assert(lead);
    assert.equal(lead.status, "needs_review");
    assert.equal(lead.cost, "Unknown");
    assert.equal(lead.costEvidence, "unknown");
    assert.equal(lead.eligibilityEvidence, "unknown");
    assert.equal(lead.ageMin, undefined);
    assert(calls.filter(url => url.startsWith("https://www.autismontario.com/events")).length <= 4);
    assert(rows.some((row: { title: string; status: string; cost: string }) => row.title === "Community Family Art" && row.status === "needs_review" && row.cost === "Unknown"));
    assert.match(output, /"sourceId": "autism-ontario-index"[\s\S]*?"status": "ok"/);
    console.log("Scheduled discovery entrypoint produced bounded, review-only non-STEM leads with unknown evidence.");
  } finally {
    globalThis.fetch = oldFetch; process.argv = oldArgs;
    if (previousOutput === undefined) delete process.env.GTA_DISCOVERY_REVIEW_OUTPUT; else process.env.GTA_DISCOVERY_REVIEW_OUTPUT = previousOutput;
    if (previousMinimum === undefined) delete process.env.GTA_MIN_DISCOVERY_SOURCE_SUCCESS_RATIO; else process.env.GTA_MIN_DISCOVERY_SOURCE_SUCCESS_RATIO = previousMinimum;
    rmSync(dir, { recursive: true, force: true });
  }
}
test().catch(error => { console.error(error); process.exitCode = 1; });
