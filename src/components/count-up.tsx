"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a real figure up once, when it first scrolls into view. The value is
 * rendered in full from the first paint, so a reader with reduced motion or no
 * JavaScript sees the number rather than a zero.
 */
export function CountUp({ value }: { value: string }) {
  // Only figures that read as quantities count up. An ordinal like "1st" would
  // pass through "0st" on the way, which reads as a glitch rather than a count.
  const match = value.match(/^([\d.,]+)(%?)$/);
  const target = match ? Number(match[1].replace(/,/g, "")) : null;
  const suffix = match ? match[2] : "";
  const grouped = match ? match[1].includes(",") : false;
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<string>(value);

  useEffect(() => {
    const node = ref.current;
    if (!node || target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let start = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const step = (now: number) => {
          if (!start) start = now;
          const progress = Math.min(1, (now - start) / 900);
          // Ease out so the last digits settle rather than snap.
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;
          setShown(
            (grouped
              ? Math.round(current).toLocaleString("en-US")
              : current.toFixed(decimals)) + suffix,
          );
          if (progress < 1) frame = requestAnimationFrame(step);
        };

        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, decimals, suffix, grouped]);

  return <span ref={ref}>{target === null ? value : shown}</span>;
}
