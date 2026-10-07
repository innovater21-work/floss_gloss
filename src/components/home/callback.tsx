import { ContactForm } from "@/components/forms/contact-form";
import { Eyebrow } from "@/components/ui/typography";
import { clinic } from "@/content/site";

export function CallbackSection() {
  return (
    <section id="callback-form" className="section-y scroll-mt-24 pt-0!">
      <div className="wrap grid grid-cols-[.9fr_1.1fr] gap-12 rounded-band bg-bg-alt p-10 max-lg:grid-cols-1 max-md:rounded-card max-md:p-6">
        <div>
          <Eyebrow>We can call you back</Eyebrow>
          <h2 className="text-h2">Tell us what you need.</h2>
          <p className="mt-4 text-muted">Share a few details and the clinic will receive your callback request by email.</p>
          <p className="mt-5 text-[14px] text-muted">Prefer to speak directly? <a className="font-bold text-primary underline underline-offset-2" href={clinic.phoneHref}>Call {clinic.phone}</a>.</p>
        </div>
        <ContactForm subject="Please call me back" compact />
      </div>
    </section>
  );
}
