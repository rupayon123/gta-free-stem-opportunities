import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { publicProgramPages } from "../lib/programPages";

// Verify the actual exported HTML against the complete accepted source, including
// its ending. A preview, translated template or escaped markup cannot stand in
// for the provider's full text.
const entities: Record<string, string> = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#x27;": "'", "&#39;": "'"
};
let longest = 0;
for (const program of publicProgramPages) {
  assert(program.description.length > 0, `Empty source description: ${program.id}`);
  const html = readFileSync(join("out", "programs", encodeURIComponent(program.id), "index.html"), "utf8");
  const matches = [...html.matchAll(/<div class="programs-original-description"[^>]*>([\s\S]*?)<\/div>/g)];
  assert.equal(matches.length, 1, `Missing or repeated full description: ${program.id}`);
  const rendered = matches[0][1].replace(/&(?:amp|lt|gt|quot|#x27|#39);/g, entity => entities[entity]);
  assert.equal(rendered, program.description, `Provider text changed or truncated: ${program.id}`);
  assert(html.includes('id="provider-description"'), `Missing direct-link target: ${program.id}`);
  longest = Math.max(longest, rendered.length);
}
console.log(`Verified complete original descriptions on ${publicProgramPages.length} exported program pages; longest ${longest} characters.`);
