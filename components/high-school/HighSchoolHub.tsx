"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getCuratedYouthCatalogue } from "@/lib/highSchool/curatedCatalogue";
import type { Pathway } from "@/lib/highSchool/model";
import { GtaArtwork } from "../GtaArtwork";
import { HighSchoolDiscovery } from "./HighSchoolDiscovery";
import { HoursNotebook } from "./HoursNotebook";
import "./HighSchool.css";

const pathways = [
  { id: "volunteer", title: "Volunteer", text: "Understand the commitment, check requirements and find places to help.", role: "volunteer" },
  { id: "learning", title: "Learn & create", text: "Explore projects, clubs and programmes for curious students.", role: "library" },
  { id: "leadership-careers", title: "Leadership & careers", text: "Ask about mentorship, leadership and practical next steps.", role: "ideas" },
  { id: "funding", title: "Scholarships & support", text: "Find guidance on awards, bursaries and planning after school.", role: "school" }
] as const;
type View = Pathway | "hours" | "guidance";
const catalogue = getCuratedYouthCatalogue();
export function HighSchoolHub({ initialPathway = "volunteer", context }: { initialPathway?: "volunteer" | "leadership-careers"; context?: "coop-shsm" }) {
  const [view, setView] = useState<View>(initialPathway);
  const [now, setNow] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const [draftDirty, setDraftDirty] = useState(false);
  const [notebookBusy, setNotebookBusy] = useState(false);
  const [pendingView, setPendingView] = useState<View | null>(null);
  const sectionHeading = useRef<HTMLHeadingElement>(null);
  const focusNext = useRef(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("pathway");
    if ([...pathways.map(p => p.id), "hours", "guidance"].includes(requested as View)) setView(requested as View);
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
    focusNext.current = true; setView(next); setPendingView(null); setDraftDirty(false);
    const url = new URL(window.location.href); url.searchParams.set("pathway", next); window.history.replaceState(window.history.state, "", url);
  };
  const navigate = (next: View) => {
    if (next === view || notebookBusy) return;
    if (draftDirty) { setPendingView(next); return; }
    activate(next);
  };
  const title = view === "hours" ? "Keep your own record" : view === "guidance" ? "Before you begin volunteering" : pathways.find(p => p.id === view)!.title;
  return <section className="hs-hub" id="discover" aria-labelledby="hs-title" lang="en">
    <header className="hs-intro"><GtaArtwork role="school" illustration /><div><p className="eyebrow">HIGH SCHOOL</p><h1 id="hs-title">Find your next step.</h1><p>Explore programmes, ways to help and support for what comes next. Check each provider’s requirements and current availability.</p></div></header>
    {context === "coop-shsm" && <p className="hs-notice">Co-op and SHSM are school-coordinated pathways. These are related programmes and guidance, not confirmed co-op placements or SHSM credit. Ask your school coordinator about eligible placements and requirements.</p>}
    <p className="hs-language-note">Student guide and notebook · English. Requirements are summarised from linked provider sources; check the provider for full details.</p>
    <nav className="hs-pathways" aria-label="Student pathways"><ul>{pathways.map(path => <li key={path.id}><button type="button" disabled={notebookBusy} aria-pressed={view === path.id} onClick={() => navigate(path.id)}><GtaArtwork role={path.role} /><span><strong>{path.title}</strong><span>{path.text}</span></span></button></li>)}</ul></nav>
    <div className="hs-utility-links"><button className="soft-button" type="button" disabled={notebookBusy} aria-pressed={view === "hours"} onClick={() => navigate("hours")}><GtaArtwork role="calendar" />Hours notebook</button><button className="soft-button" type="button" disabled={notebookBusy} aria-pressed={view === "guidance"} onClick={() => navigate("guidance")}><GtaArtwork role="about" />School-hours guidance</button><a href="/high-school/activities/">Browse teen activities</a></div>
    {pendingView && <div className="hs-notice" role="group" aria-label="Leave unsaved notebook draft"><p>Your notebook draft is not saved. Discard it and change sections?</p><div className="hs-actions"><button className="soft-button" type="button" onClick={() => activate(pendingView)}>Discard draft and continue</button><button className="soft-button" type="button" onClick={() => setPendingView(null)}>Keep editing</button></div></div>}
    {offline && <p className="hs-notice" role="status">You appear to be offline. These are previously reviewed source details; current openings and provider links cannot be confirmed online. Saved notebook entries can still work when browser storage is available.</p>}
    <div className="hs-current-section"><h2 ref={sectionHeading} tabIndex={-1}>{title}</h2>
      {view === "hours" ? <HoursNotebook onDirtyChange={dirtyChanged} onBusyChange={busyChanged} /> : view === "guidance" ? <div className="hs-guidance"><p>Before starting, ask your school whether the activity is suitable and which records or forms it requires. A provider’s volunteering claim does not replace your school’s approval.</p><ol><li>Read the provider’s age, residency, cost and commitment requirements.</li><li>Check the planned activity and approval process with your school.</li><li>Record only the time you actually complete. Keep the school’s required records and any required sign-offs.</li></ol><a className="primary-button" href="https://www.ontario.ca/page/get-your-high-school-volunteer-hours">Read Ontario’s school-hours guidance</a><p>The notebook is your personal record. It is not a signed school form and cannot certify community-involvement credit.</p></div> : now ? <HighSchoolDiscovery key={view} listings={catalogue.listings} catalogueState={catalogue.state} pathway={view} now={now} /> : <p role="status">Checking source review dates…</p>}
    </div>
  </section>;
}
