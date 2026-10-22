"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Bookmark, CalendarDays, CalendarPlus, Check, ChevronDown, Code2, Compass, ExternalLink, FlaskConical, List, LocateFixed, Map, MapPin, Search, SlidersHorizontal, RefreshCw, UsersRound, X } from "lucide-react";
import { categories, cityOptions, languagePreferenceOrder, opportunities, regions } from "@/lib/data";
import { languageMeta, t, translatedCategory, translatedSummary } from "@/lib/i18n";
import { legalConfig } from "@/lib/legal";
import { isOpportunityVerificationStale, publicOpportunities } from "@/lib/opportunityStatus";
import type { Filters, LanguageCode, Opportunity } from "@/lib/types";
import { coordinatesFromPostal, createCalendarFile, filterOpportunities, formatDateRange, formatDeadline, haversineKm, type Coordinates } from "@/lib/utils";
import { ExplorerMap } from "./ExplorerMap";
import "./OpportunityExplorer.css";

const SAVED_KEY = "gta-stem-opportunities-saved-anonymous";
const PAGE_SIZE = 12;
const DEFAULT_FILTERS: Filters = {
  query: "", region: "All", city: "", category: "All", age: "", language: "all",
  distanceKm: 25, postalCode: "", nearMe: false, blackFocused: false, girlsFocused: false,
  indigenousFocused: false, volunteerHours: false, coop: false, mentorship: false, leadership: false
};

type ExplorerProps = {
  language: LanguageCode;
  initialFilters?: Partial<Filters>;
  highSchool?: boolean;
  savedOnly?: boolean;
  landing?: boolean;
  onSavedCountChange?: (count: number) => void;
};
type SortOrder = "soonest" | "recent" | "title" | "distance";
const URL_TOGGLES = { black: "blackFocused", girls: "girlsFocused", indigenous: "indigenousFocused", volunteer: "volunteerHours", coop: "coop", mentorship: "mentorship", leadership: "leadership" } as const;
function filtersFromUrl(base: Partial<Filters>): Filters {
  const filters = { ...DEFAULT_FILTERS, ...base };
  const params = new URLSearchParams(window.location.search);
  if (params.has("q")) filters.query = (params.get("q") ?? "").slice(0, 250);
  const category = params.get("category");
  if (category && categories.includes(category as typeof categories[number])) filters.category = category as Filters["category"];
  const region = params.get("region");
  if (region && regions.includes(region as typeof regions[number])) filters.region = region as Filters["region"];
  const city = params.get("city");
  if (city && cityOptions.includes(city)) filters.city = city;
  const age = params.get("age");
  if (age && /^\d{1,2}$/.test(age)) filters.age = age;
  const programLanguage = params.get("programLanguage");
  if (programLanguage && programLanguage in languageMeta) filters.language = programLanguage as LanguageCode;
  if (params.has("postal")) filters.postalCode = (params.get("postal") ?? "").slice(0, 7).toUpperCase();
  const distance = Number(params.get("distance"));
  if ([5, 10, 25, 50, 100].includes(distance)) filters.distanceKm = distance;
  Object.entries(URL_TOGGLES).forEach(([param, key]) => { if (params.has(param)) filters[key] = params.get(param) === "1"; });
  return filters;
}

type ToggleFilter = "blackFocused" | "girlsFocused" | "indigenousFocused" | "volunteerHours" | "coop" | "mentorship" | "leadership";

function locationDistanceParameter(filters: Filters) { return filters.distanceKm !== 25 && (filters.nearMe || filters.postalCode) ? String(filters.distanceKm) : ""; }

function externalUrl(value: string) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch { return undefined; }
}
function shortDate(value: string, language: LanguageCode) {
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00Z` : value);
  return Number.isNaN(date.getTime()) ? "Date not confirmed" : new Intl.DateTimeFormat(language, { month: "short", day: "numeric", year: "numeric", timeZone: "America/Toronto" }).format(date);
}
function ageRange(item: Opportunity) { return item.ages.max ? `${item.ages.min}–${item.ages.max}` : `${item.ages.min}+`; }
function reportUrl(item: Opportunity) {
  const url = new URL(legalConfig.supportIssueUrl);
  url.searchParams.set("title", `Listing update: ${item.title}`);
  url.searchParams.set("listing", item.registrationUrl);
  return url.href;
}

export function OpportunityExplorer({ language, initialFilters = {}, highSchool = false, savedOnly = false, landing = false, onSavedCountChange }: ExplorerProps) {
  const [filters, setFilters] = useState<Filters>(() => ({ ...DEFAULT_FILTERS, ...initialFilters }));
  const [urlReady, setUrlReady] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState<"list" | "map">("list");
  const [sort, setSort] = useState<SortOrder>("soonest");
  const [page, setPage] = useState(1);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [storageNotice, setStorageNotice] = useState("");
  const [saveAnnouncement, setSaveAnnouncement] = useState("");
  const [saveFeedback, setSaveFeedback] = useState<{ text: string; sequence: number } | null>(null);
  const feedbackSequence = useRef(0);
  const [deviceLocation, setDeviceLocation] = useState<Coordinates | null>(null);
  const [locationNotice, setLocationNotice] = useState("");
  const [nearbyInput, setNearbyInput] = useState("");
  const [nearbyError, setNearbyError] = useState("");
  const [locating, setLocating] = useState(false);
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [now, setNow] = useState<Date | undefined>();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const savedCountCallback = useRef(onSavedCountChange);
  savedCountCallback.current = onSavedCountChange;
  const initialKey = JSON.stringify(initialFilters);

  useEffect(() => {
    const readUrl = () => { setFilters(filtersFromUrl(JSON.parse(initialKey))); setDeviceLocation(null); };
    readUrl();
    setUrlReady(true);
    window.addEventListener("popstate", readUrl);
    return () => window.removeEventListener("popstate", readUrl);
  }, [initialKey]);
  useEffect(() => {
    if (!urlReady) return;
    const url = new URL(window.location.href);
    const values: Record<string, string> = {
      q: filters.query, category: filters.category === "All" ? "" : filters.category,
      region: filters.region === "All" ? "" : filters.region, city: filters.city,
      age: filters.age, programLanguage: filters.language === "all" ? "" : filters.language,
      postal: filters.postalCode, distance: locationDistanceParameter(filters)
    };
    Object.entries(URL_TOGGLES).forEach(([param, key]) => { values[param] = filters[key] ? "1" : ""; });
    Object.entries(values).forEach(([key, value]) => { if (value) url.searchParams.set(key, value); else url.searchParams.delete(key); });
    if (url.href !== window.location.href) window.history.replaceState(window.history.state, "", url);
  }, [filters, urlReady]);
  useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(interval);
  }, []);
  useEffect(() => {
    function readSaves() {
      try {
        const stored: unknown = JSON.parse(window.localStorage.getItem(SAVED_KEY) ?? "[]");
        setSavedIds(Array.isArray(stored) ? [...new Set(stored.filter((id): id is string => typeof id === "string"))] : []);
      } catch { setStorageNotice("Your browser could not load saved opportunities. You can still browse everything."); }
    }
    readSaves();
    const handleStorage = (event: StorageEvent) => { if (event.key === SAVED_KEY || event.key === null) readSaves(); };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const available = useMemo(() => now ? publicOpportunities(opportunities, now) : [], [now]);
  const coverage = useMemo(() => [...new Set(available.map((item) => item.city))].sort().join(" & "), [available]);
  const latestCheck = useMemo(() => available.reduce((latest, item) => Date.parse(item.lastVerified) > Date.parse(latest || "1970-01-01") ? item.lastVerified : latest, ""), [available]);
  const availableIds = useMemo(() => new Set(available.map((item) => item.id)), [available]);
  const savedCount = savedIds.filter((id) => availableIds.has(id)).length;
  const unavailableSaved = savedIds.filter((id) => !availableIds.has(id));
  const pastSavedCount = unavailableSaved.length;
  useEffect(() => { savedCountCallback.current?.(savedIds.length); }, [savedIds]);
  const location = useMemo(() => filters.nearMe ? deviceLocation : coordinatesFromPostal(filters.postalCode), [filters.nearMe, filters.postalCode, deviceLocation]);
  useEffect(() => {
    setNearbyInput(filters.city || filters.postalCode);
    setNearbyError("");
  }, [filters.city, filters.postalCode]);

  const results = useMemo(() => {
    const candidates = available.filter((item) => (!savedOnly || savedIds.includes(item.id)) && (!highSchool || (
      item.ages.min <= 17 && (item.ages.max ?? 99) >= 14
    )));
    const result = filterOpportunities(candidates, filters, null).filter((item) => !location || item.virtual || haversineKm(location, item) <= filters.distanceKm);
    if (sort === "soonest" || (sort === "distance" && !location)) result.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate));
    if (sort === "title") result.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "recent") result.sort((a, b) => Date.parse(b.lastVerified) - Date.parse(a.lastVerified));
    if (sort === "distance" && location) result.sort((a, b) => haversineKm(location, a) - haversineKm(location, b));
    return result;
  }, [available, filters, location, sort, savedIds, savedOnly, highSchool]);
  const staleCount = results.filter((item) => isOpportunityVerificationStale(item.lastVerified, now)).length;
  const visibleResults = results.slice(0, PAGE_SIZE * page);
  useEffect(() => { setPage(1); }, [filters, sort, savedOnly, highSchool]);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => setFilters((current) => ({ ...current, [key]: value }));
  const clearFilters = () => { setFilters({ ...DEFAULT_FILTERS }); setLocationNotice(""); setNearbyInput(""); setNearbyError(""); setDeviceLocation(null); };
  const applyNearbyLocation = () => {
    const entered = nearbyInput.trim();
    const city = cityOptions.find((option) => option.toLowerCase() === entered.toLowerCase());
    const postal = entered.replace(/\s+/g, "").toUpperCase();
    const validPostal = /^[A-Z]\d[A-Z](?:\d[A-Z]\d)?$/.test(postal) && coordinatesFromPostal(postal);
    if (entered && !city && !validPostal) {
      setNearbyError("Choose a GTA city from the suggestions, or use a supported postal area such as M5T. Your current results have not changed.");
      return;
    }
    setNearbyError("");
    setDeviceLocation(null);
    setFilters((current) => ({ ...current, region: "All", city: city ?? "", postalCode: validPostal ? postal : "", nearMe: false }));
  };
  const persistSaves = (updated: string[], announcement: string) => {
    setSavedIds(updated);
    const removing = updated.length < savedIds.length;
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
      setStorageNotice("");
      setSaveAnnouncement(announcement);
      setSaveFeedback({ text: removing ? "Removed from your saved ideas." : "Saved! A discovery to come back to.", sequence: ++feedbackSequence.current });
    } catch {
      const message = removing ? "Removed for this visit. Device storage is blocked." : "Saved for this visit only. Device storage is blocked.";
      setStorageNotice(message);
      setSaveAnnouncement(message);
      setSaveFeedback({ text: message, sequence: ++feedbackSequence.current });
    }
  };
  useEffect(() => {
    if (!saveFeedback) return;
    const timeout = window.setTimeout(() => setSaveFeedback(null), 2800);
    return () => window.clearTimeout(timeout);
  }, [saveFeedback]);
  const toggleSave = (item: Opportunity) => {
    const isSaved = savedIds.includes(item.id);
    const updated = isSaved ? savedIds.filter((id) => id !== item.id) : [...savedIds, item.id];
    persistSaves(updated, `${item.title} ${isSaved ? "removed from saved opportunities" : "saved on this device"}.`);
  };
  const useLocation = () => {
    if (!navigator.geolocation) { setLocationNotice("Location is unavailable in this browser. Choose a city or enter a postal area instead."); return; }
    setLocating(true);
    setLocationNotice("");
    navigator.geolocation.getCurrentPosition((position) => {
      setDeviceLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, label: "Your location" });
      setFilters((current) => ({ ...current, nearMe: true, postalCode: "" }));
      setLocating(false);
    }, () => {
      setLocating(false);
      setLocationNotice("We could not access your location. Choose a city or enter a postal area instead.");
    }, { timeout: 10000, maximumAge: 300000 });
  };
  const openDetail = useCallback((item: Opportunity) => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelected(item);
  }, []);
  const closeDetail = useCallback(() => setSelected(null), []);
  useEffect(() => {
    if (!selected || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [selected]);

  const chips: { key: keyof Filters; label: string; reset: () => void }[] = [];
  if (filters.query) chips.push({ key: "query", label: `“${filters.query}”`, reset: () => updateFilter("query", "") });
  if (filters.category !== "All") chips.push({ key: "category", label: translatedCategory(filters.category, language), reset: () => updateFilter("category", "All") });
  if (filters.region !== "All") chips.push({ key: "region", label: filters.region, reset: () => updateFilter("region", "All") });
  if (filters.city) chips.push({ key: "city", label: filters.city, reset: () => updateFilter("city", "") });
  if (filters.age) chips.push({ key: "age", label: `${t(language, "age")} ${filters.age}`, reset: () => updateFilter("age", "") });
  if (filters.language !== "all") chips.push({ key: "language", label: languageMeta[filters.language].label, reset: () => updateFilter("language", "all") });
  if (location) chips.push({ key: "distanceKm", label: `${filters.distanceKm} km · ${location.label ?? "your area"}`, reset: () => setFilters((current) => ({ ...current, nearMe: false, postalCode: "" })) });
  const toggles: [ToggleFilter, "black" | "girls" | "indigenous" | "volunteerHours" | "coop" | "mentorship" | "leadership"][] = [["blackFocused", "black"], ["girlsFocused", "girls"], ["indigenousFocused", "indigenous"], ["volunteerHours", "volunteerHours"], ["coop", "coop"], ["mentorship", "mentorship"], ["leadership", "leadership"]];
  toggles.forEach(([key, label]) => { if (filters[key]) chips.push({ key, label: t(language, label), reset: () => updateFilter(key, false) }); });
  const browseParams = new URLSearchParams();
  const browseValues = {
    q: filters.query, category: filters.category === "All" ? "" : filters.category,
    region: filters.region === "All" ? "" : filters.region, city: filters.city,
    age: filters.age, programLanguage: filters.language === "all" ? "" : filters.language,
    postal: filters.postalCode, distance: locationDistanceParameter(filters)
  };
  Object.entries(browseValues).forEach(([key, value]) => { if (value) browseParams.set(key, value); });
  Object.entries(URL_TOGGLES).forEach(([param, key]) => { if (filters[key]) browseParams.set(param, "1"); });
  const browseHref = `/opportunities/${browseParams.size ? `?${browseParams}` : ""}`;
  const primaryInterests = ["Coding & Robotics", "Science & Engineering"] as const;

  return (
    <section className={`oe-explorer${landing ? " oe-landing" : ""}`} id="opportunities" aria-labelledby="oe-heading">
      <h2 id="oe-heading" className="oe-sr-only">{savedOnly ? t(language, "saved") : highSchool ? t(language, "highSchool") : t(language, "navOpportunities")}</h2>
      {!landing && <div className="oe-search-row">
        <div className="oe-search"><Search size={21} aria-hidden="true" /><label className="oe-sr-only" htmlFor="oe-search">{t(language, "search")}</label><input id="oe-search" type="search" value={filters.query} onChange={(event) => updateFilter("query", event.target.value)} placeholder={t(language, "searchPlaceholder")} autoComplete="off" /></div>
        <button data-science-press type="button" className="oe-filter-toggle" aria-expanded={filterOpen} aria-controls="oe-filters" onClick={() => setFilterOpen((open) => !open)}><SlidersHorizontal size={19} aria-hidden="true" />{t(language, "filters")}{chips.length > 0 && <span>{chips.length}</span>}<ChevronDown size={16} aria-hidden="true" /></button>
      </div>}
      <div className="oe-layout">
        {landing ? <aside className="oe-interest-panel" aria-labelledby="oe-interest-heading">
          <h3 id="oe-interest-heading" lang="en">Start with your interests</h3>
          <p className="oe-interest-intro" lang="en">Choose what you’re curious about and find opportunities near you.</p>
          <fieldset>
            <legend className="oe-sr-only" lang="en">Choose one interest</legend>
            <label className="oe-interest-option"><input type="radio" name="oe-interest" value="All" checked={filters.category === "All"} onChange={() => updateFilter("category", "All")} /><span className="oe-interest-icon"><Compass size={21} aria-hidden="true" /></span><span>{t(language, "allCategories")}</span></label>
            {primaryInterests.map((category) => <label className="oe-interest-option" key={category}><input type="radio" name="oe-interest" value={category} checked={filters.category === category} onChange={() => updateFilter("category", category)} /><span className="oe-interest-icon">{category === "Coding & Robotics" ? <Code2 size={21} aria-hidden="true" /> : <FlaskConical size={21} aria-hidden="true" />}</span><span>{translatedCategory(category, language)}</span></label>)}
            <details className="oe-interest-more">
              <summary data-science-press><span lang={filters.category !== "All" && !primaryInterests.includes(filters.category as typeof primaryInterests[number]) ? language : "en"}>{filters.category !== "All" && !primaryInterests.includes(filters.category as typeof primaryInterests[number]) ? translatedCategory(filters.category, language) : "More interests"}</span><ChevronDown size={16} aria-hidden="true" /></summary>
              {categories.filter((category) => !primaryInterests.includes(category as typeof primaryInterests[number])).map((category) => <label className="oe-interest-option" key={category}><input type="radio" name="oe-interest" value={category} checked={filters.category === category} onChange={() => updateFilter("category", category)} /><span>{translatedCategory(category, language)}</span></label>)}
            </details>
          </fieldset>
          <form className="oe-nearby-form" onSubmit={(event) => { event.preventDefault(); applyNearbyLocation(); }}>
            <label htmlFor="oe-nearby-location" lang="en">City or postal code</label>
            <div className="oe-nearby-input"><MapPin size={19} aria-hidden="true" /><input id="oe-nearby-location" type="text" value={nearbyInput} onChange={(event) => { setNearbyInput(event.target.value); setNearbyError(""); }} placeholder="Enter a city or postal code" list="oe-city-suggestions" autoComplete="off" maxLength={60} aria-invalid={nearbyError ? true : undefined} aria-describedby={nearbyError ? "oe-nearby-error" : location && filters.postalCode ? "oe-nearby-help" : undefined} lang="en" /></div>
            <datalist id="oe-city-suggestions">{cityOptions.map((city) => <option key={city} value={city} />)}</datalist>
            {nearbyError && <p className="oe-nearby-error" id="oe-nearby-error" role="alert" lang="en">{nearbyError}</p>}
            {location && filters.postalCode && !nearbyError && <p className="oe-nearby-help" id="oe-nearby-help" lang="en">Within {filters.distanceKm} km of {location.label}. Postal-area distances are approximate.</p>}
            <button data-science-press className="oe-nearby-submit" type="submit" lang="en"><Search size={20} aria-hidden="true" />Find nearby opportunities</button>
          </form>
        </aside> : <aside id="oe-filters" className={`oe-filters${filterOpen ? " oe-filters-open" : ""}`} aria-label={t(language, "filters")}>
          <div className="oe-filter-heading"><h3>{t(language, "filters")}</h3><button data-science-press type="button" onClick={clearFilters}>{t(language, "clearFilters")}</button></div>
          <div className="oe-field"><label htmlFor="oe-category">{t(language, "category")}</label><select id="oe-category" value={filters.category} onChange={(event) => updateFilter("category", event.target.value as Filters["category"])}><option value="All">{t(language, "allCategories")}</option>{categories.map((category) => <option key={category} value={category}>{translatedCategory(category, language)}</option>)}</select></div>
          <div className="oe-field"><label htmlFor="oe-region">{t(language, "region")}</label><select id="oe-region" value={filters.region} onChange={(event) => { setFilters((current) => ({ ...current, region: event.target.value as Filters["region"], city: "" })); }}><option value="All">{t(language, "allGta")}</option>{regions.map((region) => <option key={region}>{region}</option>)}</select></div>
          <div className="oe-field"><label htmlFor="oe-city">{t(language, "city")}</label><select id="oe-city" value={filters.city} onChange={(event) => updateFilter("city", event.target.value)}><option value="">{t(language, "allCities")}</option>{cityOptions.map((city) => <option key={city}>{city}</option>)}</select></div>
          <div className="oe-field"><label htmlFor="oe-age">{t(language, "age")}</label><input id="oe-age" type="number" min="0" max="99" inputMode="numeric" value={filters.age} onChange={(event) => updateFilter("age", event.target.value)} placeholder={t(language, "any")} /></div>
          <details className="oe-more-filters"><summary data-science-press>{t(language, "showFilters")}<ChevronDown size={17} aria-hidden="true" /></summary><div>
            <div className="oe-field"><label htmlFor="oe-program-language">{t(language, "programLanguage")}</label><select id="oe-program-language" value={filters.language} onChange={(event) => updateFilter("language", event.target.value as Filters["language"])}><option value="all">{t(language, "any")}</option>{languagePreferenceOrder.map((code) => <option key={code} value={code}>{languageMeta[code].native}</option>)}</select></div>
            <fieldset><legend>{t(language, "equity")}</legend>{toggles.slice(0, 3).map(([key, label]) => <label key={key} className="oe-check"><input type="checkbox" checked={filters[key]} onChange={(event) => updateFilter(key, event.target.checked)} /><span>{t(language, label)}</span></label>)}</fieldset>
            <fieldset><legend>{t(language, "highSchool")}</legend>{toggles.slice(3).map(([key, label]) => <label key={key} className="oe-check"><input type="checkbox" checked={filters[key]} onChange={(event) => updateFilter(key, event.target.checked)} /><span>{t(language, label)}</span></label>)}</fieldset>
            <fieldset><legend>{t(language, "distance")}</legend><div className="oe-field"><label htmlFor="oe-postal">{t(language, "postal")}</label><input id="oe-postal" type="text" value={filters.postalCode} onChange={(event) => setFilters((current) => ({ ...current, postalCode: event.target.value.toUpperCase(), nearMe: false }))} placeholder="M5T" maxLength={7} autoComplete="postal-code" aria-describedby="oe-postal-help" /></div><p className="oe-hint" id="oe-postal-help" lang="en">Enter the first 3 characters. Approximate distance from supported GTA postal areas.</p>{filters.postalCode.length >= 3 && !location && <p className="oe-inline-notice" role="status" lang="en">This postal area is not in our distance lookup. Choose a city instead.</p>}<button data-science-press className="oe-location-button" type="button" onClick={useLocation} disabled={locating}><LocateFixed size={16} aria-hidden="true" />{locating ? <span lang="en">Finding your location…</span> : t(language, "nearMe")}</button>{locationNotice && <p className="oe-inline-notice" role="status" lang="en">{locationNotice}</p>}<div className="oe-field"><label htmlFor="oe-distance">{t(language, "distance")}</label><select id="oe-distance" value={filters.distanceKm} onChange={(event) => updateFilter("distanceKm", Number(event.target.value))}>{[5, 10, 25, 50, 100].map((distance) => <option value={distance} key={distance} lang="en">Within {distance} km</option>)}</select></div></fieldset>
          </div></details>
          <button data-science-press type="button" className="oe-mobile-apply" onClick={() => setFilterOpen(false)}>{t(language, "applyFilters")}<ArrowRight size={17} aria-hidden="true" /></button>
          <p className="oe-filter-note" lang="en"><Check size={17} aria-hidden="true" />Every listing is free to join.<br />Always check the provider’s details.</p>
        </aside>}
        {landing && <div className="oe-discovery-map"><span className="oe-map-badge"><Map size={18} aria-hidden="true" /><span lang="en">Map preview</span></span><a className="oe-map-skip" href="#oe-results" lang="en">Skip map to opportunity list</a>{now ? <ExplorerMap items={results} onSelect={openDetail} language={language} /> : <div className="oe-map-placeholder" role="status" lang="en">Loading the neighbourhood…</div>}</div>}
        <div className="oe-results" id="oe-results">
          {landing && <div className="oe-landing-results-heading" lang="en"><h3>Opportunities to explore</h3><a href={browseHref}>Browse all<ArrowRight size={17} aria-hidden="true" /></a></div>}
          {chips.length > 0 && <div className="oe-active-filters" aria-label={t(language, "filters")}>{chips.map((chip) => <button data-science-press type="button" key={chip.key} onClick={chip.reset} aria-label={`${t(language, "clearFilters")}: ${chip.label}`}>{chip.label}<X size={14} aria-hidden="true" /></button>)}<button data-science-press className="oe-clear-all" type="button" onClick={clearFilters}>{t(language, "clearFilters")}</button></div>}
          <div className="oe-result-toolbar"><p role="status" aria-live="polite" aria-atomic="true" lang={!now ? "en" : language}>{!now ? "Loading opportunities…" : <><strong>{results.length}</strong> {t(language, "results")}</>}</p><div className="oe-result-actions"><div className="oe-sort" lang="en"><label className="oe-sr-only" htmlFor="oe-sort">Sort opportunities</label><select id="oe-sort" value={sort} onChange={(event) => setSort(event.target.value as SortOrder)}><option value="soonest">Starting soon</option><option value="recent">Recently checked</option><option value="title">A to Z</option>{location && <option value="distance">Nearest first</option>}</select></div>{!landing && <div className="oe-view-toggle" role="group" aria-label={t(language, "viewMode")}><button data-science-press type="button" aria-pressed={view === "list"} aria-label={t(language, "list")} onClick={() => setView("list")}><List size={18} aria-hidden="true" /><span>{t(language, "list")}</span></button><button data-science-press type="button" aria-pressed={view === "map"} aria-label={t(language, "map")} onClick={() => setView("map")}><Map size={18} aria-hidden="true" /><span>{t(language, "map")}</span></button></div>}</div></div>
          <div className="oe-source-status" lang="en"><p>{!now ? "Loading the published snapshot…" : available.length > 0 ? <>{available.length} published listings · {coverage}<br />Last source check: {shortDate(latestCheck, language)}.</> : "No current listings in this published snapshot."}</p><button data-science-press type="button" onClick={() => window.location.reload()} title="Reload this page for the latest published listings."><RefreshCw size={14} aria-hidden="true" />Refresh listings</button></div>
          {storageNotice && <p className="oe-inline-notice" role="status" lang="en">{storageNotice}</p>}
          {savedOnly && now && <p className="oe-saved-note" lang="en"><Bookmark size={16} aria-hidden="true" />No account needed. Saved opportunities stay in this browser.{pastSavedCount > 0 && ` ${pastSavedCount} past or unavailable ${pastSavedCount === 1 ? "listing is" : "listings are"} kept below.`}</p>}
          {staleCount > 0 && <p className="oe-data-note" lang="en">Some listings were last checked more than 14 days ago. Confirm dates and spaces with the provider.</p>}
          {!now ? <div className="oe-loading" role="status" lang="en"><Search size={24} aria-hidden="true" /><p>Finding your next opportunity…</p></div> : !results.length ? <div className="oe-empty" lang="en"><div className="oe-empty-icon">{savedOnly ? <Bookmark size={27} aria-hidden="true" /> : <Search size={27} aria-hidden="true" />}</div><h3>{savedOnly && !savedCount ? pastSavedCount > 0 ? "Your saved listings are no longer current." : "Your next great find belongs here." : "A different search might open a door."}</h3><p>{savedOnly && !savedCount ? pastSavedCount > 0 ? "Your past or unavailable saves are kept below. Remove them when you’re ready, or explore something new." : "Tap the bookmark on any opportunity to keep it here. Past events are kept separately." : available.length === 0 ? "Our current listings have ended or are awaiting review. Explore the official provider calendars while new opportunities are checked." : "Try a nearby city, another interest, or fewer filters. Only active listings appear here."}</p>{chips.length > 0 ? <button data-science-press className="oe-primary" type="button" onClick={clearFilters} lang={language}>{t(language, "clearFilters")}<ArrowRight size={17} aria-hidden="true" /></button> : <a className="oe-primary" href={savedOnly ? "/opportunities/" : "https://www.torontopubliclibrary.ca/programs-and-classes/"} {...(!savedOnly ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{savedOnly ? "Find opportunities" : "Browse library programs"}<ArrowRight size={17} aria-hidden="true" /></a>}</div> : <>
            {!landing && view === "map" && <ExplorerMap items={results} onSelect={openDetail} language={language} />}
            <div className={`oe-card-grid${view === "map" ? " oe-card-grid-map" : ""}`}>
              {visibleResults.map((item) => <OpportunityCard key={item.id} item={item} language={language} saved={savedIds.includes(item.id)} onSave={() => toggleSave(item)} onOpen={() => openDetail(item)} location={location} now={now} />)}
            </div>
            {visibleResults.length < results.length && <div className="oe-load-more" lang="en"><p>Showing {visibleResults.length} of {results.length}</p><button data-science-press type="button" onClick={() => setPage((current) => current + 1)}>Show more opportunities<ArrowDown size={17} aria-hidden="true" /></button></div>}
          </>}
          {savedOnly && now && unavailableSaved.length > 0 && <section className="oe-unavailable" lang="en" aria-labelledby="oe-unavailable-title"><div className="oe-unavailable-heading"><div><h3 id="oe-unavailable-title">Past & unavailable saves</h3><p>These listings have ended or are awaiting review. Your bookmarks stay here until you remove them.</p></div><button data-science-press type="button" onClick={() => persistSaves(savedIds.filter((id) => availableIds.has(id)), "Past and unavailable saves removed.")}>Clear unavailable saves</button></div><ul>{unavailableSaved.map((id) => { const known = opportunities.find((item) => item.id === id); return <li key={id}><div><strong>{known?.title ?? "Previously saved listing"}</strong><span>{known ? `${known.provider} · ${shortDate(known.startDate, language)}` : "This listing is no longer in the published directory."}</span></div><button data-science-press type="button" onClick={() => persistSaves(savedIds.filter((savedId) => savedId !== id), `${known?.title ?? "Previously saved listing"} removed from saved opportunities.`)} aria-label={`Remove ${known?.title ?? "previously saved listing"}`}><X size={16} aria-hidden="true" />Remove</button></li>; })}</ul></section>}
          <div className="oe-directory-end" lang="en"><span>Curiosity has a place here.</span><p>Know a free opportunity we’re missing? <a href="/community-hosts/">Share it with the community<ArrowRight size={14} aria-hidden="true" /></a></p></div>
        </div>
      </div>
      <span className="oe-sr-only" role="status" aria-live="polite" lang="en">{saveAnnouncement}</span>
      {saveFeedback && !selected && <div key={saveFeedback.sequence} className="oe-save-feedback" aria-hidden="true" lang="en"><Check size={20} /><span>{saveFeedback.text}</span></div>}
      {selected && <dialog ref={dialogRef} className="oe-detail" aria-labelledby="oe-detail-title" onCancel={(event) => { event.preventDefault(); closeDetail(); }} onClose={closeDetail} onClick={(event) => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDetail(); } }}><DetailContent item={selected} language={language} saved={savedIds.includes(selected.id)} onSave={() => toggleSave(selected)} onClose={closeDetail} now={now} /></dialog>}
    </section>
  );
}

function OpportunityCard({ item, language, saved, onSave, onOpen, location, now }: { item: Opportunity; language: LanguageCode; saved: boolean; onSave: () => void; onOpen: () => void; location: Coordinates | null; now?: Date }) {
  const stale = isOpportunityVerificationStale(item.lastVerified, now);
  return <article className="oe-card"><div className="oe-card-top"><span className="oe-category">{translatedCategory(item.categories.find((category) => category !== "STEM") ?? item.categories[0], language)}</span><button data-science-press type="button" className={`oe-bookmark${saved ? " oe-bookmarked" : ""}`} aria-label={`${t(language, saved ? "saved" : "save")}: ${item.title}`} aria-pressed={saved} onClick={onSave}><Bookmark data-science-icon size={20} fill={saved ? "currentColor" : "none"} aria-hidden="true" /></button></div><p className="oe-provider" lang="en">{item.provider}</p><h3 lang="en"><button data-science-press type="button" onClick={onOpen}>{item.title}</button></h3><p className="oe-summary">{translatedSummary(item, language)}</p><ul className="oe-card-facts"><li><CalendarDays size={16} aria-hidden="true" /><span lang="en">{formatDateRange(item.startDate, item.endDate)}</span></li><li><MapPin size={16} aria-hidden="true" /><span lang="en">{item.virtual ? "Online" : item.city}{location && !item.virtual ? ` · ${Math.round(haversineKm(location, item))} km away` : ""}</span></li><li><UsersRound size={16} aria-hidden="true" /><span>{t(language, "ages")} {ageRange(item)}{item.volunteerHoursEligible ? ` · ${t(language, "volunteerHours")}` : ""}</span></li></ul><div className="oe-card-bottom"><div><span className="oe-free"><span aria-hidden="true" />{t(language, "verifiedFree")}</span><span className="oe-checked" lang="en">{stale ? "Check latest details" : "Source checked"} · {shortDate(item.lastVerified, language)}</span></div><button data-science-press type="button" className="oe-details-link" onClick={onOpen} lang="en" aria-label={`View details for ${item.title}`}>Details<ArrowRight data-science-icon size={16} aria-hidden="true" /></button></div></article>;
}

function DetailContent({ item, language, saved, onSave, onClose, now }: { item: Opportunity; language: LanguageCode; saved: boolean; onSave: () => void; onClose: () => void; now?: Date }) {
  const registrationUrl = externalUrl(item.registrationUrl);
  const sourceUrl = externalUrl(item.sourceUrl);
  const downloadCalendar = () => {
    const blob = new Blob([createCalendarFile(item)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = `${item.id.replace(/[^a-z0-9-]/gi, "-")}.ics`;
    document.body.append(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const facts = [
    [t(language, "date"), formatDateRange(item.startDate, item.endDate)],
    [t(language, "ages"), ageRange(item)],
    [t(language, "city"), item.virtual ? "Online" : `${item.address} · ${item.city}`],
    [t(language, "deadline"), formatDeadline(item.deadline)],
    [t(language, "languages"), item.languages.map((code) => languageMeta[code].native).join(", ")],
    [t(language, "commitment"), item.commitment],
    [t(language, "access"), item.accessibility.join(" · ")],
    [t(language, "equipment"), item.equipment], [t(language, "food"), item.food], [t(language, "capacity"), item.capacity]
  ].filter(([, value]) => value);
  return <div className="oe-detail-content"><div className="oe-detail-top"><span className="oe-category">{translatedCategory(item.categories.find((category) => category !== "STEM") ?? item.categories[0], language)}</span><button data-science-press type="button" className="oe-dialog-close" onClick={onClose} autoFocus lang="en" aria-label="Close opportunity details"><X size={22} aria-hidden="true" /></button></div><p className="oe-provider" lang="en">{item.provider}</p><h2 id="oe-detail-title" lang="en">{item.title}</h2><p className="oe-detail-summary">{translatedSummary(item, language)}</p>{language !== "en" && <p className="oe-hint">{t(language, "translationNote")}</p>}<div className="oe-detail-free" lang="en"><Check size={19} aria-hidden="true" /><div><strong lang={language}>{t(language, "verifiedFree")}</strong><p>{item.freeStatusProof || "The provider lists this opportunity as free. Confirm eligibility and any equipment needs before registering."}</p></div></div><dl className="oe-detail-facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd lang="en">{value}</dd></div>)}</dl><p className="oe-detail-verified" lang="en">{isOpportunityVerificationStale(item.lastVerified, now) ? "Details need a fresh check." : "Source last checked"} {shortDate(item.lastVerified, language)}. Registration, spaces, and any changes are confirmed by the provider.</p><div className="oe-detail-actions">{registrationUrl ? <a data-science-press href={registrationUrl} target="_blank" rel="noopener noreferrer" className="oe-primary">{t(language, "registerApply")}<ExternalLink size={16} aria-hidden="true" /></a> : <p lang="en">Registration link unavailable. Visit the official source for details.</p>}<button data-science-press type="button" className="oe-secondary" onClick={onSave} aria-pressed={saved}><Bookmark data-science-icon size={18} fill={saved ? "currentColor" : "none"} aria-hidden="true" />{saved ? t(language, "saved") : t(language, "saveOnThisDevice")}</button></div><div className="oe-detail-links"><button data-science-press type="button" onClick={downloadCalendar}><CalendarPlus size={16} aria-hidden="true" />{t(language, "calendar")}</button>{!item.virtual && <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${item.address}, ${item.city}, Ontario`)}`} target="_blank" rel="noopener noreferrer"><MapPin size={16} aria-hidden="true" />{t(language, "directions")}</a>}{sourceUrl && <a href={sourceUrl} target="_blank" rel="noopener noreferrer">{t(language, "source")}<ExternalLink size={14} aria-hidden="true" /></a>}<a href={reportUrl(item)} target="_blank" rel="noopener noreferrer">{t(language, "report")}<ExternalLink size={14} aria-hidden="true" /></a></div></div>;
}
