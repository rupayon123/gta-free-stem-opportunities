import type { Opportunity, OpportunityStatus } from "./types";

function dateValue(value?: string) {
  if (!value) return null;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
}

const dayInMilliseconds = 24 * 60 * 60 * 1000;
export const opportunityVerificationMaximumAgeDays = 14;

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
  maximumAgeDays = opportunityVerificationMaximumAgeDays
) {
  const checked = /^\d{4}-\d{2}-\d{2}$/.test(lastChecked)
    ? Date.parse(`${lastChecked}T23:59:59.999Z`)
    : Date.parse(lastChecked);
  if (Number.isNaN(checked)) return true;
  return checked + maximumAgeDays * dayInMilliseconds < now.getTime();
}

export function isOpportunityDateExpired(opportunity: Opportunity, now = new Date()) {
  const deadline = isDistinctRegistrationDeadline(opportunity) ? opportunity.deadline : undefined;
  const cutoffs = [deadline, opportunity.endDate].filter((value) => dateValue(value) !== null);
  if (!cutoffs.length) cutoffs.push(opportunity.startDate);

  return cutoffs.some((value) => {
    if (!value) return false;
    // A date without a time stays valid through that GTA calendar day. Exact
    // source timestamps retain their precision so ended sessions disappear.
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit"
      }).formatToParts(now);
      const datePart = (type: string) => parts.find((part) => part.type === type)?.value;
      const gtaDate = `${datePart("year")}-${datePart("month")}-${datePart("day")}`;
      return value < gtaDate;
    }
    const timestamp = dateValue(value);
    return timestamp !== null && timestamp < now.getTime();
  });
}

export function computedOpportunityStatus(opportunity: Opportunity, now = new Date()): OpportunityStatus {
  if (opportunity.status === "hidden") return "hidden";
  if (opportunity.status === "expired") return "expired";
  if (isOpportunityDateExpired(opportunity, now)) return "expired";
  if (opportunity.status === "active" && isOpportunityVerificationStale(opportunity.lastChecked, now)) {
    return "needs_review";
  }
  return opportunity.status;
}

export function isPublicOpportunity(opportunity: Opportunity, now = new Date()) {
  return computedOpportunityStatus(opportunity, now) === "active";
}

export function publicOpportunities(opportunities: Opportunity[], now = new Date()) {
  return opportunities.filter((opportunity) => isPublicOpportunity(opportunity, now));
}

export function adminReviewOpportunities(opportunities: Opportunity[], now = new Date()) {
  return opportunities.filter((opportunity) => computedOpportunityStatus(opportunity, now) !== "active");
}
