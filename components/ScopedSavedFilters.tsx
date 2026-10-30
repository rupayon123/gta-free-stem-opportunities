"use client";

import { useId } from "react";
import type { PresetScope, ScopedPreset } from "@/lib/scopedPresets/repository";
import { GtaArtwork } from "./GtaArtwork";

const scopes: { id: PresetScope; label: string }[] = [
  { id: "browse", label: "Browse" },
  { id: "teen-activities", label: "Teen activities" },
  { id: "youth-guide", label: "Student guide" }
];
type Props = {
  presets: readonly ScopedPreset<unknown>[];
  selectedId: string;
  name: string;
  dirty: boolean;
  loading: boolean;
  busy: boolean;
  writeBlocked: boolean;
  legacyChanged: boolean;
  notice?: string;
  error?: string;
  onSelect: (id: string) => void;
  onNameChange: (name: string) => void;
  onSave: () => void;
  onDelete: () => void;
  onKeepCurrent: () => void;
  onRetry?: () => void;
};

/** Single picker mounted behind the default-off integration flag; runtime and
 * visual acceptance are required before public activation. */
export function ScopedSavedFilters(props: Props) {
  const id = useId();
  const selected = props.presets.find(p => p.id === props.selectedId);
  const helpId = `${id}-help`;
  const blocked = props.loading || props.busy;
  return <fieldset className="scoped-saved-filters" lang="en" disabled={blocked} aria-busy={blocked}>
    <legend><GtaArtwork role="saved" />Saved filters</legend>
    <label htmlFor={`${id}-picker`}>Choose a saved filter</label>
    <select id={`${id}-picker`} value={props.selectedId} onChange={e => props.onSelect(e.target.value)} aria-describedby={helpId}>
      <option value="">New filter</option>
      {scopes.map(scope => {
        const entries = props.presets.filter(p => p.scope === scope.id);
        return entries.length ? <optgroup label={scope.label} key={scope.id}>{entries.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</optgroup> : null;
      })}
    </select>
    {props.loading && <p role="status">Loading saved filters…</p>}
    {props.dirty && <p className="scoped-preset-status">Unsaved changes</p>}
    <label htmlFor={`${id}-name`}>Filter name</label>
    <input id={`${id}-name`} value={props.name} maxLength={80} onChange={e => props.onNameChange(e.target.value)} autoComplete="off" />
    <div className="scoped-preset-actions">
      <button className="soft-button" type="button" onClick={props.onSave} disabled={props.writeBlocked || !props.name.trim()}>{props.busy ? "Working…" : selected ? "Update filter" : "Save filter"}</button>
      {selected && <button className="soft-button" type="button" onClick={props.onDelete} disabled={props.writeBlocked}>Delete filter</button>}
    </div>
    <p id={helpId}>Stored only in this browser. Choosing a filter applies it immediately. Edits are saved only with Save or Update. Choose New filter to start another.</p>
    {props.legacyChanged && <div className="scoped-preset-recovery"><p role="alert">An older tab changed your previous saved filters. Your current filters and draft are kept. Close that tab before continuing.</p><p>Keep the current filters and preserve a backup of the older tab’s changes?</p><button className="soft-button" type="button" onClick={props.onKeepCurrent}>Keep current saved filters</button></div>}
    {props.notice && <p role="status">{props.notice}</p>}
    {props.error && <div><p role="alert">{props.error}</p>{props.onRetry && <button className="soft-button" type="button" onClick={props.onRetry}>Reload saved filters</button>}</div>}
  </fieldset>;
}
