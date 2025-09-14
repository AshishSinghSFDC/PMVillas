// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true, // ← now stable in Next 15.5
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      // add others if needed
      // { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
  // typescript: { ignoreBuildErrors: true }, // optional escape hatch
};

export default nextConfig;
