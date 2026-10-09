import type { Metadata } from "next";
import { AgesSection } from "@/components/home/ages";
import { CallbackSection } from "@/components/home/callback";
import { CalmSection } from "@/components/home/calm";
import { DoctorSection } from "@/components/home/doctor";
import { FaqSection } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { HeroBannerCarousel } from "@/components/home/hero-banner-carousel";
import { InfrastructureCarousel } from "@/components/home/infrastructure-carousel";
import { LocalOverviewSection } from "@/components/home/local-overview";
import { ReviewsSection } from "@/components/home/reviews";
import { TreatmentsSection } from "@/components/home/treatments";
import { VisitSection } from "@/components/home/visit";
import { WhyChooseSection } from "@/components/home/why-choose";
import { clinic, hours, homepageSlides, infrastructurePhotos, photos } from "@/content/site";

export const metadata: Metadata = {
  title: "Family Dentist in Shela, Ahmedabad",
  description: "Gentle family dentistry in Shela, Ahmedabad. Meet Dr. Archana Mal, MDS Periodontics. Explore treatments, reviews and clinic hours.",
  alternates: { canonical: "/" },
};

const businessData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name + " Dental Clinic",
  url: "https://floss-gloss.in/",
  image: photos.clinic.src,
  telephone: clinic.phone,
  email: clinic.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop no. 130, first floor, Orchid Sky, Club O7 Road, Shela",
    addressLocality: "Shela",
    addressRegion: "Ahmedabad",
    postalCode: "380058",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 23.0047721,
    longitude: 72.469116,
  },
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: clinic.kiviBookingUrl,
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/IOSPlatform",
        "https://schema.org/AndroidPlatform",
      ],
    },
    result: {
      "@type": "Reservation",
      name: "Appointment at Floss & Gloss Dental Clinic",
    },
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "14:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "17:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "14:00", description: hours[1].time },
  ],
};

export default function HomePage() {
  const structuredData = JSON.stringify(businessData).replace(/</g, "\\u003c");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      <main>
        <Hero />
        <HeroBannerCarousel slides={homepageSlides} />
        <AgesSection />
        <CalmSection />
        <DoctorSection />
        <WhyChooseSection />
        <TreatmentsSection />
        <ReviewsSection />
        <LocalOverviewSection />
        <VisitSection />
        <InfrastructureCarousel items={infrastructurePhotos} />
        <FaqSection />
        <CallbackSection />
      </main>
    </>
  );
}
