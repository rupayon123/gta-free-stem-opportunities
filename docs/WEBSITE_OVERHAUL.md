# Website overhaul — October 22, 2026

## Outcome

Bring the public website into the same visual family as the native app, restore current opportunities, and make the first visit useful without an account.

## Design thesis

Follow the user's selected third concept: a warm-white and pale-mint science workspace, navy rounded headings, lake teal actions, restrained amber highlights, the illustrated GTA logo, and a Toronto/science collage. A visible search leads into interests, location, a real map, and actual opportunity results. Self-hosted fonts and original artwork carry the character; clear dates, eligibility and original sources carry the decisions. The website is for GTA students, families, educators, and community hosts.

## Acceptance criteria

- Browse, search, and filter current source-backed opportunities without signup.
- Show schedule, eligibility, provider, verification date, and original source before registration.
- Save and remove listings locally; reopen the saved collection after a page reload.
- Make category and query links shareable, and provide clear empty and error states.
- Support phone, tablet, desktop, dark mode, keyboard navigation, reduced motion, long text, and the existing multilingual controls.
- Preserve public support, privacy and terms routes; avoid browser-local forms that pretend to deliver submissions.
- Keep the existing Next.js static-export deployment and zero-cost hosting path.
- Pass production dependency audit, typecheck, existing data QA, production build, and browser checks.

## Upstream research

- [React Aria](https://github.com/adobe/react-spectrum): Apache 2.0; useful option for future complex accessible controls. Native elements suffice for this pass.
- [shadcn/ui](https://github.com/shadcn-ui/ui): MIT; useful composition patterns, but its default appearance and Tailwind dependency are unnecessary here.
- [Lucide](https://github.com/lucide-icons/lucide): existing consistent icon family retained; ISC with inherited MIT notices.
- [cmdk](https://github.com/dip/cmdk): MIT; deferred because visible search serves first-time visitors better.
- [21st compound search](https://21st.dev/@cnippet-dev/components/v-group-18): live source inspected; adapted the search/category composition without adding its registry dependencies.
- [21st removable filters](https://21st.dev/@serafimcloud/components/filter-badge/pill): reference for applied-filter visibility; implemented with existing dependencies.
- [21st task filters](https://21st.dev/@preetsuthar17/components/task-filters): listing available but linked upstream page returned 404; visual reference only.

The frontend also uses bounded motion informed by the user-requested [React Bits](https://github.com/DavidHDev/react-bits) ClickSpark and [Motion Anything](https://github.com/nexu-io/motion-anything). See [asset and code attribution](FRONTEND_ASSET_ATTRIBUTION.md) for exact provenance and licenses. The search and filter references did not introduce registry dependencies. Original styles retain the app's DesignSystem.swift color family.

## Reliability findings

The scheduled refresh stopped before ingestion because the production dependency audit failed. Repository main had a September 30 snapshot while the public Vercel site still served an August 6 snapshot. Compatible patched dependencies restore the local audit gate; source refresh must still pass the original source-health thresholds, and the successful output must actually reach the public deployment. Discovery candidates require review rather than automatic publication. Date and verification checks apply to generated records as well as hand-curated entries.

The October 22 local refresh checked all 24 library pages successfully and produced 107 public records from Toronto and Markham. Discovery candidates remain separate review inputs. These counts are a dated snapshot, not a promise of permanent availability or full GTA coverage.

The first Git deployment request exposed another existing blocker: the root `vercel.json` retained the unsupported `public` property. Vercel rejected the request before building. That property is removed; website access remains controlled by the existing public project's deployment-protection settings.

## Release boundary

Implementation and verification occur in an isolated checkout, preserving the existing checkout's unrelated uncommitted work. The user explicitly authorized remaining tests, publication and live hunting recovery in the cooperating backend chat on October 22. Release verification must target the public `gta-free-stem` Vercel project and compare its feed with the refreshed GitHub output. The separate Rails foundation needs its Ruby/PostGIS CI; a static website build does not validate a deployed Rails service. Local preview servers are development checks only and must be stopped before handoff.

The backend release branch passed [Rails foundation CI](https://github.com/rupayon123/gta-free-stem-opportunities/actions/runs/39854452255) at `dfb18c94af5c5f3f47006c74c52915c5a0b96d56`: PostGIS database preparation, 31 tests / 195 assertions, the gem and importmap vulnerability audits, and Brakeman 8.1.0 with no security warnings. All 20 backend/workflow files in the combined checkout were independently compared byte-for-byte with that tested commit. This validates the Rails source in CI; the website remains a static export and does not deploy that Rails service.

The existing `verify:legal` package command references a script absent from repository main. That pre-existing release-check gap must be reported; ordinary website checks do not constitute native app-store or legal release signoff.
