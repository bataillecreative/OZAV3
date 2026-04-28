import { useEffect, useRef } from 'react';
import maplibregl, { Map as MLMap, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Project } from '../data/projects';
import { ETATS, type EtatId } from '../data/taxonomy';
import { parseCoords, FRANCE_CENTER, FRANCE_ZOOM } from '../lib/geo';

interface FranceMapGLProps {
  projects: Project[];
  etatFilter: EtatId[];
  onSelect: (p: Project) => void;
  selectedId: string | null;
}

const STYLE_URL = '/map/style8.json';

export function FranceMapGL({ projects, etatFilter, onSelect, selectedId }: FranceMapGLProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MLMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());

  // Init map once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE_URL,
      center: FRANCE_CENTER,
      zoom: FRANCE_ZOOM,
      attributionControl: false,
    });
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
    map.addControl(new maplibregl.NavigationControl({ showCompass: false, visualizePitch: false }), 'top-right');
    mapRef.current = map;

    const ro = new ResizeObserver(() => map.resize());
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  // Sync markers when projects/filter/selection change.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const seen = new Set<string>();

    for (const p of projects) {
      const lngLat = parseCoords(p.coords);
      if (!lngLat) continue;
      seen.add(p.id);

      const dimmed = !etatFilter.includes(p.etat);
      const selected = p.id === selectedId;
      const etat = ETATS.find((e) => e.id === p.etat);
      if (!etat) continue;

      let marker = markersRef.current.get(p.id);
      if (!marker) {
        const el = document.createElement('div');
        el.className = 'oz-poi-gl';
        el.setAttribute('role', 'button');
        el.tabIndex = 0;
        el.innerHTML = `
          <span class="halo"></span>
          <span class="ring"></span>
          <span class="core"></span>
        `;
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          onSelect(p);
        });
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            onSelect(p);
          }
        });
        marker = new maplibregl.Marker({ element: el, anchor: 'center' })
          .setLngLat(lngLat)
          .addTo(map);
        markersRef.current.set(p.id, marker);
      }

      const el = marker.getElement();
      el.setAttribute('aria-label', `${p.toponym}, ${p.commune} · ${etat.label}`);
      el.style.opacity = dimmed ? '0.18' : '1';
      el.classList.toggle('selected', selected);
      el.setAttribute('aria-pressed', selected ? 'true' : 'false');
      // Sortir du tab order si dimmed (état filtré masqué)
      el.tabIndex = dimmed ? -1 : 0;
      const core = el.querySelector<HTMLElement>('.core');
      const ring = el.querySelector<HTMLElement>('.ring');
      if (core) {
        core.style.background = selected ? '#D63A6E' : etat.color;
        core.style.borderColor = selected ? '#4E4360' : etat.border;
      }
      if (ring) {
        ring.style.opacity = selected ? '1' : '0';
      }
    }

    // Remove markers for projects no longer in the list.
    for (const [id, marker] of markersRef.current) {
      if (!seen.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    }
  }, [projects, etatFilter, selectedId, onSelect]);

  return <div ref={containerRef} className="oz-carte-gl" />;
}
