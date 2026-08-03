export const revalidate = 3600;

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Pencil } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Bezel } from "@/components/ui/Bezel";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { ContributionGraph } from "@/components/site/ContributionGraph";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getAllPosts, getNowEntries, getSiteSettings, getAllProjects } from "@/sanity/lib/queries";
import { siteConfig, githubFallbackStats } from "@/lib/config";
import { KIND_LABELS } from "@/lib/projects";
import { getGitHubStats, type GitHubStats } from "@/lib/github";
import { RelativeTime } from "@/components/ui/RelativeTime";
import { NOW_FALLBACK } from "@/lib/now";
import { NowFeed } from "@/components/site/NowFeed";
import { ContactForm } from "@/components/site/ContactForm";
import { ParallaxGlow } from "@/components/site/ParallaxGlow";
import { Magnetic } from "@/components/ui/Magnetic";
import { PullQuote } from "@/components/ui/PullQuote";
import { urlFor } from "@/sanity/lib/image";
import { toVideoEmbedUrl } from "@/lib/embed";
import { ProjectMedia } from "@/components/ui/ProjectMedia";

const DEFAULTS = {
  tagline: "Builder · Engineer · Product Thinker",
  statusBadge: "Open to PM & senior eng roles",
  heroHeadlinePlain: "Engineering depth.",
  heroHeadlineAccent: "Product instincts.",
  heroSubtitle:
    "Five years building at scale across fintech, health, and cloud. Now bringing that engineering depth to product: shipping the right thing, not just building it right.",
  companies: ["JPMC", "Amazon", "Blink Health", "Nutanix"],
  careerStartYear: 2020,
  yearsShipping: "05",
  industryDetail: "fintech · health · cloud",
  ctaLabel: "Open to opportunities",
  ctaHeadline: "Let's build something together",
  ctaBody:
    "Open to senior engineering, product, and AI/LLM roles where craft and customer obsession both matter.",
};

function formatProjectCount(n: number): string {
  if (n < 10) return String(n).padStart(2, "0");
  return `${Math.floor(n / 10) * 10}+`;
}

function buildHeroStats(
  gh: GitHubStats | null,
  projectCount: number,
  yearsShipping: string,
  industryDetail: string
) {
  return [
    { label: "Years shipping", value: yearsShipping, detail: industryDetail },
    {
      label: "Projects built",
      value: formatProjectCount(projectCount),
      detail: "side quests included",
    },
    {
      label: "Contributions",
      value: gh
        ? gh.totalContributions.toLocaleString("en-US")
        : githubFallbackStats.contributions,
      detail: "past year · GitHub",
      href: `https://github.com/${siteConfig.githubUsername}?tab=overview`,
    },
    {
      label: "Last commit",
      value: githubFallbackStats.lastCommit,
      pushedAt: gh?.lastPush?.pushedAt ?? null,
      detail: gh?.lastPush
        ? gh.lastPush.repo
        : `github.com/${siteConfig.githubUsername}`,
      href: gh?.lastPush
        ? `https://github.com/${siteConfig.githubUsername}/${gh.lastPush.repo}`
        : `https://github.com/${siteConfig.githubUsername}`,
    },
  ];
}

export default async function Home() {
  const [allPosts, gh, sanityNow, cms, sanityProjects] = await Promise.all([
    getAllPosts(),
    getGitHubStats(),
    getNowEntries(),
    getSiteSettings(),
    getAllProjects(),
  ]);

  const s = { ...DEFAULTS, ...Object.fromEntries(Object.entries(cms).filter(([, v]) => v != null)) };
  const projectCount = sanityProjects.length;
  const recentPosts = allPosts.slice(0, 3);
  const heroStats = buildHeroStats(gh, projectCount, s.yearsShipping, s.industryDetail);
  const nowEntries = sanityNow.length > 0 ? sanityNow : NOW_FALLBACK;
  const currentNow =
    nowEntries.find((e) => e.current && e.status === "building") ??
    nowEntries.find((e) => e.current);

  return (
    <main id="main-content" className="flex-1">

      {/* ── Hero — Asymmetrical Bento proof-of-work dashboard ── */}
      <section className="relative overflow-hidden border-b border-border py-20 sm:py-28">
        {/* Gradient glow backdrop — scroll-linked parallax */}
        <ParallaxGlow />

        <Container size="lg" className="relative">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Feature card — identity, headline, CTAs */}
            <ScrollReveal className="lg:col-span-8 lg:row-span-2">
              <Bezel shellClassName="h-full" className="flex h-full flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border-strong">
                    <Image
                      src="/avatar.jpg"
                      alt="Shubham Arora"
                      width={48}
                      height={48}
                      sizes="48px"
                      className="h-full w-full scale-[1.1] object-cover [object-position:50%_48%]"
                      priority
                    />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold tracking-tight">
                      {siteConfig.name}
                    </p>
                    <p className="text-xs text-foreground-muted">{s.tagline}</p>
                  </div>
                  <p className="inline-flex items-baseline gap-2 border-b border-accent/40 pb-0.5 font-mono text-xs uppercase tracking-wider text-accent sm:ml-auto">
                    <span aria-hidden>•</span>
                    {s.statusBadge}
                  </p>
                </div>

                <h1 className="mt-9 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                  {s.heroHeadlinePlain}{" "}
                  <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                    {s.heroHeadlineAccent}
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-base text-foreground-muted sm:text-lg">
                  {s.heroSubtitle}
                </p>

                <p className="mt-4 font-mono text-xs text-foreground-muted">
                  {s.companies.join(" → ")} · {s.careerStartYear} → {new Date().getFullYear()}
                </p>

                {currentNow && (
                  <p className="mt-4 inline-flex items-baseline gap-2 border-b border-border pb-1 font-mono text-xs text-foreground-muted">
                    <span aria-hidden className="text-accent">•</span>
                    {currentNow.status === "building" ? "building" : currentNow.status}:{" "}
                    <span className="text-foreground">{currentNow.title}</span>
                  </p>
                )}

                <div className="mt-auto flex flex-wrap gap-3 pt-7">
                  <Magnetic>
                    <Button as={Link} href="/projects" icon>
                      View projects
                    </Button>
                  </Magnetic>
                  <Magnetic>
                    <CopyEmail label="Get in touch" variant="ghost" />
                  </Magnetic>
                </div>
              </Bezel>
            </ScrollReveal>

            {/* Right stack — years shipping + projects built */}
            <div className="flex flex-col gap-4 lg:col-span-4 lg:row-span-2">
              <ScrollReveal delay={0.08} className="flex-1">
                <Bezel shellClassName="h-full" className="flex h-full flex-col justify-center p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
                    {heroStats[0].label}
                  </p>
                  <p className="mt-2 font-mono text-2xl font-medium tabular-nums sm:text-3xl">
                    {heroStats[0].value}
                  </p>
                  <p className="mt-1 truncate font-mono text-[11px] text-foreground-muted">
                    {heroStats[0].detail}
                  </p>
                </Bezel>
              </ScrollReveal>
              <ScrollReveal delay={0.14} className="flex-1">
                <Bezel shellClassName="h-full" className="flex h-full flex-col justify-center p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
                    {heroStats[1].label}
                  </p>
                  <p className="mt-2 font-mono text-2xl font-medium tabular-nums sm:text-3xl">
                    {heroStats[1].value}
                  </p>
                  <p className="mt-1 truncate font-mono text-[11px] text-foreground-muted">
                    {heroStats[1].detail}
                  </p>
                </Bezel>
              </ScrollReveal>
            </div>

            {/* Contributions stat */}
            <ScrollReveal delay={0.18} className="lg:col-span-6">
              <Bezel
                as={heroStats[2].href ? "a" : "div"}
                href={heroStats[2].href}
                target={heroStats[2].href ? "_blank" : undefined}
                rel={heroStats[2].href ? "noopener noreferrer" : undefined}
                shellClassName="h-full"
                className="group flex h-full flex-col justify-center p-5 transition-colors duration-200"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
                  {heroStats[2].label}
                </p>
                <p className="mt-2 font-mono text-2xl font-medium tabular-nums sm:text-3xl">
                  {heroStats[2].value}
                </p>
                <p className="mt-1 truncate font-mono text-[11px] text-foreground-muted transition-colors duration-150 group-hover:text-accent">
                  {heroStats[2].detail}
                </p>
              </Bezel>
            </ScrollReveal>

            {/* Last commit stat */}
            <ScrollReveal delay={0.22} className="lg:col-span-6">
              <Bezel
                as={heroStats[3].href ? "a" : "div"}
                href={heroStats[3].href}
                target={heroStats[3].href ? "_blank" : undefined}
                rel={heroStats[3].href ? "noopener noreferrer" : undefined}
                shellClassName="h-full"
                className="group flex h-full flex-col justify-center p-5 transition-colors duration-200"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
                  {heroStats[3].label}
                </p>
                <p className="mt-2 font-mono text-2xl font-medium tabular-nums sm:text-3xl">
                  {"pushedAt" in heroStats[3] && heroStats[3].pushedAt ? (
                    <RelativeTime isoDate={heroStats[3].pushedAt} />
                  ) : (
                    heroStats[3].value
                  )}
                </p>
                <p className="mt-1 truncate font-mono text-[11px] text-foreground-muted transition-colors duration-150 group-hover:text-accent">
                  {heroStats[3].detail}
                </p>
              </Bezel>
            </ScrollReveal>

            {/* Contribution graph — only when live data is available */}
            {gh && (
              <ScrollReveal delay={0.26} className="lg:col-span-12">
                <Bezel
                  as="a"
                  href={`https://github.com/${siteConfig.githubUsername}?tab=overview`}
                  target="_blank"
                  rel="noopener noreferrer"
                  shellClassName="h-full"
                  className="block p-5 transition-opacity duration-200 hover:opacity-90"
                  aria-label="View GitHub contribution history"
                >
                  <ContributionGraph
                    weeks={gh.weeks}
                    totalContributions={gh.totalContributions}
                  />
                </Bezel>
              </ScrollReveal>
            )}
          </div>
        </Container>
      </section>

      {/* ── Pull quote — Axelsen ─────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <Container size="md">
          <ScrollReveal>
            <PullQuote
              quote="Every day is an exam for me. I want to be able to look at myself in the mirror every single day and tell myself that I did everything I could in order to become better, both on and off the court."
              author="Viktor Axelsen"
              context="two-time Olympic badminton champion"
            />
          </ScrollReveal>
        </Container>
      </section>

      {/* ── Now ──────────────────────────────────────────────── */}
      <section id="now" className="py-20 sm:py-24">
        <Container size="md">
          <ScrollReveal className="mb-10">
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              Now
            </p>
            <div className="mt-1 flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                What I&apos;m building
              </h2>
              <a
                href="/studio"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-0.5 self-end text-foreground-muted opacity-30 transition-all duration-200 hover:text-accent hover:opacity-100"
                aria-label="Edit Now entries in Sanity Studio"
                title="Edit in Studio"
              >
                <Pencil size={15} />
              </a>
            </div>
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sanityProjects.map((project, i) => {
              const images = (project.media ?? []).map((img) => ({
                url: urlFor(img).width(1200).url(),
                alt: img.alt,
                caption: img.caption,
              }));
              const videoEmbedUrl = project.videoUrl
                ? (toVideoEmbedUrl(project.videoUrl) ?? undefined)
                : undefined;
              const hasMedia = images.length > 0 || !!videoEmbedUrl;
              return (
                <ScrollReveal key={project._id} delay={i * 0.06}>
                  <Bezel
                    as="a"
                    href={project.externalUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    shellClassName="h-full transition-shadow duration-300 hover:shadow-[0_0_24px_var(--accent-glow)]"
                    className="group flex h-full flex-col p-5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-foreground-muted">
                          {KIND_LABELS[project.kind] ?? project.kind}
                        </span>
                        <span className="font-mono text-xs text-foreground-muted">{project.year}</span>
                      </div>
                      <ArrowUpRight
                        size={15}
                        className="shrink-0 text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </div>
                    <h3 className="mt-3 text-base font-semibold tracking-tight transition-colors duration-150 group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                      {project.summary}
                    </p>
                    {hasMedia && (
                      <ProjectMedia images={images} videoEmbedUrl={videoEmbedUrl} />
                    )}
                  </Bezel>
                </ScrollReveal>
              );
            })}
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
            <div className="flex flex-col gap-4">
              {recentPosts.map((post, i) => (
                <ScrollReveal key={post._id} delay={i * 0.08}>
                  <Bezel
                    as={Link}
                    href={`/thoughts/${post.slug.current}`}
                    shellClassName="transition-shadow duration-300 hover:shadow-[0_0_24px_var(--accent-glow)]"
                    className="group block p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-mono text-xs text-foreground-muted">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <ArrowUpRight
                        size={15}
                        className="mt-0.5 shrink-0 text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </div>
                    <p className="mt-2 font-semibold leading-snug tracking-tight transition-colors duration-150 group-hover:text-accent">
                      {post.title}
                    </p>
                    {post.summary && (
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted line-clamp-2">
                        {post.summary}
                      </p>
                    )}
                  </Bezel>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="text-sm text-foreground-muted">
              Writing on engineering trade-offs, AI systems, and what I&apos;m building.{" "}
              <Link href="/thoughts" className="text-accent underline-offset-4 hover:underline">
                Browse all posts →
              </Link>
            </p>
          )}
        </Container>
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <section id="contact" className="border-t border-border py-24 sm:py-32">
        <Container size="sm">
          <ScrollReveal className="mb-10 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              {s.ctaLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {s.ctaHeadline}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-foreground-muted">
              {s.ctaBody}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ContactForm />
          </ScrollReveal>
        </Container>
      </section>

    </main>
  );
}
