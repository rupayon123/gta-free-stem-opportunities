import assert from "node:assert/strict";
import test from "node:test";
import { parseScopedCriteria, scopedPresetHref } from "./criteria";
// A legacy wire fixture, not explorerFilters: importing that module loads the
// full generated catalogue, outside this focused validation's memory scope.
const legacy = { query: "", region: "All", city: "", category: "All", age: "", language: "all", distanceKm: 25, postalCode: "", nearMe: false,
  blackFocused: false, girlsFocused: false, indigenousFocused: false, volunteerHours: false, coop: false, mentorship: false, leadership: false };

test("legacy activity criteria migrate without support inference and remain distinct from the youth guide", () => {
  const source = { ...legacy, age: "16", query: "robotics", volunteerHours: true };
  const parsed = parseScopedCriteria("teen-activities", source);
  assert.equal(parsed.kind, "activity"); assert(parsed.kind === "activity");
  assert.equal(parsed.filters.age, "16"); assert.equal(parsed.filters.volunteerHours, true);
  assert.deepEqual(parsed.support.categories, []); assert.equal(parsed.support.includeOnRequest, false);
  assert.throws(() => parseScopedCriteria("youth-guide", source));
  assert.equal(source.query, "robotics");
});
test("youth criteria preserve independent age and grade and reject unsupported support versions", () => {
  const source = { kind: "youth", pathway: "volunteer", age: "18", grade: "10", region: "York", delivery: "virtual", support: { schemaVersion: 1, categories: ["sign-language"], includeOnRequest: true } };
  const parsed = parseScopedCriteria("youth-guide", source); assert(parsed.kind === "youth");
  assert.equal(parsed.age, "18"); assert.equal(parsed.grade, "10"); assert.equal(parsed.support.includeOnRequest, true);
  assert.throws(() => parseScopedCriteria("youth-guide", { ...source, support: { ...source.support, schemaVersion: 99 } }));
  assert.throws(() => parseScopedCriteria("browse", source));
});
test("local preset links preserve exact scope and disclose no query or support criteria", () => {
  assert.equal(scopedPresetHref({ id: "one", scope: "browse" }), "/opportunities/?preset=one&presetScope=browse");
  assert.equal(scopedPresetHref({ id: "two", scope: "teen-activities" }), "/high-school/?preset=two&presetScope=teen-activities&view=activities");
  assert.equal(scopedPresetHref({ id: "three", scope: "youth-guide" }), "/high-school/?preset=three&presetScope=youth-guide");
});
