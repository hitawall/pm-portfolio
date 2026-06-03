"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`hidden text-sm transition-colors duration-[120ms] sm:block ${
            pathname === href || pathname.startsWith(href + "/")
              ? "font-semibold text-foreground"
              : "text-foreground-muted hover:text-foreground"
          }`}
        >
          {label}
        </Link>
      ))}
    </>
  );
}
