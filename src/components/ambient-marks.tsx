"use client";

import { useEffect, useRef } from "react";

/** The eight Arabic diacritics a model has to choose between, drifting. */
const MARKS = ["ً", "ٌ", "ٍ", "َ", "ُ", "ِ", "ّ", "ْ"];

type Speck = {
  x: number;
  y: number;
  size: number;
  drift: number;
  rise: number;
  depth: number;
  alpha: number;
  glyph: string;
};

/**
 * A slow field of diacritics behind the whole page: the marks the work is
 * about, moving the way dust moves in a still room. It sits under the content
 * and over the page ground, so it shows through the open chapters and is
 * covered by the solid ones.
 *
 * It draws at half frame rate on a one-to-one canvas, starts only after the
 * page has loaded, sleeps when the tab is hidden, and never runs on a phone or
 * under reduced motion.
 */
export function AmbientMarks() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let frame = 0;
    let running = true;
    let specks: Speck[] = [];
    let width = 0;
    let height = 0;
    let scroll = window.scrollY;
    let scrollShift = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;

    const ink = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() ||
      "#101012";

    const build = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const count = Math.min(30, Math.round((width * height) / 38000));
      specks = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 16 + Math.random() * 34,
        drift: (Math.random() - 0.5) * 0.09,
        rise: 0.05 + Math.random() * 0.12,
        // Nearer marks answer to the scroll more than distant ones.
        depth: 0.04 + Math.random() * 0.16,
        alpha: 0.05 + Math.random() * 0.13,
        glyph: MARKS[Math.floor(Math.random() * MARKS.length)],
      }));
    };

    let last = 0;

    const draw = (now: number) => {
      if (!running) return;
      if (now - last < 33) {
        frame = requestAnimationFrame(draw);
        return;
      }
      last = now;

      context.clearRect(0, 0, width, height);
      const colour = ink();

      // The field follows the pointer with a lag, so it drifts rather than tracks.
      pointerX += (targetX - pointerX) * 0.045;
      pointerY += (targetY - pointerY) * 0.045;

      for (const speck of specks) {
        speck.x += speck.drift;
        speck.y -= speck.rise + scrollShift * speck.depth;

        if (speck.y < -60) {
          speck.y = height + 60;
          speck.x = Math.random() * width;
        }
        if (speck.y > height + 60) {
          speck.y = -60;
          speck.x = Math.random() * width;
        }
        if (speck.x < -60) speck.x = width + 60;
        if (speck.x > width + 60) speck.x = -60;

        context.globalAlpha = speck.alpha;
        context.fillStyle = colour;
        context.font = `${speck.size}px "Thmanyah Serif Display", serif`;
        // Nearer marks are pushed further by the pointer than distant ones.
        context.fillText(
          speck.glyph,
          speck.x + pointerX * speck.depth * 5,
          speck.y + pointerY * speck.depth * 5,
        );
      }

      context.globalAlpha = 1;
      // The scroll nudge decays, so the field drifts rather than snaps.
      scrollShift *= 0.9;
      frame = requestAnimationFrame(draw);
    };

    let startTimer = 0;
    const start = () => {
      build();
      frame = requestAnimationFrame(draw);
    };

    if (document.readyState === "complete") {
      startTimer = window.setTimeout(start, 400);
    } else {
      window.addEventListener("load", () => (startTimer = window.setTimeout(start, 400)), {
        once: true,
      });
    }

    const onScroll = () => {
      const next = window.scrollY;
      scrollShift += (next - scroll) * 0.06;
      scroll = next;
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = (event.clientX / width - 0.5) * 2;
      targetY = (event.clientY / height - 0.5) * 2;
    };

    const onResize = () => build();
    const onVisibility = () => {
      running = !document.hidden;
      if (running) frame = requestAnimationFrame(draw);
      else cancelAnimationFrame(frame);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      window.clearTimeout(startTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
