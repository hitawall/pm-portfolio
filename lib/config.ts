export const siteConfig = {
  name: "Shubham Arora",
  title: "Shubham Arora · Backend Engineer · GenAI Builder",
  description:
    "Backend engineer, 5 years at JPMC, Amazon, Blink Health, Nutanix. Now building LLM systems and agent architectures. Open to senior engineering and AI/ML roles.",
  github: "https://github.com/hitawall",
  githubUsername: "hitawall",
  linkedin: "https://in.linkedin.com/in/shubham-arora-se/",
  email: "shubhaminkk@gmail.com",
} as const;

// Shown when getGitHubStats() returns null (missing token / API failure)
export const githubFallbackStats = {
  contributions: "380+",
  lastCommit: "–",
} as const;

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
