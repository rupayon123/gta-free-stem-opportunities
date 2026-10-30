"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { deleteHoursEntry, exportHoursCsv, formatRecordedMinutes, loadHoursNotebook, recordedMinutes, saveHoursEntry, type HoursArchive, type HoursEntry, type NotebookError } from "@/lib/highSchool/notebook";
import { browserNotebookStorage } from "@/lib/highSchool/browserNotebookStorage";
import { HoursEntryForm, todayLocal } from "./HoursEntryForm";

const errors: Record<NotebookError, string> = {
  "read-failed": "The notebook could not load in this browser. Saved data has not been replaced; any open draft is still here.",
  "invalid-archive": "The notebook data could not be read safely. It has been kept unchanged. Do not clear site data if you need to recover it.",
  "invalid-entry": "This entry could not be saved. Check the date and actual minutes; recorded time cannot exceed 24 hours on one day.",
  "write-failed": "The changes could not be saved. Your draft is still here. Check browser storage and try again.",
  "conflict": "The notebook changed in another tab. Keep or copy your draft, cancel editing, then reload and reopen the latest entry. Reloading alone does not update this draft’s revision.",
  "not-found": "This entry is no longer in the notebook. Reload saved entries to review what is available."
};
function durationText(value: number): string {
  const { hours, minutes } = formatRecordedMinutes(value);
  return `${hours} ${hours === 1 ? "hour" : "hours"}, ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
}
type Editor = { entry?: HoursEntry; id: string; createdAt: string };
export function HoursNotebook({ onDirtyChange, onBusyChange }: { onDirtyChange: (dirty: boolean) => void; onBusyChange: (busy: boolean) => void }) {
  const [archive, setArchive] = useState<HoursArchive | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editor, setEditor] = useState<Editor | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<HoursEntry | null>(null);
  const [changedElsewhere, setChangedElsewhere] = useState(false);
  const [needsReview, setNeedsReview] = useState(false);
  const addButton = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const busyRef = useRef(false);
  const senderId = useRef(`${Date.now()}-${Math.random()}`);
  useEffect(() => { onBusyChange(busy); }, [busy, onBusyChange]);
  const refresh = useCallback(async () => {
    setLoading(true);
    const result = await loadHoursNotebook(browserNotebookStorage, todayLocal());
    if (result.ok) { setArchive(result.value); setError(""); setChangedElsewhere(false); }
    else setError(errors[result.error]);
    setLoading(false);
  }, []);
  useEffect(() => { let active = true; loadHoursNotebook(browserNotebookStorage, todayLocal()).then(result => { if (!active) return; if (result.ok) setArchive(result.value); else setError(errors[result.error]); setLoading(false); }); return () => { active = false; }; }, []);
  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;
    try {
      const channel = new BroadcastChannel("gta-hours-notebook-changed");
      channel.onmessage = event => { if (event.data?.source && event.data.source !== senderId.current) setChangedElsewhere(true); };
      return () => channel.close();
    } catch { /* Advisory updates are optional; atomic storage still guards edits. */ }
  }, []);
  const notify = () => { try { if (typeof BroadcastChannel !== "undefined") { const channel = new BroadcastChannel("gta-hours-notebook-changed"); channel.postMessage({ source: senderId.current }); channel.close(); } } catch { /* A notification failure does not undo a confirmed save. */ } };
  const closeEditor = () => { setEditor(null); setNeedsReview(false); onDirtyChange(false); requestAnimationFrame(() => addButton.current?.focus()); };
  async function save(entry: HoursEntry, expectedRevision?: number) {
    if (busyRef.current) return;
    busyRef.current = true; setBusy(true); setNotice("");
    try {
      const result = await saveHoursEntry(browserNotebookStorage, entry, todayLocal(), expectedRevision);
      if (result.ok) { setArchive(result.value); setError(""); setNotice("Recorded activity saved in this browser. It is not school approval."); closeEditor(); notify(); }
      else { setError(errors[result.error]); if (result.error === "conflict" || result.error === "not-found") setNeedsReview(true); }
    } finally { busyRef.current = false; setBusy(false); }
  }
  async function remove(entry: HoursEntry) {
    if (busyRef.current) return;
    busyRef.current = true; setBusy(true); setNotice("");
    try {
      const result = await deleteHoursEntry(browserNotebookStorage, entry.id, todayLocal(), entry.revision);
      if (result.ok) { setArchive(result.value); setDeleteTarget(null); setError(""); setNotice("This recorded activity was deleted. Your other entries remain."); notify(); requestAnimationFrame(() => heading.current?.focus()); }
      else { setError(result.error === "conflict" ? "This entry changed in another tab. Reload saved entries, review it, then choose Delete again." : errors[result.error]); setDeleteTarget(null); }
    } finally { busyRef.current = false; setBusy(false); }
  }
  async function exportCsv() {
    if (!archive || busyRef.current) return;
    busyRef.current = true; setBusy(true); setNotice("");
    try {
      const current = await loadHoursNotebook(browserNotebookStorage, todayLocal());
      if (!current.ok) { setError(errors[current.error]); return; }
      // Export the durable archive read for this action, never an older rendered snapshot.
      const csv = exportHoursCsv(current.value, todayLocal());
      setArchive(current.value); setChangedElsewhere(false);
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a"); link.href = url; link.download = `my-recorded-volunteering-${todayLocal()}.csv`;
      document.body.append(link); link.click(); link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice("CSV export requested from saved entries. This personal record is not a signed school form. Check your browser downloads.");
    } catch { setError("The CSV could not be prepared. Your notebook has not changed."); }
    finally { busyRef.current = false; setBusy(false); }
  }
  let total: string | null = null;
  try { if (archive) total = durationText(recordedMinutes(archive, todayLocal())); } catch { /* Retain existing data if the device date makes totals invalid. */ }
  return <section className="hs-notebook" aria-labelledby="hours-notebook-title" lang="en">
    <h2 id="hours-notebook-title" ref={heading} tabIndex={-1}>Your hours notebook</h2>
    <p>A personal record of volunteering you have completed. Saved only in this browser, with no account or cross-device sync. Clearing site data can remove it; keep your own exports.</p>
    <p className="hs-notice">Recorded time is not school-approved time. Follow your school’s approval and submission process. This notebook does not award credit or collect signatures.</p>
    {loading && <p role="status">Loading saved entries…</p>}
    {error && <p className="hs-notice" role="alert">{error}</p>}
    {notice && <p role="status">{notice}</p>}
    {changedElsewhere && <p className="hs-notice" role="status">Another tab changed this notebook. Reload saved entries before editing or deleting.</p>}
    <div className="hs-actions"><button type="button" className="soft-button" disabled={loading || busy} onClick={refresh}>Reload saved entries</button><button type="button" className="soft-button" disabled={!archive || !archive.entries.length || busy || loading || changedElsewhere || !!error} onClick={exportCsv}>Export saved CSV</button></div>
    {archive && <><p className="hs-recorded-total"><strong>Recorded time:</strong> {total ?? "Could not confirm total. Check your device date and reload saved entries."}</p>
      {!editor && <button ref={addButton} className="primary-button" type="button" disabled={busy || loading} onClick={() => { try { setEditor({ id: crypto.randomUUID(), createdAt: new Date().toISOString() }); setNotice(""); setDeleteTarget(null); } catch { setError("This browser cannot start a notebook entry. Your saved data has not changed."); } }}>Record completed volunteering</button>}
      {editor && <HoursEntryForm key={`${editor.id}-${editor.entry?.revision ?? "new"}`} entry={editor.entry} draftId={editor.id} createdAt={editor.createdAt} busy={busy} onSave={save} onCancel={closeEditor} onDirtyChange={onDirtyChange} needsReview={needsReview} />}
      {!archive.entries.length && <p className="hs-empty">No recorded activities yet. Add actual completed time when you are ready.</p>}
      <ul className="hs-hours-list">{archive.entries.map(entry => { const time = durationText(entry.actualMinutes); return <li key={entry.id}><div><h3>{entry.role}</h3><p>{entry.provider}</p><p><time dateTime={entry.activityLocalDate}>{entry.activityLocalDate}</time> · {time} · Self-recorded</p>{entry.notes && <p className="hs-entry-notes">{entry.notes}</p>}</div><div className="hs-actions"><button className="soft-button" type="button" disabled={busy || loading || !!editor} onClick={() => { setEditor({ entry, id: entry.id, createdAt: entry.createdAt }); setNotice(""); setDeleteTarget(null); }}>Edit<span className="sr-only"> {entry.role}</span></button><button className="soft-button" type="button" disabled={busy || loading || !!editor} onClick={() => setDeleteTarget(entry)}>Delete<span className="sr-only"> {entry.role}</span></button></div>{deleteTarget?.id === entry.id && <div className="hs-notice" role="group" aria-label={`Delete ${entry.role}`}><p>Delete only this recorded activity? It cannot be restored from the notebook.</p><div className="hs-actions"><button className="soft-button" type="button" disabled={busy} onClick={() => deleteTarget && remove(deleteTarget)}>{busy ? "Deleting…" : "Delete this entry"}</button><button className="soft-button" type="button" disabled={busy} onClick={() => setDeleteTarget(null)}>Keep entry</button></div></div>}</li>; })}</ul>
    </>}
  </section>;
}
