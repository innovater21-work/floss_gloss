import { ButtonLink } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/typography";
import { clinic } from "@/content/site";

const hours = [
  ["Monday – Saturday", "10–2 & 5–8"],
  ["Sunday", "By appointment, 10–2"],
];

const lines: [IconName, string][] = [
  ["pin", clinic.address],
  ["car", "Easy on-site parking"],
  ["phone", clinic.phone],
];

export function VisitSection() {
  return (
    <section id="visit" className="section-y pt-0!">
      <div className="wrap grid grid-cols-[1fr_1.2fr] gap-[22px] max-lg:grid-cols-1">
        <div className="rounded-xl border border-line bg-surface p-10 max-md:p-[26px]">
          <Eyebrow>Come say hello</Eyebrow>
          <h2 className="mb-[22px] text-h2-sm">Visit us in {clinic.area}</h2>
          <div className="mb-[26px] grid gap-1">
            {hours.map(([day, time]) => (
              <div key={day} className="flex justify-between border-b border-dashed border-line py-3">
                <span className="text-muted">{day}</span>
                <b>{time}</b>
              </div>
            ))}
          </div>
          {lines.map(([icon, text]) => (
            <div key={icon} className="mb-3 flex items-start gap-3">
              <Icon name={icon} className="mt-1 text-accent" />
              <span>{text}</span>
            </div>
          ))}
          <ButtonLink href={clinic.directions} target="_blank" rel="noopener" className="mt-3.5">
            Get directions
          </ButtonLink>
        </div>
        <div className="min-h-[440px] overflow-hidden rounded-xl border border-line">
          <iframe
            className="block h-full w-full border-0 saturate-[.85]"
            loading="lazy"
            title="Map to Floss & Gloss Dental Clinic"
            src={clinic.mapEmbed}
          />
        </div>
      </div>
    </section>
  );
}
