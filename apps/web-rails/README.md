# GTA FREE STEM Rails Platform

Rails owns the future web/backend platform for GTA FREE STEM while the current Next.js static site remains live.

## Responsibilities

- PostgreSQL/PostGIS schema for opportunities, organizations, users, OAuth identities, saves, feedback, missing submissions, announcements, source checks, and crawler logs.
- Public search API that includes only approved, dated, current listings checked within 14 UTC days. Pending review, undated, stale, expired, and hidden listings stay out of public results and details.
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

The Rails refresh task imports the existing generated TypeScript files; it does not crawl providers. Both generated input files must exist and every row must import successfully. Imports run in one transaction, so a missing/invalid input rolls back data changes and does not advance the successful-import timestamp. Hidden moderation decisions survive imports. Discovery review inputs are always quarantined; refreshing that input requires renewed review rather than automatically retaining a previous approval.

The actual source hunting engine is the repository's `npm run engine:refresh` pipeline, scheduled by `.github/workflows/refresh-opportunities.yml` every six hours. The scheduled workflow retains the production dependency audit and source-health gates. A local refresh does not prove the deployed schedule is healthy.

`POST /api/v1/hunt_refresh` returns HTTP 503 with `data.status: "unavailable"`. There is no on-demand worker, so this route neither enqueues work nor stores submitted queries or coordinates. Clients should continue to browse the latest published feed and handle this response without retry loops. It must not be presented as a completed refresh.

Only successful completed imports can advance Rails `lastUpdated`; queued requests, failed checks, and unrelated checks cannot. This timestamp describes an import, not a fresh verification of every upstream provider.

Creating a saved opportunity requires a currently public listing. Existing saves retain previously approved history when the event expires or its verification becomes overdue, missing, or undated. Those records retain their full IDs and remain removable. Raw moderation-pending (`status: needs_review` in storage) and withdrawn/hidden records are excluded. The computed response `status` may become `needs_review` for an overdue verification without making the historical save a new moderation candidate.

Saved responses add `currentPublicationState` (`current`, `verification_required`, or `expired`), `archived` (true unless current), and `requiresVerification` (true for stale/missing verification or absent dates). Expiry takes precedence for the publication state; expired history can also require verification. Clients should use this metadata to label history honestly and must not present it as a current public listing. Saves remain scoped to the authenticated account.

`highSchool=true` and the model helper match the website's inclusive age-overlap rule: minimum age at most 17, and maximum age at least 14 or unspecified. Pathway tags or flags cannot admit adult-only or children-only programs. General teen STEM does not require pathway tags; separately requested volunteer/co-op/mentorship filters continue to apply.

Date-only cutoffs use the end of their Toronto calendar day; precise source timestamps retain their exact cutoff.

## Security review

Backend reviews use the focused guidance in Cloudflare's MIT-licensed [security-audit-skill](https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/skills/security-audit/SKILL.md), pinned at `c1c8a8c1471069fb0e188eeaff69b8e8db6564a8`. Trace public input through authorization and publication decisions, validate the smallest boundary result, and distinguish source review from runtime or deployment evidence. This is a source-review methodology, not activation of Cloudflare WAF or account settings.

Its target-code execution rules require an OS sandbox with no external network, an empty allowlisted environment, read-only source/toolchain, scratch-only writes, and explicit resource limits. If those controls or the required runtime/database are unavailable, keep execution findings unverified. A focused review does not constitute a comprehensive security certification.

## Production Notes

- Use Supabase Free Postgres/PostGIS for `DATABASE_URL`.
- Use Render Free or another zero-cost Rails host for beta hosting.
- Set `RAILS_MASTER_KEY` and never commit `config/master.key`.
- `db/structure.sql` is the canonical schema dump because PostGIS cannot be safely represented by `schema.rb`.
