# hassnalqaeri.com

Personal site for Hassn Alqaeri, AI engineer in Riyadh. Next.js 16, React 19, Tailwind v4,
TypeScript, and Motion for the single entrance gesture.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
```

## Where the content lives

All copy and facts are data, separate from presentation. Editing the site means editing these files.

| File | Contents |
| --- | --- |
| `src/data/profile.ts` | English name, role, hero copy, about paragraphs, external links, canonical URL |
| `src/data/projects.ts` | The four case studies: sections, stacks, highlights, diagrams, result tables, images |
| `src/data/experience.ts` | Positions, dates, and education |
| `src/data/record.ts` | Publication, recognition, certifications |
| `src/data/toolkit.ts` | Tools grouped by the job they do |
| `src/data/repositories.ts` | The smaller repositories shown in the GitHub section |
| `src/data/content-ar.ts` | The same content in Arabic, written for an Arabic reader |
| `src/data/ui.ts` | Interface strings for both locales |
| `src/data/content.ts` | Assembles both locales into one `content` record |

Editing a fact means editing it twice, once per locale. The types are shared, so
TypeScript will tell you when the Arabic side is missing a field.

Every claim on the site comes from a public source: the LinkedIn profile, the GitHub account, or the
OSACT7 paper. Nothing is inferred, and nothing is filled in to make a section look fuller.

## Design system

`DESIGN.md` holds the tokens and the rules, in the DESIGN.md format. The implementation lives in
`src/app/globals.css`: CSS custom properties for both themes, exposed to Tailwind through
`@theme inline`, plus the type scale and the two control shapes.

## Typography

The Thmanyah typeface (ثمانية) is self-hosted from `public/fonts` as woff2, in two families: Sans for
the interface, Serif Display for headings. Both cover Arabic and Latin. Geist Mono, loaded through
`next/font`, is reserved for data and identifiers.

## Two locales

English is served at `/` and Arabic at `/ar`. Each locale has its own root layout under
`src/app/(en)` and `src/app/(ar)`, so `lang` and `dir` are set on the document itself rather than
patched in later. Layout mirrors through CSS logical properties, directional icons flip with
`rtl:-scale-x-100`, and Arabic gets its own leading and tracking in `globals.css`, because Latin
display tracking crushes joined letterforms and clips the marks above and below the line.

The share card for `/` is generated at request time. The Arabic card is a pre-rendered PNG in
`public/media/og-ar.png`, because the runtime image generator does not shape Arabic; regenerate it
by rendering the same markup in a browser at 1200x630.

## How the page is put together

It reads as a book: an opening statement, a table of contents, then six numbered chapters. Each
chapter opens with a marker, a line in the first person, and a title that arrives one line at a time.
Grounds change between chapters, and two solid bands (facts under the hero, figures before the
awards) break the rhythm.

Interactive pieces, in order of appearance:

| Component | What it does |
| --- | --- |
| `ambient-marks.tsx` | A slow canvas field of the eight Arabic diacritics behind the opening screen. Pauses when the hero leaves the viewport, never runs under reduced motion |
| `hero-demo.tsx` | The diacritization task itself: the line as written, then restored, with a pass across it and a replay control |
| `magnetic.tsx` | The primary action leans towards the pointer. Mouse only |
| `chapter-rail.tsx` | Fixed index of all six chapters with labels on hover, from `xl` up |
| `scroll-progress.tsx` | Two-pixel line of document progress |
| `count-up.tsx` | The four figures count up once, when they first come into view |
| `logo-marquee.tsx` | One slow band of the stack marks, paused on hover |
| `back-to-top.tsx` | Appears once the opening screen is behind you |

## Notable implementation details

- **Theme.** System preference by default, with a manual toggle stored in `localStorage`. An inline
  script in `src/components/document-shell.tsx` applies the stored choice before first paint, so
  there is no flash.
- **GitHub metadata.** `src/components/repositories-grid.tsx` reads star counts and push dates from
  the public API at build time with an hourly revalidate. No token is required, and every failure
  path renders the list without the metadata.
- **Motion.** One `Reveal` primitive plus a single `IntersectionObserver` in `RevealObserver`, so no
  JavaScript ships per animated element. Reduced motion and no-JS both resolve to visible content.
- **The diacritics figure.** `src/components/diacritic-demo.tsx` cross-fades two complete strings
  rather than animating individual marks, which keeps Arabic shaping intact. It plays once on scroll
  and then stays under the reader's control.
- **Accessibility.** Skip link, visible focus rings, semantic landmarks, labelled icon buttons, and a
  text description on every architecture figure.

## Before deploying

Set the canonical URL in `src/data/profile.ts` (`siteUrl`); it drives metadata, hreflang, the
sitemap, and robots.txt. The English share card is already generated from
`src/app/(en)/opengraph-image.tsx`, using the OTF files in `src/assets/fonts`.
