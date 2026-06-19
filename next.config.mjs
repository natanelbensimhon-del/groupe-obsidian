/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
