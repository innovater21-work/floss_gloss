import type { NextConfig } from "next";
import treatmentContent from "./src/content/treatments.json";

const treatmentRedirects = treatmentContent.flatMap((treatment) =>
  treatment.legacyPaths.map((source) => ({
    source,
    destination: `/treatments/${treatment.slug}`,
    permanent: true,
  })),
);

const pageRedirects = [
  { source: "/about-dentist-shela-bopal", destination: "/about", permanent: true },
  { source: "/certificate-dentist-shela-bopal", destination: "/certificates", permanent: true },
  { source: "/gallery-dentist-shela-bopal", destination: "/gallery", permanent: true },
  { source: "/faq-dentist-shela-bopal", destination: "/faq", permanent: true },
  { source: "/contact-dentist-shela-bopal", destination: "/contact", permanent: true },
  { source: "/contact-dentist-shela-bopal.php", destination: "/contact", permanent: true },
];

const nextConfig: NextConfig = {
  turbopack: {
    // Keep the app rooted here; otherwise Next discovers a package lock in the parent home folder.
    root: process.cwd(),
  },
  images: {
    // Logo and clinic photos are loaded from the live site.
    remotePatterns: [{ protocol: "https", hostname: "floss-gloss.in", pathname: "/images/**" }],
  },
  async redirects() {
    return [...pageRedirects, ...treatmentRedirects];
  },
};

export default nextConfig;
