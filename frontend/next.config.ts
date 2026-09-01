import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },

  async rewrites() {
    // In development: proxy /api/* → local Express backend.
    // In production on Vercel: vercel.json rewrites handle this instead.
    if (!isDev) return [];

    const backendRoot = (
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"
    ).replace(/\/api$/, "");

    return [
      {
        source:      "/api/:path*",
        destination: `${backendRoot}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
