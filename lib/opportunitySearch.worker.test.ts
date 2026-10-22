import assert from "node:assert/strict";
import { Worker as NodeWorker } from "node:worker_threads";
import { build } from "esbuild";
import { acceptedSearchResultIds } from "../components/useOpportunitySearch";
import { createOpportunitySearchWorkerHandler, type OpportunitySearchWorkerRequest, type OpportunitySearchWorkerResponse } from "./opportunitySearch.worker";
import { searchOpportunities } from "./search";
import type { Opportunity } from "./types";

function fixture(id: string, title: string, overrides: Partial<Opportunity> = {}): Opportunity {
  return {
    id, title, description: title, summary: title,
    organization: "Example Public Library", provider: "Example Public Library",
    type: "One-time event", category: "Library & Community", categories: ["Library & Community"],
    communityFocus: ["Open to all"], city: "Toronto", region: "Toronto", address: "Example branch",
    latitude: 43.65, longitude: -79.38, virtual: false,
    startDate: "2026-11-01T15:00:00-05:00", ageMin: 6, ages: { min: 6 }, grades: [], language: ["en"], languages: ["en"],
    cost: "Free to join", sourceUrl: "https://example.invalid/test", registrationUrl: "https://example.invalid/test",
    lastChecked: "2026-10-22", lastSeen: "2026-10-22", lastVerified: "2026-10-22", status: "active",
    accessibility: [], equipment: "Check with provider", food: "Check with provider", capacity: "Check with provider",
    commitment: "One session", providerContact: "", freeStatusProof: "Synthetic worker fixture",
    trustedSource: true, volunteerHoursEligible: false, coopEligible: false, paidPosition: false, tags: [], sources: [],
    ...overrides
  };
}

const allowed = fixture("allowed", "Robot Builders", { category: "Coding & Robotics", categories: ["STEM", "Coding & Robotics"] });
const outsideAge = fixture("outside-age", "Robot Builders for Adults", { category: "Coding & Robotics", categories: ["STEM", "Coding & Robotics"], ageMin: 18, ages: { min: 18 } });
const hidden = fixture("hidden", "Robot Builders", { category: "Coding & Robotics", categories: ["STEM", "Coding & Robotics"], status: "hidden" });
const reading = fixture("reading", "Toddler Storytime");
const master = [allowed, outsideAge, hidden, reading];
const sent: OpportunitySearchWorkerResponse[] = [];
const handle = createOpportunitySearchWorkerHandler((message) => sent.push(message));
handle({ type: "initialize", generation: 1, items: master });
assert.deepEqual(sent.pop(), { type: "ready", generation: 1 });

function request(sequence: number, overrides: Partial<Extract<OpportunitySearchWorkerRequest, { type: "search" }>> = {}): Extract<OpportunitySearchWorkerRequest, { type: "search" }> {
  return { type: "search", generation: 1, sequence, eligibleIds: [allowed.id, reading.id], query: "robotics", language: "en", proximityResolved: false, ...overrides };
}

handle(request(1));
assert.deepEqual(sent.pop(), { type: "results", generation: 1, sequence: 1, ids: [allowed.id] });
handle(request(2, { query: "reading" }));
assert.deepEqual(sent.pop(), { type: "results", generation: 1, sequence: 2, ids: [reading.id] });
handle(request(3, { query: "robotics near me" }));
assert.deepEqual(sent.pop(), { type: "results", generation: 1, sequence: 3, ids: [] });
handle(request(4, { query: "robotics near me", proximityResolved: true }));
assert.deepEqual(sent.pop(), { type: "results", generation: 1, sequence: 4, ids: [allowed.id] });
handle(request(3));
assert.equal(sent.length, 0, "An older sequence must not produce a reply");
handle(request(5, { eligibleIds: ["not-in-master"] }));
assert.equal(sent.pop()?.type, "error", "Unknown eligible records require an explicit failure");
handle({ type: "initialize", generation: 2, items: [reading] });
assert.equal(sent.pop()?.type, "ready");
handle({ type: "initialize", generation: 1, items: master });
assert.equal(sent.length, 0, "A late initialization must not roll back the master catalog");
handle(request(6, { generation: 2, eligibleIds: [reading.id], query: "reading" }));
assert.deepEqual(sent.pop(), { type: "results", generation: 2, sequence: 6, ids: [reading.id] });
handle(request(7));
assert.equal(sent.pop()?.type, "error", "An old-generation search cannot use the new catalog");

const reply = { type: "results", generation: 2, sequence: 8, ids: [reading.id, hidden.id, reading.id] };
assert.deepEqual(acceptedSearchResultIds(reply, 2, 8, new Set([reading.id])), [reading.id]);
assert.equal(acceptedSearchResultIds(reply, 2, 9, new Set([reading.id])), undefined);
assert.equal(acceptedSearchResultIds(reply, 3, 8, new Set([reading.id])), undefined);
assert.equal(acceptedSearchResultIds({ ...reply, ids: [42] }, 2, 8, new Set([reading.id])), undefined);

function nextMessage(worker: NodeWorker): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => { cleanup(); reject(new Error("Search worker adapter timed out")); }, 15_000);
    const message = (value: unknown) => { cleanup(); resolve(value); };
    const error = (value: Error) => { cleanup(); reject(value); };
    const cleanup = () => { clearTimeout(timeout); worker.off("message", message); worker.off("error", error); };
    worker.once("message", message);
    worker.once("error", error);
  });
}

async function main() {
  // Compile in memory, then supply only the browser worker's postMessage API.
  // No generated asset, application build or network service is written/run.
  const bundle = await build({
    entryPoints: ["lib/opportunitySearch.worker.ts"], bundle: true,
    platform: "browser", format: "esm", target: "es2022", write: false
  });
  const workerUrl = `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].contents).toString("base64")}`;
  const adapter = `import { parentPort } from "node:worker_threads";
globalThis.self = {
  postMessage: value => parentPort.postMessage(value),
  addEventListener: (type, callback) => parentPort.on("message", data => callback({ data }))
};
await import(${JSON.stringify(workerUrl)});
parentPort.postMessage({ type: "adapter-ready" });`;
  const worker = new NodeWorker(new URL(`data:text/javascript;base64,${Buffer.from(adapter).toString("base64")}`));
  try {
    assert.deepEqual(await nextMessage(worker), { type: "adapter-ready" });
    let response = nextMessage(worker);
    worker.postMessage({ type: "initialize", generation: 1, items: master } satisfies OpportunitySearchWorkerRequest);
    assert.deepEqual(await response, { type: "ready", generation: 1 });
    for (const [sequence, query] of ["robotics", "reading", "library", "librarry"].entries()) {
      response = nextMessage(worker);
      worker.postMessage(request(sequence + 1, { query }));
      const expected = searchOpportunities([allowed, reading], query).map((item) => item.id);
      assert.deepEqual(await response, { type: "results", generation: 1, sequence: sequence + 1, ids: expected });
    }
    const bulk = Array.from({ length: 5_000 }, (_, index) => fixture(`bulk-${index}`, index % 250 === 0 ? "Robot Builders" : "Community Reading", index % 250 === 0
      ? { category: "Coding & Robotics", categories: ["STEM", "Coding & Robotics"] } : {}));
    response = nextMessage(worker);
    worker.postMessage({ type: "initialize", generation: 2, items: bulk } satisfies OpportunitySearchWorkerRequest);
    assert.deepEqual(await response, { type: "ready", generation: 2 });
    let mainThreadYielded = false;
    const pulse = setTimeout(() => { mainThreadYielded = true; }, 0);
    response = nextMessage(worker);
    worker.postMessage(request(1, { generation: 2, eligibleIds: bulk.filter((_, index) => index % 2 === 0).map((item) => item.id) }));
    const bulkReply = await response as Extract<OpportunitySearchWorkerResponse, { type: "results" }>;
    clearTimeout(pulse);
    assert.equal(bulkReply.type, "results");
    assert.deepEqual(bulkReply.ids.sort(), bulk.filter((_, index) => index % 250 === 0).map((item) => item.id).sort());
    assert(mainThreadYielded, "The main event loop must continue while the worker searches thousands of records");
  } finally {
    await worker.terminate();
  }
  console.log(JSON.stringify({ protocolChecks: 15, actualWorkerQueries: 5, largeMasterRecords: 5000, largeEligibleRecords: 2500, mainEventLoopYielded: true, strictEligibility: true, staleSequenceAndGenerationRejected: true, browserResponseWhitelist: true, generatedFilesWritten: 0 }));
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
