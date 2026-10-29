import type { NextConfig } from "next";
import { getDeploymentAssetOrigin } from "./lib/deploymentAssets";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: process.env.GTA_HOST_TARGET === "github-pages",
  assetPrefix: getDeploymentAssetOrigin(),
  experimental: {
    // Bound concurrent static renders on the shared development Mac and free CI.
    cpus: 2,
    staticGenerationMaxConcurrency: 1
  },
  turbopack: {
    root: process.cwd()
  }
};

export default nextConfig;
