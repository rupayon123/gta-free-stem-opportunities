# GTA FREE STEM Opportunities

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Supabase Ready](https://img.shields.io/badge/Supabase-ready-3ecf8e)](https://supabase.com/)
[![Static Export](https://img.shields.io/badge/hosting-static%20export-6aa9ff)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Open-source public beta for finding free and accessible STEM programs, library events, volunteer-hour opportunities, co-op, SHSM, mentorship, hackathons, and youth leadership pathways across the Greater Toronto Area.

Public beta: https://gta-free-stem.vercel.app

This project is built so other cities can fork it, replace the source list and city/region data, and launch their own free-learning opportunity finder without paid infrastructure.

## Highlights

- Mobile-first Next.js and TypeScript website with static export hosting.
- Public browsing without an account.
- Supabase-ready accounts, saved opportunities, feedback, missing-program submissions, announcements, and admin review.
- Search by city, region, age, category, program language, approximate postal area, map/list view, volunteer hours, co-op/SHSM, mentorship, leadership, and focused community supports.
- Scheduled GitHub Actions refresh workflow for source-backed public opportunity data.
- Light/dark theme, multilingual interface, keyboard-accessible controls, and plain-language listing details.
- Security-first public repo defaults: no committed `.env` files, no service-role keys, no private credentials, and no public demo admin fallback.

## What Is Implemented

- Source-backed public listings from official/current pages such as Toronto Public Library, Markham Public Library, Whitby Public Library, Credit Valley Conservation, TRCA, PACT, and Oakville Public Library.
- Review-first hunting coverage across 30 public sources spanning Toronto, Peel, York, Durham, Halton, GTA-wide youth volunteer sources, university outreach, and online public event indexes.
- Generated static library listing layer from official Toronto Public Library and Markham Public Library public event feeds.
- Public search with list and MapLibre/OpenFreeMap map views.
- Filters for age, city, region, category, language, approximate postal area, live-location distance, equity-focus toggles, volunteer hours, co-op, mentorship, and leadership.
- Kid-friendly learning-site visual system with vibrant blues, mint, yellow, coral, lavender, rounded panels, playful hover motion, light mode, dark mode, and system theme.
- Launch-language selector: English, French, Mandarin, Cantonese/Yue, Punjabi, Urdu, Tamil, Tagalog/Filipino, Spanish, Arabic, Farsi/Persian, Hindi, Gujarati, Bengali, Japanese, and Korean.
- Listing detail panels in the main flow: access information, free-status proof, provider contact, public source evidence, directions, save button, and `.ics` calendar export.
- Account-gated save flow in the beta UI: users must create or sign in with a verified account before saving.
- Supabase-backed accounts, saves, feedback, missing-program submissions, announcements, and admin review when env vars are configured.
- Local preview accounts are restricted to local development hosts only and are not available on public deployments.
- High school pathway section for volunteer hours, STEM/learning volunteering, mentorship, co-op, SHSM, youth leadership, and career exploration.
- Community host workflow for organizations that can offer STEM placements, co-op/SHSM exposure, or volunteer hours.
- Supabase beta schema for `profiles`, `opportunities`, `saved_opportunities`, `feedback`, `missing_opportunity_submissions`, and `announcements`.
- Opportunity statuses: `active`, `expired`, `needs_review`, and `hidden`; public search only shows active, non-expired listings.
- Seed exporter for the Supabase opportunities table: `npm run supabase:seed`.
- Review-first discovery crawler for public library, nonprofit, and event-index sources: `npm run discover`.
- Library feed generator for expanding the static public database: `npm run generate:library`.
- Supabase production connection check: `npm run supabase:check`.

## Developer-Only Preview

```bash
npm install
npm run dev
```

This is only for private development checks. Do not use localhost, local servers, or temporary tunnel URLs as the public website. Demo account fallback is limited to local preview hosts and is not available on public deployments.

## Free Public Hosting

The public website must run on a free online host so families and students can access it without anything running on this computer. Use the static export in `out/` and deploy it to Cloudflare Pages free tier or Vercel Hobby.

```bash
npm run build
npm run deploy:pages
```

For Vercel Hobby, use `vercel.json`: `npm run build` creates the static `out/` directory.

Current public deployment instructions are in `docs/DEPLOYMENT.md`.

## Supabase Setup

See `docs/SUPABASE_SETUP.md`. Required public env vars:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Do not put Supabase service-role keys, private API keys, deploy tokens, or personal credentials in this static website.

After adding real credentials, verify the production database connection:

```bash
npm run supabase:check
```

Without those credentials, public browsing still works, but production accounts/saves/admin persistence are not connected.

## Discovery Crawler

```bash
npm run discover
npm run discover:sql
npm run generate:library
```

The crawler fetches public source pages across Toronto, Peel, York, Durham, Halton, and online indexes, extracts likely real free GTA STEM opportunities, dedupes against existing listings, and exports new rows for admin review. New crawler finds stay out of public search as `needs_review` until an admin approves them.

The library generator fetches structured public library event feeds, filters out cancelled/full/charged/exhibit-only entries, and writes `lib/generatedLibraryOpportunities.ts` so the static public site can show a larger verified database at zero hosting cost.

## Automatic Refresh And Expiry

- Public search automatically hides listings after their `endDate`, `deadline`, or `startDate` passes.
- Expired listings are removed from regenerated public discovery layers at each scheduled refresh, while saved items and admin history still keep archive context.
- The scheduled GitHub Action in `.github/workflows/refresh-opportunities.yml` runs every 6 hours and can be triggered manually.
- The scheduled job refreshes official library-feed listings, scans discovery sources for review candidates, runs QA/build, and commits the refreshed static database when source feeds change.
- A copy of the workflow is kept in `docs/refresh-opportunities-workflow.yml` for setup reference.
- For the public Vercel site to update automatically from that commit, the Vercel project must be connected to this GitHub repo or a Vercel deploy token workflow must be added.

## Verification

```bash
npm run typecheck
npm run build
npm run discover
npm run ingest:dry-run
npm run qa
```

Run `npm run supabase:check` after `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are connected.

## Zero-Dollar Deployment Rules

- Host the static Next.js export on Cloudflare Pages free tier or Vercel Hobby.
- Use Supabase Free for Postgres/Auth when switching from local demo accounts to production accounts.
- Keep public browsing static and account-free; use Supabase only for saves, forms, and admin review.
- Keep maps on MapLibre with OpenFreeMap tiles and visible attribution.
- Keep email reminders feature-flagged until a free or donated sender/domain exists.
- Keep exact postal-code geocoding behind a later credit/funding path; the current app supports browser location and approximate FSA matching.
- Do not use local-only hosting, localhost links, or temporary tunnel links for real users.

## Safety And Privacy Defaults

- Browsing requires no account.
- Saving requires a verified account.
- Browser location is used only for the current session.
- Public listing pages show source and verification details, not internal admin audit logs.
- Public deployments do not seed or accept local demo admin accounts.
- Supabase admin access is controlled by database role/profile rules, not client-side secrets.
- `.env`, `.env.*`, `.vercel`, `.next`, `out`, and local verification artifacts are ignored by git.
- Under-13 account storage should stay disabled until a parent-consent/legal compliance flow exists.
- The public claim should remain honest: verified coverage that is growing toward complete GTA coverage.

## Reuse For Another City

1. Fork the repo.
2. Replace the region/city data and source list.
3. Update the public sitemap, metadata, and deployment name.
4. Connect a free Supabase project if you need accounts, saves, feedback, and admin review.
5. Deploy the static export to Vercel Hobby or Cloudflare Pages.

## License

MIT. Use it, adapt it, and improve access to free learning opportunities in more communities.
