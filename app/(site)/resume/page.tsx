import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Bezel } from "@/components/ui/Bezel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/config";
import { getSiteSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Shubham Arora, engineer and builder with 5 years of shipping at JPMC, Amazon, Blink Health, and Nutanix.",
  alternates: { canonical: "/resume" },
};

/** Converts a Google Drive share URL to an embeddable preview URL. */
function toEmbedUrl(url: string): string {
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  return url;
}

export default async function Resume() {
  const { resumeUrl } = await getSiteSettings();
  const embedSrc = resumeUrl ? toEmbedUrl(resumeUrl) : "/resume.pdf";
  const downloadHref = resumeUrl ?? "/resume.pdf";

  return (
    <main
      id="main-content"
      className="flex-1"
    >
      <Container size="lg" className="py-10 sm:py-14">

        <ScrollReveal className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center print:hidden">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              Resume
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">
              {siteConfig.name}
            </h1>
          </div>
          <Button as="a" href={downloadHref} download={!resumeUrl} target={resumeUrl ? "_blank" : undefined} rel={resumeUrl ? "noopener noreferrer" : undefined}>
            <Download size={14} /> Download PDF
          </Button>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="print:hidden">
          <Bezel className="overflow-hidden">
            <iframe
              src={embedSrc}
              className="h-[82vh] w-full"
              title={`${siteConfig.name} · Resume`}
            />
          </Bezel>
        </ScrollReveal>

        <p className="mt-4 text-center text-sm text-foreground-muted print:hidden">
          PDF not rendering?{" "}
          <a
            href={downloadHref}
            download={!resumeUrl}
            target={resumeUrl ? "_blank" : undefined}
            rel={resumeUrl ? "noopener noreferrer" : undefined}
            className="text-accent underline-offset-4 hover:underline"
          >
            Download directly.
          </a>
        </p>

        {/* Print-only fallback — iframes don't print reliably */}
        <div className="hidden print:block text-sm text-foreground-muted text-center py-8">
          <p>To view this resume, visit:</p>
          <p className="mt-1 font-mono text-foreground">{downloadHref}</p>
        </div>

      </Container>
    </main>
  );
}
