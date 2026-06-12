# Legacy Next.js Static Site

The current public website remains at the repository root and stays live until the Rails platform is fully verified and deployed.

This folder records the migration boundary:

- Root application: existing Next.js static export on Vercel.
- `apps/web-rails`: new Rails web/backend platform.
- `apps/ios`: new SwiftUI TestFlight MVP.

Do not remove or replace the root app until the Rails production release is proven better through tests, accessibility checks, SEO checks, and live deployment verification.
