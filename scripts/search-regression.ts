import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { opportunities } from "../lib/data";
import { languageMeta, translatedCategory } from "../lib/i18n";
import { publicOpportunities } from "../lib/opportunityStatus";
import { hasUnresolvedProximityQuery, normalizeSearchText, searchOpportunities, type OpportunitySearchOptions } from "../lib/search";
import { librarySearchTerms } from "../lib/searchLexicon";
import type { Filters, LanguageCode, Opportunity } from "../lib/types";
import { filterOpportunities, haversineKm } from "../lib/utils";

const publicItems = publicOpportunities(opportunities);
assert(publicItems.length > 0, "Search regression needs at least one current public listing.");
const seed = publicItems[0];
function fixture(id: string, changes: Partial<Opportunity>): Opportunity {
  return {
    ...seed,
    id,
    title: "Community workshop",
    provider: "Community Centre",
    organization: "Community Centre",
    description: "An introductory workshop.",
    summary: "An introductory workshop.",
    category: "Family Learning",
    categories: ["Family Learning"],
    tags: [],
    city: "Toronto",
    region: "Toronto",
    address: "Fairview",
    startDate: "2026-11-07",
    endDate: undefined,
    deadline: undefined,
    ...changes
  };
}
const fixtures = [
  fixture("coding", {
    title: "Python Coding Lab",
    provider: "Toronto Public Library",
    organization: "Toronto Public Library",
    description: "Write Python programs and explore robotics.",
    summary: "Write Python programs and explore robotics.",
    category: "Coding & Robotics",
    categories: ["Coding & Robotics"]
  }),
  fixture("sculpt", {
    title: "3D Sculpting Workshop",
    provider: "Toronto Public Library",
    organization: "Toronto Public Library",
    description: "Create a digital sculpture with Blender modeling software.",
    summary: "Create a digital sculpture with Blender modeling software.",
    category: "Makerspace & Fabrication",
    categories: ["Makerspace & Fabrication"]
  }),
  fixture("ai", {
    title: "AI Art Lab",
    description: "Explore artificial intelligence image tools.",
    summary: "Explore artificial intelligence image tools.",
    category: "AI & Digital Media",
    categories: ["AI & Digital Media"]
  }),
  fixture("noise", { title: "Fairview Open House", description: "Check availability at the community centre.", summary: "Check availability at the community centre." }),
  fixture("rank-title", { title: "Astronomy", category: "Science & Engineering", categories: ["Science & Engineering"] }),
  fixture("rank-body", { title: "Evening Workshop", description: "A longer introduction to astronomy and observing the sky.", category: "Science & Engineering", categories: ["Science & Engineering"] }),
  fixture("numeric", { title: "Session 9", startDate: "2026-12-01" })
];
const markhamEligible = [fixture("markham-coding", { ...fixtures[0], id: "markham-coding", city: "Markham" })];
type SearchCase = { name: string; query: string; language?: LanguageCode; include?: string[]; exclude?: string[]; count?: number; first?: string; items?: Opportunity[]; options?: OpportunitySearchOptions };
const cases: SearchCase[] = [
  { name: "empty browse", query: "", count: fixtures.length },
  { name: "whitespace browse", query: "   ", count: fixtures.length },
  { name: "generic request", query: "show me free programs please", count: fixtures.length },
  { name: "natural request", query: "I'm looking for some free coding activities", include: ["coding"], exclude: ["sculpt", "noise"] },
  { name: "missing letter", query: "libary", include: ["coding", "sculpt"], count: 2 },
  { name: "missing second letter", query: "libray", include: ["coding", "sculpt"], count: 2 },
  { name: "extra letter", query: "libraary", include: ["coding", "sculpt"], count: 2 },
  { name: "case insensitive", query: "LIBRARY", count: 2 },
  { name: "French accent folding", query: "bibliotheque", language: "fr", count: 2 },
  { name: "coding typo", query: "codng", include: ["coding"], exclude: ["sculpt", "noise"] },
  { name: "terms span fields", query: "library python", count: 1, include: ["coding"] },
  { name: "unknown intent", query: "zzyxqv", count: 0 },
  { name: "unknown term is retained", query: "library zzyxqv", count: 0 },
  { name: "AI whole token", query: "AI", count: 1, include: ["ai"], exclude: ["noise"] },
  { name: "short typo is not fuzzy", query: "AX", count: 0 },
  { name: "3D exact", query: "3D sculpting", count: 1, include: ["sculpt"] },
  { name: "numeric word is not fuzzy", query: "4D sculpting", count: 0 },
  { name: "number exact", query: "9", count: 1, include: ["numeric"] },
  { name: "number mismatch", query: "8", count: 0 },
  { name: "date exact", query: "2026-12-01", count: 1, include: ["numeric"] },
  { name: "date mismatch", query: "2026-12-02", count: 0 },
  { name: "proximity is not silently dropped", query: "library near me", count: 0 },
  { name: "translated proximity is retained", query: "附近图书馆", language: "zh", count: 0 },
  { name: "title ranking", query: "astronomy", first: "rank-title" },
  { name: "unknown broad request", query: "show me free zzyxqv programs", count: 0 },
  { name: "code alias follows coding category", query: "code", include: ["coding"], exclude: ["sculpt"] },
  { name: "all substantive words required", query: "python sculpture", count: 0 },
  { name: "fullwidth AI", query: "ＡＩ", count: 1, include: ["ai"] },
  { name: "fullwidth library", query: "ＬＩＢＲＡＲＹ", count: 2 },
  { name: "short accented document and query", query: "éco", items: [fixture("accent", { title: "Éco" })], count: 1 },
  { name: "adjacent transposition", query: "pyhton", include: ["coding"] },
  { name: "resolved Markham proximity", query: "library near me", items: markhamEligible, options: { proximityResolved: true }, count: 1, include: ["markham-coding"] },
  { name: "resolved proximity retains unknown intent", query: "library near me gala", items: markhamEligible, options: { proximityResolved: true }, count: 0 },
  { name: "resolved proximity retains dates", query: "library near me 2026-12-02", items: markhamEligible, options: { proximityResolved: true }, count: 0 },
  { name: "resolved proximity retains numbers", query: "library near me 9", items: markhamEligible, options: { proximityResolved: true }, count: 0 },
  { name: "unknown intent alongside known library", query: "library gala", count: 0 }
];

const naturalLibraryQueries: Record<LanguageCode, string> = {
  en: "show me free library programs",
  fr: "je cherche des activités gratuites à la bibliothèque",
  zh: "我想找免费的图书馆活动",
  yue: "我想搵免費圖書館活動",
  pa: "ਮੈਨੂੰ ਮੁਫ਼ਤ ਲਾਇਬ੍ਰੇਰੀ ਪ੍ਰੋਗਰਾਮ ਦਿਖਾਓ",
  ur: "مجھے مفت لائبریری پروگرام دکھائیں",
  ta: "எனக்கு இலவச நூலகம் நிகழ்ச்சிகள் வேண்டும்",
  tl: "gusto ko ng libreng programa sa aklatan",
  es: "quiero actividades gratis en la biblioteca",
  ar: "أبحث عن أنشطة مجانية في المكتبة",
  fa: "من دنبال برنامه رایگان در کتابخانه می‌خواهم",
  hi: "मुझे पुस्तकालय में मुफ्त कार्यक्रम चाहिए",
  pt: "quero atividades grátis na biblioteca",
  gu: "મને પુસ્તકાલય માં મફત કાર્યક્રમો બતાવો",
  bn: "আমি বিনামূল্যে লাইব্রেরি কার্যক্রম চাই",
  ja: "図書館の無料イベントを探してください",
  ko: "도서관에서 무료 프로그램 찾아주세요",
  hu: "ingyenes könyvtári programokat keresek"
};
for (const language of Object.keys(languageMeta) as LanguageCode[]) {
  cases.push({ name: `natural library request ${language}`, language, query: naturalLibraryQueries[language], count: 2, include: ["coding", "sculpt"] });
}
for (const test of cases) {
  const result = searchOpportunities(test.items ?? fixtures, test.query, test.language, test.options);
  const ids = result.map((item) => item.id);
  if (test.count !== undefined) assert.equal(result.length, test.count, `${test.name}: ${ids.join(", ")}`);
  for (const id of test.include ?? []) assert(ids.includes(id), `${test.name}: missing ${id}`);
  for (const id of test.exclude ?? []) assert(!ids.includes(id), `${test.name}: unexpectedly matched ${id}`);
  if (test.first) assert.equal(ids[0], test.first, `${test.name}: relevance order`);
}

let labelChecks = 0;
let aliasChecks = 0;
for (const language of Object.keys(languageMeta) as LanguageCode[]) {
  const ids = searchOpportunities(fixtures, translatedCategory("Coding & Robotics", language), language).map((item) => item.id);
  assert.deepEqual(ids, ["coding"], `${language}: translated coding label must not include 3D sculpting`);
  labelChecks += 1;
  for (const alias of librarySearchTerms[language]) {
    assert.equal(searchOpportunities(fixtures, alias, language).length, 2, `${language}: library alias ${alias}`);
    aliasChecks += 1;
  }
}
assert.equal(normalizeSearchText("bibliothèque"), "bibliotheque");
for (const value of ["कोडिंग", "கோடிங்", "કોડિંગ", "কোডিং", "ਕੋਡਿੰਗ"]) {
  assert.equal(normalizeSearchText(value), value.normalize("NFC"), `Keep meaningful script marks: ${value}`);
}
assert(hasUnresolvedProximityQuery("free programs near me"));
assert(!hasUnresolvedProximityQuery("Toronto library"));
assert.deepEqual(searchOpportunities(fixtures, "python"), searchOpportunities([...fixtures], "python"), "Fresh array wrappers reuse equivalent document references and results.");
assert.equal(fixtures[0].id, "coding", "Search must not mutate caller ordering.");
assert.deepEqual(searchOpportunities([fixtures[1]], "coding"), [], "Search never broadens the caller's structured eligibility/category subset.");
const realCoding = searchOpportunities(publicItems, "coding");
if (publicItems.some((item) => /coding|python|robot/i.test(item.title))) {
  assert(realCoding.some((item) => /coding|python|robot/i.test(item.title)), "Known current public coding examples are discoverable.");
}
const realLibraryIds = new Set(searchOpportunities(publicItems, "library").map((item) => item.id));
for (const item of publicItems.filter((item) => /\blibrary\b/i.test(`${item.provider} ${item.organization}`))) {
  assert(realLibraryIds.has(item.id), "Known current public library providers are discoverable.");
}

// Exercise the combined filter/search entry point using fresh future fixtures,
// so this check remains useful when the real provider calendar changes.
const checkedAt = new Date().toISOString();
const futureStart = new Date(Date.now() + 7 * 86400000).toISOString();
const combined = fixture("combined", {
  ...fixtures[0], id: "combined", city: "Markham", region: "York",
  category: "Coding & Robotics", categories: ["Coding & Robotics", "Career & Mentorship", "Youth Leadership"],
  ages: { min: 14, max: 17 }, languages: ["fr"],
  communityFocus: ["Black-focused", "Girls/women-focused", "Indigenous-focused"],
  volunteerHoursEligible: true, coopEligible: true,
  latitude: 43.8561, longitude: -79.337, virtual: false,
  status: "active", lastChecked: checkedAt, lastVerified: checkedAt,
  startDate: futureStart, endDate: undefined, deadline: undefined
});
const combinedFilters: Filters = {
  query: "libary near me", region: "York", city: "Markham", category: "Coding & Robotics",
  age: "16", language: "fr", distanceKm: 5, postalCode: "", nearMe: false,
  blackFocused: true, girlsFocused: true, indigenousFocused: true,
  volunteerHours: true, coop: true, mentorship: true, leadership: true
};
const disqualifiers: Partial<Opportunity>[] = [
  { region: "Toronto" }, { city: "Toronto" }, { categories: ["Makerspace & Fabrication"] },
  { ages: { min: 18, max: 24 } }, { languages: ["en"] },
  { communityFocus: ["Girls/women-focused", "Indigenous-focused"] },
  { communityFocus: ["Black-focused", "Indigenous-focused"] },
  { communityFocus: ["Black-focused", "Girls/women-focused"] },
  { volunteerHoursEligible: false }, { coopEligible: false },
  { categories: ["Coding & Robotics", "Youth Leadership"] },
  { categories: ["Coding & Robotics", "Career & Mentorship"] },
  { status: "hidden" }, { status: "expired" }, { status: "needs_review" },
  { lastChecked: new Date(Date.now() - 30 * 86400000).toISOString() },
  { startDate: new Date(Date.now() - 86400000).toISOString() }
];
const combinedItems = [combined, ...disqualifiers.map((change, index) => ({ ...combined, ...change, id: `excluded-${index}` }))];
assert.deepEqual(filterOpportunities(combinedItems, combinedFilters, null).map((item) => item.id), ["combined"], "Fuzzy/proximity search preserves every combined structured and publication constraint.");
assert.deepEqual(filterOpportunities(combinedItems, { ...combinedFilters, query: "library near me gala" }, null), [], "Combined filters never discard unknown query intent.");
assert.deepEqual(filterOpportunities(combinedItems, { ...combinedFilters, query: "library near me 1900-01-01" }, null), [], "Combined filters never discard a date constraint.");
assert.deepEqual(filterOpportunities(combinedItems, { ...combinedFilters, query: "free programs" }, null).map((item) => item.id), ["combined"], "A generic broad query preserves all structured filters.");
const noCityFilters = { ...combinedFilters, city: "" };
assert.deepEqual(filterOpportunities([combined], noCityFilters, null), [], "Typed proximity stays unresolved without an actual location or city.");
const origin = { latitude: combined.latitude, longitude: combined.longitude };
assert.deepEqual(filterOpportunities([combined], noCityFilters, origin).map((item) => item.id), ["combined"], "A real location can resolve typed proximity through the filter helper.");
const distant = { ...combined, id: "distant", latitude: 45.4215, longitude: -75.6972 };
const online = { ...distant, id: "online", virtual: true };
const explorerResults = filterOpportunities([combined, distant, online], noCityFilters, null, { proximityResolved: Boolean(origin) })
  .filter((item) => item.virtual || haversineKm(origin, item) <= noCityFilters.distanceKm);
assert.deepEqual(explorerResults.map((item) => item.id), ["combined", "online"], "The Explorer's actual-location flow preserves its distance cutoff and online exemption.");
assert.equal(combinedFilters.query, "libary near me", "Combined filtering leaves the user's query unchanged.");

const repeatedQueries = ["coding", "libary", "python library", "3D", "AI", "Toronto", "zzyxqv", "robotics", "science", "show me free library programs"];
for (const query of repeatedQueries) searchOpportunities([...publicItems], query);
const timingStart = performance.now();
for (let iteration = 0; iteration < 100; iteration += 1) {
  searchOpportunities([...publicItems], repeatedQueries[iteration % repeatedQueries.length]);
}
const elapsedMs = performance.now() - timingStart;
assert(elapsedMs < 5000, `100 cached searches must finish within 5 seconds; received ${elapsedMs.toFixed(1)}ms.`);
console.log(JSON.stringify({ passed: true, behavioralCases: cases.length, translatedCategoryChecks: labelChecks, reviewedLibraryAliasChecks: aliasChecks, combinedFilterAssertions: 8, individualExclusionFixtures: disqualifiers.length, publicListings: publicItems.length, repeatedSearches: 100, elapsedMs: Number(elapsedMs.toFixed(1)), averageMs: Number((elapsedMs / 100).toFixed(2)) }, null, 2));
