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

The project uses npm 10 with the tracked `package-lock.json`; `package.json`, GitHub Actions, and `vercel.json` all enforce that workflow with `npm ci`. Keep local-only package-manager files out of CLI uploads; `.vercelignore` excludes `pnpm-lock.yaml` and `pnpm-workspace.yaml`.

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
