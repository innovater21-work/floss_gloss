import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { BookAppointmentButton } from "@/components/forms/kivi-booking-widget";
import { Icon } from "@/components/ui/icon";
import { Breadcrumbs, PageIntro } from "@/components/site/page-elements";
import { clinic, hours } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact & Clinic Hours",
  description: "Find Floss & Gloss Dental Clinic in Shela, Ahmedabad. View opening hours, map directions and contact details.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <PageIntro eyebrow="Come say hello" title="We’re easy to find in Shela." description="Call or message the clinic, get directions, or send a note to ask about your visit." />
      <section className="section-y pt-0!">
        <div className="wrap grid grid-cols-[.85fr_1.15fr] gap-6 max-lg:grid-cols-1">
          <div className="rounded-xl border border-line bg-surface p-8 max-md:p-6">
            <h2 className="mb-5 font-display text-[29px]">Clinic details</h2>
            <div className="mb-6 grid gap-3">
              <p className="flex items-start gap-3"><Icon name="pin" className="mt-1 text-accent" /><span>{clinic.address}</span></p>
              <p className="flex items-center gap-3"><Icon name="phone" className="text-accent" /><a className="font-bold text-primary" href={clinic.phoneHref}>{clinic.phone}</a></p>
              <p className="flex items-center gap-3"><Icon name="mail" className="text-accent" /><a className="font-bold text-primary" href={"mailto:" + clinic.email}>{clinic.email}</a></p>
              <p className="flex items-center gap-3"><Icon name="wa" className="text-accent" /><a className="font-bold text-primary" href={clinic.whatsapp} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></p>
            </div>
            <h3 className="mb-2 font-display text-[22px]">Opening hours</h3>
            {hours.map((hour) => <div key={hour.day} className="flex justify-between gap-4 border-b border-dashed border-line py-3 text-[14px]"><span className="text-muted">{hour.day}</span><b className="text-right">{hour.time}</b></div>)}
            <p className="mt-4 text-[13px] text-muted">Sunday visits are by appointment. Please call ahead to confirm availability.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="inline-flex items-center rounded-pill bg-primary px-5 py-3 text-[14px] font-extrabold text-on-primary" href={clinic.directions} target="_blank" rel="noopener noreferrer">Get directions</a>
              <BookAppointmentButton variant="outline" size="sm">Request an appointment</BookAppointmentButton>
            </div>
          </div>
          <div className="min-h-[520px] overflow-hidden rounded-xl border border-line">
            <iframe className="block h-full min-h-[520px] w-full border-0 saturate-[.85]" title="Map to Floss & Gloss Dental Clinic" loading="lazy" src={clinic.mapEmbed} />
          </div>
        </div>
      </section>
      <section className="section-y bg-bg-alt">
        <div className="wrap grid grid-cols-[.8fr_1.2fr] gap-12 max-lg:grid-cols-1">
          <div>
            <h2 className="text-h2-sm">Send the clinic a note</h2>
            <p className="mt-3 text-muted">Submitting sends your message to the clinic by email. This website does not store form submissions.</p>
            <p className="mt-5 text-[14px] text-muted">Send an appointment request and the clinic will confirm availability directly. <Link className="font-bold text-primary underline underline-offset-2" href={clinic.bookingUrl}>Request a visit ↗</Link></p>
          </div>
          <ContactForm subject="Website contact request" />
        </div>
      </section>
    </main>
  );
}
