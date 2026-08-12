import type { SiteContent } from "@/data/content";

/**
 * One page of CV, built from the same data as the site so the two can never
 * disagree. It is styled for paper first: hairlines, no colour fills, and a
 * print stylesheet that drops the site chrome.
 */
export function CvDocument({ c }: { c: SiteContent }) {
  return (
    <article className="cv mx-auto max-w-[52rem] px-6 py-16 md:px-10">
      <header className="border-b border-rule pb-8">
        <h1
          className="text-[2.5rem] leading-none tracking-[-0.03em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {c.name}
        </h1>
        <p className="mt-3 text-[1.0625rem] text-ink-2">{c.role}</p>
        <p className="meta mt-4">
          {c.location}
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          github.com/Hassn11q
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          linkedin.com/in/hassnalqaeri
        </p>
      </header>

      <section className="mt-8">
        <p className="body max-w-none text-[0.9375rem]">{c.bio.lead}</p>
      </section>

      <section className="mt-10">
        <h2 className="meta">{c.ui.record.title}</h2>
        <ul className="mt-4 space-y-4">
          {c.awards.map((award) => (
            <li key={award.title} className="grid grid-cols-[4rem_1fr] gap-4">
              <span className="num text-[0.8125rem] text-ink-3">{award.year}</span>
              <span>
                <span className="block text-[0.9375rem] font-medium text-ink">
                  {award.title}
                </span>
                <span className="block text-[0.875rem] text-ink-2">{award.issuer}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="meta">{c.ui.experience.title}</h2>
        <ul className="mt-4 space-y-5">
          {c.experience.map((role) => (
            <li key={role.org + role.title} className="grid grid-cols-[9rem_1fr] gap-4">
              <span className="num text-[0.8125rem] text-ink-3">{role.period}</span>
              <span>
                <span className="block text-[0.9375rem] font-medium text-ink">
                  {role.title}
                </span>
                <span className="block text-[0.875rem] text-ink-2">{role.org}</span>
                {role.nested && (
                  <ul className="mt-2 space-y-1">
                    {role.nested.map((entry) => (
                      <li key={entry.title} className="text-[0.875rem] text-ink-2">
                        {entry.title}, {entry.period}
                      </li>
                    ))}
                  </ul>
                )}
              </span>
            </li>
          ))}
          <li className="grid grid-cols-[9rem_1fr] gap-4">
            <span className="num text-[0.8125rem] text-ink-3">{c.education.period}</span>
            <span>
              <span className="block text-[0.9375rem] font-medium text-ink">
                {c.education.degree}
              </span>
              <span className="block text-[0.875rem] text-ink-2">
                {c.education.school}. {c.education.honor}
              </span>
            </span>
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="meta">{c.ui.work.title}</h2>
        <ul className="mt-4 space-y-4">
          {c.projects.map((project) => (
            <li key={project.slug}>
              <span className="block text-[0.9375rem] font-medium text-ink">
                {project.title}
                <span className="ms-2 text-ink-3">{project.year}</span>
              </span>
              <span className="block text-[0.875rem] text-ink-2">{project.summary}</span>
              <span className="mono mt-1 block text-[0.75rem] text-ink-3">
                {project.stack.join(", ")}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="meta">{c.ui.toolkit.title}</h2>
        <ul className="mt-4 space-y-2">
          {c.toolkit.map((group) => (
            <li key={group.title} className="text-[0.875rem]">
              <span className="text-ink">{group.title}: </span>
              <span className="text-ink-2">
                {group.items.map((item) => item.name).join(", ")}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 border-t border-rule pt-6">
        <h2 className="meta">{c.ui.record.certification}</h2>
        <ul className="mt-4 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
          {c.credentials.map((credential) => (
            <li key={credential.name} className="text-[0.875rem] text-ink-2">
              {credential.name}, {credential.issuer}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
