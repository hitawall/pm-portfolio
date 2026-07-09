import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { getBaseUrl } from "@/lib/config";

/**
 * Cron-triggered revalidation (GH-140). ISR alone is traffic-triggered and
 * serves stale-while-revalidate, so a low-traffic page can sit days-stale.
 * Vercel Cron (daily) and a GitHub Actions schedule (hourly) hit this route
 * so the homepage GitHub stats refresh with zero visits.
 *
 * Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}` automatically;
 * the GitHub Action sends the same header from its repo secret.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/");

  // Warm the page so the regeneration cost is paid here, not by the next visitor.
  let warmed = false;
  try {
    const res = await fetch(getBaseUrl(), { cache: "no-store" });
    warmed = res.ok;
  } catch {
    // Best-effort — the purge above already guarantees the next visit is fresh.
  }

  return NextResponse.json({ revalidated: true, warmed, now: new Date().toISOString() });
}
