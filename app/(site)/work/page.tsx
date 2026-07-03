import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MetricStat } from "@/components/ui/MetricStat";
import { getAllCaseStudies } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from 5 years of shipping product at JPMC, Amazon, Blink Health, and Nutanix.",
  alternates: { canonical: "/work" },
};

export default async function Work() {
  const caseStudies = await getAllCaseStudies();

  return (
    <main
      id="main-content"
      className="flex-1"
    >
      <Container size="md" className="py-14 sm:py-20">

        <ScrollReveal className="mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Work
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Case studies
          </h1>
          <p className="mt-3 text-lg text-foreground-muted">
            Problems I&apos;ve owned end-to-end, with outcomes.
          </p>
        </ScrollReveal>

        {caseStudies.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-10 text-center">
            <p className="text-sm font-medium text-foreground">
              Detailed case studies in progress
            </p>
            <p className="mt-2 text-sm text-foreground-muted">
              I&apos;m writing up the full stories behind the work — problem, process, and outcome.
              In the meantime,{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                reach out for a live walkthrough
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {caseStudies.map((cs, i) => (
              <ScrollReveal
                key={cs._id}
                delay={i * 0.07}
                className={cn(cs.featured && "sm:col-span-2")}
              >
                <Link
                  href={`/work/${cs.slug.current}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface/60 backdrop-blur-sm transition-all duration-200 hover:border-border-strong hover:shadow-[0_0_24px_var(--accent-glow)]"
                >
                  <div
                    className={cn(
                      "relative w-full overflow-hidden",
                      cs.featured ? "aspect-[21/9]" : "aspect-[16/9]"
                    )}
                  >
                    {cs.coverImage ? (
                      <Image
                        src={urlFor(cs.coverImage)
                          .width(cs.featured ? 1600 : 800)
                          .height(cs.featured ? 686 : 450)
                          .fit("crop")
                          .url()}
                        alt={cs.title}
                        fill
                        sizes={
                          cs.featured
                            ? "(min-width: 768px) 768px, 100vw"
                            : "(min-width: 640px) 384px, 100vw"
                        }
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-subtle to-surface">
                        <span className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
                          {cs.company}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] text-foreground-muted">
                        {cs.company}
                        {cs.role && ` · ${cs.role}`}
                        {cs.year && ` · ${cs.year}`}
                      </span>
                      {cs.featured && (
                        <span className="rounded-full bg-accent-subtle px-2 py-0.5 text-xs font-medium text-accent">
                          Featured
                        </span>
                      )}
                    </div>
                    <h2 className="mt-2 flex items-start justify-between gap-3 text-lg font-semibold tracking-tight">
                      {cs.title}
                      <ArrowUpRight
                        size={16}
                        className="mt-1 shrink-0 text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </h2>
                    {cs.summary && (
                      <p className="mt-1.5 text-sm text-foreground-muted line-clamp-2">
                        {cs.summary}
                      </p>
                    )}
                    {cs.outcomes && cs.outcomes.length > 0 && (
                      <div className="mt-4 flex gap-6 border-t border-border pt-4">
                        {cs.outcomes.slice(0, 2).map((o) => (
                          <MetricStat
                            key={o.label}
                            label={o.label}
                            value={o.value}
                            delta={o.delta}
                            size="sm"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

      </Container>
    </main>
  );
}
