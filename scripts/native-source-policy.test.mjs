import assert from "node:assert/strict";
import { isAllowedNativeSource, scienceCentreEventID, scienceCentreEventURL, scienceCentreFactualSummary } from "./native-source-policy.ts";

const official = { id: scienceCentreEventID, organization: "Ontario Science Centre", sourceUrl: scienceCentreEventURL, registrationUrl: scienceCentreEventURL, description: scienceCentreFactualSummary, title: "Pride in STEM 2026", startDate: "2026-11-21T09:00:00-05:00", endDate: "2026-11-21T15:00:00-05:00", city: "Toronto", region: "Toronto", address: "Evergreen Brick Works, 550 Bayview Avenue, Toronto, ON M4W 3X8", ageMin: 0, cost: "Free to join" };
assert.equal(isAllowedNativeSource(official), true);
for (const changed of [
  { id: "different" }, { organization: "Other" }, { registrationUrl: "https://example.org" }, { description: scienceCentreFactualSummary + " changed" }, { startDate: "2026-11-21T10:00:00-05:00" },
  { sourceUrl: scienceCentreEventURL + "-different", registrationUrl: scienceCentreEventURL + "-different" },
  { sourceUrl: scienceCentreEventURL.replace("https:", "http:"), registrationUrl: scienceCentreEventURL.replace("https:", "http:") },
  { sourceUrl: scienceCentreEventURL + "?next=evil", registrationUrl: scienceCentreEventURL + "?next=evil" }
]) assert.equal(isAllowedNativeSource({ ...official, ...changed }), false);
console.log("Exact Ontario Science Centre source and registration checks passed.");
