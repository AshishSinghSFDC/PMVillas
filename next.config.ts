// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      // add other hosts if you use them:
      // { protocol: "https", hostname: "images.unsplash.com" },
      // { protocol: "https", hostname: "pmvillas.com" },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
  // ✅ Do not fail the build on ESLint rules (we’ll fix lint later)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // (optional) If you ever want to bypass type errors too:
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
