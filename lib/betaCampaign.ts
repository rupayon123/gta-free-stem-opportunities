/** Enable only after the dedicated LinkedIn group has a verified, approved build. */
export const iosBetaCampaign: { joinUrl: string | null } = { joinUrl: null };

export function iosBetaInvitation(): string | null {
  if (!iosBetaCampaign.joinUrl) return null;
  const url = new URL(iosBetaCampaign.joinUrl);
  if (url.origin !== "https://testflight.apple.com" || url.username || url.password || !/^\/join\/[A-Za-z0-9]{8}$/.test(url.pathname) || url.search || url.hash) {
    throw new Error("The iPhone beta requires the verified dedicated TestFlight invitation.");
  }
  return url.href;
}
