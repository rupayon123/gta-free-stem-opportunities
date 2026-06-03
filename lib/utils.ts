import type { Filters, Opportunity } from "./types";
import { gtaFsaCentres } from "./data";
import { publicOpportunities } from "./opportunityStatus";

export type Coordinates = { latitude: number; longitude: number; label?: string };
const DISPLAY_TIME_ZONE = "America/Toronto";

export function haversineKm(a: Coordinates, b: Coordinates) {
  const radius = 6371;
  const dLat = toRadians(b.latitude - a.latitude);
  const dLon = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);
  const sinLat = Math.sin(dLat / 2);
  const sinLon = Math.sin(dLon / 2);
  const h = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLon * sinLon;
  return 2 * radius * Math.asin(Math.sqrt(h));
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function fsaFromPostal(postalCode: string) {
  return postalCode.trim().replace(/\s+/g, "").slice(0, 3).toUpperCase();
}

export function coordinatesFromPostal(postalCode: string): Coordinates | null {
  const fsa = fsaFromPostal(postalCode);
  const match = gtaFsaCentres[fsa];
  if (!match) return null;
  return { ...match };
}

export function formatDateRange(startDate: string, endDate?: string) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: DISPLAY_TIME_ZONE
  });
  const start = formatter.format(new Date(startDate));
  if (!endDate) return start;
  const end = formatter.format(new Date(endDate));
  return `${start} - ${end}`;
}

export function formatDeadline(deadline?: string) {
  if (!deadline) return "No deadline listed";
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    timeZone: DISPLAY_TIME_ZONE
  }).format(new Date(deadline));
}

export function createCalendarFile(opportunity: Opportunity) {
  const start = toIcsDate(opportunity.startDate);
  const end = toIcsDate(opportunity.endDate ?? opportunity.startDate);
  const description = [
    opportunity.summary,
    "",
    `Provider: ${opportunity.provider}`,
    `Free status: ${opportunity.freeStatusProof}`,
    `Register: ${opportunity.registrationUrl}`
  ].join("\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GTA FREE STEM Opportunities//EN",
    "BEGIN:VEVENT",
    `UID:${opportunity.id}@gta-stem-opportunities.local`,
    `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcs(opportunity.title)}`,
    `LOCATION:${escapeIcs(opportunity.address)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `URL:${opportunity.registrationUrl}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
}

function toIcsDate(value: string) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeIcs(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function filterOpportunities(
  opportunities: Opportunity[],
  filters: Filters,
  location: Coordinates | null,
  options: { includeNonPublic?: boolean } = {}
) {
  const query = filters.query.trim().toLowerCase();
  const age = Number(filters.age);
  const candidates = options.includeNonPublic ? opportunities : publicOpportunities(opportunities);
  return candidates
    .filter((opportunity) => {
      const haystack = [
        opportunity.title,
        opportunity.provider,
        opportunity.summary,
        opportunity.city,
        opportunity.region,
        opportunity.type,
        ...opportunity.categories,
        ...opportunity.communityFocus,
        ...opportunity.tags
      ]
        .join(" ")
        .toLowerCase();

      if (query && !haystack.includes(query)) return false;
      if (filters.region !== "All" && opportunity.region !== filters.region) return false;
      if (filters.city && opportunity.city !== filters.city) return false;
      if (filters.category !== "All" && !opportunity.categories.includes(filters.category)) return false;
      if (!Number.isNaN(age) && filters.age) {
        const max = opportunity.ages.max ?? 99;
        if (age < opportunity.ages.min || age > max) return false;
      }
      if (filters.language !== "all" && !opportunity.languages.includes(filters.language)) return false;
      if (filters.blackFocused && !opportunity.communityFocus.includes("Black-focused")) return false;
      if (filters.girlsFocused && !opportunity.communityFocus.includes("Girls/women-focused")) return false;
      if (filters.indigenousFocused && !opportunity.communityFocus.includes("Indigenous-focused")) return false;
      if (filters.volunteerHours && !opportunity.volunteerHoursEligible) return false;
      if (filters.coop && !opportunity.coopEligible) return false;
      if (filters.mentorship && !opportunity.categories.includes("Career & Mentorship")) return false;
      if (filters.leadership && !opportunity.categories.includes("Youth Leadership")) return false;
      if (location) {
        const distance = haversineKm(location, opportunity);
        if (distance > filters.distanceKm) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (location) {
        const distanceA = haversineKm(location, a);
        const distanceB = haversineKm(location, b);
        if (Math.abs(distanceA - distanceB) > 4) return distanceA - distanceB;
      }
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
}
