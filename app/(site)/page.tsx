import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
      <section className="border-b border-border py-20 sm:py-28">
        <Container size="md">
          <HeroMotion>
            <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:gap-16">

              {/* Avatar */}
              <div className="shrink-0">
                <div className="h-44 w-44 overflow-hidden rounded-full border border-border-strong shadow-sm sm:h-52 sm:w-52">
                  <Image
                    src="/avatar.jpg"
                    alt="Shubham Arora"
                    width={208}
                    height={208}
                    className="h-full w-full object-cover [object-position:50%_48%] scale-[1.1] translate-x-2"
                    priority
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-4 text-center sm:text-left">
                <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                  <span className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
                    Builder · Engineer · Product Thinker
                  </span>
                </div>

                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                  Shubham Arora
                </h1>

                <p className="text-base text-foreground-muted sm:text-lg">
                  Five years building at scale across fintech, health, and cloud.
                  Now bringing that engineering depth to product — shipping the
                  right thing, not just building it right.
                </p>

                <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                  {companies.map((co) => (
                    <span
                      key={co.name}
                      className="rounded-full border border-border px-3 py-1 text-xs font-medium"
                    >
                      {co.name}{" "}
                      <span className="text-foreground-muted">{co.period}</span>
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                  <p className="inline-flex items-center gap-2 text-xs font-medium text-foreground-muted">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    Open to PM &amp; senior eng roles
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                  <Button as={Link} href="/projects">
                    View projects <ArrowUpRight size={14} />
                  </Button>
                  <CopyEmail label="Get in touch" variant="ghost" />
                </div>
              </div>

            </div>
          </HeroMotion>
        </Container>
      </section>

      {/* ── Projects ─────────────────────────────────────────── */}
      <section id="projects" className="border-t border-border py-20 sm:py-28">
        <Container size="md">
          <ScrollReveal className="mb-8 flex items-end justify-between">
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
              className="flex items-center gap-1 text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              All projects <ArrowUpRight size={14} />
            </Link>
          </ScrollReveal>

          <div className="divide-y divide-border">
            {STATIC_PROJECTS.map((project, i) => (
              <ScrollReveal key={project._id} delay={i * 0.08}>
                <a
                  href={project.externalUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-6 py-7"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
                        {KIND_LABELS[project.kind] ?? project.kind}
                      </span>
                      <span className="text-xs text-foreground-muted">· {project.year}</span>
                    </div>
                    <h3 className="mt-1 text-base font-semibold tracking-tight transition-colors duration-150 group-hover:text-foreground-muted">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 max-w-lg text-sm text-foreground-muted">
                      {project.summary}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="mt-1 shrink-0 text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
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
