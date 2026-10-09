import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  distDir: process.env.PYLON_BUILD_DIR || ".next",
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pylonenergy.com.au" },
      { protocol: "https", hostname: "www.pylonenergy.com.au" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
