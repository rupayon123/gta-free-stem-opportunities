export const legalConfig = {
  appDisplayName: "GTA FREE STEM Opportunities",
  publisherName: "Rupayon Haldar",
  publisherRegion: "Ontario, Canada",
  currentAppleRelease: "1.0 (12)",
  effectiveDate: "August 6, 2026",
  effectiveDateIso: "2026-08-06",
  siteUrl: "https://gta-free-stem.vercel.app",
  privacyUrl: "https://gta-free-stem.vercel.app/privacy/",
  termsUrl: "https://gta-free-stem.vercel.app/terms/",
  supportUrl: "https://gta-free-stem.vercel.app/support/",
  sourceUrl: "https://github.com/rupayon123/gta-free-stem-opportunities",
  supportIssueUrl:
    "https://github.com/rupayon123/gta-free-stem-opportunities/issues/new?template=support.yml",
  supportContactEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() ?? "",
  appleStandardEulaUrl: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
} as const;
