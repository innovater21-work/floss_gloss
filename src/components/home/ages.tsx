import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import { ages } from "@/content/site";

export function AgesSection() {
  return (
    <section className="section-y">
      <div className="wrap">
        <SectionHeader
          eyebrow="For every age"
          title="One dentist for the whole family"
          intro="From a toddler's first check-up to grandma's new dentures — care that grows with your family."
        />
        <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
          {ages.map((age, i) => {
            const tinted = i % 2 === 0;
            return (
              <div
                key={age.title}
                className={cn(
                  "flex flex-col rounded-card border px-[26px] py-8",
                  tinted ? "border-transparent bg-soft" : "border-line bg-surface",
                )}
              >
                <Icon
                  name={age.icon}
                  className={cn(
                    "mb-[22px] size-14 rounded-full p-3.5",
                    tinted ? "bg-accent text-on-accent" : "bg-primary text-on-primary",
                  )}
                />
                <h3 className="mb-1.5 text-[26px]">{age.title}</h3>
                <p className="mb-[18px] text-[15px] text-muted">{age.text}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5">
                  {age.tags.map((tag) => (
                    <li
                      key={tag}
                      className={cn(
                        "rounded-pill border border-line px-[11px] py-[5px] text-[13px] font-bold",
                        tinted ? "bg-surface" : "bg-bg-alt",
                      )}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
