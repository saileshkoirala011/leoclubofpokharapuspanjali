import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow all local images via /images/* served from public/
    remotePatterns: [],
  },
  async rewrites() {
    return [
      {
        // Proxy /api/* to the Express backend in development
        source:      "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
