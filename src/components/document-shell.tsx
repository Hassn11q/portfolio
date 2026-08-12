import type { ReactNode } from "react";
import { AmbientMarks } from "./ambient-marks";
import { CursorLight } from "./cursor-light";
import { content, links, siteUrl } from "@/data/content";
import type { Locale } from "@/data/content";

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
    <html lang={locale} dir={c.dir} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          {/* Without JavaScript the reveal observer never runs, so content stays visible. */}
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        <link
          rel="preload"
          href="/fonts/thmanyahserifdisplay-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/thmanyahsans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={monoVariable}>
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
