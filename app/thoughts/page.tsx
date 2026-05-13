import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RuleDivider } from "@/components/ui/RuleDivider";
import { getAllPosts } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Thoughts — ${siteConfig.name}`,
  description:
    "Writing on product thinking, engineering trade-offs, and the SDE→PM transition.",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default async function Thoughts() {
  const posts = await getAllPosts();

  return (
    <main className="flex-1">
      <Container size="md" className="py-16 sm:py-24">

        {/* Header */}
        <div className="mb-14 text-center">
          <p className="small-caps text-foreground-muted">Thoughts</p>
          <h1 className="mt-5 font-serif text-5xl text-foreground sm:text-6xl">
            Writing
          </h1>
          <p className="mx-auto mt-5 max-w-sm font-serif text-xl italic text-foreground-muted">
            Product thinking, engineering trade-offs, and the SDE→PM transition.
          </p>
        </div>

        <RuleDivider />

        <SectionLabel className="mt-12">All posts</SectionLabel>

        {posts.length === 0 ? (
          <p className="py-4 text-sm text-foreground-muted">Posts coming soon.</p>
        ) : (
          <div>
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/thoughts/${post.slug.current}`}
                className="group flex items-start justify-between gap-6 border-b border-border py-8 last:border-b-0 transition-colors duration-150"
              >
                <div className="w-20 flex-shrink-0 pt-0.5">
                  <span className="small-caps text-foreground-muted">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-serif text-2xl text-foreground transition-colors duration-150 group-hover:text-accent">
                    {post.title}
                  </p>
                  {post.summary && (
                    <p className="mt-2 max-w-lg text-sm text-foreground-muted">
                      {post.summary}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="small-caps text-foreground-muted opacity-60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <ArrowUpRight
                  size={18}
                  className="mt-1 flex-shrink-0 text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </Link>
            ))}
          </div>
        )}

      </Container>
    </main>
  );
}
