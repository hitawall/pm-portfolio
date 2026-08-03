import { cn } from "@/lib/utils";

interface Props {
  quote: string;
  author: string;
  context?: string;
  className?: string;
}

export function PullQuote({ quote, author, context, className }: Props) {
  return (
    <figure className={cn("relative border-l-2 border-accent/50 pl-6 sm:pl-8", className)}>
      <blockquote className="font-display text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 font-mono text-xs uppercase tracking-wide text-foreground-muted">
        {author}
        {context ? <span className="text-foreground-muted/60"> · {context}</span> : null}
      </figcaption>
    </figure>
  );
}
