import type { Opportunity, OpportunityStatus } from "./types";

function dateValue(value?: string) {
  if (!value) return null;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
}

export function isOpportunityDateExpired(opportunity: Opportunity, now = new Date()) {
  const visibleUntil =
    dateValue(opportunity.endDate) ?? dateValue(opportunity.deadline) ?? dateValue(opportunity.startDate);
  if (!visibleUntil) return false;

  const endOfDay = new Date(visibleUntil);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay.getTime() < now.getTime();
}

export function computedOpportunityStatus(opportunity: Opportunity, now = new Date()): OpportunityStatus {
  if (opportunity.status !== "active") return opportunity.status;
  return isOpportunityDateExpired(opportunity, now) ? "expired" : "active";
}

export function isPublicOpportunity(opportunity: Opportunity, now = new Date()) {
  return opportunity.status === "active" && !isOpportunityDateExpired(opportunity, now);
}

export function publicOpportunities(opportunities: Opportunity[], now = new Date()) {
  return opportunities.filter((opportunity) => isPublicOpportunity(opportunity, now));
}

export function adminReviewOpportunities(opportunities: Opportunity[], now = new Date()) {
  return opportunities.filter((opportunity) => computedOpportunityStatus(opportunity, now) !== "active");
}
