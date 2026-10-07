import { Icon } from "@/components/ui/icon";
import { SectionHeader } from "@/components/ui/typography";
import { featuredFaqs } from "@/content/site";

export function FaqSection() {
  return (
    <section className="section-y pt-0!">
      <div className="wrap">
        <SectionHeader eyebrow="Good to know" title="Questions from families" intro="A few quick answers. Visit the FAQ page for more." />
        <div className="mx-auto max-w-[820px]">
          {featuredFaqs.slice(0, 6).map((faq, index) => (
            <details key={faq.q} open={index === 0} className="group mb-3 rounded-md border border-line bg-surface px-[26px] py-[22px] open:border-transparent open:bg-soft">
              <summary className="flex justify-between gap-4 font-display text-[21px]">
                {faq.q}
                <Icon name="plus" className="size-8 rounded-full bg-soft p-[7px] text-accent transition-all duration-[250ms] group-open:rotate-45 group-open:bg-accent group-open:text-on-accent" />
              </summary>
              <p className="mt-2.5 text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-7 text-center"><a className="font-extrabold text-primary underline underline-offset-4" href="/faq">See all common questions</a></p>
      </div>
    </section>
  );
}
