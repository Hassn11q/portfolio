import type { ReactNode } from "react";

/**
 * A marker, a spoken line, then the title. The title arrives one line at a
 * time from under its own baseline, which is the only place on the page where
 * type moves. Lines are split on words so the mask never cuts a word in half.
 */
export function SectionHeading({
  id,
  index,
  lead,
  title,
  intro,
}: {
  id?: string;
  /** Two-digit section marker, e.g. "01". */
  index?: string;
  /** One spoken line connecting this chapter to the previous one. */
  lead?: string;
  title: string;
  intro?: ReactNode;
}) {
  const words = title.split(" ");
  const half = Math.ceil(words.length / 2);
  const lines = words.length > 3 ? [words.slice(0, half), words.slice(half)] : [words];

  return (
    <div>
      <p className="meta flex items-center gap-2.5">
        <span aria-hidden="true" className="inline-block size-1.5 bg-accent" />
        {index && <span className="num">{index}</span>}
      </p>

      {lead && <p className="mt-6 max-w-[46ch] text-[0.9375rem] text-ink-2">{lead}</p>}

      <div className="mt-6 grid gap-x-16 gap-y-5 lg:grid-cols-12">
        <h2
          id={id}
          className="display-l lg:col-span-8 lg:text-[clamp(2.4rem,1.4rem+3.4vw,4rem)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {lines.map((line, i) => (
            <span key={line.join(" ")} className="mask-line" style={{ "--i": i } as React.CSSProperties}>
              <span>{line.join(" ")}</span>
            </span>
          ))}
        </h2>
        {intro && <p className="body self-end text-[0.9375rem] lg:col-span-4">{intro}</p>}
      </div>
    </div>
  );
}
