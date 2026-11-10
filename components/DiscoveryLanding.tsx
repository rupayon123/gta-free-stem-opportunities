"use client";

import { useEffect, useState } from "react";
import { readSavedFilters, savedFilterHref, SAVED_FILTERS_CHANGED } from "@/lib/savedFilters";
import { readHomePresetLinks } from "@/lib/scopedPresets/homeLinks";
import { browserPresetStorage } from "@/lib/scopedPresets/browserStorage";
import { ArrowRight } from "lucide-react";
import { t } from "@/lib/i18n";
import { websiteCopy } from "@/lib/websiteCopy";
import type { LanguageCode } from "@/lib/types";
import { ScienceReveal } from "./ScienceMotion";
import { ScienceBrandScene } from "./ScienceBrandScene";
import { GtaArtwork } from "./GtaArtwork";
import "./DiscoveryLanding.css";

const topics = [
  { label: "Stories & books", query: "reading", role: "library" },
  { label: "Make & create", query: "crafts", role: "art" },
  { label: "Code & build", query: "robotics", role: "code" },
  { label: "Nature & science", query: "nature", role: "science" }
] as const;

export function DiscoveryLanding({ language, supportPresetsEnabled = false }: { language: LanguageCode; supportPresetsEnabled?: boolean }) {
  const [savedFilters, setSavedFilters] = useState<{ id: string; name: string; href: string; highSchool: boolean }[]>([]);
  const [savedFilterError, setSavedFilterError] = useState("");
  useEffect(() => {
    let mounted = true; let generation = 0;
    const sync = async () => {
      const run = ++generation;
      try {
        const links = supportPresetsEnabled ? await readHomePresetLinks(browserPresetStorage, window.localStorage) : readSavedFilters(window.localStorage).map(p => ({ ...p, href: savedFilterHref(p) }));
        if (mounted && run === generation) { setSavedFilters(links); setSavedFilterError(""); }
      } catch (error) { if (mounted && run === generation) { setSavedFilters([]); setSavedFilterError(error instanceof Error ? error.message : "Saved filters could not load. You can still browse."); } }
    };
    const refresh = () => { void sync(); };
    const channel = supportPresetsEnabled && typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("gta-scoped-presets-v2") : null;
    if (channel) channel.onmessage = refresh;
    refresh(); window.addEventListener("storage", refresh); window.addEventListener(SAVED_FILTERS_CHANGED, refresh); window.addEventListener("focus", refresh); window.addEventListener("gta-scoped-presets-changed", refresh);
    return () => { mounted = false; ++generation; channel?.close(); window.removeEventListener("storage", refresh); window.removeEventListener(SAVED_FILTERS_CHANGED, refresh); window.removeEventListener("focus", refresh); window.removeEventListener("gta-scoped-presets-changed", refresh); };
  }, [supportPresetsEnabled]);
  const c = websiteCopy[language];
  const title = language === "en" ? "Free activities.\nFor every age." : c.title;
  return <>
    <section className="welcome welcome-simple discovery-welcome" aria-labelledby="welcome-title">
      <ScienceReveal className="welcome-copy" lang={language}>
        <p className="eyebrow" lang="en">GTA FREE STEM</p>
        <h1 id="welcome-title">{title.split("\n").map(line => <span key={line}>{line}</span>)}</h1>
        <p className="welcome-intro">{language === "en" ? "Find free library events, creative workshops and STEM activities across the Greater Toronto Area." : c.intro}</p>
        <p className="welcome-ages" lang="en">For little learners, curious teens and lifelong explorers.</p>
        <div className="hero-actions"><a className="primary-button" data-science-press href="/opportunities/#discover"><GtaArtwork role="explore" />{language === "en" ? "Browse activities" : c.browse}<ArrowRight size={18} aria-hidden="true" /></a><a className="soft-button" data-science-press href="/opportunities/?saved=1#discover"><GtaArtwork role="saved" />{c.saved}</a></div>
      </ScienceReveal>
      <div className="discovery-art"><ScienceBrandScene language={language} /></div>
    </section>
    <section className="landing-topics" aria-labelledby="topics-title" lang="en">
      <div className="home-section-heading"><div><h2 id="topics-title">What are you curious about?</h2><p>Start with a topic. Find something nearby.</p></div><a className="text-link" href="/opportunities/#discover">All activities <ArrowRight size={18} aria-hidden="true" /></a></div>
      <div className="home-topic-links">{topics.map(topic => <a className="home-topic" key={topic.role} data-science-press href={`/opportunities/?q=${topic.query}#discover`}><GtaArtwork role={topic.role} illustration /><span>{topic.label}</span><ArrowRight size={18} aria-hidden="true" /></a>)}</div>
    </section>
    <section className="home-saved-filters" aria-labelledby="home-saved-filters-heading" lang="en">
      <h2 id="home-saved-filters-heading">Your saved filters</h2>
      <p>{savedFilterError || (savedFilters.length ? "Pick up where your curiosity left off. Saved only in this browser." : "Set your interests in Browse, then save a named filter to come back to it here.")}</p>
      <div className="home-saved-filter-links">{savedFilters.map(item => <a key={item.id} href={item.href}><GtaArtwork role={item.highSchool ? "school" : "filters"} /><span>{item.name}</span><ArrowRight size={18} aria-hidden="true" /></a>)}<a href="/opportunities/#discover"><GtaArtwork role="explore" /><span>Browse & set filters</span><ArrowRight size={18} aria-hidden="true" /></a></div>
    </section>
    <section className="home-next-steps" aria-label="More ways to explore" lang="en">
      <a className="home-next-step" href="/high-school/#discover" data-science-press><GtaArtwork role="school" illustration /><div><h2 lang={language}>{t(language, "highSchool")}</h2><p>Explore free programs for your next chapter.</p></div><ArrowRight size={20} aria-hidden="true" /></a>
      <a className="home-next-step" href="/support/" data-science-press><GtaArtwork role="support" illustration /><div><h2>Need a hand?</h2><p>Get help with searching, saving and getting started.</p></div><ArrowRight size={20} aria-hidden="true" /></a>
    </section>
  </>;
}
