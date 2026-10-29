# Deployment

Reviewed against the active workflows and public site on October 28, 2026.

## Active public hosts

- Primary: <https://gta-free-stem.pages.dev/>
- Backup: <https://rupayon123.github.io/>
- Application source and native feed: [gta-free-stem-opportunities](https://github.com/rupayon123/gta-free-stem-opportunities).
- Publication workflow and verification records: [rupayon123.github.io](https://github.com/rupayon123/rupayon123.github.io).

The site is a static `out/` export. Publication uses the existing Cloudflare Pages
project `gta-free-stem` and GitHub Pages backup; no server needs to keep running
on the developer's computer. Use the existing accounts, credentials, and free
hostnames. This workflow does not require a card, paid runner, purchased domain,
new hosting account, or Supabase signup.

Browser saves belong to each website origin. Saves on the backup do not
automatically transfer to the primary, and neither host creates an online account.

## Refresh and publication are separate workflows

1. The application's [source refresh](../.github/workflows/refresh-opportunities.yml)
   is scheduled at minute **17 every six hours**, in UTC. It collects source data,
   checks health and publication bounds, runs QA and a static build, and commits
   accepted generated changes. A failed refresh retains the accepted data.
2. The hosting repository's [Publish free GTA website workflow](https://github.com/rupayon123/rupayon123.github.io/blob/main/.github/workflows/publish.yml)
   is scheduled at minute **47 every six hours**, in UTC. It checks out application
   `main` and compares its commit with both public hosts. If either host differs,
   it uses Node 22, `npm ci`, the production dependency audit, `npm run qa`, and
   `npm run build:github-pages` to build the accepted source.
3. The hosting workflow supplies `GTA_SOURCE_COMMIT` to the build, publishes to
   Cloudflare with the existing deployment secret, verifies the primary source
   receipt, then publishes the same static output to GitHub Pages. It verifies
   both hosts and records their source and feed digests. If both already match,
   it skips rebuilding and still verifies the existing publication.

Scheduled times are not a delivery-time guarantee: Actions queues, source
collection, build time, and hosting propagation can delay completion. A successful
collector run alone does not prove a new website is live. Neither workflow
creates accepted full-description translations; 18 interface languages are a
separate capability.

### Free-runner guard

Keep both repositories public and use the existing standard `ubuntu-latest`
GitHub-hosted runners. Confirm visibility and runner configuration before an
operational dispatch or workflow change. [GitHub's billing guidance](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
distinguishes free standard-runner usage in public repositories from paid larger
runners and separately billed storage. Do not replace this route with a private
repository, paid larger runner, or new paid service. The current workflow deletes
its temporary Pages upload after the deployment attempt; do not add persistent
artifact retention or a new background job for publication.

### Manual use of the existing publication workflow

For an authorized application change that needs publication before the next
scheduled check, use the existing workflow rather than a new hosting project:

```bash
gh workflow run publish.yml --repo rupayon123/rupayon123.github.io --ref main
gh run list --repo rupayon123/rupayon123.github.io --workflow publish.yml --limit 5
```

Review the actual run and its public verification result. Avoid duplicate
in-flight dispatches. Documentation-only corrections can wait for the scheduled
workflow; do not initiate a deployment solely to update this guide.

## Verify what visitors receive

The public receipt on **each** host is `/hosting-release.json`. Compare
`sourceCommit`, `nativeFeedSha256`, and `nativeFeedRecords`, then download that
host's `/opportunities.json` and verify its bytes and record count against the
receipt. The native feed's existing 10 MB and record bounds remain enforced;
website builders verify accepted bytes and do not mint source publication revisions.

The hosting repository's [scripts/record-publication.py](https://github.com/rupayon123/rupayon123.github.io/blob/main/scripts/record-publication.py)
implements the bounded two-host checks. Its retained record is
[`last-verified-publication.json` in the hosting repository](https://github.com/rupayon123/rupayon123.github.io/blob/main/last-verified-publication.json),
not `/hosting-last-verified-publication.json` on the public website. The record
includes the verification date, workflow run, source commit, and both hosts'
matching feed digests. Do not treat an old local copy as current verification.

A later scheduled data commit may legitimately replace a reviewed application
commit in these receipts. Confirm that the new commit contains the accepted fix,
inspect the intervening changes, and verify the current host/feed pair. Do not
redeploy an older data snapshot just to recover an old source SHA.

For search behavior, wait until `.oe-explorer` reports
`data-library-status="ready"` and `data-searching="false"`, with a rendered result
count. The initial native-sized catalogue is not the settled expanded catalogue.
Compare ordinary and legacy `programLanguage=ja` URLs: the legacy parameter must
be removed without hiding listings or changing display language and supported
filters. Check mobile map/list behavior and uncaught page errors separately;
a matching feed digest alone does not prove the browser interaction works.

## Local verification and older open pages

Use the locked npm dependencies. Run `npm run typecheck`, `npm run qa`, and
`npm run build:github-pages` before publication. The Pages build prepares portable
trailing-slash HTML, removes unused client-navigation payloads, and verifies
sitemap/canonical metadata. `out/` is generated output, not a replacement source.

The startup-recovery script handles missing Next.js assets with a bounded reload
and an accessible manual retry while retaining the URL and browser saves. It
cannot repair an offline connection or guarantee retention of old assets. Verify
normal loading and recovery when changing asset delivery. Temporary local
servers are development tools only and must be stopped after review.

## Support contact and native public-release gates

The public routes are:

- Support: <https://gta-free-stem.pages.dev/support/>
- Privacy: <https://gta-free-stem.pages.dev/privacy/>
- Terms: <https://gta-free-stem.pages.dev/terms/>
- Accessibility guide: <https://gta-free-stem.pages.dev/accessibility-support/>

The Support page links to the existing public GitHub issue template. Tickets are
public; use them only for non-sensitive requests. Before relying on this route,
check repository Issues, the template, and publisher notification handling. The
accessibility guide is not a replacement for the Support contact route.

`lib/legal.ts` reads `NEXT_PUBLIC_SUPPORT_EMAIL` **at build time**. The Support
page renders a direct `mailto:` link only when this value exists. At this review,
the live page has no direct email and explicitly reports its public App Store
contact gate as blocked. Do not invent or publish a personal address or treat
browser-local forms as delivered support requests.

For a later approved contact setup, the publisher must choose a dedicated
monitored public support email. Wire that public value into the **Build within
free hosting limits** step's environment in the existing hosting workflow, for
example from a repository Actions variable named `NEXT_PUBLIC_SUPPORT_EMAIL`,
then rebuild through that workflow. The current workflow does not yet read that
variable: setting a variable alone, or adding a runtime variable in the Cloudflare
dashboard after the prebuilt export is uploaded, will not change the static page.
This guide does not configure an address or change the workflow.

Before a native public release, verify the rendered support contact, legal content
and effective dates, as well as the native release checks. Successful web
publication does not resolve the separate full-provider-description translation
gate or establish App Store/Play approval. Do not turn an App Store-specific
contact requirement into an invented internal-Play upload gate.

## Retained legacy configuration and inactive account backend

`vercel.ts`, `.vercelignore`, and `VERCEL_URL` asset-origin compatibility remain
in the repository for the earlier Vercel route. They are not instructions for
the active Cloudflare/GitHub publication. The old Vercel hostname and deployment
protection settings are not the current public release target. Do not delete
those files as part of a documentation correction.

`hosting/static-vercel.json` is still an input to the current static packaging
and content-security-policy preparation despite its filename. Do not classify
it as unused or remove it without tracing the build scripts.

Supabase schema/client files and optional environment-variable support are
retained, but the deployed public directory does not require an active Supabase
account database. Account/cloud-save/submission deployment would be separate
work requiring source, access-rule, privacy, consent, and deletion-flow review.
Do not create a Supabase project, expose service-role credentials, or change
those inactive settings to publish the existing static site.
