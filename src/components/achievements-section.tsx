import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import type { SiteContent } from "@/data/content";
import { IssuerMark } from "./issuer-mark";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/**
 * Three kinds of thing, three labelled blocks, one row pattern each: awards on
 * a timeline, the paper as a card of its own, then the credentials in a grid
 * where every row lines up. Rows answer to the pointer, and an accent rule
 * draws across an award as it is read.
 */
export function AchievementsSection({ c }: { c: SiteContent }) {
  return (
    <section id="record" className="scroll-mt-28 border-t border-rule py-24 md:py-32">
      <div className="shell">
        <Reveal>
          <SectionHeading index="04" lead={c.ui.leads.record} title={c.ui.record.title} />
        </Reveal>

        <Reveal>
          <h3 className="meta mt-16">{c.ui.record.awards}</h3>
          <ol className="mt-6 border-t border-rule">
            {c.awards.map((award, i) => (
              <li key={award.title} className="group border-b border-rule">
                <div className="grid gap-x-10 gap-y-3 py-7 transition-colors duration-500 ease-out group-hover:bg-ground-raised md:grid-cols-12 md:px-4">
                  <p className="num text-[0.8125rem] text-ink-3 md:col-span-2">
                    {award.year}
                  </p>

                  <div className="md:col-span-6">
                    <h4
                      className={`leading-snug text-ink ${
                        i === 0
                          ? "text-[clamp(1.25rem,1rem+1vw,1.75rem)] tracking-[-0.02em]"
                          : "text-[1.0625rem] font-medium"
                      }`}
                      style={i === 0 ? { fontFamily: "var(--font-display)" } : undefined}
                    >
                      {award.title}
                    </h4>
                    <p className="mt-1.5 text-[0.875rem] text-ink-3">{award.issuer}</p>
                  </div>

                  <div className="md:col-span-4">
                    <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                      {award.body}
                    </p>
                    {award.links && (
                      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                        {award.links.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="link inline-flex items-center gap-1.5 text-[0.875rem]"
                            >
                              {link.label}
                              <ArrowUpRightIcon
                                size={11}
                                weight="bold"
                                aria-hidden="true"
                                className="rtl:-scale-x-100"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* The accent rule draws across the row under the pointer. */}
                  <span
                    aria-hidden="true"
                    className="col-span-full h-px w-0 bg-accent transition-all duration-700 ease-out group-hover:w-full"
                  />
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {c.publications.map((paper) => (
          <Reveal key={paper.title}>
            <h3 className="meta mt-20">{c.ui.record.publication}</h3>
            <article className="frame mt-6 p-6 transition-colors duration-500 ease-out hover:bg-ground-raised md:p-10">
              <h4
                className="text-[clamp(1.125rem,1rem+0.9vw,1.6rem)] leading-snug text-ink"
                style={{ fontFamily: "var(--font-display)" }}
                dir="ltr"
                lang="en"
              >
                {paper.title}
              </h4>

              <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-3">
                <div>
                  <dt className="meta">{c.ui.record.authors}</dt>
                  <dd className="mt-2 text-[0.9375rem] text-ink-2">{paper.authors}</dd>
                </div>
                <div>
                  <dt className="meta">{c.ui.record.venue}</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                    {paper.venue}
                  </dd>
                </div>
                <div>
                  <dt className="meta">{c.ui.record.year}</dt>
                  <dd className="num mt-2 text-[0.9375rem] text-ink-2">{paper.year}</dd>
                </div>
              </dl>

              <ul className="mt-8 flex flex-wrap gap-3 border-t border-rule pt-6">
                {paper.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn btn-ghost text-[0.875rem]"
                    >
                      {link.label}
                      <ArrowUpRightIcon
                        size={11}
                        weight="bold"
                        aria-hidden="true"
                        className="rtl:-scale-x-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}

        <Reveal>
          <div className="mt-20 flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="meta">{c.ui.record.certification}</h3>
            <p className="text-[0.875rem] text-ink-3">
              {c.ui.record.certificationNote.replace(
                "{count}",
                String(c.certifications.total),
              )}
            </p>
          </div>

          <ul className="mt-6 grid border-t border-rule md:grid-cols-2">
            {c.credentials.map((credential) => (
              <li
                key={credential.name}
                className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 border-b border-rule py-4 transition-colors duration-300 ease-out hover:bg-ground-raised md:[&:nth-child(odd)]:border-e md:[&:nth-child(odd)]:pe-6 md:[&:nth-child(even)]:ps-6"
              >
                <IssuerMark icon={credential.icon} issuer={credential.issuer} />
                <span>
                  <span className="block text-[0.9375rem] leading-snug text-ink">
                    {credential.name}
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] text-ink-3">
                    {credential.issuer}
                  </span>
                </span>
                <span className="meta num">{credential.year ?? ""}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
