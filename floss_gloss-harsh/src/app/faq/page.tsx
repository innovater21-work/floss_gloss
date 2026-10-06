import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import { Breadcrumbs, ClinicCTA, PageIntro } from "@/components/site/page-elements";
import { faqs } from "@/content/site";

export const metadata: Metadata = {
  title: "Dental Care FAQs",
  description: "Answers to common questions about appointments, treatments, oral hygiene and family dental care at Floss & Gloss in Shela.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "FAQs" }]} />
      <PageIntro eyebrow="Good to know" title="Questions from families." description="Clear, simple information to help you plan your visit. Ask the clinic if you need advice for your own situation." />
      <section className="section-y pt-0!">
        <div className="wrap mx-auto max-w-[900px]">
          {faqs.map((faq, index) => (
            <details key={faq.q} open={index === 0} className="group mb-3 rounded-md border border-line bg-surface px-6 py-5 open:border-transparent open:bg-soft">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-[21px] [&::-webkit-details-marker]:hidden">
                {faq.q}<Icon name="plus" className="size-8 flex-none rounded-full bg-soft p-[7px] text-accent transition-all group-open:rotate-45 group-open:bg-accent group-open:text-on-accent" />
              </summary>
              <p className="mt-3 max-w-[760px] text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
      <ClinicCTA title="Still have a question?" text="Call, message us, or arrange a visit to talk through your concern with the team." />
    </main>
  );
}
