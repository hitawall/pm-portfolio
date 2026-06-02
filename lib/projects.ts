export type StaticProject = {
  _id: string;
  title: string;
  kind: string;
  year: number;
  summary: string;
  externalUrl: string | null;
};

export const STATIC_PROJECTS: StaticProject[] = [
  {
    _id: "static-1",
    title: "Auto Job Tracker",
    kind: "engineering",
    year: 2026,
    summary: "Chrome extension + spreadsheet that logs every job application automatically — no copy-paste, no forgotten follow-ups.",
    externalUrl: "https://auto-job-tracker-two.vercel.app/",
  },
  {
    _id: "static-2",
    title: "Forty Rules of Love",
    kind: "hobby",
    year: 2026,
    summary: "An interactive digital retelling of Elif Şafak's novel — one rule surfaced per day, built as a meditative reading experience.",
    externalUrl: "https://forty-rules-of-love-one.vercel.app",
  },
  {
    _id: "static-3",
    title: "LLM Roadmap",
    kind: "engineering",
    year: 2026,
    summary: "A structured 12-week curriculum for engineers moving into LLM systems work — RAG, agents, evals, and production deployment.",
    externalUrl: "https://llm-systems-engineer-roadmap.vercel.app",
  },
];

export const KIND_LABELS: Record<string, string> = {
  product: "Product",
  engineering: "Engineering",
  hobby: "Hobby",
};
