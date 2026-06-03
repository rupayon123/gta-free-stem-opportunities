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
npx --yes vercel deploy out --project gta-free-stem --prod --yes --public --force
```

The existing root-linked Vercel project `i-live-in-the-gta-among` has Deployment Protection enabled. Use the `gta-free-stem` project for the public zero-cost website.

## Add Supabase Env Vars

After creating the Supabase project and running `supabase/schema.sql`, add these to the public Vercel project:

```bash
vercel link --project gta-free-stem
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env pull .env.local
npm run supabase:check
npm run build
npx --yes vercel deploy out --project gta-free-stem --prod --yes --public --force
```

Only use the anon key. Do not put a Supabase service-role key into Vercel for this static site.
