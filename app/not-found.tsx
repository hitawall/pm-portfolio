import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main className="flex-1">
      <Container className="py-24 sm:py-32">
        <div className="max-w-xl">
          <p className="font-mono text-sm text-foreground-muted">404</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Page not found
          </h1>
          <p className="mt-3 text-foreground-muted">
            This page doesn&apos;t exist yet — or maybe it used to.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex text-sm underline underline-offset-4 transition-colors duration-[120ms] hover:text-foreground-muted"
          >
            Go home
          </Link>
        </div>
      </Container>
    </main>
  );
}
