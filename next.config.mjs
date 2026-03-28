/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/static/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'jay-industries-backend.onrender.com',
        pathname: '/static/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'jay-industries-opal.vercel.app',
        pathname: '/static/uploads/**',
      }
    ],
  },
};

export default nextConfig;
