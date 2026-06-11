import { Container } from "@/components/ui/Container";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 py-8">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 text-sm text-foreground-muted sm:flex-row sm:items-center">
          <p className="font-mono text-xs">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
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
              href="/resume"
              className="transition-colors duration-[120ms] hover:text-foreground"
            >
              Resume
            </a>
            <CopyEmail label="Email" variant="link" size="sm" className="h-auto p-0 text-sm font-normal" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
