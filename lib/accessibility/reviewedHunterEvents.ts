import observations from "../../docs/hunter-accessibility-evidence-review.json";
import { parseAccessibilitySupport } from "../accessibilitySupport";
import type { Opportunity } from "../types";

/** Exact reviewed event bindings; no title, diagnosis or location inference. */
export function attachReviewedHunterEventSupport(item: Opportunity): Opportunity {
  const science = item.id === "ontario-science-centre-pride-in-stem-2026" && item.organization === "Ontario Science Centre"
    && item.sourceUrl === "https://www.ontariosciencecentre.ca/whats-on/pop-ups-plus-events/pride-in-stem-2026"
    && item.registrationUrl === item.sourceUrl && item.address === "Evergreen Brick Works, 550 Bayview Avenue, Toronto, ON M4W 3X8";
  const autism = item.id === "autism-ontario-newmarket-quiet-santa-2026-11-22" && item.organization === "Autism Ontario"
    && item.sourceUrl === "https://www.autismontario.com/civicrm/event/info?id=13084"
    && item.registrationUrl === item.sourceUrl && item.address === "Upper Canada Mall, 17600 Yonge Street, Newmarket, ON L3Y 4Z1";
  if (!science && !autism) return item;
  const observation = observations.observations.find((row) => row.opportunityId === item.id);
  if (!observation) throw new Error("Reviewed event evidence is missing.");
  const support = parseAccessibilitySupport(observation.accessibilitySupport);
  if (support.evidence.length !== 1 || support.evidence[0].reviewStatus !== "approved" || support.evidence[0].sourceUrl !== item.sourceUrl ||
      (science && (support.evidence[0].category !== "mobility-wheelchair" || support.evidence[0].scope !== "venue" || support.evidence[0].venue?.id !== "evergreen-brick-works-550-bayview")) ||
      (autism && (support.evidence[0].category !== "sensory-friendly" || support.evidence[0].scope !== "activity"))) throw new Error("Reviewed event evidence does not match its binding.");
  if (item.accessibilitySupport !== undefined) throw new Error("Review existing event evidence before replacing it.");
  return { ...item, accessibilitySupport: support };
}
