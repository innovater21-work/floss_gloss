import { AgesSection } from "@/components/home/ages";
import { CalmSection } from "@/components/home/calm";
import { DoctorSection } from "@/components/home/doctor";
import { FaqSection } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { ReviewsSection } from "@/components/home/reviews";
import { AnnouncementBar, SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { TreatmentsSection } from "@/components/home/treatments";
import { VisitSection } from "@/components/home/visit";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Hero />
        <AgesSection />
        <CalmSection />
        <DoctorSection />
        <TreatmentsSection />
        <ReviewsSection />
        <VisitSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
