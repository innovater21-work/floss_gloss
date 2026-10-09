import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { BookAppointmentButton } from "@/components/forms/kivi-booking-widget";
import { Logo } from "@/components/ui/logo";
import { clinic } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-10 rounded-t-band bg-dark pt-16 pb-8 text-on-dark max-md:rounded-t-card max-md:pt-12">
      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-dark-15 pb-10">
          <div>
            <p className="mb-2 font-display text-[18px] text-accent-on-dark">Care that helps you feel more at ease.</p>
            <h2 className="max-w-[620px] text-h2-xl">Let&apos;s get your family smiling.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <BookAppointmentButton variant="accent">Book a visit</BookAppointmentButton>
            <ButtonLink variant="outline-on-dark" href={clinic.whatsapp} target="_blank" rel="noopener noreferrer"><Icon name="wa" /> WhatsApp us</ButtonLink>
            <ButtonLink variant="outline-on-dark" href="/callback">Request a callback</ButtonLink>
          </div>
        </div>
        <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-8 pt-9 text-[14px] text-dim max-md:grid-cols-1">
          <div>
            <Logo tone="dark" />
            <p className="mt-3.5 max-w-sm">Family dental care in {clinic.serviceAreas}.</p>
          </div>
          <div>
            <b className="mb-3 block text-on-dark">Contact</b>
            <a className="block hover:text-on-dark" href={clinic.phoneHref}>{clinic.phone}</a>
            <a className="mt-1 block hover:text-on-dark" href={"mailto:" + clinic.email}>{clinic.email}</a>
            <Link className="mt-2 inline-block hover:text-on-dark" href="/contact">Address and hours</Link>
          </div>
          <div>
            <b className="mb-3 block text-on-dark">Explore</b>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <Link className="hover:text-on-dark" href="/about">Our doctor</Link>
              <Link className="hover:text-on-dark" href="/certificates">Credentials</Link>
              <Link className="hover:text-on-dark" href="/treatments">Treatments</Link>
              <Link className="hover:text-on-dark" href="/gallery">Gallery</Link>
              <Link className="hover:text-on-dark" href="/faq">FAQs</Link>
              <Link className="hover:text-on-dark" href="/blog">Journal</Link>
            </div>
            <div className="mt-5 flex gap-4">
              <a className="font-bold text-on-dark underline underline-offset-4" href={clinic.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>
              <a className="font-bold text-on-dark underline underline-offset-4" href={clinic.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
            <p className="mt-5">© {new Date().getFullYear()} {clinic.name}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
