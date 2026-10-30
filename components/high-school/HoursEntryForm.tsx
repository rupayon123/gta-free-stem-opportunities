"use client";

import { useEffect, useRef, useState } from "react";
import { validLocalDate } from "@/lib/highSchool/model";
import type { HoursEntry } from "@/lib/highSchool/notebook";

export function todayLocal(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

type Values = { provider: string; role: string; date: string; hours: string; minutes: string; notes: string };
export function HoursEntryForm({ entry, draftId, createdAt, busy, onSave, onCancel, onDirtyChange, needsReview }: {
  entry?: HoursEntry; draftId: string; createdAt: string; busy: boolean; needsReview: boolean;
  onSave: (entry: HoursEntry, expectedRevision?: number) => Promise<void>;
  onCancel: () => void; onDirtyChange: (dirty: boolean) => void;
}) {
  const initial = useRef<Values>({ provider: entry?.provider ?? "", role: entry?.role ?? "", date: entry?.activityLocalDate ?? todayLocal(), hours: entry ? String(Math.floor(entry.actualMinutes / 60)) : "", minutes: entry ? String(entry.actualMinutes % 60) : "", notes: entry?.notes ?? "" });
  const [values, setValues] = useState(initial.current);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [discard, setDiscard] = useState(false);
  const [showCopy, setShowCopy] = useState(false);
  const copyBox = useRef<HTMLTextAreaElement>(null);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => { form.current?.querySelector<HTMLInputElement>("input")?.focus(); }, []);
  useEffect(() => { if (showCopy) { copyBox.current?.focus(); copyBox.current?.select(); } }, [showCopy]);
  const dirty = JSON.stringify(values) !== JSON.stringify(initial.current);
  useEffect(() => { onDirtyChange(dirty); }, [dirty, onDirtyChange]);
  useEffect(() => {
    if (!dirty) return;
    const preventLoss = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", preventLoss);
    return () => window.removeEventListener("beforeunload", preventLoss);
  }, [dirty]);
  const update = (key: keyof Values, value: string) => { setValues(current => ({ ...current, [key]: value })); setErrors(current => ({ ...current, [key]: undefined })); setDiscard(false); };
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy || needsReview) return;
    const next: typeof errors = {};
    if (!values.provider.trim()) next.provider = "Enter the organisation you helped.";
    if (!values.role.trim()) next.role = "Describe the activity you completed.";
    if (!validLocalDate(values.date) || values.date > todayLocal()) next.date = "Choose a valid completed activity date, today or earlier.";
    const whole = (s: string) => s === "" || /^\d+$/.test(s);
    const hours = Number(values.hours || "0"), minutes = Number(values.minutes || "0");
    if (!whole(values.hours) || hours < 0 || hours > 24) next.hours = "Enter whole hours from 0 to 24.";
    if (!whole(values.minutes) || minutes < 0 || minutes > 59) next.minutes = "Enter extra minutes from 0 to 59.";
    const total = hours * 60 + minutes;
    if (!next.hours && !next.minutes && (total < 1 || total > 1440)) next.minutes = "Record between 1 minute and 24 hours of completed work.";
    setErrors(next);
    if (Object.keys(next).length) { requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()); return; }
    await onSave({ id: draftId, revision: entry ? entry.revision + 1 : 1, ...(entry?.curatedRoleId ? { curatedRoleId: entry.curatedRoleId } : {}), provider: values.provider.trim(), role: values.role.trim(), activityLocalDate: values.date, actualMinutes: total, notes: values.notes, createdAt, updatedAt: new Date().toISOString() }, entry?.revision);
  }
  function field(key: keyof Values, label: string, type = "text", extra: React.InputHTMLAttributes<HTMLInputElement> = {}) {
    return <div className="hs-form-field"><label htmlFor={`hours-${key}`}>{label}</label><input id={`hours-${key}`} type={type} value={values[key]} onChange={e => update(key, e.target.value)} disabled={busy} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `hours-${key}-error` : undefined} {...extra} />{errors[key] && <p id={`hours-${key}-error`} className="hs-field-error">{errors[key]}</p>}</div>;
  }
  return <form className="hs-hours-form" ref={form} onSubmit={submit} noValidate aria-labelledby="hours-form-title" aria-busy={busy}>
    <h3 id="hours-form-title">{entry ? "Edit your recorded activity" : "Record completed volunteering"}</h3>
    <p>Enter time you actually completed. Do not include planned hours. Leave personal contact details and signatures out of your notes.</p>
    {field("provider", "Organisation", "text", { maxLength: 160, autoComplete: "off" })}
    {field("role", "What you did", "text", { maxLength: 160, autoComplete: "off" })}
    {field("date", "Activity date", "date", { max: todayLocal() })}
    <fieldset className="hs-duration"><legend>Actual time completed</legend>{field("hours", "Whole hours", "number", { min: 0, max: 24, step: 1, inputMode: "numeric" })}{field("minutes", "Extra minutes", "number", { min: 0, max: 59, step: 1, inputMode: "numeric" })}</fieldset>
    <div className="hs-form-field"><label htmlFor="hours-notes">Notes (optional)</label><textarea id="hours-notes" rows={4} maxLength={2000} value={values.notes} onChange={e => update("notes", e.target.value)} disabled={busy} /></div>
    {Object.keys(errors).length > 0 && <p role="alert">Check the highlighted fields. Your draft is still here.</p>}
    <div className="hs-actions"><button className="primary-button" type="submit" disabled={busy || needsReview}>{busy ? "Saving…" : entry ? "Save changes" : "Save recorded activity"}</button><button className="soft-button" type="button" disabled={busy} onClick={() => dirty ? setDiscard(true) : onCancel()}>Cancel</button></div>
    {needsReview && <div className="hs-notice"><p>This draft is based on an older saved version. Keep a copy, cancel editing, reload saved entries and reopen the latest entry. It will not overwrite the newer version.</p><button className="soft-button" type="button" onClick={() => setShowCopy(true)}>Show draft to copy</button>{showCopy && <div className="hs-form-field"><label htmlFor="hours-copy-draft">Your unsaved draft — select and copy</label><textarea id="hours-copy-draft" ref={copyBox} readOnly rows={8} value={`Organisation: ${values.provider}\nActivity: ${values.role}\nDate: ${values.date}\nActual time: ${values.hours || "0"} hours, ${values.minutes || "0"} minutes\nNotes: ${values.notes}`} /></div>}</div>}
    {discard && <div className="hs-notice" role="group" aria-label="Discard unsaved draft"><p>Discard this unsaved draft? Saved entries will stay in your notebook.</p><div className="hs-actions"><button type="button" className="soft-button" onClick={onCancel}>Discard draft</button><button type="button" className="soft-button" onClick={() => setDiscard(false)}>Keep editing</button></div></div>}
  </form>;
}
