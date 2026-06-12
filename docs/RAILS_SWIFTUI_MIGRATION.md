# Rails + SwiftUI Migration Plan

GTA FREE STEM is moving toward a Rails-owned backend/web platform plus a native SwiftUI iOS app while the existing Next.js site stays live.

## Stack

- Rails 8.1, Ruby 3.4, PostgreSQL, optional PostGIS, Hotwire, Turbo, Stimulus.
- Supabase Free Postgres/PostGIS can host the production database.
- Render Free can host the Rails web service for the beta.
- GitHub Actions can run scheduled Rails refresh jobs later.
- SwiftUI, MapKit, SF Symbols, Sign in with Apple, TestFlight, Xcode Cloud, and App Store Connect support the iOS app path.

## Rails Commands

```bash
cd apps/web-rails
bundle install
bin/rails db:prepare
bin/rails gta_free_stem:refresh
bin/rails test
bin/brakeman -q
```

## Production Environment

Set these in Render or another free Rails host:

- `RAILS_ENV=production`
- `RAILS_MASTER_KEY`
- `DATABASE_URL`
- `RAILS_LOG_TO_STDOUT=enabled`
- `RAILS_SERVE_STATIC_FILES=enabled`

## Cutover Rule

Keep `https://gta-free-stem.vercel.app/` live until Rails has:

- Passing Rails tests and security scan.
- Imported opportunity data.
- Public pages, API, sitemap/robots, Google verification, and accessibility pages working.
- Verified mobile, desktop, tablet, portrait, landscape, light mode, and dark mode.
- A stable free production deployment.
