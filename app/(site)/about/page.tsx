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
    "Backend engineer with 5 years at JPMC, Amazon, Blink Health, and Nutanix. Now building LLM systems and agent architectures.",
};

const sections = [
  {
    id: "engineering",
    heading: "Five years in the backend",
    paragraphs: [
      "I spent five years as a backend engineer — at JPMC building risk and compliance systems that processed millions of transactions daily, at Amazon working on large-scale distributed infrastructure, at Blink Health owning pricing and fulfillment backends for a consumer health platform, and at Nutanix building cloud management software used by enterprise teams globally.",
      "Each role pushed me deeper into systems thinking. I debugged race conditions in distributed workflows, designed APIs that other engineers built on top of, and shipped data pipelines where correctness wasn't optional. I got good at building things that don't break — and fast at diagnosing them when they do.",
      "That foundation — knowing how data moves, where latency hides, why things fail at scale — is what I bring to everything I build now.",
    ],
  },
  {
    id: "ai-pull",
    heading: "The pull toward AI",
    paragraphs: [
      "My interest in LLMs started as a side project and became something I couldn't put down. I started experimenting with retrieval pipelines, prompt engineering, and early agent architectures. The more I dug in, the more I realised this was the most interesting backend problem space I'd ever encountered.",
      "LLM systems surface every hard problem in software — latency under uncertainty, eval at scale, orchestration of non-deterministic components, and the constant tension between capability and reliability. They require the same rigor as any distributed system, with an extra layer of unpredictability that makes engineering them genuinely challenging.",
      "I've been building in this space seriously: RAG pipelines with reranking, multi-step agent loops with tool use, structured output extraction, and observability for LLM calls. Not demos — systems designed to run in production.",
    ],
  },
  {
    id: "how-i-build",
    heading: "How I build AI systems",
    paragraphs: [
      "I approach LLM engineering the way I approach any backend system: define the interface, control the failure modes, measure what matters. That means thinking carefully about context construction before reaching for a bigger model, treating evals as a first-class concern, and building retrieval pipelines that degrade gracefully rather than hallucinating confidently.",
      "I'm comfortable across the full stack of a GenAI backend: vector databases and embedding strategies, chunk sizing and reranking tradeoffs, agent loop design, function/tool calling schemas, streaming responses, and the infrastructure to trace and debug LLM calls in production.",
      "I don't believe every problem needs an LLM. I do believe that engineers who understand both when to use them and how to make them reliable are rare — and that's the gap I'm trying to occupy.",
    ],
  },
  {
    id: "what-i-bring",
    heading: "What I bring",
    paragraphs: [
      "Backend depth applied to AI: I know why your RAG pipeline is returning irrelevant chunks, why your agent is looping, and why your latency spikes on the third tool call. I've built the underlying infrastructure, so I reason about AI systems at the right level of abstraction.",
      "Systems thinking at scale: years of debugging distributed infrastructure teaches you to trace causality, question assumptions, and model second-order effects. That translates directly to diagnosing LLM system failures — which are rarely where they appear to be.",
      "I work best on teams building AI-native products where the engineering challenges are real — not wrappers, but systems where reliability, latency, and eval strategy actually matter.",
    ],
  },
  {
    id: "outside",
    heading: "Outside work",
    paragraphs: [
      "I read AI/ML papers more than is probably healthy — especially anything touching agents, reasoning, and retrieval. I build side projects mostly in the GenAI space, usually tools I need and can't find. I enjoy long runs, occasionally cook something ambitious, and have strong opinions about text editors.",
    ],
  },
];

export default function About() {
  return (
    <main
      id="main-content"
      className="flex-1"
    >
      <Container size="md" className="py-20 sm:py-28">

        <ScrollReveal className="mb-20">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            About
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mt-3 text-lg text-foreground-muted">
            Backend engineer. GenAI builder.
          </p>
        </ScrollReveal>

        <article className="space-y-14 font-serif text-base leading-[1.85] text-foreground">
          {sections.map((s, i) => (
            <ScrollReveal key={s.id} delay={i * 0.07}>
              <section>
                <h2 className="mb-5 text-xl font-bold tracking-tight text-foreground">
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
