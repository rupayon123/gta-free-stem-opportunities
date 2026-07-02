# GTA FREE STEM Opportunities

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Supabase Ready](https://img.shields.io/badge/Supabase-ready-3ecf8e)](https://supabase.com/)
[![Static Export](https://img.shields.io/badge/hosting-static%20export-6aa9ff)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Public website for finding free and accessible STEM programs, library events, volunteer-hour opportunities, co-op/SHSM pathways, mentorship, hackathons, and youth leadership opportunities across the Greater Toronto Area.

Live site: [gta-free-stem.vercel.app](https://gta-free-stem.vercel.app)

Companion iOS app: [rupayon123/gta-free-stem-ios](https://github.com/rupayon123/gta-free-stem-ios)

This project is open source so other cities can fork it, replace the region/source data, and launch their own free-learning opportunity finder.

## What Is Included

- Static Next.js website with TypeScript.
- Public browsing without an account.
- Search by city, region, age, category, language, volunteer hours, co-op/SHSM, mentorship, leadership, and focused community supports.
- List and map discovery using MapLibre and OpenFreeMap.
- Supabase-ready accounts, saved opportunities, feedback, missing-program submissions, announcements, and admin review.
- Source-backed opportunity data from public GTA library, community, conservation, nonprofit, and education sources.
- Scheduled refresh workflow for rebuilding public listing data from trusted sources.
- High-school pathway pages for volunteer hours, co-op/SHSM, mentorship, leadership, and career exploration.
- Accessibility/support and community-host pages.
- Light/dark themes, multilingual interface, keyboard-accessible controls, and plain-language listing details.

## Repo Layout

- `app/` - Next.js app routes.
- `components/` - website UI components.
- `lib/` - opportunity data, search/filter logic, Supabase client, and shared types.
- `scripts/` - source refresh, data export, QA, and Supabase utility scripts.
- `supabase/` - beta database schema.
- `docs/` - setup, deployment, crawler, traffic, and release planning notes.
- `apps/web-rails/` - Rails backend prototype for future API/admin work.
- `public/` - static assets, sitemap, robots file, manifests, and verification files.

## Run For Development

```bash
npm install
npm run dev
```

Local development is only for private checks. Do not share localhost, local servers, or temporary tunnel URLs as the public website.

## Build And Deploy

```bash
npm run typecheck
npm run qa
npm run build
```

The static export is written to `out/` and can be hosted on Vercel Hobby or Cloudflare Pages at zero out-of-pocket cost.

Cloudflare Pages:

```bash
npm run deploy:pages
```

Vercel uses `vercel.json` and serves the generated static export.

## Supabase Setup

Supabase is optional for browsing and required for production accounts, saves, feedback, submissions, and admin review.

Required public env vars:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Never commit Supabase service-role keys, OAuth secrets, deploy tokens, database passwords, or private API keys.

Verify the connection:

```bash
npm run supabase:check
```

## Opportunity Refresh

```bash
npm run discover
npm run discover:summary
npm run discover:sql
npm run generate:library
```

Public search hides listings after their `endDate`, `deadline`, or `startDate` passes. Saved items and admin history can still keep archive context later.

The scheduled workflow reference is in `docs/refresh-opportunities-workflow.yml`. It is designed to refresh public data, run QA/build checks, and commit updated static listing files when source feeds change.

The public feed export adds generated summary translations, localized category metadata, and localized cost metadata for every non-English launch language under each listing's `translations` payload. These are free, deterministic browsing summaries built from listing metadata. Full public-release content translation still needs reviewed translated titles, organization names, addresses, source-specific tags, and richer descriptions before every dynamic field can be considered fully translated.

## Security And Privacy

- Browsing requires no account.
- Saving requires an account once production auth is connected.
- Browser location is optional and session-only.
- Public listing pages show source details, not internal admin audit logs.
- Supabase admin access must be controlled by database rules, not client-side fields.
- `.env`, `.env.*`, `.vercel`, `.next`, `out`, local artifacts, and build output are ignored by git.
- Under-13 account storage should stay disabled until a parent-consent/legal compliance flow exists.

## Reuse For Another City

1. Fork the repo.
2. Replace the city/region data and public source list.
3. Update metadata, sitemap, and deployment name.
4. Connect a free Supabase project if accounts or admin review are needed.
5. Deploy the static export to Vercel Hobby or Cloudflare Pages.

## License

MIT. Use it, adapt it, and improve access to free learning opportunities in more communities.
