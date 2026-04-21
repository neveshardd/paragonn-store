import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crafatar.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "67a661c7cc7210d66352eaad9da96403.r2.cloudflarestorage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
