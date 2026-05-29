import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description:
    "Engineer, builder, and product thinker. Five years shipping at JPMC, Amazon, Blink Health, and Nutanix.",
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
    id: "how-i-think",
    heading: "How I think",
    paragraphs: [
      "The shift was gradual. I found myself most energized not by the implementation challenge, but by the upstream questions: Who is this for? What problem does this actually solve? What's the simplest version that proves the hypothesis?",
      "At Blink Health, I watched how pricing decisions — made without deep user context — created friction that engineering heroics couldn't fix. At Nutanix, I spent time embedded with customers and realized the gap between what we were building and what they needed was a strategy problem, not an execution problem. I started pulling on those threads.",
      "Now I build with both lenses open at once. I care about the architecture and I care about whether we're building the right thing in the first place.",
    ],
  },
  {
    id: "what-i-bring",
    heading: "What I bring",
    paragraphs: [
      "I can read the diff. I can sit in an architecture review and understand the trade-offs being discussed — not just the conclusion. I can give meaningful feedback on a technical spec, scope work honestly with stakeholders, and push back on requirements that don't survive contact with the system.",
      "I built the pipelines I now want to reason about. I understand why certain APIs are slow, why some database designs create long-term constraints, and why a \"two-week fix\" sometimes isn't. That keeps me grounded and makes me a useful partner — to engineers, to PMs, and to anyone trying to ship something real.",
      "More broadly: I think in systems. Years of debugging distributed infrastructure teaches you to reason about second-order effects, question assumptions, and model how a change propagates through everything else. That applies to code, to products, and to organizations.",
    ],
  },
  {
    id: "what-im-building",
    heading: "What I'm building",
    paragraphs: [
      "Lately I've been deep in LLM systems — building tools that automate tedious workflows, experimenting with retrieval and agent architectures, and thinking hard about where AI actually changes the product surface vs. where it's noise.",
      "I'm interested in roles at the intersection of engineering and product: senior engineering positions with product scope, technical PM roles, AI/ML product work, or 0→1 builder roles at companies where technical depth is treated as a first-class asset. I work best on teams that move fast, argue from first principles, and hold themselves to outcomes over outputs.",
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
            Engineer, builder, product thinker.
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
          <Button as="a" href={`mailto:${siteConfig.email}`}>
            Get in touch <ArrowUpRight size={14} />
          </Button>
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
