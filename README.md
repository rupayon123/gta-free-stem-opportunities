# GTA FREE STEM Opportunities

A public beta website for finding verified free STEM programs, library events, volunteer-hour opportunities, co-op, SHSM, mentorship, hackathons, and youth leadership pathways across Toronto, Peel, York, Durham, and Halton.

## What Is Implemented

- Source-backed public listings from official/current pages such as Toronto Public Library, Markham Public Library, Whitby Public Library, Credit Valley Conservation, TRCA, PACT, and Oakville Public Library.
- Public search with list and MapLibre/OpenFreeMap map views.
- Filters for age, city, region, category, language, approximate postal area, live-location distance, equity-focus toggles, volunteer hours, co-op, mentorship, and leadership.
- Friendly pastel blue visual system with mint, yellow, coral, lavender, light mode, dark mode, and system theme.
- Launch-language selector: English, French, Mandarin, Cantonese/Yue, Punjabi, Urdu, Tamil, Tagalog/Filipino, Spanish, Arabic, Farsi/Persian, Hindi, Gujarati, Bengali, Japanese, and Korean.
- Listing detail panels in the main flow: access information, free-status proof, provider contact, public source evidence, directions, save button, and `.ics` calendar export.
- Account-gated save flow in the beta UI: users must create or sign in with a verified account before saving.
- Supabase-backed accounts, saves, feedback, missing-program submissions, announcements, and admin review when env vars are configured.
- Local fallback demo parent login for development preview only: `kimchaewon@hybe.com` / `password123`.
- Local fallback demo admin login for development preview only: `kazuhanakumora@hybe.com` / `password123`.
- High school pathway section for volunteer hours, STEM/learning volunteering, mentorship, co-op, SHSM, youth leadership, and career exploration.
- Community host workflow for organizations that can offer STEM placements, co-op/SHSM exposure, or volunteer hours.
- Supabase beta schema for `profiles`, `opportunities`, `saved_opportunities`, `feedback`, `missing_opportunity_submissions`, and `announcements`.
- Opportunity statuses: `active`, `expired`, `needs_review`, and `hidden`; public search only shows active, non-expired listings.

## Developer-Only Preview

```bash
npm install
npm run dev
```

This is only for private development checks. Do not use localhost, local servers, or temporary tunnel URLs as the public website.

## Free Public Hosting

The public website must run on a free online host so families and students can access it without anything running on this computer. Use the static export in `out/` and deploy it to Cloudflare Pages free tier or Vercel Hobby.

```bash
npm run build
npm run deploy:pages
```

For Vercel Hobby, use `vercel.json`: `npm run build` creates the static `out/` directory.

## Supabase Setup

See `docs/SUPABASE_SETUP.md`. Required public env vars:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Do not put Supabase service-role keys in this static website.

## Verification

```bash
npm run typecheck
npm run build
npm run ingest:dry-run
npm run qa
```

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
- Under-13 account storage should stay disabled until a parent-consent/legal compliance flow exists.
- The public claim should remain honest: verified coverage that is growing toward complete GTA coverage.
