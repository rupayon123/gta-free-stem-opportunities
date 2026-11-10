import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ScopedSavedFilters } from "../../components/ScopedSavedFilters";

const noop = () => {};
const callbacks = { onSelect: noop, onNameChange: noop, onSave: noop, onDelete: noop, onKeepCurrent: noop };
test("one scoped picker applies selection separately from one explicit save/update action", () => {
  const html = renderToStaticMarkup(<ScopedSavedFilters {...callbacks} presets={[]} selectedId="" name="Science" dirty={false} loading={false} busy={false} writeBlocked={false} legacyChanged={false} />);
  assert.equal((html.match(/<select\b/g) ?? []).length, 1);
  assert.equal((html.match(/>Save filter<\/button>/g) ?? []).length, 1);
  assert(!html.includes(">New filter</button>"), "New filter belongs to the picker, not a duplicate button");
  assert(html.includes("Choosing a filter applies it immediately"));
});
test("legacy teen and youth guide scope labels remain distinct and blocked writes preserve the picker", () => {
  const row = { revision: 1, criteria: {}, createdAt: "2026-10-30T12:00:00.000Z", updatedAt: "2026-10-30T12:00:00.000Z" };
  const html = renderToStaticMarkup(<ScopedSavedFilters {...callbacks} presets={[
    { ...row, id: "old", name: "Age 16", scope: "teen-activities" }, { ...row, id: "new", name: "Volunteering", scope: "youth-guide" }
  ]} selectedId="old" name="Age 16" dirty loading={false} busy={false} writeBlocked legacyChanged />);
  assert(html.includes('label="Teen activities"') && html.includes('label="Student guide"'));
  assert(html.includes("Your current filters and draft are kept"));
  assert.match(html, /<button[^>]*disabled=""[^>]*>Update filter<\/button>/);
  assert(!/<select[^>]*disabled/.test(html));
});
