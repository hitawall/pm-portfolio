import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getAllProjects } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { STATIC_PROJECTS, KIND_LABELS } from "@/lib/projects";

export const metadata: Metadata = {
  title: `Projects — ${siteConfig.name}`,
  description: "Side projects and experiments across product, engineering, and hobby work.",
};

const FILTER_OPTIONS = [
  { label: "All", value: "" },
  { label: "Product", value: "product" },
  { label: "Engineering", value: "engineering" },
  { label: "Hobby", value: "hobby" },
];

interface Props {
  searchParams: Promise<{ kind?: string }>;
}

export default async function Projects({ searchParams }: Props) {
  const { kind } = await searchParams;
  const sanityProjects = await getAllProjects();
  const allProjects = [...STATIC_PROJECTS, ...sanityProjects];
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
          <div className="divide-y divide-border">
            {filtered.map((project, i) => {
              const row = (
                <div className="group flex items-start justify-between gap-6 py-7">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      {project.kind && (
                        <span className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
                          {KIND_LABELS[project.kind] ?? project.kind}
                        </span>
                      )}
                      {project.year && (
                        <span className="text-xs text-foreground-muted">· {project.year}</span>
                      )}
                    </div>
                    <h2 className="mt-1 text-base font-semibold tracking-tight transition-colors duration-150 group-hover:text-foreground-muted">
                      {project.title}
                    </h2>
                    {project.summary && (
                      <p className="mt-1.5 max-w-lg text-sm text-foreground-muted">
                        {project.summary}
                      </p>
                    )}
                  </div>
                  {project.externalUrl && (
                    <ArrowUpRight
                      size={16}
                      className="mt-1 shrink-0 text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  )}
                </div>
              );
              return (
                <ScrollReveal key={project._id} delay={i * 0.07}>
                  {project.externalUrl ? (
                    <a href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                      {row}
                    </a>
                  ) : (
                    row
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
