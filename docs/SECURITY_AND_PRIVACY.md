# Security And Privacy Notes

- Browsing does not require an account.
- The current static production deployment has no configured online account database. Browser-local preferences and forms stay in that browser and can be removed by clearing site data.
- GitHub, jsDelivr, Vercel, and OpenFreeMap receive limited network request data needed to deliver their services; the public Privacy Policy documents provider-controlled use, retention, and rights channels.
- Supabase-backed accounts, cloud saves, feedback, and submissions must remain disabled until the production privacy policy, consent flow, account deletion, retention rules, and App Store disclosures are updated and verified.
- Admin review is web-only and guarded by `users.role = admin`.
- API bearer tokens are stored as SHA-256 digests, not raw tokens.
- Security headers are set for frame protection, content sniffing, referrer policy, and browser permissions.
- A Content Security Policy limits scripts and connections to the app and HTTPS sources.
- No ads, paid ranking, direct messaging, child date-of-birth collection, or tutoring marketplace features are included.
- Public policy source: `app/privacy/page.tsx`.
- Public terms source: `app/terms/page.tsx`.
- Public support source: `app/support/page.tsx`; the GitHub ticket route is public and must not receive sensitive information. App Store release stays blocked until the owner sets a dedicated monitored `NEXT_PUBLIC_SUPPORT_EMAIL` and verifies the rendered direct contact on the production page.

Before production cutover:

- Move auth to audited OAuth flows for Apple, Google, and Microsoft.
- Add bot protection to public submission endpoints if abuse appears.
- Add provider review logs and admin audit views.
- Run Brakeman, bundle audit, Rails tests, TypeScript checks, QA checks, and production builds before every website release.
