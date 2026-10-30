"use client";

import { useId } from "react";
import { accessibilitySupportCategories } from "@/lib/accessibilitySupport";
import { supportCategoryHelp, supportCategoryLabels, type AccessibilitySelection } from "@/lib/accessibilitySelection";

/** Shown only behind the default-off reviewed integration flag. */
export function AccessibilityFilter({ value, onChange, disabled = false }: {
  value: AccessibilitySelection; onChange: (value: AccessibilitySelection) => void; disabled?: boolean;
}) {
  const id = useId();
  return <fieldset className="accessibility-filter" disabled={disabled} lang="en" aria-describedby={`${id}-help`}>
    <legend>Special needs &amp; accessibility</legend>
    <p id={`${id}-help`}>Choose the access or support you want to check. Providers confirm arrangements. Listings must match every selected category.</p>
    {accessibilitySupportCategories.map(category => <div key={category}>
      <label className="accessibility-check"><input type="checkbox" checked={value.categories.includes(category)} aria-describedby={supportCategoryHelp[category] ? `${id}-${category}` : undefined} onChange={e => onChange({ ...value, categories: accessibilitySupportCategories.filter(c => c === category ? e.target.checked : value.categories.includes(c)) })} /><span>{supportCategoryLabels[category]}</span></label>
      {supportCategoryHelp[category] && <p id={`${id}-${category}`} className="accessibility-check-help">{supportCategoryHelp[category]}</p>}
    </div>)}
    <label className="accessibility-check"><input type="checkbox" checked={value.includeOnRequest} onChange={e => onChange({ ...value, includeOnRequest: e.target.checked })} /><span>Include support that must be requested</span></label>
    <p>Request-based matches still need provider confirmation. Building access does not confirm adapted activities or support staff.</p>
  </fieldset>;
}
