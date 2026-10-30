import { parseAccessibilitySupport, type AccessibilitySupport } from "../accessibilitySupport";
import type { Opportunity } from "../types";

const tplRequestSource = "https://tpl.ca/accessibility/accessibility-supports/programs-and-events/";
/** Public source inspected 2026-10-30T06:51:08Z without using the form.
 * Exact three request-policy records approved by root after source review.
 * Importing never attaches evidence. Quoted labels total fewer than 25 words.
 */
export const tplProgramSupportObservation: AccessibilitySupport = parseAccessibilitySupport({
  schemaVersion: 1,
  evidence: [
    { category: "sign-language", evidenceText: "ASL/LSQ/Deaf interpretation" },
    { category: "hearing-captioning", evidenceText: "Automated closed captioning; Live closed captioning" },
    { category: "support-person", evidenceText: "Attendant services" }
  ].map(claim => ({ ...claim, status: "on-request", scope: "provider-policy", sourceUrl: tplRequestSource,
    requestUrl: tplRequestSource, checkedAt: "2026-10-30T06:51:08.000Z", reviewStatus: "approved",
    conditions: [
      "The provider requires a support request and advance notice; at least two weeks is preferred.",
      "Confirm arrangements for the specific programme or event. A request is not confirmation of an arranged service.",
      "The cancellation guidance asks for at least three business days of notice.",
      ...(claim.category === "sign-language" ? ["For LSQ interpretation, the cancellation guidance asks for ten business days of notice."] : []),
      ...(claim.category === "support-person" ? ["This policy offers a route to request attendant services. It does not confirm that you may bring your own support person."] : [])
    ] }))
});

/** Producer overlay called only by the explicit library-generation source hook.
 * Root must supply explicitly approved policy records. No title, boilerplate,
 * coordinates or venue inference. Raw descriptions/accessibility notes remain.
 */
export function attachReviewedTplProgramPolicy(item: Opportunity, approvedPolicy: AccessibilitySupport): Opportunity {
  const policy = parseAccessibilitySupport(approvedPolicy);
  if (!policy.evidence.length || policy.evidence.some(e => e.reviewStatus !== "approved" || e.scope !== "provider-policy" || e.status !== "on-request" ||
      e.sourceUrl !== tplRequestSource || e.requestUrl !== tplRequestSource || !["sign-language", "hearing-captioning", "support-person"].includes(e.category))) throw new Error("TPL policy requires explicit scoped review.");
  const applicable = item.organization === "Toronto Public Library" && item.provider === "Toronto Public Library" &&
    ["One-time event", "Multi-week program", "Drop-in", "Camp"].includes(item.type) &&
    /^https:\/\/tpl\.bibliocommons\.com\/(?:v2\/)?events\/[0-9a-f]{24}\/?$/i.test(item.sourceUrl);
  if (!applicable) return item;
  const previous = item.accessibilitySupport === undefined ? [] : parseAccessibilitySupport(item.accessibilitySupport).evidence;
  // A reviewed revision supersedes only this exact policy/category/scope. Keep
  // activity/venue negatives and unrelated policies; ordinary imports never
  // renew checkedAt or accumulate stale copies that poison newer reviews.
  const retained = previous.filter(old => !policy.evidence.some(current => current.sourceUrl === old.sourceUrl && current.category === old.category && current.scope === old.scope));
  const unique = new Map([...retained, ...policy.evidence].map(e => [JSON.stringify(e), e]));
  return { ...item, accessibilitySupport: parseAccessibilitySupport({ schemaVersion: 1, evidence: [...unique.values()] }) };
}
