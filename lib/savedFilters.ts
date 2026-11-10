import { categories, cityOptions } from "./filterOptions";
import type { Filters } from "./types";

export const SAVED_FILTERS_KEY = "gta-stem-named-filters-v1";
export const SAVED_FILTERS_CHANGED = "gta-saved-filters-changed";
export type SavedFilter = {
  id: string;
  name: string;
  filters: Filters;
  highSchool: boolean;
  createdAt: string;
  updatedAt: string;
};
type Reader = Pick<Storage, "getItem">;
type Writer = Reader & Pick<Storage, "setItem">;
const MAX_FILTERS = 100;
const MAX_BYTES = 512_000;
const regions = ["All", "Toronto", "Peel", "York", "Durham", "Halton"];
const toggles = ["blackFocused", "girlsFocused", "indigenousFocused", "volunteerHours", "coop", "mentorship", "leadership"] as const;

function object(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function invalid(): never {
  throw new Error("Saved filters could not be read. Existing data has been kept; you can still browse.");
}
function nameFrom(value: unknown): string {
  if (typeof value !== "string" || !value.trim() || [...value.trim()].length > 80) {
    throw new Error("Give your filter a name of 1–80 characters.");
  }
  return value.trim();
}
/** The legacy criteria contract, reused for non-destructive scoped migration. */
export function normalizeLegacyFilterCriteria(value: unknown): Filters {
  if (!object(value)) return invalid();
  if (typeof value.query !== "string" || value.query.length > 250
    || typeof value.region !== "string" || !regions.includes(value.region)
    || typeof value.city !== "string" || (value.city !== "" && !cityOptions.includes(value.city))
    || typeof value.category !== "string" || (value.category !== "All" && !categories.includes(value.category as Filters["category"] & typeof categories[number]))
    || typeof value.age !== "string" || (value.age !== "" && !/^\d{1,2}(?:\.\d{1,2})?$/.test(value.age))
    || typeof value.distanceKm !== "number" || ![5, 10, 25, 50, 100].includes(value.distanceKm)
    || typeof value.postalCode !== "string" || (value.postalCode !== "" && !/^[A-Z]\d[A-Z](?: ?\d[A-Z]\d)?$/i.test(value.postalCode))
    || value.nearMe !== false || toggles.some(key => typeof value[key] !== "boolean")) return invalid();
  // Explicit fields prevent stored extensions from retaining location coordinates or personal data.
  // Legacy event-language choices must not silently hide programs.
  return {
    query: value.query, region: value.region as Filters["region"], city: value.city,
    category: value.category as Filters["category"], age: value.age,
    language: "all", distanceKm: value.distanceKm, postalCode: value.postalCode.toUpperCase(),
    nearMe: false, blackFocused: value.blackFocused as boolean, girlsFocused: value.girlsFocused as boolean,
    indigenousFocused: value.indigenousFocused as boolean, volunteerHours: value.volunteerHours as boolean,
    coop: value.coop as boolean, mentorship: value.mentorship as boolean, leadership: value.leadership as boolean
  };
}
function recordFrom(value: unknown): SavedFilter {
  if (!object(value) || typeof value.id !== "string" || !/^[a-zA-Z0-9-]{1,80}$/.test(value.id)
    || typeof value.highSchool !== "boolean" || typeof value.createdAt !== "string" || !Number.isFinite(Date.parse(value.createdAt))
    || typeof value.updatedAt !== "string" || !Number.isFinite(Date.parse(value.updatedAt))) return invalid();
  return { id: value.id, name: nameFrom(value.name), filters: normalizeLegacyFilterCriteria(value.filters),
    highSchool: value.highSchool, createdAt: value.createdAt, updatedAt: value.updatedAt };
}

export function readSavedFilters(storage: Reader): SavedFilter[] {
  let raw: string | null;
  try { raw = storage.getItem(SAVED_FILTERS_KEY); }
  catch { throw new Error("Browser storage is unavailable. You can browse, but saved filters cannot be loaded."); }
  if (raw === null) return [];
  if (raw.length > MAX_BYTES) return invalid();
  let value: unknown;
  try { value = JSON.parse(raw); } catch { return invalid(); }
  if (!object(value) || value.version !== 1 || !Array.isArray(value.filters) || value.filters.length > MAX_FILTERS) return invalid();
  const records = value.filters.map(recordFrom);
  if (new Set(records.map(item => item.id)).size !== records.length) return invalid();
  return records;
}

function persist(storage: Writer, records: SavedFilter[]): SavedFilter[] {
  try { storage.setItem(SAVED_FILTERS_KEY, JSON.stringify({ version: 1, filters: records })); }
  catch { throw new Error("Your filter changes could not be saved. Existing saved filters have not been changed. Check browser storage and try again."); }
  return records;
}

export function saveNamedFilter(storage: Writer, input: { id?: string; name: string; filters: Filters; highSchool: boolean }, now = new Date()): SavedFilter[] {
  if (input.filters.nearMe) throw new Error("Choose a city or postal area before saving. Your device location is not stored in a saved filter.");
  const name = nameFrom(input.name);
  const filters = normalizeLegacyFilterCriteria(input.filters);
  // Re-read immediately before mutation: stale UI must not resurrect another tab's removed filters.
  const current = readSavedFilters(storage);
  const previous = input.id ? current.find(item => item.id === input.id) : undefined;
  if (input.id && !previous) throw new Error("This filter was removed in another tab. Save it as a new filter instead.");
  if (!previous && current.length >= MAX_FILTERS) throw new Error("You have 100 saved filters. Remove one before adding another.");
  const nameKey = name.normalize("NFKC").toLowerCase();
  if (current.some(item => item.id !== input.id && item.name.normalize("NFKC").toLowerCase() === nameKey)) {
    throw new Error("A saved filter already has this name. Choose a different name.");
  }
  const stamp = now.toISOString();
  const id = previous?.id ?? crypto.randomUUID();
  if (!previous && current.some(item => item.id === id)) throw new Error("A new filter could not be created. Please try again.");
  const record: SavedFilter = { id, name, filters, highSchool: input.highSchool, createdAt: previous?.createdAt ?? stamp, updatedAt: stamp };
  return persist(storage, previous ? current.map(item => item.id === id ? record : item) : [...current, record]);
}

export function deleteNamedFilter(storage: Writer, id: string): SavedFilter[] {
  const current = readSavedFilters(storage);
  return persist(storage, current.filter(item => item.id !== id));
}

export function savedFilterHref(item: SavedFilter): string {
  return `${item.highSchool ? "/high-school/" : "/opportunities/"}?${new URLSearchParams({ savedFilter: item.id })}`;
}
