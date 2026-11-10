import { createHash } from "node:crypto";
import { parseYouthListing, validTimestamp, type YouthListing } from "../../lib/highSchool/model";
import type { YouthRefreshOutcome, YouthSourceObservation } from "../../lib/youthHunter/feed";

export const auroraUrls = {
  index: "https://aurorapl.ca/volunteers/",
  reading: "https://aurorapl.ca/form-reading-buddies-teen-application/",
  math: "https://aurorapl.ca/form-math-buddies-teen-application/",
  faq: "https://aurorapl.ca/blogs/post/frequently-asked-questions-volunteering-at-the-library/"
} as const;
export type AuroraPages = Record<keyof typeof auroraUrls, string>;
const maximumPageBytes = 2_000_000;
function requireValue(ok: unknown, message: string): asserts ok { if (!ok) throw new Error(`Aurora adapter needs review: ${message}`); }
const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", rsquo: "'" };
function text(html: string): string {
  return html.replace(/<!--[\s\S]*?-->/g, " ").replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&#(?:x([a-f\d]+)|(\d+));/gi, (_m, hex: string | undefined, dec: string | undefined) => {
      const n = Number.parseInt(hex ?? dec!, hex ? 16 : 10); return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : " ";
    }).replace(/&(amp|lt|gt|quot|apos|nbsp|ndash|mdash|rsquo);/gi, (_m, name: string) => (entities[name.toLowerCase()] ?? " "))
    .replace(/\s+/g, " ").trim();
}
function section(html: string, title: RegExp): { heading: string; html: string; text: string } {
  const clean = html.replace(/<!--[\s\S]*?-->/g, " ").replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ");
  const headings = [...clean.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)];
  const found = headings.filter(m => title.test(text(m[2])));
  requireValue(found.length === 1, "missing or duplicate expected section");
  const start = found[0]; const end = headings.find(m => m.index! > start.index! && Number(m[1]) <= Number(start[1]));
  const body = clean.slice(start.index! + start[0].length, end?.index ?? clean.length);
  return { heading: text(start[2]), html: body, text: text(body) };
}
function linkedExactly(html: string, expected: string): boolean {
  return [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].some(m => {
    try { return new URL(m[1].replace(/&amp;/g, "&"), auroraUrls.index).href === expected; } catch { return false; }
  });
}
/** Only provider-written sections are read. No form controls, user values,
 * CAPTCHA, portal, submit endpoint or arbitrary links are processed. */
export function parseAuroraPages(pages: AuroraPages, checkedAt: string): YouthSourceObservation {
  requireValue(validTimestamp(checkedAt), "invalid real source check time");
  for (const html of Object.values(pages)) requireValue(typeof html === "string" && Buffer.byteLength(html, "utf8") <= maximumPageBytes, "page bound");
  const index = section(pages.index, /^TEENS:\s*Reading\s*\/\s*Math Buddies\b/i);
  const grade = index.text.match(/Grades\s*(\d{1,2})\s*(?:-|–|—|to)\s*(\d{1,2})/i);
  requireValue(grade && Number(grade[1]) >= 9 && Number(grade[2]) <= 12 && Number(grade[1]) <= Number(grade[2]), "explicit volunteer high-school grades");
  requireValue(/volunteers/i.test(index.text), "actual volunteer task");
  const faq = section(pages.faq, /^Frequently Asked Questions:\s*Volunteering at the Library$/i);
  // Exclude the existing-volunteer portal and subsequent unrelated blog content.
  const faqText = text(faq.html.split(/<h[2-6]\b[^>]*>\s*Volunteer Portal/i)[0]);
  requireValue(/all volunteers must complete an orientation/i.test(faqText), "mandatory orientation fact");
  requireValue(/(?:10|ten)[ -]week/i.test(faqText), "ten-week programme agreement");
  requireValue(/once a week/i.test(faqText) && /mutually convenient schedule/i.test(faqText), "weekly scheduling conditions");
  const closed = /\bclosed\b|not (?:currently )?accepting (?:applications|volunteers)/i.test(index.heading + " " + index.text);
  requireValue(closed || /on[ -]?going/i.test(index.heading), "explicit recruitment state");
  const singleApplication = /please submit only one application/i.test(index.text);
  const faqGrade = faqText.match(/Grades\s*(\d{1,2})\s*(?:-|–|—|to)\s*(\d{1,2})/i);
  const conflictingGrades = !!faqGrade && (Number(faqGrade[1]) !== Number(grade![1]) || Number(faqGrade[2]) !== Number(grade![2]));
  const fingerprints: Record<string, string> = {}; const reviewRequiredIds: string[] = [];
  const roles = (["reading", "math"] as const).map(subject => {
    requireValue(linkedExactly(index.html, auroraUrls[subject]), "exact application route missing");
    const detail = section(pages[subject], new RegExp(`^${subject === "reading" ? "Reading" : "Math"} Buddies\\s*[-–—]\\s*Teen Application$`, "i"));
    const d = detail.text;
    requireValue(/high school volunteer/i.test(d), "volunteer not beneficiary audience");
    requireValue(/(?:ten|10)\s+(?:one[ -]hour|1[ -]hour)\s+sessions/i.test(d), "ten one-hour commitment");
    requireValue(/does not guarantee a spot/i.test(d) && /incomplete application will not be considered/i.test(d), "selection limitations");
    const id = `aurora-buddies-${subject}`;
    // New screening/payment/eligibility conditions must not be missed by an
    // authored template. Hold that role; do not silently treat it as free.
    const unexpected = /vulnerable sector|police (?:record|check)|background check|registration fee|participation fee|required payment|required donation|required purchase|\$\s*\d|must (?:bring|have|provide|live|reside|be)|must complete (?!an? orientation)|required (?:training|course|purchase|check)|mandatory (?:fee|training|check)|proof of|minimum age/i.test(index.text + " " + d + " " + faqText);
    if (unexpected || conflictingGrades || !singleApplication) reviewRequiredIds.push(id);
    const label = subject === "reading" ? "Reading" : "Math";
    fingerprints[id] = createHash("sha256").update([index.heading, index.text, detail.heading, d, faqText].join("\n")).digest("hex");
    const row: YouthListing = {
      schemaVersion: 1, id, listingKind: "role", pathway: "volunteer", title: `${label} Buddies teen volunteer`, provider: "Aurora Public Library",
      sourceUrl: auroraUrls.index, checkedAt, reviewStatus: "hold",
      audience: { context: "high-school", original: `Volunteer applicants in grades ${grade![1]}–${grade![2]}.`,
        grades: Array.from({ length: Number(grade![2]) - Number(grade![1]) + 1 }, (_, i) => Number(grade![1]) + i),
        restrictions: ["Provider selection and orientation are required; an application is not a confirmed place."] },
      cost: { status: "unknown", original: "A participation-cost or screening-fee exemption was not confirmed.", requiredCosts: [] },
      availability: { status: closed ? "closed" : "open", original: closed ? "Provider role section says recruitment is closed." : "Provider describes ongoing recruitment; placement is not guaranteed.", conflicting: false },
      hours: { status: "not-stated" }, regions: ["York"], delivery: "in-person",
      commitmentOriginal: "Ten one-hour sessions over ten weeks; weekly schedule agreed with the participant.",
      roleDetails: {
        contentMode: "authored-facts", description: `Help younger children practise ${subject === "reading" ? "reading and literacy" : "numeracy"} through library-based activities.`,
        responsibilities: [`Support a younger buddy with ${subject === "reading" ? "reading practice" : "math activities"}.`],
        requirements: [`Volunteer applicant must be in grades ${grade![1]}–${grade![2]}.`, "Complete provider orientation before beginning volunteer work.", "Arrange a mutually suitable weekly library meeting with the assigned buddy.", ...(singleApplication ? ["Provider asks you to submit only one application."] : [])],
        commitment: "Ten weekly sessions lasting one hour each. Planned commitment is not recorded completed time.",
        selection: "Incomplete applications are not considered; submitting an application does not guarantee selection.",
        costNotes: "Costs and any screening expenses remain unconfirmed. This role is not counted as verified free.",
        applicationUrl: auroraUrls[subject], applicationInstructions: (singleApplication ? "Provider asks you to submit only one application. " : "") + "Read the provider application conditions and apply directly. Provider follow-up covers orientation and placement."
      }
    };
    return parseYouthListing(row);
  });
  return { providerId: "aurora-library", adapterVersion: 1, checkedAt, complete: true, roles, fingerprints, reviewRequiredIds };
}

async function boundedHtml(response: Response): Promise<string> {
  requireValue(response.ok && response.headers.get("content-type")?.includes("text/html"), "HTTP or content type");
  const declared = response.headers.get("content-length");
  requireValue(!declared || (Number.isSafeInteger(Number(declared)) && Number(declared) >= 0 && Number(declared) <= maximumPageBytes), "declared page size");
  const reader = response.body?.getReader(); requireValue(reader, "missing response body");
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) {
      const next = await reader.read(); if (next.done) break;
      size += next.value.byteLength; requireValue(size <= maximumPageBytes, "stream page size"); chunks.push(next.value);
    }
  } catch (error) { await reader.cancel().catch(() => {}); throw error; }
  return new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(chunks));
}
/** At most FOUR sequential public GETs. Callable only, no imports trigger I/O,
 * no crawling, cookies/accounts, automatic writes or schedules. */
export async function collectAuroraRoles(options: {
  fetcher?: typeof fetch; now: () => string; signal?: AbortSignal
}): Promise<YouthRefreshOutcome> {
  const fetcher = options.fetcher ?? fetch; const pages = {} as AuroraPages;
  try {
    for (const key of Object.keys(auroraUrls) as (keyof typeof auroraUrls)[]) {
      const response = await fetcher(auroraUrls[key], { redirect: "error", credentials: "omit",
        signal: options.signal ? AbortSignal.any([options.signal, AbortSignal.timeout(15_000)]) : AbortSignal.timeout(15_000),
        headers: { Accept: "text/html", "User-Agent": "GTA Free STEM bounded provider-role verification" } });
      requireValue(!response.url || response.url === auroraUrls[key], "redirect or source identity");
      pages[key] = await boundedHtml(response);
    }
    return { ok: true, observation: parseAuroraPages(pages, options.now()) };
  } catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Provider source check failed" }; }
}
