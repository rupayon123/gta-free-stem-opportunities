# Accessibility support proposal — source only, not released

Base `01167a14692099509c53fe0b41e8cc9887e7483d`. Backend worktree
`work/gta-accessibility-contract`; frontend UI/preset serialization and reviewed
provider overlay remain frontend-owned AFTER root reviews this contract.
No provider records or evidence are created by this patch. No diagnosis, medical
profile, child's needs or inferred identity is collected. This is listing data.

## Shared additive field

`accessibilitySupport?: { schemaVersion: 1; evidence: AccessibilitySupportEvidence[] }`
is optional on `Opportunity`. Runtime validator/reference decisions live in
`lib/accessibilitySupport.ts`, portable shape in
`schemas/accessibility-support-v1.schema.json`.

Each evidence record requires exactly:

- `category`: mobility-wheelchair, sensory-friendly, adapted-inclusive-programme,
  sign-language, hearing-captioning, visual-formats, or support-person.
- `status`: provided, on-request, not-available, or unknown. On-request means a
  provider offers a request route, not that an accommodation is guaranteed.
- `scope`: venue, activity, or provider-policy. Accessible building evidence never proves adapted
  teaching, a sensory-friendly session, ASL, or every activity in the building.
- Optional `conditions`: up to12 concise provider-backed constraints (notice,
  booking, age/branch exceptions), each <=500 UTF16 units. Optional `requestUrl`
  preserves the provider's public HTTPS request/information route; never submits.
- `venue`: exact reviewed stable ID and name, required for venue scope and absent
  otherwise. A filter must supply the matching venue ID; no fuzzy branch/title
  matching or provider-wide propagation. Frontend owns the reviewed mapping.
- `sourceUrl`: direct public HTTPS provider source, no credentials/local/IP host.
- `evidenceText`: short provider wording (1..600 UTF16 units, not an AI summary).
- `checkedAt`: actual source check UTC instant with milliseconds, not the event
  date or an automatically refreshed import timestamp.
- `reviewStatus`: approved or hold. Shape validation alone cannot establish a
  true claim. A reviewer must verify provider authority, exact scope and wording.

Missing field, missing category/scope, empty evidence, hold, outdated/future
checks and conflicting approved statements resolve to unknown. Reference
freshness is30days inclusive, configurable up to90 with injected `now`; any
outdated approved evidence for the same category/scope requires review rather
than automatic newest-wins resolution. Retire/correct superseded evidence through
review. Different category/scope records remain separate. A provider-policy entry describes the request policy only, never a guaranteed
event service. Request deadlines/limitations must remain visible. Every positive result
must allow inspection of exact source/evidence/check time and its limitations.

Provider wording about an inclusive/adapted programme is valid listing evidence
when reviewed; this never authorizes storing a participant's health information.
"Inclusive", family/caregiver terms, "online", transit nearby, a library address,
a generic accommodation invitation, title/tags, boilerplate, or machine inference
must never automatically create a support category/status. Provider source
wording still needs manual contextual interpretation (including whether a
programme welcomes a support person, and any request/booking deadline).

## Backward-compatible export patch

`accessibilityExportFields` clones existing raw `accessibility` strings exactly,
including whitespace/line breaks/duplicates. It does not infer structured proof.
Absence of structured metadata remains omission; no fake unknown evidence object
or runtime success claim is created. Structured data, when supplied later, must
pass validation before native or browser catalogue serialization.

- Legacy public native export now maps raw accessibility notes plus optional
  structured metadata without altering IDs, descriptions, ages, costs, source
  rights, catalogue membership or publication revision rules.
- Expanded browser catalogue retains raw notes and optional evidence; decoder
  isolates invalid/unsupported optional proof through readAccessibilitySupport:
  only that extension becomes absent/unknown plus runtime-only
  accessibilitySupportUnavailable=true. Base event/IDs/counts/raw notes remain.
  Consumers show accessibilitySupportUnavailableMessage (localized where possible).
  Base event validation remains strict. Publishers/export stay strict and reject
  invalid proof AND runtime fallback markers, retaining the previous good output.
- Existing native readers may ignore new unknown fields. iOS and Android still
  require explicit model, detail, filter, preset, validation and user-journey work.
- High School's separate curated records need a separately reviewed additive
  bridge/overlay; this patch does not change their nine-record source bundle.
- No public JSON regeneration was run. Existing accepted files/revision remain
  untouched. After approval, native feed export/size/count/description/rights and
  compatibility checks must pass on newly generated bytes before merge/release.
  Old committed feed/source verification is expected to detect the new notes.

The portable JSON Schema describes shape; authoritative runtime checks also
apply URL host restrictions, exact canonical date validity, nonblank ECMAScript
text and UTF16 length limits (generic schema engines may count codepoints).
No external schema library/dependency is added.

## Done versus remaining

Prepared: versioned contract, runtime validator/reference semantics, optional
Opportunity field, raw-note + structured export mapping, decoder guard, and eight
focused test groups (passed in the bounded host batch). Synthetic tests cover seven categories/four statuses/
three scopes, hold/conflict/time boundaries, provider policy/request conditions and exact branch matching, raw-note preservation, malformed
or sensitive extensions, additive native publication and schema consistency.

UNVERIFIED: full integrated production typecheck/build, export production bytes/10MB limit,
current provider evidence, all UI/preset/search behavior, iOS/Android adapters,
physical/device journeys, CI and publication. No compiler/build/test/push was
started during initial source preparation; subsequent focused evidence follows. Do not count this as shipped accessibility filtering.
Full-description translation qualification remains zero and is independent.

After root review, coordinate exact field/category/status names with frontend
chat before UI and preset implementation. Filters must state whether they include
on-request support, restrict positive matches to requested category AND scope,
retain useful browsing when no evidence matches, and explain unknown plainly.
A stale preference or empty dataset cannot imply an opportunity is inaccessible
or that a participant is unsuitable. Do not claim "fully accessible".

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

### Final affected-check result

The corrected two-record fixture and all eight accessibility groups passed in
attempt6 (exit0, no failures/skips). Narrowed strict TypeScript check passed with
Node22 ambient types/ES2022 (exit0). Peak total owned RSS185810944bytes, minimum
host free52%; no app build, production export or public data write. The broader
export/generator build and actual UI/native journeys remain separate gates.
Runtime isolates malformed/unsupported optional proof while publishers remain
strict; all valid base event/raw note/ID/count checks are retained.
