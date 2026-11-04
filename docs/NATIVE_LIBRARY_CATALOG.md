# Complete native library catalogue: review contract v1

Status: isolated producer and review-only export. No collector, build, deployment,
website loader, native adapter, or public endpoint uses this format yet. It does
not supply translated text or satisfy the full-description translation release gate.

The existing `opportunities.json` STEM feed, its 4,999-record / 10,000,000-byte
response limits, content rights, and website expanded catalogue remain unchanged.
The expanded website catalogue clips descriptions and cannot serve as the native
full-description source. This separate complete replacement is projected from
`lib/generatedLibraryOpportunities.ts` and its accepted full collection health.

## Identity and coverage

`manifest.json` has these required fields:

- `schemaVersion: 1`, `artifactType: "native-library-catalog-manifest"`, `complete: true`.
- `publicationRevision`: copied from the existing accepted legacy publication,
  whose `sourceHealth.libraryCollection` must exactly match the master. No new
  publication timestamp is minted by a review export.
- `source.acceptedRevision`: the actual Git commit last modifying the committed
  full master, independent of later documentation-only commits.
- `source.generatedAt`: the original collection capture time, never export time.
- `source.masterSHA256`: SHA-256 of the canonical full master sorted by stable ID.
- `catalogueRevision`: deterministic SHA-256 of canonical
  `{publicationRevision, source, coverage, sourceHealth, contentRights, records}`.
  This excludes the manifest itself and chunk descriptors, avoiding self-reference.
- `coverage`: scope `accepted-free-library-collection`, original source count,
  explicit unavailable count, `fullOriginalDescriptions: true`, age semantics
  `source-derived-guidance-in-decimal-years`, coordinate semantics
  `raw-coordinates-without-venue-verification`.
- `sourceHealth`: the full original collection health, independently recomputed
  using the existing collection policy; never substituted with STEM-only health.
- `contentRights`: the existing approved-provider grant and restricted-ID policy,
  recomputed over the accepted complete set. No inferred new grant or permission.
- `recordCount`, `totalChunkBytes`, and ordered `chunks`.

Coverage means all accepted, currently public free listings in this collection at
its accepted capture time, across the existing approved Toronto and Markham
providers and collector horizon. It is not a promise of every provider or year.
Unavailable listings are counted explicitly. IDs are unique across the complete
set; records use ascending stable ID order. A new set replaces the previous set;
clients must not union generations or retain obsolete rows as current listings.

## Immutable chunks and bounds

Every descriptor includes `index`, `path`, `sha256`, exact UTF-8 `bytes`, `records`,
`firstID`, and `lastID`. The only valid path is
`/native-library/<catalogueRevision>/<three-digit-index>-<sha256>.json`, with
lowercase hashes. Absolute foreign URLs, traversal, backslashes, reordered indices,
wrong hashes, and mixed generations are rejected.

Each shard contains `schemaVersion: 1`,
`artifactType: "native-library-catalog-shard"`, `catalogueRevision`, `index`,
`recordCount`, and `opportunities`. Hashes cover the final exact UTF-8 shard bytes,
including the trailing newline. Canonical JSON uses recursive sorted object keys,
ECMAScript JSON scalar serialization, no indentation, and one final newline.
Consumers must hash received bytes before decoding or reserializing them.

- Manifest: at most 65,536 bytes.
- Shard targets enforced by this producer: at most 1,800 records and 4,000,000 bytes.
- Existing hard per-response ceilings remain 4,999 records and 10,000,000 bytes.
- Complete generation: at most 15,000 records, 16 shards, and 32,000,000 aggregate
  downloaded bytes including the manifest. Descriptors report shard bytes only.
- Text field: at most 100,000 UTF-8 bytes; oversized bodies reject the generation
  instead of being clipped. Collection/source health requires the existing
  30-record floor, previous-output ratio of at least 65%, page success of at least
  75%, and per-source page success of at least 50%.

The complete-set verifier checks manifest and shard types, sizes, counts, exact
hashes, immutable paths, global ordered identity uniqueness, source membership,
rights, health, provenance, freshness, and final content identity. It returns the
complete result only after all checks pass. These hashes bind integrity and identity;
they are not a new signature or independent proof of provider authenticity.

## Normative global revision digest for Swift and Kotlin

Global content verification is mandatory in addition to descriptor SHA/count/bounds
checks. Do not reconstruct its preimage by serializing decoded Swift/Kotlin models:
`1`, `1.0`, and a fractional age such as `0.08333333333333333` can be rewritten by
native number encoders; Unicode escaping and slash handling can also differ.

After validating the complete manifest and every ordered shard, retain lexical
byte spans for the raw JSON values of these manifest members: `contentRights`,
`coverage`, `publicationRevision`, `source`, `sourceHealth`. Retain each raw record
object value inside each shard's `opportunities` array in manifest/index order.
Raw spans include a value's opening/closing JSON delimiters, quoted strings and
escape bytes; they exclude surrounding commas, colons, member names, whitespace,
and the containing document's final newline. Never trim or decode/re-encode spans.
Use a JSON-aware byte scanner that respects strings/escapes/nesting, not a regex
that might mistake braces, commas or quotes inside a description for structure.

Stream this exact UTF-8 sequence into SHA-256 (notation below denotes raw spans,
not literal angle-bracket text):

```text
{"contentRights":<raw value>,"coverage":<raw value>,"publicationRevision":<raw value>,"records":[<raw record0>,<raw record1>,...],"source":<raw value>,"sourceHealth":<raw value>}<LF>
```

There are no spaces between structural tokens and exactly one final byte `0A`.
Insert exactly one comma between records, including across shard boundaries;
exclude every shard wrapper. Key order is exactly `contentRights`, `coverage`,
`publicationRevision`, `records`, `source`, `sourceHealth`. This is the same preimage
as the producer's canonical six-field object, without any numeric/string model
roundtrip. Do not hash chunk wrappers, descriptors, `catalogueRevision` itself, or
entire manifest bytes. Changing shard boundaries alone does not change the global
digest. The final lowercase hash must equal the manifest's `catalogueRevision`.

`scripts/native-library-catalog.ts` exports `catalogRevisionRawSegments` and
`catalogRevisionFromRaw` as the reference byte-span implementation. The complete-set
verifier checks both the original canonical-object digest and this raw-byte digest.
The digest helper alone does not validate schema, rights, source health, global
identity ordering, completeness or descriptors; consumers must perform those
checks too. No adapter is implemented or accepted by adding this helper.

Reject duplicate object keys at every depth, even if the last value would decode
identically. Reject unknown fields in manifest/source/coverage/descriptor/shard/
record/source-evidence/rights structures; the existing exact health and grant
comparison also rejects unexpected additions there. Reject invalid UTF-8 and
noncanonical JSON: unexpected whitespace, out-of-order object keys, unnecessary
Unicode/solidus escapes, noncanonical control escapes or finite-number spelling
(`1.0` and `-0` are not canonical). Rounded fractional ages are different record
content and must fail the unchanged global digest. Scalar spelling follows ECMAScript JSON serialization, not a
native model encoder's preferred output. The JS reference validates that the
received document exactly equals its canonical encoding before using raw spans.
Native canonical validation needs equivalent conformance checks; it must not use a
lossy re-encoding as its global hash input or silently normalize malformed input.
JSON decoding/hash success alone never bypasses the complete-set validation gate.

Committed `scripts/native-library-catalog-digest-vectors.json` contains independent
Python-calculated synthetic inputs and fixed hashes: one-month decimal age,
integer ages, CJK/Gurmukhi/Tamil/emoji, newline/tab/quote/backslash, URL slashes,
U+2028/U+2029 and accented text, with the same two records split across one/two
shards. These are digest-only fixtures, explicitly not publishable provider data.
The test suite rejects `1.0`, equivalent escaped-Unicode substitution, and duplicate
keys rather than normalizing them into an accepted digest.

The separate real-source review vector covers all five accepted shards:
7,721 records, 12,933,411 shard bytes, and a 12,939,835-byte reconstructed preimage
at source `bf877fb582370a1ae556256456e6013d916db2bb`. Its global digest is
`4f6d75575744a82d230fe75e80afd4373fb784f32b1d051317ab7d4cc08014d3`.
A read-only independent Python raw-span implementation matched this digest without
serializing any parsed record value. The review receipt and immutable raw shard
files are external review artifacts; the 13 MB dataset is not committed as a test
fixture. These are snapshot vectors, not fixed future catalogue counts.

## Record projection

The projection retains the exact original `title` and `description` strings,
without trimming whitespace, shortening bodies, or replacing them with summaries.
It also retains `id`, `organization`, `category`, `categories`, `city`, `region`,
`address`, `startDate`, optional `endDate` and `deadline`, `ageMin`, optional
`ageMax` and `ageLabel`, `cost`, `sourceUrl`, `registrationUrl`, `lastChecked`,
`lastSeen`, `status`, `tags`, `communityFocus`, `latitude`, `longitude`, `virtual`,
`volunteerHoursEligible`, `coopEligible`, `trustedSource`, and original `sources`.

Ages remain finite decimal years and the original month-based label is preserved.
Native adapters must support decimal ages rather than rounding or dropping rows.
Date-only strings remain date-only; availability through that day follows existing
America/Toronto rules. Source timestamps retain their supplied precision.

Added `coordinatePrecision` is `unverified` for every physical listing and
`not-applicable` for virtual listings. The master does not distinguish provider
coordinates from city-centre fallback coordinates. Neither an address nor a raw
point proves a verified venue. Future adapters must show honest approximate/source
checks and must not offer precise venue directions based on these raw points.

The projection omits shortened summaries, unsupported source language defaults,
translation availability claims, and photos. It introduces no photo provenance or
new delivery-language claim. Future translations must bind to exact full source
text and pass the separate full-title/full-description quality and coverage gate.

## Atomic update and retention

The review writer validates the entire proposed generation before touching output.
It uses an owned directory marker and refuses an unowned nonempty directory or
symlink root. It writes and re-verifies every staged immutable shard, moves the
complete generation into place, then atomically renames the manifest last.
Failures before that commit preserve the previous manifest and all its referenced
files. Invalid proposals cannot trigger retention pruning.

If a hard interruption leaves a complete renamed generation before manifest
commit, a retry can reuse it only when the owned root, real directory, exact file
inventory, regular non-symlink files, all exact plan bytes, and complete-set checks
agree. Wrong, missing, extra, or linked orphan files are refused without altering
the prior accepted set or deleting the unknown orphan.

Publication timestamps must advance for changed content. Byte-identical repeats
are no-ops; conflicting equal timestamps and rollbacks are refused. An intact old
set may be stale today: its original acceptance clock is used to verify integrity
so a fresh successor can recover it. Incoming capture/publication clocks must be
within the existing 14-day freshness window, with at most five minutes future skew.

After successful manifest commit, the writer prunes old generation directories.
Only the manifest and its explicitly referenced current shards are intended for
publication. Future wiring must whitelist these paths, rather than recursively
copying a review directory with ownership markers or interrupted staging files.
There is no unbounded
archive of shards. Clients retain their own previously verified complete offline
cache until a complete successor passes validation. If a stale network manifest
references removed shards, refetch the manifest; never mix generations or accept a
partial set. A cleanup failure is reported as `pruningComplete: false` and requires
review before any future publication.

This writer guarantees process-level atomic manifest replacement on one filesystem.
It does not claim crash-proof filesystem durability, network transactionality, or
cross-device performance. Publication wiring and native adapters require separate
review. In particular, Android API 26 memory, download and parsing performance at
the aggregate ceiling remains unverified.

## Run explicitly for review

```sh
node_modules/.bin/tsx scripts/native-library-catalog.test.ts
node_modules/.bin/tsx scripts/export-native-library-catalog.ts --output /absolute/review-directory
```

There is no default output directory. The CLI refuses paths inside its repository,
requires the master and accepted legacy feed to match committed HEAD blobs, and
checks that their full collection health agrees. The destination must be a new
empty directory or one owned by this exporter. No generated catalogue is committed
to the repository or copied into `public/` or `out/` by these commands.
