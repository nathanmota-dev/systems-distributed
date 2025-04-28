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
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://18.221.96.240:8080/:path*'
      }
    ]
  },
}

module.exports = nextConfig;