import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.gravatar.com', // Matches any subdomain of example.com
        port: '',
        pathname: '/avatar/**', // Matches any path under /images
      },
    ],
  },
};

export default nextConfig;
