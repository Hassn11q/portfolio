import type { SiteContent } from "@/data/content";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function ExperienceSection({ c }: { c: SiteContent }) {
  return (
    <section id="experience" className="border-t border-rule py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading index="05"
            lead={c.ui.leads.experience} title={c.ui.experience.title} />
        </Reveal>

        <ol className="mt-14 grid gap-y-12 border-b border-rule pb-16 md:gap-y-14">
          {c.ui.story.beats.map((beat, i) => (
            <Reveal as="li" key={beat.marker} index={i}>
              <div className="grid gap-x-12 gap-y-3 lg:grid-cols-12">
                <p className="num text-[0.8125rem] text-ink-3 lg:col-span-2">
                  {beat.marker}
                </p>
                <p
                  className="text-[clamp(1.2rem,1rem+1.1vw,1.85rem)] leading-[1.4] tracking-[-0.02em] text-ink transition-colors duration-500 lg:col-span-10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {beat.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <ol className="relative mt-16 md:before:absolute md:before:inset-y-0 md:before:w-px md:before:bg-rule md:before:content-[''] md:before:[inset-inline-start:0]">
          {c.experience.map((role, i) => (
            <Reveal as="li" key={role.org + role.title} index={i}>
              <div className="group relative grid gap-x-10 gap-y-3 border-t border-rule py-8 transition-colors duration-500 ease-out hover:bg-ground-raised md:grid-cols-12 md:px-4">
                {/* A marker on the spine, filled while the row is read. */}
                <span
                  aria-hidden="true"
                  className="absolute top-8 hidden size-2 -translate-y-1/2 rounded-full border border-rule-2 bg-ground transition-colors duration-300 ease-out group-hover:border-accent group-hover:bg-accent md:block"
                  style={{ insetInlineStart: "-0.3rem" }}
                />
                <div className="md:col-span-4">
                  <p className="num text-sm text-ink-3">{role.period}</p>
                  {(role.type || role.location) && (
                    <p className="meta mt-1.5">
                      {[role.type, role.location].filter(Boolean).join(", ")}
                    </p>
                  )}
                </div>

                <div className="md:col-span-8">
                  <h3 className="text-lg font-medium tracking-[-0.015em] text-ink">
                    {role.title}
                  </h3>
                  <p className="mt-1 text-[0.9375rem] text-ink-2">{role.org}</p>

                  {role.body && (
                    <p className="body mt-3 text-[0.9375rem]">{role.body}</p>
                  )}

                  {role.points && (
                    <ul className="mt-4 space-y-2">
                      {role.points.map((point) => (
                        <li
                          key={point}
                          className="body max-w-[68ch] pl-4 text-[0.9375rem] before:absolute before:-ml-4 before:text-ink-3 before:content-['·'] relative"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {role.nested && (
                    <ul className="mt-5 space-y-4 border-s border-rule ps-5">
                      {role.nested.map((entry) => (
                        <li key={entry.title}>
                          <p className="text-[0.9375rem] font-medium text-ink">
                            {entry.title}
                          </p>
                          <p className="num mt-0.5 text-sm text-ink-3">{entry.period}</p>
                          {entry.body && (
                            <p className="body mt-2 text-sm">{entry.body}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal as="li" index={c.experience.length}>
            <div className="group relative grid gap-x-10 gap-y-3 border-t border-rule py-8 transition-colors duration-500 ease-out hover:bg-ground-raised md:grid-cols-12 md:px-4">
              <span
                aria-hidden="true"
                className="absolute top-8 hidden size-2 -translate-y-1/2 rounded-full border border-rule-2 bg-ground transition-colors duration-300 ease-out group-hover:border-accent group-hover:bg-accent md:block"
                style={{ insetInlineStart: "-0.3rem" }}
              />
              <div className="md:col-span-4">
                <p className="num text-sm text-ink-3">{c.education.period}</p>
                <p className="meta mt-1.5">{c.ui.experience.education}</p>
              </div>
              <div className="md:col-span-8">
                <h3 className="text-lg font-medium tracking-[-0.015em] text-ink">
                  {c.education.degree}
                </h3>
                <p className="mt-1 text-[0.9375rem] text-ink-2">{c.education.school}</p>
                <p className="body mt-3 text-[0.9375rem]">
                  {c.education.honor}. Graduation project: {c.education.project}.
                </p>
              </div>
            </div>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
