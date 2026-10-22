import assert from "node:assert/strict";
import { languageMeta, translatedCategory } from "./i18n";
import { searchOpportunities } from "./search";
import { libraryTopicTerms } from "./searchLexicon";
import type { LanguageCode, Opportunity } from "./types";

// Synthetic search records deliberately contain no inherited STEM metadata.
// They never enter the public catalog or bypass its publication filters.
function fixture(id: string, title: string, description: string, overrides: Partial<Opportunity> = {}): Opportunity {
  return {
    id, title, description, summary: description,
    organization: "Example Public Library", provider: "Example Public Library",
    type: "One-time event", category: "Library & Community", categories: ["Library & Community"],
    communityFocus: ["Open to all"], city: "Toronto", region: "Toronto", address: "Example branch",
    latitude: 43.65, longitude: -79.38, virtual: false,
    startDate: "2026-11-01T15:00:00-05:00", endDate: "2026-11-01T16:00:00-05:00",
    ageMin: 6, ageMax: 12, ages: { min: 6, max: 12 }, grades: [], language: ["en"], languages: ["en"],
    cost: "Free to join", sourceUrl: "https://example.invalid/fixture", registrationUrl: "https://example.invalid/fixture",
    lastChecked: "2026-10-22", lastSeen: "2026-10-22", lastVerified: "2026-10-22", status: "active",
    accessibility: [], equipment: "Check with provider", food: "Check with provider", capacity: "Check with provider",
    commitment: "One session", providerContact: "", freeStatusProof: "Synthetic free-event test fixture",
    trustedSource: true, volunteerHoursEligible: false, coopEligible: false, paidPosition: false, tags: [], sources: [],
    ...overrides
  };
}

const items = [
  fixture("storytime", "Toddler Storytime", "Stories and songs for toddlers."),
  fixture("book-club", "Book Club", "Discuss a novel together."),
  fixture("painting", "Watercolour Workshop", "Explore painting with a brush."),
  fixture("knitting", "Knitting Circle", "Bring a project to knit together."),
  fixture("conversation", "English Conversation Circle", "Practise speaking English in a small group."),
  fixture("chess", "Chess Club", "Play chess and meet other players."),
  fixture("heart", "Heart Health Talk", "Learn about heart health."),
  fixture("description-art", "Try Something New", "This session introduces sketching techniques."),
  fixture("tag-storytime", "Saturday Gathering", "Join a group session.", { tags: ["Storytime"] }),
  fixture("source-stem", "STEM Book Club", "Discuss a science book together."),
  fixture("robotics", "Robot Builders", "Build and test a robot.", {
    category: "Coding & Robotics", categories: ["STEM", "Coding & Robotics"]
  })
];

const queryChecks: { query: string; expected: string[] }[] = [
  { query: "STEM", expected: ["robotics", "source-stem"] },
  { query: "robotics", expected: ["robotics"] },
  { query: "reading", expected: ["book-club", "source-stem", "storytime", "tag-storytime"] },
  { query: "storytime", expected: ["storytime", "tag-storytime"] },
  { query: "read aloud", expected: ["storytime", "tag-storytime"] },
  { query: "arts", expected: ["description-art", "knitting", "painting"] },
  { query: "crafts", expected: ["knitting"] },
  { query: "language practice", expected: ["conversation"] },
  { query: "chess", expected: ["chess"] },
  { query: "heart", expected: ["heart"] }
];

for (const { query, expected } of queryChecks) {
  assert.deepEqual(searchOpportunities(items, query).map((item) => item.id).sort(), expected.sort(), query);
}

const communityIds = items.filter((item) => item.category === "Library & Community").map((item) => item.id).sort();
const languages = Object.keys(languageMeta) as LanguageCode[];
assert.equal(languages.length, 18);
for (const language of languages) {
  const label = translatedCategory("Library & Community", language);
  assert(label && !/STEM/i.test(label), `${language} must have a non-STEM category label`);
  if (language !== "en") assert.notEqual(label, "Library & Community", `${language} must not fall back to English`);
  assert.deepEqual(searchOpportunities(items, label, language).map((item) => item.id).sort(), communityIds, language);
}

const lecture = fixture("lecture", "Archaeoastronomy", "An astronomy lecture about Stonehenge.");
assert.deepEqual(searchOpportunities([items[1], lecture], "Je cherche des activités de lecture", "en").map(item => item.id), ["book-club"], "French reading intent must exclude an unrelated English lecture");
assert.deepEqual(searchOpportunities([items[1], lecture], "lecture", "fr").map(item => item.id), ["book-club"]);
assert.deepEqual(searchOpportunities([items[1], lecture], "lecture", "en").map(item => item.id).sort(), ["book-club", "lecture"], "An ambiguous bare word retains English interface interpretation and source text");
let multilingualTopics = 0;
for (const [language, terms] of Object.entries(libraryTopicTerms)) {
  for (const [topic, query] of Object.entries(terms)) {
    const positive = topic === "reading" ? "book-club" : topic === "art" ? "painting" : topic === "crafts" ? "knitting" : topic === "storytime" ? "storytime" : "conversation";
    const results = searchOpportunities(items, query, language as LanguageCode).map(item => item.id);
    assert(results.includes(positive), `${language}: ${topic} must find a provider-supported topic`);
    assert(!results.includes("heart"), `${language}: ${topic} must not label an unrelated health talk`);
    multilingualTopics += 1;
  }
}
console.log(JSON.stringify({ multilingualTopics, syntheticRecords: items.length, topicQueries: queryChecks.length, categoryLanguages: languages.length, nonStemExclusion: true, sourceEvidenceTopicsOnly: true }));
