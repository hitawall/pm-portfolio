"use server";

import { checkBotId } from "botid/server";
import { Resend } from "resend";
import { headers } from "next/headers";
import { siteConfig } from "@/lib/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const GENERIC_ERROR: ContactState = {
  status: "error",
  message: "Failed to send message. Please try again.",
};

// Best-effort per-IP rate limit. Resets on cold start and isn't shared across
// regions/instances — it's a cheap extra layer, not a substitute for the
// platform-level rate limiting (Vercel Firewall) this should also get.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function countUrls(value: string): number {
  return (value.match(/https?:\/\/|www\./gi) ?? []).length;
}

export async function sendContactEmail(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: real users never see or fill this field.
  const honeypot = (formData.get("website") as string | null)?.trim();
  if (honeypot) {
    return { status: "success" };
  }

  // Time-trap: bots that fetch the HTML and POST immediately submit faster
  // than a human can read the form and type a message.
  const renderedAt = Number(formData.get("renderedAt"));
  if (!renderedAt || Date.now() - renderedAt < 1200) {
    return { status: "success" };
  }

  const name = (formData.get("name") as string | null)
    ?.trim()
    .replace(/[\r\n]+/g, " ")
    .slice(0, 100);
  const email = (formData.get("email") as string | null)?.trim().slice(0, 254);
  const company = (formData.get("company") as string | null)
    ?.trim()
    .replace(/[\r\n]+/g, " ")
    .slice(0, 120);
  const message = (formData.get("message") as string | null)?.trim().slice(0, 5000);

  if (!name || !email || !message) {
    return { status: "error", message: "Name, email, and message are required." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (message.length < 10) {
    return { status: "error", message: "Message is too short." };
  }
  if (countUrls(message) >= 3) {
    return { status: "error", message: "Please remove links and try again." };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "Too many submissions. Please try again later.",
    };
  }

  const { isBot } = await checkBotId();
  if (isBot) {
    return GENERIC_ERROR;
  }

  if (!process.env.RESEND_API_KEY) {
    return { status: "error", message: "Email service is not configured." };
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <hello@contact.arorashubham.com>",
      to: siteConfig.email,
      replyTo: email,
      subject: `Portfolio contact${company ? ` · ${company}` : ""}: ${name}`,
      text: [
        `From: ${name} <${email}>`,
        company ? `Company: ${company}` : null,
        "",
        message,
      ]
        .filter((l) => l !== null)
        .join("\n"),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
          <p style="margin:0 0 4px"><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
          ${company ? `<p style="margin:0 0 16px;color:#666">via ${escapeHtml(company)}</p>` : '<p style="margin:0 0 16px"></p>'}
          <hr style="border:none;border-top:1px solid #e4e4e7;margin:0 0 20px"/>
          <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</p>
          <hr style="border:none;border-top:1px solid #e4e4e7;margin:20px 0"/>
          <p style="font-size:12px;color:#999">Sent via arorashubham.com/contact</p>
        </div>
      `,
    });
    return { status: "success" };
  } catch {
    return GENERIC_ERROR;
  }
}
