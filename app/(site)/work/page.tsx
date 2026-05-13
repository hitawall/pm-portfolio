import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getAllCaseStudies } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Work — ${siteConfig.name}`,
  description:
    "Case studies from 5 years of shipping product at JPMC, Amazon, Blink Health, and Nutanix.",
};

export default async function Work() {
  const caseStudies = await getAllCaseStudies();

  return (
    <main id="main-content" className="flex-1">
      <Container size="md" className="py-14 sm:py-20">

        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Work</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Case studies
          </h1>
          <p className="mt-3 text-lg text-foreground-muted">
            Problems I&apos;ve owned end-to-end, with outcomes.
          </p>
        </div>

        {caseStudies.length === 0 ? (
          <p className="text-sm text-foreground-muted">Case studies coming soon.</p>
        ) : (
          <div className="divide-y divide-border">
            {caseStudies.map((cs) => (
              <Link
                key={cs._id}
                href={`/work/${cs.slug.current}`}
                className="group flex items-start justify-between gap-6 py-8 transition-colors duration-150"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-foreground-muted">
                      {cs.company}
                    </span>
                    {cs.year && (
                      <span className="text-xs text-foreground-muted">· {cs.year}</span>
                    )}
                    {cs.featured && (
                      <span className="rounded-full bg-accent-subtle px-2 py-0.5 text-xs font-medium text-accent">
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className="mt-1 text-lg font-semibold tracking-tight transition-colors duration-150 group-hover:text-accent">
                    {cs.title}
                  </h2>
                  {cs.summary && (
                    <p className="mt-1.5 max-w-lg text-sm text-foreground-muted">
                      {cs.summary}
                    </p>
                  )}
                  {cs.tags && cs.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
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
                </div>
                <ArrowUpRight
                  size={18}
                  className="mt-1 flex-shrink-0 text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </Link>
            ))}
          </div>
        )}

      </Container>
    </main>
  );
}
