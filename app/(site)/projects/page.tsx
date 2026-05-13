import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getAllProjects } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Projects — ${siteConfig.name}`,
  description: "Side projects and experiments across product, engineering, and hobby work.",
};

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
  const allProjects = await getAllProjects();
  const filtered = kind ? allProjects.filter((p) => p.kind === kind) : allProjects;

  return (
    <main id="main-content" className="flex-1">
      <Container size="lg" className="py-14 sm:py-20">

        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Projects
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Things I&apos;ve built
          </h1>
          <p className="mt-3 text-lg text-foreground-muted">
            Side projects and experiments.
          </p>
        </div>

        {/* Kind filter */}
        <div className="mb-8 flex flex-wrap gap-2">
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
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-foreground-muted">
            {kind ? `No ${KIND_LABELS[kind] ?? kind} projects yet.` : "Projects coming soon."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <div
                key={project._id}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_32px_var(--accent-glow)]"
              >
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
            ))}
          </div>
        )}

      </Container>
    </main>
  );
}
