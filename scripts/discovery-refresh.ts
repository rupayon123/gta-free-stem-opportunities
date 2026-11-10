import { spawnSync } from "node:child_process";
import { runGuardedDiscovery } from "./discovery-refresh-guard";

const succeeded = runGuardedDiscovery("lib/generatedDiscoveryReview.ts", () => {
  const result = spawnSync(process.execPath, ["--import", "tsx", "scripts/discover-opportunities.ts", "--summary", "--write-review"], { stdio: "inherit" });
  return !result.error && result.status === 0;
});
if (!succeeded) console.warn("::warning::Discovery refresh failed; prior review queue and source-check times retained. Library and youth health checks remain independent.");
