# City map production-build checks — October 29, 2026

These unretouched screenshots show a locally served production export, before publication. They do not replace the dated public-release images elsewhere in this folder.

- [Desktop overview, 1280 × 900](production-desktop.png)
- [Narrow controls, 320 × 844](production-320.png)
- [Dark mobile overview, 390 × 844](production-390-dark.png)

The default Venues view displays every usable physical venue coordinate. Program groups and the location selector expose program counts and individual activities. The selector and grouped markers provide keyboard-accessible controls alongside the small visual dots. Programs sharing coordinates retain their original individual addresses. Online or unmapped activities remain available in List.

Fresh checks passed: coordinate-group tests, TypeScript, production export (7,774 pages), 103/103 venue dots within canvas bounds at 320/390/1280 widths with no horizontal document overflow; 3D neighbourhood and flat overview reset; actual dot selection; repeated Aaniin (273) and Agincourt (93) selection; Escape restores marker focus; program details; empty-search removal and recovery; live dark theme switch. Result counts are a dated snapshot of the source catalogue.

## Additional accessibility runtime checks

An isolated headless Google Chrome context used Playwright with `reducedMotion: 'reduce'`. The browser reported that media preference active; the compass reached its full 55-degree pitch and 20-degree rotation within 100 ms of clicking 3D, rather than the normal 400 ms camera transition. [3D frame](reduced-motion-3d.png).

The in-app browser did not apply genuine browser zoom. A separate, explicitly labelled **200% text-size simulation** doubled each existing map element's original computed font size once, after opening the program panel. This is not browser zoom. At 390 pixels, document width stayed 390 pixels; map controls and the 273-program chooser remained usable and readable without horizontal overflow. The title/address wrapped and the program list remained scrollable. [Controls](text-size-simulation-panel-200.png), [panel](text-size-simulation-panel-200.png), [runtime measurements](accessibility-runtime.txt).

## External basemap warnings

OpenFreeMap styles requested sprite symbols absent from the loaded sprite catalogue: `circle-11` after a dark-theme change, and `bicycle_parking`, `gate`, `multi`, or `swimming_pool` in the isolated 3D run. These are external basemap point-of-interest symbols; this map's venue dots and grouped markers are independent DOM elements. Missing background symbols are a visible limitation of the external style, not missing programme coordinates. Map/venue selection and details stayed functional, with no map-load fallback. The upstream style also warned about null road-shield filter values and used its documented false fallback. Software-rendered Chrome reported GPU readback performance warnings during screenshots.

There was no existing application sprite fallback to reuse. No generic invented POI icons were substituted and no warnings were suppressed. Genuine browser zoom and public-host verification remain separate checks. These locally captured images do not prove publication.
