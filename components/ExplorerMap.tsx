"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { t } from "@/lib/i18n";
import type { LanguageCode, Opportunity } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";
import "maplibre-gl/dist/maplibre-gl.css";
import "./ExplorerMapLocations.css";

type MapLocation = {
  latitude: number;
  longitude: number;
  programs: Opportunity[];
};

function mapLocations(items: Opportunity[]): MapLocation[] {
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


type ProjectedMapCluster = {
  locations: MapLocation[];
  x: number;
  y: number;
};

const MARKER_SEPARATION_PX = 52;

function screenClusters(locations: MapLocation[], map: import("maplibre-gl").Map): ProjectedMapCluster[] {
  // Stable ordering makes equal-distance decisions repeatable as the map pans.
  const clusters = [...locations]
    .sort((a, b) => a.latitude - b.latitude || a.longitude - b.longitude)
    .map((location) => {
      const point = map.project([location.longitude, location.latitude]);
      return { locations: [location], x: point.x, y: point.y };
    });

  // Recheck merged centroids: a single pass can move a cluster into another
  // marker. Finishing only when every center is separated avoids that overlap.
  let merged = true;
  while (merged) {
    merged = false;
    for (let first = 0; first < clusters.length && !merged; first++) {
      for (let second = first + 1; second < clusters.length; second++) {
        const a = clusters[first];
        const b = clusters[second];
        if (Math.hypot(a.x - b.x, a.y - b.y) >= MARKER_SEPARATION_PX) continue;
        const count = a.locations.length + b.locations.length;
        a.x = (a.x * a.locations.length + b.x * b.locations.length) / count;
        a.y = (a.y * a.locations.length + b.y * b.locations.length) / count;
        a.locations.push(...b.locations);
        clusters.splice(second, 1);
        merged = true;
        break;
      }
    }
  }
  return clusters;
}

function locationKey(location: MapLocation) {
  return location.latitude + "," + location.longitude;
}

export function ExplorerMap({ items, onSelect, language }: {
  items: Opportunity[];
  onSelect: (item: Opportunity) => void;
  language: LanguageCode;
}) {
  const popupIdPrefix = useId();
  const previousBoundsKey = useRef("");
  const currentItems = useRef(items);
  currentItems.current = items;
  const mappedItemsKey = JSON.stringify(items.filter((item) => !item.virtual)
    .slice().sort((a, b) => a.id.localeCompare(b.id)));
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("maplibre-gl").Map | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    setFailed(false);
    setReady(false);
    previousBoundsKey.current = "";

    async function initialize() {
      try {
        const maplibre = await import("maplibre-gl");
        if (cancelled || !containerRef.current) return;
        maplibre.setWorkerUrl("/vendor/maplibre/maplibre-gl-worker.mjs");
        const map = new maplibre.Map({
          container: containerRef.current,
          style: "https://tiles.openfreemap.org/styles/liberty",
          center: [-79.5, 43.78],
          zoom: 8.3,
          attributionControl: { compact: true }
        });
        mapRef.current = map;
        map.scrollZoom.disable();
        map.addControl(new maplibre.NavigationControl({ showCompass: false }), "top-right");
        timer = setTimeout(() => { if (!cancelled) setFailed(true); }, 15000);
        map.on("load", () => {
          clearTimeout(timer);
          if (!cancelled) setReady(true);
        });
        map.on("error", () => { if (!cancelled) setFailed(true); });
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void initialize();
    return () => {
      cancelled = true;
      clearTimeout(timer);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [attempt]);

  useEffect(() => {
    if (!ready || !mapRef.current || failed) return;
    let cancelled = false;
    const markers: import("maplibre-gl").Marker[] = [];
    const popups: import("maplibre-gl").Popup[] = [];
    const removeListeners: (() => void)[] = [];
    let removeMapListeners = () => {};
    let activePopup: import("maplibre-gl").Popup | null = null;
    let signature = "";
    let pendingFocusLocation: string | null = null;

    const clearMarkers = () => {
      removeListeners.splice(0).forEach((remove) => remove());
      popups.splice(0).forEach((popup) => popup.remove());
      markers.splice(0).forEach((marker) => marker.remove());
      activePopup = null;
    };

    async function initializeMarkers() {
      const maplibre = await import("maplibre-gl");
      const map = mapRef.current;
      if (cancelled || !map) return;
      const locations = mapLocations(currentItems.current);

      const renderMarkers = () => {
        if (cancelled) return;
        const clusters = screenClusters(locations, map);
        const nextSignature = map.getZoom().toFixed(3) + "|" + clusters.map((cluster) => {
          const center = map.unproject([cluster.x, cluster.y]);
          return cluster.locations.map(locationKey).join(";") + "@" +
            center.lng.toFixed(6) + "," + center.lat.toFixed(6);
        }).join("|");
        if (nextSignature === signature) return;
        signature = nextSignature;
        clearMarkers();
        let focusAfterZoom: HTMLButtonElement | null = null;

        clusters.forEach((cluster, clusterIndex) => {
          const programs = cluster.locations.flatMap((location) => location.programs);
          const count = programs.length;
          const first = programs[0];
          const isCluster = cluster.locations.length > 1;
          const center = map.unproject([cluster.x, cluster.y]);
          const sharedAddress = !isCluster && programs.every((item) => item.address === first.address);
          const locationLabel = sharedAddress ? first.address + ", " + first.city : "this mapped location";
          const markerButton = document.createElement("button");
          markerButton.type = "button";
          markerButton.lang = "en";
          markerButton.className = "oe-map-marker" + (isCluster ? " oe-map-cluster" : "");
          markerButton.textContent = String(count);

          const marker = new maplibre.Marker({ element: markerButton })
            .setLngLat([center.lng, center.lat])
            .addTo(map);
          markers.push(marker);
          if (pendingFocusLocation && cluster.locations.some((location) => locationKey(location) === pendingFocusLocation)) {
            focusAfterZoom = markerButton;
          }

          if (isCluster) {
            const bounds = new maplibre.LngLatBounds();
            cluster.locations.forEach((location) => bounds.extend([location.longitude, location.latitude]));
            const padding = Math.min(70, map.getContainer().clientWidth * 0.18);
            const camera = map.cameraForBounds(bounds, { padding, maxZoom: 16 });
            if (camera && camera.zoom !== undefined && camera.zoom > map.getZoom() + 0.15) {
              const label = "Zoom to " + count + " programs across " + cluster.locations.length + " locations.";
              markerButton.title = label;
              markerButton.setAttribute("aria-label", label);
              const zoomToCluster = (event: MouseEvent) => {
                event.stopPropagation();
                activePopup?.remove();
                pendingFocusLocation = locationKey(cluster.locations[0]);
                // A zero-duration move respects reduced motion and lets the
                // settled map hand focus to a related, visible location marker.
                map.fitBounds(bounds, { padding, maxZoom: 16, duration: 0 });
              };
              markerButton.addEventListener("click", zoomToCluster);
              removeListeners.push(() => markerButton.removeEventListener("click", zoomToCluster));
              return;
            }
          }

          // Close coordinates can remain inseparable even at the zoom limit.
          // Their chooser still exposes every program and its actual address.
          markerButton.title = isCluster
            ? count + " programs across " + cluster.locations.length + " nearby locations"
            : count + (count === 1 ? " program at " : " programs at ") + locationLabel;
          markerButton.setAttribute("aria-label", isCluster
            ? count + " programs across " + cluster.locations.length + " nearby locations. Open program list."
            : count === 1
              ? "1 program at " + locationLabel + ": " + first.title + ". Open details."
              : count + " programs at " + locationLabel + ". Open program list.");

          if (count === 1) {
            const selectSingle = (event: MouseEvent) => {
              event.stopPropagation();
              activePopup?.remove();
              markerButton.focus({ preventScroll: true });
              onSelect(first);
            };
            markerButton.addEventListener("click", selectSingle);
            removeListeners.push(() => markerButton.removeEventListener("click", selectSingle));
            return;
          }

          const content = document.createElement("section");
          content.className = "oe-map-location-list";
          content.lang = "en";
          content.id = "oe-map-location-" + popupIdPrefix + "-" + attempt + "-" + clusterIndex;
          const heading = document.createElement("h3");
          heading.id = content.id + "-heading";
          heading.textContent = isCluster
            ? count + " programs across " + cluster.locations.length + " nearby locations"
            : count + " programs at this location";
          content.setAttribute("aria-labelledby", heading.id);
          content.append(heading);
          const address = document.createElement("p");
          address.className = "oe-map-location-address";
          address.textContent = sharedAddress
            ? locationLabel
            : "Nearby mapped coordinates. Check each provider’s address before travelling.";
          content.append(address);
          const list = document.createElement("ul");
          content.append(list);
          const popup = new maplibre.Popup({
            className: "oe-map-location-popup",
            maxWidth: "min(360px, calc(100vw - 54px))",
            offset: 26,
            focusAfterOpen: false,
            closeOnClick: true
          }).setLngLat([center.lng, center.lat]).setDOMContent(content);
          popups.push(popup);
          markerButton.setAttribute("aria-expanded", "false");
          markerButton.setAttribute("aria-controls", content.id);

          const restoreMarker = () => {
            markerButton.setAttribute("aria-expanded", "false");
            if (activePopup === popup) activePopup = null;
            if (!cancelled && markerButton.isConnected) markerButton.focus({ preventScroll: true });
          };
          popup.on("close", restoreMarker);
          removeListeners.push(() => popup.off("close", restoreMarker));

          programs.forEach((item) => {
            const row = document.createElement("li");
            const programButton = document.createElement("button");
            programButton.type = "button";
            programButton.className = "oe-map-location-program";
            const title = document.createElement("strong");
            title.textContent = item.title;
            const provider = document.createElement("span");
            provider.className = "oe-map-location-provider";
            provider.textContent = "Provider: " + item.provider;
            const date = document.createElement("span");
            date.className = "oe-map-location-date";
            date.textContent = formatDateRange(item.startDate, item.endDate);
            programButton.append(title, provider, date);
            if (isCluster) {
              const programAddress = document.createElement("span");
              programAddress.className = "oe-map-location-program-address";
              programAddress.textContent = item.address + ", " + item.city;
              programButton.append(programAddress);
            }
            programButton.setAttribute("aria-label", item.title + ". Provider: " + item.provider + ". " +
              date.textContent + (isCluster ? ". " + item.address + ", " + item.city : "") + ". Open details.");
            const selectProgram = (event: MouseEvent) => {
              event.stopPropagation();
              popup.remove();
              markerButton.focus({ preventScroll: true });
              onSelect(item);
            };
            programButton.addEventListener("click", selectProgram);
            removeListeners.push(() => programButton.removeEventListener("click", selectProgram));
            row.append(programButton);
            list.append(row);
          });

          const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            event.preventDefault();
            event.stopPropagation();
            popup.remove();
          };
          const popupContent = content.parentElement;
          const closeButton = popupContent?.querySelector<HTMLButtonElement>(".maplibregl-popup-close-button");
          closeButton?.setAttribute("aria-label", "Close program list");
          closeButton?.setAttribute("lang", "en");
          popupContent?.addEventListener("keydown", closeOnEscape);
          removeListeners.push(() => popupContent?.removeEventListener("keydown", closeOnEscape));
          const toggleList = (event: MouseEvent) => {
            event.stopPropagation();
            if (popup.isOpen()) { popup.remove(); return; }
            activePopup?.remove();
            activePopup = popup;
            popup.addTo(map);
            markerButton.setAttribute("aria-expanded", "true");
            content.querySelector<HTMLButtonElement>(".oe-map-location-program")?.focus({ preventScroll: true });
          };
          markerButton.addEventListener("click", toggleList);
          removeListeners.push(() => markerButton.removeEventListener("click", toggleList));
        });

        const nextFocus = focusAfterZoom as HTMLButtonElement | null;
        nextFocus?.focus({ preventScroll: true });
        pendingFocusLocation = null;
      };

      const boundsKey = locations.map(locationKey).sort().join("|");
      if (boundsKey !== previousBoundsKey.current) {
        previousBoundsKey.current = boundsKey;
        if (locations.length) {
          const bounds = new maplibre.LngLatBounds();
          locations.forEach((location) => bounds.extend([location.longitude, location.latitude]));
          map.fitBounds(bounds, { padding: 60, maxZoom: 12, duration: 0 });
        }
      }
      map.on("zoomend", renderMarkers);
      map.on("moveend", renderMarkers);
      map.on("resize", renderMarkers);
      removeMapListeners = () => {
        map.off("zoomend", renderMarkers);
        map.off("moveend", renderMarkers);
        map.off("resize", renderMarkers);
      };
      renderMarkers();
    }

    void initializeMarkers();
    return () => {
      cancelled = true;
      removeMapListeners();
      clearMarkers();
    };
  }, [ready, failed, mappedItemsKey, onSelect, attempt, popupIdPrefix]);

  return (
    <div className="oe-map-shell">
      <div className={`oe-map-canvas${failed ? " oe-map-hidden" : ""}`} ref={containerRef} role="region" aria-label={t(language, "map")} />
      {failed ? (
        <div className="oe-map-fallback" role="status" lang="en">
          <MapPin size={28} aria-hidden="true" />
          <h3>The map couldn’t load.</h3>
          <p>You can still explore every opportunity in the list below and open directions from its details.</p>
          <button className="oe-secondary" type="button" onClick={() => setAttempt((value) => value + 1)}>Try map again</button>
        </div>
      ) : !ready ? <p className="oe-map-loading" role="status" lang="en">Loading the neighbourhood…</p> : null}
      <p className="oe-map-caption" lang="en">Numbers count programs. Nearby locations group together; open a group to zoom in, then choose a location or program. Confirm the address with its provider. Online opportunities remain in the list below.</p>
    </div>
  );
}
