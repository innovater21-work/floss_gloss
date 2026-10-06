import { SectionHeader } from "@/components/ui/typography";
import { seoCopy } from "@/content/site";

export function LocalOverviewSection() {
  return (
    <section className="section-y">
      <div className="wrap">
        <SectionHeader eyebrow="Dental care in Shela" title="A friendly clinic for your family" intro="Floss & Gloss Dental Clinic welcomes patients from Shela and nearby neighbourhoods." />
        <div className="mx-auto grid max-w-[960px] gap-5 text-muted md:grid-cols-2">
          {seoCopy.map((paragraph, index) => (
            <p className={index === seoCopy.length - 1 ? "md:col-span-2" : ""} key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
