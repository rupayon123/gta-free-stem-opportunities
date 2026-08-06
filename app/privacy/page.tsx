import { LegalFooter } from "@/components/LegalFooter";
import { StorybookMark } from "@/components/StorybookMark";
import { legalConfig } from "@/lib/legal";
import { metadataForPage } from "../seoPages";

export const metadata = metadataForPage("privacy");

const appData = [
  {
    item: "Optional local Profile name",
    handling:
      "Stored in Apple UserDefaults on that device. It is not an online account, is not sent to the publisher, and cannot be recovered from another device.",
    retention: "Until you delete the Profile in Settings or uninstall the app."
  },
  {
    item: "Saved opportunities",
    handling:
      "Stored locally with SwiftData. A saved record contains a copy of the public listing and the date it was saved; it is not sent to the publisher. When a paired Apple Watch companion is installed, the iPhone can share up to 48 saved opportunities and their saved dates with that paired Watch through Apple WatchConnectivity. That transfer stays between the user's paired devices and is not delivered to the publisher.",
    retention: "Until you remove the save, delete the local Profile and saves, or uninstall the app."
  },
  {
    item: "Search and hunt state",
    handling:
      "The latest query, filters, seen-listing identifiers, alert timing, and—if nearby search is used—the selected coordinates can be kept locally so the last hunt and new-find alerts work.",
    retention:
      "The latest hunt remains until it is replaced or deleted. Seen records are pruned after about 120 days and known identifiers are capped at 2,500."
  },
  {
    item: "Language and theme preferences",
    handling: "Stored in Apple UserDefaults and never sent to the publisher.",
    retention: "Until changed, cleared with operating-system controls, or the app is uninstalled."
  },
  {
    item: "Public opportunity cache",
    handling:
      "A validated copy of the public opportunity feed is stored locally for faster and offline browsing. The Watch companion retains the transferred saved opportunities described above, not the whole public feed. These caches are on-device and are not a publisher-operated profile.",
    retention: "Replaced by newer feed data or removed when the app is uninstalled."
  }
] as const;

const websiteData = [
  {
    item: "Browser preferences",
    handling: "Theme, language, and local saved-state features use browser local storage.",
    control: "Clear this site's data in browser settings."
  },
  {
    item: "Optional website location",
    handling:
      "If you choose Near me, the browser supplies an approximate location for the current session so results can be sorted by distance. It is not sent to GTA FREE STEM.",
    control: "Deny or revoke location permission in the browser."
  },
  {
    item: "Local-only forms",
    handling:
      "While the public production backend is not configured, correction, Community Host, and opportunity-suggestion forms—including any contact email entered—are saved only in that browser. They are not delivered to the publisher.",
    control: "Clear this site's browser data. Do not use those forms for urgent or private requests."
  }
] as const;

export default function PrivacyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    name: `${legalConfig.appDisplayName} Privacy Policy`,
    url: legalConfig.privacyUrl,
    dateModified: legalConfig.effectiveDateIso,
    publisher: {
      "@type": "Person",
      name: legalConfig.publisherName,
      address: legalConfig.publisherRegion
    },
    isPartOf: {
      "@type": "WebSite",
      name: legalConfig.appDisplayName,
      url: legalConfig.siteUrl
    }
  };

  return (
    <main className="seo-page legal-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="seo-hero" aria-labelledby="privacy-title">
        <a className="seo-logo-link" href="/" aria-label="Open GTA FREE STEM Opportunities">
          <StorybookMark className="seo-storybook-mark" compact ariaHidden />
        </a>
        <p className="beta-pill">Privacy in plain language</p>
        <h1 id="privacy-title">Privacy Policy</h1>
        <p>
          Apple app release {legalConfig.currentAppleRelease} does not operate an online account, sell data, show
          ads, or use tracking or an analytics SDK. Personal app state stays on the device. The services that deliver
          the public feed receive limited network request data, including an IP address from which a general location
          may be inferred and technical request details used for delivery, security, troubleshooting, and analytics.
        </p>
        <p>
          Effective: {legalConfig.effectiveDate} · Publisher: {legalConfig.publisherName}, {legalConfig.publisherRegion}
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="/support/">
            Privacy choices and support
          </a>
          <a className="soft-button" href="/terms/">
            Terms of Use
          </a>
        </div>
      </section>

      <article className="legal-document" aria-label="Full privacy policy">
        <section id="scope">
          <h2>1. Scope and who is responsible</h2>
          <p>
            This policy covers the GTA FREE STEM iPhone, iPad, Mac, and Apple Watch apps and the public website at{" "}
            <a href={legalConfig.siteUrl}>{legalConfig.siteUrl}</a>. {legalConfig.publisherName} is the publisher of
            GTA FREE STEM Opportunities. The Apple app and website have different data flows, which are described
            separately below.
          </p>
        </section>

        <section id="apple-app">
          <h2>2. What the Apple app stores on your device</h2>
          <p>
            Browsing does not require a login. The publisher does not receive the following on-device information.
            Under Apple's App Privacy definition, information processed only on the device is not collected by the
            developer.
          </p>
          <dl className="legal-data-list">
            {appData.map((entry) => (
              <div key={entry.item}>
                <dt>{entry.item}</dt>
                <dd>{entry.handling}</dd>
                <dd><strong>Retention:</strong> {entry.retention}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="permissions">
          <h2>3. Location, maps, notifications, and background refresh</h2>
          <ul>
            <li>
              <strong>Location is optional.</strong> The app requests when-in-use permission only after you choose
              nearby search. It asks Apple for a one-shot, kilometre-level location, uses it locally to calculate
              distance, and may keep those coordinates in the latest local hunt. It does not send your coordinates
              to the GTA FREE STEM feed or publisher.
            </li>
            <li>
              <strong>Maps are optional to use.</strong> Apple MapKit may process map requests under Apple's privacy
              practices. The publisher does not receive MapKit account or location data.
            </li>
            <li>
              <strong>Alerts are optional.</strong> If you enable alerts, Apple grants notification permission and
              the app may use an operating-system background refresh to create a local alert for new public listings.
              There is no remote push token, push provider, or notification analytics.
            </li>
          </ul>
        </section>

        <section id="network-services">
          <h2>4. Network services and technical request data</h2>
          <p>
            To refresh public listings, the app makes cookie-free HTTPS requests to a GitHub-hosted JSON file and, if
            needed, the jsDelivr CDN mirror of that public GitHub file. Those providers receive and may retain the
            request IP address, request time, and available network, operating-system, app, or device headers. They may
            infer a coarse location from the IP address and use request records for content delivery, routing,
            security, troubleshooting, performance, service analytics, and improvement. In Apple's App Privacy terms,
            this release conservatively discloses <strong>Coarse Location</strong> and{" "}
            <strong>Other Diagnostic Data</strong> for App Functionality and Analytics, linked to the user through request information, and not
            used for tracking.
          </p>
          <p>
            GTA FREE STEM does not attach the local Profile name, searches, saves, device location, advertising
            identifier, or a GTA FREE STEM user ID to those requests, and the publisher cannot view provider-level raw
            request logs. The providers determine their own log retention and privacy-request procedures. The relevant
            notices are the{" "}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
              GitHub Privacy Statement
            </a>,{" "}
            <a href="https://www.jsdelivr.com/terms/privacy-policy">jsDelivr Privacy Policy</a>, the{" "}
            <a href="https://www.jsdelivr.com/terms/sub-processors">jsDelivr Sub-Processors notice</a>, and the{" "}
            <a href="https://www.apple.com/legal/privacy/">Apple Privacy Policy</a>. Where a provider acts on the
            publisher's behalf, it must protect information under its applicable terms and law. The publisher does not
            instruct a provider to sell request data or use it for advertising or cross-app tracking.
          </p>
        </section>

        <section id="website">
          <h2>5. Public website data</h2>
          <p>
            The current public website is a static site without a production account database or analytics SDK. It
            does not set advertising or cross-site tracking technologies. Its current local features work as follows:
          </p>
          <dl className="legal-data-list">
            {websiteData.map((entry) => (
              <div key={entry.item}>
                <dt>{entry.item}</dt>
                <dd>{entry.handling}</dd>
                <dd><strong>Your control:</strong> {entry.control}</dd>
              </div>
            ))}
          </dl>
          <p>
            Vercel receives ordinary hosting-request data such as IP address, request time, requested page, and
            available browser or device headers and may use it to deliver, secure, analyze, and improve its hosting
            service under the <a href="https://vercel.com/legal/privacy-notice">Vercel Privacy Notice</a>. The map
            loads tiles from OpenFreeMap, which receives the technical request data and requested map-tile coordinates
            needed to return the visible map area. See the{" "}
            <a href="https://openfreemap.org/privacy/">OpenFreeMap Privacy Policy</a>. These providers control their
            own log retention and privacy-request procedures. This policy and all consent and account-deletion flows
            must be revised before any production website account, cloud save, feedback, or submission backend is
            enabled.
          </p>
        </section>

        <section id="external-links">
          <h2>6. Provider websites and other external links</h2>
          <p>
            Listings link to independent program providers for official details and registration. Directions may
            open Apple Maps or Google Maps. Once you follow an external link, that service—not GTA FREE STEM—controls
            its own collection, cookies, accounts, registration data, and privacy practices. Review the provider's
            policy before giving it personal information, especially information about a child.
          </p>
          <p>
            Support opens GitHub's public issue tracker. If you choose to submit a ticket, its text, attachments,
            timestamps, and the GitHub profile that submits it are public and are received by the publisher. The
            publisher uses that information only to answer the request, correct the directory, troubleshoot the
            Service, address safety or abuse, and maintain a support record. GitHub stores and processes the ticket
            under its own policy. The publisher may close or delete a ticket when appropriate, but cannot promise that
            search indexes, notifications, forks, screenshots, or other copies will disappear. Do not submit sensitive
            information. To request removal of a ticket, open a new general support ticket that identifies the ticket
            URL without repeating its private contents.
          </p>
          <p>
            When a direct support email is displayed on the Support page and you choose to use it, the publisher and
            the email services involved receive your email address, message, delivery metadata, and any attachment you
            send. The publisher uses that information only to answer the request, troubleshoot, address safety or
            abuse, correct the directory, and keep a reasonable support record. It is retained only as long as needed
            for those purposes or a legal obligation, then deleted where reasonably possible. You may ask for access,
            correction, or deletion by replying to the same support address. Never email passwords or unnecessary
            information about a child.
          </p>
        </section>

        <section id="purposes">
          <h2>7. Purposes, sharing, and tracking</h2>
          <ul>
            <li>On-device information is used only to provide the feature you selected: preferences, saves, nearby search, hunt history, offline browsing, or local alerts.</li>
            <li>The publisher uses no feed-request logs. Feed and hosting providers may use technical request data for delivery, security, troubleshooting, performance, service analytics, and improvement under their own notices.</li>
            <li>Information voluntarily sent through a support ticket or direct support email is used only to provide support, maintain the directory, and address safety, security, or abuse.</li>
            <li>GTA FREE STEM does not sell personal information, share it for behavioural advertising, build advertising profiles, or track people across apps and websites.</li>
            <li>No advertising network, third-party analytics SDK, crash-reporting SDK, payment SDK, or data broker is included in Apple app release {legalConfig.currentAppleRelease}.</li>
          </ul>
        </section>

        <section id="choices">
          <h2>8. Your choices, consent withdrawal, and deletion</h2>
          <ul>
            <li>Use city and region filters instead of location. Revoke location permission in Apple or browser settings at any time.</li>
            <li>Clear nearby coordinates from the app's filters. Deleting the local Profile in Settings removes the Profile name, saved opportunities, latest hunt, seen-listing history, and local alert history.</li>
            <li>Turn notifications off in Apple system settings. This prevents future app alerts.</li>
            <li>Delete individual saved opportunities from Saved, clear website site data in your browser, or uninstall the app to remove its remaining local data.</li>
            <li>The public opportunity cache contains no Profile data and may remain after Profile deletion until it is replaced or the app is uninstalled.</li>
          </ul>
          <p>
            Because the publisher does not operate a user database for this Apple release, it normally has no
            personal app record to access, correct, export, or delete. For a privacy question or a request involving a
            support ticket or email, use the <a href="/support/">Support page</a>. Use the direct email when a request
            contains private information; do not post it in a public GitHub ticket. A ticket author can edit their own
            issue content through GitHub; the publisher can also be asked to close or delete a ticket, subject to
            GitHub's controls and retention practices. Requests concerning GitHub or jsDelivr service logs must be
            directed to that provider because the publisher cannot access or delete those logs.
          </p>
        </section>

        <section id="children">
          <h2>9. Children and families</h2>
          <p>
            GTA FREE STEM is designed for students, families, caregivers, educators, and community groups. The Apple
            app does not ask for a birth date, school, email address, phone number, or online child account. A parent
            or guardian should manage device permissions and external registrations for a child who cannot provide
            meaningful consent. Do not include a child's private information in a public support ticket. If the
            publisher learns that personal information from a child was received through a publisher-controlled
            support channel without valid consent, it will be deleted where reasonably possible.
          </p>
        </section>

        <section id="security-transfers">
          <h2>10. Security and international processing</h2>
          <p>
            The app uses HTTPS, disables cookies and URL caching for feed requests, validates remote feed size and
            freshness, and relies on Apple platform protections for local storage. No system is perfectly secure.
            GitHub, jsDelivr, Vercel, Apple, OpenFreeMap, and external program providers may process technical data
            outside Canada under their own notices and lawful transfer safeguards.
          </p>
        </section>

        <section id="changes-contact">
          <h2>11. Changes and contact</h2>
          <p>
            This policy will be updated before a release adds off-device profiles, account services, submissions,
            analytics, advertising, remote notifications, or another material data use. The effective date above will
            change when the policy changes. Privacy and support requests can be started through the{" "}
            <a href="/support/">Support page</a>. Use its direct email contact for a private request. Its GitHub issue
            route is public, so never include passwords, precise location, a home address, a child's details, or other
            sensitive data in a ticket.
          </p>
        </section>
      </article>

      <LegalFooter />
    </main>
  );
}
