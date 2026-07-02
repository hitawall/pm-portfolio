import { groq } from "next-sanity";
import { client } from "./client";

const hasProjectId = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// ── Types ────────────────────────────────────────────────────────────────────

export type OutcomeMetric = { label: string; value: string; delta?: string };

export type CaseStudyPreview = {
  _id: string;
  title: string;
  slug: { current: string };
  company: string;
  role?: string;
  year: string;
  summary: string;
  featured: boolean;
  order: number;
  tags: string[];
  coverImage: SanityImage | null;
  outcomes?: OutcomeMetric[];
};

export type SanityImage = { asset: { _ref: string }; hotspot?: object; crop?: object };

export type CaseStudyDecision = {
  decision: string;
  rationale?: string;
  tradeoff?: string;
};

export type CaseStudy = CaseStudyPreview & {
  role: string;
  coverImage: SanityImage | null;
  outcomes: { label: string; value: string; delta?: string }[];
  problem?: string;
  constraints?: string[];
  decisions?: CaseStudyDecision[];
  outcomeNarrative?: string;
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

export type NowEntry = {
  _id: string;
  title: string;
  status: "building" | "shipped" | "learning" | "paused";
  description?: string;
  link?: string;
  startedAt: string;
  current: boolean;
};

export type SiteSettings = {
  tagline?: string;
  statusBadge?: string;
  heroHeadlinePlain?: string;
  heroHeadlineAccent?: string;
  heroSubtitle?: string;
  companies?: string[];
  careerStartYear?: number;
  yearsShipping?: string;
  industryDetail?: string;
  ctaLabel?: string;
  ctaHeadline?: string;
  ctaBody?: string;
  resumeUrl?: string;
};

export type ProjectImage = SanityImage & { _key: string; alt?: string; caption?: string };

export type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  kind: "ai" | "product" | "engineering" | "hobby";
  year: number;
  externalUrl?: string;
  summary: string;
  videoUrl?: string;
  media?: ProjectImage[];
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const CASE_STUDY_PREVIEW_FIELDS = groq`
  _id, title, slug, company, role, year, summary, featured, order, tags,
  coverImage, outcomes
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
      ${CASE_STUDY_PREVIEW_FIELDS}, role, coverImage, outcomes,
      problem, constraints, decisions, outcomeNarrative, body
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

export async function getNowEntries(): Promise<NowEntry[]> {
  if (!hasProjectId) return [];
  return client.fetch(
    groq`*[_type == "now"] | order(startedAt desc)[0...6] { _id, title, status, description, link, startedAt, current }`,
    {},
    revalidate
  );
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!hasProjectId) return {};
  return (
    (await client.fetch(
      groq`*[_type == "siteSettings" && _id == "siteSettings"][0] {
        tagline, statusBadge, heroHeadlinePlain, heroHeadlineAccent, heroSubtitle,
        companies, careerStartYear, yearsShipping, industryDetail,
        ctaLabel, ctaHeadline, ctaBody, resumeUrl
      }`,
      {},
      revalidate
    )) ?? {}
  );
}

export async function getAllProjects(): Promise<Project[]> {
  if (!hasProjectId) return [];
  return client.fetch(
    groq`*[_type == "project"] | order(year desc) { _id, title, slug, kind, year, externalUrl, summary, videoUrl, media[]{_key, asset, alt, caption, hotspot, crop} }`,
    {},
    revalidate
  );
}
