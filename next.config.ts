import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Placeholder portraits in the benefits section; replace with local images later.
    // Object form: a `new URL(...)` pattern pins an empty query string, which
    // would reject Unsplash's sizing params (?w=…&fit=crop…).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-**",
      },
    ],
  },
};

export default nextConfig;
