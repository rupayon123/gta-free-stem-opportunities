"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { t } from "@/lib/i18n";
import type { LanguageCode, Opportunity } from "@/lib/types";
import { mapLocations, type MapLocation } from "@/lib/mapLocations";
import { formatDateRange } from "@/lib/utils";
import "maplibre-gl/dist/maplibre-gl.css";
import "./ExplorerMapLocations.css";

type ProjectedMapCluster = {
  locations: MapLocation[];
  x: number;
  y: number;
};

const MARKER_SEPARATION_PX = 52;

function mapContentPadding(map: import("maplibre-gl").Map) {
  const attribution = map.getContainer().querySelector<HTMLElement>(".maplibregl-ctrl-attrib");
  return { top: 110, right: 76, bottom: Math.max(48, (attribution?.offsetHeight ?? 24) + 28), left: 32 };
}

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
  const programPanelRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("maplibre-gl").Map | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [is3D, setIs3D] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [focusRequest, setFocusRequest] = useState(0);
  const requestedLocation = useRef<string | null>(null);
  const visibleLocations = mapLocations(items);
  const unmappedCount = items.filter((item) => !item.virtual).length - visibleLocations.reduce((sum, location) => sum + location.programs.length, 0);

  const chooseLocation = (key: string) => {
    const location = visibleLocations.find((candidate) => locationKey(candidate) === key);
    const map = mapRef.current;
    if (!location || !map) return;
    requestedLocation.current = key;
    setFocusRequest((value) => value + 1);
    map.jumpTo({ center: [location.longitude, location.latitude], zoom: 16, pitch: 0, bearing: 0 });
    setShowGroups(true);
    setIs3D(false);
  };

  const changePerspective = (threeDimensions: boolean) => {
    const map = mapRef.current;
    if (!map || !ready || failed) return;
    const locations = mapLocations(currentItems.current);
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 400;
    if (threeDimensions && locations.length) {
      const center = map.getCenter();
      const nearest = locations.reduce((best, location) =>
        Math.hypot(location.longitude - center.lng, location.latitude - center.lat) <
        Math.hypot(best.longitude - center.lng, best.latitude - center.lat) ? location : best);
      map.easeTo({ center: [nearest.longitude, nearest.latitude], zoom: Math.max(15.5, map.getZoom()), pitch: 55, bearing: -20, duration });
    } else {
      map.easeTo({ pitch: 0, bearing: 0, duration });
    }
    setIs3D(threeDimensions);
    if (threeDimensions) setShowGroups(true);
  };

  const showAllLocations = async () => {
    const map = mapRef.current;
    const locations = mapLocations(currentItems.current);
    if (!map || !ready || failed || !locations.length) return;
    const { LngLatBounds } = await import("maplibre-gl");
    // A retry can replace the map while the module loads.
    if (map !== mapRef.current) return;
    const bounds = new LngLatBounds();
    locations.forEach((location) => bounds.extend([location.longitude, location.latitude]));
    map.fitBounds(bounds, { padding: mapContentPadding(map), maxZoom: 12, pitch: 0, bearing: 0, duration: 0 });
    setIs3D(false);
    setShowGroups(false);
  };

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let themeObserver: MutationObserver | undefined;
    setFailed(false);
    setReady(false);
    setIs3D(false);
    previousBoundsKey.current = "";

    async function initialize() {
      try {
        const maplibre = await import("maplibre-gl");
        if (cancelled || !containerRef.current) return;
        maplibre.setWorkerUrl("/vendor/maplibre/maplibre-gl-worker.mjs");
        const map = new maplibre.Map({
          container: containerRef.current,
          style: "https://tiles.openfreemap.org/styles/" + (document.documentElement.dataset.theme === "dark" ? "dark" : "liberty"),
          center: [-79.5, 43.78],
          zoom: 8.3,
          attributionControl: { compact: true }
        });
        // Liberty includes buildings; the dark style needs the same real vector
        // height layer added after each style load (including theme changes).
        map.on("style.load", () => {
          if (cancelled || map.getLayer("building-3d")) return;
          if (!map.getSource("openmaptiles")) return;
          const labels = map.getStyle().layers.find((layer) => layer.type === "symbol")?.id;
          map.addLayer({ id: "building-3d", type: "fill-extrusion", source: "openmaptiles", "source-layer": "building", minzoom: 14,
            paint: { "fill-extrusion-color": "#667887", "fill-extrusion-height": ["coalesce", ["get", "render_height"], 0], "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0], "fill-extrusion-opacity": 0.85 }
          }, labels);
        });
        mapRef.current = map;
        map.scrollZoom.disable();
        map.addControl(new maplibre.NavigationControl({ showCompass: true, visualizePitch: true }), "top-right");
        themeObserver = new MutationObserver(() => {
          if (!cancelled) map.setStyle("https://tiles.openfreemap.org/styles/" + (document.documentElement.dataset.theme === "dark" ? "dark" : "liberty"));
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        map.on("pitchend", () => { if (!cancelled) setIs3D(map.getPitch() > 1); });
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
      themeObserver?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [attempt]);

  useEffect(() => {
    if (!ready || !mapRef.current || failed) return;
    let cancelled = false;
    const markers: import("maplibre-gl").Marker[] = [];
    type ProgramChooser = { remove: () => void; isOpen: () => boolean; open: () => void };
    const popups: ProgramChooser[] = [];
    const removeListeners: (() => void)[] = [];
    let removeMapListeners = () => {};
    let activePopup: ProgramChooser | null = null;
    let signature = "";
    let openRequestedProgramList = requestedLocation.current !== null;
    let pendingFocusLocation: string | null = requestedLocation.current;
    requestedLocation.current = null;

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
        if (!showGroups) {
          clearMarkers();
          // Every source coordinate stays visible in the overview. These are
          // visual points, not overlapping tiny buttons: the location selector
          // and grouped view provide full-size keyboard and touch controls.
          locations.forEach((location) => {
            const dot = document.createElement("span");
            dot.className = "oe-map-venue-dot";
            dot.setAttribute("aria-hidden", "true");
            dot.dataset.location = locationKey(location);
            markers.push(new maplibre.Marker({ element: dot })
              .setLngLat([location.longitude, location.latitude]).addTo(map));
          });
          return;
        }
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
          const sharedAddress = !isCluster && programs.every((item) => item.address === first.address && item.city === first.city);
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
            const padding = mapContentPadding(map);
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
            : sharedAddress ? count + " programs at this location" : count + " programs sharing a map pin";
          content.setAttribute("aria-labelledby", heading.id);
          content.append(heading);
          const address = document.createElement("p");
          address.className = "oe-map-location-address";
          address.textContent = sharedAddress
            ? locationLabel
            : "These programs share a map area. Check each address below with its provider before travelling.";
          content.append(address);
          const list = document.createElement("ul");
          content.append(list);
          let chooserOpen = false;
          const popup: ProgramChooser = {
            isOpen: () => chooserOpen,
            open: () => {
              const panel = programPanelRef.current;
              if (!panel) return;
              panel.replaceChildren(content);
              panel.hidden = false;
              chooserOpen = true;
              panel.scrollIntoView({ block: "nearest", behavior: "instant" });
            },
            remove: () => {
              if (!chooserOpen) return;
              chooserOpen = false;
              content.remove();
              if (programPanelRef.current) programPanelRef.current.hidden = true;
              restoreMarker();
            }
          };
          popups.push(popup);
          markerButton.setAttribute("aria-expanded", "false");
          markerButton.setAttribute("aria-controls", content.id);

          const restoreMarker = () => {
            markerButton.setAttribute("aria-expanded", "false");
            if (activePopup === popup) activePopup = null;
            if (!cancelled && markerButton.isConnected) markerButton.focus({ preventScroll: true });
          };


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
            if (!sharedAddress) {
              const programAddress = document.createElement("span");
              programAddress.className = "oe-map-location-program-address";
              programAddress.textContent = item.address + ", " + item.city;
              programButton.append(programAddress);
            }
            programButton.setAttribute("aria-label", item.title + ". Provider: " + item.provider + ". " +
              date.textContent + (!sharedAddress ? ". " + item.address + ", " + item.city : "") + ". Open details.");
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
          const closeButton = document.createElement("button");
          closeButton.type = "button";
          closeButton.className = "oe-map-chooser-close";
          closeButton.textContent = "Close program list";
          closeButton.addEventListener("click", popup.remove);
          content.prepend(closeButton);
          content.addEventListener("keydown", closeOnEscape);
          removeListeners.push(() => {
            closeButton.removeEventListener("click", popup.remove);
            content.removeEventListener("keydown", closeOnEscape);
          });
          const toggleList = (event: MouseEvent) => {
            event.stopPropagation();
            if (popup.isOpen()) { popup.remove(); return; }
            activePopup?.remove();
            activePopup = popup;
            popup.open();
            markerButton.setAttribute("aria-expanded", "true");
            content.querySelector<HTMLButtonElement>(".oe-map-location-program")?.focus({ preventScroll: true });
          };
          markerButton.addEventListener("click", toggleList);
          removeListeners.push(() => markerButton.removeEventListener("click", toggleList));
        });

        const nextFocus = focusAfterZoom as HTMLButtonElement | null;
        nextFocus?.focus({ preventScroll: true });
        pendingFocusLocation = null;
        if (nextFocus && openRequestedProgramList) {
          openRequestedProgramList = false;
          nextFocus.click();
        }
      };

      // Refit when the actual filtered program set changes, including programs
      // sharing the same coordinates. Perspective must not hide filtered results.
      const boundsKey = locations.map((location) => locationKey(location) + ":" +
        location.programs.map((program) => program.id).sort().join(",")).sort().join("|");
      const fitLocations = () => {
        if (!locations.length) return;
        const bounds = new maplibre.LngLatBounds();
        locations.forEach((location) => bounds.extend([location.longitude, location.latitude]));
        map.fitBounds(bounds, { padding: mapContentPadding(map), maxZoom: 12, pitch: 0, bearing: 0, duration: 0 });
        setIs3D(false);
      };
      if (boundsKey !== previousBoundsKey.current) {
        previousBoundsKey.current = boundsKey;
        fitLocations();
      }
      const resizeMap = () => { fitLocations(); renderMarkers(); };
      const inspectArea = (event: import("maplibre-gl").MapMouseEvent) => {
        if (showGroups) return;
        const nearby = locations.filter((location) => {
          const point = map.project([location.longitude, location.latitude]);
          return Math.hypot(point.x - event.point.x, point.y - event.point.y) <= 24;
        });
        if (!nearby.length) return;
        const bounds = new maplibre.LngLatBounds();
        nearby.forEach((location) => bounds.extend([location.longitude, location.latitude]));
        requestedLocation.current = locationKey(nearby[0]);
        map.fitBounds(bounds, { padding: mapContentPadding(map), maxZoom: 16, pitch: 0, bearing: 0, duration: 0 });
        setShowGroups(true);
        setIs3D(false);
      };
      map.on("click", inspectArea);
      map.on("zoomend", renderMarkers);
      map.on("moveend", renderMarkers);
      map.on("resize", resizeMap);
      removeMapListeners = () => {
        map.off("click", inspectArea);
        map.off("zoomend", renderMarkers);
        map.off("moveend", renderMarkers);
        map.off("resize", resizeMap);
      };
      renderMarkers();
    }

    void initializeMarkers();
    return () => {
      cancelled = true;
      removeMapListeners();
      clearMarkers();
    };
  }, [ready, failed, mappedItemsKey, onSelect, attempt, popupIdPrefix, showGroups, focusRequest]);

  return (
    <div className="oe-map-shell">
      <div className={`oe-map-canvas${failed ? " oe-map-hidden" : ""}`} ref={containerRef} role="region" aria-label={t(language, "map")} />
      {ready && !failed && <div className="oe-map-perspective" role="group" aria-label="Map controls" lang="en">
        <button type="button" aria-pressed={!showGroups} onClick={() => setShowGroups(false)}>Venues</button>
        <button type="button" aria-pressed={showGroups} onClick={() => setShowGroups(true)}>Program groups</button>
        <span className="oe-map-dimensions" role="group" aria-label="Perspective">
        <button type="button" aria-pressed={!is3D} onClick={() => changePerspective(false)}>2D</button>
        <button type="button" aria-pressed={is3D} disabled={!mapLocations(items).length} onClick={() => changePerspective(true)}>3D</button>
        </span>
        <button type="button" disabled={!mapLocations(items).length} onClick={() => void showAllLocations()}>Show all locations</button>
        <label className="oe-map-venue-picker">
          <span>Choose a location ({visibleLocations.length})</span>
          <select value="" disabled={!visibleLocations.length} onChange={(event) => chooseLocation(event.target.value)}>
            <option value="">Select a venue to see its programs</option>
            {visibleLocations.slice().sort((a, b) => a.programs[0].address.localeCompare(b.programs[0].address)).map((location) =>
              <option key={locationKey(location)} value={locationKey(location)}>{location.programs[0].address}, {location.programs[0].city} · {location.programs.length} programs</option>)}
          </select>
        </label>
      </div>}
      <div className="oe-map-program-panel" ref={programPanelRef} hidden />
      {failed ? (
        <div className="oe-map-fallback" role="status" lang="en">
          <MapPin size={28} aria-hidden="true" />
          <h3>The map couldn’t load.</h3>
          <p>You can still explore every opportunity in the list below and open directions from its details.</p>
          <button className="oe-secondary" type="button" onClick={() => setAttempt((value) => value + 1)}>Try map again</button>
        </div>
      ) : !ready ? <p className="oe-map-loading" role="status" lang="en">Loading the neighbourhood…</p> : null}
      <p className="oe-map-caption" lang="en">Each dot marks a mapped venue. Tap an area or choose a location to explore its programs. Program groups show counts and open to reveal nearby locations. 3D opens a nearby program location; building heights appear where map data is available. Confirm the address with its provider. Online opportunities remain in the list below.{unmappedCount > 0 && ` ${unmappedCount} programs have no usable map coordinates; find them in List view.`}</p>
    </div>
  );
}
