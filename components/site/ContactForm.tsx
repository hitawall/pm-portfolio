"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactEmail, type ContactState } from "@/app/actions/contact";
import { Bezel } from "@/components/ui/Bezel";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const INITIAL: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-lg border border-border bg-background/40 px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted transition-colors duration-150 focus:border-accent focus:outline-none";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactEmail, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);
  const renderedAtRef = useRef<HTMLInputElement>(null);

  // Set on mount (not SSR'd) so a bot submitting straight from fetched HTML
  // has no timestamp to spoof — it lands too early instead.
  useEffect(() => {
    if (renderedAtRef.current) {
      renderedAtRef.current.value = String(Date.now());
    }
  }, []);

  if (state.status === "success") {
    return (
      <Bezel className="p-8 text-center">
        <p className="text-2xl">✓</p>
        <p className="mt-3 font-semibold text-foreground">Message sent</p>
        <p className="mt-1 text-sm text-foreground-muted">
          I&apos;ll get back to you as soon as I can.
        </p>
        <button
          onClick={() => formRef.current?.reset()}
          className="mt-5 text-sm text-accent underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </Bezel>
    );
  }

  return (
    <Bezel as="form" ref={formRef} action={action} className="space-y-4 p-6 sm:p-8">
      {/* Honeypot: hidden from sighted/keyboard users, blind form-fill bots still populate it. */}
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input ref={renderedAtRef} type="hidden" name="renderedAt" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Alex Johnson"
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="alex@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="company" className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
          Company / Role
        </label>
        <input
          id="company"
          name="company"
          type="text"
          maxLength={120}
          autoComplete="organization"
          placeholder="Acme Corp — Senior Recruiter"
          className={inputClass}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="Tell me about the role or opportunity…"
          className={cn(inputClass, "resize-none")}
        />
      </div>

      {state.status === "error" && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full justify-center">
        {pending ? "Sending…" : "Send message"}
      </Button>
    </Bezel>
  );
}
