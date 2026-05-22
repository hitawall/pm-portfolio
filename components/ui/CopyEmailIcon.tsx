"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function CopyEmailIcon() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
    } catch {
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

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email copied!" : `Copy email: ${siteConfig.email}`}
      title={copied ? "Copied!" : siteConfig.email}
      className="hidden items-center gap-1.5 rounded-md p-1.5 text-foreground-muted transition-colors duration-[120ms] hover:text-accent sm:flex"
    >
      {copied ? <Check size={15} className="text-accent" /> : <Mail size={15} />}
      {copied && (
        <span className="text-xs font-medium text-accent">Copied!</span>
      )}
    </button>
  );
}
