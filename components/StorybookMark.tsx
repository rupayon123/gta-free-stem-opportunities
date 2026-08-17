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
    <span
      className={classes}
      aria-hidden={ariaHidden ? "true" : undefined}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : label}
    >
      <img className="storybook-mark-image" src="/logo.png" alt={ariaHidden ? "" : label} loading="eager" />
    </span>
  );
}
