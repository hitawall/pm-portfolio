import { PortableText as BasePortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import { cn } from "@/lib/utils";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed text-foreground-muted">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 text-xl font-semibold tracking-tight text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-lg font-semibold tracking-tight text-foreground">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-5 border-l-2 border-accent pl-4 italic text-foreground-muted">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px] text-accent">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-accent underline-offset-4 hover:underline"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 list-disc space-y-1.5 pl-5 text-foreground-muted">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 list-decimal space-y-1.5 pl-5 text-foreground-muted">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};

interface Props {
  value: unknown[];
  className?: string;
}

export function PortableText({ value, className }: Props) {
  return (
    <div className={cn("text-[15px]", className)}>
      <BasePortableText value={value as any} components={components} />
    </div>
  );
}
