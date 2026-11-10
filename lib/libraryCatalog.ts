import type { Opportunity } from "./types";
import { readAccessibilitySupport } from "./accessibilitySupport";
import { isOpportunityVerificationStale } from "./opportunityStatus";

const maximumCatalogSize = 15000;
const stringLists = ["categories", "communityFocus", "grades", "language", "languages", "accessibility", "tags"] as const;
const requiredText = ["id", "title", "organization", "provider", "description", "summary", "type", "category", "city", "region", "address", "startDate", "cost", "sourceUrl", "lastChecked", "lastSeen", "status", "equipment", "food", "capacity", "commitment", "registrationUrl", "providerContact", "freeStatusProof", "lastVerified"] as const;
function record(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
function httpsUrl(value: unknown) {
  if (typeof value !== "string") return false;
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password; } catch { return false; }
}
function finite(value: unknown): value is number { return typeof value === "number" && Number.isFinite(value); }

/** The optional website catalog must not replace the small, known-good core on failure. */
export function decodeLibraryCatalog(value: unknown, now = new Date()): Opportunity[] {
  if (!record(value) || value.schemaVersion !== 1 || !Array.isArray(value.opportunities) || value.count !== value.opportunities.length || value.opportunities.length > maximumCatalogSize) throw new Error("Invalid library catalog.");
  if (typeof value.generatedAt !== "string" || isOpportunityVerificationStale(value.generatedAt, now) || Date.parse(value.generatedAt) > now.getTime() + 86400000) throw new Error("The library catalog needs a fresh source check.");
  const health = record(value.sourceHealth) && record(value.sourceHealth.library) ? value.sourceHealth.library : null;
  if (!health || health.status !== "healthy" || !finite(health.acceptedListings) || !finite(health.minimumAcceptedListings) || health.acceptedListings < health.minimumAcceptedListings || !finite(health.pageSuccessRatio) || !finite(health.minimumPageSuccessRatio) || health.pageSuccessRatio < health.minimumPageSuccessRatio) throw new Error("Library source checks did not pass.");
  const ids = new Set<string>();
  for (const item of value.opportunities) {
    if (!record(item) || requiredText.some(key => typeof item[key] !== "string") || !item.id || !item.title || ids.has(item.id as string)) throw new Error("Invalid or duplicate library event.");
    if (stringLists.some(key => !Array.isArray(item[key]) || !(item[key] as unknown[]).every(entry => typeof entry === "string"))) throw new Error("Invalid library event fields.");
    if (!record(item.ages) || !finite(item.ages.min) || item.ages.min < 0 || item.ages.min > 130 || (item.ages.max !== undefined && (!finite(item.ages.max) || item.ages.max < item.ages.min || item.ages.max > 130)) || item.ageMin !== item.ages.min || item.ageMax !== item.ages.max) throw new Error("Invalid library age range.");
    if (!finite(item.latitude) || !finite(item.longitude) || Math.abs(item.latitude) > 90 || Math.abs(item.longitude) > 180 || !httpsUrl(item.sourceUrl) || !httpsUrl(item.registrationUrl)) throw new Error("Invalid library location or source.");
    if (item.cost !== "Free to join" || item.paidPosition !== false || item.trustedSource !== true || item.status !== "active" || !item.freeStatusProof || !Number.isFinite(Date.parse(item.startDate as string)) || !Number.isFinite(Date.parse(item.lastChecked as string)) || !Number.isFinite(Date.parse(item.lastVerified as string))) throw new Error("Library event verification is incomplete.");
    if (["virtual", "volunteerHoursEligible", "coopEligible"].some(key => typeof item[key] !== "boolean") || (item.ageLabel !== undefined && typeof item.ageLabel !== "string")) throw new Error("Invalid library event options.");
    if (!Array.isArray(item.sources) || !item.sources.length || !item.sources.every(source => record(source) && typeof source.label === "string" && httpsUrl(source.url))) throw new Error("Missing library event sources.");
    if ((item.endDate !== undefined && (typeof item.endDate !== "string" || !Number.isFinite(Date.parse(item.endDate)))) || (item.deadline !== undefined && (typeof item.deadline !== "string" || !Number.isFinite(Date.parse(item.deadline))))) throw new Error("Invalid library event schedule.");
    ids.add(item.id as string);
  }
  return value.opportunities.map(item => {
    const { accessibilitySupport, accessibilitySupportUnavailable: _untrustedMarker, ...base } = item as Record<string, unknown>;
    return { ...base, ...readAccessibilitySupport(accessibilitySupport) };
  }) as Opportunity[];
}

let cached: { events: Opportunity[]; fetchedAt: number } | undefined;
export async function loadLibraryCatalog(signal: AbortSignal): Promise<Opportunity[]> {
  if (cached && Date.now() - cached.fetchedAt < 300000) return cached.events;
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal.addEventListener("abort", abort, { once: true });
  if (signal.aborted) controller.abort();
  const timeout = setTimeout(abort, 20000);
  try {
    const response = await fetch("/library-catalog.json", { signal: controller.signal, credentials: "omit", redirect: "error" });
    if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) throw new Error("The library catalog could not be loaded.");
    const text = await response.text();
    if (text.length > 32000000) throw new Error("The library catalog is too large.");
    const events = decodeLibraryCatalog(JSON.parse(text));
    cached = { events, fetchedAt: Date.now() };
    return events;
  } finally {
    clearTimeout(timeout);
    signal.removeEventListener("abort", abort);
  }
}
