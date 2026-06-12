# Search Hunting Engine Plan

The beta includes a free scheduled search-hunting engine for the website data layer. It fetches public source pages, extracts likely free GTA STEM opportunities, removes obvious duplicates, hides expired listings from public search, and exports the same public feed the future iOS app can consume.

High-confidence listings can be `active`; uncertain but useful public finds can appear as `needs_review` / `new find` so users see more opportunities while the source still stays transparent. Expired items do not appear in public search.

## Run The Engine

```bash
npm run engine:refresh
```

This refreshes generated library listings, scans public discovery sources, exports `public/opportunities.json`, and runs QA.

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
- exports `public/opportunities.json` for app/web sync;
- runs QA;
- builds the static site;
- commits only when generated opportunity data changes.

## Apple/App Sync

Apple services improve the native iOS app, but the durable search hunting engine should stay on free backend/GitHub Actions infrastructure. The SwiftUI app can later fetch:

```text
https://gta-free-stem.vercel.app/opportunities.json
```

That keeps the website and app separate while letting both use the same public opportunity feed.
