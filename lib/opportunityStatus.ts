import type { Opportunity, OpportunityStatus } from "./types";

function dateValue(value?: string) {
  if (!value) return null;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
}

const dayInMilliseconds = 24 * 60 * 60 * 1000;

function isDistinctRegistrationDeadline(opportunity: Opportunity) {
  const deadline = dateValue(opportunity.deadline);
  if (!deadline) return false;

  const start = dateValue(opportunity.startDate);
  // Library calendars frequently mirror an event's start time into `deadline`.
  // That value is not a separate enrollment cutoff and must not hide an
  // ongoing or multi-day drop-in as soon as it begins.
  return !start || deadline !== start;
}

export function isOpportunityVerificationStale(
  lastChecked: string,
  now = new Date(),
  maximumAgeDays = 14
) {
  const checked = /^\d{4}-\d{2}-\d{2}$/.test(lastChecked)
    ? Date.parse(`${lastChecked}T23:59:59.999Z`)
    : Date.parse(lastChecked);
  if (Number.isNaN(checked)) return true;
  return checked + maximumAgeDays * dayInMilliseconds < now.getTime();
}

export function isOpportunityDateExpired(opportunity: Opportunity, now = new Date()) {
  const end = dateValue(opportunity.endDate);
  const deadline = isDistinctRegistrationDeadline(opportunity) ? dateValue(opportunity.deadline) : null;
  const start = dateValue(opportunity.startDate);
  const visibleUntil = deadline && end ? Math.min(deadline, end) : deadline ?? end ?? start;
  if (!visibleUntil) return false;

  const endOfDay = new Date(visibleUntil);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay.getTime() < now.getTime();
}

export function computedOpportunityStatus(opportunity: Opportunity, now = new Date()): OpportunityStatus {
  if (opportunity.status === "hidden") return "hidden";
  if (opportunity.status === "expired") return "expired";
  if (isOpportunityDateExpired(opportunity, now)) return "expired";
  return opportunity.status;
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
