import { CountUp } from "./count-up";
import { githubUser } from "@/data/content";
import type { SiteContent } from "@/data/content";

/**
 * Five verifiable numbers on one dark band. The GitHub figures are read live
 * from the public API at build time; if that call fails the band renders the
 * two figures that come from the paper and the certifications count.
 */
async function githubStats(): Promise<{ repos: number } | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUser}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return { repos: data.public_repos ?? 0 };
  } catch {
    return null;
  }
}

export async function EvidenceBand({ c }: { c: SiteContent }) {
  const stats = await githubStats();

  const figures = [
    { value: "1st", label: c.ui.evidence.place },
    { value: "23.26%", label: c.ui.evidence.wer },
    ...(stats ? [{ value: String(stats.repos), label: c.ui.evidence.repos }] : []),
    { value: String(c.certifications.total), label: c.ui.evidence.certifications },
  ];

  return (
    <>
      <div aria-hidden="true" className="curtain curtain-ink" />
      <section className="bg-ink text-ground">
      <dl
        data-reveal=""
        className="reveal rise shell grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-4 md:py-20"
      >
        {figures.map((figure, i) => (
          <div key={figure.label} style={{ "--i": i } as React.CSSProperties}>
            <dt className="sr-only">{figure.label}</dt>
            <dd>
              <span
                className="num block text-[clamp(2.25rem,1.6rem+1.8vw,3.25rem)] leading-none tracking-[-0.04em]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <CountUp value={figure.value} />
              </span>
              <span className="mt-4 block max-w-[18ch] text-[0.8125rem] leading-snug opacity-75">
                {figure.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      </section>
    </>
  );
}
