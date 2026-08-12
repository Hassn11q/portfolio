import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import type { SiteContent } from "@/data/content";

/**
 * One slow band of the marks behind the work. It is the only element on the
 * page that moves on its own, it stops on hover, and it stops entirely under
 * reduced motion. The names are already listed below it, so nothing here is
 * the only carrier of information.
 */
export function LogoMarquee({ c }: { c: SiteContent }) {
  const icons = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;

  const marks = c.toolkit
    .flatMap((group) => group.items)
    .map((item) => {
      if (!item.icon) return null;
      const key = `si${item.icon.charAt(0).toUpperCase()}${item.icon.slice(1)}`;
      const icon = icons[key];
      return icon ? { name: item.name, path: icon.path } : null;
    })
    .filter((mark): mark is { name: string; path: string } => mark !== null);

  // Two lanes of a short list keep the band moving without shipping a hundred
  // inline paths into the document.
  const lane = marks.slice(0, 14);

  return (
    <div
      aria-hidden="true"
      className="marquee group relative flex overflow-hidden border-y border-rule py-8"
    >
      <ul className="marquee-track flex shrink-0 items-center gap-14 pe-14">
        {lane.map((mark, i) => (
          <li key={`${mark.name}-${i}`}>
            <svg viewBox="0 0 24 24" className="size-7 fill-ink-3 transition-colors duration-300 ease-out hover:fill-ink">
              <path d={mark.path} />
            </svg>
          </li>
        ))}
      </ul>
      <ul className="marquee-track flex shrink-0 items-center gap-14 pe-14">
        {lane.map((mark, i) => (
          <li key={`${mark.name}-b-${i}`}>
            <svg viewBox="0 0 24 24" className="size-7 fill-ink-3">
              <path d={mark.path} />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}
