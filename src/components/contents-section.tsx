import { ArrowDownRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowDownRight";
import type { SiteContent } from "@/data/content";
import { Reveal } from "./reveal";

/**
 * The table of contents. It sits directly under the opening screen so a reader
 * can see the whole shape of the page before committing to it, and jump to the
 * chapter they came for.
 */
export function ContentsSection({ c }: { c: SiteContent }) {
  return (
    <section className="border-b border-rule py-20 md:py-24">
      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="meta">{c.ui.contents.title}</h2>
            <p className="max-w-[42ch] text-[0.9375rem] text-ink-2">{c.ui.contents.lead}</p>
          </div>
        </Reveal>

        <ol className="mt-10 border-t border-rule">
          {c.ui.contents.entries.map((entry, i) => (
            <Reveal as="li" key={entry.id} index={i}>
              <a
                href={`#${entry.id}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-6 border-b border-rule py-5 transition-colors duration-300 ease-out hover:text-accent md:grid-cols-[3rem_18rem_1fr_auto] md:gap-x-10"
              >
                <span className="num text-[0.75rem] text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-[1.0625rem] leading-snug tracking-[-0.015em] md:text-xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {entry.title}
                </span>
                <span className="col-span-2 text-[0.875rem] text-ink-2 md:col-span-1 md:col-start-3">
                  {entry.note}
                </span>
                <ArrowDownRightIcon
                  size={13}
                  weight="bold"
                  aria-hidden="true"
                  className="col-start-3 row-start-1 shrink-0 text-ink-3 transition-transform duration-300 ease-out group-hover:translate-y-px group-hover:text-accent md:col-start-4 rtl:-scale-x-100"
                />
              </a>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
