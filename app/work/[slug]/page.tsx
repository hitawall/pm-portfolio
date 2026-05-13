import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { RuleDivider } from "@/components/ui/RuleDivider";
import { PortableText } from "@/components/content/PortableText";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { siteConfig } from "@/lib/config";

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
  return {
    title: `${cs.title} — ${siteConfig.name}`,
    description: cs.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  return (
    <main className="flex-1">
      <Container size="md" className="py-16 sm:py-24">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="small-caps text-foreground-muted">
            {cs.company}
            {cs.year ? ` · ${cs.year}` : ""}
            {cs.role ? ` · ${cs.role}` : ""}
          </p>
          <h1 className="mt-5 font-serif text-4xl text-foreground sm:text-5xl">
            {cs.title}
          </h1>
          {cs.summary && (
            <p className="mx-auto mt-5 max-w-lg font-serif text-xl italic text-foreground-muted">
              {cs.summary}
            </p>
          )}
        </div>

        <RuleDivider />

        {/* Cover image — fixed dimensions, no fill (fixes #19) */}
        {cs.coverImage && (
          <figure className="my-12">
            <Image
              src={urlFor(cs.coverImage).width(1200).height(675).url()}
              alt={cs.title}
              width={1200}
              height={675}
              className="w-full rounded-lg border border-border object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </figure>
        )}

        {/* Outcome metrics */}
        {cs.outcomes && cs.outcomes.length > 0 && (
          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {cs.outcomes.map((o, i) => (
              <Card key={i} accentTop className="p-6 text-center">
                <p className="small-caps text-foreground-muted">{o.label}</p>
                <p className="mt-3 font-serif text-5xl text-foreground">{o.value}</p>
                {o.delta && (
                  <p className="mt-2 small-caps text-accent">{o.delta}</p>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Tags */}
        {cs.tags && cs.tags.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-3">
            {cs.tags.map((tag) => (
              <span key={tag} className="small-caps text-foreground-muted opacity-70">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Body */}
        {cs.body && (cs.body as unknown[]).length > 0 && (
          <>
            <RuleDivider className="mb-10" />
            <PortableText value={cs.body as unknown[]} />
          </>
        )}

      </Container>
    </main>
  );
}
