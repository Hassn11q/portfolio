import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { asset } from "@/data/content";
import type { Project } from "@/data/projects";
import type { UiStrings } from "@/data/ui";
import { ArchitectureDiagram } from "./architecture-diagram";
import { ResultChart } from "./result-chart";
import { Reveal } from "./reveal";
import { StackMarks } from "./stack-marks";
import { TranscriptFigure } from "./transcript-figure";

/**
 * One project per screen: a framed block with the work on one side and the
 * shortest possible account of it on the other. Sides alternate down the page.
 * Everything an engineer would want after that sits behind a disclosure, so
 * the depth is one click away instead of in the way.
 */
function Visual({ project }: { project: Project }) {
  // The diacritics figure is the hero's job; the case study shows the result
  // chart instead so the same demonstration does not run twice on one page.
  if (project.results) return <ResultChart table={project.results} label={project.results.caption} />;

  if (project.transcript) return <TranscriptFigure transcript={project.transcript} />;

  if (project.images) {
    const image = project.images[0];
    return (
      <a
        href={asset(image.src)}
        target="_blank"
        rel="noreferrer noopener"
        className="frame tilt settle block overflow-hidden"
      >
        <Image
          src={asset(image.src)}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="h-auto w-full"
        />
      </a>
    );
  }

  return null;
}

export function CaseStudy({
  project,
  index,
  ui,
}: {
  project: Project;
  index: number;
  ui: UiStrings;
}) {
  const [lead, ...rest] = project.sections;
  const visualFirst = index % 2 === 0;

  return (
    <Reveal
      as="article"
      id={project.slug}
      className="scroll-mt-28 border-t border-rule py-20 md:py-28"
    >
      <div className="shell">
        <p className="meta num">
          {String(index + 1).padStart(2, "0")} / {project.year}
        </p>

        <div className="mt-10 grid items-start gap-x-16 gap-y-12 lg:grid-cols-12">
          <div
            className={`lg:col-span-7 ${visualFirst ? "" : "lg:order-2 lg:col-start-6"}`}
          >
            <Visual project={project} />
          </div>

          <div
            className={`lg:sticky lg:top-28 lg:col-span-5 lg:self-start ${
              visualFirst ? "" : "lg:order-1 lg:row-start-1"
            }`}
          >
            <h3
              className="display-l flex flex-wrap items-baseline gap-x-4 text-[clamp(1.9rem,1.3rem+2vw,2.9rem)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
              {project.titleArabic && (
                <span
                  lang="ar"
                  dir="rtl"
                  className="text-[0.45em] font-normal text-ink-3"
                >
                  {project.titleArabic}
                </span>
              )}
            </h3>

            <p className="lede mt-6 text-[clamp(1.0625rem,1rem+0.4vw,1.25rem)]">
              {project.summary}
            </p>

            {project.highlights && (
              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
                {project.highlights.map((item) => (
                  <div key={item.label}>
                    <dt className="sr-only">{item.label}</dt>
                    <dd>
                      <span
                        className="num block text-[2rem] leading-none tracking-[-0.03em] text-ink"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {item.value}
                      </span>
                      <span className="mt-2 block max-w-[16ch] text-[0.8125rem] leading-snug text-ink-3">
                        {item.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-10">
              <StackMarks stack={project.stack} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {project.links.slice(0, 2).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link inline-flex items-center gap-1.5 text-[0.9375rem]"
                >
                  {link.label}
                  <ArrowUpRightIcon
                    size={12}
                    weight="bold"
                    aria-hidden="true"
                    className="rtl:-scale-x-100"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <details className="group mt-16 border-t border-rule pt-8">
          <summary className="btn btn-ghost inline-flex cursor-pointer list-none text-[0.9375rem] marker:content-none">
            <span className="group-open:hidden">{ui.showDetails}</span>
            <span className="hidden group-open:inline">{ui.hideDetails}</span>
          </summary>

          <div className="mt-12">
            <div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
              {[lead, ...rest].map((section) => (
                <section key={section.heading}>
                  <h4 className="text-sm font-medium text-ink">{section.heading}</h4>
                  <p className="body mt-3">{section.body}</p>
                </section>
              ))}
            </div>

            {project.diagram && (
              <ArchitectureDiagram diagram={project.diagram} label={ui.architecture} />
            )}

            <div className="mt-10">
              <h4 className="meta">{ui.builtWith}</h4>
              <p className="mt-2.5 max-w-[70ch] text-[0.9375rem] text-ink-2">
                {project.stack.join(", ")}
              </p>
            </div>
          </div>
        </details>
      </div>
    </Reveal>
  );
}
