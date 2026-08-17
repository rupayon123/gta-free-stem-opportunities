import { LegalFooter } from "@/components/LegalFooter";
import { StorybookMark } from "@/components/StorybookMark";
import { legalConfig } from "@/lib/legal";
import { metadataForPage } from "../seoPages";

export const metadata = metadataForPage("support");

export default function SupportPage() {
  return (
    <main className="seo-page legal-page">
      <section className="seo-hero" aria-labelledby="support-title">
        <a className="seo-logo-link" href="/" aria-label="Open GTA FREE STEM Opportunities">
          <StorybookMark className="seo-storybook-mark" compact ariaHidden />
        </a>
        <p className="beta-pill">No-cost public support</p>
        <h1 id="support-title">Support</h1>
        <p>
          Get help with GTA FREE STEM, report a broken listing, or start a privacy request through the project's
          public GitHub issue tracker. Use it only for information that is safe to post publicly.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href={legalConfig.supportIssueUrl}>
            Open a support ticket
          </a>
          <a className="soft-button" href="/accessibility-support/">
            Accessibility guide
          </a>
        </div>
      </section>

      <article className="legal-document" aria-label="Support information">
        <section>
          <h2>Before opening a ticket</h2>
          <ul>
            <li>For a program's registration, eligibility, schedule, cost, or accommodation, contact the program provider shown in the listing.</li>
            <li>For an app problem, include the platform, operating-system version, GTA FREE STEM version, and steps that caused the problem.</li>
            <li>For a listing correction, include the public source link that shows the correct information.</li>
            <li>For local app data, use Settings to delete the Profile, saved opportunities, and hunt history. The publisher has no online app account to delete in release {legalConfig.currentAppleRelease}.</li>
          </ul>
        </section>

        <section className="legal-warning" aria-labelledby="public-ticket-warning">
          <h2 id="public-ticket-warning">Support tickets are public</h2>
          <p>
            Do not include passwords, login codes, precise location, home or school address, phone number, birth date,
            medical details, a child's identity, or any other sensitive information. For a private matter, post no
            details; open only a general ticket asking the publisher to provide a private contact method. GitHub
            requires its own account for ticket creation and applies its own terms and privacy statement. Ticket text,
            attachments, timestamps, and the GitHub profile that submits them are public and can be read by the
            publisher and anyone else.
          </p>
        </section>

        <section className={legalConfig.supportContactEmail ? undefined : "legal-warning"}>
          <h2>Private contact</h2>
          {legalConfig.supportContactEmail ? (
            <p>
              Email the publisher at{" "}
              <a href={`mailto:${legalConfig.supportContactEmail}`}>{legalConfig.supportContactEmail}</a>. Do not send
              passwords, login codes, or more personal information than is needed to answer the request.
            </p>
          ) : (
            <p>
              Public App Store release is blocked until the release owner configures a dedicated monitored support
              email. The public GitHub ticket route above remains available only for non-sensitive requests.
            </p>
          )}
        </section>

        <section>
          <h2>Privacy and legal information</h2>
          <p>
            Read the <a href="/privacy/">Privacy Policy</a> for data handling, retention, deletion, and permission
            choices. Read the <a href="/terms/">Terms of Use</a> for directory rules and disclaimers. The Apple app
            licence uses the <a href={legalConfig.appleStandardEulaUrl}>Apple Standard EULA</a>.
          </p>
        </section>

        <section>
          <h2>Publisher</h2>
          <p>
            {legalConfig.publisherName} · {legalConfig.publisherRegion}
          </p>
          <p>
            Source and support tracker: <a href={legalConfig.sourceUrl}>{legalConfig.sourceUrl}</a>
          </p>
        </section>
      </article>

      <LegalFooter />
    </main>
  );
}
