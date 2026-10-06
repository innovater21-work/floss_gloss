import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { Pill } from "@/components/ui/pill";
import { Breadcrumbs, ClinicCTA, PageIntro } from "@/components/site/page-elements";
import { AboutValuesTabs } from "@/components/site/about-values-tabs";
import { doctor, photos, policyPhotos } from "@/content/site";

export const metadata: Metadata = {
  title: "About Dr. Archana Mal",
  description: "Meet Dr. Archana Mal, BDS, MDS Periodontics, at Floss & Gloss Dental Clinic in Shela, Ahmedabad.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "About Dr. Archana" }]} />
      <PageIntro eyebrow="Meet your dentist" title="A little more at ease, a little more smile." description="Get to know Dr. Archana Mal and the care philosophy behind Floss & Gloss." />
      <section className="section-y pt-0!">
        <div className="wrap grid grid-cols-[.85fr_1.15fr] items-start gap-16 max-lg:grid-cols-1">
          <div className="relative isolate max-w-[460px]">
            <Photo {...photos.doctor} className="aspect-[4/5] rounded-arch-lg" />
            <div aria-hidden="true" className="absolute inset-[18px_-18px_-18px_18px] z-[-1] rounded-arch-lg border-2 border-accent" />
          </div>
          <div>
            <p className="mb-5 text-[19px] text-muted">{doctor.title} · Reg. No. {doctor.registration}</p>
            {doctor.biography.map((paragraph) => <p key={paragraph} className="mb-5 text-muted">{paragraph}</p>)}
            <p className="mb-3 text-[14px] font-extrabold">Education</p>
            <div className="mb-6 flex flex-wrap gap-2">
              {doctor.education.map((entry) => <Pill size="sm" icon="grad" key={entry.degree}>{entry.degree}</Pill>)}
            </div>
            <ButtonLink href="/contact">Ask a question <span aria-hidden="true">→</span></ButtonLink>
          </div>
        </div>
      </section>
      <section className="section-y bg-bg-alt">
        <div className="wrap">
          <AboutValuesTabs items={[
            { id: "vision", title: "Our vision", text: doctor.vision, image: policyPhotos.vision },
            { id: "mission", title: "Our mission", text: doctor.mission, image: policyPhotos.mission },
            { id: "quality", title: "Quality policy", text: doctor.qualityPolicy, image: policyPhotos.quality },
          ]} />
        </div>
      </section>
      <ClinicCTA title="Meet Dr. Archana at the clinic" text="Book a visit to discuss your dental health and treatment options." />
    </main>
  );
}
