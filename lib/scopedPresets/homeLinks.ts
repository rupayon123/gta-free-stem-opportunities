import { readSavedFilters, savedFilterHref } from "../savedFilters";
import { createScopedPresetRepository, type AtomicPresetStorage } from "./repository";
import { parseScopedCriteria, scopedPresetHref } from "./criteria";

/** Home is read-only: absent v2 falls back to existing legacy links, never CAS. */
export async function readHomePresetLinks(storage: AtomicPresetStorage, legacy: Pick<Storage, "getItem">) {
  const result = await createScopedPresetRepository(storage, legacy, parseScopedCriteria).peek();
  if (!result.ok) throw new Error(result.error === "invalid-archive" ? "Saved filters have an unsupported or damaged format. Their original data is kept." : "Saved filters could not be read. You can still browse.");
  return result.value ? result.value.presets.map(p => ({ id: p.id, name: p.name, href: scopedPresetHref(p), highSchool: p.scope !== "browse" })) :
    readSavedFilters(legacy).map(p => ({ id: p.id, name: p.name, href: savedFilterHref(p), highSchool: p.highSchool }));
}
