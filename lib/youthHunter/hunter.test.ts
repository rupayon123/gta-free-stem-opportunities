import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parseYouthListing } from "../highSchool/model";
import { auroraUrls, collectAuroraRoles, parseAuroraPages, type AuroraPages } from "../../scripts/youth-hunter/aurora";
import { buildPublicYouthFeed, decodePublicYouthFeed, emptyYouthHunterState, reconcileYouthSource, serializePublicYouthFeed, type YouthProviderApproval } from "./feed";

const checkedAt = "2030-01-01T12:00:00.000Z";
const approval: YouthProviderApproval = { providerId: "aurora-library", adapterVersion: 1, contentMode: "authored-facts", approvedAt: checkedAt };
const fixture = JSON.parse(readFileSync(new URL("./fixtures/aurora-synthetic.json", import.meta.url), "utf8"));
const pages = (): AuroraPages => ({ index: fixture.index, reading: fixture.reading, math: fixture.math, faq: fixture.faq });
const observation = () => parseAuroraPages(pages(), checkedAt);
const state = () => reconcileYouthSource(emptyYouthHunterState(), { ok: true, observation: observation() }, approval).state;

test("two real role identities retain all authored requirements and source application routes", () => {
  const o = observation(); assert.equal(o.roles.length, 2);
  assert.equal(new Set(o.roles.map(r => r.roleDetails!.applicationUrl)).size, 2);
  assert.deepEqual(o.reviewRequiredIds, []);
  for (const r of o.roles) {
    assert.deepEqual(r.audience.grades, [9, 10, 11, 12]);
    assert.equal(r.audience.ageMin, undefined); assert.equal(r.audience.ageMax, undefined);
    assert.equal(r.availability.opensAt, undefined); assert.equal(r.availability.closesAt, undefined);
    assert.equal(r.roleDetails!.contentMode, "authored-facts");
    assert.match(r.roleDetails!.requirements.join(" "), /orientation/);
    assert.match(r.roleDetails!.commitment, /Ten weekly sessions/);
    assert.match(r.roleDetails!.selection, /does not guarantee/);
    assert.match(r.roleDetails!.applicationInstructions, /submit only one application/);
    assert.equal(r.hours.minutes, undefined); assert.equal(r.cost.status, "unknown");
    assert.equal(JSON.stringify(r).includes("MUST-NOT-COLLECT"), false);
    assert.equal(JSON.stringify(r).includes("DYNAMIC"), false);
  }
});
test("one-time adapter approval allows unknown-cost leads without free badges or per-record approvals", () => {
  const o = observation(); const empty = emptyYouthHunterState();
  assert.equal(buildPublicYouthFeed(reconcileYouthSource(empty, { ok: true, observation: o }).state, checkedAt).count, 0);
  const feed = buildPublicYouthFeed(state(), checkedAt);
  assert.equal(feed.count, 2); assert.deepEqual(feed.verifiedFreeRoleIds, []);
  assert.deepEqual(feed.costUnconfirmedLeadIds, o.roles.map(r => r.id));
  const later = "2030-01-02T12:00:00.000Z";
  const changed = pages(); changed.index = changed.index.replace("Grades 9-12", "Grades 10-12");
  const updated = reconcileYouthSource(state(), { ok: true, observation: parseAuroraPages(changed, later) }, approval);
  assert.equal(updated.accepted, true); assert.equal(buildPublicYouthFeed(updated.state, later).count, 2);
  assert.deepEqual(updated.state.roles[0].audience.grades, [10, 11, 12]);
  assert.equal(updated.state.roles[0].checkedAt, later);
  assert.notEqual(updated.state.fingerprints[updated.state.roles[0].id], state().fingerprints[updated.state.roles[0].id]);
});
test("new screening requirements stay private while closed roles disappear immediately", () => {
  const p = pages(); p.reading = p.reading.replace("<form>", "<p>A background check is required.</p><form>");
  const o = parseAuroraPages(p, checkedAt);
  assert.deepEqual(o.reviewRequiredIds, ["aurora-buddies-reading"]);
  const held = reconcileYouthSource(state(), { ok: true, observation: o }, approval).state;
  assert.equal(buildPublicYouthFeed(held, checkedAt).count, 1);
  const changedApplicationRule = pages();
  changedApplicationRule.index = changedApplicationRule.index.replace("Please submit only one application.", "Application process changed.");
  const changedRule = parseAuroraPages(changedApplicationRule, checkedAt);
  assert.deepEqual(changedRule.reviewRequiredIds, ["aurora-buddies-reading", "aurora-buddies-math"]);
  assert.equal(buildPublicYouthFeed(reconcileYouthSource(state(), { ok: true, observation: changedRule }, approval).state, checkedAt).count, 0);
  assert.equal(changedRule.roles[0].roleDetails!.applicationInstructions.includes("submit only one application"), false, "missing source wording cannot become a static claim");
  const closed = pages(); closed.index = closed.index.replace("(On-going)", "(Closed)");
  assert.equal(buildPublicYouthFeed(reconcileYouthSource(state(), { ok: true, observation: parseAuroraPages(closed, checkedAt) }, approval).state, checkedAt).count, 0);
});
test("fetch or parse failure preserves state and timestamps but never keeps stale openings alive", () => {
  const prior = state(); const result = reconcileYouthSource(prior, { ok: false, error: "provider unavailable" }, approval);
  assert.equal(result.state, prior); assert.equal(result.accepted, false);
  assert.equal(result.state.roles[0].checkedAt, checkedAt);
  assert.equal(buildPublicYouthFeed(result.state, "2030-02-01T12:00:00.000Z").count, 0);
  const broken = pages(); broken.index = "<h1>Just a moment</h1>";
  assert.throws(() => parseAuroraPages(broken, checkedAt));
  const wrongRoute = pages(); wrongRoute.index = wrongRoute.index.replace("/form-reading-buddies-teen-application/", "https://evil.invalid/form");
  assert.throws(() => parseAuroraPages(wrongRoute, checkedAt));
});
test("dedup and complete successful removal do not depend on an invented event date", () => {
  const o = observation(); o.roles.push(o.roles[0]);
  const prior = state(); const rejected = reconcileYouthSource(prior, { ok: true, observation: o }, approval);
  assert.equal(rejected.state, prior); assert.equal(rejected.accepted, false);
  const empty = { ...observation(), roles: [], fingerprints: {}, reviewRequiredIds: [] };
  const removed = reconcileYouthSource(prior, { ok: true, observation: empty }, approval).state;
  assert.deepEqual(removed.roles, []); assert.equal(removed.retiredIds.length, 2);
  const incomplete = { ...empty, complete: false };
  assert.equal(reconcileYouthSource(prior, { ok: true, observation: incomplete }, approval).state, prior);
});
test("role details remain optional for legacy records but complete factual detail and safe routes are enforced", () => {
  const r = observation().roles[0]; const { roleDetails, ...legacy } = r;
  assert.deepEqual(parseYouthListing(legacy), legacy);
  assert.throws(() => parseYouthListing({ ...r, roleDetails: { ...roleDetails, contentMode: "provider-original" } }));
  assert.throws(() => parseYouthListing({ ...r, roleDetails: { ...roleDetails, applicationUrl: "http://example.org/" } }));
  assert.throws(() => parseYouthListing({ ...r, roleDetails: { ...roleDetails, diagnosis: "private" } }));
  const feed = buildPublicYouthFeed(state(), checkedAt);
  assert.deepEqual(decodePublicYouthFeed(serializePublicYouthFeed(feed), checkedAt), feed);
  const browserGlobal = globalThis as unknown as { Buffer?: unknown };
  const originalBuffer = browserGlobal.Buffer;
  try {
    browserGlobal.Buffer = undefined;
    assert.deepEqual(decodePublicYouthFeed(serializePublicYouthFeed(feed), checkedAt), feed, "browser consumers require no Node Buffer polyfill");
  } finally { browserGlobal.Buffer = originalBuffer; }
  assert.equal(decodePublicYouthFeed(serializePublicYouthFeed(feed), "2030-02-01T12:00:00.000Z").count, 0);
  assert.throws(() => decodePublicYouthFeed(JSON.stringify({ ...feed, verifiedFreeRoleIds: feed.costUnconfirmedLeadIds }), checkedAt));
});
test("collector uses exactly four allowlisted sequential GETs without cookies, redirects or submission", async () => {
  const requests: string[] = []; let active = 0; let peak = 0;
  const html = pages();
  const fetcher: typeof fetch = async (input, init) => {
    const url = String(input); requests.push(url); active++; peak = Math.max(peak, active);
    assert.equal(init?.method, undefined); assert.equal(init?.credentials, "omit"); assert.equal(init?.redirect, "error");
    const key = (Object.keys(auroraUrls) as (keyof AuroraPages)[]).find(k => auroraUrls[k] === url)!;
    assert.ok(key); await Promise.resolve(); active--;
    return new Response(html[key], { headers: { "content-type": "text/html" } });
  };
  const result = await collectAuroraRoles({ fetcher, now: () => checkedAt });
  assert.equal(result.ok, true); assert.deepEqual(requests, Object.values(auroraUrls)); assert.equal(peak, 1);
  let calls = 0;
  const failed: typeof fetch = async () => { calls++; return new Response("denied", { status: 403 }); };
  assert.equal((await collectAuroraRoles({ fetcher: failed, now: () => checkedAt })).ok, false);
  assert.equal(calls, 1, "never bypass or retry a denied page");
});
