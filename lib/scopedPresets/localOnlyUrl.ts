/** Support choices stay in local state/v2 storage, never in share/referrer URLs. */
export function stripPrivateSupportParams(url: URL): URL {
  const clean = new URL(url.href);
  clean.searchParams.delete("accessSupport");
  clean.searchParams.delete("youthCriteria");
  return clean;
}
