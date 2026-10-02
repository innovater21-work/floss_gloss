import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Logo and clinic photos are loaded from the live site.
    remotePatterns: [{ protocol: "https", hostname: "floss-gloss.in", pathname: "/images/**" }],
  },
};

export default nextConfig;
