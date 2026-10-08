import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/typography";
import { Breadcrumbs, ClinicCTA, PageIntro } from "@/components/site/page-elements";
import { treatmentGroups } from "@/content/site";

export const metadata: Metadata = {
  title: "Dental Treatments in Shela, Ahmedabad",
  description: "Explore preventive, restorative, cosmetic, surgical and children's dental treatments at Floss & Gloss in Shela, Ahmedabad.",
  alternates: { canonical: "/treatments" },
};

export default function TreatmentsPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Treatments" }]} />
      <PageIntro eyebrow="Our treatments" title="Care for every stage of your smile." description="Explore our dental services. Your dentist will discuss suitable options after an examination." />
      {treatmentGroups.map((group) => (
        <section className="section-y pt-0!" key={group.title}>
          <div className="wrap">
            <SectionHeader eyebrow={group.text} title={group.title} className="mb-9" />
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 grid-center-last-two">
              {group.items.map((treatment) => (
                <Link key={treatment.slug} href={"/treatments/" + treatment.slug} className="group flex items-start gap-4 rounded-card border border-line bg-surface p-6 transition-transform hover:-translate-y-1 hover:border-accent">
                  <Icon name={treatment.icon} className="mt-1 size-12 rounded-full bg-soft p-3 text-accent" />
                  <span><b className="font-display text-[22px] font-normal">{treatment.name}</b><span className="mt-1 block text-[14px] text-muted">{treatment.description}</span></span>
                  <Icon name="arrow" className="ml-auto mt-2 text-muted transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
      <ClinicCTA title="Not sure where to start?" text="Tell us what is bothering you and the dentist can guide you through the next step." />
    </main>
  );
}
