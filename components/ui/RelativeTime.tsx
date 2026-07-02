"use client";
import { formatRelativeTime } from "@/lib/github";

export function RelativeTime({ isoDate }: { isoDate: string }) {
  // suppressHydrationWarning: intentional — server renders at ISR time,
  // client re-computes against real Date.now() on hydration.
  return <span suppressHydrationWarning>{formatRelativeTime(isoDate)}</span>;
}
