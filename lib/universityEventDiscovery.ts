/** Structured calendar excerpts are review candidates, not published listings. */
export type UniversityEventCard = { title: string; description: string; sourceUrl: string; startDate: string; endDate?: string };

export function extractUniversityEventCards(html: string): UniversityEventCard[] {
  const cards: UniversityEventCard[] = [];
  const seen = new Set<string>();
  const scripts = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(scripts)) {
    let document: unknown;
    try { document = JSON.parse(match[1]); } catch { continue; }
    const values = Array.isArray(document) ? document : [document];
    for (const value of values) {
      const root = value && typeof value === "object" ? value as Record<string, unknown> : {};
      const entries = Array.isArray(root["@graph"]) ? root["@graph"] as unknown[] : [root];
      for (const entry of entries) {
        if (!entry || typeof entry !== "object") continue;
        const event = entry as Record<string, unknown>;
        const eventType = event["@type"];
        if (!(eventType === "Event" || Array.isArray(eventType) && eventType.includes("Event"))) continue;
        if (event.eventStatus !== "https://schema.org/EventScheduled" || event.eventAttendanceMode !== "https://schema.org/OfflineEventAttendanceMode") continue;
        if (typeof event.name !== "string" || typeof event.description !== "string" || typeof event.url !== "string" || typeof event.startDate !== "string") continue;
        const offers = event.offers && typeof event.offers === "object" && !Array.isArray(event.offers) ? event.offers as Record<string, unknown> : {};
        if (!(offers.price === "0" || offers.price === 0) || offers.priceCurrency !== "CAD" || /soldout/i.test(String(offers.availability ?? ""))) continue;
        let url: URL;
        try { url = new URL(event.url); } catch { continue; }
        if (url.protocol !== "https:" || url.hostname !== "outreach.engineering.utoronto.ca" || !url.pathname.startsWith("/event/") || url.username || url.password || url.port || url.search || url.hash) continue;
        if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(event.startDate) || !Number.isFinite(Date.parse(event.startDate))) continue;
        const sourceUrl = url.toString().replace(/\/$/, "");
        if (seen.has(sourceUrl)) continue;
        seen.add(sourceUrl);
        cards.push({ title: event.name, description: `${event.description} Admission: Free.`, sourceUrl,
          startDate: event.startDate, endDate: typeof event.endDate === "string" ? event.endDate : undefined });
      }
    }
  }
  return cards;
}
