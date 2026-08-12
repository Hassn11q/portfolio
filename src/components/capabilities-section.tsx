import type { SiteContent } from "@/data/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/**
 * What full-stack means here, in three moves. It sits between the work and the
 * record so a reader who skipped the case studies still knows what the person
 * does all day.
 */
export function CapabilitiesSection({ c }: { c: SiteContent }) {
  return (
    <section id="capabilities" className="scroll-mt-28 border-t border-rule bg-ground-sunk py-24 md:py-32">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="03"
            lead={c.ui.leads.capabilities}
            title={c.ui.capabilities.title}
            intro={c.ui.capabilities.intro}
          />
        </Reveal>

        <ol className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-3">
          {c.ui.capabilities.groups.map((group, i) => (
            <Reveal as="li" key={group.title} index={i}>
              <p className="num text-[0.75rem] text-ink-3">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className="mt-5 text-[1.375rem] leading-tight tracking-[-0.02em] text-ink md:text-[1.625rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {group.title}
              </h3>
              <p className="body mt-4 text-[0.9375rem]">{group.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
