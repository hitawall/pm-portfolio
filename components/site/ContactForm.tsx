"use client";

import { useActionState, useRef } from "react";
import { sendContactEmail, type ContactState } from "@/app/actions/contact";
import { cn } from "@/lib/utils";

const INITIAL: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-lg border border-border bg-surface/60 px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted backdrop-blur-sm transition-colors duration-150 focus:border-accent focus:outline-none";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactEmail, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-border bg-surface/60 p-8 text-center backdrop-blur-sm">
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
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="space-y-4">
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
          placeholder="Tell me about the role or opportunity…"
          className={cn(inputClass, "resize-none")}
        />
      </div>

      {state.status === "error" && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "inline-flex h-10 w-full items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground shadow-[0_4px_16px_var(--accent-glow)] transition-all duration-200",
          "hover:bg-accent-hover hover:shadow-[0_6px_20px_var(--accent-glow)]",
          "disabled:cursor-not-allowed disabled:opacity-60"
        )}
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
