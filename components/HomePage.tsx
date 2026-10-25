"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Bookmark, Check, Languages, Menu, Moon, Sun, X } from "lucide-react";
import dynamic from "next/dynamic";
import { StorybookMark } from "./StorybookMark";
import { LegalFooter } from "./LegalFooter";
import { DiscoveryLanding } from "./DiscoveryLanding";
import { languageMeta, t } from "@/lib/i18n";
import { languagePreferenceOrder } from "@/lib/filterOptions";
import { websiteCopy } from "@/lib/websiteCopy";
import { legalConfig } from "@/lib/legal";
import type { Filters, LanguageCode } from "@/lib/types";
import { PlayfulSurface, SaveSpark } from "./ScienceMotion";
import "./PlayfulUI.css";
import "./SearchHelp.css";

const OpportunityExplorer = dynamic(() => import("./OpportunityExplorer").then(module => module.OpportunityExplorer), {
  loading: () => <p role="status" lang="en">Loading activities…</p>
});

type Surface = "home" | "opportunities" | "high-school" | "support" | "community-hosts";

export function HomePage({ initialSurface = "home", initialFilterOverrides = {} }: { initialSurface?: Surface; initialFilterOverrides?: Partial<Filters> } = {}) {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [dark, setDark] = useState(false);
  const [themePreference, setThemePreference] = useState<"light" | "dark" | "system">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [ready, setReady] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const c = websiteCopy[language];
  const copyLanguage = language;
  const DiscoveryHeading = initialSurface === "home" && !savedOnly ? "h2" : "h1";
  const browseSurface = initialSurface === "home" || initialSurface === "opportunities" || initialSurface === "high-school";
  const landing = initialSurface === "home" && !savedOnly;

  useEffect(() => {
    try {
      const storedLanguage = localStorage.getItem("gta-stem-opportunities-language");
      if (storedLanguage && storedLanguage in languageMeta) setLanguage(storedLanguage as LanguageCode);
      setDark(document.documentElement.dataset.theme === "dark");
      const preference = document.documentElement.dataset.themePreference;
      if (preference === "light" || preference === "dark" || preference === "system") setThemePreference(preference);
    } catch { /* Browsing remains available when browser storage is disabled. */ }
    const syncSaved = () => setSavedOnly(new URLSearchParams(location.search).get("saved") === "1");
    syncSaved();
    window.addEventListener("popstate", syncSaved);
    setReady(true);
    return () => window.removeEventListener("popstate", syncSaved);
  }, []);

  useEffect(() => {
    if (!landing) return;
    const readCount = () => {
      try {
        const saved: unknown = JSON.parse(localStorage.getItem("gta-stem-opportunities-saved-anonymous") ?? "[]");
        setSavedCount(Array.isArray(saved) ? new Set(saved.filter(id => typeof id === "string")).size : 0);
      } catch { setSavedCount(0); }
    };
    readCount();
    window.addEventListener("storage", readCount);
    return () => window.removeEventListener("storage", readCount);
  }, [landing]);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = language;
    document.documentElement.dir = languageMeta[language].dir;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.dataset.themePreference = themePreference;
    try {
      localStorage.setItem("gta-stem-opportunities-language", language);
      localStorage.setItem("gta-stem-opportunities-theme", themePreference);
    } catch { /* Preferences are optional. */ }
  }, [language, dark, ready, themePreference]);

  useEffect(() => {
    if (!ready || themePreference !== "system") return;
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => setDark(preference.matches);
    syncTheme();
    preference.addEventListener("change", syncTheme);
    return () => preference.removeEventListener("change", syncTheme);
  }, [ready, themePreference]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <PlayfulSurface>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <a data-science-press className="brand" href="/" aria-label="GTA Free STEM home">
            <StorybookMark compact ariaHidden />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="/opportunities/#discover" aria-current={initialSurface === "opportunities" && !savedOnly ? "page" : undefined}>{language === "en" ? "Explore" : t(language, "navOpportunities")}</a>
            <a href="/high-school/#discover" aria-current={initialSurface === "high-school" ? "page" : undefined}>{t(language, "highSchool")}</a>
            <a href="/#how-it-works" lang={copyLanguage}>{language === "en" ? "About" : c.about}</a>
          </nav>
          <div className="site-tools">
            <a data-science-press className={`saved-link ${savedOnly ? "is-active" : ""}`} href="/opportunities/?saved=1#discover" lang={copyLanguage} aria-label={`${c.saved} (${savedCount})`}><Bookmark size={18} aria-hidden="true" data-science-icon /><span>{c.saved}</span>{savedCount > 0 && <b key={savedCount}>{savedCount}</b>}</a>
            <label className="language-tool"><Languages size={18} aria-hidden="true" /><span className="sr-only">{t(language, "siteLanguage")}</span><select value={language} onChange={e => setLanguage(e.target.value as LanguageCode)}>{languagePreferenceOrder.map(code => <option key={code} value={code}>{languageMeta[code].native}</option>)}</select></label>
            <button data-science-press className="icon-button" type="button" lang="en" aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} onClick={() => { setThemePreference(dark ? "light" : "dark"); setDark(!dark); }}>{dark ? <Sun size={19} /> : <Moon size={19} />}</button>
            <button data-science-press ref={menuButtonRef} className="icon-button mobile-menu-button" type="button" lang="en" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          </div>
        </div>
        {menuOpen && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation" onClick={() => setMenuOpen(false)}><a href="/opportunities/?saved=1#discover">{c.saved} ({savedCount})</a><a href="/opportunities/#discover">{t(language, "navOpportunities")}</a><a href="/high-school/#discover">{t(language, "highSchool")}</a><a href="/#how-it-works">{c.about}</a><a href="/support/">{t(language, "navSupport")}</a></nav>}
      </header>
      <main id="main-content">
        <noscript><section className="noscript-note" lang="en"><h2>Explore the library calendars</h2><p>The interactive search and map need JavaScript. You can also browse free programs directly through <a href="https://www.torontopubliclibrary.ca/programs-and-classes/">Toronto Public Library</a> and <a href="https://markham.bibliocommons.com/v2/events">Markham Public Library</a>, or <a href="/support/">get help</a>.</p></section></noscript>
        {landing && <DiscoveryLanding language={language} />}
        {landing ? null : browseSurface ? <section className={`discovery-section${landing ? " discovery-landing" : ""}`} id="discover" aria-label="Explore opportunities">
          {!landing && <div className="section-heading"><div><p className="eyebrow" lang="en">{initialSurface === "high-school" ? "YOUR NEXT CHAPTER" : "EXPLORE YOUR CURIOSITY"}</p><DiscoveryHeading>{savedOnly ? c.saved : initialSurface === "high-school" ? t(language, "navHighSchoolOpportunities") : t(language, "navOpportunities")}</DiscoveryHeading></div><p lang="en">{savedOnly ? "Your shortlist, kept in this browser." : "Find something that makes you want to learn more."}</p></div>}
          <SaveSpark><OpportunityExplorer language={language} landing={landing} highSchool={initialSurface === "high-school"} initialFilters={initialFilterOverrides} savedOnly={savedOnly} onSavedCountChange={setSavedCount} /></SaveSpark>
        </section> : <section className="information-section" lang="en"><p className="eyebrow">GTA FREE STEM</p><h1>{initialSurface === "support" ? "A little help getting started." : "Bring more learning into the community."}</h1><p>{initialSurface === "support" ? "Browse without an account. Use the search and filters to find a program, then check the full details and registration on the provider’s website." : "Know a free program we should include? Share a public provider link through the project’s support tracker. Suggestions are reviewed before they appear."}</p><div className="hero-actions"><a data-science-press className="primary-button" href="/opportunities/#discover">Browse opportunities <ArrowRight size={18} /></a><a data-science-press className="soft-button" href="/support/">Get support</a></div><p className="quiet-note">Support tickets are public. Please keep personal information and children’s details out of them.</p><a href={legalConfig.supportIssueUrl}>Suggest a program or report a problem <ArrowRight size={16} /></a></section>}
        {initialSurface === "home" && <><div className="trust-strip" lang={copyLanguage}>{[c.noAccount, c.free, c.direct].map(text => <span key={text}><Check size={17} aria-hidden="true" />{text}</span>)}</div><section className="how-section" lang="en" id="how-it-works" aria-labelledby="how-heading"><div className="how-intro"><p className="eyebrow">HOW IT WORKS</p><h2 id="how-heading">Pick an activity.<br />Make it your own.</h2><p>Come on your own, bring a friend, or find something for your family. There’s no account to create.</p></div><ol className="how-steps"><li><span>01</span><div><h3>Find an activity</h3><p>Use the city, age and interest filters above — or browse all free activities.</p></div></li><li><span>02</span><div><h3>Check the details</h3><p>See the schedule, age range, and original source. Save anything you’d like to come back to.</p></div></li><li><span>03</span><div><h3>Register with the provider</h3><p>Follow the provider’s link to confirm availability and register. They’ll handle your booking.</p></div></li></ol></section></>}
        <section className="community-note" lang="en"><StorybookMark compact ariaHidden /><div><h2>Good opportunities are better shared.</h2><p>Help us keep free learning easy to find.</p></div><a data-science-press className="text-link" href="/community-hosts/">Suggest an opportunity <ArrowRight size={18} aria-hidden="true" /></a></section>
      </main>
      <LegalFooter />
    </PlayfulSurface>
  );
}
