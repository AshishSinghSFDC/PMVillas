// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  // optional: unblock CI even if lint fails (keep ON only if needed)
  // eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
