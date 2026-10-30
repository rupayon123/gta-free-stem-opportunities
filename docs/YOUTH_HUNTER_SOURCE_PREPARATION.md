# Actual-role hunter preparation — not integrated or published

Base01167a1. New isolated `work/gta-youth-hunter`; no changes to frozen nine
records, legacy review queue, library collector, native content-rights allowlist,
UI/preset/app models, workflow schedules, release or public output files.

## Implemented source

- `lib/highSchool/model.ts`: optional `YouthRoleDetails` for description,
  responsibilities, requirements, commitment, selection, costNotes,
  applicationUrl and applicationInstructions. `contentMode` currently only
  authored-facts; provider-original is deliberately rejected, not presumed
  licensed. Required list/text bounds and safe HTTPS route checks. Existing
  schema1 rows and all14 original goldens unchanged. This is an authored account
  of known facts, not a complete copy/translation of a provider page.
- `scripts/youth-hunter/aurora.ts`: callable bounded collector of FOUR exact
  official public pages (index, two role applications, public FAQ). Sequential
  GET only, redirects/cookies omitted,15s/page,2MB/page header and stream limits,
  text/html only. No form reading beyond provider-written responsibility text,
  no input values/hidden fields, submission/portal/child personal data, account,
  arbitrary crawling, retries or startup I/O. Each complete real fetch supplies
  a new injected checkedAt; failed fetch has no observation timestamp.
- Deterministic provider-specific section/profile validation, volunteer grades
  separate from beneficiary ages, orientation/weekly/ten-session/selection
  limitations, exact distinct application routes. Missing or duplicate sections,
  wrong routes, absent known requirements or unmatched grade context fail.
  Closed source recruitment excludes both roles. New screening/payment/residency
  markers or conflicting grades hold affected facts privately. Source-relevant
  fingerprints ignore input values/nav. No grade→age or fake event dates. The provider asks for only ONE application;
  that claim is emitted only when source wording is present, otherwise both
  roles are held for review without inventing a one-per-programme rule.
- `lib/youthHunter/feed.ts`: separate schema1 youth feed/state. One-time reviewed
  `YouthProviderApproval` covers provider+adapter version+authored-facts mode.
  Valid recognized changed facts update automatically; individual fingerprint
  approval is NOT required for each title/update. Unknown/new provider approval
  absent => private hold. Ambiguous facts => hold; fetch/malformed/duplicate/
  incomplete result preserves exact previous state, no timestamp renewal.
- Confirmed complete disappearance records retirement; an incomplete/failing
  snapshot cannot retire records. Closed, stale, future-evidence, held and
  mandatory-positive-cost rows never gain public free/open status. Unknown costs
  have their own explicit costUnconfirmedLeadIds; verifiedFreeRoleIds remains
  zero for Aurora. This is recruitment, never a guaranteed position.
- `buildPublicYouthFeed(state,now)` validates current freshness. Decoder first
  checks producer counts/classification at generation then uses caller's CURRENT
  clock to suppress stale cached rows. generatedAt retains producer timestamp;
  it never renews row.checkedAt.4MB wire ceiling, max2000 shared records; serializer
  has no writer. Root must approve atomic destination publication/rollback later.
- `lib/youthHunter/hunter.test.ts` plus synthetic JSON fixture: seven test groups
  SOURCE covering facts/routes/grade-child distinction, provider approval versus
  autonomous valid updates, unknown-cost grouping, changed screening/private
  holds, closure, stale/failure preservation, missing/wrong markup/routes,
  duplicate/retirement rules, roleDetails backwards compatibility/provenance,
  wire classifications/current-clock expiry and bounded sequential transport.

## Actual source evidence and limits

Earlier bounded ordinary public reads established two current role/application
routes. Additional ordinary browser FAQ read on2026-10-30 succeeded after web
reader cache miss; it confirms required orientation, weekly ten-week work and
school-grade context, but no affirmative role-cost/screening-fee exemption.
Reading/math role research is factual summary only in separate private research
JSON. No source full HTML/body is copied into public output or fixtures.

Three direct bounded public GETs (index and application pages) succeeded with
~300KB/page and no redirect; source headings match intended parser profiles.
This establishes HTTP reachability ONLY. It is NOT actual TypeScript collector,
parser, test, runtime integration or release proof. No such execution is claimed.

## Done versus remaining

SOURCE PREPARED; initial unrun boundary is superseded by the focused evidence below. No tsx/TypeScript compiler, Node
model tests, app/compiler/emulator or builds ran in this batch. Lightweight JSON,
source review, byte/hash and whitespace checks only. Test fixtures are synthetic;
actual collector proof still required with a bounded resource grant.

Root next gate: review APIs, run focused shared-policy/hunter tests and strict
focused typecheck; then one bounded real collector run and examine source facts,
counts, fingerprints, closure/failure behavior and publication/rollback.
Frontend/iOS/Android owners must consume the same full factual roleDetails and
lead distinction; ignoring new fields isn't delivered native support. Then QA,
UI/error/cache checks, CI and approved publication/host/native verification.
Two leads are an initial path, not completion of coverage; continue affirmative
free/screening-cost source checks. All-kids learning stays on existing broad RSS
path, and reviewed support evidence stays distinct from generic venue/policy text.
Full-body translation qualification remains zero and independent.

## Focused verification update — 2026-10-30

On fresh base58c995d with the1920-record accepted feed preserved: initial29
focused groups passed; narrowed strict hunter/accessibility typechecks passed
within256MiB. After root optional-extension compatibility review, eight affected
accessibility groups passed. Their added two-record fixture exposed a static
type-inference issue; an explicit synthetic description fixes it, but the rerun
was deferred at hostfree25%. First failures are preserved. Actual TypeScript
collector startup encountered a harness module-format error before any GET;
CJS harness prepared, real collector proof still pending. No production export,
commit, push or publication. Slot explicitly released to coordinator/frontend.
Receipts: GTA outputs/youth-hunter-verification-20261030.

### Final source checks and actual collector receipt

Initial29 focused groups passed, including all14 portable policy cases; strict
focused hunter typing passed. After the browser-portability and ONE-application
corrections, seven affected hunter groups and narrowed strict TypeScript check
passed again (attempt7, exit0, zero failures/skips, sampled owned peak190627840B,
minimum host free37%). Byte counting uses TextEncoder, and a no-global-Buffer
regression verifies browser decode/serialization needs no Node polyfill.

The actual four-page collector run in attempt6 succeeded at
2026-10-30T06:34:39.075Z and returned two roles, no unresolved parser review
markers, two explicitly cost-unconfirmed leads and zero verified-free roles in
verification-only classification. Provider registry and endpoint were NOT
activated. That real run preceded the two final small corrections; it is not a
second final-source live replay. Root independently confirmed the one-application
condition, and final-source regressions/strict typing passed without repeating
network requests. No production writer or pipeline schedule is enabled.

Canonical source based on58c995d preserves the1920-record public feed,
SHA256b2c8e2dde6865686f57a2ad2e4eb01700d1e1bf1b783a8ba013e4c17e6e3ac0e,
revision2026-10-30T05:54:55.770Z. No original generated/public feed was modified.
