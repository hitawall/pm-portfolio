import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export default function Home() {
  return (
    <main className="flex-1">
      <Container className="py-24 sm:py-32">
        <div className="max-w-xl">
          <h1 className="text-3xl font-semibold tracking-tight">
            {siteConfig.name}
          </h1>
          <p className="mt-4 text-foreground-muted">
            Engineer → Product. Building something here.
          </p>
        </div>
      </Container>
    </main>
  );
}
