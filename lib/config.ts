export const siteConfig = {
  name: "Shubham Arora",
  title: "Shubham Arora — Engineer to PM",
  description:
    "Product thinker with an engineering foundation. 5 years building at JPMC, Amazon, Blink Health, and Nutanix.",
  github: "https://github.com/hitawall",
  linkedin: "https://linkedin.com/in/shubhamarora", // TODO: verify URL
  email: "shubhaminkk@gmail.com",
} as const;

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
