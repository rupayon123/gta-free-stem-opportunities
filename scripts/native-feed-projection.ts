import { isAllowedNativeSource, type NativeSourceRecord } from "./native-source-policy";

/** Build 19 can read only the two explicitly approved library providers. */
export function isLegacyNativeSource(row: NativeSourceRecord): boolean {
  return (row.organization === "Toronto Public Library" || row.organization === "Markham Public Library") && isAllowedNativeSource(row);
}
