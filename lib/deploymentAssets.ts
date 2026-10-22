/** Keep a page's hashed assets on the deployment that produced its HTML. */
export function getDeploymentAssetOrigin(host = process.env.VERCEL_URL): string | undefined {
  if (host === undefined || host === "") return undefined;

  // VERCEL_URL is one bare DNS label under vercel.app, without a scheme.
  // Reject URL syntax rather than letting it broaden the CSP or asset prefix.
  if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.vercel\.app$/.test(host)) {
    throw new Error("VERCEL_URL must be a bare Vercel deployment hostname.");
  }

  return `https://${host}`;
}
