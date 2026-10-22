import type { Metadata } from "next";
import {
  formatProgramDate,
  programAgeRange,
  programBreadcrumbs,
  programCategory,
  programCityAnchor,
  programPath,
  programSchedule,
  programSiteUrl,
  programUrl,
  publicProgramPages,
  serializeProgramStructuredData
} from "@/lib/programPages";

export const dynamic = "force-static";

const title = "Free STEM program directory | GTA Free STEM";
const description = "Browse published free STEM programs by city. See the provider, schedule and age range, then check the original listing for details and registration.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: `${programSiteUrl}/programs/`,
    languages: { en: `${programSiteUrl}/programs/`, "en-CA": `${programSiteUrl}/programs/`, "x-default": `${programSiteUrl}/programs/` }
  },
  openGraph: { type: "website", title, description, url: `${programSiteUrl}/programs/`, locale: "en_CA" },
  twitter: { card: "summary", title, description }
};

export default function ProgramsPage() {
  const cities = [...new Set(publicProgramPages.map((program) => program.city))].sort();
  const listedPrograms = cities.flatMap((city) => publicProgramPages.filter((program) => program.city === city));
  const latestCheck = publicProgramPages.map((program) => program.lastChecked).sort().at(-1);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${programSiteUrl}/programs/#page`,
        url: `${programSiteUrl}/programs/`, name: "Free STEM program directory", description, inLanguage: "en-CA",
        isPartOf: { "@id": `${programSiteUrl}/#website` },
        breadcrumb: { "@id": `${programSiteUrl}/programs/#breadcrumb` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: publicProgramPages.length,
          itemListElement: listedPrograms.map((program, index) => ({
            "@type": "ListItem", position: index + 1, name: program.title, url: programUrl(program)
          }))
        }
      },
      programBreadcrumbs()
    ]
  };

  return (
    <main className="programs-main" id="program-content" tabIndex={-1}>
      <script id="programs-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeProgramStructuredData(structuredData) }} />
      <nav className="programs-breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Programs</li></ol></nav>
      <section className="programs-intro" aria-labelledby="programs-title">
        <p className="programs-eyebrow">A place to start</p>
        <h1 id="programs-title">Find your next free STEM program.</h1>
        <p className="programs-lead">Browse the programs in our published directory, with a page for each opportunity. Choose a title to see the schedule, listed age range and original source.</p>
        <a className="programs-primary" href="/opportunities/#discover">Search by interest, city or age <span aria-hidden="true">→</span></a>
        <p className="programs-snapshot">{publicProgramPages.length} programs in this snapshot{latestCheck ? <> · Sources last checked <time dateTime={latestCheck}>{formatProgramDate(latestCheck)}</time></> : null}. Programs and spaces can change after publication. Confirm the latest details with the provider.</p>
      </section>

      {cities.length > 0 ? <>
        <nav className="programs-city-nav" aria-label="Browse programs by city"><span>Jump to a city</span>{cities.map((city) => <a key={city} href={`#${programCityAnchor(city)}`}>{city}</a>)}</nav>
        {cities.map((city) => <section className="programs-city-section" key={city} aria-labelledby={programCityAnchor(city)}>
          <h2 id={programCityAnchor(city)}>{city}</h2>
          <ul className="programs-grid">{publicProgramPages.filter((program) => program.city === city).map((program) => <li key={program.id}>
            <article className="programs-card">
              <p className="programs-category">{programCategory(program)}</p>
              <h3><a href={programPath(program)}>{program.title}</a></h3>
              <p className="programs-provider">{program.provider}</p>
              <dl className="programs-card-facts">
                <div><dt>When</dt><dd>{programSchedule(program)}</dd></div>
                <div><dt>Listed ages</dt><dd>{programAgeRange(program)}</dd></div>
                <div><dt>Where</dt><dd>{program.virtual ? "Online" : program.city}</dd></div>
              </dl>
              <a className="programs-card-link" href={programPath(program)}>Program details <span aria-hidden="true">→</span></a>
            </article>
          </li>)}</ul>
        </section>)}
      </> : <section className="programs-empty"><h2>More opportunities are on the way.</h2><p>There are no current programs in this published snapshot. The interactive directory and original library calendars can help you find your next place to explore.</p><a href="/opportunities/#discover">Open the interactive directory</a></section>}
    </main>
  );
}
