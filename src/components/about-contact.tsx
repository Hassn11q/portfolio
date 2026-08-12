import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr/GithubLogo";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr/LinkedinLogo";
import { links } from "@/data/content";
import type { SiteContent } from "@/data/content";
import { LocalTime } from "./local-time";
import { Monogram } from "./monogram";
import { Reveal } from "./reveal";

/**
 * The one place on the page that commits to the accent as a full field. It is
 * the last thing read, and the only section that changes ground colour.
 */
export function ContactSection({ c }: { c: SiteContent }) {
  return (
    <>
      <div aria-hidden="true" className="curtain curtain-accent" />
      <section id="contact" className="scroll-mt-28 bg-accent py-24 text-accent-ink md:py-32">
      <div className="shell">
        <Reveal>
          <h2
            className="display-l max-w-[16ch]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {c.ui.contact.title}
          </h2>
          <p className="lede mt-6 max-w-[44ch] text-accent-ink">
{c.ui.contact.lede}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="btn bg-accent-ink text-accent hover:bg-accent-ink/90"
            >
              <LinkedinLogoIcon size={17} weight="light" aria-hidden="true" />
              LinkedIn
              <span className="grid size-6 place-items-center rounded-full bg-accent/15">
                <ArrowUpRightIcon size={12} weight="bold" aria-hidden="true" className="rtl:-scale-x-100" />
              </span>
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="btn border border-accent-ink/70 text-accent-ink hover:border-accent-ink hover:bg-accent-ink/10"
            >
              <GithubLogoIcon size={17} weight="light" aria-hidden="true" />
              GitHub
            </a>
            <a
              href={links.kaggle}
              target="_blank"
              rel="noreferrer noopener"
              className="btn border border-accent-ink/70 text-accent-ink hover:border-accent-ink hover:bg-accent-ink/10"
            >
              {c.ui.contact.kaggle}
            </a>
          </div>

          <p className="mt-12 text-[0.9375rem] text-accent-ink">
            {c.location}
            <span className="mx-2 opacity-60" aria-hidden="true">
              /
            </span>
            <LocalTime template={c.ui.localTime} locale={c.locale} />
          </p>
        </Reveal>
      </div>
      </section>
    </>
  );
}

export function SiteFooter({ c }: { c: SiteContent }) {
  return (
    <footer className="border-t border-rule py-10">
      <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <p className="meta flex items-center gap-2.5">
          <Monogram className="size-4 text-ink-2" />
          {c.name}
          <span className="mx-2 text-ink-3" aria-hidden="true">
            /
          </span>
          <span
            lang={c.locale === "en" ? "ar" : "en"}
            dir={c.locale === "en" ? "rtl" : "ltr"}
          >
            {c.nameAlternate}
          </span>
        </p>
        <p className="meta num">
          {c.location}
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
