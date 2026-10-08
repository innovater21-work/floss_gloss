import type { Metadata } from "next";
import { ImageGallery } from "@/components/ui/image-gallery";
import { Breadcrumbs, ClinicCTA, PageIntro } from "@/components/site/page-elements";
import { galleryGroups } from "@/content/site";

export const metadata: Metadata = {
  title: "Clinic Gallery",
  description: "Meet Dr. Archana and the clinic team, and explore Floss & Gloss Dental Clinic in Shela, Ahmedabad.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Gallery" }]} />
      <PageIntro eyebrow="Our clinic in pictures" title="A welcoming place for your family’s dental care." description="Browse a few highlights, then open a collection to see every photo full size." />
      <section className="section-y pt-0!">
        <div className="wrap"><ImageGallery groups={galleryGroups} label="Floss & Gloss photo collections" /></div>
      </section>
      <ClinicCTA title="Come by and say hello" text="We are in Shela, Ahmedabad. Sunday visits are by appointment." />
    </main>
  );
}
