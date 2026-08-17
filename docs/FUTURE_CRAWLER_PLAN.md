# Search Hunting Engine Plan

The beta includes a free scheduled search-hunting engine for the website data layer. It fetches public source pages, extracts likely free GTA STEM opportunities, removes obvious duplicates, hides expired listings from public search, and exports the same public feed the iOS app can consume.

Only verified `active` listings with a current or future date window enter public search or `public/opportunities.json`. Discovery results with `needs_review` status, including `date-to-confirm` records, stay in the admin review queue until a reviewer confirms their free access and date. Expired items do not appear in public search.

## Run The Engine

```bash
npm run engine:refresh
```

This refreshes generated library listings, scans public discovery sources, exports `public/opportunities.json`, and runs QA. Each generated source file is written only after its own health gate passes: at least 75% of expected library pages, at least 50% of every library source, at least 75% of discovery sources, and a non-degraded listing count compared with the last committed feed. If any later stage fails, the GitHub workflow exits before committing or publishing any generated file, so production keeps the last known good feed.

```bash
npm run discover:summary
```

This prints source checks, warnings, duplicate counts, and discovered opportunities.

## Sources

The current source registry is in `lib/discovery.ts` and includes:

- Toronto Public Library event searches.
- Markham Public Library event searches.
- Mississauga, Whitby, and Oakville library/program pages.
- Credit Valley Conservation youth opportunities.
- TRCA youth volunteer opportunities.
- Eventbrite free science/technology search as an untrusted broad index.

Add sources slowly. Good sources have public pages, clear dates, clear free-access language, an official provider, and stable URLs.

## Free Scheduled Refresh

`.github/workflows/refresh-opportunities.yml` runs every 6 hours and can also be started manually from GitHub Actions. The job:

- refreshes source-backed static opportunity files;
- rejects a material upstream failure or a degraded listing output before publication;
- exports `public/opportunities.json` for app/web sync;
- runs QA;
- builds the static site;
- commits only when generated opportunity data changes.

The public feed includes a `sourceHealth` object with non-sensitive source counts, success ratios, and output thresholds. Consumers can display freshness or fall back to their bundled feed without exposing upstream error content.

The scheduled commits form the archive of prior accepted snapshots. The public runtime feed remains compact by excluding expired and pending-review records, while Git history keeps an auditable recovery point for an approved listing if it is needed later.

## Apple/App Sync

Apple services improve the native iOS app, but the durable search hunting engine should stay on free backend/GitHub Actions infrastructure. The SwiftUI app can later fetch:

```text
https://gta-free-stem.vercel.app/opportunities.json
```

That keeps the website and app separate while letting both use the same public opportunity feed.
