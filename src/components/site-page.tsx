import { AchievementsSection } from "./achievements-section";
import { BackToTop } from "./back-to-top";
import { BioSection } from "./bio-section";
import { CapabilitiesSection } from "./capabilities-section";
import { ContentsSection } from "./contents-section";
import { CaseStudy } from "./case-study";
import { ChapterRail } from "./chapter-rail";
import { ContactSection, SiteFooter } from "./about-contact";
import { EvidenceBand } from "./evidence-band";
import { ExperienceSection } from "./experience-section";
import { Hero } from "./hero";
import { RepositoriesGrid } from "./repositories-grid";
import { Reveal } from "./reveal";
import { RevealObserver } from "./reveal-observer";
import { ScrollProgress } from "./scroll-progress";
import { SectionHeading } from "./section-heading";
import { SiteNav } from "./site-nav";
import { ToolkitSection } from "./toolkit-section";
import type { SiteContent } from "@/data/content";

/**
 * The page is told in order: a statement, who is saying it, the work, what the
 * work involves, what it has been measured against, the path that led here,
 * the tools, and a way to reply. Grounds change between chapters so scrolling
 * feels like moving from one to the next.
 */
export function SitePage({ c }: { c: SiteContent }) {
  return (
    <>
      <ScrollProgress />
      <SiteNav c={c} />
      <ChapterRail c={c} />
      <RevealObserver />
      <main id="main">
        <Hero c={c} />
        <ContentsSection c={c} />
        <BioSection c={c} />

        <section id="work" className="pt-24 md:pt-32">
          <div className="shell">
            <Reveal>
              <SectionHeading
                index="02"
                lead={c.ui.leads.work}
                title={c.ui.work.title}
                intro={c.ui.work.intro}
              />
            </Reveal>
          </div>

          <div className="mt-16">
            {c.projects.map((project, i) => (
              <CaseStudy key={project.slug} project={project} index={i} ui={c.ui} />
            ))}
          </div>

          <div className="shell border-t border-rule pt-20 pb-24 md:pt-24 md:pb-32">
            <Reveal>
              <h3 className="display-m" style={{ fontFamily: "var(--font-display)" }}>
                {c.ui.repositories.title}
              </h3>
              <p className="body mt-4 max-w-[58ch] text-[0.9375rem]">
                {c.ui.repositories.intro}
              </p>
            </Reveal>
            <RepositoriesGrid c={c} />
          </div>
        </section>

        <CapabilitiesSection c={c} />
        <EvidenceBand c={c} />
        <AchievementsSection c={c} />
        <ExperienceSection c={c} />
        <ToolkitSection c={c} />
        <ContactSection c={c} />
      </main>
      <SiteFooter c={c} />
      <BackToTop label={c.ui.backToTop} />
    </>
  );
}
