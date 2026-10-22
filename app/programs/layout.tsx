import { LegalFooter } from "@/components/LegalFooter";
import { StorybookMark } from "@/components/StorybookMark";
import "./programs.css";

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="programs-site" lang="en">
      <a className="skip-link" href="#program-content">Skip to program information</a>
      <header className="programs-header">
        <a className="programs-brand" href="/" aria-label="GTA Free STEM home">
          <StorybookMark compact ariaHidden />
          <span>GTA FREE STEM</span>
        </a>
        <nav aria-label="Program directory navigation">
          <a href="/programs/">All programs</a>
          <a href="/opportunities/#discover">Search &amp; save</a>
          <a href="/support/">Get help</a>
        </nav>
      </header>
      {children}
      <LegalFooter />
    </div>
  );
}
