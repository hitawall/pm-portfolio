import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Shubham Arora — backend engineer and GenAI builder open to senior engineering and AI/ML roles.",
};

export default function Contact() {
  return (
    <main id="main-content" className="flex-1 [background:radial-gradient(ellipse_70%_30%_at_50%_0%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent)]">
      <Container size="sm" className="py-20 sm:py-28">
        <ScrollReveal className="mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Get in touch
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s talk
          </h1>
          <p className="mt-4 text-base text-foreground-muted">
            Open to senior backend and AI/ML engineering roles. Drop me a message and I&apos;ll get back to you promptly.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ContactForm />
        </ScrollReveal>
      </Container>
    </main>
  );
}
