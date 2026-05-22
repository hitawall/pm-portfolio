import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description:
    "SDE turned Product Manager. Five years shipping at JPMC, Amazon, Blink Health, and Nutanix — now bringing that depth to product decisions.",
};

const sections = [
  {
    id: "engineering",
    heading: "The engineering years",
    paragraphs: [
      "I spent five years as a software engineer — at JPMC building risk and compliance tooling, at Amazon working on large-scale distributed systems, at Blink Health shipping consumer-facing product and pricing infrastructure, and at Nutanix building cloud management software for enterprise customers.",
      "These weren't incremental experiences. Each company operated at a different scale, with a different customer, under a different set of constraints. I shipped features that processed millions of transactions, debugged performance issues in systems handling petabytes of data, and built APIs that other engineers depended on. I got good at building things.",
      "But somewhere along the way, I started being more interested in the decisions that preceded the building.",
    ],
  },
  {
    id: "pivot",
    heading: "Why the pivot",
    paragraphs: [
      "The shift wasn't sudden. It was a slow accumulation of moments where I found myself most energized not by the implementation challenge, but by the upstream questions: Who is this for? What problem does this actually solve? What's the simplest version that proves the hypothesis?",
      "At Blink Health, I watched how pricing decisions — made without deep user context — created friction that engineering heroics couldn't fix. At Nutanix, I spent time embedded with customers and realized the gap between what we were building and what they needed was a strategy problem, not an execution problem. I started pulling on those threads.",
      "I read every PM book I could find. I volunteered for cross-functional projects. I sat in on roadmap reviews and pushed back on feature specifications. Eventually I made it formal: I transitioned into product work at Nutanix before deciding to commit to PM fully.",
    ],
  },
  {
    id: "edge",
    heading: "What engineering gives me as a PM",
    paragraphs: [
      "I can read the diff. I can sit in an architecture review and understand the trade-offs being discussed — not just the conclusion. I can give engineers meaningful feedback on a technical spec rather than nodding along. That creates trust, and trust is what gets PMs the early seat at the table, before decisions are made.",
      "I built the pipelines I now want to query. I understand why certain APIs are slow, why some database designs create long-term constraints, and why a \"two-week fix\" sometimes isn't. That shapes how I scope work and set expectations with stakeholders — I don't overpromise on behalf of engineering, and I don't undersell what's possible.",
      "More broadly: I think in systems. Years of debugging distributed infrastructure teaches you to reason about second-order effects, question assumptions, and model how a change propagates through everything else. That applies just as well to product strategy, pricing models, and growth loops.",
    ],
  },
  {
    id: "looking",
    heading: "What I'm looking for",
    paragraphs: [
      "I'm targeting Senior PM roles where engineering depth is treated as an asset, not just a credential. I'm drawn to 0→1 challenges — especially in developer tools, infrastructure, and platform products where technical rigor and user empathy both matter. And to product-led growth motions where data and experimentation are first-class citizens.",
      "I'm most effective on teams that move fast, argue from first principles, and hold themselves accountable to outcomes over outputs.",
    ],
  },
  {
    id: "outside",
    heading: "Outside work",
    paragraphs: [
      "I follow AI/ML research more than is probably healthy. I build side projects — mostly tools I wish existed. I enjoy long runs and occasionally cooking something ambitious on a weekend.",
    ],
  },
];

export default function About() {
  return (
    <main
      id="main-content"
      className="flex-1 [background:radial-gradient(ellipse_70%_30%_at_50%_0%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent)]"
    >
      <Container size="md" className="py-14 sm:py-20">

        <ScrollReveal className="mb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            About
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mt-3 text-lg text-foreground-muted">
            Engineer turned Product Manager.
          </p>
        </ScrollReveal>

        <article className="space-y-10 text-[15px] leading-relaxed text-foreground-muted">
          {sections.map((s, i) => (
            <ScrollReveal key={s.id} delay={i * 0.07}>
              <section>
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                  {s.heading}
                </h2>
                <div className="space-y-4">
                  {s.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ))}
        </article>

        <ScrollReveal className="mt-16 flex flex-wrap gap-3 border-t border-border pt-10">
          <CopyEmail label="Get in touch" />
          <Button
            as="a"
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
          >
            LinkedIn
          </Button>
          <Button as={Link} href="/resume" variant="ghost">
            Resume
          </Button>
        </ScrollReveal>

      </Container>
    </main>
  );
}
