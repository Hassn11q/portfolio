"use client";

import { useEffect, useRef } from "react";

/**
 * Two parts, one loop.
 *
 * The light trails the pointer and stretches along the direction of travel, so
 * fast movement reads as movement rather than teleporting. The ring tracks
 * closer, and when the pointer is over something clickable it snaps to that
 * element and takes its shape, which turns hover into a physical event.
 *
 * The real cursor is never hidden or replaced. Mouse only, and neither part
 * exists under reduced motion.
 */
export function CursorLight() {
  const lightRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    const ring = ringRef.current;
    if (!light || !ring) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const INTERACTIVE = "a, button, summary, [role='button'], input, select, textarea";

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let lightX = targetX;
    let lightY = targetY;
    let ringX = targetX;
    let ringY = targetY;

    // Ring geometry: a circle by default, the size of whatever it is over.
    let ringW = 34;
    let ringH = 34;
    let targetW = 34;
    let targetH = 34;
    let targetRadius = 999;
    let radius = 999;

    let snapped: Element | null = null;
    let pressed = false;
    let frame = 0;

    const render = () => {
      const dx = targetX - lightX;
      const dy = targetY - lightY;
      lightX += dx * 0.12;
      lightY += dy * 0.12;

      // Speed stretches the light along its direction of travel.
      const speed = Math.min(Math.hypot(dx, dy) / 90, 0.55);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      light.style.transform = `translate3d(${lightX}px, ${lightY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${1 + speed}, ${1 - speed * 0.55})`;

      // The ring either follows the pointer or rests on the element it snapped to.
      if (snapped) {
        const box = snapped.getBoundingClientRect();
        ringX += (box.left + box.width / 2 - ringX) * 0.22;
        ringY += (box.top + box.height / 2 - ringY) * 0.22;
      } else {
        ringX += (targetX - ringX) * 0.22;
        ringY += (targetY - ringY) * 0.22;
      }

      ringW += (targetW - ringW) * 0.2;
      ringH += (targetH - ringH) * 0.2;
      radius += (targetRadius - radius) * 0.2;

      const press = pressed ? 0.88 : 1;
      ring.style.width = `${ringW}px`;
      ring.style.height = `${ringH}px`;
      ring.style.borderRadius = `${radius}px`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${press})`;

      frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;

      light.style.opacity = "1";
      ring.style.opacity = "1";

      const hit = (event.target as Element | null)?.closest(INTERACTIVE) ?? null;

      if (hit) {
        const box = hit.getBoundingClientRect();
        // Wrap the target with a little air, and borrow its corner radius.
        targetW = box.width + 14;
        targetH = box.height + 10;
        targetRadius = parseFloat(getComputedStyle(hit).borderRadius) || 6;
        snapped = hit;
        ring.dataset.snapped = "true";
      } else {
        targetW = 34;
        targetH = 34;
        targetRadius = 999;
        snapped = null;
        delete ring.dataset.snapped;
      }
    };

    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);
    const onLeave = () => {
      light.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    // A snapped target can scroll away underneath the ring.
    window.addEventListener("scroll", () => (snapped = null), { passive: true });

    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={lightRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-20 hidden size-[24rem] rounded-full opacity-0 transition-opacity duration-500 md:block"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 13%, transparent) 0%, transparent 62%)",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-20 hidden border border-accent opacity-0 transition-[opacity,border-color] duration-300 data-[snapped]:border-accent md:block"
      />
    </>
  );
}
