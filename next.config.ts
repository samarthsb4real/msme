import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack configuration to fix build error
  turbopack: {},
  
  // PWA will be handled differently for Turbopack
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ];
  },
  
  async rewrites() {
    return [
      {
        source: '/sw.js',
        destination: '/_next/static/chunks/sw.js',
      },
    ];
  },
};

export default nextConfig;
