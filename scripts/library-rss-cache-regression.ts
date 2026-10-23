import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fetchFeed, generateLibraryOpportunities, toOpportunity, parseItems, type LibraryFeed } from "./generate-library-opportunities";

export async function verifyLibraryRssCache() {
  const directory = mkdtempSync(join(tmpdir(), "gta-library-rss-fixture-"));
  const originalDirectory = process.cwd();
  const now = new Date("2026-10-22T00:04:00.000Z");
  const capturedAt = "2026-10-21T23:59:00.000Z";
  const feed: LibraryFeed = {
    id: "fixture-rss", libraryId: "fixture", organization: "Fixture Public Library",
    providerContact: "https://fixture.invalid/contact", region: "Toronto", city: "Toronto", pages: 6
  };
  const url = (page: number) => `https://gateway.bibliocommons.com/v2/libraries/fixture/rss/events?page=${page}`;
  const cacheFile = (page: number) => join(directory, `${createHash("sha256").update(url(page)).digest("hex")}.json`);
  const rss = (first: number, count: number) => `<rss><channel>${Array.from({ length: count }, (_, index) => `<item>
    <title>Science Fiction Book Club ${first + index}</title><description>Discuss a novel with neighbours. For ages 18 and up.</description>
    <link>https://fixture.invalid/events/${first + index}</link><category>Adult</category>
    <bc:start_date>2026-10-23T14:00:00Z</bc:start_date><bc:end_date>2026-10-23T15:00:00Z</bc:end_date>
  </item>`).join("")}</channel></rss>`;
  const xml = rss(1, 25);
  let requests = 0;
  const fetcher = (async () => { requests += 1; return new Response(xml); }) as typeof fetch;
  try {
    const first = await fetchFeed(feed, 1, fetcher, { cacheDirectory: directory, now: () => new Date(capturedAt) });
    const reused = await fetchFeed(feed, 1, fetcher, { cacheDirectory: directory, now: () => now });
    assert.equal(requests, 1, "A publisher retry must reuse a recent raw page instead of requesting it again.");
    assert.equal(first.fromCache, false);
    assert.equal(reused.fromCache, true);
    assert.equal(reused.xml, xml);
    assert.equal(reused.capturedAt, capturedAt, "Cache reuse must not refresh the source capture clock.");
    const originalFacts = toOpportunity(parseItems(reused.xml)[0], feed, reused.capturedAt);
    assert.equal(originalFacts.sources[0].capturedAt, capturedAt);
    assert.equal(originalFacts.lastChecked, "2026-10-21");
    assert.equal(originalFacts.lastSeen, "2026-10-21");
    assert.equal(originalFacts.lastVerified, "2026-10-21");
    assert.equal(toOpportunity(parseItems(xml)[0], feed, now.toISOString()).lastChecked, "2026-10-21", "Crossing UTC midnight must not claim tomorrow's Toronto source-check date.");

    // Simulate an older classifier's generated output. The real collector must
    // discard that projection and reclassify raw cached RSS under current code.
    const secondXml = rss(26, 5);
    await fetchFeed(feed, 2, (async () => new Response(secondXml)) as typeof fetch, { cacheDirectory: directory, now: () => now });
    process.chdir(directory);
    mkdirSync("lib");
    const masterPath = join(directory, "lib/generatedLibraryOpportunities.ts");
    writeFileSync(masterPath, `export const generatedLibraryOpportunities = ${JSON.stringify(Array.from({ length: 30 }, () => ({ category: "STEM" })))} satisfies Opportunity[];`);
    await generateLibraryOpportunities({
      feeds: [{ ...feed, pages: 2 }], cacheDirectory: directory, now: () => now,
      fetcher: (async () => { throw new Error("A cached retry must not use the network."); }) as typeof fetch
    });
    const generated = readFileSync(masterPath, "utf8");
    const rows = JSON.parse(generated.match(/generatedLibraryOpportunities = ([\s\S]*?) satisfies Opportunity\[\];/)![1]);
    const health = JSON.parse(generated.match(/generatedLibrarySourceHealth = ([\s\S]*?) satisfies LibrarySourceHealth;/)![1]);
    assert.equal(rows.length, 30);
    assert(rows.every((row: { category: string; categories: string[] }) => row.category === "Library & Community" && !row.categories.includes("STEM")), "A changed classifier must run over raw RSS again, replacing old derived categories.");
    assert.equal(health.generatedAt, capturedAt, "The collection clock is its earliest actual raw-page capture.");
    assert.equal(health.successfulPages, 2, "Validated cached pages retain truthful successful page outcomes.");
    process.chdir(originalDirectory);

    const validEnvelope = JSON.parse(readFileSync(cacheFile(1), "utf8"));
    const invalidEntries = [
      ["expired", JSON.stringify({ ...validEnvelope, capturedAt: new Date(now.getTime() - 15 * 60_000 - 1).toISOString() })],
      ["future", JSON.stringify({ ...validEnvelope, capturedAt: new Date(now.getTime() + 1).toISOString() })],
      ["invalid timestamp", JSON.stringify({ ...validEnvelope, capturedAt: "not a timestamp" })],
      ["wrong URL", JSON.stringify({ ...validEnvelope, url: url(99) })],
      ["malformed JSON", "not JSON"],
      ["oversize entry", " ".repeat(2 * 1024 * 1024 + 1)],
      ["malformed RSS", JSON.stringify({ ...validEnvelope, xml: "<html>denied</html>" })],
      ["corrupted content", JSON.stringify({ ...validEnvelope, xml: xml.replace("neighbours", "changed content") })]
    ];
    for (const [reason, payload] of invalidEntries) {
      writeFileSync(cacheFile(1), payload);
      const before: number = requests;
      const refreshed = await fetchFeed(feed, 1, fetcher, { cacheDirectory: directory, now: () => now });
      assert.equal(requests, before + 1, `${reason} cache entry must be rejected and fetched safely.`);
      assert.equal(refreshed.fromCache, false);
      assert.equal(refreshed.capturedAt, now.toISOString());
    }

    for (const status of [403, 429]) {
      let attempts = 0;
      await assert.rejects(fetchFeed(feed, status, (async () => { attempts += 1; return new Response("denied", { status }); }) as typeof fetch, { cacheDirectory: directory, now: () => now }), new RegExp(String(status)));
      assert.equal(attempts, 1, `${status} must never receive an immediate retry.`);
      assert.equal(existsSync(cacheFile(status)), false, `${status} must never enter the success cache.`);

      process.chdir(directory);
      const previousMaster = readFileSync(masterPath, "utf8");
      const pages: number[] = [];
      await assert.rejects(generateLibraryOpportunities({
        feeds: [feed], now: () => now, cacheDirectory: "",
        fetcher: (async (input) => {
          const page = Number(new URL(String(input)).searchParams.get("page"));
          pages.push(page);
          if (status === 403 && page === 4) throw new Error("A sibling transient failure must not retry after provider denial.");
          return page <= 2 ? new Response(rss(page * 25, 25)) : new Response("provider denied collection", { status });
        }) as typeof fetch
      }), new RegExp(String(status)));
      assert.deepEqual(pages.sort((a, b) => a - b), [1, 2, 3, 4], "A provider denial stops after the already-started two-request batch; no later pages.");
      assert.equal(readFileSync(masterPath, "utf8"), previousMaster, "A denied collection must preserve the previous master byte for byte.");
      process.chdir(originalDirectory);
    }
    console.log("Library raw RSS cache regressions passed: retry reclassification, original capture clocks, expiry/corruption rejection, and immediate fail-closed provider denial; no network requests.");
  } finally {
    process.chdir(originalDirectory);
    rmSync(directory, { recursive: true, force: true });
  }
}
