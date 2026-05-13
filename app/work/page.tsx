import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RuleDivider } from "@/components/ui/RuleDivider";
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
    <main className="flex-1">
      <Container size="md" className="py-16 sm:py-24">

        {/* Header */}
        <div className="mb-14 text-center">
          <p className="small-caps text-foreground-muted">Work</p>
          <h1 className="mt-5 font-serif text-5xl text-foreground sm:text-6xl">
            Case studies
          </h1>
          <p className="mx-auto mt-5 max-w-sm font-serif text-xl italic text-foreground-muted">
            Problems I&apos;ve owned end-to-end, with outcomes.
          </p>
        </div>

        <RuleDivider />

        <SectionLabel className="mt-12">Selected</SectionLabel>

        {caseStudies.length === 0 ? (
          <p className="py-4 text-sm text-foreground-muted">Case studies coming soon.</p>
        ) : (
          <div>
            {caseStudies.map((cs) => (
              <Link
                key={cs._id}
                href={`/work/${cs.slug.current}`}
                className="group flex items-start justify-between gap-6 border-b border-border py-8 last:border-b-0 transition-colors duration-150"
              >
                <div className="w-20 flex-shrink-0 pt-0.5">
                  <span className="small-caps text-foreground-muted">{cs.year ?? ""}</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="small-caps text-foreground-muted opacity-70">{cs.company}</span>
                    {cs.featured && (
                      <span className="small-caps rounded-full border border-accent/30 bg-accent-subtle px-2 py-0.5 text-accent">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="mt-2 font-serif text-2xl text-foreground transition-colors duration-150 group-hover:text-accent">
                    {cs.title}
                  </p>
                  {cs.summary && (
                    <p className="mt-2 max-w-lg text-sm text-foreground-muted">
                      {cs.summary}
                    </p>
                  )}
                  {cs.tags && cs.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cs.tags.map((tag) => (
                        <span key={tag} className="small-caps text-foreground-muted opacity-60">
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
