# Security And Privacy Notes

- Browsing does not require an account.
- Saves, feedback identity, missing-program ownership, and account deletion require an authenticated user.
- Admin review is web-only and guarded by `users.role = admin`.
- API bearer tokens are stored as SHA-256 digests, not raw tokens.
- Security headers are set for frame protection, content sniffing, referrer policy, and browser permissions.
- A Content Security Policy limits scripts and connections to the app and HTTPS sources.
- No ads, paid ranking, direct messaging, child date-of-birth collection, or tutoring marketplace features are included.

Before production cutover:

- Move auth to audited OAuth flows for Apple, Google, and Microsoft.
- Add bot protection to public submission endpoints if abuse appears.
- Add provider review logs and admin audit views.
- Run Brakeman, bundle audit, Rails tests, TypeScript checks, QA checks, and production builds before every website release.
