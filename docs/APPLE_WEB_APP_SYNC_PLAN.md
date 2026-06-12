# Apple Web And App Sync Plan

GTA FREE STEM uses Apple resources where they genuinely help, while keeping the public website accessible from any browser and hosted at zero cost.

## What Apple Helps With

- SwiftUI iOS app design, TestFlight, Xcode Cloud, App Store Connect, screenshots, crash logs, and Apple accessibility tooling.
- Apple-style product direction: readable hierarchy, rounded surfaces, clear navigation, motion with restraint, strong light/dark themes, Dynamic Type thinking, and Liquid Glass-inspired polish for native app screens.
- Sign in with Apple for the iOS app and optional web login when the production auth stack is ready.
- MapKit in the native app for maps, distance, and directions.

## What Apple Does Not Replace

- Apple Developer membership does not provide a normal free public website host.
- Xcode is not the right tool for building the public website itself.
- iPhones cannot run a reliable 24/7 web crawler in the background.

## Shared Engine Contract

The search hunting engine stays backend/static-data driven:

1. GitHub Actions refreshes public GTA sources every few hours.
2. Expired listings are hidden from public search.
3. The static website reads generated TypeScript data.
4. The app can fetch the same data from `https://gta-free-stem.vercel.app/opportunities.json`.

This keeps app and website separate, but makes them share one clean opportunity feed.

## Future Apple-Facing Enhancements

- Add Sign in with Apple when Supabase/Auth production settings are finalized.
- Add Apple Maps / MapKit-style UI to the native app first.
- Keep the website visually aligned with Apple-inspired principles without making it Apple-only.
- Use TestFlight feedback to improve the shared search/filter model before App Store release.
