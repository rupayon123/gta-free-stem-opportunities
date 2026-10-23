import assert from "node:assert/strict";
import { inferLibraryOpportunityAges } from "../lib/libraryOpportunityClassification";
import { verifyLibraryRssCache } from "./library-rss-cache-regression";
import { assertCompleteLibraryPagination, fetchFeed, inferCategory, normalizeDate, parseItems, shouldInclude, toOpportunity, type LibraryFeed, type RssItem } from "./generate-library-opportunities";

const now = new Date("2026-10-22T16:00:00Z");
const feed: LibraryFeed = {
  id: "fixture-library", libraryId: "fixture", organization: "Fixture Public Library",
  providerContact: "https://fixture.invalid/contact", region: "York", city: "Markham", pages: 1
};
const [reading] = parseItems(`<rss><channel><item>
  <title>Family Storytime</title>
  <description><![CDATA[Read stories and sing songs. For ages 3-5. No registration fees.]]></description>
  <link>https://fixture.invalid/events/storytime</link>
  <category>Storytime</category><category>Preschool</category>
  <bc:start_date>2026-10-23T14:00:00Z</bc:start_date>
  <bc:end_date>2026-10-23T15:00:00Z</bc:end_date>
  <bc:is_cancelled>false</bc:is_cancelled><bc:is_virtual>false</bc:is_virtual>
  <bc:location><bc:name>Community Branch</bc:name><bc:city>Thornhill</bc:city>
  <bc:number>10</bc:number><bc:street>Example Street</bc:street><bc:state>ON</bc:state>
  <bc:latitude>43.8167</bc:latitude><bc:longitude>-79.4244</bc:longitude></bc:location>
  <bc:registration_info><bc:is_full>false</bc:is_full></bc:registration_info>
</item></channel></rss>`);
assert.ok(reading, "Structured RSS must yield a real event fixture.");
assert.equal(shouldInclude(reading, now), true, "Free reading events must be eligible without STEM evidence.");
assert.equal(inferCategory(reading), "Library & Community");
const converted = toOpportunity(reading, feed);
assert.deepEqual(converted.categories, ["Library & Community"], "Reading must not acquire a fabricated STEM label.");
assert.equal(inferCategory({ ...reading, title: "Science Fiction Book Club", description: "Discuss a science-fiction novel with neighbours." }), "Library & Community");
assert.equal(inferCategory({ ...reading, title: "Family Movies: The Wild Robot", description: "Watch a family movie together." }), "Library & Community");
assert.equal(inferCategory({ ...reading, title: "Science Fiction Writing Workshop", description: "Create a short story set on another planet." }), "Library & Community");
assert.equal(inferCategory({ ...reading, title: "Star Trek Community Quiz", description: "Explore favourite characters and stories with neighbours." }), "Library & Community");
assert.deepEqual(converted.ages, { min: 3, max: 5 });
assert.equal(converted.city, "Thornhill", "Use the source city rather than the feed's default city.");
assert.equal(converted.latitude, 43.8167);
assert.equal(converted.longitude, -79.4244);
assert.equal(converted.startDate, "2026-10-23T14:00:00.000Z");
assert.ok(converted.address.includes("10 Example Street"));

const withEvent = (change: Partial<RssItem>) => ({ ...reading, ...change });
for (const change of [
  { title: "Watercolour for Beginners", description: "Create a painting together.", categories: ["Culture, Arts & Entertainment"] },
  { title: "Community Welcome Circle", description: "Meet neighbours and share stories.", categories: ["Community"] },
  { title: "Chair Yoga", description: "A free gentle movement class.", categories: ["Health & Wellness"] },
  { title: "Homework Club", description: "Free homework support at the library.", categories: ["School Age Children (6-12)"] },
  { title: "Free Art Exhibition", description: "Explore the library’s current art exhibition. Admission is free." },
  { title: "Android Apps", description: "Explore free, and paid apps on your phone." },
  { description: "Program fee: $0.00. All supplies included." },
  { description: "No admission fees. Donations are optional." },
  { description: "Admission fee: Free. A conversation about payments and budgeting." }
]) assert.equal(shouldInclude(withEvent(change), now), true, `${change.title ?? "Zero-cost program"} must be eligible.`);

for (const change of [
  { description: "The cost of the program is $50+tax." },
  { description: "A registration fee is required. Contact the branch for pricing." },
  { description: "Payment required to attend." },
  { description: "Registration is free. A materials fee is required to attend; contact the branch for pricing." },
  { description: "Free admission; supplies fee: contact the branch." },
  { description: "Program fee: $0.00. A donation is required to participate." },
  { description: "Admission is five dollars." },
  { description: "A mandatory donation is collected at the door." },
  { description: "A nominal fee is charged for materials." },
  { description: "Free registration. Additional fees may apply." },
  { description: "This is not a free program." },
  { title: "Branch Art Exhibit", description: "Admission fee: $10." },
  { cancelled: true }, { full: true }, { title: "CANCELLED: Storytime" }, { title: "FULL: Storytime" },
  { startDate: "", endDate: "2026-10-23T15:00:00Z" },
  { startDate: "not-a-date" },
  { startDate: "2026-10-22T12:00:00Z", endDate: "2026-10-22T13:00:00Z" }
]) assert.equal(shouldInclude(withEvent(change), now), false, `Unsafe or unavailable event must be excluded: ${JSON.stringify(change)}.`);

const coding = withEvent({ title: "Python Coding Workshop", description: "Learn basic Python programming.", categories: ["Coding & Robotics"] });
assert.equal(inferCategory(coding), "Coding & Robotics");
assert.ok(toOpportunity(coding, feed).categories.includes("STEM"), "Evidence-backed STEM events keep their STEM category.");
assert.equal(normalizeDate("2026-12-10T10:00"), "2026-12-10T15:00:00.000Z", "Winter local times use Toronto standard time.");
assert.equal(normalizeDate("2026-07-10T10:00"), "2026-07-10T14:00:00.000Z", "Summer local times use Toronto daylight time.");
assert.equal(normalizeDate("2026-03-08T03:30"), "2026-03-08T07:30:00.000Z");
assert.equal(normalizeDate("2026-03-08T02:30"), undefined, "Do not invent a nonexistent DST hour.");
assert.equal(normalizeDate("2026-12-10"), "2026-12-10", "Date-only source values must not acquire an invented time.");
assert.equal(normalizeDate("2026-02-30"), undefined);
assert.equal(normalizeDate("2026-02-30T14:00:00Z"), undefined, "A timezone does not make an invalid calendar date valid.");
assert.equal(normalizeDate("2026-02-30T14:00:00-05:00"), undefined);
assert.throws(() => toOpportunity(withEvent({ startDate: "" }), feed), /invalid source start date/);
const audience = (description: string, categories: string[] = ["Infants"]) => inferLibraryOpportunityAges({ title: "Library program", description, categories });
assert.deepEqual(audience("For Ages 0–18 months."), { min: 0, max: 1.5, ageLabel: "Ages 0–18 months" });
assert.deepEqual(audience("For children 6–24 months."), { min: 0.5, max: 2, ageLabel: "6–24 months" });
assert.deepEqual(audience("Join us for stories in this program for babies, birth to 18 months, and their caregivers.", ["Preschool Children (0-5)"]), { min: 0, max: 1.5, ageLabel: "birth to 18 months" });
assert.deepEqual(audience("Stories and songs for babies from birth–18 months with parents.", ["Preschool Children (0-5)"]), { min: 0, max: 1.5, ageLabel: "birth–18 months" });
assert.deepEqual(audience("Stories and rhymes for children, 19 months to 3 years, and caregivers.", ["Preschool Children (0-5)"]), { min: 19 / 12, max: 3, ageLabel: "19 months to 3 years" });
assert.deepEqual(audience("A social space for children from 19 months to 5 years.", ["Preschool Children (0-5)"]), { min: 19 / 12, max: 5, ageLabel: "19 months to 5 years" });
assert.deepEqual(audience("Read together.", ["Preschool Children (0-5)"]), { min: 0, max: 5 }, "Preschool children must not acquire the school-age upper bound just from the word children.");
assert.deepEqual(audience("Read together.", ["Preschool Children (0-5)", "School Age Children (6-12)"]), { min: 0, max: 12 });
assert.deepEqual(audience("For ages 6–12 years.", ["School Age Children"]), { min: 6, max: 12 });
assert.deepEqual(audience("For ages 6–24.", []), { min: 6, max: 24 }, "Unitless ages retain the established years convention, without inventing a month label.");
assert.deepEqual(audience("Learning this skill can take 6–24 months.", ["Adult"]), { min: 18, max: undefined }, "A duration is not an audience age range.");
assert.deepEqual(audience("Parents discuss caring for babies ages 0–18 months.", ["Adult"]), { min: 18, max: undefined }, "Adult audiences must not become babies because of the subject being discussed.");
assert.deepEqual(audience("Parents discuss babies from birth to 18 months.", ["Adult"]), { min: 18, max: undefined });
assert.deepEqual(audience("A course for adults takes 19 months to 3 years to complete.", ["Adult"]), { min: 18, max: undefined });
assert.deepEqual(audience("For ages 18–6 months."), { min: 0, max: 5 }, "Malformed month prose must not fall through to a fabricated years range.");
const monthEvent = toOpportunity(withEvent({ description: "For Ages 0–18 months.", categories: ["Infants"] }), feed);
assert.deepEqual(monthEvent.ages, { min: 0, max: 1.5 });
assert.equal(monthEvent.ageLabel, "Ages 0–18 months", "Keep exact source month wording outside the numeric age object.");
assert.throws(() => assertCompleteLibraryPagination("Fixture Public Library", false, 300), /No master file was written/);
assert.doesNotThrow(() => assertCompleteLibraryPagination("Fixture Public Library", true, 300));
console.log("Library collector regressions passed: broad topics, real categories/source facts, cost/availability gates, and Toronto date precision.");

async function verifyBoundedRetry() {
  let attempts = 0;
  const recovery = (async () => {
    attempts += 1;
    if (attempts === 1) throw new Error("fixture transient timeout");
    return new Response("<rss><channel></channel></rss>");
  }) as typeof fetch;
  assert.equal((await fetchFeed(feed, 7, recovery, { cacheDirectory: "" })).xml, "<rss><channel></channel></rss>");
  assert.equal(attempts, 2, "A transient failure receives one retry.");
  attempts = 0;
  const persistent = (async () => { attempts += 1; throw new Error("fixture unavailable"); }) as typeof fetch;
  await assert.rejects(fetchFeed(feed, 8, persistent, { cacheDirectory: "" }), /fixture unavailable/);
  assert.equal(attempts, 2, "An unresolved failure stays failed after the one allowed retry.");
  console.log("Library RSS retry regressions passed without network requests.");
}
verifyBoundedRetry().then(verifyLibraryRssCache).catch((error) => { console.error(error); process.exitCode = 1; });
