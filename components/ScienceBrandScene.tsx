"use client";

import { useState } from "react";
import { Atom, Cog, FlaskConical, Lightbulb, Sparkles } from "lucide-react";
import type { LanguageCode } from "@/lib/types";
import "./ScienceBrandScene.css";

const controls: Record<LanguageCode, readonly [string, string]> = {
  en: ["Pause animation", "Resume animation"], fr: ["Mettre en pause", "Reprendre l’animation"],
  zh: ["暂停动画", "继续动画"], yue: ["暫停動畫", "繼續動畫"],
  pa: ["ਐਨੀਮੇਸ਼ਨ ਰੋਕੋ", "ਐਨੀਮੇਸ਼ਨ ਚਲਾਓ"], ur: ["حرکت روکیں", "حرکت چلائیں"],
  ta: ["அசைவை நிறுத்து", "அசைவை இயக்கு"], tl: ["Ihinto ang animation", "Ituloy ang animation"],
  es: ["Pausar animación", "Reanudar animación"], ar: ["إيقاف الحركة", "استئناف الحركة"],
  fa: ["توقف پویانمایی", "پخش پویانمایی"], hi: ["ऐनिमेशन रोकें", "ऐनिमेशन चलाएँ"],
  pt: ["Pausar animação", "Retomar animação"], gu: ["એનિમેશન રોકો", "એનિમેશન ચલાવો"],
  bn: ["অ্যানিমেশন থামান", "অ্যানিমেশন চালান"], ja: ["アニメーションを一時停止", "アニメーションを再生"],
  ko: ["애니메이션 일시 정지", "애니메이션 재생"], hu: ["Animáció szüneteltetése", "Animáció folytatása"]
};

/** The approved app's science orbit as lightweight, non-blocking web branding.
 * It never gates content, invents loading progress, or requests a new runtime.
 */
export function ScienceBrandScene({ language }: { language: LanguageCode }) {
  const [paused, setPaused] = useState(false);
  const [jiggle, setJiggle] = useState(0);
  const label = controls[language][paused ? 1 : 0];
  function toggleMotion() {
    setPaused(value => !value);
    setJiggle(value => value + 1);
  }
  return <div className="science-brand-scene" data-motion-paused={paused}>
    <button className="science-brand-toggle" type="button" onClick={toggleMotion} aria-label={label} lang={language}>
    <div className="science-brand-art" data-jiggle={jiggle === 0 ? "none" : jiggle % 2 ? "odd" : "even"} aria-hidden="true">
      <div className="science-brand-halo" />
      <div className="science-brand-ring science-brand-ring-outer" />
      <div className="science-brand-ring science-brand-ring-inner" />
      <img className="science-brand-logo" src="/logo.png" alt="" width={768} height={768} fetchPriority="high" />
      <div className="science-brand-orbit">
        <span className="science-brand-item science-brand-cog-pink"><Cog /></span>
        <span className="science-brand-item science-brand-cog-teal"><Cog /></span>
        <span className="science-brand-item science-brand-atom"><Atom /></span>
        <span className="science-brand-item science-brand-flask"><FlaskConical /></span>
        <span className="science-brand-item science-brand-bulb"><Lightbulb /></span>
        <span className="science-brand-item science-brand-spark"><Sparkles /></span>
      </div>
    </div>
    </button>
  </div>;
}
