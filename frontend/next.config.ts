/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'systems-distributed.s3.us-east-2.amazonaws.com'
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;