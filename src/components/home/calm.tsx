import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/typography";
import { promises } from "@/content/site";

export function CalmSection() {
  return (
    <section className="relative mx-6 overflow-hidden rounded-band bg-dark py-[88px] text-on-dark max-md:mx-2.5 max-md:rounded-card max-md:py-16">
      <div aria-hidden="true" className="bg-accent-25 absolute bottom-[-260px] left-[-200px] size-[520px] rounded-full" />
      <div className="wrap relative grid grid-cols-[1fr_1.1fr] items-center gap-16 max-lg:grid-cols-1">
        <div>
          <Eyebrow tone="dark">Nervous about the dentist?</Eyebrow>
          <h2 className="text-h2-lg">You&apos;re in very good company — and very gentle hands.</h2>
          <div className="tint-dark-8 mt-7 rounded-sm px-6 py-[22px] font-display text-[20px] leading-[1.4]">
            “No scary surprises, no rush. Pricing was clear too.”
            <small className="mt-2.5 block font-body text-[14px] text-dim">— Rahul Mishra, Google review</small>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {promises.map((p) => (
            <div key={p.title} className="tint-dark-7 border-dark-12 rounded-lg border p-[26px]">
              <Icon name={p.icon} className="mb-3.5 size-10 rounded-full bg-accent p-[9px] text-on-accent" />
              <h3 className="mb-1.5 text-[21px]">{p.title}</h3>
              <p className="text-[15px] text-dim">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
