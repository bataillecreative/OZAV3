import { PROJECTS } from '../data/projects';
import { ETATS } from '../data/taxonomy';
import { FicheMapMini } from '../components/FicheMapMini';
import { Pill } from '../components/Pill';
import type { Route } from '../lib/router';

interface FicheProps {
  projectId: string | null;
  navigate: (r: Route) => void;
}

export function Fiche({ projectId, navigate }: FicheProps) {
  const project = projectId ? PROJECTS.find((p) => p.id === projectId) : null;
  if (!project) return null;
  const stepIdx = ETATS.findIndex((e) => e.id === project.etat);

  return (
    <main className="oz-fiche-shell">
      <div className="oz-container">
        <button
          type="button"
          className="oz-fiche-back"
          onClick={() => navigate('galerie')}
        >
          <span aria-hidden="true">← </span>Retour à la galerie
        </button>

        <section className="oz-fiche-hero">
          <div className="eyebrow-row">
            <span className="oz-eyebrow">Fiche · {project.region.toUpperCase()}</span>
            <Pill state={project.etat}>{project.etatLabel}</Pill>
            <Pill>{project.typologie}</Pill>
          </div>
          <h1>{project.toponym}</h1>

          <ol className="oz-fiche-progress" aria-label="Avancement du projet">
            {ETATS.map((e, i) => {
              const status = i < stepIdx ? 'done' : i === stepIdx ? 'current' : '';
              return (
                <li
                  key={e.id}
                  className={'step ' + status}
                  {...(i === stepIdx ? { 'aria-current': 'step' } : {})}
                >
                  <span>{String(i + 1).padStart(2, '0')} · {e.label}</span>
                  <span className="yr">{i === stepIdx ? 'en cours' : i < stepIdx ? 'validé' : 'à venir'}</span>
                </li>
              );
            })}
          </ol>

          <div className="meta-row">
            <div className="oz-fiche-meta-col">
              <span className="oz-fiche-meta-label">Commune</span>
              <span className="oz-fiche-meta-value">{project.commune}</span>
            </div>
            <div className="oz-fiche-meta-col">
              <span className="oz-fiche-meta-label">Département</span>
              <span className="oz-fiche-meta-value">{project.departement}</span>
            </div>
            <div className="oz-fiche-meta-col">
              <span className="oz-fiche-meta-label">Coordonnées</span>
              <span className="oz-fiche-meta-value mono">{project.coords}</span>
            </div>
            <div className="oz-fiche-meta-col">
              <span className="oz-fiche-meta-label">Surface · enseignes</span>
              <span className="oz-fiche-meta-value mono">{project.surface} ha · {project.enseignes}</span>
            </div>
          </div>
        </section>

        <section className="oz-fiche-quote">
          <p>« {project.quote} »</p>
          <cite>— {project.attrib}</cite>
        </section>

        <section className="oz-fiche-carto-row" aria-label="Cartographie du projet">
          <FicheMapMini project={project} />
          <aside className="oz-legend" aria-labelledby="oz-legend-title">
            <h3 id="oz-legend-title">Légende</h3>
            <div className="oz-legend-group">
              <div className="oz-legend-group-title">Réseau</div>
              <div className="oz-legend-row">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ height: 4, background: '#4E4360' }} />
                  <span style={{ height: 3, background: '#8C7B96' }} />
                  <span style={{ height: 4, background: '#4E4360' }} />
                </div>
                <span>Autoroute</span>
              </div>
              <div className="oz-legend-row">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ height: 3, background: '#7A5224' }} />
                  <span style={{ height: 2, background: '#E8C282' }} />
                  <span style={{ height: 3, background: '#7A5224' }} />
                </div>
                <span>Artère urbaine</span>
              </div>
            </div>
            <div className="oz-legend-group">
              <div className="oz-legend-group-title">Surfaces</div>
              <div className="oz-legend-row">
                <div className="oz-legend-fill" style={{ background: '#8C7B96', borderColor: '#4E4360' }} />
                <span>Zone commerciale</span>
              </div>
              <div className="oz-legend-row">
                <div className="oz-legend-fill" style={{ background: '#E8C282', borderColor: '#7A5224', borderStyle: 'dashed' }} />
                <span>Projet en cours</span>
              </div>
              <div className="oz-legend-row">
                <div className="oz-legend-fill" style={{ background: '#BBC5BB', borderColor: 'transparent' }} />
                <span>Sols perméables</span>
              </div>
              <div className="oz-legend-row">
                <div className="oz-legend-fill" style={{ background: '#8AAFB6', borderColor: 'transparent' }} />
                <span>Eau</span>
              </div>
            </div>
            <div className="oz-legend-group">
              <div className="oz-legend-group-title">Points</div>
              <div className="oz-legend-row">
                <div className="oz-legend-poi-dot">
                  <span className="ring" />
                  <span className="core" />
                </div>
                <span>POI majeur</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="oz-fiche-meta-block">
          <div className="oz-section-rule">
            <span className="num">III ·</span>
            <h2>Métadonnées</h2>
          </div>
          <div className="oz-fiche-meta-grid">
            <div className="oz-fiche-meta-cell">
              <div className="label">Surface</div>
              <div className="v">{project.surface}<span className="unit"> ha</span></div>
            </div>
            <div className="oz-fiche-meta-cell">
              <div className="label">Enseignes</div>
              <div className="v">{project.enseignes}</div>
              <div className="note">tous formats confondus</div>
            </div>
            <div className="oz-fiche-meta-cell">
              <div className="label">Année d'ouverture</div>
              <div className="v">{project.annee}</div>
            </div>
            <div className="oz-fiche-meta-cell">
              <div className="label">Locomotive</div>
              <div className="v body">{project.locomotive}</div>
            </div>
            <div className="oz-fiche-meta-cell">
              <div className="label">Axes desservants</div>
              <div className="v medium">{project.axes}</div>
            </div>
            <div className="oz-fiche-meta-cell">
              <div className="label">État d'avancement</div>
              <div className="v medium">{project.etatLabel}</div>
            </div>
            <div className="oz-fiche-meta-cell">
              <div className="label">Typologie</div>
              <div className="v body-sm">{project.typologie}</div>
            </div>
            <div className="oz-fiche-meta-cell">
              <div className="label">Région</div>
              <div className="v body">{project.region}</div>
            </div>
          </div>
        </section>

        <section className="oz-editorial">
          <div className="oz-eyebrow">Diagnostic · note de lecture</div>
          <h2>{project.diagnosticTitre}</h2>
          <p className="lede">{project.diagnosticLede}</p>
          {project.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'dropcap' : ''}>{p}</p>
          ))}
        </section>

        <section className="oz-editorial">
          <div className="oz-eyebrow">Lecture cartographique</div>
          <h2>Trois monopoles tenus.</h2>
          <p>
            La planche ci-dessus respecte strictement les trois monopoles du système chromatique :
            le bleu cendré pour l'eau seule, le violet grisé pour le commerce et ses axes, le sodium
            chaud pour le bâti isolé. Le POI majeur — magenta de Jane — est l'unique signal de la
            planche. La règle « un seul signal par vue » est tenue.
          </p>
          <p>Coordonnées projetées en EPSG:2154 (Lambert-93). Sources OSM, IGN BD ORTHO, relevé in situ avril 2026.</p>
        </section>
      </div>
    </main>
  );
}
