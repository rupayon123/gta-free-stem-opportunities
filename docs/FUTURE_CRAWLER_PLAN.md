# Discovery Crawler Plan

The beta now includes a review-first discovery crawler scaffold. It fetches public source pages, extracts likely free GTA STEM opportunities, removes obvious duplicates, and exports new finds as Supabase-ready review rows.

It does not auto-publish. New discovered opportunities are queued as `needs_review` unless they are already expired. An admin must review cost, date, source, location, and duplicate risk before setting a listing to `active`.

## Run Discovery

```bash
npm run discover
```

This prints JSON with source checks, warnings, duplicate counts, and discovered opportunities.

```bash
npm run discover:sql
```

This prints SQL that can be reviewed and pasted into the Supabase SQL editor after `supabase/schema.sql` has been run.

## Sources

The current source registry is in `lib/discovery.ts` and includes:

- Toronto Public Library event searches.
- Markham Public Library event searches.
- Mississauga, Whitby, and Oakville library/program pages.
- Credit Valley Conservation youth opportunities.
- TRCA youth volunteer opportunities.
- Eventbrite free science/technology search as an untrusted broad index.

Add sources slowly. Good sources have public pages, clear dates, clear free-access language, an official provider, and stable URLs.

## Local AI Option

The crawler can optionally ask a local Ollama-compatible model to help extract event fields:

```bash
USE_LOCAL_AI=1 LOCAL_AI_MODEL=deepseek-r1:latest npm run discover
```

This is optional and zero-cost only if the model is already installed locally. If Ollama or the model is missing, deterministic extraction still runs and the job reports a warning.

AI is never allowed to publish directly, invent missing facts, bypass review, store child personal data, or replace admin approval.

## Review Rules

Admins should approve only when all of these are true:

- Future or currently active date.
- GTA or online eligibility.
- Clear no-cost access.
- Clear source URL.
- Age/date/location present.
- No serious duplicate conflict.
- Trusted source/provider, or official provider confirmation.

Keep items in review or hidden when any of these are true:

- Unclear cost/access.
- Stale dates.
- Conflicting locations or age ranges.
- Private-source-only claims.
- Social posts without an official source.
- Possible duplicate listings.
