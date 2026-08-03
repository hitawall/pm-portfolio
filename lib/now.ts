import type { NowEntry } from "@/sanity/lib/queries";

// Rendered when Sanity has no `now` documents — keep these truthful
export const NOW_FALLBACK: NowEntry[] = [
  {
    _id: "fallback-redesign",
    title: "Portfolio Redesign 2.0",
    status: "building",
    description:
      "Dark product-grade rebuild of this site, live GitHub hero, PM-grade case studies.",
    startedAt: "2026-06-10",
    current: true,
  },
  {
    _id: "fallback-evals",
    title: "AI product evals",
    status: "learning",
    description:
      "Evaluating LLM products beyond vibes: evals, rubrics, regression suites.",
    startedAt: "2026-05-20",
    current: true,
  },
];
