import type { DiscoveredOpportunity } from "./discovery";

/** A failed fetch retains only that source's prior review rows, without making
 * their timestamps look newly verified. Publication health remains separate.
 */
export function retainFailedDiscoverySource(previous: readonly DiscoveredOpportunity[], sourceName: string) {
  return previous.filter((candidate) => candidate.sourceName === sourceName);
}

/** A partial rotating index scan must not erase leads from unvisited pages. */
export function retainUnvisitedDiscovery(previous: readonly DiscoveredOpportunity[], sourceName: string, observed: readonly DiscoveredOpportunity[]) {
  const ids = new Set(observed.map(row => row.id));
  return retainFailedDiscoverySource(previous, sourceName).filter(row => !ids.has(row.id));
}
