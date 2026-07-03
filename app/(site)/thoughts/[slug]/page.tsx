import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/content/PortableText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getAllPosts, getPostBySlug } from "@/sanity/lib/queries";
import { getBaseUrl } from "@/lib/config";

interface Props {
  params: Promise<{ slug: string }>;
}

type PTChild = { text?: string };
type PTBlock = { _type: string; children?: PTChild[] };

function getReadingTime(body: unknown[]): number {
  const words = (body as PTBlock[])
    .filter((b) => b._type === "block")
    .flatMap((b) => b.children?.map((c) => c.text ?? "") ?? [])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const sub = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : undefined;
  const ogUrl = `${getBaseUrl()}/og?${new URLSearchParams({ title: post.title, type: "Thought", ...(sub && { sub }) }).toString()}`;
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/thoughts/${slug}` },
    openGraph: { images: [ogUrl] },
    twitter: { card: "summary_large_image", images: [ogUrl] },
  };
}

export default async function ThoughtPage({ params }: Props) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getAllPosts(),
  ]);
  if (!post) notFound();

  const idx = allPosts.findIndex((p) => p.slug.current === slug);
  const prev = allPosts[idx + 1] ?? null;
  const next = allPosts[idx - 1] ?? null;
  const readingTime = post.body ? getReadingTime(post.body) : 1;

  return (
    <main
      id="main-content"
      className="flex-1"
    >
      <Container size="md" className="py-20 sm:py-28">

        <ScrollReveal className="mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Thoughts
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-foreground-muted">
            <span className="font-mono">{formatDate(post.publishedAt)}</span>
            <span>·</span>
            <span>{readingTime} min read</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
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
        </ScrollReveal>

        {post.body && (
          <ScrollReveal delay={0.1} className="border-t border-border pt-10">
            <PortableText value={post.body} />
          </ScrollReveal>
        )}

        {(prev || next) && (
          <ScrollReveal delay={0.05} className="mt-16 flex items-center justify-between gap-4 border-t border-border pt-8 text-sm">
            {prev ? (
              <Link
                href={`/thoughts/${prev.slug.current}`}
                className="group flex items-center gap-2 text-foreground-muted transition-colors hover:text-foreground"
              >
                <ArrowLeft
                  size={14}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
                <span className="max-w-[200px] truncate">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/thoughts/${next.slug.current}`}
                className="group flex items-center gap-2 text-foreground-muted transition-colors hover:text-foreground"
              >
                <span className="max-w-[200px] truncate">{next.title}</span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            ) : (
              <span />
            )}
          </ScrollReveal>
        )}

      </Container>
    </main>
  );
}
