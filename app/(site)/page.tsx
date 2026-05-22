import Link from "next/link";
import { ArrowUpRight, Mail, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroMotion } from "@/components/site/HeroMotion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getFeaturedCaseStudies, getAllPosts } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/config";

const companies = [
  { name: "JPMC", period: "2020–21" },
  { name: "Amazon", period: "2021–22" },
  { name: "Blink Health", period: "2022–23" },
  { name: "Nutanix", period: "2023–25" },
];

const placeholderStudies = [
  { _id: "1", title: "Reducing onboarding friction", company: "Nutanix", year: "2024", summary: "Redesigned the new user flow, cutting time-to-value by 40%.", tags: ["Growth"], slug: { current: "#" }, featured: true, order: 1 },
  { _id: "2", title: "Pricing experiments at scale", company: "Blink Health", year: "2023", summary: "Led A/B pricing strategy that increased conversion by 22%.", tags: ["Monetisation"], slug: { current: "#" }, featured: true, order: 2 },
];

export default async function Home() {
  const [featuredStudies, allPosts] = await Promise.all([
    getFeaturedCaseStudies(),
    getAllPosts(),
  ]);
  const studies = featuredStudies.length > 0 ? featuredStudies.slice(0, 3) : placeholderStudies;
  const recentPosts = allPosts.slice(0, 3);

  return (
    <main id="main-content" className="flex-1">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden [background:radial-gradient(ellipse_80%_60%_at_50%_-10%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent)]">
        <Container size="md" className="text-center">
          <HeroMotion>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-foreground-muted backdrop-blur-sm">
              Engineer → Product Manager
            </p>
            <h1 className="gradient-heading mt-5 text-6xl font-bold leading-[1.05] tracking-tighter sm:text-7xl lg:text-8xl">
              Shubham<br />Arora
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-base text-foreground-muted sm:text-lg">
              PM who reads diffs and P&Ls with equal fluency. 5 years shipping
              at scale across fintech, health, and cloud infrastructure.
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
              <Button as={Link} href="/work">
                View work <ArrowUpRight size={14} />
              </Button>
              <Button as="a" href={`mailto:${siteConfig.email}`} variant="ghost">
                <Mail size={14} /> Get in touch
              </Button>
            </div>
          </HeroMotion>
        </Container>

        <a
          href="#work"
          aria-label="Scroll to work"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground-muted transition-colors duration-150 hover:text-accent"
        >
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </section>

      {/* ── Selected Work ────────────────────────────────────── */}
      <section id="work" className="border-t border-border py-20 sm:py-28">
        <Container size="lg">
          <ScrollReveal className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
                Portfolio
              </p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Selected Work
              </h2>
            </div>
            <Link
              href="/work"
              className="flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent-hover"
            >
              All work <ArrowUpRight size={14} />
            </Link>
          </ScrollReveal>

          <div className="flex flex-col gap-4">
            {studies.map((cs, i) => (
              <ScrollReveal key={cs._id} delay={i * 0.1}>
              <div
                key={cs._id}
                className="group relative flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:border-accent/40 hover:shadow-md sm:flex-row sm:items-center"
              >
                <Link
                  href={`/work/${cs.slug.current}`}
                  className="absolute inset-0 rounded-2xl"
                  aria-label={cs.title}
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-foreground-muted">
                      {cs.company}
                    </span>
                    {cs.year && (
                      <>
                        <span className="text-foreground-muted">·</span>
                        <span className="font-mono text-xs text-foreground-muted">
                          {cs.year}
                        </span>
                      </>
                    )}
                    {cs.tags?.[0] && (
                      <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground-muted">
                        {cs.tags[0]}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-lg font-semibold leading-snug">
                    {cs.title}
                  </p>
                  {cs.summary && (
                    <p className="mt-1 text-sm text-foreground-muted line-clamp-2">
                      {cs.summary}
                    </p>
                  )}
                </div>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
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
              Writing on product thinking, engineering trade-offs, and the SDE→PM transition.{" "}
              <Link href="/thoughts" className="text-accent hover:underline">
                Browse all posts →
              </Link>
            </p>
          )}
        </Container>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────── */}
      <section className="border-t border-border py-20 sm:py-28 [background:radial-gradient(ellipse_80%_80%_at_50%_110%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent)]">
        <Container size="md" className="text-center">
          <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
            Open to opportunities
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s build something together
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-foreground-muted">
            Exploring Senior PM roles at product-led companies. Particular
            interest in 0→1, platform-scale, and infra-adjacent work.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button as="a" href={`mailto:${siteConfig.email}`}>
              <Mail size={14} /> {siteConfig.email}
            </Button>
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
