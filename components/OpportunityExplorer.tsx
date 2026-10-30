"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Bookmark, CalendarDays, CalendarPlus, Check, ChevronDown, Code2, Compass, ExternalLink, FlaskConical, List, LocateFixed, Map, MapPin, Search, SlidersHorizontal, RefreshCw, UsersRound, X } from "lucide-react";
import { categories, cityOptions, opportunities, regions } from "@/lib/data";
import { t, translatedCategory, translatedSummary } from "@/lib/i18n";
import { readSavedFilters, saveNamedFilter, deleteNamedFilter, SAVED_FILTERS_CHANGED, type SavedFilter } from "@/lib/savedFilters";
import { DEFAULT_FILTERS, filtersFromUrl, URL_TOGGLES } from "@/lib/explorerFilters";
import { legalConfig } from "@/lib/legal";
import { isOpportunityVerificationStale, publicOpportunities } from "@/lib/opportunityStatus";
import type { Filters, LanguageCode, Opportunity } from "@/lib/types";
import { coordinatesFromPostal, createCalendarFile, filterOpportunities, formatDateRange, formatDeadline, haversineKm, type Coordinates } from "@/lib/utils";
import { GtaArtwork } from "./GtaArtwork";
import { ExplorerMap } from "./ExplorerMap";
import { hasUnresolvedProximityQuery } from "@/lib/search";
import { useLibraryCatalog } from "./useLibraryCatalog";
import { useOpportunitySearch } from "./useOpportunitySearch";
import { stripPrivateSupportParams } from "@/lib/scopedPresets/localOnlyUrl";
import { AccessibilityFilter } from "./AccessibilityFilter";
import { AccessibilityDetails } from "./AccessibilityDetails";
import { ScopedSavedFilters } from "./ScopedSavedFilters";
import { useScopedSavedFilters } from "./useScopedSavedFilters";
import { emptyAccessibilitySelection, matchAccessibilitySelection, supportCategoryLabels } from "@/lib/accessibilitySelection";
import "./AccessibilitySupport.css";
import "./ScopedSavedFilters.css";
import "./OpportunityExplorer.css";

const SAVED_KEY = "gta-stem-opportunities-saved-anonymous";
const PAGE_SIZE = 12;

type ExplorerProps = {
  supportPresetsEnabled?: boolean;
  language: LanguageCode;
  initialFilters?: Partial<Filters>;
  highSchool?: boolean;
  savedOnly?: boolean;
  landing?: boolean;
  onSavedCountChange?: (count: number) => void;
};
type SortOrder = "relevance" | "soonest" | "recent" | "title" | "distance";

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
function programExcerpt(item: Opportunity, limit = 320) {
  const text = (item.description || item.summary).replace(/\s+/g, " ").trim();
  if (text.length <= limit) return text;
  const sentence = text.slice(0, limit + 1).match(/[\s\S]*[.!?](?=\s|$)/)?.[0];
  if (sentence && sentence.length >= limit * 0.4) return sentence.trimEnd();
  const boundary = text.lastIndexOf(" ", limit);
  return `${text.slice(0, boundary > 0 ? boundary : limit).replace(/[,:;—–-]+$/, "")}…`;
}
function freeProgramNote(item: Opportunity) {
  const genericFeedProof = `Official ${item.organization} public event feed. No-cost library programs only; items with charges, full registration, cancellation, or exhibit-only pages are filtered out before publishing.`;
  if (item.freeStatusProof === genericFeedProof || item.freeStatusProof === genericFeedProof.replace(", cancellation, or exhibit-only pages", ", or cancellation")) return "Listed as free by the library. Check availability and registration details with the provider.";
  return item.freeStatusProof || "The provider lists this opportunity as free. Confirm eligibility and any equipment needs before registering.";
}
function originalSummary(item: Opportunity, language: LanguageCode) { return language === "en" || Boolean(item.ageLabel) || item.category === "Library & Community"; }
function ageRange(item: Opportunity) { if (item.ageLabel) return item.ageLabel.replace(/^ages?\s*/i, ""); return item.ages.max ? `${item.ages.min}–${item.ages.max}` : `${item.ages.min}+`; }
function reportUrl(item: Opportunity) {
  const url = new URL(legalConfig.supportIssueUrl);
  url.searchParams.set("title", `Listing update: ${item.title}`);
  url.searchParams.set("listing", item.registrationUrl);
  return url.href;
}

export function OpportunityExplorer({ supportPresetsEnabled = false, language, initialFilters = {}, highSchool = false, savedOnly = false, landing = false, onSavedCountChange }: ExplorerProps) {
  const [filters, setFilters] = useState<Filters>(() => ({ ...DEFAULT_FILTERS, ...initialFilters, language: "all" }));
  const [support, setSupport] = useState(emptyAccessibilitySelection);
  const [supportError, setSupportError] = useState("");
  const [showUnconfirmed, setShowUnconfirmed] = useState(false);
  const scoped = useScopedSavedFilters({ enabled: supportPresetsEnabled, scope: highSchool ? "teen-activities" : "browse", criteria: { kind: "activity", filters, support }, onApply: value => {
    if (value.kind !== "activity") return false;
    setFilters({ ...value.filters }); setSupport(value.support); setSupportError(""); setDeviceLocation(null); return true;
  } });
  const [urlReady, setUrlReady] = useState(false);
  const [namedFilters, setNamedFilters] = useState<SavedFilter[]>([]);
  const [selectedFilterId, setSelectedFilterId] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterNotice, setFilterNotice] = useState("");
  const [filterStorageError, setFilterStorageError] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState<"list" | "map">("map");
  const [sort, setSort] = useState<SortOrder>("relevance");
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
  const { events: libraryEvents, status: libraryStatus, retry: retryLibraryCatalog } = useLibraryCatalog();
  const catalog = useMemo(() => {
    const merged = new globalThis.Map(opportunities.map(item => [item.id, item]));
    libraryEvents.forEach(item => { if (!merged.has(item.id)) merged.set(item.id, item); });
    return [...merged.values()];
  }, [libraryEvents]);

  useEffect(() => {
    const readUrl = () => {
      let next = filtersFromUrl(JSON.parse(initialKey), window.location.search);
      setSelectedFilterId(""); setFilterName("");
      if (supportPresetsEnabled && new URLSearchParams(window.location.search).has("accessSupport")) {
        setSupportError("Support choices from a page address are not applied. Clear support filters, choose them here, or load a saved filter from this browser.");
        try { window.history.replaceState(window.history.state, "", stripPrivateSupportParams(new URL(window.location.href))); } catch { /* Do not copy the private parameter to another URL. */ }
      }
      try {
        if (supportPresetsEnabled) { setFilters(next); setDeviceLocation(null); return; }
        const records = readSavedFilters(window.localStorage);
        setNamedFilters(records); setFilterStorageError("");
        const id = new URLSearchParams(window.location.search).get("savedFilter");
        const saved = records.find(item => item.id === id && item.highSchool === highSchool);
        if (saved) { next = { ...saved.filters }; setSelectedFilterId(saved.id); setFilterName(saved.name); }
        else if (id) setFilterNotice("This saved filter is unavailable in this browser or belongs to a different page. You can still browse.");
      } catch (error) { setFilterStorageError(error instanceof Error ? error.message : "Saved filters could not load. Your existing data has not been changed."); }
      setFilters(next); setDeviceLocation(null);
    };
    readUrl();
    setUrlReady(true);
    window.addEventListener("popstate", readUrl);
    return () => window.removeEventListener("popstate", readUrl);
  }, [initialKey, highSchool, supportPresetsEnabled]);
  useEffect(() => {
    if (!urlReady) return;
    const url = stripPrivateSupportParams(new URL(window.location.href));
    const values: Record<string, string> = {
      q: filters.query, category: filters.category === "All" ? "" : filters.category,
      region: filters.region === "All" ? "" : filters.region, city: filters.city,
      age: filters.age, programLanguage: "",
      postal: filters.postalCode, distance: locationDistanceParameter(filters)
    };
    Object.entries(URL_TOGGLES).forEach(([param, key]) => { values[param] = filters[key] ? "1" : ""; });
    Object.entries(values).forEach(([key, value]) => { if (value) url.searchParams.set(key, value); else url.searchParams.delete(key); });
    const selectedPreset = namedFilters.find(item => item.id === selectedFilterId);
    if (!supportPresetsEnabled && selectedPreset && JSON.stringify(selectedPreset.filters) === JSON.stringify(filters)) url.searchParams.set("savedFilter", selectedPreset.id);
    else if (!supportPresetsEnabled) url.searchParams.delete("savedFilter");
    if (url.href !== window.location.href) window.history.replaceState(window.history.state, "", url);
  }, [filters, urlReady, selectedFilterId, namedFilters, supportPresetsEnabled]);
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

  useEffect(() => {
    if (supportPresetsEnabled) return;
    const sync = () => {
      try { setNamedFilters(readSavedFilters(window.localStorage)); setFilterStorageError(""); }
      catch (error) { setFilterStorageError(error instanceof Error ? error.message : "Saved filters could not load."); }
    };
    window.addEventListener("storage", sync);
    window.addEventListener(SAVED_FILTERS_CHANGED, sync);
    return () => { window.removeEventListener("storage", sync); window.removeEventListener(SAVED_FILTERS_CHANGED, sync); };
  }, [supportPresetsEnabled]);
  useEffect(() => {
    if (urlReady && selectedFilterId && !namedFilters.some(item => item.id === selectedFilterId)) {
      setSelectedFilterId(""); setFilterName(""); setFilterNotice("This filter was removed in another tab. Your current search stays available.");
    }
  }, [namedFilters, selectedFilterId, urlReady]);
  const selectedPreset = namedFilters.find(item => item.id === selectedFilterId);
  const presetDirty = !!selectedPreset && (JSON.stringify(selectedPreset.filters) !== JSON.stringify(filters) || selectedPreset.name !== filterName.trim());
  const detachPreset = () => { setSelectedFilterId(""); setFilterName(""); setFilterNotice(""); };
  const applyPreset = (id: string) => {
    if (!id) { detachPreset(); return; }
    try {
      const current = readSavedFilters(window.localStorage);
      setNamedFilters(current);
      const preset = current.find(item => item.id === id && item.highSchool === highSchool);
      if (!preset) throw new Error("That saved filter is no longer available. Your current search has not changed.");
      setFilters({ ...preset.filters }); setDeviceLocation(null); setSelectedFilterId(id); setFilterName(preset.name);
      setFilterNotice(`Applied “${preset.name}”. Results update immediately.`); setFilterStorageError("");
    } catch (error) { setFilterStorageError(error instanceof Error ? error.message : "The filter could not be applied."); }
  };
  const persistPreset = () => {
    try {
      const updated = saveNamedFilter(window.localStorage, { id: selectedFilterId || undefined, name: filterName, filters, highSchool });
      const saved = updated.find(item => selectedFilterId ? item.id === selectedFilterId : item.name === filterName.trim() && item.highSchool === highSchool);
      setNamedFilters(updated);
      if (saved) { setSelectedFilterId(saved.id); setFilterName(saved.name); }
      setFilterNotice(selectedFilterId ? "Saved filter updated on this browser." : "Filter saved on this browser."); setFilterStorageError("");
      window.dispatchEvent(new Event(SAVED_FILTERS_CHANGED));
    } catch (error) { setFilterNotice(error instanceof Error ? error.message : "The filter could not be saved. Existing data has not been changed."); }
  };
  const removePreset = () => {
    if (!selectedFilterId) return;
    try {
      setNamedFilters(deleteNamedFilter(window.localStorage, selectedFilterId)); detachPreset();
      setFilterNotice("Saved filter deleted. Your current search stays available."); setFilterStorageError("");
      window.dispatchEvent(new Event(SAVED_FILTERS_CHANGED));
    } catch (error) { setFilterNotice(error instanceof Error ? error.message : "The filter could not be deleted."); }
  };

  const available = useMemo(() => now ? publicOpportunities(catalog, now) : [], [now, catalog]);
  const coverage = useMemo(() => [...new Set(available.map((item) => item.city))].sort().join(" & "), [available]);
  const latestCheck = useMemo(() => available.reduce((latest, item) => Date.parse(item.lastVerified) > Date.parse(latest || "1970-01-01") ? item.lastVerified : latest, ""), [available]);
  const availableIds = useMemo(() => new Set(available.map((item) => item.id)), [available]);
  const catalogById = useMemo(() => new globalThis.Map(catalog.map((item) => [item.id, item])), [catalog]);
  const savedCount = savedIds.filter((id) => availableIds.has(id)).length;
  // A failed/delayed optional catalog cannot prove that a bookmark expired.
  const uncheckedSaved = savedIds.filter((id) => libraryStatus !== "ready" && !catalogById.has(id));
  const unavailableSaved = savedIds.filter((id) => !availableIds.has(id) && (libraryStatus === "ready" || catalogById.has(id)));
  const pastSavedCount = unavailableSaved.length;
  useEffect(() => { savedCountCallback.current?.(savedIds.length); }, [savedIds]);
  const location = useMemo(() => filters.nearMe ? deviceLocation : coordinatesFromPostal(filters.postalCode), [filters.nearMe, filters.postalCode, deviceLocation]);
  useEffect(() => {
    setNearbyInput(filters.city || filters.postalCode);
    setNearbyError("");
  }, [filters.city, filters.postalCode]);

  const eligible = useMemo(() => {
    const candidates = available.filter((item) => (!savedOnly || savedIds.includes(item.id)) && (!highSchool || (
      item.ages.min <= 17 && (item.ages.max ?? 99) >= 14
    )));
    return filterOpportunities(candidates, { ...filters, query: "" }, null, { searchLanguage: language }).filter((item) => !location || item.virtual || haversineKm(location, item) <= filters.distanceKm);
  }, [available, filters, location, savedIds, savedOnly, highSchool, language]);
  const { results: searchMatches, searching, error: searchError } = useOpportunitySearch(catalog, eligible, filters.query, language, Boolean(location || filters.city));
  const results = useMemo(() => {
    const result = supportPresetsEnabled ? searchMatches.filter(item => !supportError && !!now && matchAccessibilitySelection(item, support, { now: now.toISOString() }).matches) : [...searchMatches];
    if (sort === "soonest" || (sort === "distance" && !location)) result.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate));
    if (sort === "title") result.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "recent") result.sort((a, b) => Date.parse(b.lastVerified) - Date.parse(a.lastVerified));
    if (sort === "distance" && location) result.sort((a, b) => haversineKm(location, a) - haversineKm(location, b));
    return result;
  }, [searchMatches, sort, location, supportPresetsEnabled, support, supportError, now]);
  const unconfirmedResults = useMemo(() => !supportPresetsEnabled || supportError || !support.categories.length || !now ? [] : searchMatches.filter(item => {
    const match = matchAccessibilitySelection(item, support, { now: now.toISOString() });
    return !match.matches && match.decisions.every(d => d.status !== "not-available");
  }), [searchMatches, supportPresetsEnabled, supportError, support, now]);
  const clearSupport = () => { setSupport(emptyAccessibilitySelection()); setSupportError(""); setShowUnconfirmed(false); };
  const resultsPending = searching || (libraryStatus === "loading" && results.length === 0);
  const staleCount = results.filter((item) => isOpportunityVerificationStale(item.lastVerified, now)).length;
  const visibleResults = results.slice(0, PAGE_SIZE * page);
  useEffect(() => { setPage(1); }, [filters, sort, savedOnly, highSchool, support]);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => { setFilterNotice(""); setFilters((current) => ({ ...current, [key]: value })); };
  const clearFilters = () => { if (supportPresetsEnabled) scoped.onSelect(""); clearSupport(); detachPreset(); setFilters({ ...DEFAULT_FILTERS }); setLocationNotice(""); setNearbyInput(""); setNearbyError(""); setDeviceLocation(null); };
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
      // The visible storage notice already announces this status.
      setSaveAnnouncement("");
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

  const chips: { key: string; label: string; reset: () => void }[] = [];
  if (filters.query) chips.push({ key: "query", label: `“${filters.query}”`, reset: () => updateFilter("query", "") });
  if (filters.category !== "All") chips.push({ key: "category", label: translatedCategory(filters.category, language), reset: () => updateFilter("category", "All") });
  if (filters.region !== "All") chips.push({ key: "region", label: filters.region, reset: () => updateFilter("region", "All") });
  if (filters.city) chips.push({ key: "city", label: filters.city, reset: () => updateFilter("city", "") });
  if (filters.age) chips.push({ key: "age", label: `${t(language, "age")} ${filters.age}`, reset: () => updateFilter("age", "") });
  if (location) chips.push({ key: "distanceKm", label: `${filters.distanceKm} km · ${location.label ?? "your area"}`, reset: () => setFilters((current) => ({ ...current, nearMe: false, postalCode: "" })) });
  const toggles: [ToggleFilter, "black" | "girls" | "indigenous" | "volunteerHours" | "coop" | "mentorship" | "leadership"][] = [["blackFocused", "black"], ["girlsFocused", "girls"], ["indigenousFocused", "indigenous"], ["volunteerHours", "volunteerHours"], ["coop", "coop"], ["mentorship", "mentorship"], ["leadership", "leadership"]];
  if (supportPresetsEnabled) support.categories.forEach(category => chips.push({ key: `support-${category}`, label: supportCategoryLabels[category], reset: () => setSupport(current => ({ ...current, categories: current.categories.filter(c => c !== category) })) }));
  toggles.forEach(([key, label]) => { if (filters[key]) chips.push({ key, label: t(language, label), reset: () => updateFilter(key, false) }); });
  const browseParams = new URLSearchParams();
  const browseValues = {
    q: filters.query, category: filters.category === "All" ? "" : filters.category,
    region: filters.region === "All" ? "" : filters.region, city: filters.city,
    age: filters.age,
    postal: filters.postalCode, distance: locationDistanceParameter(filters)
  };
  Object.entries(browseValues).forEach(([key, value]) => { if (value) browseParams.set(key, value); });
  Object.entries(URL_TOGGLES).forEach(([param, key]) => { if (filters[key]) browseParams.set(param, "1"); });
  const browseHref = `/opportunities/${browseParams.size ? `?${browseParams}` : ""}`;
  const primaryInterests = ["Coding & Robotics", "Science & Engineering"] as const;

  return (
    <section className={`oe-explorer${landing ? " oe-landing" : ""}`} id="opportunities" aria-labelledby="oe-heading" data-library-status={libraryStatus} data-searching={resultsPending ? "true" : "false"}>
      <h2 id="oe-heading" className="oe-sr-only">{savedOnly ? t(language, "saved") : highSchool ? t(language, "highSchool") : t(language, "navOpportunities")}</h2>
      {!landing && <div className="oe-search-row">
        <div className="oe-search"><Search size={21} aria-hidden="true" /><label className="oe-sr-only" htmlFor="oe-search">{t(language, "search")}</label><input id="oe-search" type="search" value={filters.query} onChange={(event) => updateFilter("query", event.target.value)} placeholder={t(language, "searchPlaceholder")} autoComplete="off" maxLength={250} dir="auto" enterKeyHint="search" spellCheck aria-describedby="oe-search-help" /></div>
        <button data-science-press type="button" className="oe-filter-toggle" aria-expanded={filterOpen} aria-controls="oe-filters" onClick={() => setFilterOpen((open) => !open)}><GtaArtwork role="filters" />{t(language, "filters")}{chips.length > 0 && <span>{chips.length}</span>}<ChevronDown size={16} aria-hidden="true" /></button>
      </div>}
      {!landing && <p className="search-help oe-search-help" id="oe-search-help" lang="en" dir="ltr">Search topics, libraries or cities. Small spelling mistakes are okay.</p>}
      {hasUnresolvedProximityQuery(filters.query) && !location && !filters.city && <p className="oe-inline-notice" lang="en" dir="ltr">For nearby results, choose a city or postal code in the location filters.</p>}
      {libraryStatus === "loading" && <p className="oe-catalog-notice" role="status" lang="en">Loading more free library events…</p>}
      {libraryStatus === "error" && <div className="oe-catalog-notice" role="status" lang="en"><p>More library events could not load. You can still use the available listings.</p><button data-science-press type="button" onClick={retryLibraryCatalog}>Try library events again</button><a href="/programs/#provider-calendars">Provider calendars</a></div>}
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
          {supportPresetsEnabled ? <><ScopedSavedFilters {...scoped} /><AccessibilityFilter value={support} onChange={setSupport} />{supportError && <p role="alert" lang="en">{supportError}</p>}<button type="button" className="soft-button oe-clear-support" onClick={clearSupport} lang="en">Clear support filters</button></> : <>
          <section className="oe-named-filters" aria-labelledby="saved-filter-heading" lang="en">
            <h4 id="saved-filter-heading"><GtaArtwork role="saved" />Saved filters</h4>
            <div className="oe-field"><label htmlFor="saved-filter-picker">Choose a saved filter</label><select id="saved-filter-picker" value={selectedFilterId} onChange={event => applyPreset(event.target.value)}><option value="">New filter</option>{namedFilters.filter(item => item.highSchool === highSchool).map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select></div>
            {presetDirty && <p className="oe-preset-status">Unsaved changes</p>}
            <div className="oe-field"><label htmlFor="saved-filter-name">Filter name</label><input id="saved-filter-name" value={filterName} onChange={event => { setFilterName(event.target.value); setFilterNotice(""); }} maxLength={80} placeholder="e.g. Saturday science" /></div>
            <div className="oe-preset-actions"><button type="button" data-science-press onClick={persistPreset} disabled={!filterName.trim() || !!filterStorageError}>{selectedFilterId ? "Update filter" : "Save filter"}</button>{selectedFilterId && <><button type="button" onClick={detachPreset}>New filter</button><button type="button" onClick={removePreset}>Delete filter</button></>}</div>
            <p className="oe-preset-help">Stored only in this browser. Choosing a filter applies it immediately. Edits are saved only with Save or Update.</p>
            {filterNotice && <p className="oe-preset-status" role="status">{filterNotice}</p>}
            {filterStorageError && <p className="oe-preset-status" role="alert">{filterStorageError}</p>}
          </section>
          </>}
          <div className="oe-field"><label htmlFor="oe-category">{t(language, "category")}</label><select id="oe-category" value={filters.category} onChange={(event) => updateFilter("category", event.target.value as Filters["category"])}><option value="All">{t(language, "allCategories")}</option>{categories.map((category) => <option key={category} value={category}>{translatedCategory(category, language)}</option>)}</select></div>
          <div className="oe-field"><label htmlFor="oe-region">{t(language, "region")}</label><select id="oe-region" value={filters.region} onChange={(event) => { setFilters((current) => ({ ...current, region: event.target.value as Filters["region"], city: "" })); }}><option value="All">{t(language, "allGta")}</option>{regions.map((region) => <option key={region}>{region}</option>)}</select></div>
          <div className="oe-field"><label htmlFor="oe-city">{t(language, "city")}</label><select id="oe-city" value={filters.city} onChange={(event) => updateFilter("city", event.target.value)}><option value="">{t(language, "allCities")}</option>{cityOptions.map((city) => <option key={city}>{city}</option>)}</select></div>
          <div className="oe-field"><label htmlFor="oe-age">{t(language, "age")}</label><input id="oe-age" type="number" min="0" max="99" step="any" inputMode="decimal" aria-describedby="oe-age-help" value={filters.age} onChange={(event) => updateFilter("age", event.target.value)} placeholder={t(language, "any")} /><p className="oe-hint" id="oe-age-help" lang="en">Age in years; 0.5 means 6 months.</p></div>
          <details className="oe-more-filters"><summary data-science-press>{t(language, "showFilters")}<ChevronDown size={17} aria-hidden="true" /></summary><div>
            <fieldset><legend>{t(language, "equity")}</legend>{toggles.slice(0, 3).map(([key, label]) => <label key={key} className="oe-check"><input type="checkbox" checked={filters[key]} onChange={(event) => updateFilter(key, event.target.checked)} /><span>{t(language, label)}</span></label>)}</fieldset>
            <fieldset><legend>{t(language, "highSchool")}</legend>{toggles.slice(3).map(([key, label]) => <label key={key} className="oe-check"><input type="checkbox" checked={filters[key]} onChange={(event) => updateFilter(key, event.target.checked)} /><span>{t(language, label)}</span></label>)}</fieldset>
            <fieldset><legend>{t(language, "distance")}</legend><div className="oe-field"><label htmlFor="oe-postal">{t(language, "postal")}</label><input id="oe-postal" type="text" value={filters.postalCode} onChange={(event) => setFilters((current) => ({ ...current, postalCode: event.target.value.toUpperCase(), nearMe: false }))} placeholder="M5T" maxLength={7} autoComplete="postal-code" aria-describedby="oe-postal-help" /></div><p className="oe-hint" id="oe-postal-help" lang="en">Enter the first 3 characters. Approximate distance from supported GTA postal areas.</p>{filters.postalCode.length >= 3 && !location && <p className="oe-inline-notice" role="status" lang="en">This postal area is not in our distance lookup. Choose a city instead.</p>}<button data-science-press className="oe-location-button" type="button" onClick={useLocation} disabled={locating}><LocateFixed size={16} aria-hidden="true" />{locating ? <span lang="en">Finding your location…</span> : t(language, "nearMe")}</button>{locationNotice && <p className="oe-inline-notice" role="status" lang="en">{locationNotice}</p>}<div className="oe-field"><label htmlFor="oe-distance">{t(language, "distance")}</label><select id="oe-distance" value={filters.distanceKm} onChange={(event) => updateFilter("distanceKm", Number(event.target.value))}>{[5, 10, 25, 50, 100].map((distance) => <option value={distance} key={distance} lang="en">Within {distance} km</option>)}</select></div></fieldset>
          </div></details>
          <button data-science-press type="button" className="oe-mobile-apply" onClick={() => setFilterOpen(false)}>{t(language, "applyFilters")}<ArrowRight size={17} aria-hidden="true" /></button>
          <p className="oe-filter-note" lang="en"><Check size={17} aria-hidden="true" />Every listing is free to join.<br />Always check the provider’s details.</p>
        </aside>}
        {landing && <div className="oe-discovery-map"><span className="oe-map-badge"><Map size={18} aria-hidden="true" /><span lang="en">Map preview</span></span><a className="oe-map-skip" href="#oe-results" lang="en">Skip map to opportunity list</a>{now ? <ExplorerMap items={results} onSelect={openDetail} language={language} /> : <div className="oe-map-placeholder" role="status" lang="en">Loading the neighbourhood…</div>}</div>}
        <div className="oe-results" id="oe-results" aria-busy={resultsPending}>
          {landing && <div className="oe-landing-results-heading" lang="en"><h3>Opportunities to explore</h3><a href={browseHref}>Browse all<ArrowRight size={17} aria-hidden="true" /></a></div>}
          {supportPresetsEnabled && support.categories.length > 0 && <div className="accessibility-results-note" lang="en"><p>{support.includeOnRequest ? "Request-based matches need provider confirmation. Review the conditions in each listing." : "Only reviewed statements confirming every selected support are included."}</p>{!results.length && <p>No reviewed listings confirm all these supports.</p>}<button className="soft-button" type="button" onClick={clearSupport}>Clear support filters</button><button className="soft-button" type="button" aria-expanded={showUnconfirmed} onClick={() => setShowUnconfirmed(v => !v)}>{showUnconfirmed ? "Hide" : "Show"} listings with unconfirmed support ({unconfirmedResults.length})</button></div>}
          {chips.length > 0 && <div className="oe-active-filters" role="group" aria-label={t(language, "filters")}>{chips.map((chip) => <button data-science-press type="button" key={chip.key} lang={chip.key.startsWith("support-") ? "en" : undefined} onClick={chip.reset} aria-label={`${t(language, "clearFilters")}: ${chip.label}`}>{chip.label}<X size={14} aria-hidden="true" /></button>)}<button data-science-press className="oe-clear-all" type="button" onClick={clearFilters}>{t(language, "clearFilters")}</button></div>}
          <div className="oe-result-toolbar"><p role="status" aria-live="polite" aria-atomic="true" lang={!now ? "en" : language}>{!now || resultsPending ? "Finding opportunities…" : searchError ? "Search is unavailable" : <><strong>{results.length}</strong> {t(language, "results")}</>}</p><div className="oe-result-actions"><div className="oe-sort" lang="en"><label className="oe-sr-only" htmlFor="oe-sort">Sort opportunities</label><select id="oe-sort" value={sort} onChange={(event) => setSort(event.target.value as SortOrder)}><option value="relevance">Best match</option><option value="soonest">Starting soon</option><option value="recent">Recently checked</option><option value="title">A to Z</option>{location && <option value="distance">Nearest first</option>}</select></div>{!landing && <div className="oe-view-toggle" role="group" aria-label={t(language, "viewMode")}><button data-science-press type="button" aria-pressed={view === "list"} aria-label={t(language, "list")} onClick={() => setView("list")}><List size={18} aria-hidden="true" /><span>{t(language, "list")}</span></button><button data-science-press type="button" aria-pressed={view === "map"} aria-label={t(language, "map")} onClick={() => setView("map")}><Map size={18} aria-hidden="true" /><span>{t(language, "map")}</span></button></div>}</div></div>
          <div className="oe-source-status" lang="en"><div className={`oe-feedback-slot${saveFeedback && !selected ? " is-active" : ""}`}><p className="oe-source-meta" aria-hidden={saveFeedback && !selected ? true : undefined}>{!now ? "Loading the published snapshot…" : available.length > 0 ? <>{available.length} published listings · {coverage}<br />Last source check: <bdi lang={language} dir="auto">{shortDate(latestCheck, language)}</bdi>.</> : "No current listings in this published snapshot."}</p>{saveFeedback && !selected && <div key={saveFeedback.sequence} className="oe-save-feedback" aria-hidden="true" lang="en" dir="auto"><Check size={20} /><span>{saveFeedback.text}</span></div>}</div><button data-science-press type="button" onClick={() => window.location.reload()} title="Reload this page for the latest published listings."><RefreshCw size={14} aria-hidden="true" />Refresh listings</button></div>
          {storageNotice && <p className="oe-inline-notice" role="status" lang="en">{storageNotice}</p>}
          {now && !resultsPending && !searchError && results.length === 0 && filters.query.trim() && <div className="oe-search-options" lang="en" dir="ltr"><button data-science-press type="button" className="oe-secondary" onClick={() => updateFilter("query", "")}>Clear search, keep filters</button><a href="/programs/">Browse the program directory</a><a href="/programs/#provider-calendars">Explore more provider calendars</a></div>}
          {savedOnly && now && <p className="oe-saved-note" lang="en"><Bookmark size={16} aria-hidden="true" />No account needed. Saved opportunities stay in this browser.{uncheckedSaved.length > 0 && ` ${uncheckedSaved.length} library ${uncheckedSaved.length === 1 ? "save is" : "saves are"} waiting to be checked and remain stored.`}{pastSavedCount > 0 && ` ${pastSavedCount} past or unavailable ${pastSavedCount === 1 ? "listing is" : "listings are"} kept below.`}</p>}
          {staleCount > 0 && <p className="oe-data-note" lang="en">Some listings were last checked more than 14 days ago. Confirm dates and spaces with the provider.</p>}
          {!now || resultsPending ? <div className="oe-loading" role="status" lang="en"><Search size={24} aria-hidden="true" /><p>Finding your next opportunity…</p></div> : searchError ? <div className="oe-empty" lang="en"><h3>Search could not finish.</h3><p role="status">{searchError}</p><button data-science-press className="oe-primary" type="button" onClick={() => updateFilter("query", "")}>Clear search, keep filters</button></div> : savedOnly && !results.length && uncheckedSaved.length > 0 ? <div className="oe-empty" lang="en"><h3>Your library saves are still here.</h3><p>These saved listings could not be checked while the library catalog is unavailable. Try loading library events again above.</p></div> : !results.length ? <div className="oe-empty" lang="en"><div className="oe-empty-icon">{savedOnly ? <Bookmark size={27} aria-hidden="true" /> : <Search size={27} aria-hidden="true" />}</div><h3>{savedOnly && !savedCount ? pastSavedCount > 0 ? "Your saved listings are no longer current." : "Your next great find belongs here." : "A different search might open a door."}</h3><p>{savedOnly && !savedCount ? pastSavedCount > 0 ? "Your past or unavailable saves are kept below. Remove them when you’re ready, or explore something new." : "Tap the bookmark on any opportunity to keep it here. Past events are kept separately." : available.length === 0 ? "Our current listings have ended or are awaiting review. Explore the official provider calendars while new opportunities are checked." : "Try a nearby city, another interest, or fewer filters. Only active listings appear here."}</p>{chips.length > 0 ? <button data-science-press className="oe-primary" type="button" onClick={clearFilters} lang={language}>{t(language, "clearFilters")}<ArrowRight size={17} aria-hidden="true" /></button> : <a className="oe-primary" href={savedOnly ? "/opportunities/" : "https://www.torontopubliclibrary.ca/programs-and-classes/"} {...(!savedOnly ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{savedOnly ? "Find opportunities" : "Browse library programs"}<ArrowRight size={17} aria-hidden="true" /></a>}</div> : <>
            {!landing && view === "map" && <ExplorerMap items={results} onSelect={openDetail} language={language} />}
            <div className={`oe-card-grid${view === "map" ? " oe-card-grid-map" : ""}`}>
              {visibleResults.map((item) => <OpportunityCard key={item.id} item={item} language={language} saved={savedIds.includes(item.id)} supportRequestNeeded={supportPresetsEnabled && support.categories.length > 0 && !!now && matchAccessibilitySelection(item, support, { now: now.toISOString() }).decisions.some(d => d.qualifies && d.status === "on-request")} onSave={() => toggleSave(item)} onOpen={() => openDetail(item)} location={location} now={now} />)}
            </div>
            {visibleResults.length < results.length && <div className="oe-load-more" lang="en"><p>Showing {visibleResults.length} of {results.length}</p><button data-science-press type="button" onClick={() => setPage((current) => current + 1)}>Show more opportunities<ArrowDown size={17} aria-hidden="true" /></button></div>}
          </>}
          {savedOnly && now && unavailableSaved.length > 0 && <section className="oe-unavailable" lang="en" aria-labelledby="oe-unavailable-title"><div className="oe-unavailable-heading"><div><h3 id="oe-unavailable-title">Past & unavailable saves</h3><p>These listings have ended or are awaiting review. Your bookmarks stay here until you remove them.</p></div><button data-science-press type="button" onClick={() => persistSaves(savedIds.filter((id) => !unavailableSaved.includes(id)), "Past and unavailable saves removed.")}>Clear unavailable saves</button></div><ul>{unavailableSaved.map((id) => { const known = catalogById.get(id); return <li key={id}><div><strong>{known?.title ?? "Previously saved listing"}</strong><span>{known ? `${known.provider} · ${shortDate(known.startDate, language)}` : "This listing is no longer in the published directory."}</span></div><button data-science-press type="button" onClick={() => persistSaves(savedIds.filter((savedId) => savedId !== id), `${known?.title ?? "Previously saved listing"} removed from saved opportunities.`)} aria-label={`Remove ${known?.title ?? "previously saved listing"}`}><X size={16} aria-hidden="true" />Remove</button></li>; })}</ul></section>}
          <div className="oe-directory-end" lang="en"><span>Curiosity has a place here.</span><p>Know a free opportunity we’re missing? <a href="/community-hosts/">Share it with the community<ArrowRight size={14} aria-hidden="true" /></a></p></div>
        </div>
      </div>
      <span className="oe-sr-only" role="status" aria-live="polite" lang="en">{saveAnnouncement}</span>
      {supportPresetsEnabled && showUnconfirmed && support.categories.length > 0 && <section className="accessibility-unconfirmed" lang="en" aria-label="Listings with unconfirmed support"><h2>Support not confirmed ({unconfirmedResults.length})</h2><p>These listings are separate from confirmed matches. Missing information does not mean an activity is inaccessible. Ask the provider about your arrangements.</p><div className="oe-card-grid">{unconfirmedResults.slice(0, PAGE_SIZE * page).map(item => <OpportunityCard key={item.id} item={item} language={language} saved={savedIds.includes(item.id)} onSave={() => toggleSave(item)} onOpen={() => openDetail(item)} location={location} now={now} />)}</div>{unconfirmedResults.length > PAGE_SIZE * page && <button className="soft-button" type="button" onClick={() => setPage(v => v + 1)}>Show more unconfirmed listings</button>}</section>}
      {selected && <dialog ref={dialogRef} className="oe-detail" aria-labelledby="oe-detail-title" onCancel={(event) => { event.preventDefault(); closeDetail(); }} onClose={closeDetail} onClick={(event) => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDetail(); } }}><DetailContent supportEnabled={supportPresetsEnabled} item={selected} language={language} saved={savedIds.includes(selected.id)} onSave={() => toggleSave(selected)} onClose={closeDetail} now={now} /></dialog>}
    </section>
  );
}

function OpportunityCard({ item, language, saved, supportRequestNeeded = false, onSave, onOpen, location, now }: { supportRequestNeeded?: boolean; item: Opportunity; language: LanguageCode; saved: boolean; onSave: () => void; onOpen: () => void; location: Coordinates | null; now?: Date }) {
  const stale = isOpportunityVerificationStale(item.lastVerified, now);
  return <article className="oe-card"><div className="oe-card-top"><span className="oe-category"><GtaArtwork role={item.categories.some(c => /Coding|Robotics/.test(c)) ? "code" : item.categories.some(c => /Art|Creat/.test(c)) ? "art" : item.categories.some(c => /Science|STEM|Engineering/.test(c)) ? "science" : "library"} />{translatedCategory(item.categories.find((category) => category !== "STEM") ?? item.categories[0], language)}</span><button data-science-press type="button" className={`oe-bookmark${saved ? " oe-bookmarked" : ""}`} aria-label={`${t(language, saved ? "saved" : "save")}: ${item.title}`} aria-pressed={saved} onClick={onSave}><Bookmark data-science-icon size={20} fill={saved ? "currentColor" : "none"} aria-hidden="true" /></button></div><p className="oe-provider" lang="en">{item.provider}</p><h3 lang="en"><button data-science-press type="button" onClick={onOpen}>{item.title}</button></h3><p className="oe-summary" lang={originalSummary(item, language) ? "en" : language}>{originalSummary(item, language) ? programExcerpt(item, 256) : translatedSummary(item, language)}</p>{supportRequestNeeded && <p lang="en"><strong>Request and confirmation needed</strong></p>}<ul className="oe-card-facts"><li><CalendarDays size={16} aria-hidden="true" /><span lang="en">{formatDateRange(item.startDate, item.endDate)}</span></li><li><MapPin size={16} aria-hidden="true" /><span lang="en">{item.virtual ? "Online" : item.city}{location && !item.virtual ? ` · ${Math.round(haversineKm(location, item))} km away` : ""}</span></li><li><UsersRound size={16} aria-hidden="true" /><span>{t(language, "ages")} <bdi lang="en">{ageRange(item)}</bdi>{item.volunteerHoursEligible ? ` · ${t(language, "volunteerHours")}` : ""}</span></li></ul><div className="oe-card-bottom"><div><span className="oe-free"><span aria-hidden="true" />{t(language, "verifiedFree")}</span><span className="oe-checked" lang="en">{stale ? "Check latest details" : "Source checked"} · <time className="oe-verified-date" dateTime={item.lastVerified}><bdi lang={language} dir="auto">{shortDate(item.lastVerified, language)}</bdi></time></span></div><button data-science-press type="button" className="oe-details-link" onClick={onOpen} lang="en" aria-label={`View details for ${item.title}`}>Details<ArrowRight data-science-icon size={16} aria-hidden="true" /></button></div></article>;
}

function DetailContent({ supportEnabled = false, item, language, saved, onSave, onClose, now }: { supportEnabled?: boolean; item: Opportunity; language: LanguageCode; saved: boolean; onSave: () => void; onClose: () => void; now?: Date }) {
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
    [t(language, "commitment"), item.commitment],
    [t(language, "access"), item.accessibility.join(" · ")],
    [t(language, "equipment"), item.equipment], [t(language, "food"), item.food], [t(language, "capacity"), item.capacity]
  ].filter(([, value]) => value);
  return <div className="oe-detail-content"><div className="oe-detail-top"><span className="oe-category"><GtaArtwork role={item.categories.some(c => /Coding|Robotics/.test(c)) ? "code" : item.categories.some(c => /Art|Creat/.test(c)) ? "art" : item.categories.some(c => /Science|STEM|Engineering/.test(c)) ? "science" : "library"} />{translatedCategory(item.categories.find((category) => category !== "STEM") ?? item.categories[0], language)}</span><button data-science-press type="button" className="oe-dialog-close" onClick={onClose} autoFocus lang="en" aria-label="Close opportunity details"><X size={22} aria-hidden="true" /></button></div><p className="oe-provider" lang="en">{item.provider}</p><h2 id="oe-detail-title" lang="en">{item.title}</h2><p className="oe-detail-summary" lang={originalSummary(item, language) ? "en" : language}>{originalSummary(item, language) ? programExcerpt(item) : translatedSummary(item, language)}</p><div className="oe-detail-description-links"><a className="oe-detail-description-link" href={`/programs/${encodeURIComponent(item.id)}/#provider-description`} hrefLang="en" lang={language}>{t(language, "readFullDescription")}</a>{(sourceUrl || registrationUrl) && <a className="oe-detail-description-link" href={sourceUrl || registrationUrl} target="_blank" rel="noopener noreferrer" lang="en">Read full program details<ExternalLink size={14} aria-hidden="true" /></a>}</div>{language !== "en" && (originalSummary(item, language) ? <p className="oe-hint" lang="en">This is a preview of the provider’s original description. Full translations are not available yet. Confirm the program language with the provider.</p> : <p className="oe-hint">{t(language, "translationNote")}</p>)}{supportEnabled && <><AccessibilityDetails support={item.accessibilitySupport} unavailable={item.accessibilitySupportUnavailable} now={(now ?? new Date()).toISOString()} />{!item.accessibilitySupport && !item.accessibilitySupportUnavailable && <p lang="en">Accessibility arrangements have not been reviewed for this listing. Ask the provider.</p>}<section lang="en"><h3>Provider access notes</h3><ul>{item.accessibility.map((note, index) => <li key={index}>{note}</li>)}</ul></section></>}<div className="oe-detail-free" lang="en"><Check size={19} aria-hidden="true" /><div><strong lang={language}>{t(language, "verifiedFree")}</strong><p>{freeProgramNote(item)}</p></div></div><dl className="oe-detail-facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd lang="en">{value}</dd></div>)}</dl><p className="oe-detail-verified" lang="en">{isOpportunityVerificationStale(item.lastVerified, now) ? "Details need a fresh check." : "Source last checked"} <bdi lang={language} dir="auto">{shortDate(item.lastVerified, language)}</bdi>. Registration, spaces, and any changes are confirmed by the provider.</p><div className="oe-detail-actions">{registrationUrl ? <a data-science-press href={registrationUrl} target="_blank" rel="noopener noreferrer" className="oe-primary">{t(language, "registerApply")}<ExternalLink size={16} aria-hidden="true" /></a> : <p lang="en">Registration link unavailable. Visit the official source for details.</p>}<button data-science-press type="button" className="oe-secondary" onClick={onSave} aria-pressed={saved}><Bookmark data-science-icon size={18} fill={saved ? "currentColor" : "none"} aria-hidden="true" />{saved ? t(language, "saved") : t(language, "saveOnThisDevice")}</button></div><div className="oe-detail-links"><button data-science-press type="button" onClick={downloadCalendar}><CalendarPlus size={16} aria-hidden="true" />{t(language, "calendar")}</button>{!item.virtual && <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${item.address}, ${item.city}, Ontario`)}`} target="_blank" rel="noopener noreferrer"><MapPin size={16} aria-hidden="true" />{t(language, "directions")}</a>}{sourceUrl && <a href={sourceUrl} target="_blank" rel="noopener noreferrer">{t(language, "source")}<ExternalLink size={14} aria-hidden="true" /></a>}<a href={reportUrl(item)} target="_blank" rel="noopener noreferrer">{t(language, "report")}<ExternalLink size={14} aria-hidden="true" /></a></div></div>;
}
