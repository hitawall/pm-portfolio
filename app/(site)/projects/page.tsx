import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getAllProjects } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Projects — ${siteConfig.name}`,
  description: "Side projects and experiments across product, engineering, and hobby work.",
};

const STATIC_PROJECTS = [
  {
    _id: "static-1",
    title: "Auto Job Tracker",
    kind: "engineering",
    year: 2025,
    summary: "Chrome extension + spreadsheet that logs every job application automatically — no copy-paste, no forgotten follow-ups.",
    externalUrl: "https://auto-job-tracker-tau.vercel.app",
  },
  {
    _id: "static-2",
    title: "Forty Rules of Love",
    kind: "hobby",
    year: 2025,
    summary: "An interactive digital retelling of Elif Şafak's novel — one rule surfaced per day, built as a meditative reading experience.",
    externalUrl: "https://forty-rules-of-love-one.vercel.app",
  },
  {
    _id: "static-3",
    title: "LLM Roadmap",
    kind: "engineering",
    year: 2025,
    summary: "A structured 12-week curriculum for engineers moving into LLM systems work — RAG, agents, evals, and production deployment.",
    externalUrl: "https://llm-systems-engineer-roadmap.vercel.app",
  },
];

const KIND_LABELS: Record<string, string> = {
  product: "Product",
  engineering: "Engineering",
  hobby: "Hobby",
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
      className="flex-1 [background:radial-gradient(ellipse_70%_30%_at_50%_0%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent)]"
    >
      <Container size="lg" className="py-14 sm:py-20">

        <ScrollReveal className="mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Projects
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Things I&apos;ve built
          </h1>
          <p className="mt-3 text-lg text-foreground-muted">
            Side projects and experiments.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05} className="mb-8 flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((opt) => {
            const isActive = opt.value === (kind ?? "");
            return (
              <Link
                key={opt.label}
                href={opt.value ? `?kind=${opt.value}` : "/projects"}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-150",
                  isActive
                    ? "border-accent bg-accent-subtle text-accent"
                    : "border-border text-foreground-muted hover:border-accent/40 hover:text-foreground"
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <ScrollReveal key={project._id} delay={i * 0.07}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:border-accent/40 hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between">
                      {project.kind && (
                        <span className="rounded-full bg-accent-subtle px-2.5 py-0.5 text-xs font-medium text-accent">
                          {KIND_LABELS[project.kind] ?? project.kind}
                        </span>
                      )}
                      {project.year && (
                        <span className="font-mono text-xs text-foreground-muted">
                          {project.year}
                        </span>
                      )}
                    </div>
                    <h2 className="mt-4 text-base font-semibold leading-snug">
                      {project.title}
                    </h2>
                    {project.summary && (
                      <p className="mt-2 text-sm text-foreground-muted">
                        {project.summary}
                      </p>
                    )}
                  </div>
                  {project.externalUrl && (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-1 text-xs text-accent transition-colors hover:text-accent-hover"
                    >
                      View project <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

      </Container>
    </main>
  );
}
