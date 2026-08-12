import type { SiteContent } from "@/data/content";
import { HeroDemo } from "./hero-demo";
import { Magnetic } from "./magnetic";
import { ArrowDownRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowDownRight";

/**
 * Type only, then one solid band of facts. The projects below open with real
 * visuals, so the first screen does not compete with them.
 */
export function Hero({ c }: { c: SiteContent }) {
  return (
    <section id="top" className="relative">

      <div className="rise is-in shell pt-28 pb-16 md:pt-32 md:pb-20">

        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="text-[1.0625rem] font-medium text-ink">{c.name}</span>
          <span className="text-[1.0625rem] text-accent">{c.role}</span>
        </p>

        <h1
          className="display-xl mt-6 max-w-[20ch]"
          style={{ fontFamily: "var(--font-display)", "--i": 1 } as React.CSSProperties}
        >
          {c.hero.headline}
        </h1>

        <p
          className="lede mt-7 max-w-[52ch] text-[clamp(1.0625rem,1rem+0.5vw,1.3rem)]"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {c.hero.lede}
        </p>

        <div
          className="mt-8 flex flex-wrap items-center gap-3"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <Magnetic>
            <a href="#work" className="btn btn-primary">
              {c.ui.heroPrimary}
              <span className="grid size-6 place-items-center rounded-full bg-ground/15">
                <ArrowDownRightIcon
                  size={13}
                  weight="bold"
                  aria-hidden="true"
                  className="rtl:-scale-x-100"
                />
              </span>
            </a>
          </Magnetic>
          <a href="#contact" className="btn btn-ghost">
            {c.ui.heroSecondary}
          </a>
          <a href={c.locale === "en" ? "/cv" : "/ar/cv"} className="btn btn-ghost">
            {c.ui.cv}
          </a>
        </div>

        {c.projects[0].demo && (
          <div className="mt-12" style={{ "--i": 4 } as React.CSSProperties}>
            <HeroDemo
              demo={c.projects[0].demo}
              labels={c.ui.demo}
            />
          </div>
        )}
      </div>

      {/* One solid band carrying the three facts worth knowing before scrolling. */}
      <div aria-hidden="true" className="curtain curtain-ink" />
      <div className="bg-ink text-ground">
        <dl className="shell grid gap-x-12 gap-y-10 py-14 sm:grid-cols-3 md:py-20">
          <div>
            <dt className="mono text-[0.6875rem] tracking-[0.14em] uppercase opacity-75">
              {c.ui.heroFacts.now}
            </dt>
            <dd className="mt-3 text-[1.0625rem] leading-snug">
              {c.role}, {c.location.split(",")[0]}
            </dd>
          </div>
          <div>
            <dt className="mono text-[0.6875rem] tracking-[0.14em] uppercase opacity-75">
              {c.ui.heroFacts.sharedTask}
            </dt>
            <dd className="mt-3 text-[1.0625rem] leading-snug">
              {c.recognition[0].title}
            </dd>
          </div>
          <div>
            <dt className="mono text-[0.6875rem] tracking-[0.14em] uppercase opacity-75">
              {c.ui.heroFacts.published}
            </dt>
            <dd className="mt-3 text-[1.0625rem] leading-snug">
              <a
                className="underline decoration-1 underline-offset-[0.3em] transition-colors duration-200 ease-out hover:text-accent"
                href="https://aclanthology.org/2026.osact-1.29/"
                target="_blank"
                rel="noreferrer noopener"
              >
                OSACT7, LREC 2026
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
