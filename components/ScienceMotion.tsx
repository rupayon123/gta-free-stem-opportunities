"use client";

/**
 * GTA Free STEM adaptations of React Bits ClickSpark (Copyright 2026 David Haz,
 * MIT + Commons Clause) and motion-anything entrance guidance (Copyright 2026
 * nexu.io, Apache-2.0). Modified for targeted saves, visible-by-default content,
 * live reduced-motion preferences and bounded animation work. Full notices and
 * exact source provenance: docs/FRONTEND_ASSET_ATTRIBUTION.md.
 */
import { useEffect, useRef, type HTMLAttributes } from "react";
import "./ScienceMotion.css";

type MotionContainerProps = HTMLAttributes<HTMLDivElement>;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** A single entrance cue; content stays visible before hydration and without JS. */
export function ScienceReveal({ children, className = "", ...props }: MotionContainerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || revealedRef.current) return;

    const preference = window.matchMedia(REDUCED_MOTION_QUERY);
    let entrance: Animation | undefined;
    let observer: IntersectionObserver | undefined;

    const reveal = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;
      observer?.disconnect();
      if (preference.matches || typeof root.animate !== "function") return;

      entrance = root.animate(
        [{ opacity: 0.84, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }],
        { duration: 300, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
      );
    };

    const onPreferenceChange = () => {
      if (!preference.matches) return;
      revealedRef.current = true;
      observer?.disconnect();
      entrance?.cancel();
    };

    preference.addEventListener("change", onPreferenceChange);
    if (preference.matches || !("IntersectionObserver" in window)) {
      revealedRef.current = true;
    } else {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal();
      }, { threshold: 0.1 });
      observer.observe(root);
    }

    return () => {
      observer?.disconnect();
      entrance?.cancel();
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return <div {...props} ref={rootRef} className={`science-reveal ${className}`.trim()}>{children}</div>;
}

/** Decorative feedback for a trusted click on an unsaved .oe-bookmark button. */
export function SaveSpark({ children, className = "", ...props }: MotionContainerProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const preference = window.matchMedia(REDUCED_MOTION_QUERY);
    let canvas: HTMLCanvasElement | undefined;
    let frame = 0;
    let bounds = root.getBoundingClientRect();

    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      canvas?.remove();
      canvas = undefined;
    };

    const onPreferenceChange = () => {
      if (preference.matches) stop();
    };
    const onVisibilityChange = () => {
      if (document.hidden) stop();
    };
    const onResize = () => {
      const next = root.getBoundingClientRect();
      if (Math.abs(next.width - bounds.width) > 0.5 || Math.abs(next.height - bounds.height) > 0.5) stop();
      bounds = next;
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!event.isTrusted || event.button !== 0 || preference.matches || document.hidden) return;
      const target = event.target instanceof Element ? event.target : null;
      const button = target?.closest<HTMLButtonElement>("button.oe-bookmark");
      if (!button || !root.contains(button) || button.disabled || button.getAttribute("aria-disabled") === "true" || button.getAttribute("aria-pressed") !== "false") return;

      const buttonBounds = button.getBoundingClientRect();
      bounds = root.getBoundingClientRect();
      const width = Math.min(96, bounds.width);
      const height = Math.min(96, bounds.height);
      if (width <= 0 || height <= 0) return;

      // Keyboard and assistive-technology clicks use the actual button centre.
      const keyboard = event.detail === 0;
      const clientX = keyboard ? buttonBounds.left + buttonBounds.width / 2 : event.clientX;
      const clientY = keyboard ? buttonBounds.top + buttonBounds.height / 2 : event.clientY;
      const left = Math.max(0, Math.min(bounds.width - width, clientX - bounds.left - width / 2));
      const top = Math.max(0, Math.min(bounds.height - height, clientY - bounds.top - height / 2));
      const x = clientX - bounds.left - left;
      const y = clientY - bounds.top - top;

      stop();
      const burstCanvas = document.createElement("canvas");
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      burstCanvas.width = Math.ceil(width * ratio);
      burstCanvas.height = Math.ceil(height * ratio);
      burstCanvas.className = "save-spark__canvas";
      burstCanvas.setAttribute("aria-hidden", "true");
      Object.assign(burstCanvas.style, { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` });
      const context = burstCanvas.getContext("2d");
      if (!context) return;

      const tokens = window.getComputedStyle(root);
      const colors = ["--science-spark-yellow", "--science-spark-teal", "--science-spark-navy"]
        .map((token) => tokens.getPropertyValue(token).trim());
      canvas = burstCanvas;
      root.appendChild(burstCanvas);
      const started = performance.now();

      // Radial line burst adapted from ClickSpark. Only one 96px burst can run.
      const draw = (now: number) => {
        frame = 0;
        const progress = Math.min(1, (now - started) / 380);
        if (progress >= 1 || preference.matches) { stop(); return; }
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        const eased = 1 - Math.pow(1 - progress, 3);
        const distance = 8 + 22 * eased;
        const length = 7 * Math.pow(1 - progress, 1.6);
        context.lineCap = "round";
        context.lineWidth = 2.2;
        context.globalAlpha = 1 - progress;
        for (let index = 0; index < 8; index += 1) {
          const angle = (index * Math.PI) / 4;
          context.strokeStyle = colors[index % colors.length];
          context.beginPath();
          context.moveTo(x + Math.cos(angle) * distance, y + Math.sin(angle) * distance);
          context.lineTo(x + Math.cos(angle) * (distance + length), y + Math.sin(angle) * (distance + length));
          context.stroke();
        }
        frame = window.requestAnimationFrame(draw);
      };
      frame = window.requestAnimationFrame(draw);
    };

    // Capture reads aria-pressed before the button's React save handler toggles it.
    root.addEventListener("click", onClickCapture, true);
    preference.addEventListener("change", onPreferenceChange);
    window.addEventListener("resize", stop);
    document.addEventListener("visibilitychange", onVisibilityChange);
    const observer = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(onResize);
    observer?.observe(root);

    return () => {
      stop();
      observer?.disconnect();
      root.removeEventListener("click", onClickCapture, true);
      preference.removeEventListener("change", onPreferenceChange);
      window.removeEventListener("resize", stop);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <div {...props} ref={rootRef} className={`save-spark ${className}`.trim()}>{children}</div>;
}
