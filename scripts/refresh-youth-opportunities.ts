import { realpathSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { collectAuroraRoles } from "./youth-hunter/aurora";
import { youthProviderApproval } from "./youth-hunter/providers";
import { candidateDirectory, prepareYouthCandidate, promoteYouthCandidate, readAcceptedYouthSnapshot, readYouthCandidate, verifyAcceptedYouthSnapshot } from "./youth-hunter/candidate";
import { decodePublicYouthFeed, emptyYouthHunterState, reconcileYouthSource, type YouthHunterState } from "../lib/youthHunter/feed";

export interface YouthRefreshResult {
  status: "candidate" | "refreshed" | "preserved";
  candidate?: string;
  generation: string;
  publicRoles: number;
  currentPublicRoles: number;
  verifiedFreeRoles: number;
  costUnconfirmedLeads: number;
  promoted: boolean;
  warning?: string;
}
/** Import-safe entry point. Default candidate-only never writes public output.
 * Auxiliary provider failure cannot block healthy library updates when a valid
 * historical youth snapshot exists; preserve every accepted byte/check time. */
export async function refreshYouthOpportunities(options: {
  root: string; candidateRoot?: string; now: () => string; fetcher?: typeof fetch;
  promote?: boolean; allowPromotion?: boolean
}): Promise<YouthRefreshResult> {
  if (options.promote && !options.allowPromotion) throw new Error("Canonical youth promotion requires the explicit accepted CI path");
  // Missing is allowed only for successful bootstrap; partial/corrupt is fatal.
  const accepted = readAcceptedYouthSnapshot(options.root);
  let reconciledState: YouthHunterState;
  let checkedAt: string;
  try {
    const approval = youthProviderApproval(options.now());
    const result = await collectAuroraRoles({ now: options.now, fetcher: options.fetcher });
    if (!result.ok) throw new Error(result.error);
    if (result.observation.reviewRequiredIds.length) throw new Error("Ambiguous or changed requirements need review; previous public facts are not renewed");
    const reconciled = reconcileYouthSource(accepted?.state ?? emptyYouthHunterState(), result, approval);
    if (!reconciled.accepted) throw new Error(reconciled.warning ?? "Youth snapshot rejected");
    reconciledState = reconciled.state; checkedAt = result.observation.checkedAt;
  } catch (error) {
    if (!options.promote || !accepted) throw new Error(`Youth collection failed; accepted bytes/check times retained: ${error instanceof Error ? error.message : "unknown error"}`);
    const historical = decodePublicYouthFeed(accepted.feedRaw, accepted.manifest.generatedAt);
    const current = decodePublicYouthFeed(accepted.feedRaw, options.now());
    return { status: "preserved", generation: accepted.manifest.generation, publicRoles: historical.count,
      currentPublicRoles: current.count, verifiedFreeRoles: historical.verifiedFreeRoleIds.length,
      costUnconfirmedLeads: historical.costUnconfirmedLeadIds.length, promoted: false,
      warning: `Auxiliary youth source unavailable or needs review; exact accepted bytes/check times preserved: ${error instanceof Error ? error.message : "unknown error"}` };
  }
  const candidate = prepareYouthCandidate(reconciledState, checkedAt, options.candidateRoot ?? candidateDirectory(options.root));
  const prepared = readYouthCandidate(candidate);
  const feed = decodePublicYouthFeed(prepared.feedRaw, prepared.manifest.generatedAt);
  if (options.promote) promoteYouthCandidate(options.root, candidate, accepted?.manifest.generation, { allowPromotion: true });
  return { status: options.promote ? "refreshed" : "candidate", candidate, generation: prepared.manifest.generation,
    publicRoles: feed.count, currentPublicRoles: feed.count, verifiedFreeRoles: feed.verifiedFreeRoleIds.length,
    costUnconfirmedLeads: feed.costUnconfirmedLeadIds.length, promoted: options.promote === true };
}
/** Explicit operator import of an already reviewed immutable candidate: no GET,
 * fake CI environment, registry mutation or automatic approval daemon. */
export function importReviewedYouthCandidate(options: {
  root: string; candidate: string; expectedGeneration: string; currentGeneration: string | "none"
}) {
  if (!/^[a-f0-9]{64}$/.test(options.expectedGeneration) || (options.currentGeneration !== "none" && !/^[a-f0-9]{64}$/.test(options.currentGeneration))) throw new Error("Explicit expected and current generations are required");
  const candidate = readYouthCandidate(options.candidate);
  if (candidate.manifest.generation !== options.expectedGeneration) throw new Error("Reviewed candidate generation mismatch");
  const current = readAcceptedYouthSnapshot(options.root);
  const expectedCurrent = options.currentGeneration === "none" ? undefined : options.currentGeneration;
  if (current?.manifest.generation !== expectedCurrent) throw new Error("Accepted youth generation differs from reviewed import expectation");
  return promoteYouthCandidate(options.root, options.candidate, expectedCurrent, { allowPromotion: true, expectedCandidateGeneration: options.expectedGeneration });
}
function authorizedCI(root: string): boolean {
  return process.env.GITHUB_ACTIONS === "true" && process.env.RUNNER_ENVIRONMENT === "github-hosted" &&
    process.env.GITHUB_REF_TYPE === "branch" && !!process.env.GITHUB_WORKSPACE && realpathSync(process.env.GITHUB_WORKSPACE) === realpathSync(root);
}
async function main() {
  const argv = process.argv.slice(2);
  const root = resolve(process.cwd());
  if (argv[0] === "--import-reviewed-candidate") {
    if (argv.length !== 6 || argv[2] !== "--expected-generation" || argv[4] !== "--current-generation") throw new Error("Use --import-reviewed-candidate PATH --expected-generation SHA256 --current-generation SHA256|none");
    const imported = importReviewedYouthCandidate({ root, candidate: resolve(argv[1]), expectedGeneration: argv[3], currentGeneration: argv[5] });
    console.log(JSON.stringify({ reviewedYouthCandidateImported: true, generation: imported.manifest.generation })); return;
  }
  const args = new Set(argv);
  const allowed = new Set(["--candidate-only", "--refresh", "--verify"]);
  if ([...args].some(a => !allowed.has(a)) || args.size > 1) throw new Error("Use exactly one of --candidate-only (default), --refresh (accepted CI only), or --verify");
  if (args.has("--verify")) {
    const s = verifyAcceptedYouthSnapshot(root);
    console.log(JSON.stringify({ verifiedYouthPair: true, generation: s.manifest.generation })); return;
  }
  const promote = args.has("--refresh");
  const result = await refreshYouthOpportunities({ root, now: () => new Date().toISOString(), promote,
    allowPromotion: promote && authorizedCI(root) });
  if (result.status === "preserved") console.warn(result.warning);
  console.log(JSON.stringify({ youthCandidatePrepared: result.status !== "preserved", ...result }));
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error instanceof Error ? error.message : "Youth refresh failed"); process.exitCode = 1; });
}
