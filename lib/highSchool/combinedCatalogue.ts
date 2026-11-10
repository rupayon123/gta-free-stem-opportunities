import { parsePublicYouthFeed, type PublicYouthFeed } from "../youthHunter/feed";
import { parseYouthCatalogue, type YouthListing } from "./model";

/** Keep curated guidance/programmes separate from the role feed's own state.
 * An invalid role feed never becomes a successful empty response or renews dates.
 * Hunter roles must not be copied into the static curated bundle as a fallback.
 */
export function combineYouthCatalogue(curated: YouthListing[], roleFeed: PublicYouthFeed | undefined, now: string) {
  const base = parseYouthCatalogue(curated);
  if (!roleFeed) return { listings: base, feed: undefined, invalidRoleFeed: false, displayedFeedState: undefined };
  try {
    if (Date.parse(roleFeed.generatedAt) > Date.parse(now)) throw new Error("Future youth feed revision");
    const feed = parsePublicYouthFeed(roleFeed, now);
    // Same inclusive 30-day default as the model/canonical loader. Re-evaluate
    // display at the Hub's current clock without another fetch or getter poll.
    const stale = Date.parse(now) - Date.parse(feed.generatedAt) > 30 * 86_400_000 || feed.count < roleFeed.count;
    const sourceIds = new Set(roleFeed.opportunities.map(row => row.id));
    const listings = new Map(base.filter(row => !sourceIds.has(row.id)).map(row => [row.id, row]));
    feed.opportunities.forEach(row => listings.set(row.id, row));
    return { listings: [...listings.values()], feed, invalidRoleFeed: false, displayedFeedState: stale ? "stale" as const : "ready" as const };
  } catch {
    return { listings: base, feed: undefined, invalidRoleFeed: true, displayedFeedState: "error" as const };
  }
}
