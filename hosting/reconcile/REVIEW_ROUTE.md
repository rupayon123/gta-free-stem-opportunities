# Optional public Ubuntu reconciliation route — unexecuted source draft

Root workflow review, an explicit dispatch authorization and a coordinator
handoff choosing ONE writer are required. This packet is not execution authority.
Local prep3 remains an alternative; do not run it concurrently with this route.
Prep1/prep2 and the protected app worktree remain untouched. No source here has
been tested or run; there is no workflow commit, branch, dispatch or output yet.

## Free runner and official provenance

The GitHub connector independently confirms the existing repository
`rupayon123/gta-free-stem-opportunities` is public (ID1257775649, default main).
GitHub's current official documentation states standard hosted runners are free
and unlimited for public repositories; standard Ubuntu24.04 x64 has4vCPU/16GB.
Use only `ubuntu-24.04`, no larger/paid/custom/self-hosted runner, new account,
card, credential, service, persistent job, schedule, cache or artifact upload.
Standard job logs/summary are the evidence channel; no artifact storage is used.

- https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/choose-the-runner-for-a-job
- https://docs.github.com/en/billing/concepts/product-billing/github-actions
- Official checkoutv6 ref read via GitHub API: d23441a48e516b6c34aea4fa41551a30e30af803.
- Official setup-nodev6 ref read:249970729cb0ef3589644e2896645e5dc5ba9c38.
- https://api.github.com/repos/actions/checkout/git/ref/tags/v6
- https://api.github.com/repos/actions/setup-node/git/ref/tags/v6

These full action commit IDs are used, not mutable tags. Node major22 is the
existing app requirement, with no persistent package-manager cache. Actual
Node/npm versions and all lockfile-driven install output remain in job logs.
Use existing locked dependencies; `npm ci --ignore-scripts --no-audit --no-fund`
does not run package lifecycle installers. If this cannot support existing QA,
stop for review; never automatically enable installers or change dependencies.
The existing production dependency audit runs separately against the registry.

## Workflow registration and source layout

Manual dispatch requires a workflow registered on the default branch. Reuse the
ALREADY EXISTING `.github/workflows/refresh-opportunities.yml` path on a NEW
operations branch based on the pinned app, replacing that branch's copy only
with this draft workflow. The main/default workflow and its schedule remain
unchanged; the operations version has only workflow_dispatch, no schedules or
push/PR triggers. Registering a wholly new path only on a non-default branch
would not satisfy GitHub's dispatch requirement; do not silently modify main.

- https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow
- https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows

Install source files on that operations branch as `hosting/reconcile/<name>`
with their exact reviewed bytes, including this document. `refresh-opportunities.yml`
maps to `.github/workflows/refresh-opportunities.yml`. Copy the generated
`helpers-manifest.json` to hosting/reconcile too. Before ANY source commit/push,
root must inspect the exact path list and final diffs. No helper is installed in
the Mac app checkout or app PR. After the operations commit exists, root supplies
its actual immutable SHA and independently reviewed manifest SHA as dispatch
inputs; the workflow requires GITHUB_SHA equal that exact expected operations SHA.

Checkout operations into `ops/` and immutable app9f83e87e4447b805373ff9f7f206adb737e5c413
into `app-source/`, with credential persistence disabled in both. Helpers remain
outside the app candidate. A temporary exact overlay helper is copied only into
the VM candidate/scripts and removed after verifying its hash. Never stage it.

The Oct31 proposal re-pins preparation to fresh main and adds the approved
diagnostic verifier103ec14c... while retaining the exact overlayf804c788... .
Historical prep2 hashes describe prior evidence only. The current sources pin fresh
maineba9d4aa569f9c89178d698d4cf37f35226a500b and the exact generated3blob IDs. The
operations manifest pins all helper sources AND this workflow and is independently
SHA256-pinned at dispatch. verify-helpers checks every exact path/hash before
application code runs and immediately before the only credentialed write phase.

## One VM pipeline, first failure stops

1. Verify repository/public-event/immutable operations pin and all helper hashes.
2. Guard one ordinary Git preparation: current main and draft refs must match
   immutable reviewed pins; stream fresh3/app-youth3 baselines, no-checkout worktree
   registration, standalone restore, ordinary merge, resolve only generated3 to
   fresh main, preserve all existing checked invariants and honor configured hooks.
3. Confirm main since merge-base changed EXACTLY the reviewed generated3 files.
   Any other change stops. No global ours strategy or unreviewed conflict resolution.
4. Install only existing lockfile dependencies on the VM, with lifecycle scripts
   disabled, then existing production dependency audit. Git/NPM registry traffic
   is allowed only in these explicit infrastructure phases, never a provider fetch.
5. Overlay the approved mapper OFFLINE. Preserve every non-proof master field,
   order, full body, raw note, source clock and health suffix. Preserve ALL unrelated
   proof, including other provider policies and event/venue negatives. Replace
   only the owned exact TPL URL/provider-policy/approved-three-category tuple;
   policy check remains2026-10-30T06:51:08.000Z.
6. Run direct library partition and compact source export against fresh-main
   native predecessor; changed semantic proof may assign a new local revision,
   source capture/lastChecked/lastSeen/lastVerified never renewed. Full real-native
   postproof compares ALL envelope/row fields except proof and publicationRevision.
   No health exclusion: a mismatch stops for review. Native proof must equal the
   reviewed overlaid master. Keep10,000,000-byte/4,999-record limits; derive counts.
7. Run affected exporter selftest and the existing `npm run qa` on the VM. Node
   HTTP/fetch is blocked by a pinned preload in these offline phases. No generator,
   discovery, youth refresh, legal production GET, build, browser or translation
   model is invoked. Test fixtures can replace fetch with their own in-memory mocks.
   This is a Node HTTP/source allowlist boundary, not a VM-wide egress firewall.
8. Recheck real postproof, helper pins, source parents, changed/staged paths subset
   exact generated3, no untracked output/helper contamination, and unchanged data
   hashes through QA. Record the actual staged tree and all stage exit statuses.
9. Final separate guarded helper requires accepted resource receipt, full proof,
   stage success, exact hashes/tree and fresh live main/draft pins. It uploads only
   the exact3verified Git blobs, creates a tree based on app and checks that its SHA
   equals the ACTUAL verified ordinary-merge tree. Create a Git commit with parents
   [APP,MAIN]. No local/app-source commit or app-branch update.
10. Recheck live main/draft once more, then POST exactly one NEW ref:
    refs/heads/codex/reconciled-data-<GitHubRunID>-<RunAttempt>.
    POST /git/refs fails if it exists. No PATCH/update_ref, force push or mutable
    branch input exists. No main/draft/operations ref is changed. Output the immutable
    candidate SHA, actual tree/parents and standard job log proofs for root review.

Git blobs API supports up to100MB; this draft also bounds generated blobs at60MB.
It does not truncate an oversized record: stop rather than upload a partial feed.
https://docs.github.com/en/rest/git/blobs#create-a-blob

## Credential and publication boundaries

GitHub permissions are JOB-level, not step-level or one-branch-scoped. This
single-job design needs contents:write for the final create-ref API, so that
capability is technically job-wide; do not claim a server-enforced branch-only
token. No other permission is granted. The only workflow secret reference is the
built-in ephemeral github.token, exposed to a shell only for the final helper as
RECONCILE_WRITE_TOKEN. App/QA checks reject GITHUB_TOKEN/GH_TOKEN/write-token env,
checkout stores no credentials, and token use has fixed GitHub API endpoints,
no redirect following, no secret/header/environment printing or provider contact.
No new CI secret, account key, paid API, card or cross-repository access is needed.

- https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax
- https://docs.github.com/en/actions/tutorials/authenticate-with-github_token

Intermediate Git objects can be orphaned if later checks fail; no ref is created
before all proofs and live-pin checks. If the final API response or guard is
interrupted, do not retry automatically or assume no branch exists: inspect the
single deterministic run-specific ref read-only. No existing branch can be
overwritten by the helper. Its new ref remains REVIEW ONLY, not public activation.

Main-pin read immediately before a new candidate ref is a snapshot, not an atomic
multi-ref CAS guarantee. If main advances after it, candidate review must detect
that before production. Root must later review exact commit files/log evidence,
run an immutable-candidate preview and visual/native gates, then use a separately
reviewed expected-base/merge-queue mechanism before any production change. This
workflow contains no PR creation/merge, deployment, preview dispatch or release.

## VM resource guard and mutual exclusion

Proposed resource class is remote exclusive verification: total owned RSS<=4GiB,
Linux VM MemAvailable strictly>35% fresh/ongoing,1200seconds for reconciliation+
install+offlineproofs+existingQA, then300seconds for final branch-output helper;
job hard timeout30minutes. These are PROPOSED, not measured passing evidence.
Guard monitors itself/descendants, records actual peak/free/exit/original stop
reason separately from cleanup errors, kills its owned process group, verifies
owned0 and prints terminal JSON. Any breach/error/remaining process invalidates
acceptance; first stage failure stops the pipeline, no auto retry or cap bump.
No upload-artifact/cache services are used; job stdout and summary hold receipts.

Workflow concurrency queues only this remote route. It cannot technically lock
the Mac, so coordinator MUST hold local prep3/any alternative writer before
explicit dispatch. Neither route should start merely because the other is slow.
No Mac Node install, data copy, build or new collector runs in this proposal.
All three app-surface translations and iOS TestFlight gates remain separate and
incomplete; a successful candidate workflow would not establish their completion.

## V2 source preflight corrections, not executed

A fresh runner is not assumed to have a committer identity. Before preparation,
set explicit github-actions[bot] name and its public bot noreply email in ONLY
app-source's local Git config. Its detached candidate worktree shares that
VM-only repository config, allowing an ordinary no-commit merge without relying
on runner defaults. No global/system or Mac Git identity is readjusted.

All offline Node/export/QA commands explicitly receive
GTA_PUBLIC_OPPORTUNITIES_EXPORT=candidate/public/opportunities.json. An inherited
export override cannot target another checkout. No stage, proof exclusion,
credential boundary, data clock, runner limit or output branch rule changes.

Operations handoff remains a separate bounded connected-GitHub write proposal:
small text blobs/tree/commit only; final atomic new-branch creation after reviewing
exact diff/tree/parents and checking refs. No Mac checkout/Node/dependency copy,
large app-data Git blobs, main/draft mutation or dispatch is included. See the
exact ops-handoff-plan.json and path inventory; root and fresh coordinator LIGHT
clearance are required before that separate handoff. Source preparation is not
permission to create those Git objects or the branch.

## Oct31 fresh-baseline and diagnostic proposal: source only

Main advanced by a scheduled data-only refresh to eba9d4aa569f9c89178d698d4cf37f35226a500b.
The three fresh Git blobs are discovery8a623ffcc787d70cee9d6196d348bf6d1a0fa34d,
masterbd7a877d460433f411003120b35e7695ffa7f421 and nativee58921934b5246b32f1c6edcfdf86f18b529ee7e.
Root independently verified these identities; recheck actual main before any
future source write/dispatch. No old e09 local candidate/output is reused.

Prior run41081510614 remains a FAILURE: it exported locally then strict native
base equality failed before QA/output. New diagnostic logs bounded paths and
separate catalogue identity/order/hash/count summaries before the SAME assertion.
It does not exclude health, bodies or dates or accept the previous failure.
Pure diagnostic fixtures are reviewed SOURCE ONLY and have not been executed.

This proposal retains the same standard public Ubuntu4GiB/>35% VM guard and
all source-proof/credential/new-output-branch boundaries. App remains9f83; the
next runtime must establish new exact native count/body/capture/health baseline
from pinned fresh main, not assume previous1920/7789/proof totals. Main, draft
and current ops branch are not changed by this source packet. Ops correction,
fixture execution and one new workflow run each require root/coordinator review.
