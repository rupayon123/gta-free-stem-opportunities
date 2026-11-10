# Special needs and accessibility — frontend integration plan

Source-only plan, 2026-10-30. Base: `58c995d405bbafbe60d097dd26161ecc28da74f2` (PR 14). No UI controls, catalogue facts, stored user data or deployed bytes are changed by this document. Backend owns the canonical evidence contract; frontend owns its display, filter selection, preset compatibility and reviewed applicability bindings. No compiler/browser/service is started for this plan.

## Current source and integration boundary

- PR 14 contains the reviewed four-card layout, conditional language notice and directory age/grade eligibility correction. Preserve those changes, original artwork, tokens, English content semantics, keyboard focus and reduced-motion behavior.
- Main also contains the separate generated-data refresh `d350774`: 7,790 generated library records (6,130 Toronto, 1,660 Markham) and 1,920 exported native records. The earlier card-build receipts cover 7,821/1,927 at `f264eac`; do not relabel those older data counts or hashes as new-main evidence. Root has been notified of the lineage distinction.
- Root confirmed refresh `d350774632f38b36904798fdbecc31e2ad4fbdb9` was intentional and accepted, timestamp `2026-10-30T05:54:55.770Z`. At this plan's base, the 1,920-record feed SHA-256 is `b2c8e2dde6865686f57a2ad2e4eb01700d1e1bf1b783a8ba013e4c17e6e3ac0e`, independently checked from the tracked bytes. Preserve this refreshed data; the card change does not authorize reverting it. Source QA/build for the merge and live publication remain root-owned evidence.
- There are no Burlington records in the current generated library catalogue. BPL policy research is useful but cannot manufacture a programme or a current match. No current support matches have been seeded by this plan.
- The original source audit/proposal remains preserved in the previous worktree, excluded from PR 14. This plan supersedes its tentative wire names, not its source caveats.

Integrate only the backend-reviewed foundation after its focused checks and local handoff. Do not copy a second validator or independently rename the contract. The accepted optional field is `accessibilitySupport: { schemaVersion: 1, evidence: [...] }`. Its categories are `mobility-wheelchair`, `sensory-friendly`, `adapted-inclusive-programme`, `sign-language`, `hearing-captioning`, `visual-formats`, `support-person`; statuses are `provided`, `on-request`, `not-available`, `unknown`; scopes are `venue`, `activity`, `provider-policy`.

Use backend `parseAccessibilitySupport` and `accessibilitySupportDecision` with an injected canonical clock. Keep its hold/conflict/future/staleness handling. Venue proof requires an exact reviewed `{id,name}` and matching venue ID. Preserve short exact provider evidence, conditions, request link and actual check date. Legacy prose remains prose. An optional-field default must not create invented evidence or break decoding old records.

Root's compatibility correction: producer/export validation stays strict and rejects malformed evidence before publication; a runtime reader must retain otherwise valid base events, notes and counts when an optional proof extension is malformed or unsupported. Quarantine only that extension as unknown, with a visible metadata-unavailable notice. Do not discard the entire library catalogue or fall back to a small core merely because optional support metadata is bad. Exercise a mixed two-record fixture with one bad extension; both base records must remain usable and neither may gain a false positive match.

## Reviewed selection semantics

UI legend: **Special needs & accessibility**. Help: **Choose the access or support you want to check. Providers confirm arrangements.** Use seven native checkboxes with visible wrapping labels and existing filter styles; no diagnosis questions or profile fields.

| Category | Plain label | Default positive scope |
| --- | --- | --- |
| mobility-wheelchair | Wheelchair and mobility access | Exact venue |
| sensory-friendly | Sensory-friendly activities | Activity |
| adapted-inclusive-programme | Adapted and inclusive programmes | Activity |
| sign-language | Sign-language interpretation | Activity |
| hearing-captioning | Hearing support and captions | Activity |
| visual-formats | Accessible visual formats | Activity |
| support-person | Support-person arrangements | Activity |

No selection leaves access unrestricted. Multiple selections require **all selected categories** to qualify, combined with existing age/grade/region/delivery/search filters using AND. A captioning claim does not become ASL; adapted audience wording does not become a quiet sensory environment or trained staff. A branch hearing-aid system may be displayed in venue details but does not become activity captioning under this table.

**Include support that must be requested** is a separate explicit opt-in, default off. It admits current `on-request` claims only at the category's relevant scope, or an explicitly reviewed applicable provider request policy. Label those results **Request and confirmation needed** with their conditions. Provider-policy `provided` must never become guaranteed activity service. Unknown is not a positive match. A specific negative relevant claim must not be overridden by a broad positive provider policy; conflicting applicable evidence requires review.

When no confirmed matches remain, retain the criteria and say **No reviewed listings confirm all these supports.** Offer **Clear support filters** and optionally **Show listings with unconfirmed support separately**. Unconfirmed entries retain other eligibility filters, have a separate count/heading and cannot be described as inaccessible or unsuitable. Explicit negative evidence does not become unknown. Do not merge the unconfirmed section into the confirmed total.

Store selection semantics in a bounded optional versioned criterion (proposed `supportSelection: { schemaVersion: 1, categories: [...], includeOnRequest: false }`). The default-scope table belongs to that criterion version. Persist canonical category IDs, not translated labels or a person's needs. Unknown future criterion versions must produce a visible recovery state rather than silently broadening matches. The implemented scoped criteria use `support` containing this versioned selection; the listing-evidence schema remains backend-owned.

## Exact source changes after foundation handoff

1. Add one shared selection/predicate module using the backend decision function; both Browse's `lib/utils.ts:filterOpportunities` and `HighSchoolDiscovery` consume it before grouping/search. Keep the age/grade eligibility predicate on directories. Do not filter by generic `accessibility[]`, title, tags or community-focus labels.
2. Add a small shared fieldset component to `OpportunityExplorer` and the High School guide filter panel. Reuse native controls and token styles, selected chips, explicit clearing and mobile panel behavior. Long labels/conditions wrap; no fixed control height or new overlay. New English strings stay explicitly English until reviewed translations exist.
3. Add a shared details section in `OpportunityExplorer` detail and `YouthListingDetail`: category, status, exact scope/venue, conditions, source/review date, and provider request link. Legacy notes remain separately labelled reminders. Never submit a support request or collect medical information.
4. Extend ordinary `Filters`, defaults, URL parse/write, active-chip counting, reset and preset equality. Handle invalid persisted/URL criteria visibly; never silently treat them as no filter. The worker already receives eligible IDs, so it needs no new evidence-inference logic.
5. Add a separately reviewed optional bridge for curated youth records. Backend's current foundation does not modify `YouthListing` or its nine-record source bundle. The youth parser, fixture adapters and native counterparts must agree before evidence is attached.
6. Integrate reviewed support bindings into catalogue generation and public export before initial matches are claimed. Recheck native count/size/rights and old-decoder compatibility on the newly generated bytes. Do not regenerate or overwrite accepted feeds during source preparation.

## URL and saved-filter compatibility

`EXPLORER_FILTER_PARAMS` is also a routing switch: on `/high-school/`, a recognised legacy parameter selects teen activities. A generic shared support parameter added blindly would send youth-guide users to the wrong catalogue. Use an explicit namespace/scope for the youth guide; keep existing saved links and the `view=activities` marker working.

Existing `gta-stem-named-filters-v1` records and `highSchool: true` refer to the ordinary/legacy activity explorer. Missing new criteria default to no access restriction. Keep names, IDs, creation dates, unrelated criteria, opportunity bookmarks and hours notebooks intact. Read-only loading must never rewrite the archive. Save/update remains explicit; loading a preset must not save it.

**Compatibility risk requiring a reviewed migration choice:** the old v1 decoder rebuilds an allowlisted `Filters` object. An older open tab can drop new fields when it writes that archive. Merely adding optional fields does not guarantee preservation across versions. Do not promise otherwise.

Implemented source approach: keep original v1 bytes untouched and import their exact backup, identities, names, dates and normalized criteria into the separate `gta.scopedPresets.v2` archive in one atomic IndexedDB compare-and-swap. A read of an already imported archive does not rewrite it. The picker groups scopes without duplicate legacy entries. An older tab changing v1 blocks v2 writes; explicit keep-current recovery backs up the changed raw bytes and retains current v2 presets. Unsupported or damaged archives preserve their bytes and the user's draft. Browser transaction, abort and cross-tab acceptance remain pending.

Youth-guide named presets need their own explicit scope and age/grade/region/delivery/support criteria. Do not insert them into the old legacy envelope or reinterpret `highSchool: true`. A unified picker may display both scopes, but each loads its correct route and never resets the other archive. Selection preferences stay local and optional; no new analytics/account sync or diagnosis storage.

## Reviewed evidence overlay plan

Use a small reviewed evidence file plus explicit applicability bindings, kept separate from provider descriptions and from synthetic fixtures. Each binding identifies the claim, exact source/provider relationship, listing kind and permitted scope. Venue bindings require stable reviewed venue IDs and exact listing-to-venue relationships. `lib/mapLocations.ts` only groups rounded coordinates and provides **no stable reviewed venue identity**; its coordinate key is not accessibility proof. Address/title similarity or a general city centre must not create a binding or map pin.

Initial candidate sources, already reviewed publicly in the coordinating chats:

- [TPL programme/event support request](https://tpl.ca/accessibility/accessibility-supports/programs-and-events/): candidate provider-policy/on-request communication and attendant evidence. Preserve the two-week preferred notice and direct request link; do not apply programme/event policy to volunteer recruitment automatically. Never submit the linked form.
- [TPL branch equipment/accessibility](https://tpl.ca/accessibility/branch-equipment/): review exact branch/service evidence and stable identity before attaching any venue claim to a current event. The current plan establishes no branch mappings.
- [BPL accessibility support](https://www.bpl.on.ca/services/accessibility/support): preserve the Kilbride exception, interpreter notice, guest-registration and hearing-system location/arrangement conditions. No current BPL listing means no imported match yet.

Sensory kits are not a sensory-friendly programme; TPL's under-13 sensory room is not a High School event; the unverified Sensory Storytime lead and conflicting MPL location lead remain research leads. A TTY outage must remain a specific exception rather than being overwritten by general communication support. No provider records, claims or openings are created by this plan.

Keep exact quoted evidence short and within source quotation limits; use concise reviewed paraphrases for condition explanations, with source links. No page snapshots, third-party imagery or bulk copying. Evidence check timestamps reflect actual review, never a routine import. Bindings must fail safely on source/listing/venue drift and require review instead of automatically propagating claims.

## Verification and release gates

- Shared source fixtures: all seven categories; all-selected AND; scope mismatch; exact/missing/wrong venue; on-request opt-in; provider policy not event guarantee; explicit negative versus unknown; stale/held/conflicting/future evidence; boilerplate and misleading sensory/ASL keywords.
- Persistence: unchanged v1 archives, atomic backup/import, explicit save/update, unknown-version preservation, quota/read/write errors, other-tab edits/deletion, Unicode names, missing/future criteria, scoped route restore and untouched bookmarks/notebooks. Do not claim atomic cross-tab behavior until the chosen storage contract actually provides it.
- UI: Browse and youth guide, saved restoration, details/source links, clear/chip behavior, no-match/unconfirmed sections, all four pathways and MPL age-12 exclusion. No public support filter until source-backed initial matches and conditions can be exercised end to end.
- Fresh rendered checks at 320/390/768/1440, light/dark, long labels/conditions, non-English shell, keyboard/focus, reduced motion and enlarged layout. Same accessibility thresholds; no overlaps, clipped text or horizontal overflow. Native owners validate their own model/filter/detail/preset surfaces.
- Root grants the single build slot, owns PR/merge/free-host publication and verifies live bytes. The prior card receipts prove the prior card product/source, not this unimplemented support feature or the refreshed dataset.

## Source preparation status

Prepared independently of the pending canonical foundation: `lib/scopedPresets/repository.ts`, `browserStorage.ts` and `repository.test.ts`. The repository requires a strict scope-aware criteria decoder from the future integration, rather than supplying a permissive production default. Its v2 archive stores exact v1 backups and imported identities in one CAS commit, never writes localStorage, revision-checks updates/deletion, blocks mutations after detected legacy changes and offers an explicit keep-current/backup recovery operation. The separate IndexedDB adapter waits for strict transaction completion. There is no UI mount, no runtime migration, no archive reset and no support-checkbox release.

Five repository groups passed on 2026-10-30: legacy identity/backup preservation, concurrent/stale mutations, older-tab changes/recovery, corruption/storage failures and commit acknowledgement. Counts: 5 pass, 0 fail, 0 skip; exit 0; total owned peak 233,568 KiB below the 262,144 KiB guard; 0.93 seconds with initial free memory 43%. Raw evidence is in `outputs/scoped-presets-source-20261030` outside this worktree. No broad typecheck ran. The actual IndexedDB adapter still needs fresh real-browser completion/abort/concurrent-tab evidence.

`ScopedSavedFilters.tsx` and its stylesheet are prepared but unmounted, preserving one scope-grouped picker, immediate selection and one explicit Save/Update action. The two separately granted rendering groups passed: 2 pass, 0 fail, 0 skip; exit 0; total owned peak 192,976 KiB below 262,144 KiB; 13.12 seconds with initial free memory 33%. The five earlier groups were not repeated. These seven groups cover their recorded source versions; the later retry-control/callback integration is not a completed browser journey. The caller must import the stylesheet when mounting. This is not a finished public preset migration.

## Later canonical integration and verification boundaries

- Backend foundation `3a1dd1d` and hunter `8c750e06` were locally cherry-picked as `44cda67` and `4437ad7`. No public feed was regenerated. Their original source/verification receipts remain backend-owned.
- The role view now has source implementations for a visible unknown-cost lead group, authored responsibilities/requirements/selection/commitment/cost notes, the one-application condition and distinct provider form links. Directories remain separate. Five behavioral cases were exercised: the first run had four passes and a test-fixture failure caused by expecting non-JSON undefined properties. Its process-stop guard also failed to write a final receipt, so no memory-budget pass is claimed for that run. The corrected case 4 alone passed on retry (1 pass, 0 fail/skip; sampled total 242,256 KiB; complete receipt). All initial evidence is retained.
- A focused strict `--noEmit --listFiles` typecheck passed before the subsequent integration edits: 13 explicit roots, 197 resolved files, no app/data/generated/Next/exporter graph, exit 0, sampled total 240,704 KiB, minimum host free memory 45%, 2.38 seconds. Evidence is under `outputs/frontend-integration-source-20261030` outside this worktree. The later source is covered by the browser split described below; fixture typing remains incomplete. Do not call the whole current branch typechecked.
- Root authorised a byte-identical copy of the reviewed canonical client. Its corrected source SHA-256 is `cfece9da34314f3147b212d71b4799c4a9e2283c388fe571c0f26316b9eccd83`; the earlier `1e625...` copy is superseded. `useYouthRoleFeed` consumes its stable store API without another fetcher or polling. `roleFeedEnabled` defaults to **false**, and HomePage does not enable it. The canonical pipeline/bootstrap commit `6f471a98` is locally incorporated as `0644108`; `public/youth-opportunities.json` exists locally with two unknown-cost Aurora leads and zero verified-free roles. Its feed SHA-256 is `8c91601ef70a864b183cbfc8ab888a0b05f83f7234573ed614e3ac8295be4011`. No deployed endpoint or activation is claimed.
- Current-clock catalogue projection now marks an old or count-reduced feed stale, even when the store still holds an earlier ready snapshot. It rejects future revisions. Existing consumer case 5 was extended for empty-feed freshness boundaries and passed alone: 1 pass, 0 fail/skip, 0.40 seconds, sampled total 128,656 KiB, minimum host free memory 50%. No new fetch or getter-side clock evaluation was introduced.
- Root approved exactly the three TPL request-policy assertions and their exact provider/event/type binding. They remain `on-request`/`provider-policy`; no venue, sensory-environment or general accommodation claim is added. Same-source/category/scope revisions replace that policy record while event negatives remain. The four mapping fixtures passed: 4 pass, 0 fail/skip, 0.41 seconds, sampled total 120,240 KiB, minimum free 44%. The eight selection/criteria groups passed separately: 8 pass, 0 fail/skip, 0.44 seconds, sampled total 102,464 KiB, minimum free 42%. Their raw receipts remain outside this worktree.
- Support fieldset/details, strict scoped criteria and transactional preset callbacks are source-only and unmounted. Actual IndexedDB failure/concurrent-tab tests, enabled loader/network/browser journeys, full-app/export checks and fresh visual evidence remain release gates. The initial reviewed public role snapshot must exist before root activates the consumer. No new runtime is running and no test/compile batch starts automatically.


## Final affected typecheck terminals

All runs below used strict TypeScript, `--noEmit --listFiles`, the existing compiler, a 160 MiB JavaScript heap and unchanged 262,144 KiB total-owned RSS guard. No failed run is treated as passed.

- Original combined graph: 21 roots / 36 planned local files. Stopped at 265,568 KiB total RSS; SIGTERM confirmed exit -15, no diagnostic printed. No completed compiler or resolved-closure audit.
- Browser split: 15 production roots, 28 actual local files, 91 total resolved files. Exit 0, exact local closure, no forbidden app/data/generated/Next/exporter paths, unchanged source hashes before/after. Sampled peak 245,776 KiB, initial/minimum free 55%, elapsed 0.85 seconds. Complete compiler, graph and budget pass.
- Fixture split: 6 roots / 24 planned local files. Stopped at 263,712 KiB total RSS; SIGTERM confirmed exit -15, no diagnostic printed. Initial free 42%, minimum 41%, elapsed 1.04 seconds. Source hashes unchanged; no completed compiler or resolved-closure audit. No automatic retry or increased limit.

Both compiler processes are gone and both slots explicitly released. Receipts and frozen inventories: `outputs/frontend-integration-source-20261030` in the enclosing workspace. The two planned closures together cover the original 21 roots / 36 files, but only the browser half has a successful actual compiler closure. A checkbox CSS specificity fix outside the compiler graph is source-only and visually unverified.

## Parent mount proposal for root review

Root approved the source mount with the read-only home and pending-notebook requirements below. Source mounting is now prepared behind one default-off support/preset feature prop, separately from the default-off role-feed prop. The support/preset prop prevents storage migration and support filtering when disabled. No public activation has been made.

1. Browse and teen activities: replace the old picker with `ScopedSavedFilters` only while enabled. Disable old v1 load/write/URL effects in that mode, so two persistence systems cannot race. Pass current activity criteria plus support selection to the v2 hook; immediate selection applies once and explicit Save/Update writes once. Preserve the legacy mode when disabled, bookmarks, neutral programme-language behavior and all current filters. Apply reviewed TPL programme/event bindings before the support predicate; never bind by title or coordinates.
2. Youth guide: lift scoped criteria to the hub, preserving independent age and grade. A saved selection changes pathway and criteria in one action. Manual pathway navigation clears active preset identity; preset-driven navigation retains it. Keep notebook draft/busy guards and focus restoration. Do not attach programme policies to volunteer roles. Until a canonical youth evidence bridge is reviewed, support on those records remains unconfirmed.
3. Home saved links: use read-only v2 repository loading when enabled, preserve scope-specific routes and show storage errors without resetting data. Do not independently write v1 or start another migration implementation.
4. Details and no-match states: mount shared evidence details with source, date, conditions and explicit unknown handling. Keep raw notes separately labelled. Confirmed and unconfirmed results need separate counts and headings. Clear support choices without resetting age, grade or other filters. Import both stylesheets at the owning client boundary.
5. Acceptance after source review: real IndexedDB completion/abort and concurrent-tab journeys, route restoration, old-tab conflict recovery, role loader failure/stale/empty cases, full-app checks and fresh screenshots. Check 320/390/768/1440, light/dark, long names and conditions, enlarged text, non-English shell, keyboard focus and reduced motion. Inspect actual rectangles and screenshots for overlap, clipping, horizontal overflow and misplaced text. A screenshot-capture failure is a blocker, not a visual pass. Root owns publication and live-byte evidence.


### Exact change map and initial-match boundary

| Source | Proposed change | Required preservation |
| --- | --- | --- |
| `components/HomePage.tsx` | Own the reviewed default-off support/preset flag; pass it to Browse, teen activities, hub and home saved links | Existing language, route readiness, legacy teen route and independent role-feed flag |
| `components/OpportunityExplorer.tsx` | Conditional single v2 picker, support fieldset/chips/clear, predicate before search, evidence details inside existing dialog | Legacy effects fully gated while v2 is enabled; existing dialog focus/close, saved opportunities and location behavior |
| `components/DiscoveryLanding.tsx` | Read scoped v2 links only when enabled; retain old read-only links while disabled | No duplicate migration writer; scope routes and exact names |
| `components/high-school/HighSchoolHub.tsx` | Own youth scoped criteria and preset selection/navigation handoff | Notebook busy/draft guard; manual versus preset navigation; section focus |
| `components/high-school/HighSchoolDiscovery.tsx` | Consume controlled criteria, scoped picker and support fieldset; separate confirmed/unconfirmed grouping | Independent age/grade, directories eligible only through teenHub, cost-unconfirmed role leads |
| `components/high-school/YouthListingDetail.tsx` | Shared support details only from an approved youth evidence adapter | No new youth wire field or programme-policy attachment without backend agreement |
| `lib/accessibilitySelection.ts`, `lib/scopedPresets/*` | Reuse current predicate, strict scope decoder and transactional archive | No second validator, silent broadening, v1 writes or automatic overwrite |
| `scripts/generate-library-opportunities.ts` | Explicitly apply approved `attachReviewedTplProgramPolicy` to final eligible TPL event objects before serialization | Retain exact source review date, descriptions and raw notes; exclude directories, MPL and volunteer roles |
| `scripts/prepare-library-catalog.ts`, `scripts/export-public-opportunities.ts`, `lib/libraryCatalog.ts` | Verify partitioning/export/runtime retains the same optional proof, strict producer and tolerant reader | Canonical counts, legacy rows, raw notes, native size and unsupported-proof fallback |

The producer hook is proposed source work, not permission to run generation or overwrite accepted feeds. Real initial matches must be counted from newly generated reviewed bytes in a root-approved exclusive batch, with source identities and negative cases inspected. No positive count is promised in advance. With request-based support disabled, the three reviewed TPL policies produce **zero positive matches** by design. Enabling that separate opt-in may admit only current exact-bound TPL events and must show **Request and confirmation needed**. Youth role support remains unconfirmed until a separate canonical bridge is reviewed; the Aurora role bootstrap does not supply support evidence.

The remaining fixture typecheck is deferred to one future exclusive full-app verification/build batch after reviewed mounted source is ready. That batch must include fixture files and their Node/React settings, or pair an explicit fixture check in the same approved batch; a production-only build cannot silently stand in for their missing compiler result. No more repeated LIGHT compiler attempts or cap increases are planned.

Screenshot issue coordination: the latest user message gives no new attachment path or specific capture error. Root's current website risks are checkbox specificity/minimum size, the full viewport/theme matrix, wrapping and preset controls, live criteria, High School cards, keyboard focus, actual enlarged font at 200%, reduced motion and full role conditions. The native keyboard/long-press screenshot issue is separate evidence and cannot prove website layout. These cases stay on the next scoped rendered acceptance list.


## Source mount revision after root review (not verified or activated)

`HomePage` exposes separate `supportPresetsEnabled=false` and `roleFeedEnabled=false` props and passes them to the owning pages. No app route enables either prop. Browse/teen source mounts the single scoped picker, native support fieldset/chips/clearing, no-match controls and separate unconfirmed count/cards. The existing search worker receives ordinary eligible records; the same full query result is partitioned by the support predicate afterward, so confirmed and unconfirmed groups use the same search without a second worker or mixing their totals. Source details show evidence/conditions/dates/request links, separate raw notes and an honest absent-review message. No venue ID or youth evidence is inferred.

The youth hub owns the controlled age/grade/region/delivery/support tuple. Manual pathway changes detach the preset; saved-preset changes use `guardYouthPresetTransition` and a pending criteria/route tuple while the notebook is dirty. Criteria, view and selected preset identity are applied only after confirmation. Busy rejects the transition; cancel keeps the draft/current criteria/selection and restores the opener's focus. The scoped hook now awaits acceptance before changing selection or address. Initial pathway and criteria pathway are synchronized. No youth support wire field was added: selected supports honestly produce zero confirmed youth matches, with eligible unconfirmed listings offered separately.

Home uses strict repository `peek` through `readHomePresetLinks`, never `load`. Missing v2 falls back to read-only legacy shortcuts; malformed v2 shows an error without reset. `peek` uses the browser's `readExisting` adapter: database inventory avoids creation, unexpected upgrade aborts, and a delayed success after blocking closes immediately. No CAS, archive migration or object-store creation occurs on the home path. Browser inventory compatibility and actual transaction behavior still require browser evidence.

Support selections are **local only**. No categories, request opt-in or entire youth criteria tuple is serialized into URL/history strings. Shared links contain opaque preset ID/scope; unsaved support stays in component state and explicit saves in local v2 storage. Existing unexpected `accessSupport`/`youthCriteria` parameters are rejected with visible recovery and scrubbed by `stripPrivateSupportParams`, rather than applied or copied into new URLs. The existing pathway URL remains synchronized. A saved preset restores its private criteria from the local archive.

The generator source now applies the exact approved three-claim TPL overlay before serialization, preserving the real review timestamp and event negatives. No generator, exporter or public file has been run or rewritten. Thus existing generated data is not yet proof of positive matches; actual initial-match/count/size verification remains required.

New/changed meaningful fixtures are prepared but **unrun**: home absent/corrupt/existing v2 zero-write reads with unchanged v1; pending youth selection before confirmation/cancel/confirm/busy with distinct age and grade; URL privacy plus exact saved-preset local restoration. The prior repository fixture has changed and its earlier five-group receipt does not prove this revision. The prior browser split receipt likewise covers its frozen pre-mount source, not these new edits. Root's next exclusive full-app batch must cover all changed source and test files; no repeated LIGHT compile has been attempted.

Static whitespace review (`git diff --check`) is clean. This is not a compiler, test, browser or visual pass. No new UI is published. Screenshot acceptance remains outstanding for all new mounted controls and enlarged text, with the complete viewport/theme/focus/motion matrix retained.
