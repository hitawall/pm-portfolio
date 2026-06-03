import { PortableText as BasePortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import { cn } from "@/lib/utils";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 font-serif text-base leading-[1.85] text-foreground">{children}</p>
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
      <blockquote className="mb-6 border-l-2 border-border-strong pl-5 font-serif text-base leading-[1.85] italic text-foreground-muted">
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
      <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px] text-foreground">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="underline underline-offset-4 hover:text-foreground-muted"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-5 font-serif text-base leading-[1.85] text-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-5 font-serif text-base leading-[1.85] text-foreground">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-[1.85]">{children}</li>,
    number: ({ children }) => <li className="leading-[1.85]">{children}</li>,
  },
};

interface Props {
  value: unknown[];
  className?: string;
}

export function PortableText({ value, className }: Props) {
  return (
    <div className={cn("text-[15px]", className)}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <BasePortableText value={value as any} components={components} />
    </div>
  );
}
