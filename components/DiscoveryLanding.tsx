"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, Bot, Compass, Leaf, Paintbrush, Search, Check, Shuffle } from "lucide-react";
import { categories, cityOptions } from "@/lib/filterOptions";
import { t, translatedCategory } from "@/lib/i18n";
import { websiteCopy } from "@/lib/websiteCopy";
import type { LanguageCode } from "@/lib/types";
import { ScienceReveal } from "./ScienceMotion";
import { ScienceBrandScene } from "./ScienceBrandScene";
import "./DiscoveryLanding.css";

const topics = [
  { key: "stories", label: "Stories & books", query: "reading", icon: BookOpen },
  { key: "make", label: "Make & create", query: "crafts", icon: Paintbrush },
  { key: "build", label: "Code & build", query: "robotics", icon: Bot },
  { key: "nature", label: "Nature & science", query: "nature", icon: Leaf }
] as const;

export function DiscoveryLanding({ language }: { language: LanguageCode }) {
  const [query, setQuery] = useState("");
  const queryInput = useRef<HTMLInputElement>(null);
  // Keep text entered while scripts load when React hydrates the native form.
  useEffect(() => { setQuery(queryInput.current?.value ?? ""); }, []);
  function chooseQuery(value: string) {
    if (queryInput.current) queryInput.current.value = value;
    setQuery(value);
  }
  const c = websiteCopy[language];
  const chosen = topics.find(topic => topic.query === query.trim().toLowerCase());
  const title = language === "en" ? "Free activities.\nFor every age." : c.title;
  return <>
    <section className="welcome welcome-simple discovery-welcome" aria-labelledby="welcome-title">
      <ScienceReveal className="welcome-copy" lang={language}>
        <p className="eyebrow" lang="en">A LITTLE CURIOSITY GOES A LONG WAY.</p>
        <h1 id="welcome-title">{title.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1>
        <p className="welcome-intro">{language === "en" ? "Find free library events, creative workshops and STEM activities across the Greater Toronto Area." : c.intro}</p>
        <p className="welcome-ages" lang="en">Babies & toddlers · Children · Teens · Adults · Older adults</p>
        <a className="text-link welcome-browse" href="/opportunities/#discover" lang="en">Just looking? Browse all activities <ArrowRight size={18} aria-hidden="true" /></a>
      </ScienceReveal>
      <div className="discovery-art"><ScienceBrandScene language={language} /></div>
    </section>
    <section className="landing-finder" id="discover" aria-labelledby="finder-title">
      <div className="finder-heading"><span className="finder-step" aria-hidden="true"><Compass size={27} /></span><div><h2 id="finder-title" lang="en">Find a free activity</h2><p lang="en">Choose a few details, or leave them open. It’s all free.</p></div></div>
      <form action="/opportunities/#discover" method="get" role="search" className="landing-search">
        <div className="finder-query"><label htmlFor="hero-query">{language === "en" ? "What would you like to do?" : c.interests}</label><div><Search size={21} aria-hidden="true" /><input id="hero-query" name="q" type="search" maxLength={250} ref={queryInput} defaultValue="" onChange={event => setQuery(event.target.value)} placeholder={t(language, "searchPlaceholder")} autoComplete="off" dir="auto" enterKeyHint="search" spellCheck aria-describedby="hero-search-help" /></div></div>
        <div className="finder-fields">
          <div><label htmlFor="home-city">{t(language, "city")}</label><select id="home-city" name="city" defaultValue=""><option value="">{t(language, "allCities")}</option>{cityOptions.map(city => <option key={city}>{city}</option>)}</select></div>
          <div><label htmlFor="home-age">{t(language, "age")}</label><input id="home-age" name="age" type="number" min="0" max="99" step="0.01" placeholder="Any age" aria-describedby="home-age-help" /><small id="home-age-help" lang="en">Years; 0.5 = 6 months</small></div>
          <div><label htmlFor="home-interest">{t(language, "category")}</label><select id="home-interest" name="category" defaultValue="All"><option value="All">{t(language, "allCategories")}</option>{categories.map(category => <option key={category} value={category}>{translatedCategory(category, language)}</option>)}</select></div>
        </div>
        <div className="finder-submit"><p id="hero-search-help" lang="en">No account. No fees. Just possibilities.<br />Try a topic or library name — small spelling mistakes are okay.</p><button className="primary-button" type="submit" data-science-press>{language === "en" ? "Find free activities" : c.browse}<ArrowRight size={20} aria-hidden="true" /></button></div>
        <noscript><style>{".curiosity-choices { display: none; }"}</style></noscript>
        <fieldset className="curiosity-choices" lang="en"><legend>Need a starting point? Pick a curiosity.</legend><button className="curiosity-surprise" type="button" onClick={() => { const remaining = topics.filter(topic => topic.key !== chosen?.key); chooseQuery(remaining[Math.floor(Math.random() * remaining.length)].query); }}><Shuffle size={18} aria-hidden="true" />Pick for me</button><div>{topics.map(topic => <button key={topic.key} type="button" className={`curiosity-choice curiosity-${topic.key}`} aria-pressed={chosen?.key === topic.key} onClick={() => chooseQuery(chosen?.key === topic.key ? "" : topic.query)}><span className="curiosity-icon"><topic.icon size={29} strokeWidth={1.8} aria-hidden="true" /></span><span>{topic.label}</span>{chosen?.key === topic.key ? <Check size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}</button>)}</div><p className="sr-only" role="status">{chosen ? `${chosen.label} selected. Use Find free activities to see matching programs.` : ""}</p></fieldset>
      </form>
    </section>
  </>;
}
