# Security Policy

## Supported Branch

Security fixes are accepted against the `main` branch.

## Reporting A Vulnerability

Please do not open a public issue for account, authentication, credential, or data-access vulnerabilities.

Email the maintainer or use a private GitHub security advisory if available. Include:

- a short summary of the issue
- steps to reproduce
- affected files, routes, or database tables
- whether any real user data or credentials may be exposed

## Public Repo Safety Rules

- Never commit `.env`, `.env.*`, Supabase service-role keys, deploy tokens, private API keys, OAuth secrets, or database passwords.
- Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` belong in public client builds.
- Keep Supabase Row Level Security enabled on every production table.
- Assign admin users through trusted database operations, not client-side form fields.
- Treat local demo accounts as local preview data only. They must not be used for production access.
- Rotate any credential immediately if it is ever committed, pasted into an issue, or shared in a screenshot.

## Deployment Notes

This project is designed for static hosting. Public browsing should keep working without accounts, while saves, feedback, submissions, and admin review require a properly configured Supabase project.
