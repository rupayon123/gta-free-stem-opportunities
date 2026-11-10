import assert from "node:assert/strict";
import test from "node:test";
import { buildPublicYouthFeed, serializePublicYouthFeed, emptyYouthHunterState } from "./feed";
import { createYouthFeedLoader } from "./client";
const now = "2030-01-01T12:00:00.000Z";

test("empty envelope ages into stale and future revisions never become a fresh zero", async () => {
  let clock = "2030-01-31T12:00:00.000Z";
  let body = serializePublicYouthFeed(buildPublicYouthFeed(emptyYouthHunterState(), now));
  const store = createYouthFeedLoader({ now: () => clock, fetcher: async () => { if (body === "NETWORK_FAIL") throw new Error("offline"); return new Response(body, { headers: { "content-type": "application/json" } }); } });
  await store.load({ enabled: true }); assert.equal(store.getSnapshot().state, "ready", "inclusive30day boundary");
  clock = "2030-01-31T12:00:00.001Z";
  await store.load({ enabled: true }); const stale = store.getSnapshot();
  assert.equal(stale.state, "stale"); if (stale.state !== "stale") throw new Error("expected stale envelope");
  assert.equal(stale.feed.count, 0); assert.equal(stale.feed.generatedAt, now);
  assert.equal(Object.is(stale, store.getSnapshot()), true);
  body = serializePublicYouthFeed(buildPublicYouthFeed(emptyYouthHunterState(), "2030-02-01T12:00:00.000Z"));
  await store.load({ enabled: true }); const future = store.getSnapshot();
  assert.equal(future.state, "error"); if (future.state !== "error") throw new Error("expected invalid future revision");
  assert.equal(future.reason, "invalid"); assert.equal(future.cached?.state, "stale");
  assert.equal(future.cached?.feed.generatedAt, now);
  body = "NETWORK_FAIL"; await store.load({ enabled: true }); const failed = store.getSnapshot();
  assert.equal(failed.state, "error"); if (failed.state !== "error") throw new Error("expected network failure");
  assert.equal(failed.reason, "network"); assert.equal(failed.cached?.state, "stale");
  assert.equal(failed.cached?.feed.generatedAt, now); store.dispose();
});
