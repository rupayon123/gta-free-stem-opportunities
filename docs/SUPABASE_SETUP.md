# Supabase Setup

GTA FREE STEM Opportunities is a static Next.js export. Supabase is used only for accounts, saved opportunities, feedback, missing-program submissions, announcements, and admin review.

## Create The Project

1. Create a Supabase Free project.
2. Open the SQL editor.
3. Run `supabase/schema.sql`.
4. In Authentication settings, keep email confirmation enabled.
5. Add the deployed site URL to the Auth redirect URLs.

## Environment Variables

Copy `.env.example` and set these in the public Vercel project `gta-free-stem`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
```

These are public client-side keys. Never add service-role keys to this static app.

## Seed Real Listings

After running `supabase/schema.sql`, generate the seed SQL from the real source-backed listings in `lib/data.ts`:

```bash
npm run supabase:seed
```

Copy the output into the Supabase SQL editor. You can also save a copy for review:

```bash
npm run supabase:seed > supabase/seed.generated.sql
```

The generated insert uses the required beta fields and keeps listing statuses. Public search only reads active, current listings.

## First Admin

1. Create and verify the admin user through the website or Supabase Auth.
2. Run this in the Supabase SQL editor:

```sql
update public.profiles
set account_type = 'admin'
where email = 'kazuhanakumora@hybe.com';
```

Normal users cannot create or update themselves into admin. Admin permission comes from `public.profiles.account_type = 'admin'`.

## What Works Without Supabase

Public browsing, search, filters, map, details, language switching, dark mode, and calendar export still work without Supabase. The app logs a console warning and uses local browser fallback only for development preview.
