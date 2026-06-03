import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { NavLinks } from "@/components/site/NavLinks";
import { MobileNav } from "@/components/site/MobileNav";
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
            <ThemeToggle />
            <MobileNav />
          </div>
        </nav>
      </Container>
    </header>
  );
}
