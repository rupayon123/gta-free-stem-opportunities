import staticConfig from "./hosting/static-vercel.json";
import { getDeploymentAssetOrigin } from "./lib/deploymentAssets";

const assetOrigin = getDeploymentAssetOrigin();
const assetDirectives = new Set(["script-src", "style-src", "font-src", "connect-src"]);

function deploymentContentSecurityPolicy(policy: string) {
  if (!assetOrigin) return policy;

  return policy.split(";").map((directive) => {
    const parts = directive.trim().split(/\s+/);
    if (assetDirectives.has(parts[0]) && !parts.includes(assetOrigin)) {
      parts.push(assetOrigin);
    }
    return parts.join(" ");
  }).join("; ");
}

// Vercel evaluates this configuration for each remote build. Unlike a generated
// file inside out/, these headers govern the deployment's actual responses.
export const config = {
  buildCommand: "npm run build",
  installCommand: "npm ci",
  outputDirectory: "out",
  ...staticConfig,
  headers: staticConfig.headers.map((group) => ({
    ...group,
    headers: group.headers.map((header) => header.key.toLowerCase() === "content-security-policy"
      ? { ...header, value: deploymentContentSecurityPolicy(header.value) }
      : header)
  }))
};
