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
  "beta",
  "search",
  "filters",
  "list",
  "map",
  "siteLanguage",
  "theme",
  "light",
  "dark",
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
  "results",
  "freeOnly",
  "showFilters",
  "hideFilters"
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
  assert(opportunity.sources.some((source) => source.confidence === "high"), `${opportunity.title} needs high-confidence evidence.`);
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
assert(publicListings.every((opportunity) => isPublicOpportunity(opportunity)), "Public listings must be active and unexpired.");

const allResults = filterOpportunities(opportunities, baseFilters, null);
assert(allResults.length === publicListings.length, "Default search should return only public active opportunities.");

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
