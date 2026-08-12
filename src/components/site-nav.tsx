"use client";

import { useEffect, useState } from "react";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/csr/GithubLogo";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/csr/LinkedinLogo";
import { ListIcon } from "@phosphor-icons/react/dist/csr/List";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import { links } from "@/data/content";
import type { SiteContent } from "@/data/content";
import { Monogram } from "./monogram";
import { ThemeToggle } from "./theme-toggle";

export function SiteNav({ c }: { c: SiteContent }) {
  const sections = [
    { id: "work", label: c.ui.nav.work },
    { id: "record", label: c.ui.nav.record },
    { id: "experience", label: c.ui.nav.experience },
    { id: "about", label: c.ui.nav.about },
    { id: "contact", label: c.ui.nav.contact },
  ];

  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = ["work", "record", "experience", "about", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-3 md:pt-4">
      {/* A detached pill rather than a full-width bar: it takes less of the
          viewport and keeps the page edges clean. */}
      <nav
        aria-label={c.ui.nav.primary}
        className="pointer-events-auto mx-auto flex w-full max-w-[min(100%,60rem)] items-center justify-between gap-2 rounded-full border border-rule bg-ground/80 py-1.5 pe-1.5 ps-4 backdrop-blur-xl md:w-max md:gap-1"
      >
        <a
          href="#top"
          className="inline-flex min-h-9 items-center gap-2.5 pe-3 text-[0.9375rem] font-medium tracking-[-0.01em] whitespace-nowrap transition-colors duration-200 ease-out hover:text-accent"
        >
          <Monogram className="size-[18px]" />
          {c.name}
        </a>

        <span aria-hidden="true" className="hidden h-4 w-px bg-rule md:block" />

        <ul className="hidden items-center md:flex">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? "true" : undefined}
                className={`inline-flex min-h-9 items-center rounded-full px-3 text-sm whitespace-nowrap transition-colors duration-200 ease-out hover:text-ink ${
                  active === section.id ? "bg-ground-sunk text-ink" : "text-ink-2"
                }`}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <span aria-hidden="true" className="hidden h-4 w-px bg-rule md:block" />

        <div className="flex items-center gap-1.5 md:ps-1.5">
          <a
            href={c.locale === "en" ? "/cv" : "/ar/cv"}
            className="hidden min-h-9 items-center rounded-full px-3 text-sm whitespace-nowrap text-ink-2 transition-colors duration-200 ease-out hover:bg-ground-sunk hover:text-ink lg:inline-flex"
          >
            {c.ui.cv}
          </a>
          {/* Segmented language switch: the current locale is marked, the other is a link. */}
          <span className="hidden items-center rounded-full border border-rule text-sm sm:inline-flex">
            <span
              aria-current="true"
              className="min-h-8 rounded-full bg-ground-sunk px-2.5 py-1.5 text-ink"
            >
              {c.locale === "en" ? "EN" : "AR"}
            </span>
            <a
              href={c.ui.languageSwitch.to}
              lang={c.locale === "en" ? "ar" : "en"}
              className="min-h-8 rounded-full px-2.5 py-1.5 text-ink-3 transition-colors duration-200 ease-out hover:text-ink"
            >
              {c.locale === "en" ? "AR" : "EN"}
            </a>
          </span>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={c.ui.githubProfile}
            className="hidden size-9 place-items-center rounded-full text-ink-2 transition-colors duration-200 ease-out hover:bg-ground-sunk hover:text-ink lg:grid"
          >
            <GithubLogoIcon size={17} weight="light" aria-hidden="true" />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={c.ui.linkedinProfile}
            className="hidden size-9 place-items-center rounded-full text-ink-2 transition-colors duration-200 ease-out hover:bg-ground-sunk hover:text-ink lg:grid"
          >
            <LinkedinLogoIcon size={17} weight="light" aria-hidden="true" />
          </a>
          <ThemeToggle labels={{ toLight: c.ui.toLight, toDark: c.ui.toDark }} />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={c.ui.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-9 place-items-center rounded-full border border-rule text-ink-2 transition-colors duration-200 ease-out hover:border-ink hover:text-ink md:hidden"
          >
            <ListIcon size={17} weight="light" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="pointer-events-auto fixed inset-0 z-50 flex flex-col bg-ground md:hidden"
        >
          <div className="shell flex h-16 shrink-0 items-center justify-between">
            <span className="inline-flex items-center gap-2.5 text-[0.9375rem] font-medium">
              <Monogram className="size-[18px]" />
              {c.name}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={c.ui.closeMenu}
              autoFocus
              className="grid size-9 place-items-center rounded-full border border-rule text-ink-2 transition-colors duration-200 ease-out hover:border-ink hover:text-ink"
            >
              <XIcon size={17} weight="light" aria-hidden="true" />
            </button>
          </div>
          <ul className="shell flex flex-1 flex-col justify-center gap-1 pb-24">
            {sections.map((section) => (
              <li key={section.id} className="border-b border-rule">
                <a
                  href={`#${section.id}`}
                  onClick={() => setOpen(false)}
                  className="block py-5 text-3xl font-medium tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {section.label}
                </a>
              </li>
            ))}
            <li className="mt-8 flex flex-wrap gap-3">
              <a
                href={c.ui.languageSwitch.to}
                lang={c.locale === "en" ? "ar" : "en"}
                className="btn btn-ghost"
              >
                {c.ui.languageSwitch.label}
              </a>
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-ghost"
              >
                <GithubLogoIcon size={17} weight="light" aria-hidden="true" />
                GitHub
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-ghost"
              >
                <LinkedinLogoIcon size={17} weight="light" aria-hidden="true" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
