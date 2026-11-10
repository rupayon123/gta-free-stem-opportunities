import type { DiscoveredOpportunity } from "./discovery";

/** A failed fetch retains only that source's prior review rows, without making
 * their timestamps look newly verified. Publication health remains separate.
 */
export function retainFailedDiscoverySource(previous: readonly DiscoveredOpportunity[], sourceName: string) {
  return previous.filter((candidate) => candidate.sourceName === sourceName);
}
