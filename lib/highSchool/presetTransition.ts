/** No criteria, route or selection change occurs until a dirty draft is confirmed. */
export async function guardYouthPresetTransition<T>(value: T, state: { busy: boolean; dirty: boolean }, confirm: (value: T) => Promise<boolean>, apply: (value: T) => void): Promise<boolean> {
  if (state.busy) return false;
  if (state.dirty && !await confirm(value)) return false;
  apply(value);
  return true;
}
