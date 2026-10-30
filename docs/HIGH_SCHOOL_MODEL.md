# High School model preparation

This dependency-free model is separate from the dated opportunity feed. It is not
imported by the app, collector, exporter, route, or release process. No reviewed
provider content is shipped in this patch. The JSON fixtures are synthetic.

## Curated listing contract

`lib/highSchool/model.ts` validates version 1 records and evaluates them using an
explicit clock. Curation must retain provider audience, cost, availability and
hours wording. `reviewStatus: approved` represents a content-review decision; it
does not grant a reuse licence or school approval. UI integration must consume
the derived decisions, not reinterpret keywords.

- Kind and pathway are explicit. A workshop run by volunteers remains an event.
- Audience context is explicitly curated, never inferred by this model. Exact
  provider ages, grades, residency and other restrictions remain independent.
  Grade-only eligibility never creates an age. A grade-12 student aged 18 can be
  included; adult-only mentoring and child-parent workshops are excluded.
- `teenHub` means reviewed audience relevance. It **does not mean** a currently
  open, verified-free opportunity. Use `verifiedFreeRoles` or
  `verifiedFreePrograms` for those sections. Directories use `directorySection`,
  carry no free/open badge or application CTA, and count as zero open roles.
- Required costs override optimistic no-fee wording. Unknown mandatory amounts
  stay unknown. Bursaries and unpaid status do not establish no mandatory cost.
- Effective availability respects explicit closure, conflicts, application
  intervals, season expiry and evidence age. Closing instants are exclusive;
  an open record is usable at its opening instant. An `upcoming` record becomes
  unknown after its opening date until current intake is confirmed. Evidence
  expires after 30 days by default; explicit policy may shorten this or extend
  it to at most 90 days. No date is invented.
- Date/time strings require an explicit offset. Season dates are calendar dates
  interpreted against the Toronto day. `statusLabel` is an English reference
  label; clients should localize the effective status and date explicitly.
- A Strides staging-page lead must remain held. CVC's expired summer-2026 season
  cannot become an open 2027 intake. A conflicting Whitby page cannot get Apply.
- Provider-stated minutes are descriptive. `schoolApproved` is always false and
  `autoCredit` always zero. This module never awards recorded minutes.
- This slice has no map projection: `mapPin` is false for every kind. A later
  reviewed mapping contract is required before adding real role venue pins.
- Source links require HTTPS public domain syntax, without credentials, custom
  ports, IP literals or local suffixes. There is no DNS lookup or fetch; review
  still must establish the official public destination and current source.

`parseYouthCatalogue` rejects duplicate IDs. It does not adopt the isolated
native catalogue or change the existing library collection/translation gates.

## Actual-minutes notebook

`lib/highSchool/notebook.ts` stores only completed, self-recorded work: opaque ID,
per-entry revision, optional curated record ID, provider/role labels, local
activity date, actual integer minutes, notes and creation/update metadata. No
student profile, school name, private supervisor details or signature is needed.

Dates stay `YYYY-MM-DD` strings. Calendar validation covers leap years without
converting activity dates through UTC. Callers supply the user's current local
date, rather than deriving it using `toISOString().slice(0,10)`. Future activity
dates, non-integer/non-positive minutes, more than 1,440 minutes per day, duplicate
IDs, oversized archives and invalid entries reject visibly. Totals use integer
minutes; formatting 95 minutes gives 1 hour and 35 minutes, without rounding up.

Each new entry starts at revision 1. Edits must supply the previous revision and
the next revision; deletes must supply the previous revision. A stale editor or
delete cannot overwrite a newer entry even when timestamps collide. Archive CAS
also rejects concurrent writers. Conflicts require reload and an explicit user
decision; there is no automatic retry, merge, truncation or success message.

The storage key is `gta.highSchool.actualMinutes.v1`. Unknown/corrupt archive
versions remain untouched. Read, invalid-data, write, conflict and missing-entry
errors are explicit result values. A caller displays new durable state only on
`ok: true`; a failed mutation must keep its draft and previous displayed state.
If an adapter throws after a write, the outcome is unconfirmed: reload before
retrying, rather than generating another opaque ID and duplicating the work.

The frontend integration owns an IndexedDB adapter. CAS must read, compare and
write in one readwrite transaction and acknowledge success only on transaction
completion. Request success alone is insufficient. Abort/error must reject;
comparison mismatch returns false without a write. A plain localStorage get/set
sequence is not an atomic substitute, and no fallback writer ships here.

This core uses deterministic storage doubles; **real browser storage, reload,
quota/denied behavior and cross-tab integration remain unverified**. Browser and
native durable adapters remain outside this patch. This is not a claim that an
implemented native or web notebook has shipped.

CSV uses quoted RFC-style cells and doubles embedded quotes. Every user-controlled
text cell is prefixed with an apostrophe, including ordinary text, whitespace,
tabs, CR and BOM-prefixed formula payloads. Stored text stays unchanged. Dates
and actual-minute cells are generated from validated values. Exports identify
themselves as self-recorded personal records, not signed school forms or approval.

## Portable tests and release boundary

`fixtures/eligibility.json` is a byte-for-byte copy of the 14-case research packet
from `replica/high-school/eligibility-fixtures.json` in the Full Stack workspace.
`fixtures/policy.ts` is a **test-only**, explicit curation adapter for those cases;
it does not classify live text. Each expected field in the original packet is
asserted independently. Full-output goldens and the notebook/CSV golden are
reference vectors for later Swift/Kotlin ports, subject to review with this
contract. They are never published opportunities or independent content evidence.

Run the two `*.test.ts` files with the existing repository tsx runtime and Node
test runner, serially. No package install or Next build is required. The tests
cover all policy cases, source/age/status boundaries, held/stale sources, explicit
costs, storage loss/conflicts, calendar dates, revision races and spreadsheet
formula protection. Final UI, localized copy, actual storage, approved content,
native parity, accessibility, offline journeys and release checks remain gates.

A target of three independently verified free open volunteer roles from at least
two providers/regions remains a content objective, not a reason to manufacture
roles or relabel directories. A later useful hub can show reviewed programmes,
resources and the notebook with honest empty role results while that coverage
marker remains incomplete.
