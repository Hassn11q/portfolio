"use client";

import { useEffect } from "react";

/**
 * One observer for every [data-reveal] element on the page.
 *
 * Two things keep content from ever being stuck invisible: the observer fires
 * before an element reaches the viewport rather than after, and a sweep on
 * every scroll frame reveals anything that is on screen but still hidden. A
 * block that somehow escapes both is revealed by the safety pass on load.
 */
export function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!elements.length) return;

    const revealAll = () => {
      for (const el of elements) el.classList.add("is-in");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealAll();
      return;
    }

    const show = (el: Element) => el.classList.add("is-in");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          observer.unobserve(entry.target);
        }
      },
      // Start the entrance before the block arrives, so it is already settling
      // by the time the reader reaches it.
      { rootMargin: "0px 0px 12% 0px", threshold: 0 },
    );

    for (const el of elements) observer.observe(el);

    // Anything on screen and still hidden gets revealed on the next frame.
    let frame = 0;
    const sweep = () => {
      frame = 0;
      for (const el of elements) {
        if (el.classList.contains("is-in")) continue;
        const box = el.getBoundingClientRect();
        if (box.top < window.innerHeight * 1.05 && box.bottom > 0) {
          show(el);
          observer.unobserve(el);
        }
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sweep);
    };

    sweep();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
