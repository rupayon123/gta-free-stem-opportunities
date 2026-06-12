# Apple Developer Resources Checklist

## Local Status

- Xcode is installed.
- TestFlight app is installed.
- Signing is not ready yet: this Mac had no local signing identities or provisioning profiles during setup.

## App Identity

- App name: `GTA FREE STEM`
- Bundle identifier: `com.rupayonhaldar.gtafreestem`
- Team: select the Apple Developer Program team in Xcode.

## Capabilities

- Sign in with Apple for iOS auth.
- Associated Domains later when the Rails production domain is final.
- Push Notifications later only if reminders are added.

## TestFlight Path

1. Open `apps/ios/GTAFreeSTEM.xcodeproj`.
2. Select the Apple Developer team.
3. Fix signing in Xcode.
4. Run on Simulator.
5. Archive locally.
6. Upload to App Store Connect.
7. Use internal TestFlight first.
8. Add privacy policy, support URL, account deletion URL, screenshots, age rating, and privacy labels before external testing.

## Xcode Cloud

Use the included 25 compute hours/month carefully:

- Build only `main`, release branches, and manual TestFlight builds.
- Avoid running heavy UI test suites on every small branch.
- Keep Rails/backend CI in GitHub Actions instead of Xcode Cloud.
