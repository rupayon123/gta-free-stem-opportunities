import { emptyAccessibilitySelection, parseAccessibilitySelection, type AccessibilitySelection } from "../accessibilitySelection";
import { normalizeLegacyFilterCriteria } from "../savedFilters";
import type { Filters, Region } from "../types";
import type { Pathway } from "../highSchool/model";
import type { PresetScope, ScopedPreset } from "./repository";

export type ActivityPresetCriteria = { kind: "activity"; filters: Filters; support: AccessibilitySelection };
export type YouthPresetCriteria = { kind: "youth"; pathway: Pathway; age: string; grade: string; region: "" | Region; delivery: "" | "in-person" | "virtual" | "hybrid"; support: AccessibilitySelection };
export type ScopedCriteria = ActivityPresetCriteria | YouthPresetCriteria;
const object = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
const exactKeys = (value: Record<string, unknown>, keys: string[]) => Object.keys(value).length === keys.length && keys.every(k => Object.hasOwn(value, k));

/** Strict production decoder; old v1 criteria are accepted only in legacy scopes.
 * Unknown criterion versions never silently become a broader no-filter search. */
export function parseScopedCriteria(scope: PresetScope, value: unknown): ScopedCriteria {
  if (!["browse", "teen-activities", "youth-guide"].includes(scope) || !object(value)) throw new Error("Invalid saved criteria.");
  if (scope !== "youth-guide") {
    if (!("kind" in value)) {
      if ("support" in value || "supportSelection" in value) throw new Error("Unsupported legacy support criteria.");
      return { kind: "activity", filters: normalizeLegacyFilterCriteria(value), support: emptyAccessibilitySelection() };
    }
    if (!exactKeys(value, ["kind", "filters", "support"]) || value.kind !== "activity") throw new Error("Invalid activity criteria.");
    return { kind: "activity", filters: normalizeLegacyFilterCriteria(value.filters), support: parseAccessibilitySelection(value.support) };
  }
  if (!exactKeys(value, ["kind", "pathway", "age", "grade", "region", "delivery", "support"]) || value.kind !== "youth" ||
      !["volunteer", "learning", "leadership-careers", "funding"].includes(value.pathway as string) ||
      typeof value.age !== "string" || (value.age !== "" && !/^\d{1,2}$/.test(value.age)) ||
      !["", "7", "8", "9", "10", "11", "12"].includes(value.grade as string) ||
      !["", "Toronto", "York", "Peel", "Durham", "Halton"].includes(value.region as string) ||
      !["", "in-person", "virtual", "hybrid"].includes(value.delivery as string)) throw new Error("Invalid youth criteria.");
  return { kind: "youth", pathway: value.pathway as Pathway, age: value.age, grade: value.grade as string,
    region: value.region as YouthPresetCriteria["region"], delivery: value.delivery as YouthPresetCriteria["delivery"], support: parseAccessibilitySelection(value.support) };
}
export function scopedPresetHref(preset: Pick<ScopedPreset<unknown>, "id" | "scope">): string {
  const params = new URLSearchParams({ preset: preset.id, presetScope: preset.scope });
  if (preset.scope === "teen-activities") params.set("view", "activities");
  return `${preset.scope === "browse" ? "/opportunities/" : "/high-school/"}?${params.toString()}`;
}
