# City map production-build checks — October 29, 2026

These unretouched screenshots show a locally served production export, before publication. They do not replace the dated public-release images elsewhere in this folder.

- [Desktop overview, 1280 × 900](production-desktop.png)
- [Narrow controls, 320 × 844](production-320.png)
- [Dark mobile overview, 390 × 844](production-390-dark.png)

The default Venues view displays every usable physical venue coordinate. Program groups and the location selector expose program counts and individual activities. The selector and grouped markers provide keyboard-accessible controls alongside the small visual dots. Programs sharing coordinates retain their original individual addresses. Online or unmapped activities remain available in List.

Fresh checks passed: coordinate-group tests, TypeScript, production export (7,774 pages), 103/103 venue dots within canvas bounds at 320/390/1280 widths with no horizontal document overflow; 3D neighbourhood and flat overview reset; actual dot selection; repeated Aaniin (273) and Agincourt (93) selection; Escape restores marker focus; program details; empty-search removal and recovery; live dark theme switch. Result counts are a dated snapshot of the source catalogue.

Limits: the in-app browser did not apply the requested zoom shortcut, so 200% text zoom was not verified. Reduced-motion camera handling was reviewed in source but not emulated in this run. The external basemap emitted a missing circle-11 sprite warning during a theme change; venue dots, chooser and program details remained functional. Public-host verification remains a publication step.
