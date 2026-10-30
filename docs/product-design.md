# GTA Free STEM product direction

## Audience and purpose

Help children, parents, teens and lifelong learners find real free activities in the Greater Toronto Area. Keep the GTA science identity, visible search/filter controls, source links and anonymous saving. Playfulness must support discovery rather than create a game visitors must learn first.

## Approved visual system — October 29, 2026

The approved iOS v3 direction supersedes the former cream/Fredoka neighbourhood concept. Use locally served variable Nunito for headings and body, cool opaque canvas (#f4f8fd light, #14253a dark), white/slate surfaces, teal primary actions and readable 1.5px borders. The original 19-role GTA artwork supplies separate compact/illustration and light/dark SVGs. Keep labels visible; artwork is decorative.

Home introduces topics and offers saved activities and named-filter shortcuts. Browse owns query, city, age and category filters and opens with the citywide venue map. Preserve 2D/3D/reset, venue selection, List, full provider descriptions and the original logo/science orbit. Existing bounded spring/tactile feedback remains reduced-motion aware; new topic links lift slightly on fine-pointer hover. Do not replace the identity with external mascots or generic glass cards.

Named filters stay in this browser. Selecting applies criteria immediately; only Save/Update writes changes. Clear filters resets the current search and detaches selection; Delete filter removes only that saved record. No account sync, automatic alerts or new-result badges are implied. High School currently retains its age/filter discovery; a meaningful volunteering/teen hub is a separate upcoming stage.

The previous cream canvas, Fredoka/Nunito Sans and compass-led curiosity picker are historical, not the current design target. See dated captures in `docs/showcase` for their actual release evidence.

## Shared implementation boundaries

- Full Stack - GTA app coordinates source integration, hosting, public verification and platform sequencing.
- Front end - GTA app owns this website parity implementation and actual visual/interaction checks, coordinated with Full Stack.
- Back end - GTA App owns data acceptance, cache/refresh races, feed-size limits and failure-retention tests.

Keep all operation free. No payment, paid plan, tracking service, new account requirement or child profile is needed. Do not equate a website test, simulator build or accepted HTTP response with a physical-device/store-release signoff. Do not fabricate content-rights evidence to satisfy a gate.

## Resource review

Reviewed live October25,2026, including the 21st.dev community catalogue. The 21st reference informed clear interaction affordances; no registry component was imported.

| Resource | Decision |
| --- | --- |
| [Motion](https://github.com/motiondivision/motion) | MIT; maintained React animation option. Existing bounded CSS/WAAPI is enough for the website interactions, avoiding another runtime. |
| [React Bits](https://github.com/DavidHDev/react-bits) | MIT plus Commons Clause, not plain MIT. Retain notices for the already adapted targeted save/press effects; do not import unrelated effects or its paid tools. |
| [Hairline](https://github.com/lucasmarkes/hairline) | MIT line-figure reference; native frontend adapts its loupe for native drawing. The website compass uses an adapted instance-local spring clock with capped frame work and no idle loop; its scene geometry is original. |
| [Rive runtime](https://github.com/rive-app/rive-runtime) | MIT runtime option for complex shared state-machine assets. No new Rive/editor account, paid tool or WASM runtime is needed for the current design. |

Exact repository review revisions are recorded in the task outputs/product-finish-github-research.json. Third-party source notices remain in FRONTEND_ASSET_ATTRIBUTION.md.

## Product acceptance

Check light/dark and narrow/wide layouts, keyboard and touch controls, long labels and RTL, no-JavaScript progressive form behavior, reduced-motion changes, real source links, map/list/details, save/remove/reload, malformed or unavailable storage, slow/failed catalogues, worker failure and stale search replies, rapid interactions, current expiry filters, offline/cache behavior and native feed bounds. Measure the real production homepage payload after separating catalogue loading from landing controls. Verify each native surface independently with fresh screenshots and functional evidence.
