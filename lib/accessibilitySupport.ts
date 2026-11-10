/** Provider evidence, not a person's diagnosis, inferred needs or blanket access certification. */
export const accessibilitySupportCategories = [
  "mobility-wheelchair", "sensory-friendly", "adapted-inclusive-programme",
  "sign-language", "hearing-captioning", "visual-formats", "support-person"
] as const;
export type AccessibilitySupportCategory = typeof accessibilitySupportCategories[number];
export type AccessibilitySupportStatus = "provided" | "on-request" | "not-available" | "unknown";
export type AccessibilitySupportScope = "venue" | "activity" | "provider-policy";
export interface AccessibilitySupportEvidence {
  category: AccessibilitySupportCategory;
  status: AccessibilitySupportStatus;
  scope: AccessibilitySupportScope;
  sourceUrl: string;
  /** Exact provider wording; never manufactured from a title, AI or boilerplate. */
  evidenceText: string;
  /** Canonical UTC instant of a real source check, not event date or import time. */
  checkedAt: string;
  reviewStatus: "approved" | "hold";
  /** Provider-backed constraints, e.g. notice, booking, branch exceptions. */
  conditions?: string[];
  requestUrl?: string;
  /** Exact reviewed venue mapping; mandatory only for venue-scoped claims. */
  venue?: { id: string; name: string };
}
export interface AccessibilitySupport {
  schemaVersion: 1;
  evidence: AccessibilitySupportEvidence[];
}
const record = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === "object" && !Array.isArray(v);
const text = (v: unknown, max: number): v is string => typeof v === "string" && v.trim().length > 0 && v.length <= max;
const statuses = ["provided", "on-request", "not-available", "unknown"] as const;
const scopes = ["venue", "activity", "provider-policy"] as const;
function requireValue(ok: unknown, message: string): asserts ok { if (!ok) throw new Error(`Invalid accessibility support: ${message}`); }
function exactKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
  return Object.keys(value).length === keys.length && keys.every(k => Object.hasOwn(value, k));
}
function allowedKeys(value: Record<string, unknown>, required: readonly string[], optional: readonly string[]): boolean {
  return required.every(k => Object.hasOwn(value, k)) && Object.keys(value).every(k => required.includes(k) || optional.includes(k));
}
function sourceUrl(value: unknown): value is string {
  if (!text(value, 2048)) return false;
  try {
    const u = new URL(value); const host = u.hostname.toLowerCase().replace(/\.$/, "");
    return u.protocol === "https:" && !u.username && !u.password && !u.port && host.includes(".") &&
      !/^[\d.]+$/.test(host) && !host.includes(":") &&
      !["localhost", "local", "internal", "lan", "home", "invalid", "test"].some(s => host === s || host.endsWith(`.${s}`));
  } catch { return false; }
}
function checkedInstant(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) return false;
  const time = Date.parse(value);
  return Number.isFinite(time) && new Date(time).toISOString() === value;
}
/** Shape validation cannot verify a provider claim. Explicit human source review is still required. */
export function parseAccessibilitySupport(value: unknown): AccessibilitySupport {
  requireValue(record(value) && exactKeys(value, ["schemaVersion", "evidence"]) && value.schemaVersion === 1 && Array.isArray(value.evidence) && value.evidence.length <= 48, "version/evidence");
  const evidence = value.evidence.map((v): AccessibilitySupportEvidence => {
    requireValue(record(v) && allowedKeys(v, ["category", "status", "scope", "sourceUrl", "evidenceText", "checkedAt", "reviewStatus"], ["conditions", "requestUrl", "venue"]), "evidence shape");
    requireValue(accessibilitySupportCategories.some(c => c === v.category) && statuses.some(s => s === v.status) && scopes.some(s => s === v.scope), "category/status/scope");
    requireValue(sourceUrl(v.sourceUrl) && text(v.evidenceText, 600) && checkedInstant(v.checkedAt) && ["approved", "hold"].includes(v.reviewStatus as string), "provider evidence");
    if (v.conditions !== undefined) requireValue(Array.isArray(v.conditions) && v.conditions.length <= 12 && v.conditions.every(c => text(c, 500)), "conditions");
    if (v.requestUrl !== undefined) requireValue(sourceUrl(v.requestUrl), "request URL");
    if (v.scope === "venue") requireValue(record(v.venue) && exactKeys(v.venue, ["id", "name"]) && text(v.venue.id, 120) && text(v.venue.name, 240), "exact venue reference");
    else requireValue(v.venue === undefined, "venue reference scope");
    return { category: v.category as AccessibilitySupportCategory, status: v.status as AccessibilitySupportStatus,
      scope: v.scope as AccessibilitySupportScope, sourceUrl: v.sourceUrl, evidenceText: v.evidenceText,
      checkedAt: v.checkedAt, reviewStatus: v.reviewStatus as "approved" | "hold",
      ...(v.conditions === undefined ? {} : { conditions: [...v.conditions as string[]] }),
      ...(v.requestUrl === undefined ? {} : { requestUrl: v.requestUrl as string }),
      ...(v.venue === undefined ? {} : { venue: { id: (v.venue as { id: string }).id, name: (v.venue as { name: string }).name } }) };
  });
  return { schemaVersion: 1, evidence };
}
/** Runtime readers isolate an optional bad/unsupported extension. Publishers
 * must keep using the strict parser and must not publish this fallback marker. */
export const accessibilitySupportUnavailableMessage = "Accessibility details unavailable. Check with the provider.";
export function readAccessibilitySupport(value: unknown): {
  accessibilitySupport?: AccessibilitySupport; accessibilitySupportUnavailable?: true
} {
  if (value === undefined) return {};
  try { return { accessibilitySupport: parseAccessibilitySupport(value) }; }
  catch { return { accessibilitySupportUnavailable: true }; }
}
export interface AccessibilitySupportDecision {
  status: AccessibilitySupportStatus;
  reason: "provider-evidence" | "missing" | "unreviewed" | "out-of-date" | "conflicting" | "venue-unmatched";
}
/** Reference semantics for later filters. Venue proof NEVER proves activity support; provider policies never guarantee event services.
 * No category is inferred from a title/tag/generic accessibility note. */
export function accessibilitySupportDecision(
  input: AccessibilitySupport | undefined,
  category: AccessibilitySupportCategory,
  scope: AccessibilitySupportScope,
  now: string,
  maxEvidenceAgeDays = 30,
  venueId?: string
): AccessibilitySupportDecision {
  requireValue(checkedInstant(now) && Number.isFinite(maxEvidenceAgeDays) && maxEvidenceAgeDays > 0 && maxEvidenceAgeDays <= 90, "evaluation clock/freshness");
  requireValue(accessibilitySupportCategories.includes(category) && scopes.includes(scope), "selection");
  let rows = input === undefined ? [] : parseAccessibilitySupport(input).evidence.filter(e => e.category === category && e.scope === scope);
  if (scope === "venue") {
    if (!text(venueId, 120)) return { status: "unknown", reason: "venue-unmatched" };
    rows = rows.filter(e => e.venue?.id === venueId);
    if (!rows.length) return { status: "unknown", reason: "venue-unmatched" };
  }
  if (!rows.length) return { status: "unknown", reason: "missing" };
  const approved = rows.filter(e => e.reviewStatus === "approved");
  if (!approved.length) return { status: "unknown", reason: "unreviewed" };
  const instant = Date.parse(now);
  if (approved.some(e => instant < Date.parse(e.checkedAt) || instant - Date.parse(e.checkedAt) > maxEvidenceAgeDays * 86_400_000)) return { status: "unknown", reason: "out-of-date" };
  if (new Set(approved.map(e => e.status)).size !== 1) return { status: "unknown", reason: "conflicting" };
  return { status: approved[0].status, reason: "provider-evidence" };
}
/** Additive native/browser export. Legacy prose is retained verbatim, never
 * promoted to structured proof. Missing structured metadata stays omitted. */
export function accessibilityExportFields(row: { accessibility?: unknown; accessibilitySupport?: unknown; accessibilitySupportUnavailable?: unknown }): {
  accessibility?: string[]; accessibilitySupport?: AccessibilitySupport
} {
  requireValue(row.accessibilitySupportUnavailable === undefined, "runtime fallback must not be published");
  const result: { accessibility?: string[]; accessibilitySupport?: AccessibilitySupport } = {};
  if (row.accessibility !== undefined) {
    requireValue(Array.isArray(row.accessibility) && row.accessibility.every(v => typeof v === "string"), "legacy notes");
    result.accessibility = [...row.accessibility];
  }
  if (row.accessibilitySupport !== undefined) result.accessibilitySupport = parseAccessibilitySupport(row.accessibilitySupport);
  return result;
}
