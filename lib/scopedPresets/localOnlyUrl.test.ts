import assert from "node:assert/strict";
import test from "node:test";
import { stripPrivateSupportParams } from "./localOnlyUrl";
import { scopedPresetHref, parseScopedCriteria } from "./criteria";
import { createScopedPresetRepository, type AtomicPresetStorage } from "./repository";

test("shared URLs contain no support choices; refresh restores a saved preset only from local archive", async () => {
  const criteria = { kind: "youth", pathway: "learning", age: "12", grade: "11", region: "York", delivery: "virtual", support: { schemaVersion: 1, categories: ["sign-language"], includeOnRequest: true } };
  const dirtyUrl = new URL("https://example.org/high-school/?pathway=learning");
  dirtyUrl.searchParams.set("accessSupport", JSON.stringify(criteria.support));
  dirtyUrl.searchParams.set("youthCriteria", JSON.stringify(criteria));
  const clean = stripPrivateSupportParams(dirtyUrl);
  assert.equal(clean.search, "?pathway=learning");
  let raw: string | null = null;
  const storage: AtomicPresetStorage = { read: async () => raw, compareAndSwap: async (_key, expected, next) => { if (raw !== expected) return false; raw = next; return true; } };
  const repository = createScopedPresetRepository(storage, { getItem: () => null }, parseScopedCriteria);
  const saved = await repository.save({ id: "local-preset", name: "My next step", scope: "youth-guide", criteria }, "2026-10-30T12:00:00.000Z");
  assert(saved.ok);
  const href = scopedPresetHref(saved.value.presets[0]);
  const params = new URL(href, clean).searchParams;
  assert.deepEqual([...params.keys()].sort(), ["preset", "presetScope"]);
  assert(!/sign-language|includeOnRequest|categories|support/.test(href));
  const refreshed = await createScopedPresetRepository(storage, { getItem: () => null }, parseScopedCriteria).peek();
  assert(refreshed.ok && refreshed.value);
  assert.deepEqual(refreshed.value.presets.find(p => p.id === params.get("preset"))!.criteria, criteria);
});
