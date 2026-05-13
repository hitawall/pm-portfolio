import { PortableText as BasePortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import { cn } from "@/lib/utils";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-base leading-[1.75] text-foreground">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-12 font-serif text-3xl text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-10 font-serif text-2xl text-foreground">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative mb-6 py-2 pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-accent">
        <p className="font-serif italic text-lg text-foreground-muted">{children}</p>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="font-serif italic">{children}</em>
    ),
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-accent underline decoration-accent underline-offset-4 transition-colors duration-150 hover:text-foreground"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-foreground">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-foreground">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-[1.75]">{children}</li>,
    number: ({ children }) => <li className="leading-[1.75]">{children}</li>,
  },
};

interface Props {
  value: unknown[];
  className?: string;
}

export function PortableText({ value, className }: Props) {
  return (
    <div className={cn("text-base", className)}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <BasePortableText value={value as any} components={components} />
    </div>
  );
}
