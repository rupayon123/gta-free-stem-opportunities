import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  accessibilityExportFields, accessibilitySupportCategories, accessibilitySupportDecision,
  parseAccessibilitySupport, readAccessibilitySupport, accessibilitySupportUnavailableMessage, type AccessibilitySupport, type AccessibilitySupportEvidence
} from "./accessibilitySupport";
import { decodeLibraryCatalog } from "./libraryCatalog";
import { prepareNativePublication, serializeNativeFeed } from "../scripts/native-publication";

// Synthetic policy examples only. No record here claims an actual provider offers support.
const now = "2030-01-01T12:00:00.000Z";
const evidence = (patch: Partial<AccessibilitySupportEvidence> = {}): AccessibilitySupportEvidence => {
  const row: AccessibilitySupportEvidence = {
  category: "sensory-friendly", status: "provided", scope: "activity",
  sourceUrl: "https://example.org/programme", evidenceText: "Synthetic example: reduced lighting in this session.",
  checkedAt: now, reviewStatus: "approved", ...patch
  };
  return { ...row, ...(row.scope === "venue" ? { venue: row.venue ?? { id: "synthetic-branch", name: "Synthetic branch" } } : {}) };
};
const metadata = (...rows: AccessibilitySupportEvidence[]): AccessibilitySupport => ({ schemaVersion: 1, evidence: rows });

test("legacy notes remain exact and never manufacture structured provider proof", () => {
  const notes = ["  Confirm with provider.  ", "Online event", "Wheelchair accessible venue", "বাংলা\nASL?"];
  const row = { accessibility: notes };
  assert.deepEqual(accessibilityExportFields(row), row);
  const exported = accessibilityExportFields(row);
  assert.notEqual(exported.accessibility, notes);
  assert.equal(Object.hasOwn(exported, "accessibilitySupport"), false);
  assert.deepEqual(accessibilityExportFields({}), {});
  assert.deepEqual(accessibilitySupportDecision(undefined, "mobility-wheelchair", "activity", now), { status: "unknown", reason: "missing" });
  assert.deepEqual(notes, row.accessibility);
});
test("all seven categories retain exact evidence and distinct statuses/scopes", () => {
  for (const category of accessibilitySupportCategories) {
    for (const status of ["provided", "on-request", "not-available", "unknown"] as const) {
      for (const scope of ["venue", "activity", "provider-policy"] as const) {
        const input = metadata(evidence({ category, status, scope }));
        assert.deepEqual(parseAccessibilitySupport(input), input);
        assert.deepEqual(accessibilitySupportDecision(input, category, scope, now, 30, scope === "venue" ? "synthetic-branch" : undefined), { status, reason: "provider-evidence" });
      }
    }
  }
  const onlyVenue = metadata(evidence({ category: "mobility-wheelchair", scope: "venue" }));
  assert.deepEqual(accessibilitySupportDecision(onlyVenue, "mobility-wheelchair", "activity", now), { status: "unknown", reason: "missing" });
});
test("provider request policy is distinct from booked event support and branch proof needs exact mapping", () => {
  const input = metadata(evidence({ scope: "provider-policy", status: "on-request", conditions: ["Synthetic example: request two weeks before the activity."], requestUrl: "https://example.org/request" }));
  assert.deepEqual(parseAccessibilitySupport(input), input);
  assert.equal(accessibilitySupportDecision(input, "sensory-friendly", "activity", now).status, "unknown");
  assert.equal(accessibilitySupportDecision(input, "sensory-friendly", "provider-policy", now).status, "on-request");
  const branch = metadata(evidence({ scope: "venue", category: "mobility-wheelchair" }));
  assert.equal(accessibilitySupportDecision(branch, "mobility-wheelchair", "venue", now).status, "unknown");
  assert.equal(accessibilitySupportDecision(branch, "mobility-wheelchair", "venue", now, 30, "other-branch").status, "unknown");
  assert.equal(accessibilitySupportDecision(branch, "mobility-wheelchair", "venue", now, 30, "synthetic-branch").status, "provided");
  assert.throws(() => parseAccessibilitySupport(metadata(evidence({ conditions: null as never }))));
  assert.throws(() => parseAccessibilitySupport(metadata(evidence({ requestUrl: "http://example.org/request" }))));
  assert.throws(() => parseAccessibilitySupport(metadata({ ...evidence({ scope: "venue" }), venue: undefined })));
});
test("future stale held and contradictory evidence cannot become a positive match", () => {
  const decide = (input: AccessibilitySupport, clock = now) => accessibilitySupportDecision(input, "sensory-friendly", "activity", clock);
  assert.deepEqual(decide(metadata(evidence({ reviewStatus: "hold" }))), { status: "unknown", reason: "unreviewed" });
  assert.deepEqual(decide(metadata(evidence()), "2029-12-31T12:00:00.000Z"), { status: "unknown", reason: "out-of-date" });
  assert.equal(decide(metadata(evidence()), "2030-01-31T12:00:00.000Z").status, "provided", "30 day boundary inclusive");
  assert.deepEqual(decide(metadata(evidence()), "2030-01-31T12:00:00.001Z"), { status: "unknown", reason: "out-of-date" });
  assert.deepEqual(decide(metadata(evidence(), evidence({ status: "not-available" }))), { status: "unknown", reason: "conflicting" });
  assert.equal(decide(metadata(evidence({ status: "on-request" }))).status, "on-request", "request isn't a guarantee of provided support");
  assert.throws(() => decide(metadata(), "invalid"));
});
test("malformed metadata and personal-health extensions fail before publication", () => {
  const valid = metadata(evidence());
  for (const value of [null, {}, { ...valid, schemaVersion: 2 }, { ...valid, diagnosis: "private" },
    metadata(evidence({ category: "inferred-from-title" as never })),
    metadata(evidence({ status: "yes" as never })), metadata(evidence({ scope: "all-venues" as never })),
    metadata(evidence({ evidenceText: " " })), metadata(evidence({ checkedAt: "2030-02-30T12:00:00.000Z" })),
    metadata(evidence({ checkedAt: "2030-01-01" })), metadata(evidence({ sourceUrl: "http://example.org/" })),
    metadata(evidence({ sourceUrl: "https://127.0.0.1/" })), metadata(evidence({ sourceUrl: "https://0x7f000001/" })),
    metadata(evidence({ sourceUrl: "https://device.local./" })), metadata(evidence({ sourceUrl: "https://person:password@example.org/" })),
    { schemaVersion: 1, evidence: [{ ...evidence(), supportNeed: "personal medical detail" }] },
    metadata(...Array.from({ length: 49 }, () => evidence()))
  ]) assert.throws(() => parseAccessibilitySupport(value));
  assert.throws(() => accessibilityExportFields({ accessibility: [false] }));
  assert.throws(() => accessibilityExportFields({ accessibilitySupport: null }));
  assert.deepEqual(parseAccessibilitySupport(metadata()), metadata(), "empty means no provider facts");
});
test("native export is additive and preserves IDs original descriptions rights age and legacy notes", () => {
  const original = { id: "synthetic-role", description: "Exact original body.\nবাংলা", ageMin: 18, ageMax: 18,
    sourceUrl: "https://example.org/event", accessibility: ["Confirm with provider"], contentRights: { unchanged: true } };
  const supported = { ...original, accessibilitySupport: metadata(evidence()) };
  const row = { ...original, ...accessibilityExportFields(supported) };
  assert.deepEqual(row, supported);
  const candidate = { count: 1, opportunities: [row], schemaVersion: 1 };
  const published = prepareNativePublication(candidate, undefined, "publish", new Date(now));
  const exported = JSON.parse(published.contents).opportunities[0];
  assert.deepEqual(exported, supported);
  assert.equal(prepareNativePublication(candidate, published.contents, "verify", new Date(now)).contents, published.contents);
  const legacy = JSON.parse(serializeNativeFeed({ count: 1, opportunities: [original] })).opportunities[0];
  assert.deepEqual(legacy, original);
  assert.equal(Object.hasOwn(legacy, "accessibilitySupport"), false);
});
test("portable schema categories and evidence fields match the runtime contract", () => {
  const schema = JSON.parse(readFileSync(new URL("../schemas/accessibility-support-v1.schema.json", import.meta.url), "utf8"));
  const item = schema.properties.evidence.items;
  assert.deepEqual(item.properties.category.enum, [...accessibilitySupportCategories]);
  assert.deepEqual(new Set(item.required), new Set(Object.keys(evidence())));
  assert.equal(schema.additionalProperties, false); assert.equal(item.additionalProperties, false);
});

test("runtime isolates one malformed or unsupported extension while strict publication rejects it", () => {
  const makeBase = (id: string) => ({
    ...Object.fromEntries(["id", "title", "organization", "provider", "description", "summary", "type", "category", "city", "region", "address", "startDate", "cost", "sourceUrl", "lastChecked", "lastSeen", "status", "equipment", "food", "capacity", "commitment", "registrationUrl", "providerContact", "freeStatusProof", "lastVerified"].map(k => [k, "Synthetic base fact"])),
    id, title: "Synthetic event " + id, description: "Original synthetic body", startDate: "2030-01-02T12:00:00.000Z", cost: "Free to join", status: "active",
    sourceUrl: "https://example.org/event", registrationUrl: "https://example.org/event", lastChecked: now, lastVerified: now,
    categories: [], communityFocus: [], grades: [], language: [], languages: [], accessibility: ["  Original raw note  "], tags: [],
    ageMin: 8, ageMax: 12, ages: { min: 8, max: 12 }, latitude: 43.5, longitude: -79.5,
    virtual: false, volunteerHoursEligible: false, coopEligible: false, trustedSource: true, paidPosition: false,
    sources: [{ label: "Synthetic official source", url: "https://example.org/event" }]
  });
  for (const invalid of [{ schemaVersion: 2, evidence: [] }, { schemaVersion: 1, evidence: [{ status: "provided" }] }]) {
    const raw = [ { ...makeBase("valid"), accessibilitySupport: metadata(evidence()) }, { ...makeBase("bad-extension"), accessibilitySupport: invalid } ];
    const envelope = { schemaVersion: 1, generatedAt: now, count: 2, sourceHealth: { library: { status: "healthy", acceptedListings: 2, minimumAcceptedListings: 1, pageSuccessRatio: 1, minimumPageSuccessRatio: 0.75 } }, opportunities: raw };
    const decoded = decodeLibraryCatalog(envelope, new Date(now));
    assert.equal(decoded.length, 2); assert.deepEqual(decoded.map(r => r.id), ["valid", "bad-extension"]);
    assert.deepEqual(decoded[1].accessibility, raw[1].accessibility);
    assert.equal(decoded[1].description, raw[1].description);
    assert.equal(decoded[1].accessibilitySupport, undefined);
    assert.equal(decoded[1].accessibilitySupportUnavailable, true);
    assert.equal(accessibilitySupportDecision(decoded[1].accessibilitySupport, "sensory-friendly", "activity", now).status, "unknown");
    assert.equal(accessibilitySupportDecision(decoded[0].accessibilitySupport, "sensory-friendly", "activity", now).status, "provided");
    assert.match(accessibilitySupportUnavailableMessage, /Check with the provider/);
    assert.equal(raw[1].accessibilitySupport, invalid, "runtime does not mutate original source proof");
    assert.throws(() => accessibilityExportFields(raw[1]));
    assert.throws(() => accessibilityExportFields(decoded[1]), /runtime fallback/);
    assert.throws(() => decodeLibraryCatalog({ ...envelope, opportunities: [raw[0], { ...raw[1], cost: "Paid" }] }, new Date(now)), "base event validation remains strict");
  }
  assert.deepEqual(readAccessibilitySupport(undefined), {});
});
