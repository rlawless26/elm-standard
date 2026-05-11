import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname),
  async redirects() {
    return [
      // /quote and /styles were the old configurator/browse pages — now
      // each style has its own PDP at the root (/traditional, /shaker,
      // /modern) and the home page is the chooser. Permanent so search
      // engines update.
      { source: "/quote", destination: "/", permanent: true },
      { source: "/styles", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
