"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon } from "@phosphor-icons/react/dist/csr/Moon";
import { SunIcon } from "@phosphor-icons/react/dist/csr/Sun";

type Mode = "light" | "dark";

const EVENT = "themechange";

function subscribe(onChange: () => void) {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  query.addEventListener("change", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    query.removeEventListener("change", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

/** The applied theme: an explicit choice on the root element, else the system preference. */
function getSnapshot(): Mode {
  const attribute = document.documentElement.getAttribute("data-theme");
  if (attribute === "dark" || attribute === "light") return attribute;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle({
  labels,
}: {
  labels: { toLight: string; toDark: string };
}) {
  // Null on the server and on the first client render, so the button renders
  // without committing to a mode before the DOM is readable.
  const mode = useSyncExternalStore(subscribe, getSnapshot, () => null);

  function toggle() {
    const next: Mode = mode === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable in private modes; the choice still applies for this visit.
    }
    window.dispatchEvent(new Event(EVENT));
  }

  const label = mode === "dark" ? labels.toLight : labels.toDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-full border border-rule text-ink-2 transition-colors duration-200 ease-out hover:border-ink hover:text-ink"
    >
      {mode === "dark" ? (
        <SunIcon size={17} weight="light" aria-hidden="true" />
      ) : (
        <MoonIcon size={17} weight="light" aria-hidden="true" />
      )}
    </button>
  );
}
