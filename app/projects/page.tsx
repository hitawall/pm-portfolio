import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { RuleDivider } from "@/components/ui/RuleDivider";
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
    <main className="flex-1">
      <Container size="lg" className="py-16 sm:py-24">

        {/* Header */}
        <div className="mb-14 text-center">
          <p className="small-caps text-foreground-muted">Projects</p>
          <h1 className="mt-5 font-serif text-5xl text-foreground sm:text-6xl">
            Things I&apos;ve built
          </h1>
          <p className="mx-auto mt-5 max-w-sm font-serif text-xl italic text-foreground-muted">
            Side projects and experiments.
          </p>
        </div>

        <RuleDivider />

        {/* Kind filter */}
        <div className="mt-10 mb-10 flex flex-wrap justify-center gap-2">
          {FILTER_OPTIONS.map((opt) => {
            const isActive = opt.value === (kind ?? "");
            return (
              <Link
                key={opt.label}
                href={opt.value ? `?kind=${opt.value}` : "/projects"}
                className={cn(
                  "small-caps rounded-full border px-4 py-1.5 transition-colors duration-150",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground-muted hover:border-accent hover:text-accent"
                )}
              >
                {opt.label}
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="py-4 text-center text-sm text-foreground-muted">
            {kind ? `No ${KIND_LABELS[kind] ?? kind} projects yet.` : "Projects coming soon."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <Card key={project._id} hoverEffect className="flex flex-col justify-between p-7">
                <div>
                  <div className="flex items-center justify-between">
                    {project.kind && (
                      <span className="small-caps text-accent">
                        {KIND_LABELS[project.kind] ?? project.kind}
                      </span>
                    )}
                    {project.year && (
                      <span className="font-mono text-xs text-foreground-muted">
                        {project.year}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-4 font-serif text-xl text-foreground">
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
                    className="mt-6 inline-flex items-center gap-1 small-caps text-accent transition-colors duration-150 hover:text-foreground"
                  >
                    View project <ArrowUpRight size={11} />
                  </a>
                )}
              </Card>
            ))}
          </div>
        )}

      </Container>
    </main>
  );
}
