import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { autismOntarioIndexPages, extractAutismOntarioIndex } from "../lib/autismOntarioIndex";
import { reviewAges, reviewCost } from "../lib/discoveryReviewEvidence";
import { sourceOpportunities } from "../lib/data";
import { isPublicOpportunity } from "../lib/opportunityStatus";

// Minimized titles, dates and URLs from the official index captured Nov 10.
const html = readFileSync("scripts/fixtures/autism-ontario-index-2026-11-10.html", "utf8");
const leads = extractAutismOntarioIndex(html);
const pageSets = Array.from({length: 4}, (_, i) => autismOntarioIndexPages(html, new Date(Date.parse("2026-11-10T00:00:00Z") + i * 6 * 3600000)));
assert(pageSets.every(pages => pages.length === 3 && new Set(pages).size === 3));
assert.equal(new Set(pageSets.flat()).size, 10);
assert(leads.some(row => row.city === "Toronto" && row.sourceUrl === "https://www.autismontario.com/civicrm/event/info?id=13014"));
assert(leads.some(row => row.city === "Pickering" && row.sourceUrl === "https://www.autismontario.com/civicrm/event/info?id=13023"));
assert(leads.some(row => row.city === "Oakville" && row.startDate === "2026-11-13" && row.sourceUrl === "https://www.autismontario.com/civicrm/event/info?id=13304"));
assert(leads.every(row => reviewCost(row.description) === "Unknown" && reviewAges(row.description).ageMin === undefined));
assert.deepEqual(extractAutismOntarioIndex(html.replaceAll('/civicrm/event/info?id=', 'https://evil.example/?id=')), []);
assert.equal(reviewCost("Free parking for registered attendees"), "Unknown");
assert.equal(reviewCost("Registration fee is not stated"), "Unknown");
assert.equal(reviewCost("This is a free event"), "Free to join");
assert.equal(reviewCost("Registration is free; photos cost extra"), "Free to join");
assert.deepEqual(reviewAges("For grades 9–12"), {});
assert.deepEqual(reviewAges("For families and adults"), {});
assert.deepEqual(reviewAges("Ages 6–12"), { ageMin: 6, ageMax: 12 });
assert.deepEqual(reviewAges("Ages 12–6"), {});
const known = sourceOpportunities.find(row => row.id === "ontario-science-centre-pride-in-stem-2026")!;
assert.equal(isPublicOpportunity({ ...known, id: "discovered-test", status: "active" }, new Date("2026-11-10T12:00:00Z")), false);
console.log(JSON.stringify({ capturedProviderLeads: leads.length, unknownCostAndAgeRemainPrivate: true, reviewLeadsNeverAutoPublish: true }));
