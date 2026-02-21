/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
 images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**.vercel.app',
    },
  ],
},
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig