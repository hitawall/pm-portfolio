/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RuleDivider } from "@/components/ui/RuleDivider";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description:
    "SDE turned Product Manager. Five years shipping at JPMC, Amazon, Blink Health, and Nutanix — now bringing that depth to product decisions.",
};

export default function About() {
  return (
    <main className="flex-1">
      <Container size="md" className="py-16 sm:py-24">

        {/* Header */}
        <div className="mb-14 text-center">
          <p className="small-caps text-foreground-muted">About</p>
          <h1 className="mt-5 font-serif text-5xl text-foreground sm:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="mx-auto mt-5 max-w-sm font-serif text-xl italic text-foreground-muted">
            Engineer turned Product Manager.
          </p>
        </div>

        <RuleDivider />

        {/* Narrative */}
        <article className="mt-14 space-y-14 text-base leading-[1.75] text-foreground">

          <section>
            <SectionLabel align="start">The engineering years</SectionLabel>
            <div className="space-y-5">
              <p>
                I spent five years as a software engineer — at JPMC building
                risk and compliance tooling, at Amazon working on large-scale
                distributed systems, at Blink Health shipping consumer-facing
                product and pricing infrastructure, and at Nutanix building
                cloud management software for enterprise customers.
              </p>
              <p>
                These weren't incremental experiences. Each company operated at
                a different scale, with a different customer, under a different
                set of constraints. I shipped features that processed millions
                of transactions, debugged performance issues in systems handling
                petabytes of data, and built APIs that other engineers depended
                on. I got good at building things.
              </p>
              <p>
                But somewhere along the way, I started being more interested in
                the decisions that preceded the building.
              </p>
            </div>
          </section>

          <section>
            <SectionLabel align="start">Why the pivot</SectionLabel>
            <div className="space-y-5">
              <p>
                The shift wasn't sudden. It was a slow accumulation of moments
                where I found myself most energized not by the implementation
                challenge, but by the upstream questions: Who is this for? What
                problem does this actually solve? What's the simplest version
                that proves the hypothesis?
              </p>
              <p>
                At Blink Health, I watched how pricing decisions — made without
                deep user context — created friction that engineering heroics
                couldn't fix. At Nutanix, I spent time embedded with customers
                and realized the gap between what we were building and what they
                needed was a strategy problem, not an execution problem. I
                started pulling on those threads.
              </p>
              <p>
                I read every PM book I could find. I volunteered for
                cross-functional projects. I sat in on roadmap reviews and
                pushed back on feature specifications. Eventually I made it
                formal: I transitioned into product work at Nutanix before
                deciding to commit to PM fully.
              </p>
            </div>
          </section>

          <section>
            <SectionLabel align="start">What engineering gives me as a PM</SectionLabel>
            <div className="space-y-5">
              <p>
                I can read the diff. I can sit in an architecture review and
                understand the trade-offs being discussed — not just the
                conclusion. I can give engineers meaningful feedback on a
                technical spec rather than nodding along. That creates trust,
                and trust is what gets PMs the early seat at the table, before
                decisions are made.
              </p>
              <p>
                I built the pipelines I now want to query. I understand why
                certain APIs are slow, why some database designs create
                long-term constraints, and why a "two-week fix" sometimes
                isn't. That shapes how I scope work and set expectations with
                stakeholders — I don't overpromise on behalf of engineering,
                and I don't undersell what's possible.
              </p>
              <p>
                More broadly: I think in systems. Years of debugging distributed
                infrastructure teaches you to reason about second-order effects,
                question assumptions, and model how a change propagates through
                everything else. That applies just as well to product strategy,
                pricing models, and growth loops.
              </p>
            </div>
          </section>

          <section>
            <SectionLabel align="start">What I'm looking for</SectionLabel>
            <div className="space-y-5">
              <p>
                I'm targeting Senior PM roles where engineering depth is treated
                as an asset, not just a credential. I'm drawn to 0→1
                challenges — especially in developer tools, infrastructure, and
                platform products where technical rigor and user empathy both
                matter. And to product-led growth motions where data and
                experimentation are first-class citizens.
              </p>
              <p>
                I'm most effective on teams that move fast, argue from first
                principles, and hold themselves accountable to outcomes over
                outputs.
              </p>
            </div>
          </section>

          <section>
            <SectionLabel align="start">Outside work</SectionLabel>
            <p>
              I follow AI/ML research more than is probably healthy. I build
              side projects — mostly tools I wish existed. I enjoy long runs
              and occasionally cooking something ambitious on a weekend.
            </p>
          </section>

        </article>

        <RuleDivider className="mt-14" />

        {/* CTA */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Button as="a" href={`mailto:${siteConfig.email}`}>
            Get in touch <ArrowUpRight size={14} />
          </Button>
          <Button
            as="a"
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            LinkedIn
          </Button>
          <Button as={Link} href="/resume" variant="ghost">
            Resume
          </Button>
        </div>

      </Container>
    </main>
  );
}
