export const siteConfig = {
  name: "Saurabh Arora",
  title: "Saurabh Arora — Engineer to PM",
  description:
    "Product thinker with an engineering foundation. 5 years building at JPMC, Amazon, Blink Health, and Nutanix.",
  github: "https://github.com/hitawall",
  linkedin: "https://linkedin.com/in/saurabharora", // TODO: verify URL
  email: "sarora0rpm@gmail.com",
} as const;

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
