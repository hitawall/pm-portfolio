import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="small-caps text-foreground-muted">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="small-caps text-foreground-muted transition-colors duration-200 hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="small-caps text-foreground-muted transition-colors duration-200 hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="small-caps text-foreground-muted transition-colors duration-200 hover:text-accent"
            >
              Email
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
