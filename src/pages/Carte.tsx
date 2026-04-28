import { useState } from 'react';
import { PROJECTS, type Project } from '../data/projects';
import { ETATS, TYPOLOGIES, REGIONS, type EtatId, type Typologie, type Region } from '../data/taxonomy';
import { FranceMapGL } from '../components/FranceMapGL';
import { Pill } from '../components/Pill';

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

  const filtered = PROJECTS.filter(
    (p) =>
      activeStates.includes(p.etat) &&
      activeTypos.includes(p.typologie) &&
      (activeRegions.length === REGIONS.length || activeRegions.includes(p.region)) &&
      p.surface >= surfaceMin &&
      (!search ||
        p.toponym.toLowerCase().includes(search.toLowerCase()) ||
        p.commune.toLowerCase().includes(search.toLowerCase())),
  );

  const counts = ETATS.reduce<Record<EtatId, number>>(
    (acc, e) => {
      acc[e.id] = PROJECTS.filter((p) => p.etat === e.id).length;
      return acc;
    },
    { amont: 0, etudes: 0, chantier: 0, realise: 0, arrete: 0 },
  );

  return (
    <main className="oz-carte-shell">
      <h1 className="sr-only">Carte interactive · Open Zones Act</h1>
      <aside className="oz-carte-sidebar" aria-label="Filtres et recherche">
        <div className="oz-eyebrow">Carte interactive</div>
        <h2>{filtered.length} fiches sur le territoire</h2>

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
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: e.color,
                        border: `1px solid ${e.border}`,
                        display: 'inline-block',
                      }}
                    />
                    {e.label}
                  </span>
                </span>
                <span className="num">{counts[e.id]}</span>
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
                <span className="num">{PROJECTS.filter((p) => p.typologie === t).length}</span>
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
                <span className="num">{PROJECTS.filter((p) => p.region === r).length}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="oz-carte-canvas">
        <FranceMapGL
          projects={filtered}
          etatFilter={activeStates}
          onSelect={(p) => setSelected(p)}
          selectedId={selected?.id ?? null}
        />

        <div className="oz-carte-slate">
          <span className="h">05·42 — pre-dawn</span>
          <span>France métropolitaine · échelle 1/4 000 000</span>
        </div>

        <div className="oz-carte-toolbar" role="toolbar" aria-label="Outils de carte">
          <button type="button" className="oz-carte-tool" aria-label="Zoom avant">+</button>
          <button type="button" className="oz-carte-tool" aria-label="Zoom arrière">−</button>
          <button
            type="button"
            className="oz-carte-tool"
            aria-label="Recentrer la carte"
            style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}
          >
            ⌂
          </button>
        </div>

        <div className="oz-carte-attrib">© OSM · IGN · OZA 2026</div>

        {selected && (
          <div
            className="oz-fiche-popover"
            role="dialog"
            aria-label={`Fiche projet · ${selected.toponym}`}
            style={{ top: '50%', left: 380, transform: 'translateY(-50%)' }}
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
