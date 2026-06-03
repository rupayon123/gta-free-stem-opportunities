import { createHash } from "node:crypto";
import { discoverySources, type DiscoveredOpportunity, type DiscoverySource } from "../lib/discovery";
import { opportunities } from "../lib/data";
import type { Category, LanguageCode, Region } from "../lib/types";

type RawCandidate = {
  title: string;
  description?: string;
  sourceUrl?: string;
  startDate?: string;
  endDate?: string;
  city?: string;
  region?: Region;
  organization?: string;
  tags?: string[];
};

type LocalAiCandidate = {
  title?: unknown;
  description?: unknown;
  sourceUrl?: unknown;
  startDate?: unknown;
  endDate?: unknown;
  city?: unknown;
  region?: unknown;
  organization?: unknown;
  tags?: unknown;
};

type DiscoveryOutput = {
  generatedAt: string;
  mode: "deterministic" | "deterministic+local-ai";
  sourcesChecked: number;
  candidatesFound: number;
  newCandidates: number;
  duplicatesSkipped: number;
  opportunities: DiscoveredOpportunity[];
  warnings: string[];
};

const args = new Set(process.argv.slice(2));
const outputFormat = args.has("--format=sql") || args.has("--sql") ? "sql" : args.has("--summary") ? "summary" : "json";
const includeDuplicates = args.has("--include-duplicates");
const useLocalAi = process.env.USE_LOCAL_AI === "1" || process.env.LOCAL_AI_DISCOVERY === "1";
const localAiModel = process.env.LOCAL_AI_MODEL || "deepseek-r1:latest";
const localAiBaseUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
const today = new Date();
const todayIsoDate = today.toISOString().slice(0, 10);

const stemKeywords = [
  "artificial intelligence",
  "arduino",
  "biology",
  "coding",
  "computer",
  "conservation",
  "climate",
  "data",
  "digital media",
  "engineering",
  "genai",
  "hackathon",
  "maker",
  "math",
  "python",
  "robot",
  "science",
  "steam",
  "stem",
  "technology",
  "volunteer"
];

const stemSignalPatterns = [
  /\bai\b/i,
  /\bartificial intelligence\b/i,
  /\bgenai\b/i,
  /\barduino\b/i,
  /\bbiology\b/i,
  /\bcod(e|ing|er|ers)\b/i,
  /\bcomputer(s)?\b/i,
  /\bclimate\b/i,
  /\bconservation\b/i,
  /\bdata\b/i,
  /\bdigital media\b/i,
  /\bengineering\b/i,
  /\bhackathon(s)?\b/i,
  /\bmaker(space)?\b/i,
  /\bmath(ematics)?\b/i,
  /\bpython\b/i,
  /\brobot(ic|ics|s)?\b/i,
  /\bscience\b/i,
  /\bsteam\b/i,
  /\bstem\b/i,
  /\btechnology\b/i,
  /\bvolunteer(ing|s)?\b/i,
  /\bco-?op\b/i,
  /\bshsm\b/i
];

const paidRiskKeywords = [
  "$",
  "fee",
  "fees",
  "paid program",
  "payment",
  "price",
  "purchase",
  "ticket",
  "tuition"
];

const existingSourceUrls = new Set(opportunities.map((opportunity) => normalizeUrl(opportunity.sourceUrl)));
const existingKeys = new Set(
  opportunities.map((opportunity) => normalizedKey(opportunity.title, opportunity.organization, opportunity.city))
);

function decodeHtml(value: string) {
  return value
    .replace(/&#(\d+);/g, (_match, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([a-f0-9]+);/gi, (_match, code) => String.fromCharCode(Number.parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function decodeJsonString(value: string) {
  try {
    return JSON.parse(`"${value.replace(/"/g, '\\"')}"`) as string;
  } catch {
    return value.replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\u0026/g, "&");
  }
}

function stripTags(value: string) {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeUrl(value?: string) {
  if (!value) return "";
  try {
    const url = new URL(decodeHtml(value));
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return decodeHtml(value).replace(/\/$/, "");
  }
}

function absoluteUrl(href: string, baseUrl: string) {
  try {
    return new URL(decodeHtml(href), baseUrl).toString();
  } catch {
    return baseUrl;
  }
}

function normalizedKey(title: string, organization: string, city: string) {
  return `${title}|${organization}|${city}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function makeId(source: DiscoverySource, candidate: RawCandidate) {
  const hash = createHash("sha1")
    .update(`${source.id}:${candidate.title}:${candidate.sourceUrl ?? source.url}:${candidate.startDate ?? ""}`)
    .digest("hex")
    .slice(0, 12);
  const slug = candidate.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 42);
  return `discovered-${source.id}-${slug}-${hash}`;
}

function hasStemSignal(text: string) {
  return stemSignalPatterns.some((pattern) => pattern.test(text));
}

function hasPaidRisk(text: string) {
  const lower = text.toLowerCase();
  return paidRiskKeywords.some((keyword) => lower.includes(keyword));
}

function hasFreeSignal(text: string, source: DiscoverySource) {
  const lower = text.toLowerCase();
  return (
    lower.includes("free") ||
    lower.includes("no cost") ||
    lower.includes("no fee") ||
    lower.includes("included with") ||
    source.sourceType === "library"
  );
}

function inferCategory(text: string): Category {
  const lower = text.toLowerCase();
  if (lower.includes("volunteer")) return "Volunteer Hours";
  if (lower.includes("co-op") || lower.includes("coop") || lower.includes("shsm")) return "Co-op & SHSM";
  if (lower.includes("hackathon") || lower.includes("competition")) return "Hackathons & Competitions";
  if (lower.includes("mentor") || lower.includes("career")) return "Career & Mentorship";
  if (lower.includes("robot") || lower.includes("coding") || lower.includes("python") || lower.includes("arduino")) {
    return "Coding & Robotics";
  }
  if (lower.includes("maker") || lower.includes("fabrication") || lower.includes("3d print")) return "Makerspace & Fabrication";
  if (lower.includes("science") || lower.includes("engineering") || lower.includes("environment")) {
    return "Science & Engineering";
  }
  return "STEM";
}

function inferAges(text: string) {
  const lower = text.toLowerCase();
  const ageRange = lower.match(/ages?\s*(\d{1,2})\s*(?:-|to|–|—)\s*(\d{1,2})/);
  if (ageRange) return { ageMin: Number(ageRange[1]), ageMax: Number(ageRange[2]) };

  const grades = lower.match(/grades?\s*(\d{1,2})\s*(?:-|to|–|—)\s*(\d{1,2})/);
  if (grades) {
    const minGrade = Number(grades[1]);
    const maxGrade = Number(grades[2]);
    return { ageMin: Math.max(0, minGrade + 5), ageMax: maxGrade + 6 };
  }

  if (lower.includes("teen") || lower.includes("high school") || lower.includes("youth")) return { ageMin: 13, ageMax: 18 };
  if (lower.includes("adult")) return { ageMin: 18, ageMax: undefined };
  if (lower.includes("child") || lower.includes("kid")) return { ageMin: 6, ageMax: 12 };
  if (lower.includes("family")) return { ageMin: 0, ageMax: undefined };
  return { ageMin: 1, ageMax: 18 };
}

function inferLanguages(text: string): LanguageCode[] {
  const lower = text.toLowerCase();
  const languages = new Set<LanguageCode>(["en"]);
  if (lower.includes("french")) languages.add("fr");
  if (lower.includes("mandarin")) languages.add("zh");
  if (lower.includes("cantonese")) languages.add("yue");
  if (lower.includes("punjabi")) languages.add("pa");
  if (lower.includes("urdu")) languages.add("ur");
  if (lower.includes("tamil")) languages.add("ta");
  if (lower.includes("tagalog") || lower.includes("filipino")) languages.add("tl");
  if (lower.includes("spanish")) languages.add("es");
  if (lower.includes("arabic")) languages.add("ar");
  if (lower.includes("farsi") || lower.includes("persian")) languages.add("fa");
  if (lower.includes("hindi")) languages.add("hi");
  if (lower.includes("gujarati")) languages.add("gu");
  if (lower.includes("bengali")) languages.add("bn");
  if (lower.includes("japanese")) languages.add("ja");
  if (lower.includes("korean")) languages.add("ko");
  return Array.from(languages);
}

function parseLooseDate(value: string | undefined) {
  if (!value) return undefined;
  const cleaned = decodeHtml(value).trim();
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(cleaned)) return `${cleaned}:00-04:00`;
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) return `${cleaned}T09:00:00-04:00`;
  const date = new Date(cleaned);
  if (!Number.isNaN(date.getTime())) return date.toISOString();
  return undefined;
}

function inferDates(text: string, sourceStart?: string, sourceEnd?: string) {
  const startFromSource = parseLooseDate(sourceStart);
  const endFromSource = parseLooseDate(sourceEnd);
  if (startFromSource) return { startDate: startFromSource, endDate: endFromSource };

  const iso = text.match(/\b(20\d{2}-\d{2}-\d{2})(?:T(\d{2}:\d{2}))?\b/);
  if (iso) return { startDate: parseLooseDate(iso[0]) };

  const monthDate = text.match(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+20\d{2}\b/i
  );
  if (monthDate) return { startDate: parseLooseDate(monthDate[0]) };

  return { startDate: undefined, endDate: undefined };
}

function isExpired(date: string | undefined) {
  if (!date) return false;
  return new Date(date).getTime() < today.getTime() - 1000 * 60 * 60 * 24;
}

function buildOpportunity(source: DiscoverySource, candidate: RawCandidate): DiscoveredOpportunity | null {
  const title = stripTags(candidate.title);
  const description = stripTags(candidate.description || `${title} from ${source.name}.`);
  const combinedText = `${title} ${description}`;
  if (
    /\b(branch art exhibit|science fiction|digital (video|magazines|newspapers|comics|archive)|computer & library training|computers, printing|email us|translation disclaimer|get started|event payment system|job fairs)\b/i.test(
      title
    ) ||
    /^(my events|visit our website|technology|volunteer|programs?|events?|register|learn more|contact us|science & technology)$/i.test(
      title
    ) ||
    /^best free science & tech events/i.test(title)
  ) {
    return null;
  }
  if (
    /^(city of mississauga|jobs and volunteer|conservation parks & lands|taking action on climate change|creating climate ready homes|conservation|member of conservation ontario|view all volunteer opportunities)$/i.test(
      title
    ) ||
    /\b(conservation park|conservation area)\b/i.test(title)
  ) {
    return null;
  }
  if (source.id === "cvc-youth" && !/\b(corps|volunteer|youth|student|intern|co-?op|shsm)\b/i.test(title)) {
    return null;
  }
  if (
    source.id === "trca-youth" &&
    !/\b(youth|volunteer|girls|professional|professionals|corps|newcomer|leadership|student|intern|co-?op|shsm)\b/i.test(
      title
    )
  ) {
    return null;
  }
  if (title.length < 5 || !hasStemSignal(combinedText)) return null;
  if (/\$\s*\d|resident:\s*\$|non-resident:\s*\$|cost of the program|program cost|tuition|paid program/i.test(combinedText)) {
    return null;
  }

  const { startDate, endDate } = inferDates(combinedText, candidate.startDate, candidate.endDate);
  const reviewReasons: string[] = [];
  if (!startDate) reviewReasons.push("No clear future date found on the crawled page.");
  if (isExpired(endDate || startDate)) reviewReasons.push("Date appears expired.");
  if (!hasFreeSignal(combinedText, source)) reviewReasons.push("Free access wording needs human confirmation.");
  if (hasPaidRisk(combinedText) && !combinedText.toLowerCase().includes("free")) {
    reviewReasons.push("Cost-related words appeared near the listing.");
  }
  if (!candidate.sourceUrl) reviewReasons.push("Exact listing URL was not found; using source page URL.");
  if (!source.trusted) reviewReasons.push("Source is a broad public event index, so official provider confirmation is needed.");

  const ages = inferAges(combinedText);
  const sourceUrl = normalizeUrl(candidate.sourceUrl || source.url);
  const city = candidate.city || source.city || "Toronto";
  const organization = candidate.organization || source.organization;
  const region = candidate.region || source.region || "Toronto";
  const category = inferCategory(combinedText);
  const status = isExpired(endDate || startDate) ? "expired" : "needs_review";
  const confidence = reviewReasons.length <= 1 && source.trusted ? "high" : reviewReasons.length <= 3 ? "medium" : "needs_review";

  return {
    id: makeId(source, { ...candidate, sourceUrl, startDate }),
    title,
    organization,
    description: description.slice(0, 800),
    city,
    region,
    ageMin: ages.ageMin,
    ageMax: ages.ageMax,
    category,
    cost: "Free to join",
    language: inferLanguages(combinedText),
    deadline: startDate,
    startDate: startDate || `${todayIsoDate}T09:00:00-04:00`,
    endDate,
    sourceUrl,
    lastChecked: todayIsoDate,
    lastSeen: todayIsoDate,
    status,
    tags: Array.from(new Set([category.toLowerCase(), ...source.keywords, ...(candidate.tags || [])])).slice(0, 12),
    confidence,
    reviewReasons,
    sourceName: source.name
  };
}

async function fetchSource(source: DiscoverySource) {
  const response = await fetch(source.url, {
    signal: AbortSignal.timeout(15000),
    headers: {
      "User-Agent": "GTA FREE STEM Opportunities discovery bot; review-only; no auto-publish",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
}

function extractBiblioCommonsCandidates(html: string, source: DiscoverySource): RawCandidate[] {
  const candidates: RawCandidate[] = [];
  const seen = new Set<string>();
  const linkRegex = /href="([^"]*\/events\/([a-f0-9]+)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  let linkMatch: RegExpExecArray | null;

  while ((linkMatch = linkRegex.exec(html))) {
    const sourceUrl = absoluteUrl(linkMatch[1], source.url);
    const eventId = linkMatch[2];
    const linkTitle = stripTags(linkMatch[3]);
    if (!linkTitle || seen.has(eventId)) continue;
    seen.add(eventId);

    const eventIndex = html.indexOf(`"id":"${eventId}"`);
    const context =
      eventIndex >= 0
        ? html.slice(eventIndex, eventIndex + 7000)
        : html.slice(Math.max(0, linkMatch.index - 1500), linkMatch.index + 4000);
    const title = decodeJsonString(context.match(/"title":"((?:\\"|[^"])*)"/)?.[1] || linkTitle);
    const start = decodeJsonString(context.match(/"start":"((?:\\"|[^"])*)"/)?.[1] || "");
    const end = decodeJsonString(context.match(/"end":"((?:\\"|[^"])*)"/)?.[1] || "");
    const description = decodeJsonString(context.match(/"description":"((?:\\"|[^"])*)"/)?.[1] || "");

    candidates.push({
      title,
      description: stripTags(description),
      sourceUrl,
      startDate: start,
      endDate: end,
      city: source.city,
      region: source.region,
      organization: source.organization
    });
  }

  return candidates;
}

function extractGenericCandidates(html: string, source: DiscoverySource): RawCandidate[] {
  const candidates: RawCandidate[] = [];
  const pageTitle =
    decodeHtml(html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)?.[1] || "") ||
    stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
  const pageDescription =
    decodeHtml(html.match(/<meta[^>]+(?:name|property)=["'](?:description|og:description)["'][^>]+content=["']([^"']+)["']/i)?.[1] || "") ||
    "";

  if (pageTitle && hasStemSignal(`${pageTitle} ${pageDescription}`)) {
    candidates.push({
      title: pageTitle,
      description: pageDescription,
      sourceUrl: source.url,
      city: source.city,
      region: source.region,
      organization: source.organization
    });
  }

  const anchorRegex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]{0,500}?)<\/a>/gi;
  let match: RegExpExecArray | null;
  while ((match = anchorRegex.exec(html))) {
    const text = stripTags(match[2]);
    if (text.length < 8 || text.length > 160) continue;
    if (!hasStemSignal(text)) continue;
    candidates.push({
      title: text,
      description: `${text} listed by ${source.name}.`,
      sourceUrl: absoluteUrl(match[1], source.url),
      city: source.city,
      region: source.region,
      organization: source.organization
    });
  }

  return candidates;
}

async function extractWithLocalAi(source: DiscoverySource, html: string, warnings: string[]): Promise<RawCandidate[]> {
  if (!useLocalAi) return [];
  const text = stripTags(html).slice(0, 12000);
  const prompt = `Extract real free STEM, coding, science, hackathon, youth volunteer, co-op, SHSM, or learning opportunities in the GTA from this public source page. Return only JSON array items with title, description, sourceUrl, startDate, endDate, city, region, organization, tags. If unsure, include the item but keep fields conservative. Source URL: ${source.url}\n\n${text}`;

  try {
    const response = await fetch(`${localAiBaseUrl.replace(/\/$/, "")}/api/generate`, {
      method: "POST",
      signal: AbortSignal.timeout(30000),
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: localAiModel,
        prompt,
        stream: false,
        format: "json"
      })
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const payload = (await response.json()) as { response?: string };
    const raw = payload.response || "[]";
    const parsed = JSON.parse(raw) as { opportunities?: unknown } | unknown[];
    const array: LocalAiCandidate[] = (
      Array.isArray(parsed) ? parsed : Array.isArray(parsed.opportunities) ? parsed.opportunities : []
    ) as LocalAiCandidate[];
    return array
      .filter((item) => item && typeof item.title === "string")
      .map((item) => ({
        title: item.title as string,
        description: typeof item.description === "string" ? item.description : undefined,
        sourceUrl: typeof item.sourceUrl === "string" ? item.sourceUrl : source.url,
        startDate: typeof item.startDate === "string" ? item.startDate : undefined,
        endDate: typeof item.endDate === "string" ? item.endDate : undefined,
        city: typeof item.city === "string" ? item.city : source.city,
        region: typeof item.region === "string" ? (item.region as Region) : source.region,
        organization: typeof item.organization === "string" ? item.organization : source.organization,
        tags: Array.isArray(item.tags) ? item.tags.map(String) : []
      }));
  } catch (error) {
    warnings.push(
      `Local AI extraction skipped for ${source.name}: ${
        error instanceof Error ? error.message : "unknown Ollama/local model error"
      }. Deterministic extraction still ran.`
    );
    return [];
  }
}

function dedupeCandidates(candidates: DiscoveredOpportunity[]) {
  const seen = new Set<string>();
  const output: DiscoveredOpportunity[] = [];
  let duplicatesSkipped = 0;

  for (const candidate of candidates) {
    const sourceKey = normalizeUrl(candidate.sourceUrl);
    const key = normalizedKey(candidate.title, candidate.organization, candidate.city);
    const duplicate = seen.has(sourceKey) || seen.has(key) || existingSourceUrls.has(sourceKey) || existingKeys.has(key);
    seen.add(sourceKey);
    seen.add(key);
    if (duplicate && !includeDuplicates) {
      duplicatesSkipped += 1;
      continue;
    }
    output.push(candidate);
  }

  return { output, duplicatesSkipped };
}

function sqlString(value: string | undefined | null) {
  if (value === undefined || value === null || value === "") return "null";
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlArray(values: string[]) {
  if (!values.length) return "'{}'";
  return `array[${values.map((value) => sqlString(value)).join(", ")}]`;
}

function toSql(opportunitiesToInsert: DiscoveredOpportunity[]) {
  if (!opportunitiesToInsert.length) {
    return "-- No new discovered opportunities after duplicate filtering.\n";
  }

  const rows = opportunitiesToInsert.map((opportunity) => {
    return `(
    ${sqlString(opportunity.id)},
    ${sqlString(opportunity.title)},
    ${sqlString(opportunity.organization)},
    ${sqlString(opportunity.description)},
    ${sqlString(opportunity.city)},
    ${sqlString(opportunity.region)}::public.gta_region,
    ${opportunity.ageMin},
    ${opportunity.ageMax ?? "null"},
    ${sqlString(opportunity.category)},
    ${sqlString(opportunity.cost)},
    ${sqlArray(opportunity.language)},
    ${sqlString(opportunity.deadline)}::timestamptz,
    ${sqlString(opportunity.startDate)}::timestamptz,
    ${sqlString(opportunity.endDate)}::timestamptz,
    ${sqlString(opportunity.sourceUrl)},
    ${sqlString(opportunity.lastChecked)}::date,
    ${sqlString(opportunity.lastSeen)}::date,
    ${sqlString(opportunity.status)}::public.opportunity_status,
    ${sqlArray(opportunity.tags)}
  )`;
  });

  return `-- Generated by npm run discover:sql.
-- Review-first import: new discovered rows are inserted as needs_review or expired.
-- Run supabase/schema.sql before this script.

insert into public.opportunities (
  id,
  title,
  organization,
  description,
  city,
  region,
  age_min,
  age_max,
  category,
  cost,
  language,
  deadline,
  start_date,
  end_date,
  source_url,
  last_checked,
  last_seen,
  status,
  tags
) values
${rows.join(",\n")}
on conflict (id) do update set
  title = excluded.title,
  organization = excluded.organization,
  description = excluded.description,
  city = excluded.city,
  region = excluded.region,
  age_min = excluded.age_min,
  age_max = excluded.age_max,
  category = excluded.category,
  cost = excluded.cost,
  language = excluded.language,
  deadline = excluded.deadline,
  start_date = excluded.start_date,
  end_date = excluded.end_date,
  source_url = excluded.source_url,
  last_checked = excluded.last_checked,
  last_seen = excluded.last_seen,
  status = excluded.status,
  tags = excluded.tags,
  updated_at = now();
`;
}

async function main() {
  const warnings: string[] = [];
  const discovered: DiscoveredOpportunity[] = [];
  let candidatesFound = 0;

  for (const source of discoverySources) {
    try {
      const html = await fetchSource(source);
      const deterministicCandidates = source.url.includes("bibliocommons.com")
        ? extractBiblioCommonsCandidates(html, source)
        : [...extractBiblioCommonsCandidates(html, source), ...extractGenericCandidates(html, source)];
      const aiCandidates = await extractWithLocalAi(source, html, warnings);
      candidatesFound += deterministicCandidates.length + aiCandidates.length;

      for (const candidate of [...deterministicCandidates, ...aiCandidates]) {
        const opportunity = buildOpportunity(source, candidate);
        if (opportunity) discovered.push(opportunity);
      }
    } catch (error) {
      warnings.push(`Could not check ${source.name}: ${error instanceof Error ? error.message : "unknown error"}.`);
    }
  }

  const { output, duplicatesSkipped } = dedupeCandidates(discovered);
  const result: DiscoveryOutput = {
    generatedAt: new Date().toISOString(),
    mode: useLocalAi ? "deterministic+local-ai" : "deterministic",
    sourcesChecked: discoverySources.length,
    candidatesFound,
    newCandidates: output.length,
    duplicatesSkipped,
    opportunities: output,
    warnings
  };

  if (outputFormat === "sql") {
    console.log(toSql(output));
    if (warnings.length) {
      console.error(warnings.map((warning) => `WARNING: ${warning}`).join("\n"));
    }
    return;
  }

  if (outputFormat === "summary") {
    console.log("GTA FREE STEM discovery summary");
    console.log(`Mode: ${result.mode}`);
    console.log(`Sources checked: ${result.sourcesChecked}`);
    console.log(`Raw candidates found: ${result.candidatesFound}`);
    console.log(`New review candidates: ${result.newCandidates}`);
    console.log(`Duplicates skipped: ${result.duplicatesSkipped}`);
    console.log(`Warnings: ${result.warnings.length}`);
    for (const opportunity of result.opportunities.slice(0, 12)) {
      console.log(`- ${opportunity.title} | ${opportunity.organization} | ${opportunity.city} | ${opportunity.status}`);
    }
    for (const warning of result.warnings) {
      console.log(`WARNING: ${warning}`);
    }
    return;
  }

  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
