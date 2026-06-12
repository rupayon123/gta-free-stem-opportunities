# GTA FREE STEM Rails Platform

Rails owns the future web/backend platform for GTA FREE STEM while the current Next.js static site remains live.

## Responsibilities

- PostgreSQL/PostGIS schema for opportunities, organizations, users, OAuth identities, saves, feedback, missing submissions, announcements, source checks, and crawler logs.
- Public search API that hides expired/hidden listings while preserving saved/archive history.
- Web pages for search, high school pathways, community hosts, accessibility/support, privacy, terms, and admin review.
- Import task for the current source-backed static opportunity database.
- Security headers, Content Security Policy, Rails tests, Brakeman, Bundler Audit, and RuboCop.

## Commands

```bash
bundle install
bin/rails db:prepare
bin/rails gta_free_stem:refresh
bin/rails test
bin/brakeman -q
bin/bundler-audit check --update
```

## Production Notes

- Use Supabase Free Postgres/PostGIS for `DATABASE_URL`.
- Use Render Free or another zero-cost Rails host for beta hosting.
- Set `RAILS_MASTER_KEY` and never commit `config/master.key`.
- `db/structure.sql` is the canonical schema dump because PostGIS cannot be safely represented by `schema.rb`.
