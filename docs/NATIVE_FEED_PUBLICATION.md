# Native feed publication

`public/opportunities.json` is the accepted native snapshot. The website and
both free hosting builds copy these exact bytes. Its 4,999-record and 10 MB
UTF-8 limits are unchanged. `schemaVersion` remains 1.

Only `npm run export:public-feed` assigns `publicationRevision`. It bootstraps
a legacy snapshot once, then advances only when the accepted payload changes.
The value is canonical UTC RFC3339 with milliseconds, assigned as the greater
of the current clock and the previous revision plus one millisecond. Invalid
or excessively future previous revisions fail without replacing the file.
An identical payload preserves its revision, bytes and file modification time.

Builds and QA verify the committed snapshot against the source-derived payload.
They cannot mint a revision. An unexported source change fails the build and
requires an explicit source export/commit. This prevents a delayed build of
older source data from presenting itself as a newer correction. Refresh push
conflicts still rerun all gates against the newly accepted remote source.

The source snapshot clock governs event selection; `lastDataChange` still
describes source freshness. Neither value is a substitute for the publication
revision. Native consumers independently enforce data-date and publication
nonregression. A known revision cannot be replaced by a missing, malformed,
older or conflicting equal revision. Legacy-to-legacy corrections retain their
existing behaviour. Publication revisions do not authorize content.

## Reviewed provider permission basis

The owner confirmed permission on 2026-10-25 to display and translate event
listings from Toronto Public Library and Markham Public Library. The manifest
records `owner-confirmed-permission`, that fixed confirmation date and the two
scopes. It does not invent a written agreement, a terms digest, a licence URL
or an independently verified grant. Unknown providers are not authorized by
this record. Native clients pin the same two provider/host combinations.

The legacy `termsVerifiedAt` wire key identifies the source snapshot review
date; refreshing it does not renew or change the owner's permission record.
Every published native row must match its exact approved organization, HTTPS
event host/path and identical source/registration link. Reviewed restricted IDs
cannot be published. The exporter unions current source exclusions with 77
reviewed IDs captured from the existing explicit restriction lists and current
provider exclusions. This is a known set, not a claim to enumerate every
historical removal. Ordinary expired or removed events are not classified as
rights restrictions merely because they disappeared.

Original full provider descriptions are retained. UI labels and generated
summary templates do not establish full-description translation coverage.
Complete translations require separate verified source-content coverage and
must not inflate the native feed beyond its established byte limit.

## Checks

`npm run verify:native-export` covers revision ordering, immutable accepted
bytes, stale builds, concurrent refresh retries, strict timestamps, clock skew,
native limits, provider pinning, restricted records and permission-date
stability. The exporter self-test verifies the real committed payload and
retains a sentinel file when a bounded export fails. Hosting verifies actual
feed byte hashes against both release manifests before recording success.
