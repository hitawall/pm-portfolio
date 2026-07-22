"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="relative z-50 flex h-8 w-8 items-center justify-center"
      >
        <span
          className={cn(
            "absolute h-px w-4 bg-foreground transition-transform duration-300 ease-[var(--ease-spring)]",
            open ? "rotate-45" : "-translate-y-1"
          )}
        />
        <span
          className={cn(
            "absolute h-px w-4 bg-foreground transition-transform duration-300 ease-[var(--ease-spring)]",
            open ? "-rotate-45" : "translate-y-1"
          )}
        />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl transition-opacity duration-300 ease-[var(--ease-spring)]",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-2">
          {navLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
              className={cn(
                "font-display text-2xl transition-all duration-500 ease-[var(--ease-spring)]",
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                pathname === href || pathname.startsWith(href + "/")
                  ? "text-foreground"
                  : "text-foreground-muted"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
