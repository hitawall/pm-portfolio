import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RuleDivider } from "@/components/ui/RuleDivider";
import { PortableText } from "@/components/content/PortableText";
import { getAllPosts, getPostBySlug } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/config";

interface Props {
  params: Promise<{ slug: string }>;
}

type PTBlock = { _type: string; children?: Array<{ text?: string }> };

function getReadingTime(body: unknown[]): number {
  const words = (body as PTBlock[])
    .filter((b) => b._type === "block")
    .flatMap((b) => (b.children ?? []).map((c) => c.text ?? ""))
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
  return {
    title: `${post.title} — ${siteConfig.name}`,
    description: post.summary,
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
  const prev = allPosts[idx + 1] ?? null; // older
  const next = allPosts[idx - 1] ?? null; // newer
  const readingTime = post.body ? getReadingTime(post.body) : 1;

  return (
    <main className="flex-1">
      <Container size="md" className="py-16 sm:py-24">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="small-caps text-foreground-muted">
            {formatDate(post.publishedAt)} · {readingTime} min read
          </p>
          <h1 className="mt-5 font-serif text-4xl text-foreground sm:text-5xl">
            {post.title}
          </h1>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {post.tags.map((tag) => (
                <span key={tag} className="small-caps text-foreground-muted opacity-60">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <RuleDivider className="mb-10" />

        {/* Body */}
        {post.body && <PortableText value={post.body} />}

        <RuleDivider className="mt-10" />

        {/* Prev / Next */}
        {(prev || next) && (
          <nav className="mt-10 flex items-start justify-between gap-4">
            {prev ? (
              <Link
                href={`/thoughts/${prev.slug.current}`}
                className="group flex flex-col gap-1"
              >
                <span className="small-caps text-foreground-muted">Previous</span>
                <span className="flex items-center gap-1.5 font-serif text-lg text-foreground transition-colors duration-150 group-hover:text-accent">
                  <ArrowLeft
                    size={14}
                    className="transition-transform group-hover:-translate-x-0.5"
                  />
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/thoughts/${next.slug.current}`}
                className="group flex flex-col items-end gap-1 text-right"
              >
                <span className="small-caps text-foreground-muted">Next</span>
                <span className="flex items-center gap-1.5 font-serif text-lg text-foreground transition-colors duration-150 group-hover:text-accent">
                  {next.title}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}

      </Container>
    </main>
  );
}
