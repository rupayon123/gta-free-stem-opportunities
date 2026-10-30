# Youth hunter: actual-role ingestion plan and audit

Source-only audit on2026-10-30, base01167a14692099509c53fe0b41e8cc9887e7483d.
No application, account, contact, challenge bypass, paid service, crawler run,
compiler, test, build, push, feed generation or publication performed here.

## Problem established in source

1. `scripts/discover-opportunities.ts:276` builds only `needs_review` candidates.
   Generic extraction at437 reads meta/anchor labels, never complete role pages.
   Body is sliced800characters; absent date becomes today's09:00; grades become
   guessed ages; cost type is always FreeToJoin even when evidence is unknown.
2. `lib/data.ts:109` maps candidates into ordinary event models, with inferred
   volunteering flags and generic date/location/support fields.
   `lib/opportunityStatus.ts:79` permits active status only. Keeping these
   review-only candidates private is correct. A status flip would publish guesses.
3. Native `prepare-library-catalog.ts` selects dated STEM core, not the broad
   learning collection. `native-content-rights.ts` permits only accepted TPL/MPL
   event identities. A new directory URL cannot flow through those paths as a
   legitimate dated role, and existing rights must not be silently widened.
4. High School core supports honest roles/unknown costs/no fake dates, but
   `YouthListing` currently has no full description or distinct application URL.
   Nine static records are a first resource/programme slice, not the hunter goal.
5. Existing library RSS collector already preserves original descriptions and
   checks availability/source health; public ordinary events expire/stale after
   bounded checks. Reuse that collection for all kids/teens learning; don't
   replace it or add a STEM-only gate to the youth role stream.

## Concrete bounded first implementation

### A. Provider detail adapters, with complete requirements

Start Aurora Library: one official index + two exact role detail/application
pages, no form submission. Two distinct role leads are captured in
`research/aurora-role-leads-20261030.json`. They are actual tasks with application
routes and requirements; cost remains unknown. Do not count as verified free.

Adapter requirements:

- Allowlist exact HTTPS provider pages, direct provider-linked application URL,
  redirect host check,2MB/page,15secondtimeout,one request at a time,maximum3pages
  this provider per run. No arbitrary traversal, logged-in APIs or scraped forms.
- Parse only the relevant teen-role section and provider-written introduction/
  responsibility/commitment text. Ignore nav/adult roles/form field values,
  personal data, hidden fields, CAPTCHA and submission endpoints entirely.
- Retain unabridged task/eligibility/commitment/cost/selection facts in role detail,
  plus original source/application link and content provenance. Card summaries
  may shorten separately. Preserve source wording or identify factual summary;
  never label a partial/meta excerpt a complete provider body or translation.
- Keep volunteer grade separate from the recipient's age. Unknown volunteer ages
  stay unknown. No grade→age or generic teen→13..18 default. No guaranteed slot
  from an available application; source says ongoing recruitment, not acceptance.
- No unpaid→free conversion. Explicit no-fee evidence can qualify; otherwise
  show a clearly separated cost-unconfirmed lead with no verified-free badge.
  Mandatory screening, transport, equipment and accommodation conditions survive.

Second bounded adapter candidate: Second Harvest named role detail sections and
policy, retaining date precision/year ambiguity and costs. Do not fabricate a
current booked shift from general roster/contact instructions. Prior review note
in GTA outputs already records these gaps; do not duplicate research blindly.

### B. Portable data and approval boundary

Add OPTIONAL `roleDetails` to shared YouthListing (same backward-compatible
schema1): full description/body provenance, responsibilities/requirements,
applicationUrl, applicationInstructions, commitment/schedule wording. Validate
bounds/URLs/date precision; future native models consume the same names.
Exact field list needs root+native-owner review before implementation freezes.
Do not fork three incompatible detail formats or treat current native parsers'
ignored unknown fields as delivered full requirements.

Collector output includes provider ID, stable role key derived from explicit
application identity, source check time, source content fingerprint, parse status
and reviewed evidence facts. Collection and publication are distinct operations.
Provider approval covers the deterministic adapter/profile, not each title.
Recognized valid changed facts may refresh/publish autonomously and every complete
successful fetch can advance checkedAt. Conflicting/ambiguous requirements,
unrecognized markup, new provider or unresolved rights remain private. A failed
fetch never renews evidence or acceptance.

Merge reviewed role records into one versioned youth catalogue with source-health
and revision metadata, separately indexed from directories/resources. Existing
nine records remain preserved, reviewed provider contributions are additive.
Expose concrete unknown-cost/availability leads in a separately labelled section,
not among verified free/open totals. Do not wait for a numeric target to make
useful real-role details available, and do not inflate counts to satisfy it.

### C. Freshness, closure and resilience

- Explicit cancellation/closed/deadline/season rules override stale "apply" text.
  Date-only deadlines retain day precision/Toronto semantics, missing dates stay
  absent, and upcoming does not become open automatically at midnight.
- HTTP200 alone is not healthy. A missing expected role section, challenge page,
  wrong host, incomplete required facts or changed markup rejects that adapter
  snapshot; no output replaces the previous good catalogue on failure.
- Preserve previous bytes/cache on network/parse error, BUT evaluate check age
  against the current clock. Stale records become unknown/held; failure must not
  refresh checkedAt or preserve a live badge forever. Record removal/tombstone
  only after successful complete source coverage, not one failed fetch.
- Dedupe role identities, not just title; Reading and Math have different
  application identities. Directories/linked subdivisions never become six
  fabricated roles. Child beneficiaries are not volunteer eligibility.

### D. All children/teens and accessibility

Keep ordinary free learning/events searchable for children and teens through the
existing broad catalogue, while collecting youth roles separately. Expand known
provider sources through bounded adapters rather than generic keyword claims.
Use reviewed accessibilitySupport contract/overlay after root approval; provider
request policy does not certify every event, branch or applicant's needs. Never
infer disability, exclusion or an accommodation from tags/title/boilerplate.
Unknown evidence must leave useful general browsing available.

### E. Deliver the same actual records on web/iOS/Android

Publish one reviewed youth feed atomically after tests; web hub and native
adapters read the same IDs, full requirements, distinct application links,
revision and freshness. Explicit unavailable/error/cached states; never fake empty
success on a schema error. High School cards/details must display actual records,
not just redirect the user to an aggregator. Root owns release and native/UI
owners own adapter/detail/preset integration. Directories remain supplementary.

## Focused checks before activation

1. Offline provider fixtures: teen section vs adults/nav, exact application URLs,
   grade9–12 vs recipient6–12, complete requirements/commitment, changed markup,
   closed/unknown/future intake and mandatory unknown/positive costs.
2. Snapshot compare: fetch failure preserves bytes, source timestamp not renewed,
   closed/stale records lose active badges, ambiguous evidence needs review,
   duplicates and removed-role semantics. Memory/page/record bounds.
3. Shared14 policy goldens remain unchanged; roleDetails cross-platform roundtrip,
   source/application URL validation, original-body/requirements preservation.
4. One bounded authorized live run, inspect actual collected provider results,
   not fixtures only. Reconcile source snapshots/IDs/counts and verify no form or
   personal data. Unknown fields/costs remain labelled, no guaranteed free count.
5. Root-approved feed generation, byte limits, independent rights/age/source/
   application checks, CI, web browser and actual iOS/Android payload journeys,
   then publication and both-host/native-channel verification. No source-only
   commit is release or physical-device evidence.

## Current state

DONE: source audit, bounded official-source collection of two actual role leads,
optional authored-fact roleDetails, source adapter/feed reconciliation and focused
test SOURCE. See YOUTH_HUNTER_SOURCE_PREPARATION.md for exact boundary.
Focused tests/typechecks and one actual four-GET collector run now passed; see
source-preparation receipt/boundaries. Final corrections passed seven affected
regressions and strict typing. NOT DONE: production activation, root release,
shared native roleDetails consumption,
review/publication, catalogue/UI/native integration or any newly verified free
role. Full-body translations remain independently unqualified (zero coverage).
