import { evaluateYouthListing, parseYouthCatalogue, validTimestamp, type YouthListing } from "../highSchool/model";

export interface YouthProviderApproval {
  providerId: "aurora-library";
  adapterVersion: 1;
  contentMode: "authored-facts";
  approvedAt: string;
}
export interface YouthSourceObservation {
  providerId: "aurora-library";
  adapterVersion: 1;
  checkedAt: string;
  complete: boolean;
  roles: YouthListing[];
  fingerprints: Record<string, string>;
  reviewRequiredIds: string[];
}
export interface YouthHunterState {
  schemaVersion: 1;
  roles: YouthListing[];
  fingerprints: Record<string, string>;
  retiredIds: string[];
  lastSuccessfulCheck?: string;
}
export type YouthRefreshOutcome = { ok: true; observation: YouthSourceObservation } | { ok: false; error: string };
export interface PublicYouthFeed {
  schemaVersion: 1;
  generatedAt: string;
  count: number;
  opportunities: YouthListing[];
  verifiedFreeRoleIds: string[];
  costUnconfirmedLeadIds: string[];
}
export const emptyYouthHunterState = (): YouthHunterState => ({ schemaVersion: 1, roles: [], fingerprints: {}, retiredIds: [] });

/** Provider/adapter approval is one-time policy review, not a manual approval
 * for each new title or recognized fact update. An unrecognized/ambiguous
 * source observation remains private. No persistence/publication side effects. */
export function reconcileYouthSource(previous: YouthHunterState, outcome: YouthRefreshOutcome, approval?: YouthProviderApproval): {
  state: YouthHunterState; accepted: boolean; warning?: string
} {
  if (!outcome.ok) return { state: previous, accepted: false, warning: outcome.error };
  const o = outcome.observation;
  try {
    if (previous.schemaVersion !== 1 || !o.complete || o.providerId !== "aurora-library" || o.adapterVersion !== 1 || !validTimestamp(o.checkedAt)) throw new Error("Incomplete or unknown provider snapshot");
    parseYouthCatalogue(previous.roles);
    const priorChecks = [...previous.roles.map(r => r.checkedAt), ...(previous.lastSuccessfulCheck ? [previous.lastSuccessfulCheck] : [])];
    if (priorChecks.some(time => !validTimestamp(time) || Date.parse(o.checkedAt) < Date.parse(time))) throw new Error("Older youth source observation cannot revive retired roles");
    const rows = parseYouthCatalogue(o.roles);
    const ids = new Set(rows.map(r => r.id));
    if (Object.keys(o.fingerprints).length !== rows.length || o.reviewRequiredIds.some(id => !ids.has(id))) throw new Error("Observation identity mismatch");
    for (const row of rows) {
      if (!row.id.startsWith("aurora-buddies-") || row.provider !== "Aurora Public Library" || row.checkedAt !== o.checkedAt || row.listingKind !== "role" || !row.roleDetails || !/^[a-f0-9]{64}$/.test(o.fingerprints[row.id] ?? "")) throw new Error("Invalid observed role identity/detail");
    }
    const approved = approval?.providerId === o.providerId && approval.adapterVersion === o.adapterVersion && approval.contentMode === "authored-facts" &&
      validTimestamp(approval.approvedAt) && Date.parse(approval.approvedAt) <= Date.parse(o.checkedAt);
    const updated = rows.map(row => ({ ...row, reviewStatus: approved && !o.reviewRequiredIds.includes(row.id) ? "approved" as const : "hold" as const }));
    const other = previous.roles.filter(r => !r.id.startsWith("aurora-buddies-"));
    const retired = previous.roles.filter(r => r.id.startsWith("aurora-buddies-") && !ids.has(r.id)).map(r => r.id);
    const fingerprints = { ...previous.fingerprints };
    for (const id of retired) delete fingerprints[id];
    Object.assign(fingerprints, o.fingerprints);
    return { state: { schemaVersion: 1, roles: [...other, ...updated], fingerprints,
      retiredIds: [...new Set([...previous.retiredIds, ...retired])].filter(id => !ids.has(id)), lastSuccessfulCheck: o.checkedAt }, accepted: true };
  } catch (error) { return { state: previous, accepted: false, warning: error instanceof Error ? error.message : "Invalid source snapshot" }; }
}
/** Failed fetches cannot renew source checks. The current clock still expires
 * old checks, including when the caller retains a last-known-good state. */
export function buildPublicYouthFeed(state: YouthHunterState, now: string): PublicYouthFeed {
  if (state.schemaVersion !== 1 || !validTimestamp(now)) throw new Error("Invalid youth feed state/clock");
  const rows = parseYouthCatalogue(state.roles);
  const opportunities = rows.filter(row => {
    const e = evaluateYouthListing(row, { now });
    return e.reviewed && row.listingKind === "role" && !!row.roleDetails && e.teenHub && e.effectiveStatus === "open";
  });
  const verifiedFreeRoleIds = opportunities.filter(r => evaluateYouthListing(r, { now }).verifiedFreeRoles).map(r => r.id);
  const costUnconfirmedLeadIds = opportunities.filter(r => evaluateYouthListing(r, { now }).costLabel === "Cost unknown").map(r => r.id);
  // Known mandatory costs don't silently enter a free app through the lead list.
  const visible = opportunities.filter(r => verifiedFreeRoleIds.includes(r.id) || costUnconfirmedLeadIds.includes(r.id));
  return { schemaVersion: 1, generatedAt: now, count: visible.length, opportunities: visible, verifiedFreeRoleIds, costUnconfirmedLeadIds };
}
export function parsePublicYouthFeed(input: unknown, now: string): PublicYouthFeed {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid youth feed");
  const x = input as PublicYouthFeed;
  if (x.schemaVersion !== 1 || !validTimestamp(x.generatedAt) || !Array.isArray(x.opportunities) || x.count !== x.opportunities.length) throw new Error("Invalid youth feed envelope");
  const roles = parseYouthCatalogue(x.opportunities);
  const rebuilt = buildPublicYouthFeed({ schemaVersion: 1, roles, fingerprints: {}, retiredIds: [] }, x.generatedAt);
  if (JSON.stringify(rebuilt.verifiedFreeRoleIds) !== JSON.stringify(x.verifiedFreeRoleIds) || JSON.stringify(rebuilt.costUnconfirmedLeadIds) !== JSON.stringify(x.costUnconfirmedLeadIds) || rebuilt.count !== x.count) throw new Error("Youth feed classifications mismatch");
  const current = buildPublicYouthFeed({ schemaVersion: 1, roles, fingerprints: {}, retiredIds: [] }, now);
  return { ...current, generatedAt: x.generatedAt };
}

export const maximumPublicYouthFeedBytes = 4_000_000;
export function serializePublicYouthFeed(value: PublicYouthFeed): string {
  parsePublicYouthFeed(value, value.generatedAt);
  const raw = JSON.stringify(value) + "\n";
  if (new TextEncoder().encode(raw).byteLength > maximumPublicYouthFeedBytes) throw new Error("Youth feed exceeds byte limit; previous output must be retained");
  return raw;
}
export function decodePublicYouthFeed(raw: string, now: string): PublicYouthFeed {
  if (new TextEncoder().encode(raw).byteLength > maximumPublicYouthFeedBytes) throw new Error("Youth feed exceeds byte limit");
  return parsePublicYouthFeed(JSON.parse(raw), now);
}
