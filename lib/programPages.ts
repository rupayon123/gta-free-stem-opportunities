import "server-only";
import { opportunities } from "./data";
import { generatedLibraryOpportunities } from "./generatedLibraryOpportunities";
import { publicOpportunities } from "./opportunityStatus";
import type { Opportunity } from "./types";

export const programSiteUrl = "https://gta-free-stem.vercel.app";

// This server-rendered directory is a published snapshot. The interactive
// browser keeps applying the current clock after a page has been published.
const publishedPrograms = new Map([...opportunities, ...generatedLibraryOpportunities].map((program) => [program.id, program]));
export const publicProgramPages = publicOpportunities([...publishedPrograms.values()]).sort(
  (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate) || a.id.localeCompare(b.id)
);
export const publicProgramById = new Map(publicProgramPages.map((program) => [program.id, program]));
export const programDirectoryPageSize = 200;
export const programDirectoryPageCount = Math.max(1, Math.ceil(publicProgramPages.length / programDirectoryPageSize));
const metadataTitleGroups = new Map<string, string[]>();
for (const program of publicProgramPages) {
  const title = programMetadataBase(program);
  metadataTitleGroups.set(title, [...(metadataTitleGroups.get(title) ?? []), program.id]);
}

export function programDirectoryPath(page = 1) {
  return page === 1 ? "/programs/" : `/programs/page/${page}/`;
}

export function programDirectoryPage(page: number) {
  const offset = (page - 1) * programDirectoryPageSize;
  return publicProgramPages.slice(offset, offset + programDirectoryPageSize);
}

export function programPath(program: Pick<Opportunity, "id">) {
  return `/programs/${encodeURIComponent(program.id)}/`;
}

export function programUrl(program: Pick<Opportunity, "id">) {
  return `${programSiteUrl}${programPath(program)}`;
}

export function programCategory(program: Opportunity) {
  return program.categories.find((category) => category !== "STEM") ?? program.category;
}

export function programSummary(program: Opportunity) {
  const place = program.virtual ? "online" : `in ${program.city}`;
  if (programCategory(program) === "Library & Community") {
    return `A free library event from ${program.provider}, ${place}. Check the provider’s listing for the activity details, eligibility and booking requirements.`;
  }
  return `A free ${programCategory(program).toLowerCase()} opportunity from ${program.provider}, ${place}. Check the provider’s listing for the activity details, eligibility and booking requirements.`;
}

export function programAgeRange(program: Opportunity) {
  if (program.ageLabel) return program.ageLabel;
  return program.ages.max === undefined
    ? `${program.ages.min}+ years`
    : `${program.ages.min}–${program.ages.max} years`;
}

function parsedProgramDate(value: string) {
  return new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00Z` : value);
}

export function formatProgramDate(value: string) {
  const date = parsedProgramDate(value);
  if (Number.isNaN(date.getTime())) return "Check with the provider";
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric", month: "short", day: "numeric", timeZone: "America/Toronto"
  }).format(date);
}

export function formatProgramDateTime(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return formatProgramDate(value);
  const date = parsedProgramDate(value);
  if (Number.isNaN(date.getTime())) return "Check with the provider";
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
    timeZone: "America/Toronto"
  }).format(date);
}

export function programSchedule(program: Opportunity) {
  const start = formatProgramDateTime(program.startDate);
  return program.endDate && program.endDate !== program.startDate
    ? `${start} to ${formatProgramDateTime(program.endDate)}`
    : start;
}

export function programSourceUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function programSearchPath(program: Opportunity) {
  const query = new URLSearchParams({ q: program.title.slice(0, 250) });
  return `/opportunities/?${query}#discover`;
}

export function programLastModified(program: Opportunity) {
  const date = parsedProgramDate(program.lastChecked);
  if (Number.isNaN(date.getTime())) return undefined;
  return /^\d{4}-\d{2}-\d{2}$/.test(program.lastChecked) ? program.lastChecked : date;
}

export function programCityAnchor(city: string) {
  return `programs-${city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function programMetadataBase(program: Opportunity) {
  const location = program.virtual ? "Online" : program.address.split(",")[0] || program.city;
  return `${program.title} · ${location} · ${formatProgramDateTime(program.startDate)}`;
}

export function programMetadataTitle(program: Opportunity) {
  const base = programMetadataBase(program);
  const records = metadataTitleGroups.get(base) ?? [];
  // Some providers publish identical title/venue/time records under distinct
  // IDs. Identify those entries without inventing a different event detail.
  const suffix = records.length > 1 ? ` · Listing ${records.indexOf(program.id) + 1}` : "";
  return `${base}${suffix} | GTA Free STEM`;
}

export function programBreadcrumbs(program?: Opportunity, directoryPage = 1) {
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${programSiteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Programs", item: `${programSiteUrl}/programs/` }
  ];
  if (program) items.push({ "@type": "ListItem", position: 3, name: program.title, item: programUrl(program) });
  else if (directoryPage > 1) items.push({ "@type": "ListItem", position: 3, name: `Page ${directoryPage}`, item: `${programSiteUrl}${programDirectoryPath(directoryPage)}` });
  return {
    "@type": "BreadcrumbList",
    "@id": `${program ? programUrl(program) : `${programSiteUrl}${programDirectoryPath(directoryPage)}`}#breadcrumb`,
    itemListElement: items
  };
}

export function serializeProgramStructuredData(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
