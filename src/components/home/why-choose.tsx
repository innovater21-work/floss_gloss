import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/typography";
import { features } from "@/content/site";
import { cn } from "@/lib/cn";

export function WhyChooseSection() {
  return (
    <section className="section-y bg-bg-alt">
      <div className="wrap">
        <SectionHeader eyebrow="Thoughtful care" title="The little things make a difference" intro="A careful team, clear explanations and a clinic prepared for your comfort." />
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {features.map((feature, index) => (
            <article key={feature.title} className={cn("rounded-card border p-6", index % 2 === 0 ? "border-transparent bg-soft" : "border-line bg-surface")}>
              <Icon name={feature.icon} className="mb-4 size-11 rounded-full bg-primary p-2.5 text-on-primary" />
              <h3 className="mb-1.5 text-[21px]">{feature.title}</h3>
              <p className="text-[15px] text-muted">{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
