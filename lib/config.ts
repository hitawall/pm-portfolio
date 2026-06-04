export const siteConfig = {
  name: "Shubham Arora",
  title: "Shubham Arora — Builder · Engineer · Product Thinker",
  description:
    "Builder with product depth. 5 years shipping at scale across fintech, health, and cloud infrastructure. Engineering-led PM making an impact.",
  github: "https://github.com/hitawall",
  linkedin: "https://in.linkedin.com/in/shubham-arora-se/",
  email: "shubhaminkk@gmail.com",
} as const;

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
