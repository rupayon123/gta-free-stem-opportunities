# Contributing

Thanks for helping improve access to free STEM opportunities in the GTA. Contributions should make the listings, setup, documentation, or maintenance workflow more reliable for students, families, educators, and community organizers.

## Good Contributions

Useful contributions include:

- adding or correcting source-backed opportunity data
- improving search, filters, accessibility, or mobile usability
- fixing setup, build, deployment, or Supabase documentation gaps
- adding QA checks for data refreshes, expired listings, or sitemap output
- improving privacy, safety, or moderation flows for submissions and feedback
- keeping examples and city reuse notes current

Avoid empty commits, placeholder listings, duplicate opportunities, scraped private data, or changes that make public claims without a source.

## Opportunity Data Rules

Every public opportunity should have enough source context for someone else to verify it later:

- Use official provider pages when possible, such as library, school board, nonprofit, municipal, conservation, museum, university, or event organizer pages.
- Keep titles, dates, age ranges, location, registration links, costs, and volunteer-hour details faithful to the source.
- Mark uncertain values clearly in data or review notes instead of guessing.
- Do not include personal contact details for minors or private individuals unless the source is an official public program page.
- Prefer free opportunities. If a listing has optional paid add-ons, make the free path clear.
- Remove or archive listings when the public source no longer supports them.

## Privacy And Safety

This project should stay safe for youth and families:

- Do not commit `.env`, service-role keys, OAuth secrets, deploy tokens, database passwords, API keys, or private exports.
- Do not store under-13 account data until a parent-consent/legal compliance flow exists.
- Do not expose admin review notes, moderation data, private feedback, or user identifiers in public static output.
- Treat source refresh output as public data only after reviewing it for accidental private or sensitive fields.

## Local Checks

Before opening a pull request, run the checks that match your change:

```bash
npm run typecheck
npm run qa
npm run build
```

For source-refresh or listing changes, also run the relevant discovery/export command and inspect the generated diff:

```bash
npm run discover
npm run discover:summary
npm run generate:library
```

If a command cannot run locally, mention the blocker in the pull request and include the checks you did complete.

## Pull Request Checklist

Before requesting review, confirm:

- the change has a real user, maintainer, or data-quality benefit
- new opportunity data is source-backed and not duplicated
- expired or date-sensitive listings were handled intentionally
- privacy-sensitive values are not committed
- setup or workflow changes are documented
- relevant checks were run or the blocker is explained

Small, focused pull requests are easier to review than broad rewrites.