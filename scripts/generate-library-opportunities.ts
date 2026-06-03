import { writeFileSync } from "node:fs";
import type { Category, CommunityFocus, LanguageCode, Opportunity, OpportunityType, Region } from "../lib/types";

type LibraryFeed = {
  id: string;
  libraryId: string;
  organization: string;
  providerContact: string;
  region: Region;
  city: string;
  pages: number;
};

type RssItem = {
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
    pages: 12
  },
  {
    id: "markham-rss",
    libraryId: "markham",
    organization: "Markham Public Library",
    providerContact: "mplchats@markhamlibrary.ca",
    region: "York",
    city: "Markham",
    pages: 12
  }
];

const includeCategorySignals = [
  "STEAM",
  "Lifelong Learning",
  "Computers",
  "Technology",
  "Digital",
  "Crafts & Hobbies",
  "Reading Programs & Storytimes",
  "Storytime",
  "Business & Finance",
  "New to Canada",
  "Jobs & Careers",
  "PA Day & Holiday Programs"
];

const includeTextSignals = [
  /\bAI\b/i,
  /\bArduino\b/i,
  /\bcareer\b/i,
  /\bcod(e|ing|er|ers)\b/i,
  /\bcomputer(s)?\b/i,
  /\bcraft(s)?\b/i,
  /\bcricut\b/i,
  /\bdata\b/i,
  /\bdigital\b/i,
  /\bengineering\b/i,
  /\bexperiment(s)?\b/i,
  /\bfinancial literacy\b/i,
  /\blearning\b/i,
  /\bmaker(space)?\b/i,
  /\bmath\b/i,
  /\bpython\b/i,
  /\brobot(ic|ics|s)?\b/i,
  /\bscience\b/i,
  /\bSTEAM\b/i,
  /\bSTEM\b/i,
  /\bstorytime\b/i,
  /\btechnology\b/i,
  /\bvolunteer(ing|s)?\b/i
];

const rejectSignals = [
  "Branch Art Exhibit",
  "Exhibit",
  "fee:",
  "fees",
  "paid program",
  "payment",
  "Resident:",
  "Non-resident:",
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

function parseItems(xml: string): RssItem[] {
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

function normalizeDate(value: string | undefined) {
  if (!value) return undefined;
  const cleaned = value.trim();
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(cleaned)) return `${cleaned}:00-04:00`;
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) return `${cleaned}T09:00:00-04:00`;
  const date = new Date(cleaned);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function isCurrent(item: RssItem) {
  const endOrStart = normalizeDate(item.endDate) || normalizeDate(item.startDate);
  if (!endOrStart) return false;
  return new Date(endOrStart).getTime() >= Date.now() - 1000 * 60 * 60 * 24;
}

function shouldInclude(item: RssItem) {
  const text = `${item.title} ${item.description} ${item.categories.join(" ")}`;
  if (item.cancelled || item.full || !item.link || !isCurrent(item)) return false;
  if (/\bFULL\b/i.test(item.title)) return false;
  if (item.categories.some((category) => category.toLowerCase().includes("health & wellness"))) return false;
  if (/\$\s*\d/.test(text)) return false;
  if (rejectSignals.some((signal) => text.toLowerCase().includes(signal.toLowerCase()))) return false;
  return (
    item.categories.some((category) =>
      includeCategorySignals.some((signal) => category.toLowerCase().includes(signal.toLowerCase()))
    ) || includeTextSignals.some((signal) => signal.test(text))
  );
}

function inferCategory(item: RssItem): Category {
  const text = `${item.title} ${item.description} ${item.categories.join(" ")}`.toLowerCase();
  if (/\b(new to canada|newcomer)\b/i.test(text)) return "Newcomer & Settlement";
  if (/\bvolunteer(ing|s)?\b/i.test(text)) return "Volunteer Hours";
  if (/\bco-?op\b|\bshsm\b/i.test(text)) return "Co-op & SHSM";
  if (/\b(business|finance|career|job)\b/i.test(text)) {
    return "Career & Mentorship";
  }
  if (/\brobot(ic|ics|s)?\b|\bcod(e|ing|er|ers)\b|\bpython\b|\barduino\b/i.test(text)) {
    return "Coding & Robotics";
  }
  if (/\bcricut\b|\bmaker(space)?\b|\bcraft(s)?\b|\bcrochet\b|\bknit(ting)?\b|\blego\b/i.test(text)) {
    return "Makerspace & Fabrication";
  }
  if (/\bstorytime\b|\bearlyon\b|\bbaby\b|\btoddler\b|\bfamily time\b/i.test(text)) {
    return "Family Learning";
  }
  if (/\banimation\b|\bmedia\b|\bart\b|\bpainting\b|\bwatercolour\b|\borigami\b/i.test(text)) return "Arts & Media";
  if (/\bscience\b|\bengineering\b|\bsteam\b|\bstem\b/i.test(text)) {
    return "Science & Engineering";
  }
  if (/\bdigital\b|\btechnology\b|\bAI\b/i.test(text)) return "AI & Digital Media";
  return "Family Learning";
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

function inferAges(item: RssItem) {
  const text = `${item.title} ${item.description} ${item.categories.join(" ")}`.toLowerCase();
  const ages = [...text.matchAll(/ages?\s*:?\s*(\d{1,2})\s*(?:-|to|–|—)\s*(\d{1,2})/g)];
  if (ages[0]) return { min: Number(ages[0][1]), max: Number(ages[0][2]) };
  const mins: number[] = [];
  const maxes: number[] = [];
  if (text.includes("birth to five") || text.includes("preschool") || text.includes("infants")) {
    mins.push(0);
    maxes.push(5);
  }
  if (text.includes("school age") || text.includes("children")) {
    mins.push(6);
    maxes.push(12);
  }
  if (text.includes("teen")) {
    mins.push(13);
    maxes.push(17);
  }
  if (text.includes("adult")) {
    mins.push(18);
  }
  if (text.includes("all ages")) {
    mins.push(0);
  }
  return { min: mins.length ? Math.min(...mins) : 0, max: maxes.length ? Math.max(...maxes) : undefined };
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

function toOpportunity(item: RssItem, feed: LibraryFeed): Opportunity {
  const category = inferCategory(item);
  const ages = inferAges(item);
  const startDate = normalizeDate(item.startDate) || new Date().toISOString();
  const endDate = normalizeDate(item.endDate);
  const locationLatitude = item.latitude || (feed.region === "Toronto" ? 43.6532 : 43.8561);
  const locationLongitude = item.longitude || (feed.region === "Toronto" ? -79.3832 : -79.337);
  const summary = item.description.slice(0, 260) || `${item.title} from ${feed.organization}.`;
  const tags = Array.from(new Set([category.toLowerCase(), ...item.categories.map((category) => category.toLowerCase())])).slice(0, 10);

  return {
    id: `${feed.id}-${slug(item.link.split("/").pop() || item.title)}`,
    title: item.title,
    organization: feed.organization,
    provider: feed.organization,
    description: summary,
    summary,
    type: inferType(item),
    category,
    categories: Array.from(new Set<Category>(isStemishCategory(category) ? ["STEM", category] : [category])),
    communityFocus: inferCommunityFocus(item),
    city: feed.city,
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
    ages,
    grades: gradesFromAges(ages.min, ages.max),
    language: allLanguages,
    languages: allLanguages,
    cost: "Free to join",
    sourceUrl: item.link,
    lastChecked: new Date().toISOString().slice(0, 10),
    lastSeen: new Date().toISOString().slice(0, 10),
    status: "active",
    accessibility: ["Library accessibility services available on request", item.virtual ? "Online access" : "Public library location"],
    equipment: item.virtual ? "Internet-connected device may be needed." : "Materials provided unless the source says otherwise.",
    food: "No food listed.",
    capacity: item.capacity ? `${item.capacity} spots listed by source.` : "Check the source page for availability.",
    commitment: endDate ? "Single scheduled library program or series date from source feed." : "Check the source page for time commitment.",
    registrationUrl: item.link,
    providerContact: contactFor(item, feed),
    freeStatusProof: `Official ${feed.organization} public event feed. No-cost library programs only; items with charges, full registration, cancellation, or exhibit-only pages are filtered out before publishing.`,
    lastVerified: new Date().toISOString().slice(0, 10),
    trustedSource: true,
    volunteerHoursEligible: category === "Volunteer Hours",
    coopEligible: category === "Co-op & SHSM",
    paidPosition: false,
    tags,
    sources: [
      {
        label: `Official ${feed.organization} event page`,
        url: item.link,
        capturedAt: new Date().toISOString(),
        confidence: "high"
      }
    ],
    adminAuditTrail: [
      {
        label: "Generated from official feed",
        at: new Date().toISOString(),
        actor: "Library RSS generator",
        detail: "Structured public event feed supplied title, date, source URL, location, category, and registration status."
      }
    ]
  };
}

async function fetchFeed(feed: LibraryFeed, page: number) {
  const url = `https://gateway.bibliocommons.com/v2/libraries/${feed.libraryId}/rss/events?page=${page}`;
  const response = await fetch(url, {
    signal: AbortSignal.timeout(15000),
    headers: { "User-Agent": "GTA FREE STEM Opportunities static feed generator; review-safe public data" }
  });
  if (!response.ok) throw new Error(`${feed.organization} page ${page}: ${response.status} ${response.statusText}`);
  return response.text();
}

async function main() {
  const seen = new Set<string>();
  const generated: Opportunity[] = [];
  const warnings: string[] = [];

  for (const feed of feeds) {
    for (let page = 1; page <= feed.pages; page += 1) {
      try {
        const xml = await fetchFeed(feed, page);
        for (const item of parseItems(xml)) {
          if (!shouldInclude(item)) continue;
          if (seen.has(item.link)) continue;
          seen.add(item.link);
          generated.push(toOpportunity(item, feed));
        }
      } catch (error) {
        warnings.push(error instanceof Error ? error.message : `${feed.organization} page ${page}: unknown error`);
      }
    }
  }

  generated.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  const selected = generated.slice(0, 140);
  const output = `import type { Opportunity } from "./types";

export const generatedLibraryOpportunities = ${JSON.stringify(selected, null, 2)} satisfies Opportunity[];
`;
  writeFileSync("lib/generatedLibraryOpportunities.ts", output);

  console.log(`Generated ${selected.length} source-backed library opportunities.`);
  console.log(`Skipped duplicates/raw overflow: ${Math.max(0, generated.length - selected.length)}.`);
  for (const warning of warnings) console.warn(`WARNING: ${warning}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
