export const legalConfig = {
  appDisplayName: "GTA FREE STEM Opportunities",
  publisherName: "Rupayon Haldar",
  publisherRegion: "Ontario, Canada",
  currentAppleRelease: "1.0 (12)",
  effectiveDate: "August 6, 2026",
  effectiveDateIso: "2026-08-06",
  siteUrl: "https://rupayon123.github.io",
  privacyUrl: "https://rupayon123.github.io/privacy/",
  termsUrl: "https://rupayon123.github.io/terms/",
  supportUrl: "https://rupayon123.github.io/support/",
  sourceUrl: "https://github.com/rupayon123/gta-free-stem-opportunities",
  supportIssueUrl:
    "https://github.com/rupayon123/gta-free-stem-opportunities/issues/new?template=support.yml",
  supportContactEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() ?? "",
  appleStandardEulaUrl: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
} as const;
