import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Resume — ${siteConfig.name}`,
  description:
    "Resume of Shubham Arora — Product Manager with 5 years of software engineering experience at JPMC, Amazon, Blink Health, and Nutanix.",
};

export default function Resume() {
  return (
    <main
      id="main-content"
      className="flex-1 [background:radial-gradient(ellipse_70%_30%_at_50%_0%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent)]"
    >
      <Container size="lg" className="py-10 sm:py-14">

        <ScrollReveal className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              Resume
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">
              {siteConfig.name}
            </h1>
          </div>
          <Button as="a" href="/resume.pdf" download>
            <Download size={14} /> Download PDF
          </Button>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <iframe
            src="/resume.pdf"
            className="h-[82vh] w-full"
            title={`${siteConfig.name} — Resume`}
          />
        </ScrollReveal>

        <p className="mt-4 text-center text-sm text-foreground-muted">
          PDF not rendering?{" "}
          <a
            href="/resume.pdf"
            download
            className="text-accent underline-offset-4 hover:underline"
          >
            Download directly.
          </a>
        </p>

      </Container>
    </main>
  );
}
