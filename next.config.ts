import path from "node:path";
import type { NextConfig } from "next";

// Serving from a project page means every asset lives under /portfolio.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  basePath,
  // GitHub Pages serves files, not a Node server, so the site is exported as
  // static HTML. Anything that needs a server at request time has to go.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Pin the workspace root: a lockfile in a parent directory otherwise makes
  // Turbopack infer the wrong project root.
  turbopack: { root: path.resolve(".") },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
