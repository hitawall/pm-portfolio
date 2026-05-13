import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
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
            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </header>
  );
}
