import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-8">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 text-sm text-foreground-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <div className="flex items-center gap-5">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-[120ms] hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-[120ms] hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="transition-colors duration-[120ms] hover:text-foreground"
            >
              Email
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
