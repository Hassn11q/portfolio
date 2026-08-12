import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { iconFor } from "@/data/tool-icons";

/**
 * The recognisable part of a project's stack, as marks. Names still appear in
 * full inside the disclosure, so nothing depends on recognising a logo.
 */
export function StackMarks({ stack }: { stack: string[] }) {
  const icons = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;

  const marks = stack
    .map((name) => {
      const slug = iconFor[name];
      if (!slug) return null;
      const icon = icons[`si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`];
      return icon ? { name, path: icon.path } : null;
    })
    .filter((mark): mark is { name: string; path: string } => mark !== null);

  const rest = stack.length - marks.length;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <ul className="flex flex-wrap items-center gap-4">
        {marks.map((mark) => (
          <li key={mark.name}>
            <svg
              role="img"
              aria-label={mark.name}
              viewBox="0 0 24 24"
              className="size-5 fill-ink-3 transition-colors duration-300 ease-out hover:fill-ink"
            >
              <title>{mark.name}</title>
              <path d={mark.path} />
            </svg>
          </li>
        ))}
      </ul>
      {rest > 0 && (
        <span className="mono text-[0.75rem] text-ink-3">
          {stack.filter((name) => !iconFor[name]).slice(0, 3).join(" · ")}
        </span>
      )}
    </div>
  );
}
