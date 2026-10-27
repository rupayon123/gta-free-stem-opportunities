# Full-description translation contract, v1

This is an experimental generator/benchmark, not a claim of production coverage.
Only complete original event titles and descriptions are input; summaries and
320-character browser excerpts are never substituted for original descriptions.
The source index validates the two approved library hosts and original event URLs.

`source.json` is canonical UTF-8 JSON (sorted keys, compact separators, one final
newline): `{schemaVersion:1, sourceLanguage:"en", records:{id:{organization,
sourceUrl,titleSHA256,descriptionSHA256}}, texts:{sha256:exactOriginalText}}`.
Text identities hash exact UTF-8 bytes, including whitespace. Records with matching
content share one text. Clients must verify the current raw source hash before
attaching a translation; Android must derive it before RSS normalization. A browser
excerpt requires a source-description hash from its trusted catalogue projection.

Each locale file includes `schemaVersion:1`, exact `language`, `sourceIndexSHA256`
(the SHA256 of source.json bytes), `translationSource`, pinned `model` provenance,
and build-only audit `translations:{sourceTextSHA256:{text,segments:[{startByte,endByte,
sourceSHA256,text,endedNormally:true}]}}`. Segment boundaries are UTF-8 BYTE offsets,
covering every original byte exactly once, with no gap, overlap or untranslated
tail. All segments require real model end-of-sequence, not max-token stopping.
The full translated text reconstructs every segment in order with spaces.
Partial packs, stale source hashes and old summary templates are rejected.

Publishing uses `/translations/manifest.json`: `{schemaVersion:1,
sourceLanguage:"en",source:{path,sha256,bytes},locales:{fr:{path,sha256,bytes},...}}`.
Paths are `/translations/<sourceSHA>.source.json` and
`/translations/<sourceSHA>.<locale>.<packSHA>.json`. The source descriptor's SHA is
the pack's sourceIndexSHA256. Load only the selected locale. New immutable source
and locale files are validated/written before the live manifest is replaced. A
full release requires all 17 target language packs, never one sample or 16/17.
Every response remains bounded to 10 MB; no model runs inside the apps. Native
feed bounds, event freshness, approved-source rights and publication ordering are
independent and remain enforced. Valid originals remain the fallback.

The bounded public Actions benchmark uses a pinned CTranslate2 INT8 conversion of
Google MADLAD-400-3B (Apache 2.0), not a paid inference service. Converted weights
are third-party data; exact model/tokenizer SHA256 checks are mandatory before
loading. No remote Python code, pickle or tokenizer hooks execute. Language tokens
must exist in the actual model vocabulary; a model-card language list alone does
not establish translation support. The benchmark must pass before this model is
selected for production generation. Runtime and model attribution are in Python.

Vocabulary verification found that this released MADLAD model has no `<2yue>`
target token. Its model-card language list describes broader dataset coverage.
Cantonese is explicitly excluded from this engine, with no Mandarin alias. The
benchmark covers French, Mandarin and Punjabi; a separate proven Cantonese engine
is required before complete 17-language delivery can be claimed.

Client locale files use `artifactType:"full-description-locale-pack"` and
`translations:{sourceTextSHA256:{text,sourceSegmentCount,translatedSegmentCount,
endedNormally:true}}`, plus `auditSHA256`. Counts are equal positive integers.
The producer first validates all detailed audit segments and full text, then
compacts without altering the text. Detailed source/target sentence transcripts
stay in build-only bounded 64 MB audits; apps never download them. This avoids
duplicating every translated paragraph and loading thousands of audit records
into the UI. All source, client locale and manifest responses retain their 10 MB
limit. The final manifest is not replaced unless every required compact locale
passes validation. Model choice is still experimental; no production coverage
is claimed by the schema or successful structural tests alone.
