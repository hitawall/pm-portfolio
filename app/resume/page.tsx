import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RuleDivider } from "@/components/ui/RuleDivider";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Resume — ${siteConfig.name}`,
  description:
    "Resume of Shubham Arora — Product Manager with 5 years of software engineering experience at JPMC, Amazon, Blink Health, and Nutanix.",
};

export default function Resume() {
  return (
    <main className="flex-1">
      <Container size="lg" className="py-16 sm:py-24">

        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="small-caps text-foreground-muted">Resume</p>
            <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">
              {siteConfig.name}
            </h1>
            <p className="mt-3 text-foreground-muted">
              Product Manager · 5 years engineering at JPMC, Amazon, Blink Health, Nutanix
            </p>
          </div>
          <Button as="a" href="/resume.pdf" download>
            <Download size={14} /> Download PDF
          </Button>
        </div>

        <RuleDivider className="mb-8" />

        {/* Viewer */}
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <iframe
            src="/resume.pdf"
            className="h-[82vh] w-full"
            title={`${siteConfig.name} — Resume`}
          />
        </div>

        {/* Fallback */}
        <p className="mt-5 text-center text-sm text-foreground-muted">
          PDF not rendering?{" "}
          <a
            href="/resume.pdf"
            download
            className="text-accent underline decoration-accent underline-offset-4 transition-colors duration-150 hover:text-foreground"
          >
            Download directly.
          </a>
        </p>

      </Container>
    </main>
  );
}
