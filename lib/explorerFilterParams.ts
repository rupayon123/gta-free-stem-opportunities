/** Lightweight URL inventory shared with the legacy explorer and hub routing. */
export const URL_TOGGLES = { black: "blackFocused", girls: "girlsFocused", indigenous: "indigenousFocused", volunteer: "volunteerHours", coop: "coop", mentorship: "mentorship", leadership: "leadership" } as const;
export const EXPLORER_FILTER_PARAMS = ["q", "category", "region", "city", "age", "programLanguage", "postal", "distance", ...Object.keys(URL_TOGGLES)] as const;
export function hasLegacyTeenFilterParams(search: string): boolean {
  const params = new URLSearchParams(search);
  return params.get("view") === "activities" || ["saved", "savedFilter", ...EXPLORER_FILTER_PARAMS].some(key => params.has(key));
}

/** Keep an explicit activity mode when the explorer clears legacy-only criteria. */
export function preserveTeenActivityView(search: string): string {
  if (!hasLegacyTeenFilterParams(search)) return search;
  const params = new URLSearchParams(search);
  params.set("view", "activities");
  return `?${params.toString()}`;
}
