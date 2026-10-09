import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Photo } from "@/components/ui/photo";
import { Pill } from "@/components/ui/pill";
import { Eyebrow } from "@/components/ui/typography";
import { doctor, photos } from "@/content/site";

export function DoctorSection() {
  return (
    <section id="doctor" className="section-y">
      <div className="wrap grid grid-cols-[.9fr_1.1fr] items-center gap-20 max-lg:grid-cols-1">
        <div className="relative isolate max-lg:max-w-[440px]">
          <Photo {...photos.doctorFeature} className="aspect-[4/5] rounded-arch-lg" />
          <div aria-hidden="true" className="absolute inset-[18px_-18px_-18px_18px] z-[-1] rounded-arch-lg border-2 border-accent max-md:inset-[12px_-8px_-12px_8px]" />
        </div>
        <div>
          <Eyebrow>Meet your dentist</Eyebrow>
          <h2 className="mb-[18px] text-h2">Your smile is cared for by Dr. Archana.</h2>
          <p className="mb-3.5 text-muted">{doctor.biography[0]}</p>
          <p className="mb-3.5 text-muted">{doctor.biography[1]}</p>
          <div className="mt-6 mb-[30px] flex flex-wrap gap-2">
            <Pill size="sm" icon="grad">MDS Periodontics</Pill>
            <Pill size="sm" icon="grad">BDS</Pill>
            <Pill size="sm" icon="badge">Reg. {doctor.registration}</Pill>
          </div>
          <ButtonLink variant="accent" href="/about">
            Read Dr. Archana&apos;s story <Icon name="arrow" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
