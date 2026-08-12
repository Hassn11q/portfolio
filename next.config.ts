import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a lockfile in a parent directory otherwise makes
  // Turbopack infer the wrong project root.
  turbopack: { root: path.resolve(".") },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
