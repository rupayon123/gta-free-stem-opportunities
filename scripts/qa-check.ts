import { readFileSync } from "node:fs";
import {
  communityFormFields,
  communityFormKinds,
  type CommunityFormFieldName,
  type CommunityFormKind
} from "../lib/communityForms";
import {
  categories,
  curatedOpportunityIds,
  curatedVerificationMaximumAgeDays,
  languagePreferenceOrder,
  opportunities
} from "../lib/data";
import { languageMeta, t, translatedSummary } from "../lib/i18n";
import {
  countClassifierRelevantLibraryOpportunities,
  inferLibraryOpportunityCategory,
  isLibraryOpportunityStemRelevant,
  type LibraryOpportunityClassificationInput
} from "../lib/libraryOpportunityClassification";
import {
  discoverySourceRequiresSpecificStemEvidence,
  evidenceBackedDiscoveryTags,
  inferDiscoveryCategory,
  isGeneratedDiscoveryOpportunityId
} from "../lib/discoveryClassification";
import {
  isOpportunityVerificationStale,
  isPublicOpportunity,
  publicOpportunities
} from "../lib/opportunityStatus";
import { evaluateDiscoverySourceHealth, evaluateLibraryRefreshHealth } from "../lib/refreshHealth";
import type { Filters, LanguageCode } from "../lib/types";
import { coordinatesFromPostal, createCalendarFile, filterOpportunities } from "../lib/utils";

const failures: string[] = [];

function assert(condition: boolean, message: string) {
  if (!condition) failures.push(message);
}

const privacyPolicySource = readFileSync("app/privacy/page.tsx", "utf8");
const termsSource = readFileSync("app/terms/page.tsx", "utf8");
const supportSource = readFileSync("app/support/page.tsx", "utf8");
const sitemapSource = readFileSync("public/sitemap.xml", "utf8");
const homePageSource = readFileSync("components/HomePage.tsx", "utf8");

assert(homePageSource.includes("window.location.reload()"), "Public Refresh must reload the latest published data.");
assert(
  !homePageSource.includes("research-refresh=${Date.now()}"),
  "Public Refresh must not fake a research run by refetching the current homepage."
);
assert(
  !homePageSource.includes("RESEARCH_REFRESH_ENDPOINT") && !homePageSource.includes("RESEARCH_WORKFLOW_OWNER"),
  "The public browser must not expose an unauthenticated hunting-engine trigger."
);

for (const requiredPrivacyTopic of [
  "What the Apple app stores on your device",
  "Network services and technical request data",
  "Coarse Location",
  "Other Diagnostic Data",
  "Support opens GitHub's public issue tracker",
  "Your choices, consent withdrawal, and deletion",
  "Children and families",
  "Changes and contact"
]) {
  assert(privacyPolicySource.includes(requiredPrivacyTopic), `Privacy policy is missing: ${requiredPrivacyTopic}.`);
}
for (const requiredTermsTopic of [
  "Apple app licence",
  "Listing accuracy and “free” status",
  "Acceptable use",
  "Limitation of liability",
  "Governing law"
]) {
  assert(termsSource.includes(requiredTermsTopic), `Terms of Use are missing: ${requiredTermsTopic}.`);
}
assert(supportSource.includes("supportIssueUrl"), "Support page must expose the configured public support route.");
assert(supportSource.includes("Support tickets are public"), "Support page must warn that GitHub tickets are public.");
assert(supportSource.includes("supportContactEmail"), "Support page must expose the configured direct support contact.");
assert(supportSource.includes("Public App Store release is blocked"), "Support page must block release when direct contact is absent.");
for (const route of ["/privacy/", "/terms/", "/support/"]) {
  assert(sitemapSource.includes(`https://gta-free-stem.vercel.app${route}`), `Sitemap is missing ${route}.`);
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

const rejectedLibraryClassificationFixtures: LibraryOpportunityClassificationInput[] = [
  {
    title: "Fun Friday's!",
    description:
      "Join us for fun summer programming! Each Friday will feature a fun craft. August 7: DIY Slime. September 4: Robot Basketball.",
    categories: ["Summer Wonder", "Crafts & Hobbies", "School Age Children (6-12)"]
  },
  {
    title: "Saturday Morning Movies",
    description: "Bring your own snacks and enjoy Zootopia, Home, The Wild Robot, and Sing.",
    categories: ["Culture, Arts & Entertainment", "School Age Children (6-12)"]
  },
  {
    title: "Family Movies - Hero Mode",
    description: "A family movie about a teenage coding genius who creates a video game.",
    categories: ["Culture, Arts & Entertainment", "School Age Children (6-12)"]
  },
  {
    title: "Youth Hub: Fun Friday",
    description: "Drop in to make beaded creations and charm bracelets.",
    categories: ["Crafts & Hobbies", "Teens (13-17)"]
  },
  {
    title: "Storytime",
    description: "An interactive storytime full of books, songs, and activities for little ones.",
    categories: ["Storytime", "Birth to Five"]
  },
  {
    title: "Knitting and Crochet Circle",
    description: "Bring your yarn, needles, or hooks and work on a craft with other knitters.",
    categories: ["Crafts & Hobbies", "Adults (18+)"]
  },
  {
    title: "Creative Writing Club: Positive Poetry and Insightful Literature",
    description:
      "What happens when the art of the story meets the science of the mind? A psychologist in supervised practice leads a poetry and expressive-writing group.",
    categories: ["Writing Groups", "Adults (18+)"]
  },
  {
    title: "Game on! Board Game Playtime",
    description: "Play board games including a STEM Road Builder Game and stacking blocks.",
    categories: ["Games & Sports", "School Age Children (6-12)"]
  },
  {
    title: "Crafternoon: Button Making",
    description: "A multi-date craft series had a Makedo session last month; today's activity is button making.",
    categories: ["Crafts & Hobbies", "School Age Children (6-12)"]
  },
  {
    title: "Summer Camp for Newcomer Youth",
    description: "Art activities, employment workshops, field trips, and volunteer hours for newcomer youth.",
    categories: ["Newcomer", "Teens (13-17)"]
  }
];
assert(
  rejectedLibraryClassificationFixtures.every((fixture) => !isLibraryOpportunityStemRelevant(fixture)),
  "Library relevance must reject generic crafts, entertainment, storytimes, and literary/fibre-arts clubs."
);

const acceptedLibraryClassificationFixtures: Array<
  LibraryOpportunityClassificationInput & { expectedCategory: string }
> = [
  {
    title: "Circuit Craft: Light-up Greeting Card",
    description: "Build an electrical circuit with LEDs and conductive tape, then test your design.",
    categories: ["Crafts & Hobbies"],
    expectedCategory: "Science & Engineering"
  },
  {
    title: "Stop-Motion Movie Lab",
    description: "Learn digital animation skills and create a stop-motion sequence using an iPad.",
    categories: ["Culture, Arts & Entertainment"],
    expectedCategory: "AI & Digital Media"
  },
  {
    title: "STEAM Club",
    description: "Explore science, technology, engineering, art, and math through hands-on projects.",
    categories: ["Coding & Robotics", "Crafts & Hobbies", "Science & Engineering"],
    expectedCategory: "Coding & Robotics"
  },
  {
    title: "Introduction to Cricut",
    description: "Learn to prepare a design for a digital cutting machine.",
    categories: ["Makerspace"],
    expectedCategory: "Makerspace & Fabrication"
  },
  {
    title: "Virtual Reality Demo for Teens",
    description: "Explore interactive 360-degree environments using a Meta Quest VR headset.",
    categories: ["Pop Up Learning Labs", "Games & Sports"],
    expectedCategory: "AI & Digital Media"
  },
  {
    title: "Blocks Challenges",
    description: "Design and build structures with LEGO, DUPLO, and KEVA blocks.",
    categories: ["Games & Sports"],
    expectedCategory: "Science & Engineering"
  },
  {
    title: "Creative Screenprinting for Young Adults",
    description: "Learn the screen-printing process and make an original printed design.",
    categories: ["Culture, Arts & Entertainment"],
    expectedCategory: "Makerspace & Fabrication"
  },
  {
    title: "Saturday Family Club",
    description: "Work together on a guided LEGO construction challenge.",
    categories: ["Family Programs"],
    expectedCategory: "Science & Engineering"
  }
];
assert(
  acceptedLibraryClassificationFixtures.every(
    (fixture) =>
      isLibraryOpportunityStemRelevant(fixture) &&
      inferLibraryOpportunityCategory(fixture) === fixture.expectedCategory
  ),
  "Library relevance must preserve interdisciplinary and explicitly categorized STEM programs."
);

const classifierAwarePublishedLibraryCount = countClassifierRelevantLibraryOpportunities([
  {
    title: "Python Coding Club",
    description: "Learn Python through hands-on programming challenges.",
    tags: ["Coding & Robotics", "Teens (13-17)"],
    categories: ["STEM", "Coding & Robotics"]
  },
  {
    title: "Saturday Morning Movies",
    description: "Bring your own snacks and enjoy The Wild Robot.",
    tags: ["Culture, Arts & Entertainment", "School Age Children (6-12)"],
    categories: ["STEM", "AI & Digital Media"]
  },
  { title: null, description: "Malformed legacy row", tags: [] }
]);
assert(
  classifierAwarePublishedLibraryCount === 1,
  "The refresh baseline must count only rows accepted by the current classifier, using source tags ahead of stale inferred categories."
);

const auroraSculptingDiscoveryFixture = {
  title: "Intro to 3D Sculpting",
  description:
    "Learn how to create basic 3D models with SculptGL, a free web-based sculpting tool. Listed by Aurora Public Library STEM events.",
  sourceName: "Aurora Public Library STEM events",
  sourceOrganization: "Aurora Public Library",
  sourceKeywords: ["stem", "creative studio", "maker", "coding", "technology", "science"]
} as const;
assert(
  isGeneratedDiscoveryOpportunityId("discovered-source-event-123") &&
    !isGeneratedDiscoveryOpportunityId("tpl-rss-event-123"),
  "Discovery refreshes must distinguish their own prior output from external duplicate sources."
);
assert(
  discoverySourceRequiresSpecificStemEvidence({ id: "tpl-events-stem", sourceType: "library" }) &&
    !discoverySourceRequiresSpecificStemEvidence({ id: "tpl-events-volunteer", sourceType: "library" }),
  "STEM-focused library discovery sources must require event-specific STEM evidence."
);
const auroraSculptingCategory = inferDiscoveryCategory(
  `${auroraSculptingDiscoveryFixture.title} ${auroraSculptingDiscoveryFixture.description}`
);
const auroraSculptingTags = evidenceBackedDiscoveryTags({
  ...auroraSculptingDiscoveryFixture,
  category: auroraSculptingCategory
});
assert(
  auroraSculptingCategory === "Makerspace & Fabrication" &&
    auroraSculptingTags.includes("makerspace & fabrication") &&
    !auroraSculptingTags.some((tag) => ["coding", "robotics", "science"].includes(tag)),
  "Discovery tags must describe the event, not every keyword configured on its source."
);
const evidencedCodingTags = evidenceBackedDiscoveryTags({
  category: "Coding & Robotics",
  title: "Python Coding Club",
  description: "Learn Python coding through weekly programming challenges.",
  sourceName: "Aurora Public Library STEM events",
  sourceOrganization: "Aurora Public Library",
  sourceKeywords: auroraSculptingDiscoveryFixture.sourceKeywords
});
assert(
  evidencedCodingTags.includes("coding") && !evidencedCodingTags.includes("science"),
  "Discovery must retain a source keyword when the individual event supplies matching evidence."
);

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

const requiredLocalFormUiKeys = ["saveOnThisDevice", "localFormNotice", "localSubmissionsBrowser"] as const;

const expectedCommunityFormFieldNames: Record<CommunityFormKind, readonly CommunityFormFieldName[]> = {
  host: ["organizationName", "website", "contactEmail", "cityRegion", "hostIdea"],
  suggest: ["officialOpportunityLink", "contactEmail", "cityRegion", "whyFreeUseful"],
  report: ["listingTitle", "contactEmail", "whatNeedsFixing", "sourceLink"]
};

assert(languagePreferenceOrder.length === 18, "Expected 18 launch languages.");
for (const code of languagePreferenceOrder) {
  assert(Boolean(languageMeta[code]), `Missing language metadata for ${code}.`);
  for (const key of requiredUiKeys) {
    assert(t(code, key).length > 0, `Missing ${key} label for ${code}.`);
  }
  for (const key of requiredLocalFormUiKeys) {
    assert(t(code, key).length > 0, `Missing ${key} local-form label for ${code}.`);
    assert(code === "en" || t(code, key) !== t("en", key), `Missing localized ${key} label for ${code}.`);
  }
  assert(t(code, "localSubmissionsBrowser").includes("{count}"), `Missing local-form count placeholder for ${code}.`);
  const translated = translatedSummary(opportunities[0], code);
  assert(translated.length > 20, `Translated summary too short for ${code}.`);

  const forms = communityFormFields(code);
  for (const kind of communityFormKinds) {
    const fields = forms[kind];
    const expectedNames = expectedCommunityFormFieldNames[kind];
    assert(
      fields.map((field) => field.name).join(",") === expectedNames.join(","),
      `${code} ${kind} form must keep stable internal field names.`
    );
    assert(fields.every((field) => field.label.trim().length > 0), `${code} ${kind} form needs visible translated labels.`);
    assert(new Set(fields.map((field) => field.name)).size === fields.length, `${code} ${kind} form has duplicate field names.`);
  }
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

const curatedIds = new Set(curatedOpportunityIds);
const activeCuratedListings = opportunities.filter(
  (opportunity) => curatedIds.has(opportunity.id) && opportunity.status === "active"
);
assert(
  activeCuratedListings.every(
    (opportunity) =>
      !isOpportunityVerificationStale(
        opportunity.lastChecked,
        new Date(),
        curatedVerificationMaximumAgeDays
      )
  ),
  `Active manually curated listings must be verified within ${curatedVerificationMaximumAgeDays} days.`
);
assert(
  isOpportunityVerificationStale("2026-05-26", new Date("2026-08-06T12:00:00Z"), curatedVerificationMaximumAgeDays),
  "Stale curated verification dates must be quarantined."
);

const publicListings = publicOpportunities(opportunities);
assert(publicListings.length > 0, "Expected at least one public active listing.");
const isAuroraSculptingListing = (opportunity: (typeof publicListings)[number]) =>
  opportunity.title === "Intro to 3D Sculpting" && opportunity.organization === "Aurora Public Library";
const auroraSculptingListing = publicListings.find(isAuroraSculptingListing);
assert(Boolean(auroraSculptingListing), "The valid Aurora 3D-sculpting opportunity must remain public.");
assert(
  auroraSculptingListing?.category === "Makerspace & Fabrication" &&
    !auroraSculptingListing.tags.includes("coding"),
  "Aurora 3D sculpting must be classified as fabrication without a coding tag."
);
const publicLibraryListings = publicListings.filter((opportunity) =>
  opportunity.id.startsWith("tpl-rss-") || opportunity.id.startsWith("markham-rss-")
);
assert(
  publicLibraryListings.every((opportunity) =>
    isLibraryOpportunityStemRelevant({
      title: opportunity.title,
      description: opportunity.description,
      categories: opportunity.tags
    })
  ),
  "Every published library listing must retain auditable STEM evidence."
);
assert(
  publicListings.every((opportunity) => opportunity.status === "active"),
  "Public listings must be active, not pending review."
);
assert(publicListings.every((opportunity) => isPublicOpportunity(opportunity)), "Public listings must be browseable and unexpired.");
assert(
  publicListings.every((opportunity) => !opportunity.tags.includes("date-to-confirm")),
  "Public listings must not include dates that still need confirmation."
);
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

const enrollmentClosedClone = {
  ...publicListings[0],
  id: `${publicListings[0].id}-qa-enrollment-closed`,
  startDate: "2026-07-06T08:00:00-04:00",
  endDate: "2026-08-28T15:00:00-04:00",
  deadline: "2026-07-01T23:59:00-04:00",
  status: "active" as const
};
assert(
  !isPublicOpportunity(enrollmentClosedClone, new Date("2026-08-06T12:00:00-04:00")),
  "A closed enrollment deadline must hide a program even when its program end date is later."
);

const ongoingDropInClone = {
  ...publicListings[0],
  id: `${publicListings[0].id}-qa-ongoing-drop-in`,
  startDate: "2026-06-20T04:00:00.000Z",
  endDate: "2026-09-01T03:59:59.000Z",
  deadline: "2026-06-20T04:00:00.000Z",
  status: "active" as const
};
assert(
  isPublicOpportunity(ongoingDropInClone, new Date("2026-08-06T12:00:00Z")),
  "A calendar start mirrored into deadline must not hide an ongoing drop-in before its end date."
);

const undatedReviewClone = {
  ...publicListings[0],
  id: `${publicListings[0].id}-qa-undated-review`,
  startDate: "",
  endDate: undefined,
  deadline: undefined,
  status: "needs_review" as const,
  tags: [...publicListings[0].tags, "date-to-confirm"]
};
assert(!isPublicOpportunity(undatedReviewClone), "Undated needs-review listings must stay out of public search.");
assert(
  !publicOpportunities([...opportunities, undatedReviewClone]).some((opportunity) => opportunity.id === undatedReviewClone.id),
  "Undated needs-review listings must not appear in public results."
);

const healthyRefresh = evaluateLibraryRefreshHealth({
  generatedAt: "2026-08-06T00:00:00.000Z",
  sources: [
    { sourceId: "source-a", organization: "Source A", attemptedPages: 12, successfulPages: 12, acceptedListings: 90 },
    { sourceId: "source-b", organization: "Source B", attemptedPages: 12, successfulPages: 12, acceptedListings: 90 }
  ],
  acceptedListings: 180,
  previousPublishedListings: 200
});
assert(healthyRefresh.healthy, "Healthy source coverage and output must be publishable.");

const rejectedRefresh = evaluateLibraryRefreshHealth({
  generatedAt: "2026-08-06T00:00:00.000Z",
  sources: [
    { sourceId: "source-a", organization: "Source A", attemptedPages: 12, successfulPages: 1, acceptedListings: 10 },
    { sourceId: "source-b", organization: "Source B", attemptedPages: 12, successfulPages: 1, acceptedListings: 10 }
  ],
  acceptedListings: 20,
  previousPublishedListings: 200
});
assert(!rejectedRefresh.healthy, "Material source failures or a degraded output must reject publication.");
assert(rejectedRefresh.health.failureReasons.length >= 2, "Rejected refreshes must record why publication was blocked.");

const healthyDiscoveryRefresh = evaluateDiscoverySourceHealth({
  generatedAt: "2026-08-06T00:00:00.000Z",
  sourcesChecked: 30,
  successfulSources: 30
});
assert(healthyDiscoveryRefresh.healthy, "Healthy discovery coverage must be publishable.");

const rejectedDiscoveryRefresh = evaluateDiscoverySourceHealth({
  generatedAt: "2026-08-06T00:00:00.000Z",
  sourcesChecked: 30,
  successfulSources: 20
});
assert(!rejectedDiscoveryRefresh.healthy, "Material discovery-source failures must reject publication.");

const launchTranslationLanguages = languagePreferenceOrder.filter(
  (language): language is Exclude<LanguageCode, "en"> => language !== "en"
);
const exportedFeed = JSON.parse(readFileSync("public/opportunities.json", "utf8")) as {
  count?: number;
  sourceHealth?: {
    library?: {
      status?: string;
      sourceCount?: number;
      attemptedPages?: number;
      successfulPages?: number;
      acceptedListings?: number;
      minimumAcceptedListings?: number;
    };
    discovery?: {
      status?: string;
      sourcesChecked?: number;
      successfulSources?: number;
    };
  };
  opportunities?: Array<{
    id?: string;
    title?: string;
    description?: string;
    summary?: string;
    category?: string;
    categories?: string[];
    cost?: string;
    status?: string;
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
assert(exportedFeed.sourceHealth?.library?.status === "healthy", "Exported feed must expose healthy library source metadata.");
assert(
  (exportedFeed.sourceHealth?.library?.successfulPages ?? 0) >= (exportedFeed.sourceHealth?.library?.attemptedPages ?? 1) * 0.75,
  "Exported feed must record adequate library source coverage."
);
assert(
  (exportedFeed.sourceHealth?.library?.acceptedListings ?? 0) >= (exportedFeed.sourceHealth?.library?.minimumAcceptedListings ?? 1),
  "Exported feed must record a non-degraded library output."
);
assert(exportedFeed.sourceHealth?.discovery?.status === "healthy", "Exported feed must expose healthy discovery source metadata.");
assert(
  (exportedFeed.sourceHealth?.discovery?.successfulSources ?? 0) >=
    (exportedFeed.sourceHealth?.discovery?.sourcesChecked ?? 1) * 0.75,
  "Exported feed must record adequate discovery source coverage."
);
assert(
  exportedListings.every((opportunity) => opportunity.status === "active" && !opportunity.tags?.includes("date-to-confirm")),
  "Exported feed must exclude pending-review and date-to-confirm entries."
);
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
assert(allResults.length === publicListings.length, "Default search should return only public active opportunities.");

const knownNonStemLibraryIds = new Set([
  "tpl-rss-6a1079b28ea300e26317c282",
  "tpl-rss-6a1f2d212ea730c17ab3bff2",
  "tpl-rss-6a4fef8988e9bf28002fb439",
  "tpl-rss-6a56af7bc7e02e3d006928be",
  "tpl-rss-6a64b636f213992f00c6e5df",
  "tpl-rss-6a569f8ec7e02e3d0069238c"
]);
assert(
  !publicListings.some((opportunity) => knownNonStemLibraryIds.has(opportunity.id)),
  "Generic crafts and movie screenings must not be published as STEM opportunities."
);
const roboticsResults = filterOpportunities(opportunities, { ...baseFilters, query: "robotics" }, null);
assert(
  !roboticsResults.some((opportunity) => knownNonStemLibraryIds.has(opportunity.id)),
  "Robotics search must not match unrelated crafts or movie screenings."
);
const codingResults = filterOpportunities(opportunities, { ...baseFilters, query: "coding" }, null);
assert(
  !codingResults.some(isAuroraSculptingListing),
  "Discovery source keywords must not make a 3D-sculpting event match coding."
);

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
