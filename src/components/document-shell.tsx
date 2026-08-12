import localFont from "next/font/local";
import type { ReactNode } from "react";
import { AmbientMarks } from "./ambient-marks";
import { CursorLight } from "./cursor-light";
import { asset, content, links, siteUrl } from "@/data/content";
import type { Locale } from "@/data/content";

/**
 * Thmanyah, loaded through next/font so the files are fingerprinted and their
 * URLs carry the base path when the site is served from a project page.
 */
const thmanyahSans = localFont({
  variable: "--font-thmanyah-sans",
  display: "swap",
  src: [
    { path: "../../public/fonts/thmanyahsans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/thmanyahsans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/thmanyahsans-Bold.woff2", weight: "700", style: "normal" },
  ],
});

const thmanyahDisplay = localFont({
  variable: "--font-thmanyah-display",
  display: "swap",
  src: [
    { path: "../../public/fonts/thmanyahserifdisplay-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/thmanyahserifdisplay-Medium.woff2", weight: "500", style: "normal" },
  ],
});

/** Applies the stored theme before paint so the page never flashes the wrong mode. */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})()`;

/**
 * The html and body wrapper shared by both locales. Each locale has its own
 * root layout so lang and dir are correct in the document itself.
 */
export function DocumentShell({
  locale,
  children,
  monoVariable,
}: {
  locale: Locale;
  children: ReactNode;
  monoVariable: string;
}) {
  const c = content[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.en.name,
    alternateName: content.ar.name,
    url: locale === "en" ? siteUrl : `${siteUrl}/ar`,
    jobTitle: c.role,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Riyadh",
      addressCountry: "SA",
    },
    alumniOf: { "@type": "CollegeOrUniversity", name: "King Saud University" },
    sameAs: [links.github, links.linkedin, links.kaggle],
    knowsAbout: [
      "Large language models",
      "Retrieval augmented generation",
      "AI agents",
      "Arabic natural language processing",
      "Speech processing",
      "Machine learning engineering",
    ],
  };

  return (
    // The font variables belong on the root: the theme tokens that reference
    // them are declared there, and a custom property is resolved where it is
    // declared, not where it is used.
    <html
      lang={locale}
      dir={c.dir}
      className={`${thmanyahSans.variable} ${thmanyahDisplay.variable} ${monoVariable}`}
      suppressHydrationWarning
    >
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          {/* Without JavaScript the reveal observer never runs, so content stays visible. */}
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-70 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ground"
        >
          {c.ui.skipToContent}
        </a>
        <AmbientMarks />
        <CursorLight />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
