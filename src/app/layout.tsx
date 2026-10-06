import type { Metadata, Viewport } from "next";
import "@fontsource/young-serif/400.css";
import "@fontsource-variable/nunito-sans/opsz.css";
import "./globals.css";
import { IconSprite } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Floss & Gloss — Family Dental Clinic in Shela, Ahmedabad",
  description:
    "Gentle, unhurried dentistry for every age in Shela, Ahmedabad. Dr. Archana Mal, MDS Periodontics. Sunday appointments available.",
};

export const viewport: Viewport = {
  themeColor: "#332C84",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="antialiased">
        <IconSprite />
        {children}
      </body>
    </html>
  );
}
