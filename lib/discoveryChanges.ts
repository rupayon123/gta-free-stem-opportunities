import type { DiscoveredOpportunity } from "./discovery";

function meaningfulFields(row: DiscoveredOpportunity) {
  return JSON.stringify({
    title: row.title, organization: row.organization, description: row.description,
    sourceUrl: row.sourceUrl, city: row.city, region: row.region,
    ageMin: row.ageMin, ageMax: row.ageMax, startDate: row.startDate,
    endDate: row.endDate, category: row.category, cost: row.cost,
    language: [...row.language].sort(), tags: [...row.tags].sort()
  });
}

/** Compare facts, not verification timestamps; no notification is sent here. */
export function markDiscoveryObservation(current: DiscoveredOpportunity, prior?: DiscoveredOpportunity): DiscoveredOpportunity {
  if (!prior) return { ...current, firstSeen: current.lastSeen, lastChanged: current.lastSeen, changeKind: "new" };
  const changed = meaningfulFields(current) !== meaningfulFields(prior);
  return { ...current, firstSeen: prior.firstSeen ?? prior.lastSeen,
    lastChanged: changed ? current.lastSeen : prior.lastChanged ?? prior.lastSeen,
    changeKind: changed ? "changed" : "unchanged" };
}
