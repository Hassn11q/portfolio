"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@phosphor-icons/react/dist/csr/ArrowUp";

/**
 * Appears once the reader is past the first screens. It scrolls rather than
 * jumping, unless reduced motion is set, and it never covers the contact
 * buttons because it sits on the trailing edge.
 */
export function BackToTop({ label }: { label: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Watch the first screen: once it has left the viewport, the reader is
    // deep enough in the page for the control to be worth showing.
    const sentinel = document.getElementById("top");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShown(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={label}
      title={label}
      tabIndex={shown ? 0 : -1}
      className={`fixed bottom-6 z-40 grid size-11 place-items-center rounded-full border border-rule bg-ground/85 text-ink-2 backdrop-blur-md transition-all duration-300 ease-out hover:border-ink hover:text-ink ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{ insetInlineEnd: "1.5rem" }}
    >
      <ArrowUpIcon size={17} weight="light" aria-hidden="true" />
    </button>
  );
}
