type ArtworkRole = "home" | "explore" | "school" | "support" | "profile" | "saved" | "filters" | "map" | "library" | "art" | "code" | "science" | "engineering" | "ideas" | "volunteer" | "calendar" | "offline" | "access" | "about";

/** Original approved GTA artwork. Labels belong to the surrounding control. */
export function GtaArtwork({ role, illustration = false }: { role: ArtworkRole; illustration?: boolean }) {
  const variant = illustration ? "illustration" : "compact";
  return <span className={`gta-artwork${illustration ? " gta-artwork-illustration" : ""}`} aria-hidden="true">
    <img className="gta-artwork-light" src={`/artwork/v3/gta_${role}_${variant}_light.svg`} alt="" width={illustration ? 80 : 28} height={illustration ? 80 : 28} />
    <img className="gta-artwork-dark" src={`/artwork/v3/gta_${role}_${variant}_dark.svg`} alt="" width={illustration ? 80 : 28} height={illustration ? 80 : 28} />
  </span>;
}
