/** Read a provider's calendar date without inventing a time or UTC offset. */
export function discoveryDateOnly(value: string): string | undefined {
  const text = value.trim();
  const iso = text.match(/^(20\d{2})-(\d{2})-(\d{2})$/);
  const names = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  const named = text.match(/^([a-z]+)\s+(\d{1,2}),?\s+(20\d{2})$/i);
  if (!iso && !named) return undefined;
  const year = Number(iso?.[1] ?? named?.[3]);
  const month = iso ? Number(iso[2]) : names.indexOf(named![1].toLowerCase()) + 1;
  const day = Number(iso?.[3] ?? named?.[2]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return undefined;
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return undefined;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
