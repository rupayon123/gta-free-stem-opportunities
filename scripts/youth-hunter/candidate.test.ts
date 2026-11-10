import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { parseAuroraPages, auroraUrls, type AuroraPages } from "./aurora";
import { refreshYouthOpportunities, importReviewedYouthCandidate } from "../refresh-youth-opportunities";
import { youthProviderApproval } from "./providers";
import { buildPublicYouthFeed, decodePublicYouthFeed, emptyYouthHunterState, reconcileYouthSource } from "../../lib/youthHunter/feed";
import { prepareYouthCandidate, promoteYouthCandidate, readAcceptedYouthSnapshot, readYouthCandidate, verifyAcceptedYouthSnapshot, youthCanonicalPaths } from "./candidate";

const now = "2030-01-01T12:00:00.000Z";
const fixture = JSON.parse(readFileSync(new URL("../../lib/youthHunter/fixtures/aurora-synthetic.json", import.meta.url), "utf8")) as AuroraPages;
const observed = (time = now) => parseAuroraPages(fixture, time);
const state = (time = now) => reconcileYouthSource(emptyYouthHunterState(), { ok: true, observation: observed(time) }, youthProviderApproval(time)).state;
const folder = () => mkdtempSync(join(tmpdir(), "gta-youth-writer-"));
function bootstrap(root: string) {
  const dir = prepareYouthCandidate(state(), now, join(root, "candidates"));
  return promoteYouthCandidate(root, dir, undefined, { allowPromotion: true });
}
const rawPair = (root: string) => Object.fromEntries(Object.entries(youthCanonicalPaths).map(([kind, path]) => [kind, readFileSync(join(root, path), "utf8")]));

test("candidate-only is immutable validated and creates no fake public endpoint", () => {
  const root = folder();
  try {
    assert.equal(readAcceptedYouthSnapshot(root), undefined);
    assert.throws(() => verifyAcceptedYouthSnapshot(root), /not initialized/);
    const directory = prepareYouthCandidate(state(), now, join(root, "candidates"));
    const c = readYouthCandidate(directory);
    assert.equal(JSON.parse(c.feedRaw).count, 2); assert.equal(JSON.parse(c.feedRaw).verifiedFreeRoleIds.length, 0);
    assert.equal(existsSync(join(root, youthCanonicalPaths.feed)), false);
    assert.equal(prepareYouthCandidate(state(), now, join(root, "candidates")), directory);
    assert.throws(() => promoteYouthCandidate(root, directory, undefined, { allowPromotion: false }));
  } finally { rmSync(root, { recursive: true, force: true }); }
});
test("explicit promotion writes a verified pair and leaves unrelated legacy files untouched", () => {
  const root = folder();
  try {
    mkdirSync(join(root, "public")); writeFileSync(join(root, "public/opportunities.json"), "legacy-sentinel");
    const accepted = bootstrap(root);
    assert.equal(verifyAcceptedYouthSnapshot(root).manifest.generation, accepted.manifest.generation);
    assert.equal(readFileSync(join(root, "public/opportunities.json"), "utf8"), "legacy-sentinel");
  } finally { rmSync(root, { recursive: true, force: true }); }
});
test("mid-promotion failure rolls back both canonical payloads and exact check timestamps", () => {
  const root = folder();
  try {
    const accepted = bootstrap(root); const before = rawPair(root);
    const later = "2030-01-02T12:00:00.000Z";
    const candidate = prepareYouthCandidate(state(later), later, join(root, "candidates"));
    assert.throws(() => promoteYouthCandidate(root, candidate, accepted.manifest.generation, { allowPromotion: true, beforeReplace(kind) { if (kind === "feed") throw new Error("disk replacement denied"); } }), /denied/);
    assert.deepEqual(rawPair(root), before); verifyAcceptedYouthSnapshot(root);
    const unrelated = `${join(root, youthCanonicalPaths.state)}.${process.pid}.tmp`;
    writeFileSync(unrelated, "unrelated pre-existing file");
    assert.throws(() => promoteYouthCandidate(root, candidate, accepted.manifest.generation, { allowPromotion: true }));
    assert.equal(readFileSync(unrelated, "utf8"), "unrelated pre-existing file");
    assert.deepEqual(rawPair(root), before);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
test("partial or tampered pairs reject before publication and cannot be silently reinitialized", () => {
  const root = folder();
  try {
    bootstrap(root); writeFileSync(join(root, youthCanonicalPaths.feed), "{}");
    assert.throws(() => verifyAcceptedYouthSnapshot(root), /hash mismatch/);
    rmSync(join(root, youthCanonicalPaths.manifest));
    assert.throws(() => readAcceptedYouthSnapshot(root), /Incomplete/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
test("duplicate IDs fail before candidate promotion and stale records never renew themselves", () => {
  const root = folder();
  try {
    const accepted = bootstrap(root); const before = rawPair(root); const duplicate = state(); duplicate.roles.push(duplicate.roles[0]);
    assert.throws(() => prepareYouthCandidate(duplicate, now, join(root, "candidates")));
    assert.deepEqual(rawPair(root), before);
    assert.equal(decodePublicYouthFeed(accepted.feedRaw, "2030-02-02T12:00:00.000Z").count, 0);
    assert.equal(readAcceptedYouthSnapshot(root)!.state.roles[0].checkedAt, now);
    const old = accepted.manifest.generation;
    const later = "2030-01-02T12:00:00.000Z"; const next = prepareYouthCandidate(state(later), later, join(root, "candidates"));
    promoteYouthCandidate(root, next, old, { allowPromotion: true });
    assert.throws(() => promoteYouthCandidate(root, next, old, { allowPromotion: true }), /changed while collecting/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
test("retirement accepts a complete snapshot but older source replay cannot resurrect a role", () => {
  const prior = state(); const later = "2030-01-02T12:00:00.000Z";
  const removal = { ...observed(later), roles: [], fingerprints: {}, reviewRequiredIds: [] };
  const retired = reconcileYouthSource(prior, { ok: true, observation: removal }, youthProviderApproval(later)).state;
  assert.equal(buildPublicYouthFeed(retired, later).count, 0);
  const replay = reconcileYouthSource(retired, { ok: true, observation: observed() }, youthProviderApproval(now));
  assert.equal(replay.accepted, false); assert.equal(replay.state, retired);
});
test("fetch failure never promotes or rewrites previous good bytes and checks", async () => {
  const root = folder();
  try {
    bootstrap(root); const before = rawPair(root); let calls = 0;
    const failed: typeof fetch = async () => { calls++; return new Response("denied", { status: 403 }); };
    const preserved = await refreshYouthOpportunities({ root, fetcher: failed, now: () => now, promote: true, allowPromotion: true });
    assert.equal(preserved.status, "preserved"); assert.equal(preserved.promoted, false);
    assert.match(preserved.warning!, /preserved/);
    assert.equal(calls, 1); assert.deepEqual(rawPair(root), before);
    const fetcher: typeof fetch = async input => {
      const key = (Object.keys(auroraUrls) as (keyof AuroraPages)[]).find(k => auroraUrls[k] === String(input))!;
      return new Response(fixture[key], { headers: { "content-type": "text/html" } });
    };
    const prepared = await refreshYouthOpportunities({ root, candidateRoot: join(root, "private"), fetcher, now: () => now });
    assert.equal(prepared.promoted, false); assert.equal(prepared.costUnconfirmedLeads, 2); assert.equal(prepared.verifiedFreeRoles, 0);
    assert.deepEqual(rawPair(root), before);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("auxiliary failure and ambiguous changes preserve a stale valid snapshot without blocking other refreshes", async () => {
  const root = folder();
  try {
    const accepted = bootstrap(root); const before = rawPair(root);
    const future = "2030-02-02T12:00:00.000Z";
    const failed: typeof fetch = async () => new Response("offline", { status: 503 });
    const result = await refreshYouthOpportunities({ root, fetcher: failed, now: () => future, promote: true, allowPromotion: true });
    assert.equal(result.status, "preserved"); assert.equal(result.publicRoles, 2); assert.equal(result.currentPublicRoles, 0);
    assert.equal(result.generation, accepted.manifest.generation); assert.deepEqual(rawPair(root), before);
    verifyAcceptedYouthSnapshot(root); // Historical validation, not current freshness.
    const ambiguous: typeof fetch = async input => {
      const key = (Object.keys(auroraUrls) as (keyof AuroraPages)[]).find(k => auroraUrls[k] === String(input))!;
      return new Response(fixture[key].replace("Please submit only one application.", "Application process changed."), { headers: { "content-type": "text/html" } });
    };
    const changed = await refreshYouthOpportunities({ root, fetcher: ambiguous, now: () => future, promote: true, allowPromotion: true });
    assert.equal(changed.status, "preserved"); assert.match(changed.warning!, /requirements/); assert.deepEqual(rawPair(root), before);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
test("reviewed local import pins candidate and current generations with no network or fake CI environment", async () => {
  const root = folder();
  try {
    const offline: typeof fetch = async () => new Response("unavailable", { status: 503 });
    await assert.rejects(refreshYouthOpportunities({ root, fetcher: offline, now: () => now, promote: true, allowPromotion: true }));
    assert.equal(existsSync(join(root, youthCanonicalPaths.feed)), false);
    const directory = prepareYouthCandidate(state(), now, join(root, "reviewed")); const c = readYouthCandidate(directory);
    assert.throws(() => importReviewedYouthCandidate({ root, candidate: directory, expectedGeneration: "0".repeat(64), currentGeneration: "none" }), /mismatch/);
    assert.equal(existsSync(join(root, youthCanonicalPaths.feed)), false);
    const accepted = importReviewedYouthCandidate({ root, candidate: directory, expectedGeneration: c.manifest.generation, currentGeneration: "none" });
    assert.equal(accepted.manifest.generation, c.manifest.generation);
    assert.throws(() => importReviewedYouthCandidate({ root, candidate: directory, expectedGeneration: c.manifest.generation, currentGeneration: "none" }), /differs/);
    assert.equal(verifyAcceptedYouthSnapshot(root).manifest.generation, c.manifest.generation);
    const later = "2030-01-02T12:00:00.000Z";
    const newerDirectory = prepareYouthCandidate(state(later), later, join(root, "reviewed"));
    const newer = readYouthCandidate(newerDirectory);
    importReviewedYouthCandidate({ root, candidate: newerDirectory, expectedGeneration: newer.manifest.generation, currentGeneration: c.manifest.generation });
    assert.throws(() => importReviewedYouthCandidate({ root, candidate: directory, expectedGeneration: c.manifest.generation, currentGeneration: newer.manifest.generation }), /Older/);
    assert.equal(verifyAcceptedYouthSnapshot(root).manifest.generation, newer.manifest.generation);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
