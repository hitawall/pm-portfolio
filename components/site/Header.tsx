import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { CopyEmailIcon } from "@/components/ui/CopyEmailIcon";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <Container>
        <nav className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium tracking-tight text-foreground transition-colors duration-[120ms] hover:text-foreground-muted"
          >
            {siteConfig.name}
          </Link>
          <div className="flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hidden rounded-md px-3 py-1.5 text-sm text-foreground-muted transition-colors duration-[120ms] hover:text-accent sm:block"
              >
                {label}
              </Link>
            ))}
            <CopyEmailIcon />
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hidden rounded-md p-1.5 text-foreground-muted transition-colors duration-[120ms] hover:text-accent sm:block"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </header>
  );
}
