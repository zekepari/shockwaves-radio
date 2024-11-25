import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vh-azura01.radio.volthosting.co.uk',
        pathname: '/api/station/**',
      },
    ],
  },
};

export default nextConfig;
