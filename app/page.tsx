import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RuleDivider } from "@/components/ui/RuleDivider";
import { getFeaturedCaseStudies, getAllPosts } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/config";

const companies = [
  { name: "JPMC", period: "2020–21" },
  { name: "Amazon", period: "2021–22" },
  { name: "Blink Health", period: "2022–23" },
  { name: "Nutanix", period: "2023–25" },
];

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

const placeholderStudies = [
  { title: "Reducing onboarding friction", company: "Nutanix", year: "2024", slug: null },
  { title: "Pricing experiments at scale", company: "Blink Health", year: "2023", slug: null },
];

export default async function Home() {
  const [featuredStudies, allPosts] = await Promise.all([
    getFeaturedCaseStudies(),
    getAllPosts(),
  ]);
  const recentPosts = allPosts.slice(0, 3);

  return (
    <main className="flex-1">
      <Container size="md">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="py-24 text-center sm:py-32">
          <p className="small-caps text-foreground-muted">Engineer → Product Manager</p>
          <h1 className="mt-5 font-serif text-6xl leading-[1.1] text-foreground sm:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="mx-auto mt-6 max-w-md font-serif text-xl italic leading-relaxed text-foreground-muted">
            PM who reads diffs and P&amp;Ls with equal fluency.
          </p>

          {/* Timeline */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-1.5">
            {companies.map((co, i) => (
              <span key={co.name} className="small-caps text-foreground-muted">
                {co.name}
                <span className="ml-1.5 opacity-50">{co.period}</span>
                {i < companies.length - 1 && (
                  <span className="ml-6 opacity-30">·</span>
                )}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button as={Link} href="/work">
              View work <ArrowUpRight size={14} />
            </Button>
            <Button as={Link} href="/about" variant="secondary">
              About me
            </Button>
          </div>
        </section>

        <RuleDivider />

        {/* ── Selected Work ────────────────────────────── */}
        <section className="py-16">
          <SectionLabel>Selected Work</SectionLabel>

          {featuredStudies.length > 0 ? (
            <div>
              {featuredStudies.slice(0, 3).map((cs) => (
                <Link
                  key={cs._id}
                  href={`/work/${cs.slug.current}`}
                  className="group relative flex items-start justify-between gap-6 border-b border-border py-7 last:border-b-0 transition-colors duration-150"
                >
                  <div className="w-20 flex-shrink-0 pt-0.5">
                    <span className="small-caps text-foreground-muted">{cs.year ?? ""}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-xl text-foreground transition-colors duration-150 group-hover:text-accent">
                      {cs.title}
                    </p>
                    {cs.summary && (
                      <p className="mt-1.5 text-sm text-foreground-muted">{cs.summary}</p>
                    )}
                    <p className="mt-2 small-caps text-foreground-muted opacity-70">{cs.company}</p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="mt-1 flex-shrink-0 text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div>
              {placeholderStudies.map((cs) => (
                <div
                  key={cs.title}
                  className="flex items-start justify-between gap-6 border-b border-border py-7 last:border-b-0 opacity-40"
                >
                  <div className="w-20 flex-shrink-0 pt-0.5">
                    <span className="small-caps text-foreground-muted">{cs.year}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-xl text-foreground">{cs.title}</p>
                    <p className="mt-2 small-caps text-foreground-muted opacity-70">{cs.company}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-right">
            <Link
              href="/work"
              className="small-caps text-accent transition-colors duration-150 hover:text-foreground"
            >
              All case studies <ArrowUpRight size={11} className="inline" />
            </Link>
          </div>
        </section>

        <RuleDivider />

        {/* ── Recent Thoughts ──────────────────────────── */}
        <section className="py-16">
          <SectionLabel>Recent Thoughts</SectionLabel>

          {recentPosts.length > 0 ? (
            <div>
              {recentPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/thoughts/${post.slug.current}`}
                  className="group flex items-start justify-between gap-6 border-b border-border py-7 last:border-b-0 transition-colors duration-150"
                >
                  <div className="w-20 flex-shrink-0 pt-0.5">
                    <span className="small-caps text-foreground-muted">
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-xl text-foreground transition-colors duration-150 group-hover:text-accent">
                      {post.title}
                    </p>
                    {post.summary && (
                      <p className="mt-1.5 text-sm text-foreground-muted">{post.summary}</p>
                    )}
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="mt-1 flex-shrink-0 text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </Link>
              ))}
            </div>
          ) : (
            <p className="py-4 text-sm text-foreground-muted opacity-60">Posts coming soon.</p>
          )}

          <div className="mt-8 text-right">
            <Link
              href="/thoughts"
              className="small-caps text-accent transition-colors duration-150 hover:text-foreground"
            >
              All writing <ArrowUpRight size={11} className="inline" />
            </Link>
          </div>
        </section>

        <RuleDivider />

        {/* ── Contact ──────────────────────────────────── */}
        <section className="py-16 text-center">
          <p className="small-caps text-foreground-muted">Open to opportunities</p>
          <p className="mx-auto mt-4 max-w-sm font-serif text-2xl text-foreground">
            Exploring Senior PM roles at product-led companies.
          </p>
          <p className="mt-3 text-sm text-foreground-muted">
            Particular interest in 0→1, platform-scale, and infra-adjacent product work.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button as="a" href={`mailto:${siteConfig.email}`}>
              <Mail size={14} /> Get in touch
            </Button>
            <Button
              as="a"
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              LinkedIn
            </Button>
            <Button as={Link} href="/resume" variant="ghost">
              Resume
            </Button>
          </div>
        </section>

      </Container>
    </main>
  );
}
