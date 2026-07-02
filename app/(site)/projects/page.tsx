import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getAllProjects } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { KIND_LABELS } from "@/lib/projects";
import { urlFor } from "@/sanity/lib/image";
import { toVideoEmbedUrl } from "@/lib/embed";
import { ProjectMedia } from "@/components/ui/ProjectMedia";

export const metadata: Metadata = {
  title: `Projects — ${siteConfig.name}`,
  description: "Side projects and experiments across AI/LLM systems, backend engineering, and hobby builds.",
};

const FILTER_OPTIONS = [
  { label: "All", value: "" },
  { label: "AI / LLM", value: "ai" },
  { label: "Engineering", value: "engineering" },
  { label: "Product", value: "product" },
  { label: "Hobby", value: "hobby" },
];

interface Props {
  searchParams: Promise<{ kind?: string }>;
}

export default async function Projects({ searchParams }: Props) {
  const { kind } = await searchParams;
  const allProjects = await getAllProjects();
  const filtered = kind ? allProjects.filter((p) => p.kind === kind) : allProjects;

  return (
    <main
      id="main-content"
      className="flex-1"
    >
      <Container size="md" className="py-14 sm:py-20">

        <ScrollReveal className="mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Projects
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Things I&apos;ve built
          </h1>
          <p className="mt-3 text-base text-foreground-muted">
            Side projects and experiments.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05} className="mb-8 flex gap-6">
          {FILTER_OPTIONS.map((opt) => {
            const isActive = opt.value === (kind ?? "");
            return (
              <Link
                key={opt.label}
                href={opt.value ? `?kind=${opt.value}` : "/projects"}
                className={cn(
                  "text-sm transition-colors duration-150",
                  isActive
                    ? "font-semibold text-accent"
                    : "text-foreground-muted hover:text-foreground"
                )}
              >
                {opt.label}
              </Link>
            );
          })}
        </ScrollReveal>

        {filtered.length === 0 ? (
          <p className="text-sm text-foreground-muted">
            {kind ? `No ${KIND_LABELS[kind] ?? kind} projects yet.` : "Projects coming soon."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filtered.map((project, i) => {
              const images = (project.media ?? []).map((img) => ({
                url: urlFor(img).width(1200).url(),
                alt: img.alt,
                caption: img.caption,
              }));
              const videoEmbedUrl = project.videoUrl
                ? (toVideoEmbedUrl(project.videoUrl) ?? undefined)
                : undefined;
              const hasMedia = images.length > 0 || !!videoEmbedUrl;

              const card = (
                <div className="group flex h-full flex-col rounded-xl border border-border bg-surface/60 p-5 backdrop-blur-sm transition-all duration-200 hover:border-border-strong hover:shadow-[0_0_24px_var(--accent-glow)]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {project.kind && (
                        <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-foreground-muted">
                          {KIND_LABELS[project.kind] ?? project.kind}
                        </span>
                      )}
                      {project.year && (
                        <span className="font-mono text-xs text-foreground-muted">{project.year}</span>
                      )}
                    </div>
                    {project.externalUrl && (
                      <ArrowUpRight
                        size={15}
                        className="shrink-0 text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    )}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold tracking-tight transition-colors duration-150 group-hover:text-accent">
                    {project.title}
                  </h2>
                  {project.summary && (
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                      {project.summary}
                    </p>
                  )}
                  {hasMedia && (
                    <ProjectMedia images={images} videoEmbedUrl={videoEmbedUrl} />
                  )}
                </div>
              );
              return (
                <ScrollReveal key={project._id} delay={i * 0.05}>
                  {project.externalUrl ? (
                    <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                      {card}
                    </a>
                  ) : (
                    card
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        )}

      </Container>
    </main>
  );
}
