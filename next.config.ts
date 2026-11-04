import type { NextConfig } from "next";

// Static export: `npm run build` writes plain HTML/CSS/JS to /out for any host
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
