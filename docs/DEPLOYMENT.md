# Deployment

## Public Website

Current public beta URL:

```text
https://gta-free-stem.vercel.app
```

This is a Vercel Hobby production deployment of the static `out/` export, so it does not need anything running on this computer.

## Deploy Current Build

```bash
npm run build
npx --yes vercel deploy --prod --yes --scope rupayon-s-projects
```

The existing root-linked Vercel project `i-live-in-the-gta-among` has Deployment Protection enabled. Use the `gta-free-stem` project for the public zero-cost website.

The public `gta-free-stem` project is connected to this repository for Git deployments. Production uses `main`, Node 22, `npm ci`, `npm run build`, and output directory `out`. The scheduled source refresh runs every six hours and commits accepted feed changes; confirm that its generated commit produces a READY production deployment and that `/opportunities.json` matches the accepted GitHub feed before declaring recovery complete.

The root `vercel.ts` supplies build settings, routes and response headers. Do not add the obsolete `public` property: Vercel rejects it. Public website access is configured through the project's deployment-protection settings; the existing public project has protection disabled.

The project uses npm 10 with the tracked `package-lock.json`; `package.json`, GitHub Actions, and `vercel.ts` all enforce that workflow with `npm ci`. Keep local-only package-manager files out of CLI uploads; `.vercelignore` excludes `pnpm-lock.yaml` and `pnpm-workspace.yaml`.

## Visitors with an older page open

Each Vercel build pins Next.js assets to its own immutable `VERCEL_URL`. The root configuration adds only that exact origin to the existing script, style, font and connection policies. MapLibre's worker remains on the page's own origin. Local builds without `VERCEL_URL` retain relative assets. This keeps an already open page's lazy-loaded code available when the production alias switches to a newer build, without a paid hosting feature.

An early inline guard handles missing Next.js scripts and styles. It permits one automatic reload per minute in a tab, preserves the URL and saved listings, and shows an accessible manual reload action after another failure or when session storage is blocked. The guard cannot restore an offline connection or assets deleted by the hosting provider's retention policy. Verify both normal loading and controlled asset failures against a remote preview before promotion.

## App Store Support-Contact Gate

Use `https://gta-free-stem.vercel.app/support/` as the App Store Support URL only after the page and its GitHub support-ticket link are deployed and verified. The no-cost ticket route is public: the page and issue template warn users not to include sensitive information. Before submission, confirm repository Issues are enabled, the template opens successfully while signed in to GitHub, and the publisher receives issue notifications. `/accessibility-support/` remains the accessibility guide, not the App Store contact route.

Do not invent or publish a personal email address, telephone number, or street address. Before App Store submission, the publisher must explicitly choose a dedicated monitored public support email and set it as the production Vercel variable `NEXT_PUBLIC_SUPPORT_EMAIL`. The Support page renders a direct `mailto:` link only when that value exists; without it, the page explicitly reports that public release is blocked. A public GitHub issue form alone is not treated as the required App Store Support URL contact information. Browser-local correction, host, and opportunity-suggestion forms are not support channels because they are not delivered to the publisher while the production backend is disabled.

```bash
vercel env add NEXT_PUBLIC_SUPPORT_EMAIL production
```

Rebuild and deploy after adding the value. The release check rejects a Support page without a direct email or telephone link.

The public legal routes are `https://gta-free-stem.vercel.app/privacy/` and `https://gta-free-stem.vercel.app/terms/`. Verify their rendered production content and effective date before each App Store release.

## Add Supabase Env Vars

After creating the Supabase project and running `supabase/schema.sql`, add these to the public Vercel project:

```bash
vercel link --project gta-free-stem
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env pull .env.local
npm run supabase:check
npm run build
npx --yes vercel deploy --prod --yes --scope rupayon-s-projects
```

Only use the anon key. Do not put a Supabase service-role key into Vercel for this static site.
