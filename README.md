# GTA FREE STEM

GTA Free STEM Opportunities helps people of every age find free STEM programs and library events across the Greater Toronto Area. This repository contains the website and the opportunity feed used by the native apps.

[Open the website](https://gta-free-stem.pages.dev/) | [iOS app](https://github.com/rupayon123/gta-free-stem-ios) | [Android app](https://github.com/rupayon123/gta-free-stem-android)

## The web experience

<table>
<tr><th width="50%">Home</th><th width="50%">Search</th></tr>
<tr><td align="center"><a href="docs/showcase/home.png"><img src="docs/showcase/home.png" alt="Home" width="440"></a></td><td align="center"><a href="docs/showcase/search.png"><img src="docs/showcase/search.png" alt="Search" width="440"></a></td></tr>
</table>

## About the site

Browse programs by city, region, age, category, and language. The High School section covers volunteer hours, co-op, SHSM, mentorship, and career pathways. Listings include dates, provider information, source links, and a map where location data is available.

Browse and save programs without an account. Anonymous saves stay in the current browser and do not transfer automatically between website addresses. Confirm availability and registration with the original provider.

The site uses Next.js and TypeScript, with MapLibre and OpenFreeMap for maps. It builds as a static export.

## Run locally

```bash
npm ci
npm run dev
```

To check and build the site:

```bash
npm run typecheck
npm run qa
npm run build
```

The free static publication is written to `out/` by `npm run build:github-pages`. This produces portable trailing-slash pages, removes unused client-navigation payloads and checks every sitemap page's search metadata. Cloudflare Pages hosts the branded site; the public GitHub Pages repository retains a backup. Publication is automated by [the hosting repository](https://github.com/rupayon123/rupayon123.github.io). See [search visibility guidance](docs/search-visibility.md).

## Accounts

Supabase is optional for public browsing. To connect account features, configure:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Use `npm run supabase:check` to check the connection. Keep service-role keys, passwords, OAuth secrets, and deployment tokens out of the repository. Admin permissions must be enforced by database rules.

## Opportunity data

Listings come from public library, community, nonprofit, conservation, and education sources. Public search includes active listings with current or future dates. Expired and unreviewed finds stay out of the public results.

The [refresh workflow](.github/workflows/refresh-opportunities.yml) collects updates, checks source health, and runs QA and build checks before committing listing data. The native apps read the exported public feed in `public/opportunities.json`.

```bash
npm run discover
npm run discover:summary
npm run discover:sql
npm run generate:library
```

Generated translations are browsing summaries, not fully reviewed translations of every provider's content.

## Project layout

- `app/`: routes and pages.
- `components/`: interface components.
- `lib/`: search, filters, data types, and Supabase client.
- `scripts/`: feed refresh and build tools.
- `supabase/`: database schema.
- `public/`: feed and static assets.
- `docs/`: setup and deployment notes.

## Privacy and support

Location is optional and session-only. The public support flow is public, so don't include private or sensitive information. Under-13 account storage should remain disabled until a parent-consent flow is in place.

[Privacy policy](https://gta-free-stem.pages.dev/privacy/) | [Terms](https://gta-free-stem.pages.dev/terms/) | [Support](https://gta-free-stem.pages.dev/support/)

## Make it work for your city

Fork the project, replace the regions and source list, update the site metadata, and deploy the static export. Connect Supabase if you need accounts or admin review.

## License

[MIT](LICENSE) for the site's source and documentation. Program descriptions and third-party names and materials belong to their respective owners.
