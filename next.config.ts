import type { NextConfig } from "next";
import { getDeploymentAssetOrigin } from "./lib/deploymentAssets";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: process.env.GTA_HOST_TARGET === "github-pages",
  assetPrefix: getDeploymentAssetOrigin(),
  turbopack: {
    root: process.cwd()
  }
};

export default nextConfig;
