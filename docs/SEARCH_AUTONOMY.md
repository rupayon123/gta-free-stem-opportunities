# Search and unattended publishing

The public website is a static export. GitHub Actions collects the approved sources at minute 17 every six hours in UTC. A successful source refresh and normal Git push trigger the connected Vercel project. The computer used for development does not have to stay on. GitHub may delay scheduled work, and external providers and hosting can be unavailable.

## Data safeguards

The library generator checks page success, per-source success and output counts before replacing generated data. Discovery candidates remain a review queue; they are not published as verified programs. Installation, the production dependency audit, generation, QA and the static build must pass before publication. Failed checks preserve the previously published Git revision. Expired or long-unverified listings remain hidden; retention does not promise that current results will always be nonempty.

A provider 403 or 429 ends collection after the already-started two-page batch, with no immediate retry or later page requests. An optional GitHub-job-local raw RSS cache lasts at most 15 minutes. It checks the exact source URL, original capture time, content hash, size and complete RSS shape. A publication retry reclassifies that raw source under the new code and reruns all gates; it does not refetch every recent page or advance their capture timestamps. The cache disappears with the job.

If a legitimate contributor advances the branch during collection, the publisher fetches the new branch tip and rebuilds the generated files from that source. It repeats every original gate and tries at most three normal pushes. It never force-pushes or merges competing generated data. Authentication failures, divergent history and failed validation stop publication. The reset is restricted to a matching disposable GitHub-hosted branch workspace.

The refresh schedule, health thresholds, permission scope, GitHub repository and Vercel project remain the same. The all-free library collection now follows each source to its end, within an explicit 300-page budget per source and a 15,000-record bound. A budget or output overflow stops publication rather than silently hiding additional records.

The full collection is partitioned before packaging. The native feed retains the STEM scope and integer age ranges, enforces fewer than 5,000 records and at most 10,000,000 UTF-8 bytes, and preserves original provider text. Optional generated record translations are omitted; both native clients have factual original-text fallbacks. The website loads the remaining free reading, arts, community and other library events from a separately validated same-origin catalog. A failed catalog download leaves the core listings available with a visible retry and provider-calendar link. Month-based ages retain the original source wording and use year fractions for website filters.

Static exports share the collection’s original source-check timestamp, so event endings during a long build cannot produce different native, catalog, directory and sitemap sets. Live browsing still uses the current clock and hides ended or stale listings. Source-check dates are shown using the Toronto capture day.

Full-collection and native-core health are recorded separately. The collection must pass every original source gate; the core also has its own retained-publication count floor. Partition checks prove that every current master record appears exactly once across the two parts. No unverified discovery candidate is promoted to increase counts.

## Search behavior

Fuse.js 7.5.0 runs locally in the browser, without a search service or account. Search normalizes compatible Unicode forms and Latin accents while retaining the marks used by Indic scripts. Reviewed library aliases cover the site's 18 languages, and category labels are indexed in those languages. This is not unrestricted machine translation. Unknown topics and unrecognized words can still return no matches.

Nonempty queries run in a same-origin worker so matching does not block typing. Replies are accepted only for the latest query and are intersected with the already-filtered eligible IDs. If the worker fails, the existing matcher falls back over that exact eligible subset.

Meaningful search terms must all match. Small spelling errors in sufficiently long words are tolerated; short terms, numbers and dates remain strict. Title and category relevance rank before weaker body matches. A query does not override date, public-status, age, city, language, equity, pathway or distance filters. Nearby requests require an actual city or supported location before a reviewed proximity phrase can be removed.

Empty results offer an explicit way to clear only the search, a published program directory, and the provider's full library calendar. The site does not quietly discard eligibility filters or include unrelated/expired events to inflate results.

Matching uses provider text and reviewed aliases; it does not understand every sentence or infer unrestricted intent. A replacement activity can still match wording about the original club it mentions. Visitors should read the title and original provider details before choosing an event.

An expanded-library bookmark is unchecked while that catalog is loading or unavailable. It is not classified as expired, and clearing known unavailable saves preserves unchecked IDs. A successful retry can restore their cards; a completed current catalog can identify records that are genuinely no longer listed.

## Visibility

The native Next metadata and sitemap include a server-rendered program directory and one factual page per published program. The directory has native pagination with at most 200 cards per page. Titles, dates, ages, provider links and a short original summary are readable without JavaScript. Each page has its own canonical URL. Program facts remain provider-confirmed snapshots, not guarantees of spaces or admission. WebPage, CollectionPage and breadcrumb metadata describe the pages; no event-rich-result eligibility, search rank or indexing guarantee is implied.

SEO Machine was evaluated as a possible match for the remembered GitHub repository. It is a content-production workspace with optional external integrations rather than a drop-in visibility dependency. It is not installed. Fuse.js is the only added runtime dependency.

## Verification

- `npm run qa` checks source/export quality and the search regressions.
- `npm run typecheck` checks TypeScript contracts.
- `npm run build` exports pages and verifies early startup recovery placement.
- `python3 scripts/test-refresh-publication.py` tests publication races and failure cases against disposable local remotes; it never contacts GitHub.

A manual run of the same workflow verifies its current implementation. It must not be described as a successful scheduled event. Website checks do not prove an installed native app's source revision, foreground feed acceptance, offline cache or operating-system background execution; those require native evidence.
