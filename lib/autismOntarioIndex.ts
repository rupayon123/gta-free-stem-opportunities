import { discoveryDateOnly } from "./discoveryDates";

/** At most four index requests per six-hour run, covering later pages over time. */
export function autismOntarioIndexPages(html: string, now: Date): number[] {
  const last = html.match(/class=["'][^"']*pager__item--last[^"']*["'][\s\S]{0,250}?href=["']\?page=(\d+)["']/i);
  const total = Math.min(Number(last?.[1] ?? 0), 100);
  if (!Number.isFinite(now.getTime()) || total < 1) return [];
  const start = (Math.floor(now.getTime() / (6 * 3600000)) * 3) % total;
  return Array.from({ length: Math.min(3, total) }, (_, i) => ((start + i) % total) + 1);
}

/** Bounded official index leads, not reviewed listings or inferred free events. */
export function extractAutismOntarioIndex(html: string) {
  const rows = html.split(/<div\s+class=["']views-row["']\s*>/i).slice(1);
  const cities: Record<string, "Toronto" | "York" | "Peel" | "Durham" | "Halton"> = {
    Toronto: "Toronto", Newmarket: "York", Markham: "York", Vaughan: "York", "Richmond Hill": "York",
    Brampton: "Peel", Mississauga: "Peel", Pickering: "Durham", Ajax: "Durham", Oshawa: "Durham", Whitby: "Durham", Oakville: "Halton", Burlington: "Halton", Milton: "Halton"
  };
  const output: { title: string; description: string; sourceUrl: string; startDate: string; city: string; region: typeof cities[string] }[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    const match = row.match(/<h2[^>]*>\s*<a\s+href=["'](\/civicrm\/event\/info\?id=\d+)["'][^>]*>([\s\S]*?)<\/a>/i);
    const date = row.match(/<time\b[^>]*>([\s\S]*?)<\/time>/i)?.[1]?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    if (!match || !date) continue;
    const title = match[2].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const city = Object.keys(cities).find(name => new RegExp(`\\b${name}\\b`, "i").test(title));
    const startDate = discoveryDateOnly(date);
    if (!city || !startDate || seen.has(match[1])) continue;
    seen.add(match[1]);
    output.push({ title, description: "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.", sourceUrl: `https://www.autismontario.com${match[1]}`, startDate, city, region: cities[city] });
  }
  return output;
}
