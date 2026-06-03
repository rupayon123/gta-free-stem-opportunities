# Traffic And Cost Plan

## Zero-Cost Strategy

The site is designed so the expensive part stays tiny:

- Public pages are static files served by a free CDN host.
- Browsing, search, filters, details, language switching, map UI, and calendar export run in the browser.
- Supabase is used only when a visitor signs in, saves, sends feedback, submits a missing program, or an admin reviews data.

## Free-Tier Reality

This can support a strong beta at zero cost, but no free stack can honestly guarantee unlimited traffic or thousands of authenticated users online at all times forever.

Known free-tier guardrails to monitor:

- Supabase Free: monthly active users, database size, egress, and storage.
- Vercel Hobby: usage limits for personal projects.
- Cloudflare Pages Free: build/file limits.
- GitHub Actions: free minutes are limited for private repositories.

## How To Keep It Free Longer

- Keep public opportunity browsing static.
- Avoid server functions for normal browsing.
- Avoid image optimization services; use small static assets.
- Do not add paid email/SMS reminders in beta.
- Do not add AI crawling until the basic database/admin system is stable.
- Batch admin work instead of constantly writing to the database.
- Keep map tiles on OpenFreeMap/MapLibre with proper attribution and avoid bulk tile scraping.

## When The Free Tier Gets Tight

If Supabase egress or database limits become an issue, first reduce client reads:

1. Cache active public listings as static JSON generated during deploy.
2. Keep Supabase reads for signed-in dashboards and admin only.
3. Archive old feedback/submissions after review.
4. Add simple pagination to admin review tables.
