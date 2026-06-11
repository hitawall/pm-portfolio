import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { HeroMotion } from "@/components/site/HeroMotion";
import { ContributionGraph } from "@/components/site/ContributionGraph";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getAllPosts, getNowEntries } from "@/sanity/lib/queries";
import { siteConfig, githubFallbackStats } from "@/lib/config";
import { STATIC_PROJECTS, KIND_LABELS } from "@/lib/projects";
import { getGitHubStats, formatRelativeTime, type GitHubStats } from "@/lib/github";
import { NOW_FALLBACK } from "@/lib/now";
import { NowFeed } from "@/components/site/NowFeed";

const companies = ["JPMC", "Amazon", "Blink Health", "Nutanix"];

function buildHeroStats(gh: GitHubStats | null) {
  return [
    { label: "Years shipping", value: "05", detail: "fintech · health · cloud" },
    {
      label: "Projects built",
      value: String(STATIC_PROJECTS.length).padStart(2, "0"),
      detail: "side quests included",
    },
    {
      label: "Contributions",
      value: gh
        ? gh.totalContributions.toLocaleString("en-US")
        : githubFallbackStats.contributions,
      detail: "past year · GitHub",
    },
    {
      label: "Last commit",
      value: gh?.lastPush
        ? formatRelativeTime(gh.lastPush.pushedAt)
        : githubFallbackStats.lastCommit,
      detail: gh?.lastPush
        ? gh.lastPush.repo
        : `github.com/${siteConfig.githubUsername}`,
    },
  ];
}

export default async function Home() {
  const [allPosts, gh, sanityNow] = await Promise.all([
    getAllPosts(),
    getGitHubStats(),
    getNowEntries(),
  ]);
  const recentPosts = allPosts.slice(0, 3);
  const heroStats = buildHeroStats(gh);
  const nowEntries = sanityNow.length > 0 ? sanityNow : NOW_FALLBACK;
  const currentNow =
    nowEntries.find((e) => e.current && e.status === "building") ??
    nowEntries.find((e) => e.current);

  return (
    <main id="main-content" className="flex-1">

      {/* ── Hero — proof-of-work dashboard ───────────────────── */}
      <section className="relative overflow-hidden border-b border-border py-20 sm:py-28">
        {/* Gradient glow backdrop */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-32 left-1/2 h-[420px] w-[760px] max-w-full -translate-x-1/2 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -top-16 left-[12%] h-[260px] w-[400px] blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, color-mix(in srgb, var(--accent-2) 12%, transparent) 0%, transparent 70%)",
            }}
          />
        </div>

        <Container size="md" className="relative">
          <HeroMotion>
            {/* Identity row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border-strong">
                <Image
                  src="/avatar.jpg"
                  alt="Shubham Arora"
                  width={48}
                  height={48}
                  className="h-full w-full scale-[1.1] object-cover [object-position:50%_48%]"
                  priority
                />
              </div>
              <div>
                <p className="font-display text-sm font-semibold tracking-tight">
                  Shubham Arora
                </p>
                <p className="text-xs text-foreground-muted">
                  Builder · Engineer · Product Thinker
                </p>
              </div>
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-subtle px-3 py-1 text-xs font-medium text-accent sm:ml-auto">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Open to PM &amp; senior eng roles
              </p>
            </div>

            <h1 className="mt-9 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Engineering depth.{" "}
              <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                Product instincts.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-foreground-muted sm:text-lg">
              Five years building at scale across fintech, health, and cloud.
              Now bringing that engineering depth to product — shipping the
              right thing, not just building it right.
            </p>

            <p className="mt-4 font-mono text-xs text-foreground-muted">
              {companies.join(" → ")} · 2020 → 2026
            </p>

            {currentNow && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-xs text-foreground-muted backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {currentNow.status === "building" ? "building" : currentNow.status}:{" "}
                <span className="text-foreground">{currentNow.title}</span>
              </p>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <Button as={Link} href="/projects">
                View projects <ArrowUpRight size={14} />
              </Button>
              <CopyEmail label="Get in touch" variant="ghost" />
            </div>
          </HeroMotion>

          {/* Stat cards */}
          <HeroMotion delay={0.12} className="mt-12">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-surface/60 p-4 backdrop-blur-sm transition-colors duration-200 hover:border-border-strong"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-mono text-2xl font-medium tabular-nums sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 truncate font-mono text-[11px] text-foreground-muted">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>
          </HeroMotion>

          {/* Contribution graph — only when live data is available */}
          {gh && (
            <HeroMotion delay={0.2} className="mt-3">
              <ContributionGraph
                weeks={gh.weeks}
                totalContributions={gh.totalContributions}
              />
            </HeroMotion>
          )}
        </Container>
      </section>

      {/* ── Now ──────────────────────────────────────────────── */}
      <section id="now" className="py-20 sm:py-24">
        <Container size="md">
          <ScrollReveal className="mb-10">
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              Now
            </p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              What I&apos;m building
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <NowFeed entries={nowEntries} />
          </ScrollReveal>
        </Container>
      </section>

      {/* ── Projects ─────────────────────────────────────────── */}
      <section id="projects" className="border-t border-border py-24 sm:py-32">
        <Container size="md">
          <ScrollReveal className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-accent">
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
      <section className="border-t border-border py-24 sm:py-32">
        <Container size="md">
          <ScrollReveal className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-accent">
                Writing
              </p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Recent Thoughts
              </h2>
            </div>
            <Link
              href="/thoughts"
              className="flex items-center gap-1 text-sm text-foreground-muted transition-colors hover:text-foreground"
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
                  className="group flex items-start justify-between gap-6 py-7 transition-colors"
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
                    className="mt-1 shrink-0 text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="text-sm text-foreground-muted">
              Writing on product thinking, engineering trade-offs, and systems at scale.{" "}
              <Link href="/thoughts" className="underline underline-offset-4 hover:text-foreground">
                Browse all posts →
              </Link>
            </p>
          )}
        </Container>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────── */}
      <section id="contact" className="border-t border-border py-24 sm:py-32">
        <Container size="md" className="text-center">
          <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
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
