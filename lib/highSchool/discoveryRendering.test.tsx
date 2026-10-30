import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { HighSchoolDiscovery } from "../../components/high-school/HighSchoolDiscovery";
import { fixtureListing, fixtureNow, packet } from "./fixtures/policy";

test("upcoming-only source results never announce no matches", () => {
  // Synthetic policy fixture only; it is never imported by the production catalogue.
  const fixture = packet.cases.find(row => row.id === "opens-next-week")!;
  const html = renderToStaticMarkup(<HighSchoolDiscovery listings={[fixtureListing(fixture)]} pathway="learning" now={fixtureNow} catalogueState="ready" />);
  assert.match(html, /1 upcoming programme/);
  assert.match(html, /Upcoming applications/);
  assert(!html.includes("No reviewed matches"));
  assert(!html.includes("Programmes accepting applications</h3>"));
});
