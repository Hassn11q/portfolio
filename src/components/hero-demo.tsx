"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/csr/ArrowsClockwise";
import type { DiacriticDemo } from "@/data/projects";

/**
 * The first screen shows the work rather than describing it: an Arabic line as
 * it is written, then the same line with the diacritics restored, with a pass
 * sweeping across it. Both states are complete strings that cross-fade, so
 * Arabic shaping is never split across elements.
 *
 * It runs once. Reduced motion starts on the restored line and never sweeps.
 */
function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function HeroDemo({
  demo,
  labels,
}: {
  demo: DiacriticDemo;
  labels: { written: string; pronounced: string; restore: string; strip: string };
}) {
  const reduceMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const [played, setPlayed] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const restored = reduceMotion || played;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const sweep = window.setTimeout(() => setSweeping(true), 700);
    const flip = window.setTimeout(() => setPlayed(true), 1250);
    const settle = window.setTimeout(() => setSweeping(false), 2100);

    return () => {
      window.clearTimeout(sweep);
      window.clearTimeout(flip);
      window.clearTimeout(settle);
    };
  }, [reduceMotion]);

  return (
    <figure ref={ref} className="relative overflow-hidden border-t border-rule pt-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <figcaption className="meta flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className={`inline-block size-1.5 transition-colors duration-500 ${
              restored ? "bg-accent" : "bg-rule-2"
            }`}
          />
          {restored ? labels.pronounced : labels.written}
        </figcaption>

        <button
          type="button"
          onClick={() => {
            setPlayed((value) => !value);
            setSweeping(true);
            window.setTimeout(() => setSweeping(false), 1400);
          }}
          aria-pressed={restored}
          className="btn btn-ghost text-[0.8125rem]"
        >
          <ArrowsClockwiseIcon size={14} weight="light" aria-hidden="true" />
          {restored ? labels.strip : labels.restore}
        </button>
      </div>

      <div className="relative mt-4 grid" dir="rtl" lang="ar">
        <p
          aria-hidden={restored}
          className={`col-start-1 row-start-1 text-[clamp(1.5rem,1rem+2.1vw,2.6rem)] leading-[1.8] text-ink transition-opacity duration-700 ease-out ${
            restored ? "opacity-0" : "opacity-100"
          }`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {demo.plain}
        </p>
        <p
          aria-hidden={!restored}
          className={`col-start-1 row-start-1 text-[clamp(1.5rem,1rem+2.1vw,2.6rem)] leading-[1.8] text-ink transition-opacity duration-700 ease-out ${
            restored ? "opacity-100" : "opacity-0"
          }`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {demo.diacritized}
        </p>

        {/* The pass: a thin accent edge crossing the line once. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 w-px bg-accent transition-[right,opacity] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            sweeping ? "right-full opacity-100" : "right-0 opacity-0"
          }`}
        />
      </div>

      <p className="mt-4 max-w-[60ch] text-[0.9375rem] text-ink-2">{demo.translation}</p>
    </figure>
  );
}
