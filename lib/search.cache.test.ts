import assert from "node:assert/strict";
import { searchOpportunities } from "./search";
import type { Opportunity } from "./types";

function fixture(id: string, title: string, description: string, overrides: Partial<Opportunity> = {}): Opportunity {
  return {
    id, title, description, summary: description,
    organization: "Example Public Library", provider: "Example Public Library",
    type: "One-time event", category: "Library & Community", categories: ["Library & Community"],
    communityFocus: ["Open to all"], city: "Toronto", region: "Toronto", address: "Example branch",
    latitude: 43.65, longitude: -79.38, virtual: false, startDate: "2026-12-01",
    ageMin: 6, ages: { min: 6 }, grades: [], language: ["en"], languages: ["en"], cost: "Free to join",
    sourceUrl: "https://example.invalid/test", registrationUrl: "https://example.invalid/test",
    lastChecked: "2026-10-22", lastSeen: "2026-10-22", lastVerified: "2026-10-22", status: "active",
    accessibility: [], equipment: "Check with provider", food: "Check with provider", capacity: "Check with provider",
    commitment: "One session", providerContact: "", freeStatusProof: "Synthetic cache fixture",
    trustedSource: true, volunteerHoursEligible: false, coopEligible: false, paidPosition: false, tags: [], sources: [],
    ...overrides
  };
}

const titleMatch = fixture("title", "Astronomy", "Look at the night sky.");
const descriptionMatch = fixture("description", "Evening Workshop", "An introduction to astronomy and observing the sky.");
const items = [descriptionMatch, titleMatch];
const expected = searchOpportunities(items, "astronomy").map((item) => item.id);
assert.equal(expected[0], titleMatch.id);
const mutableResult = searchOpportunities([...items], "astronomy");
mutableResult.reverse();
mutableResult.pop();
assert.deepEqual(searchOpportunities([...items], "astronomy").map((item) => item.id), expected, "Caller mutations cannot poison cached order or membership");
assert.deepEqual(searchOpportunities([descriptionMatch], "astronomy").map((item) => item.id), [descriptionMatch.id], "Warm broad searches cannot widen a filtered subset");
assert.deepEqual(searchOpportunities([...items], "astronomy").map((item) => item.id), expected, "A subset's cache cannot replace the broader corpus");

const replacement = fixture(titleMatch.id, "Dancing", "An introduction to dance.");
assert.deepEqual(searchOpportunities([titleMatch], "astronomy").map((item) => item.id), [titleMatch.id]);
assert.deepEqual(searchOpportunities([replacement], "astronomy"), [], "Replacement records with the same IDs invalidate earlier text matches");
assert.deepEqual(searchOpportunities(items, "library near me", "en", { proximityResolved: true }).map((item) => item.id).sort(), items.map((item) => item.id).sort());
assert.deepEqual(searchOpportunities(items, "library near me"), [], "A cached resolved query cannot resolve a later missing location");
assert.deepEqual(searchOpportunities(items, "library unknown-signal-829"), []);
assert.deepEqual(searchOpportunities(items, "library unknown-signal-829"), [], "Empty matches are stable on repeated requests");
assert.deepEqual(searchOpportunities(items, "library 2026-12-01").map((item) => item.id).sort(), items.map((item) => item.id).sort());
assert.deepEqual(searchOpportunities(items, "library 2026-12-02"), [], "Dates remain part of the cached query identity");

const spellingItems = [
  fixture("science", "Science Club", "Explore experiments.", { category: "Science & Engineering", categories: ["Science & Engineering"] }),
  fixture("since", "A Writer's Life", "Since the first edition, these stories have inspired readers."),
  fixture("robotics", "Robotics Club", "Build machines.", { category: "Coding & Robotics", categories: ["Coding & Robotics"] }),
  fixture("robotic", "Robotic Animals", "A film featuring robotic animals."),
  fixture("leading", "Leading", "Develop presentation skills."),
  fixture("reading", "Reading", "Discuss a book."),
  fixture("campus", "Campus", "Tour the university."),
  fixture("camps", "Camps", "Summer activities.", { category: "Camps", categories: ["Camps"] })
];
const spellingIds = (query: string) => searchOpportunities(spellingItems, query).map((item) => item.id);
assert.deepEqual(spellingIds("scince"), spellingIds("science"), "Reviewed science spelling retains canonical membership and ranking");
assert(!spellingIds("scince").includes("since"), "The science typo must not match ordinary since in a book talk");
assert.deepEqual(spellingIds("robtics"), spellingIds("robotics"), "Reviewed robotics spelling retains all canonical source forms");
assert.deepEqual(spellingIds("ＳＣＩＮＣＥ"), spellingIds("science"));
assert.deepEqual(spellingIds("since"), ["since"], "A legitimate ordinary word is never rewritten to science");
assert.equal(spellingIds("leading")[0], "leading", "Legitimate leading intent is not rewritten to reading");
assert(spellingIds("campus").includes("campus"), "A legitimate campus record remains discoverable");
assert.deepEqual(spellingIds("scince 2026-12-02"), [], "A reviewed typo must not drop a date constraint");
assert.deepEqual(spellingIds("robtics zzyxqv"), [], "A reviewed typo must not drop an unknown topic");
assert.deepEqual(spellingIds("scince8"), [], "A token containing a number is not rewritten");

const topicItems = [
  fixture("book-club", "Book Club", "Discuss a novel together."),
  fixture("storytime", "Toddler Storytime", "Stories and songs for toddlers."),
  fixture("parenting", "Triple P: Positive Parenting Program", "Triple P is a world-leading parenting program. Learn positive parenting skills."),
  fixture("drafts", "Drafts", "Bring an early draft to this writing session."),
  fixture("crafts", "Knitting Circle", "Bring a knitting project."),
  fixture("conservation", "Conservation", "Explore local habitat conservation."),
  fixture("conversation", "English Conversation Circle", "Practise speaking in a small group."),
  fixture("storytimestories", "Storytimes", "An introduction to children's songs."),
  fixture("watercolour", "Watercolour Workshop", "Explore painting with a brush.")
];
const topicIds = (query: string, language: "en" | "fr" = "en") => searchOpportunities(topicItems, query, language).map((item) => item.id).sort();
assert.deepEqual(topicIds("reading"), ["book-club", "storytime"], "Reviewed reading intent needs source-backed reading evidence, not world-leading parenting text");
assert.deepEqual(topicIds("Je cherche des activités de lecture"), topicIds("reading"), "French request canonicalization retains the same exact reading evidence");
assert.deepEqual(topicIds("storytime"), ["storytime"], "Canonical storytime must not widen to an unsupported prefix");
assert.deepEqual(topicIds("crafts"), ["crafts"], "Canonical crafts must not fuzz to ordinary drafts");
assert.deepEqual(topicIds("conversation"), ["conversation"], "Canonical conversation must not fuzz to conservation");
assert.deepEqual(topicIds("art"), ["crafts", "watercolour"], "Provider-supported craft and painting aliases retain art discovery");
assert(topicIds("world-leading").includes("parenting"), "An ordinary source phrase remains discoverable without a topic rewrite");
assert(topicIds("conservaton").includes("conservation"), "Other unknown words retain the existing bounded typo tolerance");

// Exceed the bounded query cache, then verify the original ranked result can be
// recomputed without stale membership or ordering. No internal cache is mocked.
for (let index = 0; index < 40; index += 1) searchOpportunities(items, `unknown${index}`);
assert.deepEqual(searchOpportunities(items, "astronomy").map((item) => item.id), expected);
console.log(JSON.stringify({ cacheBehaviorChecks: 8, reviewedSpellingChecks: 10, sourceTopicPrecisionChecks: 8, callerArrayIsolation: true, strictSubsetIsolation: true, recordReplacementInvalidates: true, queryConstraintsPreserved: true, evictionPreservesRanking: true }));
