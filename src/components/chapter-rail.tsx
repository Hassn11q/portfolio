"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/data/content";

/**
 * A fixed index of the whole page, not just the projects: where the reader is,
 * how much is left, and a jump to any chapter. Labels appear on hover and on
 * keyboard focus. It only shows on displays wide enough to hold it outside the
 * text column, and it is hidden while the first screen is in view.
 */
export function ChapterRail({ c }: { c: SiteContent }) {
  const chapters = [
    { id: "about", label: c.ui.bio.title },
    { id: "work", label: c.ui.work.title },
    { id: "record", label: c.ui.record.title },
    { id: "experience", label: c.ui.experience.title },
    { id: "stack", label: c.ui.toolkit.title },
    { id: "contact", label: c.ui.nav.contact },
  ];

  const [active, setActive] = useState(chapters[0].id);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (hero) {
      const heroObserver = new IntersectionObserver(
        ([entry]) => setVisible(!entry.isIntersecting),
        { threshold: 0 },
      );
      heroObserver.observe(hero);

      const sectionObserver = new IntersectionObserver(
        (entries) => {
          const top = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          if (top) setActive(top.target.id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
      );
      for (const chapter of chapters) {
        const el = document.getElementById(chapter.id);
        if (el) sectionObserver.observe(el);
      }

      return () => {
        heroObserver.disconnect();
        sectionObserver.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      aria-label={c.ui.nav.chapters}
      className={`pointer-events-none fixed top-1/2 z-30 hidden -translate-y-1/2 ps-6 transition-opacity duration-500 ease-out xl:block ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ insetInlineStart: 0 }}
    >
      <ol className={visible ? "pointer-events-auto space-y-3" : "space-y-3"}>
        {chapters.map((chapter, i) => {
          const current = active === chapter.id;
          return (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={current ? "true" : undefined}
                className="group flex items-center gap-3"
                tabIndex={visible ? 0 : -1}
              >
                <span
                  aria-hidden="true"
                  className={`block h-px transition-all duration-300 ease-out ${
                    current ? "w-8 bg-accent" : "w-4 bg-rule-2 group-hover:w-6"
                  }`}
                />
                <span
                  className={`mono text-[0.6875rem] transition-colors duration-300 ease-out ${
                    current ? "text-ink" : "text-ink-3"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`max-w-0 overflow-hidden text-[0.75rem] whitespace-nowrap text-ink-2 transition-all duration-300 ease-out group-hover:max-w-[14rem] group-focus-visible:max-w-[14rem] ${
                    current ? "text-ink" : ""
                  }`}
                >
                  {chapter.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
