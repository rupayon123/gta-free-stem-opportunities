import type { NextConfig } from "next";
import { getDeploymentAssetOrigin } from "./lib/deploymentAssets";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  assetPrefix: getDeploymentAssetOrigin(),
  turbopack: {
    root: process.cwd()
  }
};

export default nextConfig;
