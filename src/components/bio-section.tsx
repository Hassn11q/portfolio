import type { SiteContent } from "@/data/content";
import { Monogram } from "./monogram";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/**
 * Who is speaking, before any claim is made: the name in both scripts, what he
 * does in one line, two paragraphs of history, and four facts a recruiter
 * checks first.
 */
export function BioSection({ c }: { c: SiteContent }) {
  return (
    <section id="about" className="scroll-mt-28 border-b border-rule py-24 md:py-32">
      <div className="shell">
        <Reveal>
          <SectionHeading index="01" lead={c.ui.leads.bio} title={c.ui.bio.title} />
        </Reveal>

        <div className="mt-16 grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="flex items-center gap-3 text-ink-3">
              <Monogram className="size-5" />
              <span className="meta">{c.role}</span>
            </p>

            <p
              className="mt-6 text-[clamp(1.25rem,1rem+1.1vw,1.75rem)] leading-[1.45] tracking-[-0.02em] text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {c.bio.lead}
            </p>

            <div className="mt-8 space-y-5">
              {c.bio.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="body">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" index={1}>
            <div className="border-t border-rule">
              <p className="pt-8">
                <span
                  className="mask-line text-[clamp(2rem,1.4rem+1.9vw,3rem)] leading-[1.15] tracking-[-0.035em] text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span>{c.name}</span>
                </span>
                <span
                  lang={c.locale === "en" ? "ar" : "en"}
                  dir={c.locale === "en" ? "rtl" : "ltr"}
                  className="mask-line mt-2 text-[clamp(1.75rem,1.3rem+1.5vw,2.5rem)] leading-[1.5] text-accent"
                  style={{ fontFamily: "var(--font-display)", "--i": 1 } as React.CSSProperties}
                >
                  <span>{c.nameAlternate}</span>
                </span>
              </p>

              <dl className="mt-8">
                {c.bio.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid grid-cols-[8rem_1fr] gap-4 border-t border-rule py-3.5"
                  >
                    <dt className="meta">{fact.label}</dt>
                    <dd className="text-[0.9375rem] text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
