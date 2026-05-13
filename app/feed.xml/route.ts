import { NextResponse } from "next/server";
import { getAllPosts } from "@/sanity/lib/queries";
import { siteConfig, getBaseUrl } from "@/lib/config";

export const revalidate = 3600;

export async function GET() {
  const base = getBaseUrl();
  const posts = await getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${base}/thoughts/${post.slug.current}</link>
      <guid isPermaLink="true">${base}/thoughts/${post.slug.current}</guid>
      <description><![CDATA[${post.summary ?? ""}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteConfig.name} — Thoughts]]></title>
    <link>${base}/thoughts</link>
    <description><![CDATA[${siteConfig.description}]]></description>
    <language>en-us</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
