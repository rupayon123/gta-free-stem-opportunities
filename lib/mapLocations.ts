import type { Opportunity } from "./types";

export type MapLocation = {
  latitude: number;
  longitude: number;
  programs: Opportunity[];
};

export function mapLocations(items: Opportunity[]): MapLocation[] {
  const locations = new Map<string, MapLocation>();
  for (const item of items) {
    if (item.virtual || !Number.isFinite(item.latitude) || !Number.isFinite(item.longitude)) continue;
    if (Math.abs(item.latitude) > 90 || Math.abs(item.longitude) > 180) continue;
    const latitude = Number(item.latitude.toFixed(5));
    const longitude = Number(item.longitude.toFixed(5));
    const key = `${latitude},${longitude}`;
    const location = locations.get(key);
    if (location) location.programs.push(item);
    else locations.set(key, { latitude, longitude, programs: [item] });
  }
  return [...locations.values()];
}


