"use client";

import { useEffect, useRef } from "react";
import { discoverySpring, stepDiscoverySpring } from "@/lib/discoveryMotion";

/** Original GTA illustration with a bounded, Hairline-adapted compass spring. */
export function DiscoveryScene({ interest }: { interest: string }) {
  const sceneRef = useRef<SVGSVGElement>(null);
  const springRef = useRef(discoverySpring());
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const spring = springRef.current;
    spring.target = ({ stories: -65, make: 65, build: 135, nature: -135 } as Record<string, number>)[interest] ?? 0;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = performance.now();
    const started = previous;
    const draw = () => {
      scene.style.setProperty("--compass-angle", `${spring.position}deg`);
      scene.style.setProperty("--compass-lean", `${Math.max(-5, Math.min(5, spring.position / 30))}deg`);
    };
    const settle = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      stepDiscoverySpring(spring, 0, true);
      draw();
      scene.dataset.motionState = "settled";
    };
    const tick = (now: number) => {
      frame = 0;
      if (preference.matches || document.hidden || now - started >= 1200) { settle(); return; }
      const moving = stepDiscoverySpring(spring, (now - previous) / 1000);
      previous = now;
      draw();
      if (moving) frame = requestAnimationFrame(tick);
      else scene.dataset.motionState = "settled";
    };
    const onPreference = () => { if (preference.matches) settle(); };
    const onVisibility = () => { if (document.hidden) settle(); };
    const bounds = scene.getBoundingClientRect();
    if (preference.matches || document.hidden || !bounds.width || bounds.bottom < 0 || bounds.top > innerHeight || Math.abs(spring.position - spring.target) < 0.01) settle();
    else {
      scene.dataset.motionState = "moving";
      frame = requestAnimationFrame(tick);
    }
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [interest]);
  return <svg ref={sceneRef} className="discovery-scene" data-interest={interest} viewBox="0 0 480 340" fill="none" aria-hidden="true" focusable="false">
    <path d="M34 266C14 207 48 116 108 70C172 20 233 34 293 55C351 76 423 76 449 150C482 239 424 300 344 305L117 309C77 308 48 298 34 266Z" className="scene-ground" />
    <circle cx="368" cy="72" r="28" className="scene-sun" />
    <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M52 271H431" />
      <g className="scene-tower"><path d="M158 270L168 144H181L192 270M174 59V107M164 107H184L191 123H157L164 107ZM159 137H189M170 151V252" /><path d="M162 123H186V137H162Z" className="scene-tower-deck" /><path d="M174 44V59" /></g>
      <g className="scene-library"><path d="M62 220H136V270H62V220Z" className="scene-paper" /><path d="M54 218L99 187L144 218H54Z" className="scene-peach" /><path d="M76 235V253M88 235V253M111 235V253M123 235V253M94 248H105V270H94V248Z" /></g>
      <g className="scene-tree"><path d="M387 270V208M387 234L371 222" /><path d="M363 213C345 192 361 168 376 171C388 144 414 158 414 180C441 193 425 222 405 218C391 232 371 229 363 213Z" className="scene-mint" /></g>
      <path d="M193 286C226 270 259 283 265 300C268 312 229 320 212 331" strokeDasharray="5 9" />
      <g className="scene-book"><path d="M310 234L333 223L354 234V267L333 256L310 267V234Z" className="scene-sun" /><path d="M333 223V256M316 240L326 235M340 235L348 240" /></g>
      <g className="scene-compass">
        <path d="M224 237L215 270M270 237L280 270M214 271H230M269 271H285" />
        <path d="M220 194L201 186L189 198M278 195L296 182L301 167" className="scene-arms" />
        <path d="M240 161V147" /><circle cx="240" cy="140" r="7" className="scene-sun" />
        <rect x="215" y="164" width="62" height="78" rx="24" className="scene-teal" />
        <rect x="224" y="176" width="44" height="29" rx="12" className="scene-paper" />
        <path d="M235 188V192M257 188V192M240 198Q246 202 251 198" />
        <circle cx="246" cy="222" r="9" className="scene-paper" />
        <path d="M246 216L250 224L242 227L246 216Z" className="scene-needle" />
      </g>
      <g className="scene-spark"><path d="M319 122V138M311 130H327M80 121V133M74 127H86" /><path d="M113 74L120 81L113 88L106 81L113 74Z" className="scene-sun" /></g>
      <path d="M215 98Q227 82 241 96Q256 78 273 98H215Z" className="scene-paper" />
    </g>
  </svg>;
}
