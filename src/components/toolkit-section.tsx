import type { SiteContent } from "@/data/content";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { LogoMarquee } from "./logo-marquee";
import { ToolLogo } from "./tool-logo";

/**
 * Four layers of one system, each with the marks of the tools that build it.
 * Logos rather than a list, because this is the section a recruiter scans
 * rather than reads.
 */
export function ToolkitSection({ c }: { c: SiteContent }) {
  return (
    <section id="stack" className="scroll-mt-28 border-t border-rule pt-24 md:pt-32">
      <LogoMarquee c={c} />

      <div className="shell pt-20 pb-24 md:pt-24 md:pb-32">
        <Reveal>
          <SectionHeading index="06"
            lead={c.ui.leads.toolkit} title={c.ui.toolkit.title} intro={c.ui.toolkit.intro} />
        </Reveal>

        <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {c.toolkit.map((group, i) => (
            <Reveal key={group.title} index={i}>
              <h3 className="text-[0.9375rem] font-medium text-ink">{group.title}</h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-3">
                {group.note}
              </p>
              <ul className="rise mt-6 space-y-3" data-reveal="">
                {group.items.map((item, j) => (
                  <ToolLogo
                    key={item.name}
                    name={item.name}
                    icon={item.icon}
                    index={j}
                  />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
