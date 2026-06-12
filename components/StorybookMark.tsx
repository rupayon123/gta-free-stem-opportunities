type StorybookMarkProps = {
  className?: string;
  compact?: boolean;
  ariaHidden?: boolean;
  label?: string;
};

export function StorybookMark({
  className = "",
  compact = false,
  ariaHidden = false,
  label = "GTA FREE STEM Opportunities"
}: StorybookMarkProps) {
  const classes = ["storybook-mark", compact ? "compact" : "", className].filter(Boolean).join(" ");

  return (
    <span className={classes} aria-hidden={ariaHidden ? "true" : undefined} role={ariaHidden ? undefined : "img"} aria-label={ariaHidden ? undefined : label}>
      <span className="storybook-mark-card">
        <span className="storybook-mark-pin">GTA</span>
        <span className="storybook-mark-main">FREE STEM</span>
        <span className="storybook-mark-sub">Opportunities</span>
        <span className="storybook-mark-doodles" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </span>
    </span>
  );
}
