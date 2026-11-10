import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { GtaArtwork } from "./GtaArtwork";
import { LegalFooter } from "./LegalFooter";
import { StorybookMark } from "./StorybookMark";
import { iosBetaInvitation } from "@/lib/betaCampaign";
import "./BetaParticipation.css";

function BetaShell({ children }: { children: ReactNode }) {
  return <>
    <a className="skip-link" href="#beta-content">Skip to content</a>
    <div className="beta-page" lang="en" dir="ltr">
      <header className="beta-header">
        <a href="/" aria-label="GTA FREE STEM home"><StorybookMark compact ariaHidden /></a>
        <span>iPhone beta</span>
      </header>
      <main id="beta-content" tabIndex={-1}>{children}</main>
      <LegalFooter />
    </div>
  </>;
}

function PendingInvitation() {
  return <section className="beta-note" aria-labelledby="beta-pending-title">
    <h2 id="beta-pending-title">The next testing group is getting ready.</h2>
    <p>We’re checking navigation, translations and layouts before opening invitations. You can explore free programs on the website in the meantime.</p>
  </section>;
}

export function BetaParticipation() {
  const invitation = iosBetaInvitation();
  return <BetaShell>
    <section className="beta-hero" aria-labelledby="beta-title">
      <div>
        <p className="eyebrow">GTA FREE STEM · COMMUNITY TESTING</p>
        <h1 id="beta-title">Help us test GTA FREE STEM.</h1>
        <p className="beta-intro">Try the iPhone app. Tell us what feels useful, what feels confusing, and what needs fixing.</p>
        <div className="hero-actions">
          {invitation ? <a className="primary-button beta-action" href="/beta/ios/">Try the iPhone beta <ArrowRight size={18} aria-hidden="true" /></a> : <a className="primary-button beta-action" href="/opportunities/">Explore free programs <ArrowRight size={18} aria-hidden="true" /></a>}
          <a className="soft-button beta-action" href="#how-testing-works">How testing works</a>
        </div>
      </div>
      <div className="beta-hero-art"><GtaArtwork role="science" illustration /></div>
    </section>
    {!invitation && <PendingInvitation />}
    <section className="beta-section" id="how-testing-works" aria-labelledby="beta-how-title">
      <h2 id="beta-how-title">How testing works</h2>
      <ol className="beta-steps">
        <li><h3>Install with TestFlight</h3><p>Apple’s free TestFlight app lets you try the beta on your iPhone. {invitation ? <a href="/beta/ios/">Follow the installation steps.</a> : <>The invitation and installation steps will appear here when this group opens.</>}</p></li>
        <li><h3>Try something you would normally do</h3><p>Find a program, try your usual filters, read the full details, and save a favourite for later.</p></li>
        <li><h3>Tell us how it went</h3><p>In TestFlight, tap Send Beta Feedback. A short description of what happened helps us understand what to fix.</p></li>
      </ol>
    </section>
    <section className="beta-section beta-feedback" aria-labelledby="beta-feedback-title">
      <GtaArtwork role="ideas" />
      <div><h2 id="beta-feedback-title">You don’t need to be a tech expert.</h2><p>Families, students, educators and community helpers are welcome. Please keep personal information and children’s details out of feedback and screenshots.</p></div>
    </section>
  </BetaShell>;
}

export function BetaInstallation() {
  const invitation = iosBetaInvitation();
  return <BetaShell>
    <a className="beta-back" href="/beta/"><ArrowLeft size={18} aria-hidden="true" /> About the iPhone beta</a>
    <section className="beta-install-heading" aria-labelledby="beta-install-title">
      <p className="eyebrow">YOUR IPHONE · A FEW SIMPLE STEPS</p>
      <h1 id="beta-install-title">Install the iPhone beta.</h1>
      <p className="beta-intro">Use the same iPhone for these steps. TestFlight and the GTA FREE STEM beta are free.</p>
    </section>
    {!invitation && <PendingInvitation />}
    <ol className="beta-steps beta-install-steps">
      <li><h2>Get TestFlight</h2><p>Install Apple’s free TestFlight app from the App Store, then return to this page.</p><a className="soft-button beta-action" href="https://apps.apple.com/us/app/testflight/id899247664" rel="noreferrer">Get TestFlight <ArrowRight size={18} aria-hidden="true" /></a></li>
      <li><h2>Open the invitation</h2>{invitation ? <><p>Open this testing group in TestFlight.</p><a className="primary-button beta-action" href={invitation} rel="noreferrer">Open the beta invitation <ArrowRight size={18} aria-hidden="true" /></a></> : <p>This testing group’s invitation is not open yet. Come back when the group opens.</p>}</li>
      <li><h2>Accept, then install</h2><p>In TestFlight, tap Accept, then Install. Already testing this app? Tap Update if it appears.</p></li>
      <li><h2>Explore and share feedback</h2><p>Try search, filters and program details. To report an issue, open TestFlight and tap Send Beta Feedback. Keep personal details out of screenshots.</p></li>
    </ol>
    <a className="soft-button beta-action beta-guide-download" href="/beta/iphone-installation-guide.png" download><Download size={18} aria-hidden="true" /> Save the four-step installation guide (PNG)</a>
  </BetaShell>;
}
