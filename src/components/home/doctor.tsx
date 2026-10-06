import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Photo } from "@/components/ui/photo";
import { Pill } from "@/components/ui/pill";
import { Eyebrow } from "@/components/ui/typography";
import { photos } from "@/content/site";

export function DoctorSection() {
  return (
    <section id="doctor" className="section-y">
      <div className="wrap grid grid-cols-[.9fr_1.1fr] items-center gap-20 max-lg:grid-cols-1">
        <div className="relative isolate max-lg:max-w-[440px]">
          <Photo {...photos.doctor} className="aspect-[4/5] rounded-arch-lg" />
          <div
            aria-hidden="true"
            className="absolute inset-[18px_-18px_-18px_18px] z-[-1] rounded-arch-lg border-2 border-accent max-md:inset-[12px_-8px_-12px_8px]"
          />
        </div>
        <div>
          <Eyebrow>Meet your dentist</Eyebrow>
          <h2 className="mb-[18px] text-h2">Hi, I&apos;m Dr. Archana — let&apos;s look after your smile together.</h2>
          <p className="mb-3.5 text-muted">
            I&apos;ve been practising dentistry since 2007 and specialised in Periodontics — gums, bone and implants —
            during my Masters. What I love most is seeing a nervous patient leave relaxed and smiling.
          </p>
          <p className="mb-3.5 text-muted">
            Outside the clinic, I&apos;m a busy mum who loves the gym and exploring new places. I look forward to
            welcoming you and your family.
          </p>
          <div className="mt-6 mb-[30px] flex flex-wrap gap-2">
            <Pill size="sm" icon="grad">MDS Periodontics, Patiala</Pill>
            <Pill size="sm" icon="grad">BDS, Ludhiana</Pill>
            <Pill size="sm" icon="badge">Reg. A-10804</Pill>
          </div>
          <ButtonLink variant="accent" href="#">
            Read Dr. Archana&apos;s story <Icon name="arrow" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
