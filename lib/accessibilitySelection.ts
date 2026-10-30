import { accessibilitySupportCategories, accessibilitySupportDecision, readAccessibilitySupport,
  type AccessibilitySupportCategory, type AccessibilitySupportScope } from "./accessibilitySupport";

export interface AccessibilitySelection {
  schemaVersion: 1;
  categories: AccessibilitySupportCategory[];
  includeOnRequest: boolean;
}
export const emptyAccessibilitySelection = (): AccessibilitySelection => ({ schemaVersion: 1, categories: [], includeOnRequest: false });
/** Selection data describes optional local criteria, never a diagnosis/profile. */
export function parseAccessibilitySelection(value: unknown): AccessibilitySelection {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid support selection.");
  const x = value as Record<string, unknown>;
  if (Object.keys(x).length !== 3 || x.schemaVersion !== 1 || typeof x.includeOnRequest !== "boolean" || !Array.isArray(x.categories) || x.categories.length > 14 ||
      x.categories.some(c => !accessibilitySupportCategories.includes(c))) throw new Error("Invalid support selection.");
  return { schemaVersion: 1, categories: accessibilitySupportCategories.filter(c => (x.categories as unknown[]).includes(c)), includeOnRequest: x.includeOnRequest };
}

export const supportCategoryLabels: Record<AccessibilitySupportCategory, string> = {
  "mobility-wheelchair": "Wheelchair and mobility access",
  "sensory-friendly": "Sensory-friendly activities",
  "adapted-inclusive-programme": "Adapted and inclusive programmes",
  "sign-language": "Sign-language interpretation",
  "hearing-captioning": "Hearing support and captions",
  "visual-formats": "Accessible visual formats",
  "support-person": "Support-person arrangements"
};
export const supportCategoryHelp: Partial<Record<AccessibilitySupportCategory, string>> = {
  "support-person": "Check whether you may bring your own support person or must request an attendant. One does not imply the other.",
  "mobility-wheelchair": "Matches require a reviewed statement for the exact venue. Check its specific facilities and limitations."
};
function defaultScope(category: AccessibilitySupportCategory): AccessibilitySupportScope {
  return category === "mobility-wheelchair" ? "venue" : "activity";
}
export interface SupportMatchContext {
  now: string;
  /** Supplied only by reviewed listing-to-venue bindings, never rounded coordinates. */
  reviewedVenueId?: string;
}
export function matchAccessibilitySelection(
  subject: { accessibilitySupport?: unknown; accessibilitySupportUnavailable?: true },
  value: AccessibilitySelection,
  context: SupportMatchContext
) {
  const selection = parseAccessibilitySelection(value);
  if (!selection.categories.length) return { matches: true, decisions: [] };
  const metadata = readAccessibilitySupport(subject.accessibilitySupportUnavailable ? undefined : subject.accessibilitySupport);
  const decisions = selection.categories.map(category => {
    const scope = defaultScope(category);
    const primary = accessibilitySupportDecision(metadata.accessibilitySupport, category, scope, context.now, 30, context.reviewedVenueId);
    const policy = accessibilitySupportDecision(metadata.accessibilitySupport, category, "provider-policy", context.now);
    // Applicable negative/conflicting proof is never bypassed by a broader policy.
    const negative = primary.status === "not-available" || policy.status === "not-available";
    const blocked = negative || primary.reason === "conflicting" || policy.reason === "conflicting";
    if (!blocked && primary.status === "provided") return { category, scope, status: primary.status, qualifies: true, reason: primary.reason };
    if (!blocked && selection.includeOnRequest && primary.status === "on-request") return { category, scope, status: primary.status, qualifies: true, reason: primary.reason };
    if (!blocked && selection.includeOnRequest && policy.status === "on-request") return { category, scope: "provider-policy" as const, status: policy.status, qualifies: true, reason: policy.reason };
    return { category, scope, status: negative ? "not-available" as const : blocked ? "unknown" as const : primary.status, qualifies: false, reason: blocked ? "negative-or-conflicting" as const : primary.reason };
  });
  return { matches: decisions.every(d => d.qualifies), decisions };
}
