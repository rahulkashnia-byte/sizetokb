import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Static HTML export — works on Hostinger shared hosting (upload `out/` to public_html)
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
