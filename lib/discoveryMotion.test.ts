import assert from "node:assert/strict";
import { discoverySpring, stepDiscoverySpring } from "./discoveryMotion";

for (const hz of [30, 60, 120, 240]) {
  const spring = discoverySpring();
  spring.target = 135;
  let frames = 0;
  while (stepDiscoverySpring(spring, 1 / hz) && frames < hz * 3) frames += 1;
  assert(frames < hz * 3, `${hz}Hz spring did not settle`);
  assert.equal(spring.position, 135);
  assert.equal(spring.velocity, 0);
}
const rapid = discoverySpring();
for (let index = 0; index < 10000; index += 1) {
  rapid.target = index % 2 ? -135 : 135;
  stepDiscoverySpring(rapid, index % 5 ? 1 / 60 : 10000);
  assert(Number.isFinite(rapid.position) && Number.isFinite(rapid.velocity));
  assert(Math.abs(rapid.position) < 300);
}
stepDiscoverySpring(rapid, 0, true);
assert.equal(rapid.position, rapid.target);
assert.equal(rapid.velocity, 0);
const independent = discoverySpring(42);
stepDiscoverySpring(rapid, Number.NaN);
assert.deepEqual(independent, { position: 42, velocity: 0, target: 42 });
console.log(JSON.stringify({ hairlineSpring: true, frameRates: [30, 60, 120, 240], rapidRetargets: 10000, longFrameWorkBounded: true, reducedMotionImmediate: true, noGlobalMotionState: true }));
