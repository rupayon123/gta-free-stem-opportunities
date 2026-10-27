"use client";

import { useEffect, useRef, useState } from "react";
import { Atom, Cog, FlaskConical, Lightbulb, Sparkles } from "lucide-react";
import { discoverySpring, stepDiscoverySpring } from "@/lib/discoveryMotion";
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pointerArtRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const button = buttonRef.current;
    const art = pointerArtRef.current;
    if (!button || !art || paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const x = discoverySpring();
    const y = discoverySpring();
    let frame = 0;
    let previousTime = 0;
    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      x.position = x.velocity = x.target = 0;
      y.position = y.velocity = y.target = 0;
      art!.style.removeProperty("transform");
    }
    function tick(time: number) {
      frame = 0;
      const seconds = previousTime ? (time - previousTime) / 1000 : 1 / 60;
      previousTime = time;
      const movingX = stepDiscoverySpring(x, seconds);
      const movingY = stepDiscoverySpring(y, seconds);
      // Clamp the rendered pose as well as the target, including spring overshoot.
      const boundedX = Math.max(-1, Math.min(1, x.position));
      const boundedY = Math.max(-1, Math.min(1, y.position));
      art!.style.transform = `translate3d(${boundedX * 2}px, ${boundedY * 2}px, 0) rotateX(${-boundedY * 3}deg) rotateY(${boundedX * 3}deg)`;
      if (movingX || movingY) frame = requestAnimationFrame(tick);
      else previousTime = 0;
    }
    function move(event: PointerEvent) {
      if (event.pointerType === "touch" || reduced.matches || !fineHover.matches || document.hidden) {
        reset();
        return;
      }
      // Measure the stable button, never the artwork that follows the pointer.
      const bounds = button!.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      x.target = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      y.target = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      if (!frame) frame = requestAnimationFrame(tick);
    }
    button.addEventListener("pointermove", move);
    button.addEventListener("pointerleave", reset);
    button.addEventListener("pointercancel", reset);
    reduced.addEventListener("change", reset);
    fineHover.addEventListener("change", reset);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", reset);
    return () => {
      reset();
      button.removeEventListener("pointermove", move);
      button.removeEventListener("pointerleave", reset);
      button.removeEventListener("pointercancel", reset);
      reduced.removeEventListener("change", reset);
      fineHover.removeEventListener("change", reset);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, [paused]);
  const label = controls[language][paused ? 1 : 0];
  function toggleMotion() {
    setPaused(value => !value);
    setJiggle(value => value + 1);
  }
  return <div className="science-brand-scene" data-motion-paused={paused}>
    <button ref={buttonRef} className="science-brand-toggle" type="button" onClick={toggleMotion} aria-label={label} lang={language}>
    <div ref={pointerArtRef} className="science-brand-pointer">
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
    </div>
    </button>
  </div>;
}
