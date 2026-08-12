import type { NextConfig } from 'next'

function cmsRemotePatterns(): { protocol: "http" | "https"; hostname: string; port?: string }[] {
  const base =
    process.env.NEXT_PUBLIC_CMS_BASE_URL ??
    process.env.CMS_BASE_URL ??
    'http://localhost:3000'

  try {
    const url = new URL(base)
    const protocol = (url.protocol.replace(/:$/, '') === 'https' ? 'https' : 'http') as "http" | "https"
    return [{ protocol, hostname: url.hostname, port: url.port || undefined }]
  } catch {
    return []
  }
}

const nextConfig: NextConfig = {
  transpilePackages: ["@sevp/shared", "@sevp/ui"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1536],
    remotePatterns: [...cmsRemotePatterns()],
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
