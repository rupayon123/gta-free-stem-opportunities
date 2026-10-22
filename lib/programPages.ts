import { opportunities } from "./data";
import { publicOpportunities } from "./opportunityStatus";
import type { Opportunity } from "./types";

export const programSiteUrl = "https://gta-free-stem.vercel.app";

// This server-rendered directory is a published snapshot. The interactive
// browser keeps applying the current clock after a page has been published.
export const publicProgramPages = publicOpportunities(opportunities).sort(
  (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate) || a.id.localeCompare(b.id)
);

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
  return `A free ${programCategory(program).toLowerCase()} opportunity from ${program.provider}, ${place}. Check the provider’s listing for the activity details, eligibility and booking requirements.`;
}

export function programAgeRange(program: Opportunity) {
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

export function programMetadataTitle(program: Opportunity) {
  const location = program.virtual ? "Online" : program.address.split(",")[0] || program.city;
  return `${program.title} · ${location} · ${formatProgramDateTime(program.startDate)} | GTA Free STEM`;
}

export function programBreadcrumbs(program?: Opportunity) {
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${programSiteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Programs", item: `${programSiteUrl}/programs/` }
  ];
  if (program) items.push({ "@type": "ListItem", position: 3, name: program.title, item: programUrl(program) });
  return {
    "@type": "BreadcrumbList",
    "@id": `${program ? programUrl(program) : `${programSiteUrl}/programs/`}#breadcrumb`,
    itemListElement: items
  };
}

export function serializeProgramStructuredData(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
