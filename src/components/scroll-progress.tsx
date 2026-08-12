"use client";

import { useEffect, useRef } from "react";

/**
 * A two-pixel line showing position in the document. It is written straight to
 * a CSS custom property from a passive scroll listener batched into a frame, so
 * it never triggers a React render, and it is hidden under reduced motion.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      node.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-[2px]">
      <div
        ref={ref}
        className="h-full w-full origin-left bg-accent rtl:origin-right"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
