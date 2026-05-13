import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/content/PortableText";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { siteConfig, getBaseUrl } from "@/lib/config";

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
    title: `${cs.title} — ${siteConfig.name}`,
    description: cs.summary,
    openGraph: {
      images: [ogUrl],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogUrl],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  return (
    <main id="main-content" className="flex-1">
      <Container size="md" className="py-14 sm:py-20">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            {cs.company}{cs.year ? ` · ${cs.year}` : ""}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {cs.title}
          </h1>
          {cs.role && (
            <p className="mt-2 text-sm text-foreground-muted">{cs.role}</p>
          )}
          {cs.summary && (
            <p className="mt-4 max-w-xl text-base text-foreground-muted">
              {cs.summary}
            </p>
          )}
        </div>

        {/* Cover image */}
        {cs.coverImage && (
          <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <Image
              src={urlFor(cs.coverImage).width(1200).height(675).url()}
              alt={cs.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        {/* Outcome metrics */}
        {cs.outcomes && cs.outcomes.length > 0 && (
          <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {cs.outcomes.map((o, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <p className="text-xs text-foreground-muted">{o.label}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight">{o.value}</p>
                {o.delta && (
                  <p className="mt-0.5 text-xs font-medium text-accent">{o.delta}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {cs.tags && cs.tags.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-1.5">
            {cs.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Body */}
        {cs.body && (cs.body as unknown[]).length > 0 && (
          <div className="border-t border-border pt-10">
            <PortableText value={cs.body as unknown[]} />
          </div>
        )}

      </Container>
    </main>
  );
}
