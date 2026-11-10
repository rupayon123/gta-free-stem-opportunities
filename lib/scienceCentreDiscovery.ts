/** Extract individual event cards from the Ontario Science Centre's public index.
 * These are review candidates, not proof that a particular activity is free.
 */
export type ScienceCentreCard = { title: string; description: string; sourceUrl: string };

function plainText(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/&amp;/gi, "&").replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"').replace(/&nbsp;|&#160;/gi, " ").replace(/\s+/g, " ").trim();
}

export function extractScienceCentreCards(html: string): ScienceCentreCard[] {
  const cards: ScienceCentreCard[] = [];
  const seen = new Set<string>();
  const pattern = /<a\b([^>]*\bclass=["'][^"']*\bosc-callout\b[^"']*["'][^>]*)>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(pattern)) {
    const href = match[1].match(/\bhref=["']([^"']+)["']/i)?.[1];
    const title = plainText(match[2].match(/<span\b[^>]*\bclass=["'][^"']*\btitle\b[^"']*["'][^>]*>([\s\S]*?)<\/span>/i)?.[1] ?? "");
    if (!href || !title) continue;
    let url: URL;
    try { url = new URL(href, "https://www.ontariosciencecentre.ca"); } catch { continue; }
    if (url.protocol !== "https:" || url.hostname !== "www.ontariosciencecentre.ca" ||
        !/^\/whats-on\/pop-ups-plus-events\/[a-z0-9][a-z0-9-]*\/?$/i.test(url.pathname) || url.search || url.hash) continue;
    const sourceUrl = url.toString().replace(/\/$/, "");
    if (seen.has(sourceUrl)) continue;
    seen.add(sourceUrl);
    cards.push({ title, description: plainText(match[2]), sourceUrl });
  }
  return cards;
}
