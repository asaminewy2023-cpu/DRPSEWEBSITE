import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ["@sevp/shared", "@sevp/ui"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1536],
    remotePatterns: [{ protocol: "http", hostname: "localhost", port: "3000" }],
  },
  async headers() {
    return [
      {
        source: "/logo-modified.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/ababayehu-tadesse.jpeg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/icon.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
