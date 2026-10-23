"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Bookmark, Check, Languages, Menu, Moon, Search, Sun, X } from "lucide-react";
import { OpportunityExplorer } from "./OpportunityExplorer";
import { StorybookMark } from "./StorybookMark";
import { LegalFooter } from "./LegalFooter";
import { languageMeta, t, translatedCategory } from "@/lib/i18n";
import { categories, cityOptions, languagePreferenceOrder } from "@/lib/data";
import { websiteCopy } from "@/lib/websiteCopy";
import { legalConfig } from "@/lib/legal";
import type { Filters, LanguageCode } from "@/lib/types";
import { PlayfulSurface, SaveSpark, ScienceReveal } from "./ScienceMotion";
import "./PlayfulUI.css";
import "./SearchHelp.css";

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
  const heroTitle = language === "en" ? "Free activities.\nFor every age." : c.title;
  const heroIntro = language === "en" ? "Find something you’ll enjoy in the Greater Toronto Area — from storytime and crafts to coding, science and book clubs." : c.intro;

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
        {landing && <>
          <section className="welcome welcome-simple" aria-labelledby="welcome-title" data-science-scene>
            <ScienceReveal className="welcome-copy" lang={copyLanguage}>
              <p className="eyebrow" lang="en">YOUR COMMUNITY. YOUR NEXT DISCOVERY.</p>
              <h1 id="welcome-title">{heroTitle.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1>
              <p className="welcome-intro">{heroIntro}</p>
              <p className="welcome-ages" lang="en">Babies & toddlers · Children · Teens · Adults · Older adults</p>
              <a className="text-link welcome-browse" href="/opportunities/#discover" lang="en">Just looking? Browse all activities <ArrowRight size={18} aria-hidden="true" /></a>
            </ScienceReveal>
            <ScienceReveal className="welcome-art" aria-hidden="true">
              <img src="/illustrations/neighbourhood-lab-hero.webp" width={640} height={420} alt="" fetchPriority="high" data-science-tilt />
            </ScienceReveal>
          </section>
        </>}
        {landing && <section className="landing-finder" id="discover" aria-labelledby="finder-title">
          <div className="finder-heading"><h2 id="finder-title" lang="en">Find a free activity</h2><p lang="en">Choose any filters, or leave them open to see everything.</p></div>
          <form action="/opportunities/#discover" method="get" role="search" className="landing-search">
            <div className="finder-query"><label htmlFor="hero-query">{language === "en" ? "What would you like to do?" : c.interests}</label><div><Search size={21} aria-hidden="true" /><input id="hero-query" name="q" type="search" maxLength={250} placeholder={t(language, "searchPlaceholder")} autoComplete="off" dir="auto" enterKeyHint="search" spellCheck aria-describedby="hero-search-help" /></div></div>
            <div className="finder-fields">
              <div><label htmlFor="home-city">{t(language, "city")}</label><select id="home-city" name="city" defaultValue=""><option value="">{t(language, "allCities")}</option>{cityOptions.map(city => <option key={city}>{city}</option>)}</select></div>
              <div><label htmlFor="home-age">{t(language, "age")}</label><input id="home-age" name="age" type="number" min="0" max="99" step="0.01" placeholder="Any age" aria-describedby="home-age-help" /><small id="home-age-help" lang="en">Years; 0.5 = 6 months</small></div>
              <div><label htmlFor="home-interest">{t(language, "category")}</label><select id="home-interest" name="category" defaultValue="All"><option value="All">{t(language, "allCategories")}</option>{categories.map(category => <option key={category} value={category}>{translatedCategory(category, language)}</option>)}</select></div>
            </div>
            <div className="finder-submit"><p id="hero-search-help" lang="en">Everything listed is free. No account needed.<br />Try a topic or library name — small spelling mistakes are okay.</p><button className="primary-button" type="submit" data-science-press>{language === "en" ? "Find free activities" : c.browse}<ArrowRight size={20} aria-hidden="true" /></button></div>
          </form>
          <div className="finder-topics" lang="en"><span>Try something you enjoy:</span>{[["Storytime", "storytime"], ["Arts & crafts", "crafts"], ["Coding & robotics", "robotics"], ["Book clubs", "reading"]].map(([label, query]) => <a key={query} href={`/opportunities/?q=${query}#discover`}>{label}<ArrowRight size={15} aria-hidden="true" /></a>)}</div>
        </section>}
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
