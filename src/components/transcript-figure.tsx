import type { Transcript } from "@/data/projects";

/**
 * The voice prototype has no screenshot, so its visual is the thing it actually
 * produces: the fixed conversational flow from its own system prompt, and the
 * phrase that ends the call.
 */
export function TranscriptFigure({ transcript }: { transcript: Transcript }) {
  return (
    <figure className="frame p-6 md:p-10">
      <ol className="space-y-3" dir="rtl" lang="ar">
        {transcript.turns.map((turn, i) => (
          <li
            key={`${turn.role}-${i}`}
            className={turn.role === "caller" ? "flex justify-start" : "flex justify-end"}
          >
            <span
              className={`inline-block max-w-[34ch] px-4 py-2.5 text-[0.9375rem] leading-relaxed ${
                turn.role === "caller"
                  ? "bg-ground-sunk text-ink-2"
                  : "bg-ink text-ground"
              }`}
            >
              {turn.text}
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="meta mt-8 border-t border-rule pt-5 leading-relaxed">
        {transcript.note}
      </figcaption>
    </figure>
  );
}
