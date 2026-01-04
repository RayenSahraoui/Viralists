/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // skips ESLint during Vercel builds
  },
};

export default nextConfig;
