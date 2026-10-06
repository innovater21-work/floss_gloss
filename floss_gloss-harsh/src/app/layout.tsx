import type { Metadata, Viewport } from "next";
import "@fontsource/young-serif/400.css";
import "@fontsource-variable/nunito-sans/opsz.css";
import "./globals.css";
import { IconSprite } from "@/components/ui/icon";
import { AnnouncementBar, SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { BookingWidgetProvider } from "@/components/forms/kivi-booking-widget";
import { logo } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://floss-gloss.in"),
  title: {
    default: "Floss & Gloss — Family Dental Clinic in Shela, Ahmedabad",
    template: "%s | Floss & Gloss",
  },
  description: "Gentle, unhurried family dentistry in Shela, Ahmedabad. Meet Dr. Archana Mal, MDS Periodontics. Sunday appointments by request.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Floss & Gloss Dental Clinic",
    title: "Floss & Gloss — Family Dental Clinic in Shela, Ahmedabad",
    description: "Gentle, unhurried dentistry for every age in Shela, Ahmedabad.",
    url: "https://floss-gloss.in/",
    images: [{ url: logo.src, width: logo.width, height: logo.height, alt: "Floss & Gloss Dental Clinic" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#332C84",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <body className="antialiased">
        <BookingWidgetProvider>
          <IconSprite />
          <AnnouncementBar />
          <SiteHeader />
          {children}
          <SiteFooter />
        </BookingWidgetProvider>
      </body>
    </html>
  );
}
