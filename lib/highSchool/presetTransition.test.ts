import assert from "node:assert/strict";
import test from "node:test";
import { guardYouthPresetTransition } from "./presetTransition";

test("preset switching keeps draft, criteria and selection until confirmation; cancel and busy do not apply", async () => {
  const tuple = { pathway: "learning", age: "12", grade: "11", selectedId: "new-preset" };
  const original = { pathway: "volunteer", age: "16", grade: "9", selectedId: "old-preset" };
  let current = original; let applications = 0; let answer: ((ok: boolean) => void) | undefined;
  const confirm = () => new Promise<boolean>(resolve => { answer = resolve; });
  const apply = (value: typeof original) => { current = value; applications++; };
  const cancelled = guardYouthPresetTransition(tuple, { busy: false, dirty: true }, confirm, apply);
  assert.equal(current, original); assert.equal(applications, 0); answer!(false);
  assert.equal(await cancelled, false); assert.equal(current, original); assert.equal(applications, 0);
  const accepted = guardYouthPresetTransition(tuple, { busy: false, dirty: true }, confirm, apply);
  assert.equal(current, original); answer!(true);
  assert.equal(await accepted, true); assert.equal(current, tuple); assert.equal(applications, 1);
  assert.equal(await guardYouthPresetTransition(original, { busy: true, dirty: true }, confirm, apply), false);
  assert.equal(current, tuple); assert.equal(applications, 1);
});
