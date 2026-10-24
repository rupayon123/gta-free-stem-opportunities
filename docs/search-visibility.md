# Search visibility and site identity

Canonical website: https://gta-free-stem.pages.dev/

The application layout, search/filter behavior, source collectors and original native raw GitHub/CDN feed addresses are unchanged by search metadata work.

## Publication checks

`npm run build:github-pages` produces a trailing-slash static export, packages it within free hosting limits and runs `npm run verify:search-indexing`. The indexing gate checks every sitemap page for its unique canonical, title, crawl permission and valid embedded structured data; it also checks the branded WebSite identity, public robots declaration and unchanged Google verification file. It does not claim a Google ranking score or real-user Core Web Vitals results.

Keep the static Google verification file. Verify the current canonical origin in Search Console, submit its sitemap, and use permanent redirects for previous public website addresses. A submitted sitemap and valid markup do not guarantee indexing, rankings or immediate removal of older URLs from search results.

## Reviewed helper

The user recalled a Claude/Codex SEO toolkit. A strong current candidate is [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo), MIT licensed. Its [technical audit checklist at commit6be93f45064ffbadced572b5d5c95f55fd263af0](https://github.com/AgriciDaniel/claude-seo/blob/6be93f45064ffbadced572b5d5c95f55fd263af0/skills/seo-technical/SKILL.md) informed these measured checks. Identification of the remembered repository remains uncertain. Only the relevant technical checklist was used; no global installer, paid data extension, referral footer or new analytics was added.

Primary guidance:
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- https://developers.google.com/search/docs/crawling-indexing/301-redirects
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/essentials
