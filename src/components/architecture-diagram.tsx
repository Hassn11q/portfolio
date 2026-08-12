import type { Diagram } from "@/data/projects";

/**
 * The flow as a quiet numbered list rather than a row of boxes. Six small
 * boxes squeezed across a page read as texture; rows read as a sequence, and
 * they behave the same in both writing directions.
 */
export function ArchitectureDiagram({
  diagram,
  label,
}: {
  diagram: Diagram;
  label: string;
}) {
  return (
    <figure className="mt-10">
      <figcaption className="meta">{label}</figcaption>
      <p className="sr-only">{diagram.description}</p>

      <ol aria-hidden="true" className="mt-5 border-t border-rule">
        {diagram.stages.map((stage, i) => (
          <li
            key={stage.label}
            className="grid grid-cols-[2rem_1fr] items-baseline gap-x-4 border-b border-rule py-3.5 md:grid-cols-[3rem_16rem_1fr] md:gap-x-8"
          >
            <span className="num text-[0.75rem] text-ink-3">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[0.9375rem] text-ink">{stage.label}</span>
            <span className="col-start-2 text-[0.875rem] text-ink-2 md:col-start-3">
              {stage.detail}
              {stage.items && (
                <span className="mt-1 block text-ink-3">{stage.items.join(", ")}</span>
              )}
            </span>
          </li>
        ))}
      </ol>

      {diagram.loop && <p className="mt-3 text-[0.875rem] text-ink-2">{diagram.loop}</p>}
    </figure>
  );
}
