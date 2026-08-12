---
version: alpha
name: Hassn Alqaeri, portfolio
description: Technical editorial system for a personal AI engineering portfolio. Cool neutral ground, one signal accent, Thmanyah type for Arabic and Latin in a single voice.
colors:
  primary: "#101012"
  secondary: "#55555a"
  tertiary: "#bd3b12"
  neutral: "#f4f4f2"
  surface: "#fbfbfa"
  rule: "#dededa"
  rule-strong: "#c6c6c1"
  primary-dark: "#ececeb"
  secondary-dark: "#a0a0a3"
  tertiary-dark: "#ff6a3d"
  neutral-dark: "#0c0c0d"
  surface-dark: "#131315"
  rule-dark: "#232326"
typography:
  display-xl:
    fontFamily: Thmanyah Serif Display
    fontSize: 76px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.036em
  display-l:
    fontFamily: Thmanyah Serif Display
    fontSize: 54px
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.032em
  display-m:
    fontFamily: Thmanyah Serif Display
    fontSize: 31px
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: -0.024em
  lede:
    fontFamily: Thmanyah Sans
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: Thmanyah Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.66
  body-sm:
    fontFamily: Thmanyah Sans
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Thmanyah Sans
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.3
  meta:
    fontFamily: Geist Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: -0.01em
  numeric:
    fontFamily: Geist Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: -0.02em
    fontFeature: "'tnum' 1"
rounded:
  none: 0px
  control: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  section: 112px
  shell: 1200px
  gutter: 40px
---

# Hassn Alqaeri, portfolio

## Overview

The site reads as an engineering document with editorial ambition. It is quiet, dense with real
evidence, and it never decorates. The reader is a technical recruiter, an AI engineering manager, or
a researcher, and the job of the page is to let them verify claims quickly: a result table with the
paper's own numbers, an architecture figure that matches the repository, a repository list with live
metadata.

Two languages sit in one voice. Thmanyah covers Arabic and Latin, so an Arabic project name can sit
beside an English sentence without switching typeface.

## Colors

The palette is a cool neutral ground with a single saturated accent. Color is never used to decorate,
only to mark the one thing that matters in a view.

- **Primary (#101012):** near-black ink for headings and body. Never pure black.
- **Secondary (#55555a):** the reading grey for paragraphs and supporting copy.
- **Tertiary (#bd3b12):** signal orange. Link hover, the marker on our own row in a result table,
  the loop edge in a diagram. One accent, one meaning per view.
- **Neutral (#f4f4f2):** page ground, slightly cool so the accent stays warm against it.
- **Surface (#fbfbfa):** raised frames around media, tables and figures.
- **Rule (#dededa):** the hairline that does the work cards would otherwise do.

Dark mode is a designed counterpart, not an inversion: ground drops to #0c0c0d, ink lifts to #ececeb,
and the accent shifts to #ff6a3d so it keeps its contrast against a dark ground.

## Typography

- **Display:** Thmanyah Serif Display, medium weight, tight tracking. Used for the hero line, section
  headings, and case-study titles. Roman only, never italic.
- **Body:** Thmanyah Sans at 16px with a 1.66 line height, measure capped at 70 characters.
- **Meta and numbers:** Geist Mono, reserved for data. Identifiers, dates, error rates, star counts,
  and diagram step numbers. Monospace is never used as a costume for a heading or a label.
- Scale steps are large enough to read as intentional: 76 / 54 / 31 / 20 / 16 / 12.

## Layout

A 1200px shell with 40px gutters at desktop and 20px at mobile, over a 12-column grid. Sections are
separated by a single top hairline and 112px of vertical space, not by boxes.

Each case study takes the composition its material needs. The research piece runs a wide body with a
metadata column, a result table, and a flow figure. The system piece leads with screenshots. The
pipeline piece leads with its diagram. The prototype runs a single narrow column. Nothing repeats a
layout family twice in a row.

Below 768px every multi-column layout collapses to one column. Wide content, meaning tables and
diagrams, scrolls inside its own container so the page itself never scrolls sideways.

## Elevation & Depth

There are no shadows on content. Depth comes from hairlines and from a raised surface tone behind
media, tables and figures. The only floating layer is the sticky header, which uses a translucent
ground and a backdrop blur, and a fixed grain overlay at 3% that sits above everything and takes no
pointer events.

## Shapes

Two shapes, no exceptions. Surfaces, media frames, tables and figures are square with a 1px rule.
Interactive controls are full pills: buttons, the icon buttons in the header, and the theme toggle.
Nothing in between.

## Components

- **Header:** a floating pill, detached from the top edge, one line at desktop, with the active
  section marked by a filled pill rather than an underline. It carries the language switch. Below
  768px it collapses to a full-screen menu.
- **Highlights:** three sourced figures in a hairline grid, set in display type at the size of a
  headline, each with a label and the source underneath.
- **Contact:** the only full-field use of the accent on the page, closing the document.
- **Buttons:** primary is ink on ground and turns accent on hover; secondary is a hairline outline.
  Both press down 1px on active. The trailing arrow sits in its own circle inside the pill.
- **Case study:** kind and year in mono, display title, one-line summary, then a short context line
  that names the venue or the programme.
- **Architecture figure:** numbered stages in a horizontal strip on desktop, stacked below 768px,
  with a screen-reader description that carries the same information as the visual.
- **Result table:** mono tabular numbers, right-aligned, with a 2px accent mark on our own row.
- **Repository card:** repository name in mono, a written description, then tags with live stars and
  the last push date. The card is one link.

## Arabic

The site ships in two languages, and Arabic is not a translation layer bolted onto a Latin design.
Thmanyah covers both scripts, so the voice does not change across locales. What does change: display
tracking goes to normal, leading opens to 1.32 for display and 1.95 for body, monospace is dropped
for Arabic labels because it cannot set the script, and directional icons mirror. Layout mirrors
through logical properties rather than a separate stylesheet.

The diacritics figure is the one interactive element on the page, and it exists because it is the
work: the same sentence written and pronounced, cross-faded so the reader sees what the shared task
actually asks a model to do.

## Motion

Four gestures, and nothing else moves. Content rises 14px as it enters. Chapter titles arrive one
line at a time from under their own baseline. Media settles as it scrolls in, on browsers that can
drive an animation from scroll position. One band of logos moves on its own, and it stops on hover.

Every one of them is CSS, so nothing ships per animated element, and every one of them collapses
under `prefers-reduced-motion`. The two canvas and pointer effects, the ambient diacritics and the
magnetic control, check the same preference before they start.

## Do's and Don'ts

- Do quote numbers from a published source and say where they came from.
- Do give every figure a text description; the diagram is never the only carrier.
- Do keep one entrance gesture for the whole page: content settles up 18px on first view, and it is
  disabled under `prefers-reduced-motion`.
- Don't add a second accent, a gradient, a glow, or a colored status dot.
- Don't put a kicker or an eyebrow above a heading, or number the sections.
- Don't use an em dash anywhere in the copy.
- Don't invent a metric, a title, a date, or an outcome. If it cannot be verified, it does not ship.
- Don't let the accent leak: it is a marker inside the page and the ground of exactly one section,
  the closing contact block.
