import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Backend engineer with 5 years at JPMC, Amazon, Blink Health, and Nutanix. Now building LLM systems and agent architectures.",
  alternates: { canonical: "/about" },
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

        <article className="space-y-14 text-base leading-[1.85] text-foreground">
          {sections.map((s, i) => (
            <ScrollReveal key={s.id} delay={i * 0.07}>
              <section>
                <div className="mb-5 flex items-baseline gap-3">
                  <span className="shrink-0 font-mono text-xs tabular-nums text-foreground-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    {s.heading}
                  </h2>
                </div>
                <div className="space-y-4 pl-8 text-foreground-muted">
                  {s.paragraphs.map((p, j) => (
                    <p key={j} className="leading-[1.85]">{p}</p>
                  ))}
                </div>
                {s.id === "how-i-build" && (
                  <blockquote className="mt-6 ml-8 border-l-2 border-accent/40 pl-4 text-sm italic text-foreground-muted">
                    &ldquo;Good design is as little design as possible.&rdquo;
                    <footer className="mt-1 font-mono text-xs not-italic tracking-wide text-foreground-muted/70">
                      — Dieter Rams
                    </footer>
                  </blockquote>
                )}
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
          <Button
            as="a"
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </Button>
          <Button as={Link} href="/resume" variant="ghost">
            Resume
          </Button>
        </ScrollReveal>

      </Container>
    </main>
  );
}
