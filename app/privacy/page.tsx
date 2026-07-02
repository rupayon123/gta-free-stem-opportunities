import { metadataForPage } from "../seoPages";

export const metadata = metadataForPage("privacy");

const updated = "July 2, 2026";
const updatedIso = "2026-07-02";

const sections = [
  {
    title: "Public Browsing",
    body:
      "You can browse free STEM opportunity listings without creating an account. The public feed includes program details such as title, organization, city, age range, dates, source links, category, tags, and accessibility-related notes when available from public sources."
  },
  {
    title: "Location",
    body:
      "Nearby search is optional. When you choose to use your location, the website or iOS app uses it to sort or filter opportunities near you. GTA FREE STEM does not need continuous background location tracking for public browsing."
  },
  {
    title: "Local Storage And Cache",
    body:
      "The website and app may store settings, language preference, theme preference, saved searches, saved listing identifiers, seen listing identifiers, and cached public opportunity data on your device so the experience is faster and still useful when the network is unavailable."
  },
  {
    title: "Accounts, Feedback, And Submissions",
    body:
      "Accounts are not required for public browsing. If account, save, feedback, missing-opportunity submission, or account-deletion features are enabled, the information you enter may be used to provide those features, review submissions, respond to feedback, and maintain the opportunity directory."
  },
  {
    title: "Provider Links",
    body:
      "Opportunity listings link to external provider websites for registration and official details. Those providers have their own privacy practices, terms, accessibility support, and registration requirements."
  },
  {
    title: "Tracking And Advertising",
    body:
      "GTA FREE STEM is built without third-party advertising or cross-app tracking. If analytics, diagnostics, or production account services are added later, this policy and App Store privacy answers should be updated before release."
  },
  {
    title: "Contact And Updates",
    body:
      "Use the support page to report incorrect listings, accessibility issues, privacy questions, or missing opportunity information. This policy should be reviewed before every public app release and whenever the backend data flow changes."
  }
];

export default function PrivacyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    name: "GTA FREE STEM Opportunities Privacy Policy",
    url: "https://gta-free-stem.vercel.app/privacy/",
    dateModified: updatedIso,
    isPartOf: {
      "@type": "WebSite",
      name: "GTA FREE STEM Opportunities",
      url: "https://gta-free-stem.vercel.app"
    }
  };

  return (
    <main className="seo-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <section className="seo-hero" aria-labelledby="privacy-title">
        <p className="beta-pill">GTA FREE STEM Opportunities</p>
        <h1 id="privacy-title">Privacy policy</h1>
        <p>
          Public browsing stays open without an account. Optional account, save, feedback, and submission features use
          only the information needed to provide those features.
        </p>
        <p>Last updated: {updated}</p>
        <div className="hero-actions">
          <a className="primary-button" href="/">
            Open the live search
          </a>
          <a className="soft-button" href="/accessibility-support/">
            Accessibility support
          </a>
        </div>
      </section>
      <section className="seo-content" aria-label="Privacy policy details">
        {sections.map((section) => (
          <article key={section.title}>
            <strong>{section.title}</strong>
            <p>{section.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
