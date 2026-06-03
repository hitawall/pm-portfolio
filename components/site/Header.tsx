import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { NavLinks } from "@/components/site/NavLinks";
import { MobileNav } from "@/components/site/MobileNav";
import { CopyEmailIcon } from "@/components/ui/CopyEmailIcon";
import { siteConfig } from "@/lib/config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <Container>
        <nav className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-foreground transition-colors duration-[120ms] hover:text-foreground-muted"
          >
            {siteConfig.name}
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
