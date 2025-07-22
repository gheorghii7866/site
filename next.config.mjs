/** @type {import('next').NextConfig} */
const nextConfig = {
  // This will prevent ESLint from failing the build.
  eslint: {
    ignoreDuringBuilds: true,
  },

  // This will prevent TypeScript errors from failing the build.
  typescript: {
    ignoreBuildErrors: true,
  },

  // This setting is for the Next.js Image component. 
  // It disables image optimization, which can be useful for static exports or specific hosting environments.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;