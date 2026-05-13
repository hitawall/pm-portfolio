import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/config";
import { getAllCaseStudies, getAllPosts } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();

  const [caseStudies, posts] = await Promise.all([
    getAllCaseStudies(),
    getAllPosts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, priority: 1.0 },
    { url: `${base}/work`, priority: 0.9 },
    { url: `${base}/thoughts`, priority: 0.9 },
    { url: `${base}/projects`, priority: 0.8 },
    { url: `${base}/about`, priority: 0.7 },
    { url: `${base}/resume`, priority: 0.6 },
  ];

  const workRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${base}/work/${cs.slug.current}`,
    priority: 0.8,
  }));

  const thoughtRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/thoughts/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes, ...thoughtRoutes];
}
