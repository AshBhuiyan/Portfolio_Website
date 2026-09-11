"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "./Button";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

const inquiryTypes = [
  "Internship / job opportunity",
  "Product / design collaboration",
  "Music / private access inquiry",
  "Something else",
];

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const inputClass =
  "w-full rounded-[0.875rem] border border-border/[var(--border-alpha)] bg-surface px-4 py-3 text-sm text-foreground transition-[border-color,box-shadow] duration-200 placeholder:text-foreground/60 focus:border-brand/60 focus:outline-none focus:ring-[3px] focus:ring-brand/15 aria-[invalid=true]:border-red-500/70";

type Status = "idle" | "loading" | "success" | "error";

type FieldErrors = {
  name?: string;
  email?: string;
  inquiry?: string;
  message?: string;
};

function buildMailto(data: {
  name: string;
  email: string;
  inquiry: string;
  message: string;
}) {
  const subject = encodeURIComponent(
    data.inquiry
      ? `Portfolio inquiry — ${data.inquiry}`
      : "Portfolio inquiry — Ash Bhuiyan",
  );
  const body = encodeURIComponent(
    [
      data.message,
      "",
      "—",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.inquiry ? `About: ${data.inquiry}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
}

function validate(values: {
  name: string;
  email: string;
  inquiry: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name) errors.name = "Please enter your name.";
  if (!values.email) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.inquiry) errors.inquiry = "Please select an inquiry type.";
  if (!values.message) errors.message = "Please enter a message.";
  return errors;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const values = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      inquiry: String(fd.get("inquiry") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    if (!FORMSPREE_ID) {
      window.location.href = buildMailto(values);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const loading = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-border/[var(--border-alpha)] bg-surface p-6 shadow-card sm:p-8 dark:border-border/[var(--border-alpha)]"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          htmlFor="name"
          error={errors.name}
          errorId="name-error"
        >
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={inputClass}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Field>
        <Field
          label="Email"
          htmlFor="email"
          error={errors.email}
          errorId="email-error"
        >
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={inputClass}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          label="What's this about?"
          htmlFor="inquiry"
          error={errors.inquiry}
          errorId="inquiry-error"
        >
          <select
            id="inquiry"
            name="inquiry"
            className={inputClass}
            defaultValue=""
            required
            aria-invalid={errors.inquiry ? true : undefined}
            aria-describedby={errors.inquiry ? "inquiry-error" : undefined}
          >
            <option value="" disabled>
              Select an inquiry type
            </option>
            {inquiryTypes.map((type) => (
              <option key={type} value={type} className="bg-surface">
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field
          label="Message"
          htmlFor="message"
          error={errors.message}
          errorId="message-error"
        >
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="A few lines about what you have in mind…"
            className={cn(inputClass, "resize-none")}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {FORMSPREE_ID ? "Send message" : "Open in email"}
            </>
          )}
        </Button>
        <p className="text-xs text-foreground/65">
          {FORMSPREE_ID ? (
            <>
              Prefer email? Reach me at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-brand hover:underline"
              >
                {siteConfig.email}
              </a>
              .
            </>
          ) : (
            <>
              Submitting opens your mail client with this message prefilled.
              Prefer to write directly?{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-brand hover:underline"
              >
                {siteConfig.email}
              </a>
              .
            </>
          )}
        </p>
      </div>

      <div
        className="mt-5 min-h-[1.25rem]"
        aria-live="polite"
        aria-atomic="true"
      >
        {status === "success" && (
          <p className="inline-flex items-center gap-2 rounded-xl border border-teal/25 bg-teal/[0.08] px-4 py-3 text-sm text-foreground/80">
            <CheckCircle2 className="h-4 w-4 text-brand" aria-hidden />
            Thanks — your message is on its way. I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/[0.08] px-4 py-3 text-sm text-foreground/80">
            <AlertCircle className="h-4 w-4 text-red-500" aria-hidden />
            Something went wrong sending your message. Please email me directly
            at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-brand hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
  error,
  errorId,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  error?: string;
  errorId: string;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-foreground/75"
      >
        {label}
      </label>
      {children}
      <p
        id={errorId}
        role={error ? "alert" : undefined}
        className={cn(
          "mt-1.5 text-xs text-red-600 dark:text-red-400",
          error ? "visible" : "invisible",
        )}
      >
        {error ?? "\u00a0"}
      </p>
    </div>
  );
}
