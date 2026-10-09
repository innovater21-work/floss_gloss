"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { clinic } from "@/content/site";

export function ContactForm({ subject = "Website enquiry", compact = false }: { subject?: string; compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          subject: data.get("subject") ?? subject,
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      const result = await response.json().catch(() => null) as { error?: string } | null;

      if (!response.ok) throw new Error(result?.error || "We could not send your message. Please try again.");
      setStatus("success");
      setStatusMessage("Your message was accepted by Resend for delivery to the clinic. The clinic can reply using the email address you provided.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "We could not send your message. Please contact the clinic directly.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onReset={() => { setStatus("idle"); setStatusMessage(""); }}
      className={compact ? "grid gap-4" : "grid gap-5"}
    >
      {/* Browser extensions may annotate form controls before React hydrates them. */}
      <input aria-hidden="true" autoComplete="off" className="absolute -left-[10000px] h-px w-px" name="website" tabIndex={-1} type="text" />
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <label className="grid gap-1.5 text-[14px] font-bold">
          <span>Your name <span className="text-[#c62828]" aria-hidden="true">*</span></span>
          <input suppressHydrationWarning name="name" autoComplete="name" required className="min-h-12 rounded-md border border-line bg-bg px-4 font-body text-[16px] font-normal outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
        </label>
        <label className="grid gap-1.5 text-[14px] font-bold">
          <span>Email <span className="text-[#c62828]" aria-hidden="true">*</span></span>
          <input suppressHydrationWarning name="email" type="email" autoComplete="email" required className="min-h-12 rounded-md border border-line bg-bg px-4 font-body text-[16px] font-normal outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
        </label>
      </div>
      <label className="grid gap-1.5 text-[14px] font-bold">
        Phone (optional)
        <input suppressHydrationWarning name="phone" type="tel" autoComplete="tel" className="min-h-12 rounded-md border border-line bg-bg px-4 font-body text-[16px] font-normal outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
      </label>
      <label className="grid gap-1.5 text-[14px] font-bold">
        <span>Subject <span className="text-[#c62828]" aria-hidden="true">*</span></span>
        <input suppressHydrationWarning name="subject" defaultValue={subject} required className="min-h-12 rounded-md border border-line bg-bg px-4 font-body text-[16px] font-normal outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
      </label>
      <label className="grid gap-1.5 text-[14px] font-bold">
        <span>How can we help? <span className="text-[#c62828]" aria-hidden="true">*</span></span>
        <textarea suppressHydrationWarning name="message" required rows={compact ? 3 : 5} className="resize-y rounded-md border border-line bg-bg px-4 py-3 font-body text-[16px] font-normal outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
      </label>
      <p className="text-[13px] text-muted">Submitting sends your message to the clinic through Resend. This website does not store submissions. Please don&apos;t include detailed medical information.</p>
      <div className="flex flex-wrap gap-3">
        <Button suppressHydrationWarning type="submit" disabled={status === "sending"} className="justify-center disabled:pointer-events-none disabled:opacity-60">
          {status === "sending" ? "Sending…" : status === "success" ? "Send another message" : "Send to clinic"}
        </Button>
        <Button suppressHydrationWarning type="reset" variant="outline" disabled={status === "sending"}>Reset</Button>
      </div>
      {status === "success" || status === "error" ? (
        <div className="rounded-card border border-accent/30 bg-soft p-5" role="status" aria-live="polite">
          <h3 className="font-display text-[22px]">{status === "success" ? "Message submitted" : "Message not sent"}</h3>
          <p className="mt-2 text-[14px] text-muted">{statusMessage}</p>
          {status === "error" ? (
            <p className="mt-4 text-[13px] text-muted">
              You can <a className="font-bold text-primary underline" href={`mailto:${clinic.email}`}>email the clinic</a>, <a className="font-bold text-primary underline" href={clinic.phoneHref}>call {clinic.phone}</a>, or <a className="font-bold text-primary underline" href={clinic.whatsapp} target="_blank" rel="noopener noreferrer"><Icon name="wa" className="mr-1" />WhatsApp the clinic</a>.
            </p>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
