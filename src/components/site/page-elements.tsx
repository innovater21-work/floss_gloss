import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { BookAppointmentButton } from "@/components/forms/kivi-booking-widget";
import { Eyebrow } from "@/components/ui/typography";
import { clinic } from "@/content/site";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="wrap pt-6 text-[13px] text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link className="hover:text-primary" href="/">Home</Link></li>
        {items.map((item, index) => (
          <li className="flex items-center gap-2" key={item.label}>
            <span aria-hidden="true">/</span>
            {item.href && index < items.length - 1 ? (
              <Link className="hover:text-primary" href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page" className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <header className="wrap pt-10 pb-12 max-md:pt-7 max-md:pb-8">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="max-w-[900px] text-display">{title}</h1>
      {description ? <p className="mt-5 max-w-[720px] text-[19px] text-muted">{description}</p> : null}
    </header>
  );
}

export function ClinicCTA({
  title = "A question about your dental care?",
  text = "Talk through your concerns with our team and decide on a comfortable next step.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="wrap py-10">
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-band bg-soft px-10 py-9 max-md:rounded-card max-md:px-6 max-md:py-7">
        <div className="max-w-[620px]">
          <Eyebrow>We&apos;re here to help</Eyebrow>
          <h2 className="text-h2-sm">{title}</h2>
          <p className="mt-2 text-muted">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <BookAppointmentButton>Book a visit</BookAppointmentButton>
          <ButtonLink variant="outline" href={clinic.phoneHref}>Call the clinic</ButtonLink>
          <ButtonLink variant="outline" href="/callback">Request a callback</ButtonLink>
        </div>
      </div>
    </section>
  );
}
