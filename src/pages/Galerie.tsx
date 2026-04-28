import { useState } from 'react';
import { PROJECTS } from '../data/projects';
import { ProjectThumb } from '../components/ProjectThumb';
import { Pill } from '../components/Pill';

interface GalerieProps {
  openProject: (id: string) => void;
}

type Tab = 'toutes' | 'Centre commercial' | 'Retail park' | 'Zone commerciale périphérique' | "Zone d'activité mixte";

const TABS: { id: Tab; label: string }[] = [
  { id: 'toutes',                       label: 'Toutes' },
  { id: 'Centre commercial',            label: 'Centres commerciaux' },
  { id: 'Retail park',                  label: 'Retail parks' },
  { id: 'Zone commerciale périphérique', label: 'ZAC' },
  { id: "Zone d'activité mixte",        label: 'Zones mixtes' },
];

export function Galerie({ openProject }: GalerieProps) {
  const [tab, setTab] = useState<Tab>('toutes');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = tab === 'toutes' ? PROJECTS : PROJECTS.filter((p) => p.typologie === tab);

  return (
    <main>
      <div className="oz-container">
        <section className="oz-galerie-head">
          <div className="oz-eyebrow">II · Galerie · {PROJECTS.length} fiches</div>
          <h1>Galerie des projets.</h1>
          <p className="lede">
            Chaque fiche est une lecture cartographique d'une zone — toponyme, méta, diagnostic,
            paragraphes éditoriaux. Filtrer par typologie, ouvrir pour lire.
          </p>
        </section>

        <div className="oz-galerie-bar">
          <div className="left" role="tablist" aria-label="Filtre par typologie">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={'oz-galerie-tab ' + (tab === t.id ? 'active' : '')}
                onClick={() => setTab(t.id)}
              >
                {t.label} {t.id === 'toutes' ? `(${PROJECTS.length})` : ''}
              </button>
            ))}
          </div>
          <div className="right">
            <span aria-live="polite">{filtered.length} résultats</span>
            <div className="oz-view-toggle" role="group" aria-label="Mode d'affichage">
              <button
                type="button"
                aria-pressed={view === 'grid'}
                className={view === 'grid' ? 'active' : ''}
                onClick={() => setView('grid')}
              >
                Grille
              </button>
              <button
                type="button"
                aria-pressed={view === 'list'}
                className={view === 'list' ? 'active' : ''}
                onClick={() => setView('list')}
              >
                Liste
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="oz-empty-notice" role="status">
            Aucune fiche ne correspond à cette typologie.
            <br />
            <button type="button" className="oz-empty-reset" onClick={() => setTab('toutes')}>
              Voir toutes les fiches ↗
            </button>
          </div>
        )}

        {filtered.length > 0 && (view === 'grid' ? (
          <div className="oz-galerie-grid">
            {filtered.map((p, i) => (
              <article key={p.id} className="oz-galerie-card">
                <button
                  type="button"
                  className="oz-galerie-card-link"
                  onClick={() => openProject(p.id)}
                  aria-label={`Ouvrir la fiche · ${p.toponym}, ${p.commune}`}
                />
                <div className="oz-galerie-thumb">
                  <ProjectThumb project={p} />
                  <span className="corner">N° {String(i + 1).padStart(2, '0')} · {p.region.split('-')[0]}</span>
                  <Pill state={p.etat} className="pill-pos">{p.etatLabel}</Pill>
                </div>
                <div className="top">
                  <span>{p.typologie}</span>
                  <span>{p.annee}</span>
                </div>
                <h3>{p.toponym}</h3>
                <p className="meta">{p.commune} · {p.departement}</p>
                <div className="stats">
                  <span>{p.surface} ha</span>
                  <span>{p.enseignes} enseignes</span>
                  <span>{p.axes}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="oz-galerie-list">
            {filtered.map((p, i) => (
              <article key={p.id} className="oz-galerie-list-row">
                <button
                  type="button"
                  className="oz-galerie-card-link"
                  onClick={() => openProject(p.id)}
                  aria-label={`Ouvrir la fiche · ${p.toponym}, ${p.commune}`}
                />
                <span className="idx">N° {String(i + 1).padStart(2, '0')}</span>
                <div className="mini-thumb"><ProjectThumb project={p} /></div>
                <h3 className="name">{p.toponym}</h3>
                <span className="commune">{p.commune}</span>
                <span className="typo">{p.typologie}</span>
                <span className="ha">{p.surface} ha</span>
                <Pill state={p.etat}>{p.etatLabel}</Pill>
              </article>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
