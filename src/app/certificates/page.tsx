import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import { Pill } from "@/components/ui/pill";
import { Breadcrumbs, ClinicCTA, PageIntro } from "@/components/site/page-elements";
import { ImageGallery } from "@/components/ui/image-gallery";
import { certificatePhotos, doctor } from "@/content/site";

export const metadata: Metadata = {
  title: "Credentials & Certificates",
  description: "Professional qualifications and registration details for Dr. Archana Mal at Floss & Gloss Dental Clinic.",
  alternates: { canonical: "/certificates" },
};

export default function CertificatesPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Credentials" }]} />
      <PageIntro eyebrow="Professional background" title="Qualifications and achievements." description="Dr. Archana Mal’s listed education and registration details, alongside certificates and professional highlights shared by the clinic." />
      <section className="section-y pt-0!">
        <div className="wrap grid grid-cols-2 gap-5 max-md:grid-cols-1">
          {doctor.education.map((entry, index) => (
            <article key={entry.degree} className={"rounded-card border p-8 " + (index % 2 === 0 ? "border-transparent bg-soft" : "border-line bg-surface")}>
              <Icon name="grad" className="mb-5 size-12 rounded-full bg-primary p-3 text-on-primary" />
              <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[.08em] text-accent">Dental qualification</p>
              <h2 className="mb-2 font-display text-[30px]">{entry.degree}</h2>
              <p className="text-muted">{entry.institution}</p>
            </article>
          ))}
          <article className="col-span-2 flex items-center justify-between gap-6 rounded-card border border-line bg-surface p-8 max-md:col-span-1 max-md:flex-col max-md:items-start">
            <div>
              <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[.08em] text-accent">Professional registration</p>
              <h2 className="font-display text-[30px]">Registration No. {doctor.registration}</h2>
              <p className="mt-2 text-muted">Contact the clinic if you need further details about the listed qualifications.</p>
            </div>
            <Pill icon="badge">Dr. Archana Mal</Pill>
          </article>
        </div>
        <p className="wrap mt-5 text-[13px] text-muted">This page presents the qualifications and registration published in the clinic profile. Contact the clinic if you need clarification about any credential.</p>
      </section>
      <section className="section-y bg-bg-alt">
        <div className="wrap">
          <div className="mx-auto mb-8 max-w-[680px] text-center">
            <p className="mb-2 font-display text-[18px] text-accent">Awards &amp; achievements</p>
            <h2 className="text-h2-sm">Certificates and professional highlights</h2>
          </div>
          <ImageGallery items={certificatePhotos} label="Dr. Archana Mal’s certificates and achievements" />
        </div>
      </section>
      <ClinicCTA title="Have a question about the clinic?" text="Contact the team for information before arranging a visit." />
    </main>
  );
}
