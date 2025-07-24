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
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com', // Matches any subdomain of petreca.dev
        port: '',
        pathname: '/**', // Matches any path under /images/posts
      }
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = {
  modularizeImports: {
    
    '@react-hook-form': {
      transform: '@react-hook-form/{{member}}',
    },
  },
};

export default nextConfig;
