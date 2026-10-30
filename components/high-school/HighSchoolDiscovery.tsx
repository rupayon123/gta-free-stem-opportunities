"use client";

import { useMemo, useRef, useState } from "react";
import { evaluateYouthListing, type Pathway, type YouthListing } from "@/lib/highSchool/model";
import { GtaArtwork } from "../GtaArtwork";
import { YouthListingDetail } from "./YouthListingDetail";

const regions = ["Toronto", "York", "Peel", "Durham", "Halton"];
export function HighSchoolDiscovery({ listings, pathway, now, catalogueState }: { listings: YouthListing[]; pathway: Pathway; now: string; catalogueState: "preparing" | "ready" | "error" }) {
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [region, setRegion] = useState("");
  const [delivery, setDelivery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selected, setSelected] = useState<YouthListing | null>(null);
  const openerId = useRef<string | null>(null);
  const resultButtons = useRef(new Map<string, HTMLButtonElement>());
  const validAge = age === "" || (/^\d{1,2}$/.test(age) && Number(age) >= 0 && Number(age) <= 99);
  const evaluated = useMemo(() => validAge ? listings.filter(row => row.pathway === pathway).map(row => ({ row, decision: evaluateYouthListing(row, { now, selectedAge: age ? Number(age) : undefined, selectedGrade: grade ? Number(grade) : undefined }) })).filter(({ row }) => (!region || row.regions?.includes(region)) && (!delivery || row.delivery === delivery || (row.delivery === "hybrid" && (delivery === "virtual" || delivery === "in-person")))) : [], [listings, pathway, now, age, grade, region, delivery, validAge]);
  const available = evaluated.filter(({ decision }) => decision.verifiedFreeRoles || decision.verifiedFreePrograms);
  const roles = available.filter(({ decision }) => decision.verifiedFreeRoles);
  const programmes = available.filter(({ decision }) => decision.verifiedFreePrograms);
  const upcoming = evaluated.filter(({ decision }) => decision.freeBadge && decision.effectiveStatus === "upcoming");
  const directories = evaluated.filter(({ decision }) => decision.directorySection);
  const programmesToCheck = evaluated.filter(({ row, decision }) => row.listingKind === "program" && decision.teenHub && !decision.freeBadge);
  const resources = evaluated.filter(({ row, decision }) => row.listingKind === "resource" && decision.teenHub);
  const otherRoles = evaluated.filter(({ row, decision }) => row.listingKind === "role" && decision.teenHub && !decision.freeBadge);
  const stale = evaluated.some(({ row, decision }) => row.reviewStatus === "approved" && !decision.evidenceCurrent);
  if (selected) return <YouthListingDetail listing={selected} now={now} onBack={() => { setSelected(null); requestAnimationFrame(() => { if (openerId.current) resultButtons.current.get(openerId.current)?.focus(); }); }} />;
  const groupsCount = available.length + upcoming.length + directories.length + programmesToCheck.length + resources.length + otherRoles.length;
  const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
  const summary = [roles.length ? count(roles.length, "confirmed individual role", "confirmed individual roles") : "", programmes.length ? count(programmes.length, "programme accepting applications", "programmes accepting applications") : "", upcoming.length ? count(upcoming.length, "upcoming programme", "upcoming programmes") : "", programmesToCheck.length ? count(programmesToCheck.length, "programme to ask about", "programmes to ask about") : "", directories.length ? count(directories.length, "provider directory", "provider directories") : "", resources.length ? count(resources.length, "guidance resource", "guidance resources") : "", otherRoles.length ? count(otherRoles.length, "role needing confirmation", "roles needing confirmation") : ""].filter(Boolean).join(" · ");
  function group(title: string, rows: typeof evaluated) {
    if (!rows.length) return null;
    return <section className="hs-result-group" aria-label={title}><h3>{title}</h3>{<ul className="hs-result-list">{rows.map(({ row, decision }) => <li key={row.id}><GtaArtwork role={row.listingKind === "provider-directory" ? "explore" : pathway === "volunteer" ? "volunteer" : pathway === "learning" ? "library" : "ideas"} /><div><p className="hs-provider">{row.provider}</p><h4><button type="button" ref={element => { if (element) resultButtons.current.set(row.id, element); else resultButtons.current.delete(row.id); }} onClick={() => { openerId.current = row.id; setSelected(row); }}>{row.title}</button></h4><p>{row.audience.original}</p><p className="hs-result-meta">{row.listingKind === "provider-directory" ? "Provider directory · requirements and openings vary" : row.listingKind === "resource" ? "Information resource · not a placement or award" : `${decision.statusLabel} · ${decision.costLabel}`}</p>{row.commitmentOriginal && <p>{row.commitmentOriginal}</p>}</div></li>)}</ul>}</section>;
  }
  return <div className="hs-discovery" lang="en">
    <button type="button" className="soft-button hs-filter-toggle" aria-expanded={filtersOpen} aria-controls="hs-filters" onClick={() => setFiltersOpen(value => !value)}><GtaArtwork role="filters" />Filter these opportunities</button>
    <div className="hs-discovery-layout">
      <aside id="hs-filters" className={`hs-filters${filtersOpen ? " hs-filters-open" : ""}`} aria-label="Student opportunity filters">
        <h3>Make it relevant to you</h3>
        <label htmlFor="hs-age">Age (optional)</label><input id="hs-age" type="number" min="0" max="99" step="1" inputMode="numeric" value={age} onChange={e => setAge(e.target.value)} aria-invalid={!validAge} aria-describedby="hs-age-help" /><p id="hs-age-help">{validAge ? "Age and grade are separate. We never guess one from the other." : "Enter a whole age from 0 to 99, or leave it blank."}</p>
        <label htmlFor="hs-grade">Grade (optional)</label><select id="hs-grade" value={grade} onChange={e => setGrade(e.target.value)}><option value="">Any grade</option>{[7, 8, 9, 10, 11, 12].map(g => <option key={g} value={g}>Grade {g}</option>)}</select>
        <label htmlFor="hs-region">Available for your region</label><select id="hs-region" value={region} onChange={e => setRegion(e.target.value)}><option value="">All regions</option>{regions.map(r => <option key={r}>{r}</option>)}</select>
        <label htmlFor="hs-delivery">Delivery information</label><select id="hs-delivery" value={delivery} onChange={e => setDelivery(e.target.value)}><option value="">Any delivery</option><option value="in-person">Includes in-person activity</option><option value="virtual">Includes online activity</option><option value="hybrid">Mixed delivery — check format</option></select>
        <p>Mixed delivery may include required attendance or different format options. Confirm the exact arrangement with the provider.</p>
        <button type="button" className="soft-button" onClick={() => { setAge(""); setGrade(""); setRegion(""); setDelivery(""); }}>Clear these filters</button>
        <p>Check the full requirements before applying. Missing eligibility information means it still needs confirmation.</p>
      </aside>
      <div className="hs-results">
        {catalogueState === "preparing" && <p className="hs-notice" role="status">Reviewed student opportunities are being prepared. No current openings are claimed here yet.</p>}
        {catalogueState === "error" && <p className="hs-notice" role="alert">Student opportunities could not be loaded. We cannot confirm openings. You can still use the hours notebook and school guidance.</p>}
        {stale && <p className="hs-notice">Some source reviews need refreshing. They are excluded from confirmed openings.</p>}
        {catalogueState === "ready" && <p role="status" className={!groupsCount ? "hs-empty" : undefined}>{summary || "No reviewed matches. Try clearing a filter or choose another pathway."}</p>}
        {pathway === "volunteer" && !roles.length && groupsCount > 0 && <p className="hs-notice">Individual roles are still being reviewed. Start with a programme or provider directory below.</p>}
        {pathway === "volunteer" && group("Individual volunteer roles", roles)}
        {group("Programmes accepting applications", programmes)}
        {!!upcoming.length && group("Upcoming applications", upcoming)}
        {group("Places to look", directories)}
        {!!programmesToCheck.length && group("Programmes to ask about", programmesToCheck)}
        {!!resources.length && group("Guidance and resources", resources)}
        {!!otherRoles.length && <details><summary>Roles needing confirmation</summary>{group("Not confirmed as open and no-mandatory-fee", otherRoles)}</details>}
      </div>
    </div>
  </div>;
}
