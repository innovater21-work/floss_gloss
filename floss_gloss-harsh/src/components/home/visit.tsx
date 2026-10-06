import { ButtonLink } from "@/components/ui/button";
import { BookAppointmentButton } from "@/components/forms/kivi-booking-widget";
import { Icon, type IconName } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/typography";
import { clinic, hours } from "@/content/site";

const lines: [IconName, string][] = [
  ["pin", clinic.address],
  ["car", "On-site parking"],
  ["phone", clinic.phone],
  ["mail", clinic.email],
];

export function VisitSection() {
  return (
    <section id="visit" className="section-y pt-0!">
      <div className="wrap grid grid-cols-[1fr_1.2fr] gap-[22px] max-lg:grid-cols-1">
        <div className="rounded-xl border border-line bg-surface p-10 max-md:p-[26px]">
          <Eyebrow>Come say hello</Eyebrow>
          <h2 className="mb-[22px] text-h2-sm">Visit us in {clinic.area}</h2>
          <div className="mb-[26px] grid gap-1">
            {hours.map((hour) => (
              <div key={hour.day} className="flex justify-between gap-4 border-b border-dashed border-line py-3">
                <span className="text-muted">{hour.day}</span><b className="text-right">{hour.time}</b>
              </div>
            ))}
          </div>
          {lines.map(([name, text]) => (
            <div key={name} className="mb-3 flex items-start gap-3">
              <Icon name={name} className="mt-1 text-accent" />
              <span>{name === "phone" ? <a className="hover:text-primary" href={clinic.phoneHref}>{text}</a> : name === "mail" ? <a className="hover:text-primary" href={"mailto:" + clinic.email}>{text}</a> : text}</span>
            </div>
          ))}
          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href={clinic.directions} target="_blank" rel="noopener noreferrer">Get directions</ButtonLink>
            <BookAppointmentButton variant="outline" size="sm">Request an appointment</BookAppointmentButton>
          </div>
        </div>
        <div className="min-h-[440px] overflow-hidden rounded-xl border border-line">
          <iframe className="block h-full min-h-[440px] w-full border-0 saturate-[.85]" loading="lazy" title="Map to Floss & Gloss Dental Clinic" src={clinic.mapEmbed} />
        </div>
      </div>
    </section>
  );
}
