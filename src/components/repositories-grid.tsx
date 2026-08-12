import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { githubUser, links } from "@/data/content";
import type { SiteContent } from "@/data/content";

type RepoMeta = { stars: number; pushedAt: string };

/**
 * Live repository metadata from the GitHub public API. No token, cached for an
 * hour, and every failure mode falls back to rendering the list without counts.
 */
async function fetchMeta(name: string): Promise<RepoMeta | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${githubUser}/${name}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return { stars: data.stargazers_count ?? 0, pushedAt: data.pushed_at ?? "" };
  } catch {
    return null;
  }
}

function formatYear(iso: string) {
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : String(date.getFullYear());
}

/** A list, not a wall of cards: one line each, so the eye can run down it. */
export async function RepositoriesGrid({ c }: { c: SiteContent }) {
  const shown = c.repositories.slice(0, 6);
  const meta = await Promise.all(shown.map((repo) => fetchMeta(repo.name)));

  return (
    <>
      <ul className="mt-12 border-t border-rule">
        {shown.map((repo, i) => {
          const year = meta[i] ? formatYear(meta[i]!.pushedAt) : null;

          return (
            <li key={repo.name} className="border-b border-rule">
              <a
                href={`https://github.com/${githubUser}/${repo.name}`}
                target="_blank"
                rel="noreferrer noopener"
                className="group grid items-baseline gap-x-8 gap-y-1 py-5 md:grid-cols-[18rem_1fr_auto]"
              >
                <span
                  className="mono text-[0.9375rem] text-ink transition-colors duration-300 ease-out group-hover:text-accent"
                  dir="ltr"
                >
                  {repo.name}
                </span>
                <span className="text-[0.9375rem] leading-snug text-ink-2">
                  {repo.blurb.split(". ")[0]}.
                </span>
                <span className="meta num md:text-end">{year}</span>
              </a>
            </li>
          );
        })}
      </ul>

      <a
        href={`${links.github}?tab=repositories`}
        target="_blank"
        rel="noreferrer noopener"
        className="link mt-8 inline-flex items-center gap-1.5 text-[0.9375rem]"
      >
        {c.ui.allRepos}
        <ArrowUpRightIcon
          size={12}
          weight="bold"
          aria-hidden="true"
          className="rtl:-scale-x-100"
        />
      </a>
    </>
  );
}
