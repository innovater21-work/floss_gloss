import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/typography";
import { treatmentGroups } from "@/content/site";

export function TreatmentsSection() {
  return (
    <section id="treatments" className="section-y bg-bg-alt">
      <div className="wrap">
        <SectionHeader eyebrow="Our treatments" title="Everything under one friendly roof" intro="Explore our care options and open any treatment to learn more." />
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          {treatmentGroups.map((group) => (
            <article key={group.title} className="rounded-card border border-line bg-surface p-8">
              <h3 className="mb-1.5 flex items-center gap-3 text-[26px]">{group.title}<i className="rounded-pill bg-soft px-2.5 py-1 font-body text-[12px] font-extrabold text-accent not-italic">{group.items.length}</i></h3>
              <p className="mb-[18px] text-[15px] text-muted">{group.text}</p>
              {group.items.map((treatment) => (
                <Link key={treatment.slug} href={"/treatments/" + treatment.slug} className="group flex items-center gap-3 border-t border-dashed border-line py-[13px] font-bold hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">
                  <Icon name={treatment.icon} className="size-[34px] rounded-full bg-bg-alt p-[7px] text-primary" />
                  {treatment.name}
                  <Icon name="arrow" className="ml-auto text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              ))}
            </article>
          ))}
        </div>
        <p className="mt-8 text-center"><Link className="font-extrabold text-primary underline underline-offset-4" href="/treatments">View all treatments</Link></p>
      </div>
    </section>
  );
}
