import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PROJECTS, type Project } from '../data/projects';
import { ETATS, TYPOLOGIES, REGIONS, type EtatId, type Typologie, type Region } from '../data/taxonomy';
import { FranceMapGL } from '../components/FranceMapGL';
import { Pill } from '../components/Pill';
import { useDialog } from '../lib/useDialog';

/**
 * Place le popover à côté du marker source, en restant à l'intérieur du viewport.
 * Priorité : à droite du marker (offset 16px) ; bascule à gauche si on déborde.
 * Vertical : centré sur le marker, clamp au viewport avec une marge de 16px.
 */
const POPOVER_W = 320;
const POPOVER_H = 340; // hauteur réelle mesurée ~315px ; conservative pour clamp
const GAP = 16;
function computePopoverPos(rect: DOMRect) {
  const { innerWidth: vw, innerHeight: vh } = window;
  const markerCx = rect.left + rect.width / 2;
  const markerCy = rect.top + rect.height / 2;
  // Horizontal — préférence droite
  let left = rect.right + GAP;
  if (left + POPOVER_W + GAP > vw) {
    // pas la place à droite → bascule à gauche du marker
    left = rect.left - POPOVER_W - GAP;
  }
  // Si toujours hors viewport (marker centré sur un petit écran), recule au max possible
  left = Math.max(GAP, Math.min(left, vw - POPOVER_W - GAP));
  // Vertical — centré sur le marker
  let top = markerCy - POPOVER_H / 2;
  top = Math.max(GAP, Math.min(top, vh - POPOVER_H - GAP));
  return { top, left, markerCx, markerCy };
}

// Counts par état · indépendant des filtres, on le calcule une seule fois.
const ETAT_COUNTS = ETATS.reduce<Record<EtatId, number>>(
  (acc, e) => {
    acc[e.id] = PROJECTS.filter((p) => p.etat === e.id).length;
    return acc;
  },
  { amont: 0, etudes: 0, chantier: 0, realise: 0, arrete: 0 },
);
// Counts par typologie · pareil.
const TYPO_COUNTS = Object.fromEntries(
  TYPOLOGIES.map((t) => [t, PROJECTS.filter((p) => p.typologie === t).length]),
) as Record<Typologie, number>;
// Counts par région · pareil.
const REGION_COUNTS = Object.fromEntries(
  REGIONS.map((r) => [r, PROJECTS.filter((p) => p.region === r).length]),
) as Record<Region, number>;

interface CarteProps {
  openProject: (id: string) => void;
}

export function Carte({ openProject }: CarteProps) {
  const [activeStates, setActiveStates] = useState<EtatId[]>(ETATS.map((e) => e.id));
  const [activeTypos, setActiveTypos] = useState<Typologie[]>([...TYPOLOGIES]);
  const [activeRegions, setActiveRegions] = useState<Region[]>([...REGIONS]);
  const [surfaceMin, setSurfaceMin] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const [search, setSearch] = useState('');
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number } | null>(null);
  // Tient le DOM du dernier marker cliqué pour y rendre le focus à la fermeture du popover.
  const lastMarkerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const closePopover = useCallback(() => setSelected(null), []);

  const popoverRef = useDialog<HTMLDivElement>({
    open: selected !== null,
    onClose: closePopover,
    initialFocusRef: closeBtnRef,
    returnFocusRef: lastMarkerRef,
  });

  // Recompute pos sur window resize si popover ouvert.
  useEffect(() => {
    if (!selected) return;
    const recompute = () => {
      const el = lastMarkerRef.current;
      if (!el) return;
      const { top, left } = computePopoverPos(el.getBoundingClientRect());
      setPopoverPos({ top, left });
    };
    window.addEventListener('resize', recompute);
    return () => window.removeEventListener('resize', recompute);
  }, [selected]);

  const toggleEtat = (v: EtatId) =>
    setActiveStates((arr) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]));
  const toggleTypo = (v: Typologie) =>
    setActiveTypos((arr) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]));
  const toggleRegion = (v: Region) =>
    setActiveRegions((arr) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]));

  const resetFilters = () => {
    setActiveStates(ETATS.map((e) => e.id));
    setActiveTypos([...TYPOLOGIES]);
    setActiveRegions([...REGIONS]);
    setSurfaceMin(0);
    setSearch('');
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return PROJECTS.filter(
      (p) =>
        activeStates.includes(p.etat) &&
        activeTypos.includes(p.typologie) &&
        (activeRegions.length === REGIONS.length || activeRegions.includes(p.region)) &&
        p.surface >= surfaceMin &&
        (!q ||
          p.toponym.toLowerCase().includes(q) ||
          p.commune.toLowerCase().includes(q)),
    );
  }, [activeStates, activeTypos, activeRegions, surfaceMin, search]);

  const handleMarkerSelect = useCallback((p: Project, el: HTMLElement) => {
    lastMarkerRef.current = el;
    const { top, left } = computePopoverPos(el.getBoundingClientRect());
    setPopoverPos({ top, left });
    setSelected(p);
  }, []);

  return (
    <main className="oz-carte-shell">
      <h1 className="sr-only">Carte interactive · Open Zone Acte</h1>
      <aside className="oz-carte-sidebar" aria-label="Filtres et recherche">
        {filtered.length === 0 && (
          <div className="oz-empty-notice" role="status">
            Aucune fiche ne correspond aux filtres actifs.
            <br />
            <button type="button" className="oz-empty-reset" onClick={resetFilters}>
              Réinitialiser les filtres ↗
            </button>
          </div>
        )}

        <div className="oz-filter-group">
          <label htmlFor="oz-carte-search" className="sr-only">
            Rechercher un toponyme ou une commune
          </label>
          <input
            id="oz-carte-search"
            type="search"
            className="oz-filter-search"
            placeholder="Rechercher un toponyme, une commune…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="oz-filter-group" role="group" aria-labelledby="oz-filter-title-etats">
          <div className="oz-filter-title" id="oz-filter-title-etats">
            État d'avancement <span className="count">{activeStates.length}/{ETATS.length}</span>
          </div>
          {ETATS.map((e) => {
            const checked = activeStates.includes(e.id);
            return (
              <button
                key={e.id}
                type="button"
                role="checkbox"
                aria-checked={checked}
                className={'oz-filter-row ' + (checked ? 'checked' : '')}
                onClick={() => toggleEtat(e.id)}
              >
                <span className="left">
                  <span className="check" aria-hidden="true" />
                  <span className="oz-etat-row">
                    <span className="oz-etat-dot" data-etat={e.id} aria-hidden="true" />
                    {e.label}
                  </span>
                </span>
                <span className="num">{ETAT_COUNTS[e.id]}</span>
              </button>
            );
          })}
        </div>

        <div className="oz-filter-group" role="group" aria-labelledby="oz-filter-title-typos">
          <div className="oz-filter-title" id="oz-filter-title-typos">
            Typologie <span className="count">{activeTypos.length}/{TYPOLOGIES.length}</span>
          </div>
          {TYPOLOGIES.map((t) => {
            const checked = activeTypos.includes(t);
            return (
              <button
                key={t}
                type="button"
                role="checkbox"
                aria-checked={checked}
                className={'oz-filter-row ' + (checked ? 'checked' : '')}
                onClick={() => toggleTypo(t)}
              >
                <span className="left">
                  <span className="check" aria-hidden="true" />
                  <span>{t}</span>
                </span>
                <span className="num">{TYPO_COUNTS[t]}</span>
              </button>
            );
          })}
        </div>

        <div className="oz-filter-group">
          <label className="oz-filter-title" htmlFor="oz-range-surface">Surface ≥</label>
          <div className="oz-range-readout" aria-live="polite">à partir de {surfaceMin} ha</div>
          <input
            id="oz-range-surface"
            type="range"
            className="oz-range-input"
            min={0}
            max={200}
            step={5}
            value={surfaceMin}
            onChange={(e) => setSurfaceMin(+e.target.value)}
            aria-valuetext={`${surfaceMin} hectares minimum`}
          />
          <div className="oz-range-bounds">
            <span>0 ha</span>
            <span>200 ha</span>
          </div>
        </div>

        <div className="oz-filter-group" role="group" aria-labelledby="oz-filter-title-regions">
          <div className="oz-filter-title" id="oz-filter-title-regions">
            Région <span className="count">{activeRegions.length}/{REGIONS.length}</span>
          </div>
          {REGIONS.slice(0, 5).map((r) => {
            const checked = activeRegions.includes(r);
            return (
              <button
                key={r}
                type="button"
                role="checkbox"
                aria-checked={checked}
                className={'oz-filter-row ' + (checked ? 'checked' : '')}
                onClick={() => toggleRegion(r)}
              >
                <span className="left">
                  <span className="check" aria-hidden="true" />
                  <span>{r}</span>
                </span>
                <span className="num">{REGION_COUNTS[r]}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="oz-carte-canvas">
        <FranceMapGL
          projects={filtered}
          etatFilter={activeStates}
          onSelect={handleMarkerSelect}
          selectedId={selected?.id ?? null}
          onMapMove={closePopover}
        />

        <div className="oz-carte-slate">
          <span className="h">05·42 — pre-dawn</span>
          <span>France métropolitaine · échelle 1/4 000 000</span>
        </div>

        <div className="oz-carte-attrib">© OSM · IGN · OZA 2026</div>

        {selected && popoverPos && (
          <div
            ref={popoverRef}
            className="oz-fiche-popover"
            role="dialog"
            aria-modal="true"
            aria-label={`Fiche projet · ${selected.toponym}`}
            style={{ top: popoverPos.top, left: popoverPos.left }}
          >
            <div className="head">
              <div>
                <Pill state={selected.etat} className="">
                  {selected.etatLabel}
                </Pill>
                <div className="toponym" style={{ marginTop: 8 }}>
                  {selected.toponym}
                </div>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                className="close"
                aria-label="Fermer la fiche"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </div>
            <div className="commune">
              {selected.commune} · {selected.departement}
            </div>
            <div className="stats">
              <div className="stat">
                <div className="label">Surface</div>
                <div className="v">{selected.surface} <span className="unit">ha</span></div>
              </div>
              <div className="stat">
                <div className="label">Enseignes</div>
                <div className="v">{selected.enseignes}</div>
              </div>
              <div className="stat">
                <div className="label">Année</div>
                <div className="v">{selected.annee}</div>
              </div>
              <div className="stat">
                <div className="label">Typologie</div>
                <div className="v body">{selected.typologie}</div>
              </div>
            </div>
            <button type="button" className="open-link" onClick={() => openProject(selected.id)}>
              <span>Ouvrir la fiche</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
