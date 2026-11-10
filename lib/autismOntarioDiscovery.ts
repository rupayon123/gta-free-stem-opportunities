import { discoveryDateOnly } from "./discoveryDates";

/** A bounded source-specific lead; remains a review candidate, never an automatic publication. */
export function extractAutismOntarioEvent(html: string, sourceUrl: string) {
  if (sourceUrl !== "https://www.autismontario.com/civicrm/event/info?id=13084") return [];
  const body = html.match(/<div\b[^>]*class=["'][^"']*\bevent-info\b[^"']*["'][^>]*>([\s\S]*?)<div\b[^>]*class=["'][^"']*\bevent_map-section\b/i)?.[1];
  const title = html.match(/<h1\b[^>]*class=["'][^"']*\bpage-title\b[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  if (!body || !title) return [];
  const text = body.replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/\s+/g, " ");
  if (!/registration for this event is free/i.test(text) || !/autistic children, autistic adults, their siblings and caregivers/i.test(text)) return [];
  const date = text.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(20\d{2})\b/i);
  const startDate = date && discoveryDateOnly(`${date[1]} ${date[2]}, ${date[3]}`);
  if (!startDate) return [];
  const description = `Free registration is listed for autistic children and adults, their siblings and caregivers. ${/photo package options will be available to purchase/i.test(text) ? "Optional photo packages cost extra. " : ""}Check the provider's page for eligibility, appointment times and availability.`;
  return [{ title: title.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(), description, sourceUrl, startDate }];
}
