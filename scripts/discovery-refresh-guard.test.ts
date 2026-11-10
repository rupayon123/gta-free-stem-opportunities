import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runGuardedDiscovery } from "./discovery-refresh-guard";

const dir = mkdtempSync(join(tmpdir(), "gta-discovery-guard-"));
try {
  const path = join(dir, "review.ts");
  writeFileSync(path, "previous source clocks\n");
  assert.equal(runGuardedDiscovery(path, () => { writeFileSync(path, "partial"); return false; }), false);
  assert.equal(readFileSync(path, "utf8"), "previous source clocks\n");
  assert.equal(runGuardedDiscovery(path, () => { throw new Error("unavailable"); }), false);
  assert.equal(readFileSync(path, "utf8"), "previous source clocks\n");
  assert.equal(runGuardedDiscovery(path, () => { writeFileSync(path, "healthy new review queue\n"); return true; }), true);
  assert.equal(readFileSync(path, "utf8"), "healthy new review queue\n");
  assert.throws(() => runGuardedDiscovery(join(dir, "missing"), () => false));
} finally { rmSync(dir, { recursive: true, force: true }); }
console.log("Discovery failures retain exact review bytes without blocking independent feeds.");
