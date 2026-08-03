import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/content/PortableText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Bezel } from "@/components/ui/Bezel";
import { MetricStat } from "@/components/ui/MetricStat";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { getBaseUrl } from "@/lib/config";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies();
  return caseStudies.map((cs) => ({ slug: cs.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return {};
  const sub = [cs.company, cs.year].filter(Boolean).join(" · ");
  const ogUrl = `${getBaseUrl()}/og?${new URLSearchParams({ title: cs.title, type: "Case Study", ...(sub && { sub }) }).toString()}`;
  return {
    title: cs.title,
    description: cs.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { images: [ogUrl] },
    twitter: { card: "summary_large_image", images: [ogUrl] },
  };
}

function SectionEyebrow({ index, title }: { index: number; title: string }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-accent">
      {String(index).padStart(2, "0")} · {title}
    </p>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const hasBody = !!cs.body && (cs.body as unknown[]).length > 0;
  const hasNarrative =
    !!cs.problem ||
    !!cs.constraints?.length ||
    !!cs.decisions?.length ||
    !!cs.outcomeNarrative;

  // Sequential section numbering regardless of which fields exist
  let sectionIndex = 0;
  const nextIndex = () => ++sectionIndex;

  return (
    <main id="main-content" className="flex-1">
      <Container size="md" className="py-14 sm:py-20">
        <ScrollReveal className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
            {cs.company}
            {cs.role ? ` · ${cs.role}` : ""}
            {cs.year ? ` · ${cs.year}` : ""}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {cs.title}
          </h1>
          {cs.summary && (
            <p className="mt-4 max-w-xl text-base text-foreground-muted sm:text-lg">
              {cs.summary}
            </p>
          )}
          {cs.tags && cs.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-foreground-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </ScrollReveal>

        {cs.coverImage && (
          <ScrollReveal delay={0.1} className="mb-12">
            <Bezel className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={urlFor(cs.coverImage).width(1200).height(675).url()}
                alt={cs.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </Bezel>
          </ScrollReveal>
        )}

        <div className="flex flex-col gap-10 lg:flex-row-reverse lg:gap-12">
          {/* Outcomes — strip on mobile, sticky rail on desktop */}
          {cs.outcomes && cs.outcomes.length > 0 && (
            <aside className="lg:w-60 lg:shrink-0">
              <ScrollReveal delay={0.12} className="lg:sticky lg:top-24">
                <Bezel className="grid grid-cols-2 gap-x-6 gap-y-5 p-5 lg:grid-cols-1">
                  <p className="col-span-full font-mono text-[11px] uppercase tracking-widest text-foreground-muted">
                    Outcomes
                  </p>
                  {cs.outcomes.map((o) => (
                    <MetricStat
                      key={o.label}
                      label={o.label}
                      value={o.value}
                      delta={o.delta}
                    />
                  ))}
                </Bezel>
              </ScrollReveal>
            </aside>
          )}

          <div className="min-w-0 flex-1">
            {cs.problem && (
              <ScrollReveal className="mb-12">
                <SectionEyebrow index={nextIndex()} title="Problem" />
                <p className="mt-3 text-base leading-relaxed text-foreground">
                  {cs.problem}
                </p>
              </ScrollReveal>
            )}

            {cs.constraints && cs.constraints.length > 0 && (
              <ScrollReveal className="mb-12">
                <SectionEyebrow index={nextIndex()} title="Constraints" />
                <ul className="mt-4 space-y-2.5">
                  {cs.constraints.map((c) => (
                    <li
                      key={c}
                      className="flex gap-3 text-sm leading-relaxed text-foreground-muted"
                    >
                      <span
                        aria-hidden
                        className="select-none font-mono text-accent"
                      >
                        •
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            )}

            {cs.decisions && cs.decisions.length > 0 && (
              <ScrollReveal className="mb-12">
                <SectionEyebrow index={nextIndex()} title="Decisions" />
                <Bezel shellClassName="mt-4" className="divide-y divide-border overflow-hidden bg-surface/40">
                  {cs.decisions.map((d, i) => (
                    <div key={i} className="p-5">
                      <p className="text-sm font-semibold tracking-tight">
                        {d.decision}
                      </p>
                      {d.rationale && (
                        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                          <span className="font-mono text-[11px] uppercase tracking-wide text-accent">
                            Why ·{" "}
                          </span>
                          {d.rationale}
                        </p>
                      )}
                      {d.tradeoff && (
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                          <span className="font-mono text-[11px] uppercase tracking-wide text-accent-2">
                            Trade-off ·{" "}
                          </span>
                          {d.tradeoff}
                        </p>
                      )}
                    </div>
                  ))}
                </Bezel>
              </ScrollReveal>
            )}

            {cs.outcomeNarrative && (
              <ScrollReveal className="mb-12">
                <SectionEyebrow index={nextIndex()} title="Outcome" />
                <p className="mt-3 text-base leading-relaxed text-foreground">
                  {cs.outcomeNarrative}
                </p>
              </ScrollReveal>
            )}

            {hasBody && (
              <ScrollReveal
                className={
                  hasNarrative ? "border-t border-border pt-10" : undefined
                }
              >
                {hasNarrative && (
                  <div className="mb-6">
                    <SectionEyebrow index={nextIndex()} title="Notes" />
                  </div>
                )}
                <PortableText value={cs.body as unknown[]} />
              </ScrollReveal>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
