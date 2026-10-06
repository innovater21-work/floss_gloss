import type { Metadata } from "next";
import { BookingRequestForm } from "@/components/forms/booking-request-form";
import { BookAppointmentButton } from "@/components/forms/kivi-booking-widget";
import { Breadcrumbs, PageIntro } from "@/components/site/page-elements";
import { clinic, hours } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a Dental Appointment",
  description: "Book online with KiviHealth or send a separate appointment request to Floss & Gloss Dental Clinic in Shela, Ahmedabad.",
  alternates: { canonical: "/book-visit" },
};

export default function BookVisitPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Book a visit" }]} />
      <PageIntro
        eyebrow="Online or by request"
        title="Book a visit with the clinic."
        description="Choose an available appointment through KiviHealth. If no slot suits you, send a request for the clinic to review; that request is not a confirmed booking."
      />
      <section className="section-y pt-0!">
        <div className="wrap grid grid-cols-[.7fr_1.3fr] items-start gap-8 max-lg:grid-cols-1">
          <aside className="rounded-xl border border-line bg-bg-alt p-7 max-md:p-6">
            <h2 className="mb-4 font-display text-[26px]">Clinic hours</h2>
            <div className="grid gap-3">
              {hours.map((item) => (
                <div key={item.day} className="border-b border-dashed border-line pb-3">
                  <b className="block">{item.day}</b>
                  <span className="text-[14px] text-muted">{item.time}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[14px] text-muted">Sunday visits are by appointment. KiviHealth shows the online availability; call if no suitable slot appears.</p>
            <div className="mt-5 grid gap-2 text-[14px]">
              <a className="font-bold text-primary underline underline-offset-2" href={clinic.phoneHref}>Call {clinic.phone}</a>
              <a className="font-bold text-primary underline underline-offset-2" href={clinic.whatsapp} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
            </div>
          </aside>
          <div className="grid gap-6">
            <section className="rounded-xl border border-accent/30 bg-soft p-7 max-md:p-6" aria-labelledby="online-booking-title">
              <p className="mb-2 text-[12px] font-extrabold uppercase tracking-[.12em] text-accent">Live appointment booking</p>
              <h2 id="online-booking-title" className="font-display text-[28px] leading-tight">Book online with KiviHealth</h2>
              <p className="mt-3 text-[14px] text-muted">Continue to KiviHealth to see available dates and complete your booking. Your details are entered on the provider’s appointment page.</p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <BookAppointmentButton>Book with KiviHealth</BookAppointmentButton>
                <a className="font-extrabold text-primary underline underline-offset-2" href={clinic.kiviBookingUrl} target="_blank" rel="noopener noreferrer">Open booking page directly ↗</a>
              </div>
            </section>
            <section aria-labelledby="request-appointment-title">
              <h2 id="request-appointment-title" className="mb-2 font-display text-[27px]">Prefer the clinic to contact you?</h2>
              <p className="mb-4 text-[14px] text-muted">Use this email request if no online slot suits you. It does not reserve a time or confirm an appointment.</p>
              <BookingRequestForm />
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
