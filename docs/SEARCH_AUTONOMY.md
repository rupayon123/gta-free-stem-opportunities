# Search and unattended publishing

The public website is a static export. GitHub Actions collects the approved sources at minute 17 every six hours in UTC. A successful source refresh and normal Git push trigger the connected Vercel project. The computer used for development does not have to stay on. GitHub may delay scheduled work, and external providers and hosting can be unavailable.

## Data safeguards

The library generator checks page success, per-source success and output counts before replacing generated data. Discovery candidates remain a review queue; they are not published as verified programs. Installation, the production dependency audit, generation, QA and the static build must pass before publication. Failed checks preserve the previously published Git revision. Expired or long-unverified listings remain hidden; retention does not promise that current results will always be nonempty.

If a legitimate contributor advances the branch during collection, the publisher fetches the new branch tip and rebuilds the generated files from that source. It repeats every original gate and tries at most three normal pushes. It never force-pushes or merges competing generated data. Authentication failures, divergent history and failed validation stop publication. The reset is restricted to a matching disposable GitHub-hosted branch workspace.

The refresh schedule, health thresholds, permission scope, GitHub repository and Vercel project are unchanged by this repair.

## Search behavior

Fuse.js 7.5.0 runs locally in the browser, without a search service or account. Search normalizes compatible Unicode forms and Latin accents while retaining the marks used by Indic scripts. Reviewed library aliases cover the site's 18 languages, and category labels are indexed in those languages. This is not unrestricted machine translation. Unknown topics and unrecognized words can still return no matches.

Meaningful search terms must all match. Small spelling errors in sufficiently long words are tolerated; short terms, numbers and dates remain strict. Title and category relevance rank before weaker body matches. A query does not override date, public-status, age, city, language, equity, pathway or distance filters. Nearby requests require an actual city or supported location before a reviewed proximity phrase can be removed.

Empty results offer an explicit way to clear only the search, a published program directory, and the provider's full library calendar. The site does not quietly discard eligibility filters or include unrelated/expired events to inflate results.

## Visibility

The native Next metadata and sitemap include a server-rendered program directory and one factual page per published program. Titles, dates, ages, provider links and a short original summary are readable without JavaScript. Each page has its own canonical URL. Program facts remain provider-confirmed snapshots, not guarantees of spaces or admission. WebPage, CollectionPage and breadcrumb metadata describe the pages; no event-rich-result eligibility, search rank or indexing guarantee is implied.

SEO Machine was evaluated as a possible match for the remembered GitHub repository. It is a content-production workspace with optional external integrations rather than a drop-in visibility dependency. It is not installed. Fuse.js is the only added runtime dependency.

## Verification

- `npm run qa` checks source/export quality and the search regressions.
- `npm run typecheck` checks TypeScript contracts.
- `npm run build` exports pages and verifies early startup recovery placement.
- `python3 scripts/test-refresh-publication.py` tests publication races and failure cases against disposable local remotes; it never contacts GitHub.

A manual run of the same workflow verifies its current implementation. It must not be described as a successful scheduled event. Website checks do not prove an installed native app's source revision, foreground feed acceptance, offline cache or operating-system background execution; those require native evidence.
