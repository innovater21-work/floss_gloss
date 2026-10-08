import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { Breadcrumbs, ClinicCTA, PageIntro } from "@/components/site/page-elements";
import { clinic, treatments } from "@/content/site";

type PageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return treatments.map((treatment) => ({ slug: treatment.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const treatment = treatments.find((item) => item.slug === slug);
  if (!treatment) return { title: "Treatment not found" };
  return {
    title: treatment.metaTitle,
    description: treatment.metaDescription,
    alternates: { canonical: "/treatments/" + treatment.slug },
    openGraph: { title: treatment.metaTitle, description: treatment.metaDescription, type: "article" },
  };
}

export default async function TreatmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const treatment = treatments.find((item) => item.slug === slug);
  if (!treatment) notFound();

  const related = treatments.filter((item) => item.category === treatment.category && item.slug !== treatment.slug).slice(0, 3);
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: treatment.name,
    description: treatment.metaDescription,
    url: "https://floss-gloss.in/treatments/" + treatment.slug,
    about: { "@type": "MedicalProcedure", name: treatment.name },
    provider: { "@type": "Dentist", name: clinic.name + " Dental Clinic" },
  }).replace(/</g, "\\u003c");

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      <Breadcrumbs items={[{ label: "Treatments", href: "/treatments" }, { label: treatment.name }]} />
      <PageIntro eyebrow={treatment.category + " dental care"} title={treatment.name} description={treatment.description} />
      <section className="section-y pt-0!">
        <div className="wrap grid grid-cols-[1.05fr_.95fr] items-start gap-14 max-lg:grid-cols-1">
          <div>
            <p className="mb-8 text-[18px] leading-[1.7] text-muted">{treatment.intro}</p>
            <div className="grid gap-8">
              {treatment.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="mb-3 font-display text-[30px]">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p className="mb-3.5 text-muted" key={paragraph}>{paragraph}</p>)}
                </section>
              ))}
            </div>
            <p className="mt-8 rounded-md border-l-4 border-accent bg-bg-alt p-5 text-[14px] text-muted">Treatment suitability, steps and outcomes vary. The dentist will assess your needs and explain options before care begins.</p>
          </div>
          <aside className="rounded-xl border border-line bg-surface p-7">
            <h2 className="mb-3 font-display text-[26px]">Talk with the dentist</h2>
            <p className="mb-5 text-[15px] text-muted">Bring your questions and share what matters to you. We will explain the next step and discuss costs before treatment.</p>
            <div className="grid gap-3">
              <a className="flex items-center gap-2 font-bold text-primary" href={clinic.phoneHref}><Icon name="phone" />{clinic.phone}</a>
              <Link className="flex items-center gap-2 font-bold text-primary" href={clinic.whatsapp} target="_blank" rel="noopener noreferrer"><Icon name="wa" />Ask on WhatsApp</Link>
            </div>
          </aside>
        </div>
      </section>
      {related.length ? (
        <section className="section-y bg-bg-alt">
          <div className="wrap">
            <h2 className="mb-6 text-h2-sm">Related treatments</h2>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {related.map((item) => <Link className="rounded-card border border-line bg-surface p-5 font-display text-[21px] hover:border-accent" href={"/treatments/" + item.slug} key={item.slug}>{item.name}<span className="mt-2 block font-body text-[14px] text-muted">{item.description}</span></Link>)}
            </div>
          </div>
        </section>
      ) : null}
      <ClinicCTA title={"Ask us about " + treatment.name.toLowerCase()} text="A visit helps the dentist assess your needs and talk through suitable options." />
    </main>
  );
}
