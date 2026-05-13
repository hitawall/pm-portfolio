import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
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
    day: "numeric",
  });
}

export default async function Thoughts() {
  const posts = await getAllPosts();

  return (
    <main className="flex-1">
      <Container size="md" className="py-14 sm:py-20">

        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Thoughts
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Writing
          </h1>
          <p className="mt-3 text-lg text-foreground-muted">
            Product thinking, engineering trade-offs, and the SDE→PM transition.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-sm text-foreground-muted">Posts coming soon.</p>
        ) : (
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/thoughts/${post.slug.current}`}
                className="group flex items-start justify-between gap-6 py-8"
              >
                <div className="flex-1">
                  <span className="font-mono text-xs text-foreground-muted">
                    {formatDate(post.publishedAt)}
                  </span>
                  <h2 className="mt-1 text-lg font-semibold tracking-tight transition-colors duration-150 group-hover:text-accent">
                    {post.title}
                  </h2>
                  {post.summary && (
                    <p className="mt-1.5 max-w-lg text-sm text-foreground-muted">
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
