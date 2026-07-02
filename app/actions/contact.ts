"use server";

import { Resend } from "resend";
import { siteConfig } from "@/lib/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function sendContactEmail(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = (formData.get("name") as string | null)?.trim();
  const email = (formData.get("email") as string | null)?.trim();
  const company = (formData.get("company") as string | null)?.trim();
  const message = (formData.get("message") as string | null)?.trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Name, email, and message are required." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (message.length < 10) {
    return { status: "error", message: "Message is too short." };
  }

  if (!process.env.RESEND_API_KEY) {
    return { status: "error", message: "Email service is not configured." };
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <hello@arorashubham.com>",
      to: siteConfig.email,
      replyTo: email,
      subject: `Portfolio contact${company ? ` — ${company}` : ""}: ${name}`,
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
          <p style="margin:0 0 4px"><strong>${name}</strong> &lt;${email}&gt;</p>
          ${company ? `<p style="margin:0 0 16px;color:#666">via ${company}</p>` : '<p style="margin:0 0 16px"></p>'}
          <hr style="border:none;border-top:1px solid #e4e4e7;margin:0 0 20px"/>
          <p style="white-space:pre-wrap;line-height:1.6">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          <hr style="border:none;border-top:1px solid #e4e4e7;margin:20px 0"/>
          <p style="font-size:12px;color:#999">Sent via arorashubham.com/contact</p>
        </div>
      `,
    });
    return { status: "success" };
  } catch {
    return { status: "error", message: "Failed to send message. Please try again." };
  }
}
