import { validTimestamp } from "../../lib/highSchool/model";
import type { YouthProviderApproval } from "../../lib/youthHunter/feed";

/** Internal operator review of public authored facts, not provider certification,
 * a promise of free participation, a placement, or a new background service. */
export const approvedYouthProviders = [{
  providerId: "aurora-library", adapterVersion: 1, contentMode: "authored-facts",
  approvedAt: "2026-10-30T06:34:39.075Z",
  basis: "operator-reviewed-public-facts",
  reviewNote: "Public index, two teen applications and FAQ; one application, grades, orientation, commitment and selection retained. Costs unknown."
}] as const;
export function youthProviderApproval(now: string): YouthProviderApproval {
  const p = approvedYouthProviders[0];
  if (!validTimestamp(now) || Date.parse(now) < Date.parse(p.approvedAt)) throw new Error("Provider source review is later than the collection clock");
  return { providerId: p.providerId, adapterVersion: p.adapterVersion, contentMode: p.contentMode, approvedAt: p.approvedAt };
}
