"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getCuratedYouthCatalogue } from "@/lib/highSchool/curatedCatalogue";
import type { Pathway } from "@/lib/highSchool/model";
import type { LanguageCode } from "@/lib/types";
import { combineYouthCatalogue } from "@/lib/highSchool/combinedCatalogue";
import { useYouthRoleFeed } from "./useYouthRoleFeed";
import { GtaArtwork } from "../GtaArtwork";
import { HighSchoolDiscovery } from "./HighSchoolDiscovery";
import { HoursNotebook } from "./HoursNotebook";
import { ScopedSavedFilters } from "../ScopedSavedFilters";
import { useScopedSavedFilters } from "../useScopedSavedFilters";
import { emptyAccessibilitySelection } from "@/lib/accessibilitySelection";
import { type YouthPresetCriteria } from "@/lib/scopedPresets/criteria";
import { stripPrivateSupportParams } from "@/lib/scopedPresets/localOnlyUrl";
import { guardYouthPresetTransition } from "@/lib/highSchool/presetTransition";
import "../ScopedSavedFilters.css";
import "../AccessibilitySupport.css";
import "./HighSchool.css";

const pathways = [
  { id: "volunteer", title: "Volunteer", text: "Find places to help and understand school hours.", role: "volunteer" },
  { id: "learning", title: "Learn & create", text: "Explore projects, clubs and learning programmes.", role: "library" },
  { id: "leadership-careers", title: "Leadership & careers", text: "Mentorship, leadership and career exploration.", role: "ideas" },
  { id: "funding", title: "Scholarships & support", text: "Awards, bursaries and planning after school.", role: "school" }
] as const;
type View = Pathway | "hours" | "guidance";
const catalogue = getCuratedYouthCatalogue();
export function HighSchoolHub({ initialPathway = "volunteer", context, language = "en", roleFeedEnabled = false, supportPresetsEnabled = false }: { initialPathway?: "volunteer" | "leadership-careers"; context?: "coop-shsm"; language?: LanguageCode; roleFeedEnabled?: boolean; supportPresetsEnabled?: boolean }) {
  const [view, setView] = useState<View>(initialPathway);
  const [now, setNow] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const [draftDirty, setDraftDirty] = useState(false);
  const [notebookBusy, setNotebookBusy] = useState(false);
  const [youthCriteria, setYouthCriteria] = useState<YouthPresetCriteria>({ kind: "youth", pathway: initialPathway, age: "", grade: "", region: "", delivery: "", support: emptyAccessibilitySelection() });
  const [criteriaError, setCriteriaError] = useState("");
  type Pending = { kind: "view"; view: View } | { kind: "preset"; criteria: YouthPresetCriteria; resolve: (ok: boolean) => void } | { kind: "route"; href: string; resolve: (ok: boolean) => void };
  const [pendingAction, setPendingAction] = useState<Pending | null>(null);
  const pendingRef = useRef<Pending | null>(null);
  const pendingOpener = useRef<HTMLElement | null>(null);
  const stage = (pending: Pending | null) => { if (pending && !pendingRef.current) pendingOpener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; pendingRef.current = pending; setPendingAction(pending); };
  useEffect(() => () => { const pending = pendingRef.current; if (pending && pending.kind !== "view") pending.resolve(false); }, []);
  const sectionHeading = useRef<HTMLHeadingElement>(null);
  const focusNext = useRef(false);
  // Root enables this only after the reviewed initial public feed is present.
  const { feed: roleFeed, state: roleFeedState, refresh: refreshRoles } = useYouthRoleFeed(roleFeedEnabled);
  const combined = useMemo(() => now ? combineYouthCatalogue(catalogue.listings, roleFeed, now) : { listings: catalogue.listings, feed: undefined, invalidRoleFeed: false, displayedFeedState: undefined }, [roleFeed, now]);
  const displayedRoleFeedState = combined.invalidRoleFeed ? "error" : roleFeedState === "ready" && combined.displayedFeedState === "stale" ? "stale" : roleFeedState;
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("pathway");
    if ([...pathways.map(p => p.id), "hours", "guidance"].includes(requested as View)) {
      setView(requested as View);
      if (pathways.some(p => p.id === requested)) setYouthCriteria(current => ({ ...current, pathway: requested as Pathway }));
    }
    if (supportPresetsEnabled && (params.has("youthCriteria") || params.has("accessSupport"))) {
      setCriteriaError("Support choices from a page address are not applied. Clear these filters, choose them here, or load a saved filter from this browser.");
      try { window.history.replaceState(window.history.state, "", stripPrivateSupportParams(new URL(window.location.href))); } catch { /* Do not propagate private criteria. */ }
    }
    const clock = () => setNow(new Date().toISOString());
    const connection = () => setOffline(!navigator.onLine);
    clock(); connection();
    const timer = window.setInterval(clock, 60000);
    window.addEventListener("online", connection); window.addEventListener("offline", connection); document.addEventListener("visibilitychange", clock);
    return () => { window.clearInterval(timer); window.removeEventListener("online", connection); window.removeEventListener("offline", connection); document.removeEventListener("visibilitychange", clock); };
  }, []);
  useEffect(() => { if (focusNext.current) { sectionHeading.current?.focus(); focusNext.current = false; } }, [view]);
  const dirtyChanged = useCallback((dirty: boolean) => setDraftDirty(dirty), []);
  const busyChanged = useCallback((busy: boolean) => setNotebookBusy(busy), []);
  const activate = (next: View) => {
    if (supportPresetsEnabled) scoped.onSelect("");
    if (next !== "hours" && next !== "guidance") setYouthCriteria(current => ({ ...current, pathway: next }));
    focusNext.current = true; setView(next); stage(null); setDraftDirty(false);
    const url = stripPrivateSupportParams(new URL(window.location.href)); url.searchParams.set("pathway", next); window.history.replaceState(window.history.state, "", url);
  };
  const navigate = (next: View) => {
    if (next === view || notebookBusy || pendingRef.current) return;
    if (draftDirty) { stage({ kind: "view", view: next }); return; }
    activate(next);
  };
  const scoped = useScopedSavedFilters({ enabled: supportPresetsEnabled, scope: "youth-guide", criteria: youthCriteria,
    onApply: value => {
      if (value.kind !== "youth") return false;
      return guardYouthPresetTransition(value, { busy: notebookBusy, dirty: draftDirty }, criteria => new Promise<boolean>(resolve => stage({ kind: "preset", criteria, resolve })), criteria => {
        setYouthCriteria(criteria); setView(criteria.pathway); setCriteriaError(""); setDraftDirty(false); focusNext.current = true;
        try { const url = stripPrivateSupportParams(new URL(window.location.href)); url.searchParams.set("pathway", criteria.pathway); window.history.replaceState(window.history.state, "", url); } catch { /* A restricted history API does not undo the selected criteria. */ }
        requestAnimationFrame(() => sectionHeading.current?.focus());
      });
    },
    onBeforeNavigate: href => guardYouthPresetTransition(href, { busy: notebookBusy, dirty: draftDirty }, target => new Promise<boolean>(resolve => stage({ kind: "route", href: target, resolve })), () => {})
  });
  const finishPending = (accept: boolean) => {
    const pending = pendingRef.current; stage(null);
    if (!pending) return;
    if (!accept) requestAnimationFrame(() => pendingOpener.current?.focus());
    if (pending.kind === "view") { if (accept) activate(pending.view); }
    else pending.resolve(accept);
  };
  const title = view === "hours" ? "Keep your own record" : view === "guidance" ? "Before you begin volunteering" : pathways.find(p => p.id === view)!.title;
  return <section className="hs-hub" id="discover" aria-labelledby="hs-title" lang="en">
    <header className="hs-intro"><GtaArtwork role="school" illustration /><div><p className="eyebrow">HIGH SCHOOL</p><h1 id="hs-title">Find your next step.</h1><p>Programmes to explore, places to volunteer and a notebook for your hours.</p></div></header>
    {context === "coop-shsm" && <p className="hs-notice">Co-op and SHSM are school-coordinated pathways. These are related programmes and guidance, not confirmed co-op placements or SHSM credit. Ask your school coordinator about eligible placements and requirements.</p>}
    <nav className="hs-pathways" aria-label="Student pathways"><ul>{pathways.map(path => <li key={path.id}><button type="button" disabled={notebookBusy || !!pendingAction} aria-pressed={view === path.id} onClick={() => navigate(path.id)}><GtaArtwork role={path.role} /><span><strong>{path.title}</strong><span>{path.text}</span></span></button></li>)}</ul></nav>
    <div className="hs-utility-links"><button className="soft-button" type="button" disabled={notebookBusy || !!pendingAction} aria-pressed={view === "hours"} onClick={() => navigate("hours")}><GtaArtwork role="calendar" />Hours notebook</button><button className="soft-button" type="button" disabled={notebookBusy || !!pendingAction} aria-pressed={view === "guidance"} onClick={() => navigate("guidance")}><GtaArtwork role="about" />School-hours guidance</button><a href="/high-school/activities/">Browse teen activities</a></div>
    {pendingAction && <div className="hs-notice" role="group" aria-label="Leave unsaved notebook draft"><p>Your notebook draft is not saved. Discard it and change sections?</p><div className="hs-actions"><button className="soft-button" type="button" disabled={notebookBusy} onClick={() => finishPending(true)}>Discard draft and continue</button><button className="soft-button" type="button" onClick={() => finishPending(false)}>Keep editing</button></div></div>}
    {supportPresetsEnabled && <ScopedSavedFilters {...scoped} busy={scoped.busy || notebookBusy || (!!pendingAction && pendingAction.kind === "view")} />}
    {offline && <p className="hs-notice" role="status">You appear to be offline. These are previously reviewed source details; current openings and provider links cannot be confirmed online. Saved notebook entries can still work when browser storage is available.</p>}
    <div className="hs-current-section"><h2 ref={sectionHeading} tabIndex={-1}>{title}</h2>
      {language !== "en" && <p className="hs-language-note" lang="en">This student content is currently available in English.</p>}
      {view === "volunteer" && displayedRoleFeedState === "loading" && <p className="hs-notice" role="status">Loading source-checked volunteer roles…</p>}
      {view === "volunteer" && (displayedRoleFeedState === "error") && <p className="hs-notice" role="status">Volunteer role listings could not be checked. Previously received details, if shown, retain their original source dates. Programmes and guidance below are separate from the role feed.</p>}
      {view === "volunteer" && displayedRoleFeedState === "stale" && <p className="hs-notice">These are previously received role details. Check current conditions with the provider. Expired source checks are excluded.</p>}
      {view === "volunteer" && displayedRoleFeedState === "ready" && combined.feed?.count === 0 && <p className="hs-notice">The role feed has no current source-checked listings. Programmes and guidance below are separate.</p>}
      {view === "volunteer" && roleFeedEnabled && (displayedRoleFeedState === "error" || displayedRoleFeedState === "stale") && <button className="soft-button" type="button" onClick={refreshRoles}>Refresh volunteer roles</button>}
      {view === "hours" ? <HoursNotebook onDirtyChange={dirtyChanged} onBusyChange={busyChanged} /> : view === "guidance" ? <div className="hs-guidance"><p>Before starting, ask your school whether the activity is suitable and which records or forms it requires. A provider’s volunteering claim does not replace your school’s approval.</p><ol><li>Read the provider’s age, residency, cost and commitment requirements.</li><li>Check the planned activity and approval process with your school.</li><li>Record only the time you actually complete. Keep the school’s required records and any required sign-offs.</li></ol><a className="primary-button" href="https://www.ontario.ca/page/get-your-high-school-volunteer-hours">Read Ontario’s school-hours guidance</a><p>The notebook is your personal record. It is not a signed school form and cannot certify community-involvement credit.</p></div> : now ? <HighSchoolDiscovery key={view} supportPresetsEnabled={supportPresetsEnabled} criteria={supportPresetsEnabled ? youthCriteria : undefined} criteriaError={criteriaError} onCriteriaChange={value => { setYouthCriteria(value); setCriteriaError(""); }} listings={combined.listings} catalogueState={catalogue.state} pathway={view} now={now} /> : <p role="status">Checking source review dates…</p>}
    </div>
  </section>;
}
