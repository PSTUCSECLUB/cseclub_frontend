/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    output: "export",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
