import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parseAuroraPages, type AuroraPages } from "../../scripts/youth-hunter/aurora";
import { emptyYouthHunterState, reconcileYouthSource, buildPublicYouthFeed, serializePublicYouthFeed, maximumPublicYouthFeedBytes } from "./feed";
import { createYouthFeedLoader } from "./client";
const now = "2030-01-01T12:00:00.000Z";
const later = "2030-01-02T12:00:00.000Z";
const pages = JSON.parse(readFileSync(new URL("./fixtures/aurora-synthetic.json", import.meta.url), "utf8")) as AuroraPages;
function raw(time = now) {
  const observation = parseAuroraPages(pages, time);
  const state = reconcileYouthSource(emptyYouthHunterState(), { ok: true, observation }, { providerId: "aurora-library", adapterVersion: 1, contentMode: "authored-facts", approvedAt: now }).state;
  return serializePublicYouthFeed(buildPublicYouthFeed(state, time));
}
const response = (body: string) => new Response(body, { headers: { "content-type": "application/json" } });

test("disabled SSR/client snapshots stay referentially stable with zero fetches or clock reads", async () => {
  let calls = 0; let clocks = 0;
  const store = createYouthFeedLoader({ now: () => { clocks++; return now; }, fetcher: async () => { calls++; return response(raw()); } });
  const before = store.getSnapshot(); const server = store.getServerSnapshot();
  assert.equal(Object.is(before, store.getSnapshot()), true); assert.equal(Object.is(server, store.getServerSnapshot()), true);
  await store.load({ enabled: false });
  assert.equal(Object.is(before, store.getSnapshot()), true); assert.equal(calls, 0); assert.equal(clocks, 0);
  let notifications = 0; const unsubscribe = store.subscribe(() => { notifications++; });
  await store.load({ enabled: true }); const ready = store.getSnapshot();
  assert.equal(ready.state, "ready"); assert.equal(Object.is(ready, store.getSnapshot()), true);
  assert.equal(Object.is(server, store.getServerSnapshot()), true); assert.equal(notifications, 2);
  unsubscribe(); store.dispose(); assert.equal(Object.is(before, store.getSnapshot()), true);
});
test("older overlapping response cannot overwrite newer result even if transport ignores cancellation", async () => {
  const resolves: ((r: Response) => void)[] = []; const signals: AbortSignal[] = [];
  const fetcher: typeof fetch = async (_url, init) => new Promise(resolve => { resolves.push(resolve); signals.push(init!.signal as AbortSignal); });
  const store = createYouthFeedLoader({ now: () => later, fetcher });
  const a = store.load({ enabled: true }); const b = store.load({ enabled: true });
  assert.equal(signals[0].aborted, true);
  resolves[1](response(raw(later))); await b;
  const newest = store.getSnapshot(); assert.equal(newest.state, "ready");
  resolves[0](response(raw())); await a;
  assert.equal(Object.is(newest, store.getSnapshot()), true);
  store.dispose();
});
test("explicit abort reports cancellation with current-clock last good cache and no renewed timestamp", async () => {
  let clock = now; let mode: "good" | "wait" = "good";
  const fetcher: typeof fetch = async (_url, init) => {
    assert.equal(init?.credentials, "omit"); assert.equal(init?.redirect, "error");
    if (mode === "good") return response(raw());
    return new Promise((_resolve, reject) => init!.signal!.addEventListener("abort", () => reject(new Error("cancelled")), { once: true }));
  };
  const store = createYouthFeedLoader({ now: () => clock, fetcher });
  await store.load({ enabled: true }); mode = "wait"; clock = "2030-02-02T12:00:00.000Z";
  const caller = new AbortController(); const loading = store.load({ enabled: true, signal: caller.signal });
  caller.abort(); await loading;
  const current = store.getSnapshot(); assert.equal(current.state, "error");
  if (current.state !== "error") throw new Error("expected explicit error");
  assert.equal(current.reason, "cancelled"); assert.equal(current.cached?.state, "stale");
  assert.equal(current.cached?.feed.generatedAt, now); assert.equal(current.cached?.feed.count, 0);
  assert.equal(Object.is(current, store.getSnapshot()), true); store.dispose();
});
test("malformed and oversized streamed data retain last good session snapshot, never fake empty success", async () => {
  let mode: "good" | "bad" | "large" | "missing" = "good";
  const fetcher: typeof fetch = async () => {
    if (mode === "good") return response(raw());
    if (mode === "bad") return response("not JSON");
    if (mode === "missing") return new Response("missing", { status: 404 });
    return new Response(new ReadableStream({ start(c) { c.enqueue(new Uint8Array(maximumPublicYouthFeedBytes + 1)); c.close(); } }), { headers: { "content-type": "application/json" } });
  };
  const store = createYouthFeedLoader({ now: () => now, fetcher });
  await store.load({ enabled: true });
  for (const value of ["bad", "large", "missing"] as const) {
    mode = value; await store.load({ enabled: true }); const s = store.getSnapshot();
    assert.equal(s.state, "error"); if (s.state !== "error") throw new Error("expected error");
    assert.equal(s.cached?.feed.count, 2); assert.equal(s.cached?.feed.generatedAt, now);
    assert.equal(s.cached?.state, "ready"); assert.equal(s.reason, value === "missing" ? "network" : "invalid");
  }
  store.dispose();
});
