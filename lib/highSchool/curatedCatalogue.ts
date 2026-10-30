import raw from "./curatedListings.json";
import { parseYouthCatalogue, type YouthListing } from "./model";

// Reviewed content stays separate from dated library events and synthetic fixtures.
// A schema error produces an explicit unavailable state, never an invented opening.
export function getCuratedYouthCatalogue(): { state: "ready" | "error"; listings: YouthListing[] } {
  try { return { state: "ready", listings: parseYouthCatalogue(raw) }; }
  catch { return { state: "error", listings: [] }; }
}
