# High School website slice

This UI consumes the separately reviewed youth model and a nine-record curated source packet. It does not alter the ordinary library feed or publish synthetic fixtures.

- Four student pathways: Volunteer; Learn & create; Leadership & careers; Scholarships & support. Approved Nunito, original GTA artwork, opaque light/dark tokens and the existing shell remain.
- Individual roles, programme intakes, programmes to ask about, provider directories and guidance are separate. The initial packet has zero confirmed individual roles, one no-mandatory-fee programme intake and two directories. Source age and availability are evaluated against the clock; these are not permanent opening counts.
- YRES is a programme, not a guaranteed role. Its overall 120-hour requirement and monthly virtual commitment remain visible. YMCA next intakes are unknown. Blueprint has necessary-expense uncertainty and is not a verified-free programme. Funding guidance is not an award.
- Region means source-backed availability for students in that region, not an invented venue. Mixed delivery may mean options or required mixed attendance; confirm the source format. No new map pins, cause/commitment filters or unread counts are supplied.
- `/high-school/activities/` preserves age-based activity Browse. Existing teen query and named-filter links still enter the legacy explorer without redirect or rewriting saved archives. New youth criteria are not silently added to the old saved-filter schema.
- English guide/notebook copy is labelled visibly. Curated provider requirements are author-written factual summaries, not verbatim quotations. Original full descriptions for ordinary library events remain unchanged.

## Personal hours notebook

Only actual completed integer minutes are recorded. No scheduled programme commitment is auto-credited. The notebook is local to this browser; it is not school approval, a signed form, a student account or cross-device sync. It collects no student identity or supervisor contact fields. Privacy copy explains IndexedDB and downloaded CSVs.

The browser adapter compares and replaces the raw archive inside one IndexedDB readwrite transaction, requests strict durability and resolves success only on transaction completion. Abort, blocked storage, unsupported strict durability and quota failures must not become Save success. Browser clearing/eviction can still remove local data.

Per-entry revisions and archive CAS prevent stale edits/deletes. Conflicting drafts remain visible, cannot overwrite the latest entry and can be displayed for copying. Cancel, reload and reopening the latest entry are explicit. Reload never silently rebases a draft. CSV comes from the model’s safe exporter and is labelled self-recorded, not school approval.

## Verification

`npm run qa:high-school` runs the model/notebook/curated and legacy-link cases. `npm run qa:high-school:browser -- <outside-export-directory>` bundles a purpose-built, button-operated test harness outside `out/`. It is restricted to dedicated localhost port8793 and must never be published. It uses real IndexedDB transactions, a separate same-origin realm for concurrent CAS, deliberate native transaction aborts, and explicit disposable-data controls for corrupt/version-mismatch UI checks. Browser automation operates its UI; it does not inject state through read-only evaluation.

Production build, search-indexing, provider-body integrity, live browser storage/keyboard/phone/light/dark/RTL checks and root review remain required before publication. Source and pure-test checks alone do not establish those results. New teen-preset persistence, broader verified-role coverage, native High School parity and full guide translation are separate work.
