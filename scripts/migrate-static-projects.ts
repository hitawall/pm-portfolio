/**
 * One-off migration: creates the 3 hardcoded STATIC_PROJECTS in Sanity,
 * then exits. Safe to re-run — uses createIfNotExists so nothing is duplicated.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-static-projects.ts
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "df9yxi9z",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const projects = [
  {
    _id: "static-project-auto-job-tracker",
    _type: "project",
    title: "Auto Job Tracker",
    slug: { _type: "slug", current: "auto-job-tracker" },
    kind: "engineering",
    year: 2026,
    externalUrl: "https://auto-job-tracker-two.vercel.app/",
    summary:
      "Chrome extension + spreadsheet that logs every job application automatically — no copy-paste, no forgotten follow-ups.",
  },
  {
    _id: "static-project-forty-rules-of-love",
    _type: "project",
    title: "Forty Rules of Love",
    slug: { _type: "slug", current: "forty-rules-of-love" },
    kind: "hobby",
    year: 2026,
    externalUrl: "https://forty-rules-of-love-one.vercel.app",
    summary:
      "An interactive digital retelling of Elif Şafak's novel — one rule surfaced per day, built as a meditative reading experience.",
  },
  {
    _id: "static-project-llm-roadmap",
    _type: "project",
    title: "LLM Roadmap",
    slug: { _type: "slug", current: "llm-roadmap" },
    kind: "engineering",
    year: 2026,
    externalUrl: "https://llm-systems-engineer-roadmap.vercel.app",
    summary:
      "A structured 12-week curriculum for engineers moving into LLM systems work — RAG, agents, evals, and production deployment.",
  },
];

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error("Error: SANITY_WRITE_TOKEN env var is not set.");
    process.exit(1);
  }

  console.log(`Migrating ${projects.length} projects to Sanity…\n`);

  for (const project of projects) {
    const result = await client.createIfNotExists(project);
    const created = result._createdAt === result._updatedAt;
    console.log(`${created ? "✓ Created" : "– Already exists"}: ${project.title}`);
  }

  console.log("\nDone. You can now remove STATIC_PROJECTS from lib/projects.ts.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
