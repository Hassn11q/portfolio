import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
