import { LegalFooter } from "@/components/LegalFooter";
import { StorybookMark } from "@/components/StorybookMark";
import { legalConfig } from "@/lib/legal";
import { metadataForPage } from "../seoPages";

export const metadata = metadataForPage("terms");

export default function TermsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${legalConfig.appDisplayName} Terms of Use`,
    url: legalConfig.termsUrl,
    dateModified: legalConfig.effectiveDateIso,
    publisher: {
      "@type": "Person",
      name: legalConfig.publisherName,
      address: legalConfig.publisherRegion
    }
  };

  return (
    <main className="seo-page legal-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="seo-hero" aria-labelledby="terms-title">
        <a className="seo-logo-link" href="/" aria-label="Open GTA FREE STEM Opportunities">
          <StorybookMark className="seo-storybook-mark" compact ariaHidden />
        </a>
        <p className="beta-pill">Clear rules for a free public service</p>
        <h1 id="terms-title">Terms of Use</h1>
        <p>
          These terms govern the GTA FREE STEM service and public opportunity directory. The Apple app licence is
          separately governed by Apple's Standard EULA.
        </p>
        <p>
          Effective: {legalConfig.effectiveDate} · Publisher: {legalConfig.publisherName}, {legalConfig.publisherRegion}
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="/privacy/">
            Privacy Policy
          </a>
          <a className="soft-button" href="/support/">
            Support
          </a>
        </div>
      </section>

      <article className="legal-document" aria-label="Full terms of use">
        <section>
          <h2>1. Agreement and scope</h2>
          <p>
            By using GTA FREE STEM Opportunities (the “Service”), you agree to these Terms of Use. If you do not
            agree, do not use the Service. The Service includes the public website and the iPhone, iPad, Mac, and
            Apple Watch apps published by {legalConfig.publisherName}. These terms govern the directory and content
            service; they do not replace mandatory consumer rights.
          </p>
        </section>

        <section>
          <h2>2. Apple app licence</h2>
          <p>
            Apps obtained through Apple's App Store are licensed, not sold. No custom end-user licence agreement is
            offered for GTA FREE STEM release {legalConfig.currentAppleRelease}; the{" "}
            <a href={legalConfig.appleStandardEulaUrl}>Apple Standard EULA</a> governs the app licence. Apple is not
            responsible for operating the GTA FREE STEM directory, its listings, or publisher support. These Terms
            govern use of the Service's content and features in addition to that licence. If there is a conflict about
            the app licence, the Apple Standard EULA controls.
          </p>
        </section>

        <section>
          <h2>3. Students, children, and guardians</h2>
          <p>
            The Service is for students, families, caregivers, educators, and community groups. Anyone who cannot
            legally agree to these terms must use the Service with permission and supervision from a parent or legal
            guardian. A guardian should review external provider requirements, permissions, travel, supervision,
            safety, and any personal-information request before a child registers for a program.
          </p>
        </section>

        <section>
          <h2>4. What the Service provides</h2>
          <p>
            GTA FREE STEM is a free discovery directory. It helps people find public listings for programs, events,
            volunteer hours, co-op and SHSM exploration, mentorship, scholarships, and related opportunities. Public
            browsing does not require an account. Apple app release {legalConfig.currentAppleRelease} has only an
            optional local Profile; it is not an online account and does not create a relationship with a program
            provider.
          </p>
        </section>

        <section>
          <h2>5. Listing accuracy and “free” status</h2>
          <p>
            Listings are compiled from public sources and may change without notice. GTA FREE STEM tries to show
            source-backed, current opportunities, but does not promise that any listing is complete, error-free,
            available, suitable, accessible, safe, or still free. “Free” means no participation fee was identified at
            the latest check; transportation, equipment, meals, deposits, optional purchases, eligibility rules, or
            other costs may still apply. Always confirm dates, cost, eligibility, accommodations, supervision,
            volunteer-hour recognition, co-op or SHSM credit, and registration directly with the provider.
          </p>
        </section>

        <section>
          <h2>6. Independent providers and external services</h2>
          <p>
            Program providers, schools, libraries, nonprofits, map services, GitHub, jsDelivr, Apple, and other linked
            services are independent from GTA FREE STEM unless expressly stated. Their terms, privacy practices,
            registration rules, screening, refunds, accessibility, safety practices, and decisions apply to your
            interaction with them. A link or listing is not an endorsement, partnership, guarantee, or safety
            certification.
          </p>
        </section>

        <section>
          <h2>7. Location, maps, directions, and alerts</h2>
          <p>
            Nearby results, map pins, distances, directions, dates, deadlines, and alerts are convenience features and
            may be approximate, delayed, unavailable, or wrong. Do not rely on them for emergencies, personal safety,
            travel timing, legal deadlines, school credit, or eligibility decisions. Use official provider and map
            sources before acting.
          </p>
        </section>

        <section>
          <h2>8. Acceptable use</h2>
          <p>You may not use the Service to:</p>
          <ul>
            <li>break a law, infringe another person's rights, impersonate a provider, or misrepresent a listing;</li>
            <li>submit malware, abusive content, spam, false reports, or sensitive information about another person;</li>
            <li>interfere with, probe, overload, reverse engineer where prohibited by law, or bypass security or access controls for the Service or its providers; or</li>
            <li>use automated access in a way that disrupts the free public service or violates a source provider's terms.</li>
          </ul>
          <p>
            Legitimate accessibility tools, search engines following published controls, and use permitted by the
            open-source licence are not prohibited by this section.
          </p>
        </section>

        <section>
          <h2>9. Intellectual property and open source</h2>
          <p>
            The source code is available under the licence in the public repository. That licence applies only to
            material it covers. Provider names, logos, program descriptions, and linked content belong to their
            respective owners. GTA FREE STEM branding, original copy, and original visual assets remain protected to
            the extent allowed by law. Do not imply endorsement or ownership of third-party material.
          </p>
        </section>

        <section>
          <h2>10. Availability, changes, and enforcement</h2>
          <p>
            The Service may change, pause, remove stale or unsafe listings, restrict abusive traffic, or stop without
            notice. There is no promise of continuous availability, permanent storage, account recovery, or a
            particular feature. If future online accounts are introduced, their suspension and deletion rules will be
            published before that service is enabled.
          </p>
        </section>

        <section>
          <h2>11. Disclaimers</h2>
          <p>
            To the maximum extent permitted by law, the Service is provided “as is” and “as available,” without
            warranties of accuracy, availability, fitness for a particular purpose, non-infringement, safety, or
            results. Nothing in these terms excludes a warranty, remedy, or right that applicable law does not allow
            the publisher to exclude.
          </p>
        </section>

        <section>
          <h2>12. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, the publisher is not liable for indirect, incidental, special,
            consequential, exemplary, or punitive losses arising from use of or inability to use the Service; stale or
            incorrect listings; an external provider; travel; registration; lost data; or unauthorized third-party
            conduct. This limitation does not apply where prohibited by law, including liability that cannot lawfully
            be limited for fraud, wilful misconduct, gross negligence, personal injury, or mandatory consumer rights.
          </p>
        </section>

        <section>
          <h2>13. Governing law</h2>
          <p>
            These terms are governed by the laws of Ontario and the federal laws of Canada applicable there, without
            regard to conflict-of-law rules. Courts in Ontario may hear disputes, except where mandatory law gives you
            the right to use another forum. Nothing here prevents either party from seeking a lawful urgent remedy.
          </p>
        </section>

        <section>
          <h2>14. Updates, severability, and contact</h2>
          <p>
            Material changes will be posted here with a new effective date and will apply prospectively. If one term
            is unenforceable, the remaining terms continue to the extent permitted by law. These Terms, the Privacy
            Policy, and—only for the Apple app licence—the Apple Standard EULA are the current agreement for this
            Service. Questions can be started through the <a href="/support/">Support page</a>. Never include
            passwords, precise location, a home address, a child's details, or other sensitive data in a public ticket.
          </p>
        </section>
      </article>

      <LegalFooter />
    </main>
  );
}
