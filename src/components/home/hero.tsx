import { ButtonLink } from "@/components/ui/button";
import { BookAppointmentButton } from "@/components/forms/kivi-booking-widget";
import { Icon } from "@/components/ui/icon";
import { Photo } from "@/components/ui/photo";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/cn";
import { clinic, photos } from "@/content/site";

function Sticker({ className, big, children }: { className?: string; big: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "absolute z-[3] grid size-32 place-items-center rounded-full text-center text-[13px] leading-[1.25] font-extrabold shadow-sticker max-lg:size-[104px] max-lg:text-[11px]",
        className,
      )}
    >
      <div>
        <b className="block font-display text-[34px] leading-none font-normal max-lg:text-[26px]">{big}</b>
        {children}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative pt-12 text-center">
      <div className="wrap">
        <div className="mb-[26px] flex flex-wrap justify-center gap-2.5">
          <Pill icon="star">{clinic.rating} on Google</Pill>
          <Pill icon="users">Kids to grandparents</Pill>
          <Pill icon="shield">Hospital-grade hygiene</Pill>
        </div>

        <h1 className="mx-auto max-w-[980px] text-display">
          Dental care that feels like{" "}
          <span className="relative whitespace-nowrap text-accent">
            family
            <svg
              viewBox="0 0 200 12"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute right-0 bottom-[-.12em] left-0 h-[.3em] w-full fill-none stroke-accent [stroke-linecap:round] [stroke-width:3]"
            >
              <path d="M3 9c40-7 150-9 194-3" />
            </svg>
          </span>
          , not a clinic.
        </h1>

        <p className="mx-auto mt-6 mb-[34px] max-w-[620px] text-[19px] text-muted">
          Gentle, unhurried dentistry for every age — with a doctor who explains everything, and a clinic your kids
          won&apos;t dread visiting.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <BookAppointmentButton>
            <Icon name="cal" />
            Book your family&apos;s visit
          </BookAppointmentButton>
          <ButtonLink variant="outline" href={clinic.whatsapp}>
            <Icon name="wa" />
            Ask on WhatsApp
          </ButtonLink>
          <ButtonLink variant="outline" href="/#callback-form">Request a callback</ButtonLink>
        </div>

        <div className="relative mt-16 grid grid-cols-[1fr_1.25fr_1fr] items-end gap-[22px] max-md:mt-10 max-md:grid-cols-1">
          <Photo {...photos.clinic} sizes="30vw" className="aspect-[3/4] h-[78%] rounded-arch max-md:hidden" />
          <Photo {...photos.doctor} sizes="(max-width: 640px) 100vw, 40vw" priority className="aspect-[4/5] rounded-arch" />
          <Photo {...photos.treatment} sizes="30vw" className="aspect-[3/4] h-[78%] rounded-arch max-md:hidden" />
          <Sticker
            big={`${clinic.rating}★`}
            className="top-[6%] left-[27%] rotate-[-10deg] bg-accent text-on-accent max-md:top-auto max-md:bottom-6 max-md:left-0"
          >
            {clinic.reviewCount} Google
            <br />
            reviews
          </Sticker>
          <Sticker
            big={String(clinic.since)}
            className="top-[22%] right-[26%] rotate-[8deg] border-2 border-dashed border-line bg-surface text-primary max-md:top-3 max-md:right-0"
          >
            caring for
            <br />
            smiles since
          </Sticker>
        </div>
      </div>
    </section>
  );
}

