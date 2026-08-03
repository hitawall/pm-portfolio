import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { NavLinks } from "@/components/site/NavLinks";
import { MobileNav } from "@/components/site/MobileNav";
import { CopyEmailIcon } from "@/components/ui/CopyEmailIcon";
import { ShuttlecockMark } from "@/components/ui/ShuttlecockMark";
import { siteConfig } from "@/lib/config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:pt-6">
      <Container size="lg">
        <nav className="flex h-14 items-center justify-between rounded-full border border-border bg-surface/70 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 font-display text-sm font-semibold tracking-tight text-foreground transition-colors duration-[120ms] hover:text-foreground-muted"
          >
            {siteConfig.name}
            <ShuttlecockMark className="h-3.5 w-3.5 text-accent" />
          </Link>
          <div className="flex items-center gap-6">
            <NavLinks />
            <CopyEmailIcon />
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hidden rounded-md p-1.5 text-foreground-muted transition-colors duration-[120ms] hover:text-foreground sm:block"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <ThemeToggle />
            <MobileNav />
          </div>
        </nav>
      </Container>
    </header>
  );
}
