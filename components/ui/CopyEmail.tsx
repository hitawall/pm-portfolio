"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "link";
type Size = "sm" | "md";

interface Props {
  label?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function CopyEmail({ label, variant = "primary", size = "md", className }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
    } catch {
      // fallback: select a hidden input — handles insecure contexts
      const el = document.createElement("input");
      el.value = siteConfig.email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const displayLabel = label ?? siteConfig.email;

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email copied!" : `Copy email address: ${siteConfig.email}`}
      title={copied ? "Copied!" : siteConfig.email}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-[200ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        size === "sm" && "h-8 px-3 text-sm",
        size === "md" && "h-10 px-4 text-sm",
        variant === "primary" && "bg-accent text-accent-foreground hover:bg-accent-hover",
        variant === "ghost" && "border border-border text-foreground hover:bg-surface hover:border-border-strong",
        variant === "link" && "text-foreground-muted hover:text-accent",
        className,
      )}
    >
      {copied ? <Check size={14} /> : <Mail size={14} />}
      {copied ? "Copied!" : displayLabel}
    </button>
  );
}
