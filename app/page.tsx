import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";

export default function Home() {
  return (
    <main className="flex-1">
      <Container className="py-24 sm:py-32">
        {/* Hero */}
        <div className="max-w-2xl">
          <h1 className="gradient-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-foreground-muted">
            Engineer → Product Manager. Building at the intersection of
            technology and user needs.
          </p>
          <p className="mt-3 text-sm text-foreground-muted">
            5y: JPMC · Amazon · Blink Health · Nutanix
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as={Link} href="/work">
              View work <ArrowUpRight size={14} />
            </Button>
            <Button as={Link} href="/about" variant="ghost">
              About me
            </Button>
          </div>
        </div>

        {/* Selected work — populated in Phase 2 via Sanity */}
        <div className="mt-24 sm:mt-32">
          <p className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
            Selected work
          </p>
        </div>
      </Container>
    </main>
  );
}
