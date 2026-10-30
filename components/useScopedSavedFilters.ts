"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { browserPresetStorage } from "@/lib/scopedPresets/browserStorage";
import { createScopedPresetRepository, type PresetError, type PresetScope, type PresetSnapshot, type ScopedPreset } from "@/lib/scopedPresets/repository";
import { parseScopedCriteria, scopedPresetHref, type ScopedCriteria } from "@/lib/scopedPresets/criteria";
import { stripPrivateSupportParams } from "@/lib/scopedPresets/localOnlyUrl";
import { SAVED_FILTERS_KEY } from "@/lib/savedFilters";

const changedEvent = "gta-scoped-presets-changed";
const now = () => new Date().toISOString();
const errorMessages: Record<PresetError, string> = {
  "read-failed": "Saved filters could not be read. Your choices and stored data are kept.",
  "invalid-archive": "Saved filters have an unsupported or damaged format. Their original data is kept; you can still browse.",
  "invalid-preset": "Check the filter name and choices before saving. Your draft is kept.",
  "write-failed": "The save could not be confirmed. Keep your draft and try again when browser storage is available.",
  "conflict": "This saved filter changed in another tab. Your draft is kept. Choose the latest filter or start a new one.",
  "legacy-changed": "An older tab changed the previous saved-filter archive. Review the recovery message before saving.",
  "not-found": "This saved filter was removed in another tab. Your current choices are kept; choose New filter to save them separately.",
  "limit-reached": "Saved-filter storage has reached its limit. Existing filters and your draft are kept."
};

/** Mounted behind the default-off integration flag. Reads/writes begin only when enabled after
 * hydration. Advisory events never replace the repository's revision/CAS checks.
 */
export function useScopedSavedFilters({ enabled, scope, criteria, onApply, onBeforeNavigate }: {
  enabled: boolean; scope: PresetScope; criteria: ScopedCriteria; onApply: (criteria: ScopedCriteria) => boolean | void | Promise<boolean | void>;
  onBeforeNavigate?: (href: string) => boolean | Promise<boolean>;
}) {
  const repository = useMemo(() => createScopedPresetRepository(browserPresetStorage, { getItem: key => window.localStorage.getItem(key) }, parseScopedCriteria), []);
  const [snapshot, setSnapshot] = useState<PresetSnapshot<ScopedCriteria> | null>(null);
  const [selected, setSelected] = useState<ScopedPreset<ScopedCriteria> | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(enabled);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const mounted = useRef(false);
  const generation = useRef(0);
  const mutating = useRef(false);
  const refreshPending = useRef(false);
  const channel = useRef<BroadcastChannel | null>(null);
  const apply = useRef(onApply); apply.current = onApply;
  const beforeNavigate = useRef(onBeforeNavigate); beforeNavigate.current = onBeforeNavigate;
  const currentCriteria = useRef(criteria); currentCriteria.current = criteria;
  const currentSelection = useRef(selected); currentSelection.current = selected;
  const notify = () => { window.dispatchEvent(new Event(changedEvent)); channel.current?.postMessage({ type: "changed" }); };
  const readLatest = useCallback(async () => {
    const result = await repository.load(now());
    // Strict Mode or another tab can win the first import CAS. This is a single
    // fresh read of that winner, never an automatic retry of an edited preset.
    return !result.ok && result.error === "conflict" ? repository.load(now()) : result;
  }, [repository]);

  const reload = useCallback(async (restoreUrl = false) => {
    if (!enabled) return;
    if (mutating.current) { refreshPending.current = true; return; }
    const run = ++generation.current;
    const restoreId = restoreUrl ? new URLSearchParams(window.location.search).get("preset") ?? new URLSearchParams(window.location.search).get("savedFilter") : null;
    const result = await readLatest();
    if (!mounted.current || run !== generation.current) return;
    setLoading(false);
    if (!result.ok) { setError(errorMessages[result.error]); return; }
    setSnapshot(result.value); setError("");
    if (restoreUrl) {
      const id = restoreId;
      const preset = result.value.archive.presets.find(p => p.id === id);
      if (preset?.scope === scope) {
        if (await apply.current(preset.criteria) === false || !mounted.current || run !== generation.current) return;
        setSelected(preset); currentSelection.current = preset; setName(preset.name);
        updateUrl(preset);
      } else if (id) setNotice("This saved filter is unavailable here or belongs to a different view. Your current choices are kept.");
    }
  }, [enabled, readLatest, scope]);

  useEffect(() => {
    mounted.current = true;
    if (!enabled) { setLoading(false); return () => { mounted.current = false; }; }
    void reload(true);
    const refresh = () => { void reload(); };
    const storageChanged = (event: StorageEvent) => { if (event.key === SAVED_FILTERS_KEY || event.key === null) refresh(); };
    if (typeof BroadcastChannel !== "undefined") {
      channel.current = new BroadcastChannel("gta-scoped-presets-v2"); channel.current.onmessage = refresh;
    }
    const restore = () => { void reload(true); };
    window.addEventListener("popstate", restore);
    window.addEventListener("focus", refresh); window.addEventListener(changedEvent, refresh); window.addEventListener("storage", storageChanged);
    return () => {
      mounted.current = false; ++generation.current;
      window.removeEventListener("popstate", restore);
      window.removeEventListener("focus", refresh); window.removeEventListener(changedEvent, refresh); window.removeEventListener("storage", storageChanged);
      channel.current?.close(); channel.current = null;
    };
  }, [enabled, reload]);

  const latest = snapshot?.archive.presets.find(p => p.id === selected?.id);
  const stale = !!selected && (!latest || latest.revision !== selected.revision);
  const dirty = !!selected && (JSON.stringify(selected.criteria) !== JSON.stringify(criteria) || selected.name !== name.trim());
  const updateUrl = (preset: ScopedPreset<ScopedCriteria> | null) => {
    try {
      const url = stripPrivateSupportParams(new URL(window.location.href)); url.searchParams.delete("savedFilter");
      if (preset) { url.searchParams.set("preset", preset.id); url.searchParams.set("presetScope", preset.scope); }
      else { url.searchParams.delete("preset"); url.searchParams.delete("presetScope"); }
      window.history.replaceState(window.history.state, "", url);
      return true;
    } catch { return false; } // A URL failure never turns a committed save into a storage failure.
  };
  const onSelect = async (id: string) => {
    if (!enabled || mutating.current) return;
    if (!id) { setSelected(null); currentSelection.current = null; setName(""); setNotice(""); setError(""); updateUrl(null); return; }
    const run = ++generation.current; mutating.current = true; setBusy(true);
    try {
      const result = await readLatest();
      if (!mounted.current || run !== generation.current) return;
      if (!result.ok) { setError(errorMessages[result.error]); return; }
      setSnapshot(result.value); setError("");
      const preset = result.value.archive.presets.find(p => p.id === id);
      if (!preset) { setNotice(errorMessages["not-found"]); return; }
      if (preset.scope !== scope) {
        const href = scopedPresetHref(preset);
        if (beforeNavigate.current && !await beforeNavigate.current(href)) return;
        if (mounted.current && run === generation.current) window.location.assign(href); return;
      }
      if (await apply.current(preset.criteria) === false || !mounted.current || run !== generation.current) return;
      setSelected(preset); currentSelection.current = preset; setName(preset.name);
      setNotice(updateUrl(preset) ? "" : "Filter selected. The page address could not be updated.");
    } catch { if (mounted.current) setError("The filter could not be applied. Your saved data is kept; you can still browse."); } finally {
      mutating.current = false;
      if (mounted.current) { setBusy(false); if (refreshPending.current) { refreshPending.current = false; void reload(); } }
    }
  };
  const mutate = async (operation: "save" | "delete" | "recover") => {
    if (!enabled || mutating.current || !snapshot) return;
    if (operation !== "recover" && (stale || snapshot.legacyChanged)) { setError(errorMessages[stale ? "conflict" : "legacy-changed"]); return; }
    const previous = currentSelection.current;
    if (operation === "delete" && !previous) return;
    const run = ++generation.current;
    mutating.current = true; setBusy(true); setError(""); setNotice("");
    try {
      const id = previous?.id ?? (operation === "save" ? crypto.randomUUID() : "");
      const result = operation === "save" ? await repository.save({ id, name, scope, criteria: currentCriteria.current }, now(), previous?.revision) :
        operation === "delete" ? await repository.remove(previous!.id, previous!.revision, now()) :
        await repository.keepCurrentAfterLegacyChange(snapshot.observedLegacyRaw, snapshot.archive.revision, now());
      if (!mounted.current || run !== generation.current) return;
      if (!result.ok) { setError(errorMessages[result.error]); if (["conflict", "not-found", "legacy-changed"].includes(result.error)) refreshPending.current = true; return; }
      if (operation === "save") {
        const preset = result.value.presets.find(p => p.id === id)!;
        setSelected(preset); currentSelection.current = preset; setName(preset.name);
        setNotice(updateUrl(preset) ? "Filter saved." : "Filter saved. The page address could not be updated.");
      } else if (operation === "delete") {
        setSelected(null); currentSelection.current = null; setName("");
        setNotice(updateUrl(null) ? "Saved filter removed. Your current choices remain." : "Saved filter removed. Your current choices remain, but the page address could not be updated.");
      } else setNotice("Current saved filters kept. The older tab’s changes were backed up.");
      setSnapshot({ archive: result.value, legacyChanged: false, observedLegacyRaw: result.value.legacyBackups[result.value.legacyBackups.length - 1].raw });
      notify();
    } catch { if (mounted.current) setError(errorMessages["write-failed"]); }
    finally {
      mutating.current = false;
      if (mounted.current) { setBusy(false); if (refreshPending.current) { refreshPending.current = false; void reload(); } }
    }
  };
  return {
    presets: snapshot?.archive.presets ?? [], selectedId: selected?.id ?? "", name, dirty, loading, busy,
    writeBlocked: !enabled || !snapshot || stale || snapshot.legacyChanged,
    legacyChanged: snapshot?.legacyChanged ?? false,
    notice: stale ? errorMessages[latest ? "conflict" : "not-found"] : notice, error,
    onSelect: (id: string) => { void onSelect(id); }, onNameChange: (value: string) => { setName(value); setNotice(""); },
    onSave: () => { void mutate("save"); }, onDelete: () => { void mutate("delete"); }, onKeepCurrent: () => { void mutate("recover"); },
    onRetry: () => { void reload(); }
  };
}
