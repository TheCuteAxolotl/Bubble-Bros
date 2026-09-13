import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/marine-detailing", destination: "/services", permanent: true },
      { source: "/paint-correction", destination: "/services", permanent: true },
      { source: "/ceramic-coatings", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
