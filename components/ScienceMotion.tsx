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

/**
 * Opt-in native-control springs and artwork tilt, informed by React Bits Magnet /
 * TiltedCard and motion-anything magnetic-button / bounce-cards. This local
 * implementation uses bounded WAAPI work, no gyroscope or continuous idle loop.
 * Reviewed upstream sources and licences: docs/FRONTEND_ASSET_ATTRIBUTION.md.
 */
export function PlayfulSurface({ children, className = "", ...props }: MotionContainerProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof root.animate !== "function") return;

    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const controls = new Map<Element, Animation>();
    const tilts = new Map<HTMLElement, Animation>();
    const pointers = new Map<number, HTMLElement>();
    const keys = new Set<HTMLElement>();
    let pointerFrame = 0;
    let activeScene: HTMLElement | null = null;
    let point: { scene: HTMLElement; x: number; y: number } | null = null;

    const allowed = () => !reduced.matches && !document.hidden;
    const controlFrom = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      const control = target.closest<HTMLElement>("[data-science-press]");
      if (!control || !root.contains(control) || control.closest(".playful-surface") !== root) return null;
      // Labels/radios stay native: a label's forwarded click must not bounce twice.
      if (!control.matches('button, a[href], input[type="button"], input[type="submit"], input[type="reset"], summary')) return null;
      if (control.matches(":disabled") || control.getAttribute("aria-disabled") === "true" || control.closest("[inert]")) return null;
      return control;
    };
    const cancelControl = (element: Element) => {
      controls.get(element)?.cancel();
      controls.delete(element);
    };
    const playControl = (element: Element, frames: Keyframe[], duration: number, hold = false) => {
      cancelControl(element);
      if (!allowed()) return;
      // Bound rapid input across many different controls, including dialog buttons.
      if (controls.size >= 24) {
        const oldest = controls.keys().next().value;
        if (oldest) cancelControl(oldest);
      }
      const animation = element.animate(frames, { duration, easing: "linear", fill: hold ? "forwards" : "none" });
      controls.set(element, animation);
      if (!hold) animation.onfinish = () => {
        if (controls.get(element) !== animation) return;
        controls.delete(element);
        animation.cancel();
      };
    };
    const scaleOf = (element: Element) => {
      const value = Number.parseFloat(window.getComputedStyle(element).scale);
      return Number.isFinite(value) ? Math.max(0.9, Math.min(1.08, value)) : 1;
    };
    const compress = (control: HTMLElement) => {
      if (!allowed()) return;
      // Keep the native control's hit area fixed until its click has activated.
      const icon = control.querySelector("[data-science-icon]");
      if (!icon) return;
      playControl(icon, [
        { scale: scaleOf(icon), easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
        { scale: 0.82 }
      ], 100, true);
    };
    const release = (control: HTMLElement) => {
      const icon = control.querySelector("[data-science-icon]");
      if (icon) playControl(icon, [{ scale: scaleOf(icon), easing: "ease-out" }, { scale: 1 }], 140);
    };
    const bounce = (control: HTMLElement) => {
      const from = scaleOf(control);
      playControl(control, [
        { scale: from, offset: 0 },
        { scale: 0.92, offset: 0.12, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
        { scale: 1.075, offset: 0.42, easing: "ease-in-out" },
        { scale: 0.985, offset: 0.7, easing: "ease-in-out" },
        { scale: 1.012, offset: 0.86, easing: "ease-out" },
        { scale: 1, offset: 1 }
      ], 480);

      const icon = control.querySelector("[data-science-icon]");
      if (icon) playControl(icon, [
        { rotate: "0deg", offset: 0 }, { rotate: "-12deg", offset: 0.22 },
        { rotate: "9deg", offset: 0.48 }, { rotate: "-3deg", offset: 0.73 },
        { rotate: "0deg", offset: 1 }
      ], 460);
    };

    const stopPointerFrame = () => {
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      point = null;
    };
    const resetTilt = (scene?: HTMLElement, immediately = false) => {
      if (!scene || point?.scene === scene) stopPointerFrame();
      for (const [artwork, animation] of [...tilts]) {
        if (scene && artwork.closest("[data-science-scene]") !== scene) continue;
        const from = window.getComputedStyle(artwork).transform;
        animation.cancel();
        tilts.delete(artwork);
        if (immediately || !allowed() || !artwork.isConnected) continue;
        const settle = artwork.animate([{ transform: from }, { transform: "none" }], {
          duration: 420, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
        });
        tilts.set(artwork, settle);
        settle.onfinish = () => {
          if (tilts.get(artwork) !== settle) return;
          tilts.delete(artwork);
          settle.cancel();
        };
      }
    };
    const reset = () => {
      for (const animation of controls.values()) animation.cancel();
      controls.clear();
      pointers.clear();
      keys.clear();
      resetTilt(undefined, true);
      activeScene = null;
    };

    const onClick = (event: MouseEvent) => {
      if (!event.isTrusted || event.button !== 0 || !allowed()) return;
      const control = controlFrom(event.target);
      if (!control) return;
      keys.delete(control);
      bounce(control);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!event.isTrusted || event.button !== 0 || !event.isPrimary || !allowed()) return;
      const control = controlFrom(event.target);
      if (!control) return;
      pointers.set(event.pointerId, control);
      compress(control);
    };
    const onPointerEnd = (event: PointerEvent) => {
      const control = pointers.get(event.pointerId);
      if (!control) return;
      pointers.delete(event.pointerId);
      if (event.type === "pointercancel") {
        const icon = control.querySelector("[data-science-icon]");
        if (icon) cancelControl(icon);
      }
      else release(control);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.isTrusted || event.repeat || event.altKey || event.ctrlKey || event.metaKey || !allowed()) return;
      const control = controlFrom(event.target);
      if (!control || (event.key !== "Enter" && event.key !== " ")) return;
      if (event.key === " " && control.matches("a")) return;
      keys.add(control);
      compress(control);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const control = controlFrom(event.target);
      if (control && keys.delete(control)) release(control);
    };
    const onFocusOut = (event: FocusEvent) => {
      const control = controlFrom(event.target);
      if (control && keys.delete(control)) {
        const icon = control.querySelector("[data-science-icon]");
        if (icon) cancelControl(icon);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!event.isTrusted || event.pointerType === "touch" || !finePointer.matches || !allowed()) return;
      const target = event.target instanceof Element ? event.target : null;
      const scene = target?.closest<HTMLElement>("[data-science-scene]");
      if (!scene || !root.contains(scene) || scene.closest(".playful-surface") !== root) {
        if (activeScene) resetTilt(activeScene);
        activeScene = null;
        return;
      }
      if (activeScene && activeScene !== scene) resetTilt(activeScene);
      activeScene = scene;
      point = { scene, x: event.clientX, y: event.clientY };
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!point || !allowed() || !finePointer.matches) return;
        const { scene: currentScene, x, y } = point;
        const bounds = currentScene.getBoundingClientRect();
        const nx = Math.max(-1, Math.min(1, ((x - bounds.left) / Math.max(1, bounds.width)) * 2 - 1));
        const ny = Math.max(-1, Math.min(1, ((y - bounds.top) / Math.max(1, bounds.height)) * 2 - 1));
        const artwork = [...currentScene.querySelectorAll<HTMLElement>("[data-science-tilt]")]
          .filter((element) => element.closest("[data-science-scene]") === currentScene).slice(0, 3);
        for (const [element, animation] of [...tilts]) {
          if (artwork.includes(element)) continue;
          animation.cancel();
          tilts.delete(element);
        }
        for (const element of artwork) {
          const from = window.getComputedStyle(element).transform;
          tilts.get(element)?.cancel();
          const animation = element.animate([
            { transform: from },
            { transform: `perspective(900px) rotateX(${-ny * 5}deg) rotateY(${nx * 6}deg) translate3d(${nx * 5}px, ${ny * 4}px, 0)` }
          ], { duration: 220, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" });
          tilts.set(element, animation);
        }
      });
    };
    const onPointerOut = (event: PointerEvent) => {
      if (!activeScene) return;
      if (event.relatedTarget instanceof Node && activeScene.contains(event.relatedTarget)) return;
      resetTilt(activeScene);
      activeScene = null;
    };
    const onPreferenceChange = () => { if (reduced.matches) reset(); };
    const onPointerPreferenceChange = () => {
      if (!finePointer.matches) { resetTilt(undefined, true); activeScene = null; }
    };
    const onVisibilityChange = () => { if (document.hidden) reset(); };

    // Native capture observes real activation; it never prevents default or calls click().
    root.addEventListener("click", onClick, true);
    root.addEventListener("pointerdown", onPointerDown, { capture: true, passive: true });
    root.addEventListener("keydown", onKeyDown, true);
    root.addEventListener("keyup", onKeyUp, true);
    root.addEventListener("focusout", onFocusOut);
    root.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerout", onPointerOut, { passive: true });
    window.addEventListener("pointerup", onPointerEnd, { passive: true });
    window.addEventListener("pointercancel", onPointerEnd, { passive: true });
    window.addEventListener("blur", reset);
    window.addEventListener("resize", reset);
    reduced.addEventListener("change", onPreferenceChange);
    finePointer.addEventListener("change", onPointerPreferenceChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      reset();
      root.removeEventListener("click", onClick, true);
      root.removeEventListener("pointerdown", onPointerDown, true);
      root.removeEventListener("keydown", onKeyDown, true);
      root.removeEventListener("keyup", onKeyUp, true);
      root.removeEventListener("focusout", onFocusOut);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      window.removeEventListener("blur", reset);
      window.removeEventListener("resize", reset);
      reduced.removeEventListener("change", onPreferenceChange);
      finePointer.removeEventListener("change", onPointerPreferenceChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <div {...props} ref={rootRef} className={`playful-surface ${className}`.trim()}>{children}</div>;
}
