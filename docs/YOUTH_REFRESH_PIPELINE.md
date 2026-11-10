# Youth refresh entry point and loader — locally verified bootstrap

Based on accepted local hunter8c750e06, layered after foundation3a1dd1d on58c995d.
The 1920-record legacy public feed and revision remain byte-identical. Focused
checks, final candidate collection, root review and an offline local bootstrap
have completed. The three youth files exist in this review workspace only. No
remote publication, consumer activation, app build or release is claimed.

## One approved provider, one existing refresh schedule

Internal registry `scripts/youth-hunter/providers.ts` uses the actual2026-10-30
06:34:39.075Z public-source review as initial approval time. This is operator
review of authored factual data, not provider/human certification, school credit,
fee guarantee or confirmed placement. Registry/provider adapter version approval
is separate from routine deterministic fact validation; recognized successful
fetches refresh check time, failures do not. Current two roles have unknown costs.

CLI `scripts/refresh-youth-opportunities.ts` defaults to candidate-only, four
allowlisted sequential GETs, no application/portal/account activity. Modes:

- `npm run youth:candidate`: creates a validated immutable candidate generation
  under ignored `tmp/youth-hunter-candidates`; does not create a public endpoint.
- `npm run youth:refresh`: explicit promotion allowed only in the existing
  disposable GitHub-hosted branch workspace. Source code prepares this path;
  the scheduled CI path has not been executed here.
- `npm run youth:import-reviewed -- PATH --expected-generation SHA256 --current-generation SHA256|none`:
  explicit local import of a reviewed immutable candidate, with no new network or
  fake CI environment. Candidate/current generations are pinned and rechecked at
  promotion; older/conflicting timestamps cannot restore retired source facts.
  This command must only be applied to the exact candidate root reviewed.
- `npm run verify:youth-feed`: strict verification of state/feed/manifest hashes,
  matching IDs/classification/facts and byte/date bounds. Missing endpoint is an
  error, never a fake loaded empty dataset.

Existing `engine:refresh` includes youth refresh before QA; existing6hourworkflow
is reused without a new cron, Codex automation, service, account or API key.
`publish-refreshed-opportunities.sh` stages the old3 plus new3 generated files
only, verifies the paired youth snapshot BEFORE staging/commit, and regenerates
on the existing bounded concurrent-branch retry path. New untracked youth outputs
are detected during bootstrap rather than treated as no change. No force push
or local-working-copy reset is added. All existing library/rights gates remain.

## Candidate and publication boundary

Immutable candidate directory contains state/feed/manifest, validated BEFORE
accepted writes. State carries roles, fingerprints, retired IDs and optional
lastSuccessfulCheck. That monotonic timestamp prevents older completed snapshots
from reviving retired roles, even when no previous active rows remain. No dates
are invented for ongoing roles; future/old checks are not silently renewed.

Accepted paths are `data/youth-hunter-state.json`,
`public/youth-opportunities.json`, `data/youth-hunter-manifest.json`.
4MB/file bound, max2000 shared records, bounded reads, source timestamp checks,
unique IDs and matching hashes/classifications. All3 absent means uninitialized;
partial presence is corruption requiring attention, never automatic empty reset.

A generation directory rename is atomic for CANDIDATE creation. Canonical files
span directories, so they are NOT claimed to be one atomic OS write. Promotion
stages all temp files, takes an exclusive short-lived lock, compares accepted
generation, replaces and verifies; ordinary failures restore exact old bytes or
remove only newly created files. No durable journal/recovery framework. An
interrupted ephemeral CI working tree fails paired verification and cannot cross
Git's atomic public commit boundary; a fresh checkout begins with accepted bytes.
Unrelated files are neither reset nor rewritten. Fetch/parse/reconcile failure occurs before candidate/promotion. In scheduled
CI mode, a valid accepted3file pair is preserved byte-for-byte and the CLI returns
status=preserved with warning; ordinary library refresh/QA may continue. Missing
bootstrap or partial/corrupt accepted pair still fails closed with no fake empty
endpoint. Candidate-only failures still fail. Ambiguous changed requirements
preserve previous accepted facts without refreshing their clock, rather than
replacing them with a fabricated zero. Valid historical pair verification uses
manifest.generatedAt; current runtime reclassifies stale evidence independently.
Only a complete validated closure/removal may legitimately produce zero roles.

## Browser-safe default loader

`lib/youthHunter/client.ts` exports DEFAULT_YOUTH_FEED_URL and
createYouthFeedLoader({now,fetcher?,endpoint?}). Store APIs: subscribe,
getSnapshot, getServerSnapshot, async load({enabled,signal}), dispose.
getSnapshot/getServerSnapshot ALWAYS return the identical cached object until a
real state transition. Clock evaluation/decode/arrays never happen in getters;
SSR snapshot is stable disabled, no autoload. Input load returns no payload for
an older await to apply over a newer request. Generation+abort guards publication.

Snapshots are disabled, loading, ready{feed,source:network}, stale{feed}, or
error{reason,cached?}; reason is network/invalid/timeout/cancelled. Last-good RAW
session cache only, reevaluated at explicit load's current injected clock.
No IDB/localStorage/account/background polling or static-nine fallback. A bad/
missing endpoint reports error, never successful empty. Valid stale feed keeps
producer/source timestamps and exposes only currently valid rows. Oversized or
malformed responses retain last-good raw bytes; no stale match resurrection.
Same-origin path, omitted credentials, redirects rejected,15s timeout, streaming
4MB guard before parsing. External abort listeners/timers removed on terminal;
UI subscriptions remain until unsubscribe/dispose. No new dependency/polyfill.

## Verification and local bootstrap status

Evidence is retained under the parent workspace's
`outputs/youth-refresh-verification-20261030/` directory.

- Initial combined test attempt produced 11 raw passes (four loader and seven
  hunter groups), then exceeded the 256 MiB total process budget before writer
  execution. Its failed guard receipt is preserved; it is not a completed or
  budget-passing combined run.
- A separately granted direct-process writer run passed all nine groups. A
  separately granted empty-envelope freshness regression passed its one group.
- Focused strict no-emit TypeScript checking passed for 13 explicit roots. The
  resolved closure contains exactly those local files and standard TypeScript,
  Node and undici declarations. Source hashes remained unchanged.
- The disposable publication suite passed all 14 actual tests: 12 baseline plus
  two added pair-gate/bootstrap regressions. An earlier expected count of 15 was
  incorrect; its raw expected-count mismatch remains in the receipt. Fixtures
  use temporary local repositories and mocked npm, with no GitHub publication.
- Final candidate-only CLI collection made exactly four sequential approved
  Aurora GET requests, all returning 200. It produced two real role leads with
  unknown costs and zero verified-free roles. The complete role facts and
  manifest were reviewed before the separately granted offline import.
- Offline reviewed import pinned both the exact candidate generation and absent
  prior generation (`none`). It made no network requests. All three local files
  match the immutable candidate byte-for-byte; schema, state/feed roles, hashes,
  generation and source check times agree. All 13 checked source hashes and all
  three legacy generated files remained unchanged. Every granted run ended with
  a terminal process check and release; no automatic next stage was run.

Reviewed local generation:
`e63c8e8ce269b9001e861fc859faaa7d94bd87a514797f060965475378a2e29f`

Source check and generation time: `2026-10-30T07:29:39.783Z`.

- State SHA256: `46f2a1b00a3eeb75a6f93518dc70a98d039ef2ea09a1a0260df784673d72c9c2`
- Feed SHA256: `8c91601ef70a864b183cbfc8ab888a0b05f83f7234573ed614e3ac8295be4011`
- Manifest SHA256: `bc7bca6b6283050311434f6abf3e49970cbdda03c8bcea616569228263cae0fb`

Both roles retain grades 9–12, required orientation, a mutually suitable weekly
meeting, the instruction to submit only one application, ten planned one-hour
sessions, no guaranteed selection and unconfirmed participation/screening costs.
Planned commitment is not completed volunteer time or confirmed school credit.

Remaining delivery steps are final source/diff review, explicit source commit
and publication sequencing, consumer integration and separate web/native
verification. Full-description translation qualification remains zero; the
translation trial resumes after actual iOS TestFlight update availability under
the user's requested sequence. Local bootstrap is not public activation.
