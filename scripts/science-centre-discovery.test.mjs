import assert from "node:assert/strict";
import { extractScienceCentreCards } from "../lib/scienceCentreDiscovery.ts";
import { retainFailedDiscoverySource } from "../lib/discoveryRetention.ts";
import { discoveryDateOnly } from "../lib/discoveryDates.ts";
import { markDiscoveryObservation } from "../lib/discoveryChanges.ts";
import { extractUniversityEventCards } from "../lib/universityEventDiscovery.ts";

const card = `<a href="/whats-on/pop-ups-plus-events/pride-in-stem-2026/" class="osc-callout osc-callout-special">
  <span class="title">Pride in STEM 2026</span>
  <span class="event date"><p>Evergreen Brick Works<br>Saturday, November 21, 2026</p></span>
  <p>A fun and free event for the whole family!</p>
</a>`;
const duplicate = card.replace("osc-callout-special", "osc-callout-another");
const external = card.replace("/whats-on/pop-ups-plus-events/pride-in-stem-2026/", "https://example.org/whats-on/pop-ups-plus-events/not-official");
const navigation = `<a href="/whats-on/pop-ups-plus-events/">Pop-ups and events</a>`;
const results = extractScienceCentreCards(card + duplicate + external + navigation);
assert.equal(results.length, 1);
assert.equal(results[0].title, "Pride in STEM 2026");
assert.equal(results[0].sourceUrl, "https://www.ontariosciencecentre.ca/whats-on/pop-ups-plus-events/pride-in-stem-2026");
assert.match(results[0].description, /November 21, 2026/);
assert.match(results[0].description, /free event/);
assert.deepEqual(extractScienceCentreCards("<html><h1>Changed format</h1></html>"), []);
assert.deepEqual(extractScienceCentreCards(card.replace("pride-in-stem-2026/", "pride-in-stem-2026/?redirect=evil")), []);
const prior = [{ sourceName: "Science Centre", lastChecked: "2026-11-01", lastSeen: "2026-11-01" },
  { sourceName: "Other", lastChecked: "2026-11-02", lastSeen: "2026-11-02" }];
assert.deepEqual(retainFailedDiscoverySource(prior, "Science Centre"), [prior[0]]);
assert.equal(prior[0].lastChecked, "2026-11-01");
assert.equal(discoveryDateOnly("November 21, 2026"), "2026-11-21");
assert.equal(discoveryDateOnly("2026-11-21"), "2026-11-21");
assert.equal(discoveryDateOnly("February 30, 2026"), undefined);
assert.equal(discoveryDateOnly("2026-02-30"), undefined);
const event = { id: "event", title: "Science event", organization: "Science Centre", description: "Free event",
  sourceUrl: "https://example.org/event", city: "Toronto", region: "Toronto", ageMin: 0,
  startDate: "2026-11-21", category: "STEM", cost: "Free to join", language: ["en"],
  tags: ["science"], lastSeen: "2026-11-10", lastChecked: "2026-11-10" };
const first = markDiscoveryObservation(event);
assert.equal(first.changeKind, "new");
const unchanged = markDiscoveryObservation({ ...event, lastSeen: "2026-11-11", lastChecked: "2026-11-11" }, first);
assert.equal(unchanged.changeKind, "unchanged");
assert.equal(unchanged.firstSeen, "2026-11-10");
assert.equal(unchanged.lastChanged, "2026-11-10");
const changed = markDiscoveryObservation({ ...event, description: "Time changed", lastSeen: "2026-11-11" }, first);
assert.equal(changed.changeKind, "changed");
assert.equal(changed.lastChanged, "2026-11-11");
const eventBase = { "@type": "Event", name: "STEM Students for a Day", description: "Grade 9–12", url: "https://outreach.engineering.utoronto.ca/event/stem-students-for-a-day-fall/", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled", startDate: "2026-11-20T09:00:00-05:00", endDate: "2026-11-20T16:30:00-05:00", offers: { price: "0", priceCurrency: "CAD", availability: "inStock" } };
const structured = `<script type="application/ld+json">${JSON.stringify({ "@graph": [eventBase, { ...eventBase, name: "Paid", url: "https://outreach.engineering.utoronto.ca/event/paid/", offers: { price: "252", priceCurrency: "CAD" } }, { ...eventBase, url: "https://attacker.example/event/fake/" }, { ...eventBase, url: "https://outreach.engineering.utoronto.ca/event/sold-out/", offers: { price: "0", priceCurrency: "CAD", availability: "https://schema.org/SoldOut" } }] })}</script>`;
const university = extractUniversityEventCards(structured);
assert.equal(university.length, 1);
assert.equal(university[0].startDate, "2026-11-20T09:00:00-05:00");
assert.match(university[0].description, /Admission: Free/);
assert.deepEqual(extractUniversityEventCards('<script type="application/ld+json">invalid</script>'), []);
console.log("Ontario Science Centre card extraction passed; candidates still require review.");
