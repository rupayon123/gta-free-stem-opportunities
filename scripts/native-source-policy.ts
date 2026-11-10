export type NativeSourceRecord = { id: string; organization: string; sourceUrl: string; registrationUrl: string; description?: string;
  title?: string; startDate?: string; endDate?: string; city?: string; region?: string; address?: string; ageMin?: number; ageMax?: number; cost?: string;
};
export const scienceCentreEventURL = "https://www.ontariosciencecentre.ca/whats-on/pop-ups-plus-events/pride-in-stem-2026";
export const scienceCentreEventID = "ontario-science-centre-pride-in-stem-2026";
export const scienceCentreFactualSummary = "Free, all-ages STEM activities and performances celebrating 2SLGBTQI+ people. November 21, 2026, 9 a.m.–3 p.m. at Evergreen Brick Works, 550 Bayview Avenue, Toronto. Registration is encouraged but not required. The venue is wheelchair accessible; a free shuttle runs from Broadview Station. On-site parking is paid.";
export const autismOntarioEventURL = "https://www.autismontario.com/civicrm/event/info?id=13084";
export const autismOntarioEventID = "autism-ontario-newmarket-quiet-santa-2026-11-22";
export const autismOntarioFactualSummary = "Free five-minute Quiet Time with Santa appointments for autistic children and adults, siblings and caregivers. November 22, 2026, 8:30–10:30 a.m. at Upper Canada Mall, 17600 Yonge Street, Newmarket. Registration and one time slot are required; a waitlist may be available if full. Optional photo packages cost extra. Parent or caregiver supervision is required. Registrants' names and email addresses are shared with the appointment vendor.";

/** Narrow provider/link allowlist; no assertion of a provider agreement. */
export function isAllowedNativeSource(row: NativeSourceRecord): boolean {
  if (row.registrationUrl !== row.sourceUrl) return false;
  if (row.organization === "Ontario Science Centre") {
    return row.id === scienceCentreEventID && row.sourceUrl === scienceCentreEventURL && row.description === scienceCentreFactualSummary
      && row.title === "Pride in STEM 2026" && row.startDate === "2026-11-21T09:00:00-05:00" && row.endDate === "2026-11-21T15:00:00-05:00"
      && row.city === "Toronto" && row.region === "Toronto" && row.address === "Evergreen Brick Works, 550 Bayview Avenue, Toronto, ON M4W 3X8"
      && row.ageMin === 0 && row.ageMax === undefined && row.cost === "Free to join";
  }
  if (row.organization === "Autism Ontario") {
    return row.id === autismOntarioEventID && row.sourceUrl === autismOntarioEventURL && row.description === autismOntarioFactualSummary
      && row.title === "Quiet Time with Santa — Newmarket" && row.startDate === "2026-11-22T08:30:00-05:00" && row.endDate === "2026-11-22T10:30:00-05:00"
      && row.city === "Newmarket" && row.region === "York" && row.address === "Upper Canada Mall, 17600 Yonge Street, Newmarket, ON L3Y 4Z1"
      && row.ageMin === 0 && row.ageMax === undefined && row.cost === "Free to join";
  }
  const hosts = new Map([["Toronto Public Library", "tpl.bibliocommons.com"], ["Markham Public Library", "markham.bibliocommons.com"]]);
  try {
    const url = new URL(row.sourceUrl);
    return hosts.get(row.organization) === url.hostname.toLowerCase()
      && url.protocol === "https:" && url.port === "" && !url.username && !url.password
      && url.pathname.startsWith("/events/");
  } catch { return false; }
}

