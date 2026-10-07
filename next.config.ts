import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // This repository contains a separate nested app; keep this build rooted here.
    root: process.cwd(),
  },
  images: {
    // Logo and clinic photos are loaded from the live site.
    remotePatterns: [{ protocol: "https", hostname: "floss-gloss.in", pathname: "/images/**" }],
  },
};

export default nextConfig;
