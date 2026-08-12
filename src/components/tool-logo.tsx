import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

/**
 * Vendor marks come from Simple Icons and are rendered as inline paths in the
 * page's own ink colour, so nothing is fetched from a CDN and both themes work
 * without a second asset. A tool with no mark keeps its name in monospace.
 */
function lookup(slug: string): SimpleIcon | null {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const icons = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;
  return icons[key] ?? null;
}

export function ToolLogo({
  name,
  icon,
  index = 0,
}: {
  name: string;
  icon?: string;
  index?: number;
}) {
  const mark = icon ? lookup(icon) : null;

  return (
    <li
      className="group flex items-center gap-3"
      style={{ "--i": index } as React.CSSProperties}
    >
      <span className="grid size-9 shrink-0 place-items-center border border-rule bg-ground-raised transition-colors duration-300 ease-out group-hover:border-rule-2">
        {mark ? (
          <svg
            role="img"
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-[18px] fill-ink-2 transition-colors duration-300 ease-out group-hover:fill-ink"
          >
            <path d={mark.path} />
          </svg>
        ) : (
          <span aria-hidden="true" className="mono text-[0.625rem] text-ink-3">
            {name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      <span className="text-[0.9375rem] text-ink-2 transition-colors duration-300 ease-out group-hover:text-ink">
        {name}
      </span>
    </li>
  );
}
