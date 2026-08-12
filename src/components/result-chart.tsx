import type { ResultTable } from "@/data/projects";

/**
 * The leaderboard as a picture. Bars are the WER column of the paper's own
 * table, scaled against the weakest baseline, so the gap is legible in one
 * look. The full table stays available underneath for anyone who wants it.
 */
export function ResultChart({ table, label }: { table: ResultTable; label: string }) {
  const rows = table.rows.map((row) => ({
    name: row.cells[0],
    value: Number(row.cells[2]),
    highlight: row.highlight ?? false,
  }));
  const max = Math.max(...rows.map((r) => r.value));

  return (
    <figure className="mt-12">
      <figcaption className="meta">{label}</figcaption>
      <ul className="mt-6 space-y-3.5">
        {rows.map((row) => (
          <li key={row.name} className="grid grid-cols-[1fr_auto] items-center gap-x-5">
            <span
              className={`text-[0.9375rem] ${row.highlight ? "text-ink" : "text-ink-2"}`}
            >
              {row.name}
            </span>
            <span
              className={`num text-[0.9375rem] tabular-nums ${
                row.highlight ? "text-ink" : "text-ink-3"
              }`}
            >
              {row.value.toFixed(2)}
            </span>
            <span
              aria-hidden="true"
              className="col-span-2 mt-1.5 block h-[3px] w-full bg-ground-sunk"
            >
              <span
                className={`block h-full ${row.highlight ? "bg-accent" : "bg-rule-2"}`}
                style={{ width: `${(row.value / max) * 100}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
