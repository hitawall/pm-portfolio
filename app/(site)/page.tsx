import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { HeroMotion } from "@/components/site/HeroMotion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getAllPosts } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/config";
import { STATIC_PROJECTS, KIND_LABELS } from "@/lib/projects";

const companies = [
  { name: "JPMC", period: "2020–21" },
  { name: "Amazon", period: "2021–23" },
  { name: "Blink Health", period: "2023–24" },
  { name: "Nutanix", period: "2024–26" },
];

export default async function Home() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <main id="main-content" className="flex-1">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden [background:radial-gradient(ellipse_80%_60%_at_50%_-10%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent)]">
        <Container size="md" className="text-center">
          <HeroMotion>
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-gradient-to-br from-accent via-violet-400 to-violet-300 p-[3px] shadow-xl shadow-accent/20">
                <div className="h-36 w-36 overflow-hidden rounded-full">
                  <Image
                    src="/avatar.jpg"
                    alt="Shubham Arora"
                    width={144}
                    height={144}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-foreground-muted backdrop-blur-sm">
                Builder · Engineer · Product Thinker
              </p>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-foreground-muted backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Open to PM &amp; senior eng roles
              </p>
            </div>
            <h1 className="gradient-heading mt-5 text-6xl font-bold leading-[1.05] tracking-tighter sm:text-7xl lg:text-8xl">
              Shubham<br />Arora
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-base text-foreground-muted sm:text-lg">
              Five years building at scale across fintech, health, and cloud.
              Now bringing that engineering depth to product — shipping the
              right thing, not just building it right.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {companies.map((co) => (
                <span
                  key={co.name}
                  className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium backdrop-blur-sm"
                >
                  {co.name}{" "}
                  <span className="text-foreground-muted">{co.period}</span>
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button as={Link} href="/projects">
                View projects <ArrowUpRight size={14} />
              </Button>
              <CopyEmail label="Get in touch" variant="ghost" />
            </div>
          </HeroMotion>
        </Container>

        <a
          href="#projects"
          aria-label="Scroll to projects"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground-muted transition-colors duration-150 hover:text-accent"
        >
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </section>

      {/* ── Projects ─────────────────────────────────────────── */}
      <section id="projects" className="border-t border-border py-20 sm:py-28">
        <Container size="lg">
          <ScrollReveal className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
                Projects
              </p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Things I&apos;ve built
              </h2>
            </div>
            <Link
              href="/projects"
              className="flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent-hover"
            >
              All projects <ArrowUpRight size={14} />
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STATIC_PROJECTS.map((project, i) => (
              <ScrollReveal key={project._id} delay={i * 0.1}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:border-accent/40 hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-accent-subtle px-2.5 py-0.5 text-xs font-medium text-accent">
                        {KIND_LABELS[project.kind] ?? project.kind}
                      </span>
                      <span className="font-mono text-xs text-foreground-muted">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold leading-snug">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-foreground-muted">
                      {project.summary}
                    </p>
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
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Recent Thoughts ──────────────────────────────────── */}
      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <Container size="lg">
          <ScrollReveal className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
                Writing
              </p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Recent Thoughts
              </h2>
            </div>
            <Link
              href="/thoughts"
              className="flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent-hover"
            >
              All posts <ArrowUpRight size={14} />
            </Link>
          </ScrollReveal>

          {recentPosts.length > 0 ? (
            <div className="flex flex-col divide-y divide-border">
              {recentPosts.map((post, i) => (
                <ScrollReveal key={post._id} delay={i * 0.08}>
                <Link
                  href={`/thoughts/${post.slug.current}`}
                  className="group flex items-start justify-between gap-6 py-5 transition-colors hover:text-accent"
                >
                  <div className="flex-1">
                    <p className="font-mono text-xs text-foreground-muted">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="mt-1 font-semibold leading-snug">
                      {post.title}
                    </p>
                    {post.summary && (
                      <p className="mt-1 text-sm text-foreground-muted line-clamp-2">
                        {post.summary}
                      </p>
                    )}
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="mt-1 shrink-0 text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="text-sm text-foreground-muted">
              Writing on product thinking, engineering trade-offs, and systems at scale.{" "}
              <Link href="/thoughts" className="text-accent hover:underline">
                Browse all posts →
              </Link>
            </p>
          )}
        </Container>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────── */}
      <section id="contact" className="border-t border-border py-20 sm:py-28 [background:radial-gradient(ellipse_80%_80%_at_50%_110%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent)]">
        <Container size="md" className="text-center">
          <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
            Open to opportunities
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s build something together
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-foreground-muted">
            Open to senior engineering, product, and AI/LLM roles where craft
            and customer obsession both matter.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CopyEmail />
            <Button
              as="a"
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
            >
              LinkedIn <ArrowUpRight size={14} />
            </Button>
          </div>
          </ScrollReveal>
        </Container>
      </section>

    </main>
  );
}
