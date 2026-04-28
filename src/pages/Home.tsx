import { PROJECTS } from '../data/projects';
import { Pill } from '../components/Pill';
import type { Route } from '../lib/router';

interface HomeProps {
  navigate: (r: Route) => void;
  onContribute: () => void;
  openProject: (id: string) => void;
}

export function Home({ navigate, onContribute, openProject }: HomeProps) {
  const recent = PROJECTS.slice(0, 5);

  return (
    <main>
      <section className="oz-home-hero">
        <div className="oz-container">
          <div className="oz-eyebrow oz-home-hero-eyebrow">Observatoire · 2026 · v1</div>
          <div className="oz-home-hero-split">
            <h1 className="oz-home-hero-title">
              Observatoire national<br />
              de la transformation des <span className="accent">entrées de ville</span><br />
              et des <span className="accent">zones commerciales</span><span className="accent">.</span>
            </h1>
            <div className="oz-home-hero-side">
              <p className="oz-home-hero-lede">
                <strong>Open Zones Act</strong> est la 1<sup>ère</sup> base de données
                internationale collaborative qui centralise, géolocalise, valorise
                et diffuse les données des projets de transformation d'entrées de
                ville et de zones commerciales.
              </p>
              <div className="oz-home-hero-stats">
                <div className="oz-home-hero-stat">
                  <div className="num">{PROJECTS.length}</div>
                  <div className="label">Fiches référencées</div>
                </div>
                <div className="oz-home-hero-stat">
                  <div className="num">5</div>
                  <div className="label">États suivis</div>
                </div>
                <div className="oz-home-hero-stat">
                  <div className="num">12</div>
                  <div className="label">Régions couvertes</div>
                </div>
              </div>
              <div className="oz-home-hero-actions">
                <button className="oz-btn primary lg" onClick={onContribute}>
                  Contribuer une fiche ↗
                </button>
                <div className="oz-home-hero-actions-sub">
                  <button className="oz-btn ghost" onClick={() => navigate('carte')}>
                    Ouvrir la carte
                  </button>
                  <button className="oz-btn ghost" onClick={() => navigate('galerie')}>
                    Parcourir la galerie
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="oz-band">
        <div className="oz-container">
          <div className="oz-band-grid">
            <div className="oz-band-text">
              <div className="oz-eyebrow">L'observatoire</div>
              <h2>Pourquoi Open Zones Act ?</h2>
              <p>
                La transformation des entrées de ville et des zones d'activités monofonctionnelles
                vieillissantes est un enjeu majeur pour répondre aux défis écologiques, climatiques
                et socio-économiques. Elle représente un gisement de fonciers déjà imperméabilisés
                et valorisables évalué à 80 000 ha.
              </p>
              <p>
                Open Zones Act apporte à tous les acteurs de cette transformation la connaissance,
                les informations et les inspirations nécessaires à l'engagement et à la réussite
                de leur projet, dans une logique d'essaimage.
              </p>
              <p>
                La plateforme pallie la dispersion, l'incomplétude et l'inaccessibilité des données
                de projets — qui freinent aujourd'hui leur valorisation et la transmission des
                bonnes pratiques.
              </p>
            </div>
            <div className="oz-band-cards">
              <div className="oz-promise-card">
                <div className="num">01</div>
                <h4>Centraliser</h4>
                <p>Une base unique des projets de mutation — sources publiques, contributions des collectivités, relevés in situ.</p>
                <div className="label">Méthode</div>
              </div>
              <div className="oz-promise-card">
                <div className="num">02</div>
                <h4>Géolocaliser</h4>
                <p>Chaque fiche est ancrée par ses coordonnées, sa commune, son EPCI, ses axes desservants.</p>
                <div className="label">Cadre</div>
              </div>
              <div className="oz-promise-card">
                <div className="num">03</div>
                <h4>Valoriser</h4>
                <p>Documenter par l'image et par l'éditorial — ne pas se contenter du tableur.</p>
                <div className="label">Posture</div>
              </div>
              <div className="oz-promise-card">
                <div className="num">04</div>
                <h4>Diffuser</h4>
                <p>Donnée ouverte, planches imprimables, accès libre. Le commun avant le service.</p>
                <div className="label">Diffusion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="oz-recent">
        <div className="oz-container">
          <div className="oz-section-rule">
            <span className="num">II ·</span>
            <h2>Dernières fiches versées</h2>
          </div>
          <div className="oz-recent-list">
            {recent.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className="oz-recent-row"
                onClick={() => openProject(p.id)}
                aria-label={`Ouvrir la fiche · ${p.toponym}, ${p.commune}`}
              >
                <span className="index">N° {String(i + 1).padStart(2, '0')}</span>
                <span className="name">{p.toponym}</span>
                <span className="meta">{p.commune}</span>
                <span className="typo">{p.typologie}</span>
                <span className="ha">{p.surface} ha</span>
                <Pill state={p.etat}>{p.etatLabel}</Pill>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
