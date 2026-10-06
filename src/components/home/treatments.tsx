import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/typography";
import { treatmentGroups } from "@/content/site";

export function TreatmentsSection() {
  return (
    <section id="treatments" className="section-y bg-bg-alt">
      <div className="wrap">
        <SectionHeader
          eyebrow="Our treatments"
          title="Everything under one friendly roof"
          intro="Fourteen treatments grouped simply — tap any to learn more."
        />
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          {treatmentGroups.map((g) => (
            <div key={g.title} className="rounded-card border border-line bg-surface p-8">
              <h3 className="mb-1.5 flex items-center gap-3 text-[26px]">
                {g.title}
                <i className="rounded-pill bg-soft px-2.5 py-1 font-body text-[12px] font-extrabold text-accent not-italic">
                  {g.items.length}
                </i>
              </h3>
              <p className="mb-[18px] text-[15px] text-muted">{g.text}</p>
              {g.items.map((t) => (
                <a
                  key={t.name}
                  href="#"
                  className="group flex items-center gap-3 border-t border-dashed border-line py-[13px] font-bold"
                >
                  <Icon name={t.icon} className="size-[34px] rounded-full bg-bg-alt p-[7px] text-primary" />
                  {t.name}
                  <Icon
                    name="arrow"
                    className="ml-auto text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
