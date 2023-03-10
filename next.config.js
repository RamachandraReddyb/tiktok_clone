/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ["picsum.photos", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
