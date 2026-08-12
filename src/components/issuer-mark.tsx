import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

/** The issuer's own mark where one exists, and its initials where it does not. */
export function IssuerMark({ icon, issuer }: { icon?: string; issuer: string }) {
  const icons = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;
  const mark = icon
    ? icons[`si${icon.charAt(0).toUpperCase()}${icon.slice(1)}`]
    : undefined;

  return (
    <span className="grid size-7 shrink-0 place-items-center border border-rule">
      {mark ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5 fill-ink-2">
          <path d={mark.path} />
        </svg>
      ) : (
        <span aria-hidden="true" className="mono text-[0.5625rem] text-ink-3">
          {issuer
            .split(" ")
            .slice(0, 2)
            .map((word) => word[0])
            .join("")}
        </span>
      )}
    </span>
  );
}
