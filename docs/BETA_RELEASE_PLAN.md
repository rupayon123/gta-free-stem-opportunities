# Beta Release Plan

## Beta Scope

- Website only.
- Static Next.js export.
- Public browsing does not require an account.
- Accounts are only for saves, feedback, missing-program submissions, and admin review.
- No paid services, native app features, SMS, WhatsApp, Apple Wallet, or AI in beta.

## Release Checklist

1. Run `npm run typecheck`.
2. Run `npm run qa`.
3. Run `npm run build`.
4. Create or update the private GitHub repo.
5. Connect the repo to Vercel Hobby or Cloudflare Pages Free.
6. Add Supabase public env vars to the hosting provider.
7. Deploy production.
8. Verify signed-out browsing, filters, dark mode, language switching, and mobile layout.
9. Verify signed-out Save opens the account prompt.
10. Verify Supabase sign-up sends email verification.
11. Verify signed-in save/unsave and saved dashboard.
12. Verify feedback and missing-program submissions.
13. Verify admin review after assigning the first admin in Supabase.

## Public Listing Rule

Public search only shows opportunities with `status = active` and a current/future date window. Expired, hidden, and needs-review listings stay out of visitor search and belong in admin review.

## Data Promise

Use this public wording during beta:

> Verified and growing toward full GTA coverage.

Do not claim complete GTA coverage until coverage metrics prove it.
