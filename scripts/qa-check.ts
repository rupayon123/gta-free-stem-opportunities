import { readFileSync } from "node:fs";
import { categories, languagePreferenceOrder, opportunities } from "../lib/data";
import { languageMeta, t, translatedSummary } from "../lib/i18n";
import { isPublicOpportunity, publicOpportunities } from "../lib/opportunityStatus";
import type { Filters, LanguageCode } from "../lib/types";
import { coordinatesFromPostal, createCalendarFile, filterOpportunities } from "../lib/utils";

const failures: string[] = [];

function assert(condition: boolean, message: string) {
  if (!condition) failures.push(message);
}

const baseFilters: Filters = {
  query: "",
  region: "All",
  city: "",
  category: "All",
  age: "",
  language: "all",
  distanceKm: 25,
  postalCode: "",
  nearMe: false,
  blackFocused: false,
  girlsFocused: false,
  indigenousFocused: false,
  volunteerHours: false,
  coop: false,
  mentorship: false,
  leadership: false
};

const requiredUiKeys = [
  "brand",
  "mission",
  "headerTagline",
  "beta",
  "search",
  "searchPlaceholder",
  "filters",
  "list",
  "map",
  "siteLanguage",
  "programLanguage",
  "theme",
  "light",
  "dark",
  "system",
  "auto",
  "region",
  "city",
  "category",
  "age",
  "distance",
  "postal",
  "nearMe",
  "highSchool",
  "verifiedFree",
  "calendar",
  "save",
  "saved",
  "directions",
  "results",
  "freeOnly",
  "translationNote",
  "allGta",
  "allCities",
  "allCategories",
  "any",
  "showFilters",
  "hideFilters",
  "refreshResearch",
  "registerApply",
  "date",
  "deadline",
  "ages",
  "grades",
  "commitment",
  "access",
  "equipment",
  "food",
  "capacity",
  "sourceScoutMiniText",
  "opportunityPin",
  "yourArea",
  "selectedListingInfo",
  "viewMode",
  "searchEngineAuto",
  "expiredHidden"
] as const;

assert(languagePreferenceOrder.length === 18, "Expected 18 launch languages.");
for (const code of languagePreferenceOrder) {
  assert(Boolean(languageMeta[code]), `Missing language metadata for ${code}.`);
  for (const key of requiredUiKeys) {
    assert(t(code, key).length > 0, `Missing ${key} label for ${code}.`);
  }
  const translated = translatedSummary(opportunities[0], code);
  assert(translated.length > 20, `Translated summary too short for ${code}.`);
}

assert(opportunities.length >= 10, "Expected at least 10 seed opportunities.");
assert(!(categories as string[]).includes("Tutoring"), "Tutoring category must not be present.");
for (const opportunity of opportunities) {
  const proof = opportunity.freeStatusProof.toLowerCase();
  const publicText = [
    opportunity.title,
    opportunity.summary,
    opportunity.provider,
    opportunity.registrationUrl,
    opportunity.providerContact,
    opportunity.freeStatusProof,
    ...opportunity.categories,
    ...opportunity.tags,
    ...opportunity.sources.map((source) => source.url)
  ]
    .join(" ")
    .toLowerCase();

  assert(proof.includes("free") || proof.includes("no"), `${opportunity.title} needs stronger free-status proof.`);
  assert(opportunity.registrationUrl.startsWith("http"), `${opportunity.title} needs a registration URL.`);
  assert(!publicText.includes("example.org"), `${opportunity.title} still points to placeholder source data.`);
  assert(!publicText.includes("tutor"), `${opportunity.title} still includes tutoring language.`);
  assert(opportunity.sources.length > 0, `${opportunity.title} needs source evidence.`);
  if (opportunity.status === "active") {
    assert(opportunity.sources.some((source) => source.confidence === "high"), `${opportunity.title} needs high-confidence evidence.`);
  }
  assert(opportunity.organization.length > 0, `${opportunity.title} needs organization.`);
  assert(opportunity.description.length > 0, `${opportunity.title} needs description.`);
  assert(opportunity.category.length > 0, `${opportunity.title} needs primary category.`);
  assert(opportunity.cost === "Free to join", `${opportunity.title} must use simple free-access wording.`);
  assert(opportunity.sourceUrl.startsWith("http"), `${opportunity.title} needs sourceUrl.`);
  assert(opportunity.lastChecked.length > 0, `${opportunity.title} needs lastChecked.`);
  assert(opportunity.lastSeen.length > 0, `${opportunity.title} needs lastSeen.`);
  assert(["active", "expired", "needs_review", "hidden"].includes(opportunity.status), `${opportunity.title} has invalid status.`);
  assert(opportunity.latitude >= 42 && opportunity.latitude <= 45, `${opportunity.title} latitude is outside GTA bounds.`);
  assert(opportunity.longitude >= -81 && opportunity.longitude <= -77, `${opportunity.title} longitude is outside GTA bounds.`);
  assert(opportunity.ages.min >= 0, `${opportunity.title} has invalid min age.`);
  assert(!opportunity.ages.max || opportunity.ages.max >= opportunity.ages.min, `${opportunity.title} has invalid max age.`);
  assert(opportunity.categories.every((category) => categories.includes(category)), `${opportunity.title} has unknown category.`);
}

const publicListings = publicOpportunities(opportunities);
assert(publicListings.length > 0, "Expected at least one public active listing.");
assert(
  publicListings.every((opportunity) => opportunity.status === "active" || opportunity.status === "needs_review"),
  "Public listings must be active or newly found."
);
assert(publicListings.every((opportunity) => isPublicOpportunity(opportunity)), "Public listings must be browseable and unexpired.");
const expiredClone = {
  ...publicListings[0],
  id: `${publicListings[0].id}-qa-expired`,
  startDate: "2024-01-01T09:00:00-05:00",
  endDate: "2024-01-01T10:00:00-05:00",
  deadline: "2024-01-01T09:00:00-05:00",
  status: "active" as const
};
assert(!isPublicOpportunity(expiredClone), "Date-expired active listings must be hidden from public search.");
assert(!publicOpportunities([...opportunities, expiredClone]).some((opportunity) => opportunity.id === expiredClone.id), "Expired listings must not appear in public results.");

const launchTranslationLanguages = languagePreferenceOrder.filter(
  (language): language is Exclude<LanguageCode, "en"> => language !== "en"
);
const exportedFeed = JSON.parse(readFileSync("public/opportunities.json", "utf8")) as {
  count?: number;
  opportunities?: Array<{
    id?: string;
    title?: string;
    description?: string;
    summary?: string;
    category?: string;
    categories?: string[];
    cost?: string;
    tags?: string[];
    translations?: Record<
      string,
      {
        title?: string;
        summary?: string;
        description?: string;
        category?: string;
        cost?: string;
        tags?: string[];
      }
    >;
  }>;
};
const exportedListings = exportedFeed.opportunities ?? [];
const hasText = (value: unknown) => typeof value === "string" && value.trim().length > 0;
const comparableText = (value: unknown) =>
  typeof value === "string"
    ? value
        .normalize("NFKD")
        .replace(/\p{Diacritic}/gu, "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase()
    : "";
const sourceByID = new Map(publicListings.map((opportunity) => [opportunity.id, opportunity]));
const isDistinctFromEnglish = (value: unknown, englishValues: unknown[]) => {
  const normalizedValue = comparableText(value);
  return hasText(value) && !englishValues.map(comparableText).filter(Boolean).includes(normalizedValue);
};
const sourceForExport = (opportunity: { id?: string }) => (opportunity.id ? sourceByID.get(opportunity.id) : undefined);
const hasGeneratedSummary = (
  opportunity: { id?: string },
  translation: { summary?: string; description?: string } | undefined
) => {
  const source = sourceForExport(opportunity);
  const englishValues = [source?.summary, source?.description];
  return (
    isDistinctFromEnglish(translation?.summary, englishValues) ||
    isDistinctFromEnglish(translation?.description, englishValues)
  );
};
const hasLocalizedCategory = (
  opportunity: { id?: string },
  translation: { category?: string; tags?: string[] } | undefined
) => {
  const source = sourceForExport(opportunity);
  const englishValues = [source?.category, ...(source?.categories ?? []), ...(source?.tags ?? [])];
  if (source?.category === "STEM") {
    return hasText(translation?.category) || Boolean(translation?.tags?.some(hasText));
  }
  return (
    isDistinctFromEnglish(translation?.category, englishValues) ||
    Boolean(translation?.tags?.some((tag) => isDistinctFromEnglish(tag, englishValues)))
  );
};
const hasLocalizedCost = (translation: { cost?: string } | undefined) =>
  hasText(translation?.cost) && !["free", "free to join"].includes(comparableText(translation?.cost));
const hasLocalizedTitle = (opportunity: { id?: string }, translation: { title?: string } | undefined) => {
  const source = sourceForExport(opportunity);
  return isDistinctFromEnglish(translation?.title, [source?.title]);
};

assert(exportedFeed.count === exportedListings.length, "Exported feed count must match exported opportunities.");
assert(exportedListings.length === publicListings.length, "Exported feed must match public listing count.");
const fullSummaryCoverage = exportedListings.filter((opportunity) =>
  launchTranslationLanguages.every((language) => hasGeneratedSummary(opportunity, opportunity.translations?.[language]))
).length;
const fullCategoryCoverage = exportedListings.filter((opportunity) =>
  launchTranslationLanguages.every((language) => hasLocalizedCategory(opportunity, opportunity.translations?.[language]))
).length;
const fullCostCoverage = exportedListings.filter((opportunity) =>
  launchTranslationLanguages.every((language) => hasLocalizedCost(opportunity.translations?.[language]))
).length;
const anyTitleCoverage = exportedListings.filter((opportunity) =>
  launchTranslationLanguages.some((language) => hasLocalizedTitle(opportunity, opportunity.translations?.[language]))
).length;
const fullTitleCoverage = exportedListings.filter((opportunity) =>
  launchTranslationLanguages.every((language) => hasLocalizedTitle(opportunity, opportunity.translations?.[language]))
).length;
assert(
  fullSummaryCoverage === exportedListings.length,
  "Every exported opportunity needs generated summary/description coverage for every non-English launch language."
);
assert(
  fullCategoryCoverage === exportedListings.length,
  "Every exported opportunity needs localized category coverage for every non-English launch language."
);
assert(
  fullCostCoverage === exportedListings.length,
  "Every exported opportunity needs localized cost coverage for every non-English launch language."
);
assert(
  fullTitleCoverage === exportedListings.length,
  "Every exported opportunity needs localized title coverage for every non-English launch language."
);

const allResults = filterOpportunities(opportunities, baseFilters, null);
assert(allResults.length === publicListings.length, "Default search should return public active and newly found opportunities.");

const coopResults = filterOpportunities(
  opportunities,
  { ...baseFilters, query: "co-op", coop: true },
  null
);
assert(coopResults.length >= 1, "Co-op filter should find at least one public co-op opportunity.");
assert(coopResults.every((opportunity) => opportunity.coopEligible === true), "Co-op filter returned a non-co-op opportunity.");

const blackFocused = filterOpportunities(opportunities, { ...baseFilters, blackFocused: true }, null);
assert(
  blackFocused.every((opportunity) => opportunity.communityFocus.includes("Black-focused")),
  "Black-focused filter returned an unrelated listing."
);

const girlsFocused = filterOpportunities(opportunities, { ...baseFilters, girlsFocused: true }, null);
assert(
  girlsFocused.every((opportunity) => opportunity.communityFocus.includes("Girls/women-focused")),
  "Girls/women-focused filter returned an unrelated listing."
);

const indigenousFocused = filterOpportunities(opportunities, { ...baseFilters, indigenousFocused: true }, null);
assert(
  indigenousFocused.every((opportunity) => opportunity.communityFocus.includes("Indigenous-focused")),
  "Indigenous-focused filter returned an unrelated listing."
);

for (const language of languagePreferenceOrder) {
  const languageResults = filterOpportunities(opportunities, { ...baseFilters, language }, null);
  assert(languageResults.every((opportunity) => opportunity.languages.includes(language)), `Language filter leaked non-${language} listings.`);
}

const postalLocation = coordinatesFromPostal("L5B 0A1");
assert(Boolean(postalLocation), "Known GTA postal FSA should resolve.");
const nearbyResults = filterOpportunities(opportunities, { ...baseFilters, distanceKm: 10 }, postalLocation);
assert(nearbyResults.some((opportunity) => opportunity.city === "Mississauga"), "Postal-distance search should find Mississauga listings.");

for (const opportunity of opportunities.slice(0, 3)) {
  const calendar = createCalendarFile(opportunity);
  assert(calendar.includes("BEGIN:VCALENDAR"), `${opportunity.title} calendar is missing BEGIN.`);
  assert(calendar.includes("END:VCALENDAR"), `${opportunity.title} calendar is missing END.`);
  assert(calendar.includes(opportunity.registrationUrl), `${opportunity.title} calendar is missing registration URL.`);
}

if (failures.length) {
  console.error("QA check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("QA check passed");
console.log(`Languages: ${languagePreferenceOrder.length}`);
console.log(`Opportunities: ${opportunities.length}`);
console.log(`Default results: ${allResults.length}`);
console.log(`Co-op results: ${coopResults.length}`);
console.log(`Nearby L5B results: ${nearbyResults.length}`);
console.log(`Exported summary coverage: ${fullSummaryCoverage}/${exportedListings.length}`);
console.log(`Exported category coverage: ${fullCategoryCoverage}/${exportedListings.length}`);
console.log(`Exported cost coverage: ${fullCostCoverage}/${exportedListings.length}`);
console.log(`Exported any title coverage: ${anyTitleCoverage}/${exportedListings.length}`);
console.log(`Exported full title coverage: ${fullTitleCoverage}/${exportedListings.length}`);
