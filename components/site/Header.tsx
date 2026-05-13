import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <Container>
        <nav className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="font-serif text-lg text-foreground transition-colors duration-200 hover:text-accent"
          >
            {siteConfig.name}
          </Link>
          <div className="flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="small-caps hidden text-foreground-muted transition-colors duration-200 hover:text-accent sm:block"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </Container>
    </header>
  );
}
