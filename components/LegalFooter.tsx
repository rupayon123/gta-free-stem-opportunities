import { legalConfig } from "@/lib/legal";

export function LegalFooter() {
  return (
    <footer className="legal-footer">
      <nav aria-label="Legal and support links">
        <a href="/support/">Support</a>
        <a href="/privacy/">Privacy Policy</a>
        <a href="/terms/">Terms of Use</a>
        <a href={legalConfig.appleStandardEulaUrl}>Apple Standard EULA</a>
      </nav>
      <p>© 2026 {legalConfig.publisherName}. GTA FREE STEM Opportunities.</p>
    </footer>
  );
}
