/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'encrypted-tbn2.gstatic.com']
  }
};

module.exports = nextConfig;
