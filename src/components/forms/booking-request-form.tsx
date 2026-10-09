"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { clinic, hours, treatments } from "@/content/site";

const fieldClass = "min-h-12 rounded-md border border-line bg-bg px-4 font-body text-[16px] font-normal outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";
const weekdayHours = hours.find((item) => item.day.includes("Monday"));
const sundayHours = hours.find((item) => item.day === "Sunday");
const preferredWindows = [
  ...(weekdayHours?.time.split(" & ").map((window) => ({
    label: `${weekdayHours.day} · ${window}`,
    value: `${weekdayHours.day}: ${window}`,
  })) ?? []),
  ...(sundayHours ? [{ label: `${sundayHours.day} · ${sundayHours.time}`, value: `${sundayHours.day}: ${sundayHours.time}` }] : []),
];

export function BookingRequestForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          date: formData.get("date"),
          hours: formData.get("hours"),
          treatment: formData.get("treatment"),
          note: formData.get("note"),
          website: formData.get("website"),
        }),
      });
      const result = await response.json().catch(() => null) as { error?: string } | null;

      if (!response.ok) throw new Error(result?.error || "We could not send your request. Please try again.");
      setStatus("success");
      setStatusMessage("Your request was accepted by Resend for delivery to the clinic. This is not a confirmed appointment, and no slot has been reserved.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "We could not send your request. Please contact the clinic directly.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid gap-5 rounded-xl border border-line bg-surface p-8 max-md:p-6">
        <input aria-hidden="true" autoComplete="off" className="absolute -left-[10000px] h-px w-px" name="website" tabIndex={-1} type="text" />
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <label className="grid gap-1.5 text-[14px] font-bold">
            <span>Your name <span className="text-[#c62828]" aria-hidden="true">*</span></span>
            <input suppressHydrationWarning name="name" autoComplete="name" required className={fieldClass} />
          </label>
          <label className="grid gap-1.5 text-[14px] font-bold">
            <span>Phone number <span className="text-[#c62828]" aria-hidden="true">*</span></span>
            <input suppressHydrationWarning name="phone" type="tel" autoComplete="tel" required className={fieldClass} />
          </label>
        </div>

        <label className="grid gap-1.5 text-[14px] font-bold">
          Email (optional)
          <input suppressHydrationWarning name="email" type="email" autoComplete="email" className={fieldClass} />
        </label>

        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <label className="grid gap-1.5 text-[14px] font-bold">
            <span>Preferred date <span className="text-[#c62828]" aria-hidden="true">*</span></span>
            <input suppressHydrationWarning name="date" type="date" required className={fieldClass} />
          </label>
          <label className="grid gap-1.5 text-[14px] font-bold">
            <span>Preferred clinic hours <span className="text-[#c62828]" aria-hidden="true">*</span></span>
            <select suppressHydrationWarning name="hours" required defaultValue="" className={fieldClass}>
              <option value="" disabled>Select a time window</option>
              {preferredWindows.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
        </div>

        <label className="grid gap-1.5 text-[14px] font-bold">
          Treatment you&apos;re asking about (optional)
          <select suppressHydrationWarning name="treatment" defaultValue="" className={fieldClass}>
            <option value="">I&apos;m not sure yet</option>
            {treatments.map((treatment) => <option key={treatment.slug} value={treatment.name}>{treatment.name}</option>)}
          </select>
        </label>

        <label className="grid gap-1.5 text-[14px] font-bold">
          Note (optional)
          <textarea suppressHydrationWarning name="note" rows={4} className="resize-y rounded-md border border-line bg-bg px-4 py-3 font-body text-[16px] font-normal outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
        </label>

        <p className="text-[13px] text-muted">Submitting emails your request to the clinic through Resend. It does not reserve a slot or confirm an appointment. Please don&apos;t include detailed medical information.</p>
        <Button suppressHydrationWarning type="submit" disabled={status === "sending"} className="justify-center disabled:pointer-events-none disabled:opacity-60 sm:justify-self-start">
          {status === "sending" ? "Sending request…" : status === "success" ? "Send another request" : "Send appointment request"}
        </Button>
      </form>

      {status === "success" || status === "error" ? (
        <div className="mt-5 rounded-card border border-accent/30 bg-soft p-6" role="status" aria-live="polite">
          <h2 className="font-display text-[25px]">{status === "success" ? "Request submitted" : "Request not sent"}</h2>
          <p className="mt-2 text-muted">{statusMessage}</p>
          {status === "error" ? (
            <p className="mt-4 text-[13px] text-muted">
              Contact the clinic by <a className="font-bold text-primary underline" href={`mailto:${clinic.email}`}>email</a>, <a className="font-bold text-primary underline" href={clinic.phoneHref}>calling {clinic.phone}</a>, or <a className="font-bold text-primary underline" href={clinic.whatsapp} target="_blank" rel="noopener noreferrer"><Icon name="wa" className="mr-1" />WhatsApp</a>.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
