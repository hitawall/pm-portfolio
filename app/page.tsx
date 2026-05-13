import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BentoCard } from "@/components/ui/BentoCard";
import { siteConfig } from "@/lib/config";

const companies = [
  { name: "JPMC", period: "2020–21" },
  { name: "Amazon", period: "2021–22" },
  { name: "Blink Health", period: "2022–23" },
  { name: "Nutanix", period: "2023–25" },
];

const caseStudies = [
  {
    label: "Case study",
    title: "Reducing onboarding friction",
    company: "Nutanix",
    year: "2024",
    href: "/work/nutanix-onboarding",
  },
  {
    label: "Case study",
    title: "Pricing experiments at scale",
    company: "Blink Health",
    year: "2023",
    href: "/work/blink-pricing",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <Container size="lg" className="py-10 sm:py-14">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

          {/* ── Hero card (2 col) ─────────────────────── */}
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
                Building at the intersection of technology and user needs.
                5 years across finance, health, and cloud infrastructure.
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

          {/* ── Companies card (1 col) ───────────────── */}
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

          {/* ── Case study cards ─────────────────────── */}
          {caseStudies.map((cs) => (
            <BentoCard key={cs.href} className="flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
                  {cs.label}
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
                  Phase 2
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-foreground-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </div>
            </BentoCard>
          ))}

          {/* ── Thoughts card ────────────────────────── */}
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

        </div>
      </Container>
    </main>
  );
}
