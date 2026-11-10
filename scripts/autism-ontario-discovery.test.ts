import assert from "node:assert/strict";
import { extractAutismOntarioEvent } from "../lib/autismOntarioDiscovery";

const url = "https://www.autismontario.com/civicrm/event/info?id=13084";
const html = `<h1 class="page-title">Quiet Time</h1><div class="event-info">
<p>Registration for this event is free. Open to autistic children, autistic adults, their siblings and caregivers.</p>
<p>Photo package options will be available to purchase.</p><div>November 22nd, 2026</div>
<div class="event_map-section">`;
const [event] = extractAutismOntarioEvent(html, url);
assert.equal(event.startDate, "2026-11-22");
assert.match(event.description, /Optional photo packages cost extra/);
assert.deepEqual(extractAutismOntarioEvent(html.replace("Registration for this event is free", "Cost not specified"), url), []);
assert.deepEqual(extractAutismOntarioEvent(html.replace("autistic adults", "adults"), url), []);
assert.deepEqual(extractAutismOntarioEvent(html, "https://example.com/"), []);
console.log("Autism Ontario review-candidate checks passed.");
