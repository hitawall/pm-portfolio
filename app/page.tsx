import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BentoCard } from "@/components/ui/BentoCard";
import { getFeaturedCaseStudies } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/config";

const companies = [
  { name: "JPMC", period: "2020–21" },
  { name: "Amazon", period: "2021–22" },
  { name: "Blink Health", period: "2022–23" },
  { name: "Nutanix", period: "2023–25" },
];

export default async function Home() {
  const featuredStudies = await getFeaturedCaseStudies();

  return (
    <main className="flex-1">
      <Container size="lg" className="py-10 sm:py-14">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

          {/* ── Hero (2 col) ─────────────────────────────── */}
          <BentoCard
            span="2"
            className="flex min-h-72 flex-col justify-between [background:radial-gradient(ellipse_at_top_left,color-mix(in_srgb,var(--accent)_8%,transparent)_0%,transparent_60%)]"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
                Engineer → Product Manager
              </p>
              <h1 className="gradient-heading mt-3 text-6xl font-bold leading-none tracking-tighter sm:text-7xl">
                {siteConfig.name.split(" ").map((word) => (
                  <span key={word} className="block">
                    {word.toUpperCase()}
                  </span>
                ))}
              </h1>
            </div>
            <div>
              <p className="mb-5 max-w-sm text-sm text-foreground-muted">
                PM who reads diffs and P&Ls with equal fluency. 5 years
                shipping at scale across fintech, health, and cloud
                infrastructure — now bringing that depth to product decisions.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button as={Link} href="/work">
                  View work <ArrowUpRight size={14} />
                </Button>
                <Button as={Link} href="/about" variant="ghost">
                  About me
                </Button>
              </div>
            </div>
          </BentoCard>

          {/* ── Experience (1 col) ───────────────────────── */}
          <BentoCard className="flex flex-col">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground-muted">
              Experience
            </p>
            <div className="flex flex-col gap-2">
              {companies.map((co) => (
                <div
                  key={co.name}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 text-sm transition-colors duration-150 hover:border-accent/40"
                >
                  <span className="font-medium">{co.name}</span>
                  <span className="font-mono text-xs text-foreground-muted">
                    {co.period}
                  </span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* ── Featured case studies (from Sanity) ──────── */}
          {featuredStudies.length > 0 ? (
            featuredStudies.slice(0, 2).map((cs) => (
              <BentoCard
                key={cs._id}
                className="group relative flex flex-col justify-between"
              >
                {/* overlay link makes the whole card clickable */}
                <Link
                  href={`/work/${cs.slug.current}`}
                  className="absolute inset-0 rounded-2xl"
                  aria-label={cs.title}
                />
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
                    Case study
                  </p>
                  <p className="mt-3 text-base font-semibold leading-snug">
                    {cs.title}
                  </p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {cs.company}{cs.year ? ` · ${cs.year}` : ""}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  {cs.tags && cs.tags[0] ? (
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground-muted">
                      {cs.tags[0]}
                    </span>
                  ) : (
                    <span />
                  )}
                  <ArrowUpRight
                    size={16}
                    className="text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>
              </BentoCard>
            ))
          ) : (
            /* placeholder cards when no Sanity content yet */
            [
              { title: "Reducing onboarding friction", company: "Nutanix", year: "2024" },
              { title: "Pricing experiments at scale", company: "Blink Health", year: "2023" },
            ].map((cs) => (
              <BentoCard
                key={cs.title}
                className="flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
                    Case study
                  </p>
                  <p className="mt-3 text-base font-semibold leading-snug">
                    {cs.title}
                  </p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {cs.company} · {cs.year}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground-muted">
                    Coming soon
                  </span>
                  <ArrowUpRight size={16} className="text-foreground-muted" />
                </div>
              </BentoCard>
            ))
          )}

          {/* ── Thoughts (1 col) ─────────────────────────── */}
          <BentoCard className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
                Thoughts
              </p>
              <p className="mt-3 text-sm text-foreground-muted">
                Writing on product thinking, engineering trade-offs, and the
                SDE→PM transition.
              </p>
            </div>
            <Link
              href="/thoughts"
              className="mt-6 inline-flex items-center gap-1 text-sm text-accent transition-colors duration-150 hover:text-accent-hover"
            >
              View all <ArrowUpRight size={13} />
            </Link>
          </BentoCard>

          {/* ── Contact CTA (full width) ─────────────────── */}
          <BentoCard
            span="3"
            className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center [background:radial-gradient(ellipse_at_bottom_right,color-mix(in_srgb,var(--accent)_6%,transparent)_0%,transparent_60%)]"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
                Open to opportunities
              </p>
              <p className="mt-2 text-base font-semibold">
                Exploring Senior PM roles at product-led companies.
              </p>
              <p className="mt-1 text-sm text-foreground-muted">
                Particular interest in 0→1, platform-scale, and
                infra-adjacent product work.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-wrap gap-3">
              <Button as="a" href={`mailto:${siteConfig.email}`}>
                <Mail size={14} /> Get in touch
              </Button>
              <Button as={Link} href="/resume" variant="ghost">
                Resume
              </Button>
            </div>
          </BentoCard>

        </div>
      </Container>
    </main>
  );
}
