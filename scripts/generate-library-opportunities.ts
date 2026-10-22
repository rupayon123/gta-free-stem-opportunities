import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  inferLibraryOpportunityAges,
  inferLibraryOpportunityCategory,
  isLibraryOpportunityStemRelevant
} from "../lib/libraryOpportunityClassification";
import { evaluateLibraryRefreshHealth } from "../lib/refreshHealth";
import type { Category, CommunityFocus, LanguageCode, Opportunity, OpportunityType, Region } from "../lib/types";

// Official RSS pages currently contain 25 events. The measured source frontier
// exceeds 6,000 Toronto events; budget explicitly rather than silently slicing.
const libraryPagesPerSource = Math.max(1, Math.min(300, Math.floor(numericEnv("GTA_LIBRARY_PAGES_PER_SOURCE") ?? 300)));
const maxLibraryOpportunities = Math.max(160, Math.min(15000, Math.floor(numericEnv("GTA_MAX_LIBRARY_OPPORTUNITIES") ?? 15000)));
const lookaheadDays = Math.max(30, Math.floor(numericEnv("GTA_LOOKAHEAD_DAYS") ?? 365));
const timestampNow = () => new Date().toISOString();
const dryRun = process.argv.includes("--dry-run");

function numericEnv(name: string) {
  const value = process.env[name];
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export type LibraryFeed = {
  id: string;
  libraryId: string;
  organization: string;
  providerContact: string;
  region: Region;
  city: string;
  pages: number;
};

type FeedRefreshStats = {
  sourceId: string;
  organization: string;
  attemptedPages: number;
  successfulPages: number;
  acceptedListings: number;
};

export type RssItem = {
  title: string;
  description: string;
  link: string;
  categories: string[];
  startDate: string;
  endDate?: string;
  cancelled: boolean;
  virtual: boolean;
  full: boolean;
  locationName?: string;
  number?: string;
  street?: string;
  city?: string;
  zip?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  capacity?: string;
};

const feeds: LibraryFeed[] = [
  {
    id: "tpl-rss",
    libraryId: "tpl",
    organization: "Toronto Public Library",
    providerContact: "ask@tpl.ca",
    region: "Toronto",
    city: "Toronto",
    pages: libraryPagesPerSource
  },
  {
    id: "markham-rss",
    libraryId: "markham",
    organization: "Markham Public Library",
    providerContact: "mplchats@markhamlibrary.ca",
    region: "York",
    city: "Markham",
    pages: libraryPagesPerSource
  }
];

const rejectSignals = [
  "paid program",
  "tuition"
];

const allLanguages: LanguageCode[] = ["en"];

function decodeHtml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_match, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([a-f0-9]+);/gi, (_match, code) => String.fromCharCode(Number.parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(value: string) {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tagValue(block: string, tag: string) {
  return decodeHtml(block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"))?.[1] || "").trim();
}

function tagValues(block: string, tag: string) {
  return [...block.matchAll(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "gi"))].map((match) =>
    decodeHtml(match[1]).trim()
  );
}

function numberValue(block: string, tag: string) {
  const value = tagValue(block, tag);
  if (!value) return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

export function parseItems(xml: string): RssItem[] {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((match) => {
    const block = match[1];
    const location = block.match(/<bc:location>([\s\S]*?)<\/bc:location>/i)?.[1] || "";
    const contact = block.match(/<bc_contact>([\s\S]*?)<\/bc_contact>/i)?.[1] || "";
    const registration = block.match(/<bc:registration_info>([\s\S]*?)<\/bc:registration_info>/i)?.[1] || "";

    return {
      title: stripTags(tagValue(block, "title")),
      description: stripTags(tagValue(block, "description")),
      link: tagValue(block, "link"),
      categories: tagValues(block, "category").map(stripTags),
      startDate: tagValue(block, "bc:start_date") || tagValue(block, "bc:start_date_local"),
      endDate: tagValue(block, "bc:end_date") || tagValue(block, "bc:end_date_local") || undefined,
      cancelled: tagValue(block, "bc:is_cancelled") === "true",
      virtual: tagValue(block, "bc:is_virtual") === "true",
      full: tagValue(registration, "bc:is_full") === "true",
      locationName: tagValue(location, "bc:name") || undefined,
      number: tagValue(location, "bc:number") || undefined,
      street: tagValue(location, "bc:street") || undefined,
      city: tagValue(location, "bc:city") || undefined,
      zip: tagValue(location, "bc:zip") || undefined,
      state: tagValue(location, "bc:state") || undefined,
      latitude: numberValue(location, "bc:latitude"),
      longitude: numberValue(location, "bc:longitude"),
      contactName: tagValue(contact, "bc:name") || undefined,
      contactPhone: tagValue(contact, "bc:phone") || undefined,
      contactEmail: tagValue(contact, "bc:email") || undefined,
      capacity: tagValue(registration, "bc:capacity") || undefined
    };
  });
}

export function normalizeDate(value: string | undefined) {
  if (!value) return undefined;
  const cleaned = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
    const parsed = new Date(`${cleaned}T12:00:00Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(cleaned) ? cleaned : undefined;
  }
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?$/.test(cleaned)) {
    const probe = new Date(`${cleaned}Z`);
    if (Number.isNaN(probe.getTime()) || !probe.toISOString().startsWith(cleaned)) return undefined;
    const offsetAt = (date: Date) => {
      const offset = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto", timeZoneName: "shortOffset"
      }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value;
      const hours = offset?.match(/^GMT([+-])(\d{1,2})$/);
      return hours ? `${hours[1]}${hours[2].padStart(2, "0")}:00` : undefined;
    };
    const initialOffset = offsetAt(probe);
    if (!initialOffset) return undefined;
    const initial = new Date(`${cleaned}${initialOffset}`);
    const correctedOffset = offsetAt(initial);
    if (!correctedOffset) return undefined;
    const corrected = new Date(`${cleaned}${correctedOffset}`);
    // Reject a nonexistent local hour during the spring DST transition.
    return offsetAt(corrected) === correctedOffset ? corrected.toISOString() : undefined;
  }
  const calendarPrefix = cleaned.match(/^(\d{4}-\d{2}-\d{2})(?:T|\s)/)?.[1];
  if (calendarPrefix && !normalizeDate(calendarPrefix)) return undefined;
  const date = new Date(cleaned);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function isCurrent(item: RssItem, now: Date) {
  const endOrStart = normalizeDate(item.endDate) || normalizeDate(item.startDate);
  if (!endOrStart) return false;
  if (/^\d{4}-\d{2}-\d{2}$/.test(endOrStart)) {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit"
    }).formatToParts(now);
    const part = (type: string) => parts.find((value) => value.type === type)?.value;
    return endOrStart >= `${part("year")}-${part("month")}-${part("day")}`;
  }
  return new Date(endOrStart).getTime() >= now.getTime();
}

function isWithinActiveWindow(item: RssItem, now: Date) {
  const start = normalizeDate(item.startDate);
  return Boolean(start && isCurrent(item, now) &&
    new Date(start).getTime() <= now.getTime() + lookaheadDays * 24 * 60 * 60 * 1000);
}

export function shouldInclude(item: RssItem, now = new Date()) {
  const text = `${item.title} ${item.description} ${item.categories.join(" ")}`;
  if (item.cancelled || item.full || !item.title.trim() || !item.link || !normalizeDate(item.startDate) || !isCurrent(item, now)) return false;
  if (/\bFULL\b/i.test(item.title)) return false;
  if (/\b(?:CANCELLED|CANCELED)\b/i.test(item.title)) return false;
  // A subject such as budgeting or mobile apps can mention payment without
  // charging attendees. Keep explicit fees/charges out; allow genuine $0 fees.
  if ([...text.matchAll(/(?:\$|\bCAD\s*)(\s*\d[\d,]*(?:\.\d{1,2})?)/gi)]
    .some((match) => Number(match[1].replace(/[\s,]/g, "")) > 0)) return false;
  // Exempt only the specific no-cost clause. "Free registration" cannot
  // override a separate mandatory materials charge, payment or donation.
  const costText = text
    .replace(/\b(?:no|without|free of)\s+(?:(?:registration|admission|program|course|participation|materials?|supplies|mandatory)\s+)?(?:fees?|charges?|costs?)\b|\bfees?\s+(?:are\s+)?waived\b/gi, "")
    .replace(/\b(?:(?:registration|admission|program|course|participation|materials?|suppl(?:y|ies))\s+)?(?:cost|fee|price)s?\s*(?::|-|is|are)?\s*(?:free\b|no[- ]cost\b|no charge\b|zero dollars?\b|\$\s*0(?:\.00)?\b)/gi, "");
  if (/\bnot\s+(?:a\s+)?free\b|\b(?:fees?|charges?)\s+(?:may\s+)?apply\b/i.test(costText)) return false;
  if (/\b(?:registration|admission|program|course|participation|materials?|suppl(?:y|ies))\s+(?:cost|fee|payment)s?\b/i.test(costText)) return false;
  if (/\b(?:cost|fee|price)\s*:|\b(?:payments?|purchases?|donations?|fees?|charges?)\s+(?:is\s+|are\s+|will be\s+)?(?:required|mandatory|compulsory)\b|\b(?:required|mandatory|compulsory)\s+(?:payments?|purchases?|donations?|fees?|charges?)\b|\b(?:small|nominal|modest)\s+(?:fees?|charges?)\b/i.test(costText)) return false;
  if (/\b(?:admission|entry|registration|participation|tickets?)\s+(?:(?:is|costs?|requires?|for)\s+)?(?:(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|forty|fifty|hundred)[ -]+){1,4}dollars?\b/i.test(costText)) return false;
  if (rejectSignals.some((signal) => text.toLowerCase().includes(signal.toLowerCase()))) return false;
  return true;
}

export function inferCategory(item: RssItem): Category {
  // Fiction and screenings can mention robots/science without teaching them.
  // An explicitly educational title (for example Math Storytime or a
  // Stop-Motion Movie Lab) can still earn its real STEM classification.
  const readingOrScreening = /\b(?:book club|story\s?time|author talk|movies?|film screening)\b/i.test(item.title);
  const explicitLearning = /\b(?:3d|coding|programming|robotics|engineering|math(?:ematics)?|stem|steam|lab|workshop|stop[ -]motion|filmmaking|circuit|lego|duplo)\b/i.test(item.title);
  const fiction = /\b(?:science fiction|sci-fi|fantasy|star trek|star wars)\b/i.test(item.title);
  const specificStemActivity = /\b(?:3d|coding|programming|robotics|engineering|math(?:ematics)?|stem|steam|stop[ -]motion|filmmaking|circuits?|lego|duplo)\b/i.test(item.title);
  if (fiction && !specificStemActivity) return "Library & Community";
  if (readingOrScreening && !explicitLearning) return "Library & Community";
  return isLibraryOpportunityStemRelevant(item) ? inferLibraryOpportunityCategory(item) : "Library & Community";
}

function inferType(item: RssItem): OpportunityType {
  const text = `${item.title} ${item.description}`.toLowerCase();
  if (text.includes("drop-in") || text.includes("drop in")) return "Drop-in";
  if (text.includes("volunteer")) return "Volunteer role";
  if (text.includes("course") || text.includes("series") || text.includes("weekly")) return "Multi-week program";
  if (text.includes("camp")) return "Camp";
  if (text.includes("hackathon") || text.includes("competition")) return "Competition or hackathon";
  return "One-time event";
}

function isStemishCategory(category: Category) {
  return [
    "STEM",
    "Coding & Robotics",
    "Science & Engineering",
    "AI & Digital Media",
    "Makerspace & Fabrication",
    "Hackathons & Competitions",
    "Co-op & SHSM"
  ].includes(category);
}

function inferCommunityFocus(item: RssItem): CommunityFocus[] {
  const text = `${item.title} ${item.description}`.toLowerCase();
  const focus: CommunityFocus[] = ["Open to all", "Newcomer-friendly"];
  if (text.includes("indigenous")) focus.push("Indigenous-focused");
  if (text.includes("girls") || text.includes("women")) focus.push("Girls/women-focused");
  if (text.includes("black")) focus.push("Black-focused");
  return Array.from(new Set(focus));
}

function gradesFromAges(min: number, max?: number) {
  if (max === undefined || max < 4) return [];
  const gradeMin = Math.max(0, min - 5);
  const gradeMax = Math.max(0, Math.min(12, max - 5));
  return Array.from({ length: gradeMax - gradeMin + 1 }, (_value, index) => String(gradeMin + index));
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function addressFor(item: RssItem, feed: LibraryFeed) {
  if (item.virtual) return `Online event hosted by ${feed.organization}`;
  const parts = [item.locationName, [item.number, item.street].filter(Boolean).join(" "), item.city || feed.city, item.state || "ON", item.zip]
    .filter(Boolean)
    .join(", ");
  return parts || `${feed.city}, ON`;
}

function contactFor(item: RssItem, feed: LibraryFeed) {
  return item.contactEmail || item.contactPhone || item.contactName || feed.providerContact;
}

export function toOpportunity(item: RssItem, feed: LibraryFeed): Opportunity {
  const category = inferCategory(item);
  const { ageLabel, ...ages } = inferLibraryOpportunityAges(item);
  const startDate = normalizeDate(item.startDate);
  if (!startDate) throw new Error(`Missing or invalid source start date for ${item.title}.`);
  const endDate = normalizeDate(item.endDate);
  const locationLatitude = item.latitude ?? (feed.region === "Toronto" ? 43.6532 : 43.8561);
  const locationLongitude = item.longitude ?? (feed.region === "Toronto" ? -79.3832 : -79.337);
  const summary = item.description.slice(0, 260) || `${item.title} from ${feed.organization}.`;
  const tags = Array.from(new Set(item.categories.map((sourceCategory) => sourceCategory.toLowerCase()))).slice(0, 10);

  return {
    id: `${feed.id}-${slug(item.link.split("/").pop() || item.title)}`,
    title: item.title,
    organization: feed.organization,
    provider: feed.organization,
    // Keep the source evidence even when the card summary is shortened.
    description: item.description || summary,
    summary,
    type: inferType(item),
    category,
    categories: Array.from(new Set<Category>(isStemishCategory(category) ? ["STEM", category] : [category])),
    communityFocus: inferCommunityFocus(item),
    city: item.city || feed.city,
    region: feed.region,
    address: addressFor(item, feed),
    latitude: locationLatitude,
    longitude: locationLongitude,
    virtual: item.virtual,
    startDate,
    endDate,
    deadline: startDate,
    ageMin: ages.min,
    ageMax: ages.max,
    ageLabel,
    ages,
    grades: gradesFromAges(ages.min, ages.max),
    language: allLanguages,
    languages: allLanguages,
    cost: "Free to join",
    sourceUrl: item.link,
    lastChecked: timestampNow().slice(0, 10),
    lastSeen: timestampNow().slice(0, 10),
    status: "active",
    accessibility: ["Confirm accessibility and accommodation arrangements with the provider.", item.virtual ? "Online event" : "Public library location"],
    equipment: item.virtual ? "Internet-connected device may be needed." : "Check the provider's event page for equipment and materials requirements.",
    food: "No food listed.",
    capacity: item.capacity ? `${item.capacity} spots listed by source.` : "Check the source page for availability.",
    commitment: endDate ? "Single scheduled library program or series date from source feed." : "Check the source page for time commitment.",
    registrationUrl: item.link,
    providerContact: contactFor(item, feed),
    freeStatusProof: `Official ${feed.organization} public event feed. No-cost library programs only; items with charges, full registration, or cancellation are filtered out before publishing.`,
    lastVerified: timestampNow().slice(0, 10),
    trustedSource: true,
    volunteerHoursEligible: category === "Volunteer Hours",
    coopEligible: category === "Co-op & SHSM",
    paidPosition: false,
    tags,
    sources: [
      {
        label: `Official ${feed.organization} event page`,
        url: item.link,
        capturedAt: timestampNow(),
        confidence: "high"
      }
    ],
    adminAuditTrail: [
      {
        label: "Generated from official feed",
        at: timestampNow(),
        actor: "Library RSS generator",
        detail: "Structured public event feed supplied title, date, source URL, location, category, and registration status."
      }
    ]
  };
}

async function fetchFeedOnce(feed: LibraryFeed, page: number, fetcher: typeof fetch) {
  const url = `https://gateway.bibliocommons.com/v2/libraries/${feed.libraryId}/rss/events?page=${page}`;
  const response = await fetcher(url, {
    signal: AbortSignal.timeout(15000),
    headers: { "User-Agent": "GTA FREE STEM Opportunities static feed generator; review-safe public data" }
  });
  if (!response.ok) throw new Error(`${feed.organization} page ${page}: ${response.status} ${response.statusText}`);
  const xml = await response.text();
  if (!/<rss\b/i.test(xml) || !/<channel\b/i.test(xml) || !/<\/channel\s*>/i.test(xml) || !/<\/rss\s*>/i.test(xml)) {
    throw new Error(`${feed.organization} page ${page}: response was not a complete RSS feed.`);
  }
  return xml;
}

export async function fetchFeed(feed: LibraryFeed, page: number, fetcher: typeof fetch = fetch) {
  try {
    return await fetchFeedOnce(feed, page, fetcher);
  } catch (error) {
    console.warn(`Retrying ${feed.organization} page ${page} once: ${error instanceof Error ? error.message : "fetch failed"}.`);
    // Count one final outcome per source page. A retry never turns an
    // unresolved failure into a successful page in the health assessment.
    return fetchFeedOnce(feed, page, fetcher);
  }
}

function previousPublishedLibraryCount() {
  try {
    const source = readFileSync("lib/generatedLibraryOpportunities.ts", "utf8");
    const currentExport = source.match(/export const generatedLibraryOpportunities = ([\s\S]*?) satisfies Opportunity\[\];/);
    if (!currentExport) return 0;
    const parsed: unknown = JSON.parse(currentExport[1]);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

async function main() {
  const startedAt = Date.now();
  const refreshTime = new Date();
  let fetchedBytes = 0;
  const seen = new Set<string>();
  const generated: Opportunity[] = [];
  const warnings: string[] = [];
  const feedStats = new Map<string, FeedRefreshStats>(
    feeds.map((feed) => [
      feed.id,
      {
        sourceId: feed.id,
        organization: feed.organization,
        attemptedPages: 0,
        successfulPages: 0,
        acceptedListings: 0
      }
    ])
  );
  const excluded = {
    outsideDateWindow: 0,
    duplicates: 0
  };

  for (const feed of feeds) {
    const stats = feedStats.get(feed.id);
    if (!stats) throw new Error(`Missing refresh statistics for ${feed.id}.`);
    let exhausted = false;
    let rawItems = 0;
    for (let page = 1; page <= feed.pages; page += 2) {
      const pageNumbers = [page, page + 1].filter((number) => number <= feed.pages);
      stats.attemptedPages += pageNumbers.length;
      // Two requests at a time, within one provider only. Process responses in
      // page order and account for both outcomes, including a prefetched tail.
      const results = await Promise.allSettled(pageNumbers.map((number) => fetchFeed(feed, number)));
      for (const [index, result] of results.entries()) {
        if (result.status === "rejected") {
          const detail = result.reason instanceof Error ? result.reason.message : "unknown error";
          warnings.push(`${feed.organization} page ${pageNumbers[index]} failed after one retry: ${detail}`);
          continue;
        }
        const xml = result.value;
        fetchedBytes += Buffer.byteLength(xml, "utf8");
        stats.successfulPages += 1;
        const items = parseItems(xml);
        rawItems += items.length;
        for (const item of items) {
          if (!shouldInclude(item, refreshTime)) continue;
          if (!isWithinActiveWindow(item, refreshTime)) {
            excluded.outsideDateWindow += 1;
            continue;
          }
          if (seen.has(item.link)) { excluded.duplicates += 1; continue; }
          seen.add(item.link);
          generated.push(toOpportunity(item, feed));
          stats.acceptedListings += 1;
        }
        if (items.length < 25) exhausted = true;
      }
      if (exhausted) break;
    }
    console.log(`${feed.organization}: ${stats.attemptedPages} pages, ${rawItems} raw events, ${stats.acceptedListings} eligible events; ${exhausted ? "feed ended" : "page budget reached"}.`);
    assertCompleteLibraryPagination(feed.organization, exhausted, feed.pages);
  }

  generated.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  const selected = generated;
  const refreshAssessment = evaluateLibraryRefreshHealth({
    generatedAt: timestampNow(),
    sources: Array.from(feedStats.values()),
    acceptedListings: selected.length,
    previousPublishedListings: previousPublishedLibraryCount(),
    minimumPageSuccessRatio: numericEnv("GTA_MIN_LIBRARY_PAGE_SUCCESS_RATIO"),
    minimumPerSourceSuccessRatio: numericEnv("GTA_MIN_LIBRARY_SOURCE_SUCCESS_RATIO"),
    minimumOutputRatio: numericEnv("GTA_MIN_LIBRARY_OUTPUT_RATIO"),
    minimumPublishedListings: numericEnv("GTA_MIN_LIBRARY_OPPORTUNITIES")
  });

  if (!refreshAssessment.healthy) {
    console.error("Library refresh was rejected before generated files were written. The previous committed feed remains intact.");
    for (const reason of refreshAssessment.health.failureReasons) console.error(`REJECTED: ${reason}`);
    throw new Error("Library source health did not meet the publication policy.");
  }
  if (selected.length > maxLibraryOpportunities) {
    throw new Error(`Output limit ${maxLibraryOpportunities} would omit ${selected.length - maxLibraryOpportunities} eligible library events. No files were written. Review a higher bounded GTA_MAX_LIBRARY_OPPORTUNITIES or a shorter date horizon.`);
  }

  const output = `import type { LibrarySourceHealth } from "./refreshHealth";
import type { Opportunity } from "./types";

export const generatedLibraryOpportunities = ${JSON.stringify(selected, null, 2)} satisfies Opportunity[];

export const generatedLibrarySourceHealth = ${JSON.stringify(refreshAssessment.health, null, 2)} satisfies LibrarySourceHealth;
`;
  if (!dryRun) writeFileSync("lib/generatedLibraryOpportunities.ts", output);

  console.log(`${dryRun ? "Dry run: validated" : "Generated"} ${selected.length} source-backed library opportunities within ${lookaheadDays} days (max ${maxLibraryOpportunities}).`);
  console.log(
    `Source health: ${refreshAssessment.health.successfulPages}/${refreshAssessment.health.attemptedPages} pages (${(
      refreshAssessment.health.pageSuccessRatio * 100
    ).toFixed(1)}%), ${refreshAssessment.health.acceptedListings}/${refreshAssessment.health.minimumAcceptedListings} required listings.`
  );
  console.log(`Skipped events outside the date horizon: ${excluded.outsideDateWindow}.`);
  console.log(`Skipped duplicates: ${excluded.duplicates}.`);
  console.log(`Size: ${fetchedBytes} RSS bytes fetched; ${Buffer.byteLength(JSON.stringify(selected), "utf8")} compact untranslated row JSON bytes; ${Buffer.byteLength(output, "utf8")} generated TypeScript bytes.`);
  console.log(`Month-specific age labels: ${selected.filter((item) => item.ageLabel).length}. Duration: ${((Date.now() - startedAt) / 1000).toFixed(1)} seconds.`);
  for (const warning of warnings) console.warn(`WARNING: ${warning}`);
}

export function assertCompleteLibraryPagination(organization: string, exhausted: boolean, maximumPages: number) {
  if (!exhausted) throw new Error(`${organization} reached its ${maximumPages}-page budget before the official feed ended. No master file was written; incomplete collections cannot be published.`);
}

if (process.argv[1] && resolve(process.argv[1]) === resolve("scripts/generate-library-opportunities.ts")) main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
