import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Bezel } from "@/components/ui/Bezel";
import { getAllPosts } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Thoughts",
  description:
    "Writing on product thinking, engineering trade-offs, and systems at scale.",
  alternates: { canonical: "/thoughts" },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function Thoughts() {
  const posts = await getAllPosts();

  return (
    <main
      id="main-content"
      className="flex-1"
    >
      <Container size="md" className="py-14 sm:py-20">

        <ScrollReveal className="mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Thoughts
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Writing
          </h1>
          <p className="mt-3 text-lg text-foreground-muted">
            Product thinking, engineering trade-offs, and systems at scale.
          </p>
        </ScrollReveal>

        {posts.length === 0 ? (
          <div className="space-y-3 py-4 text-sm text-foreground-muted">
            <p>
              I write about engineering trade-offs, AI systems, and what I&apos;m building. First posts dropping soon.
            </p>
            <p>
              In the meantime,{" "}
              <Link href="/projects" className="underline underline-offset-4 hover:text-foreground">
                browse the projects
              </Link>{" "}
              or{" "}
              <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
                read about the journey
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post, i) => (
              <ScrollReveal key={post._id} delay={i * 0.07}>
                <Bezel
                  as={Link}
                  href={`/thoughts/${post.slug.current}`}
                  shellClassName="transition-shadow duration-300 hover:shadow-[0_0_24px_var(--accent-glow)]"
                  className="group block p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs text-foreground-muted">
                      {formatDate(post.publishedAt)}
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="mt-0.5 shrink-0 text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>
                  <h2 className="mt-2 text-lg font-semibold tracking-tight transition-colors duration-150 group-hover:text-accent">
                    {post.title}
                  </h2>
                  {post.summary && (
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                      {post.summary}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Bezel>
              </ScrollReveal>
            ))}
          </div>
        )}

      </Container>
    </main>
  );
}
