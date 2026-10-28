import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  formatProgramDate,
  formatProgramDateTime,
  programAgeRange,
  programBreadcrumbs,
  programCategory,
  programMetadataTitle,
  programSearchPath,
  programSiteUrl,
  programSourceUrl,
  programSummary,
  programUrl,
  publicProgramById,
  publicProgramPages,
  serializeProgramStructuredData
} from "@/lib/programPages";

type ProgramPageProps = { params: Promise<{ id: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return publicProgramPages.map((program) => ({ id: program.id }));
}

function findProgram(id: string) {
  const program = publicProgramById.get(id);
  if (!program) notFound();
  return program;
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const program = findProgram((await params).id);
  const title = programMetadataTitle(program);
  const description = programSummary(program);
  const url = programUrl(program);
  return {
    title: { absolute: title }, description,
    alternates: { canonical: url, languages: { en: url, "en-CA": url, "x-default": url } },
    openGraph: { type: "website", title, description, url, locale: "en_CA" },
    twitter: { card: "summary", title, description }
  };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const program = findProgram((await params).id);
  const sourceUrl = programSourceUrl(program.sourceUrl);
  const registrationUrl = programSourceUrl(program.registrationUrl) ?? sourceUrl;
  const description = programSummary(program);
  const distinctDeadline = program.deadline && Date.parse(program.deadline) !== Date.parse(program.startDate)
    ? program.deadline : undefined;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage", "@id": `${programUrl(program)}#page`, url: programUrl(program),
        name: program.title, description, inLanguage: "en-CA",
        isPartOf: { "@id": `${programSiteUrl}/#website` },
        breadcrumb: { "@id": `${programUrl(program)}#breadcrumb` },
        significantLink: sourceUrl,
        about: { "@type": "Thing", name: programCategory(program) }
      },
      programBreadcrumbs(program)
    ]
  };

  return (
    <main className="programs-main programs-leaf" id="program-content" tabIndex={-1}>
      <script id="program-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeProgramStructuredData(structuredData) }} />
      <nav className="programs-breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/programs/">Programs</a></li><li aria-current="page">{program.title}</li></ol></nav>
      <article>
        <header className="programs-intro programs-leaf-intro">
          <p className="programs-eyebrow">{programCategory(program)} · {program.virtual ? "Online" : program.city}</p>
          <h1>{program.title}</h1>
          <p className="programs-leaf-provider">{program.provider}</p>
          <p className="programs-lead">{description}</p>
        </header>
        <div className="programs-detail-grid">
          <section className="programs-fact-panel" aria-labelledby="program-details-title">
            <h2 id="program-details-title">The details at a glance</h2>
            <dl className="programs-detail-facts">
              <div><dt>Starts</dt><dd><time dateTime={program.startDate}>{formatProgramDateTime(program.startDate)}</time></dd></div>
              {program.endDate && <div><dt>Ends</dt><dd><time dateTime={program.endDate}>{formatProgramDateTime(program.endDate)}</time></dd></div>}
              <div><dt>Listed age range</dt><dd>{programAgeRange(program)}</dd></div>
              <div><dt>Location</dt><dd>{program.virtual ? "Online" : program.address || program.city}</dd></div>
              <div><dt>Cost listed</dt><dd>{program.cost}</dd></div>
              {distinctDeadline && <div><dt>Registration deadline</dt><dd><time dateTime={distinctDeadline}>{formatProgramDateTime(distinctDeadline)}</time></dd></div>}
              {program.volunteerHoursEligible && <div><dt>School pathway</dt><dd>Volunteer-hour eligibility is listed. Confirm requirements with the provider and your school.</dd></div>}
              {program.coopEligible && <div><dt>School pathway</dt><dd>Co-op eligibility is listed. Confirm placement requirements with the provider and your school.</dd></div>}
            </dl>
            <p className="programs-fact-note">Times are shown in Toronto local time. This page reflects a published snapshot; a program may have ended or changed since publication.</p>
          </section>
          <aside className="programs-next-step" aria-labelledby="program-next-title">
            <p className="programs-eyebrow">Your next step</p>
            <h2 id="program-next-title">See what the provider has planned.</h2>
            <p>The original listing has the activity description, latest availability and instructions for joining.</p>
            {registrationUrl && <a className="programs-primary" href={registrationUrl} rel="external">View the provider’s listing <span aria-hidden="true">↗</span></a>}
            {sourceUrl && <a className="programs-source-link" href={sourceUrl} rel="external">Original source: {program.provider}</a>}
            <p className="programs-source-check">Source last checked <time dateTime={program.lastChecked}>{formatProgramDate(program.lastChecked)}</time>. Confirm dates, spaces and eligibility before making plans.</p>
            <a className="programs-secondary" href={programSearchPath(program)}>Open interactive search <span aria-hidden="true">→</span></a>
            <p className="programs-fact-note">Use the interactive directory to filter current listings and save ideas in your browser.</p>
          </aside>
        </div>
        <section className="programs-before-you-go" aria-labelledby="program-before-title">
          <h2 id="program-before-title">Before you go</h2>
          <p>Check any booking, equipment or accommodation requirements with {program.provider}. Registration and program delivery are handled by the provider.</p>
          <a href="/programs/">Browse more free programs <span aria-hidden="true">→</span></a>
        </section>
      </article>
    </main>
  );
}
