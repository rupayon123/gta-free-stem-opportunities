# GTA Free STEM product direction

## Audience and purpose

Help children, parents, teens and lifelong learners find real free activities in the Greater Toronto Area. Keep the GTA science identity, visible search/filter controls, source links and anonymous saving. Playfulness must support discovery rather than create a game visitors must learn first.

## Visual thesis

A friendly neighbourhood discovery guide: warm opaque cream, clean white paper, navy ink, teal actions and small sunny-yellow signals. Fredoka headings and Nunito Sans body text remain locally served. Larger metadata and clearer control boundaries improve reading for all ages. Use coloured chapter surfaces instead of glass, pale outline grids and repeated floating shadows.

The original DiscoveryScene SVG combines a Toronto tower, library, tree, book and small compass explorer. Its compass responds to the actual selected topic. Curiosity choices populate the real search input without changing city, age or category. Pick for me selects another real topic; it grants no imaginary points or reward pressure. All enhancement movement is bounded and responds to reduced-motion preferences; there is no continuous idle loop or sound.

## Shared implementation boundaries

- Full Stack - GTA app owns website UI, source integration, hosting and public verification.
- Front end - GTA app owns native iOS/Android views, native animation, builds and simulator/emulator tests.
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
