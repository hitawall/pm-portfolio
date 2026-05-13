import { groq } from "next-sanity";
import { client } from "./client";

const hasProjectId = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// ── Types ────────────────────────────────────────────────────────────────────

export type CaseStudyPreview = {
  _id: string;
  title: string;
  slug: { current: string };
  company: string;
  year: string;
  summary: string;
  featured: boolean;
  order: number;
  tags: string[];
};

export type CaseStudy = CaseStudyPreview & {
  role: string;
  coverImage: unknown;
  outcomes: { label: string; value: string; delta?: string }[];
  body: unknown[];
};

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  summary: string;
  tags: string[];
};

export type PostFull = Post & { body: unknown[] };

export type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  kind: "product" | "engineering" | "hobby";
  year: number;
  externalUrl?: string;
  summary: string;
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const CASE_STUDY_PREVIEW_FIELDS = groq`
  _id, title, slug, company, year, summary, featured, order, tags
`;

const revalidate = { next: { revalidate: 60 } } as const;

// ── Queries ──────────────────────────────────────────────────────────────────

export async function getFeaturedCaseStudies(): Promise<CaseStudyPreview[]> {
  if (!hasProjectId) return [];
  return client.fetch(
    groq`*[_type == "caseStudy" && featured == true] | order(order asc)[0...3] { ${CASE_STUDY_PREVIEW_FIELDS} }`,
    {},
    revalidate
  );
}

export async function getAllCaseStudies(): Promise<CaseStudyPreview[]> {
  if (!hasProjectId) return [];
  return client.fetch(
    groq`*[_type == "caseStudy"] | order(featured desc, order asc, year desc) { ${CASE_STUDY_PREVIEW_FIELDS} }`,
    {},
    revalidate
  );
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!hasProjectId) return null;
  return client.fetch(
    groq`*[_type == "caseStudy" && slug.current == $slug][0] {
      ${CASE_STUDY_PREVIEW_FIELDS}, role, coverImage, outcomes, body
    }`,
    { slug },
    revalidate
  );
}

export async function getAllPosts(): Promise<Post[]> {
  if (!hasProjectId) return [];
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) { _id, title, slug, publishedAt, summary, tags }`,
    {},
    revalidate
  );
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  if (!hasProjectId) return null;
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] { _id, title, slug, publishedAt, summary, tags, body }`,
    { slug },
    revalidate
  );
}

export async function getAllProjects(): Promise<Project[]> {
  if (!hasProjectId) return [];
  return client.fetch(
    groq`*[_type == "project"] | order(year desc) { _id, title, slug, kind, year, externalUrl, summary }`,
    {},
    revalidate
  );
}
