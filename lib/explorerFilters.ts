import { categories, cityOptions, regions } from "./data";
import type { Filters } from "./types";

export const DEFAULT_FILTERS: Filters = {
  query: "", region: "All", city: "", category: "All", age: "", language: "all",
  distanceKm: 25, postalCode: "", nearMe: false, blackFocused: false, girlsFocused: false,
  indigenousFocused: false, volunteerHours: false, coop: false, mentorship: false, leadership: false
};

// Retain legacy filter data compatibility without claiming a provider delivery language.
export const URL_TOGGLES = { black: "blackFocused", girls: "girlsFocused", indigenous: "indigenousFocused", volunteer: "volunteerHours", coop: "coop", mentorship: "mentorship", leadership: "leadership" } as const;
export function filtersFromUrl(base: Partial<Filters>, search: string): Filters {
  const filters = { ...DEFAULT_FILTERS, ...base, language: "all" as const };
  const params = new URLSearchParams(search);
  if (params.has("q")) filters.query = (params.get("q") ?? "").slice(0, 250);
  const category = params.get("category");
  if (category && categories.includes(category as typeof categories[number])) filters.category = category as Filters["category"];
  const region = params.get("region");
  if (region && regions.includes(region as typeof regions[number])) filters.region = region as Filters["region"];
  const city = params.get("city");
  if (city && cityOptions.includes(city)) filters.city = city;
  const age = params.get("age");
  if (age && /^\d{1,2}(?:\.\d{1,2})?$/.test(age)) filters.age = age;
  if (params.has("postal")) filters.postalCode = (params.get("postal") ?? "").slice(0, 7).toUpperCase();
  const distance = Number(params.get("distance"));
  if ([5, 10, 25, 50, 100].includes(distance)) filters.distanceKm = distance;
  Object.entries(URL_TOGGLES).forEach(([param, key]) => { if (params.has(param)) filters[key] = params.get(param) === "1"; });
  return filters;
}
