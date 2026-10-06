import type { Metadata } from "next";
import { ImageGallery } from "@/components/ui/image-gallery";
import { Breadcrumbs, ClinicCTA, PageIntro } from "@/components/site/page-elements";
import { galleryPhotos } from "@/content/site";

export const metadata: Metadata = {
  title: "Clinic Gallery",
  description: "See the Floss & Gloss clinic, treatment room and Dr. Archana Mal in Shela, Ahmedabad.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "About", href: "/about" }, { label: "Gallery" }]} />
      <PageIntro eyebrow="Infrastructure gallery" title="A welcoming place for your family’s dental care." description="Explore clinic photos. Select any image to enlarge it." />
      <section className="section-y pt-0!">
        <div className="wrap"><ImageGallery items={galleryPhotos} label="Clinic infrastructure gallery" /></div>
      </section>
      <ClinicCTA title="Come by and say hello" text="We are in Shela, Ahmedabad. Sunday visits are by appointment." />
    </main>
  );
}
