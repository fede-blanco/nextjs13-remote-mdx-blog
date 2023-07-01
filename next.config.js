/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
          port: '',
          pathname: '/fede-blanco/next13-practice-blogposts/main/images/**',
        },
      ],
    },
  }
  
  module.exports = nextConfig
