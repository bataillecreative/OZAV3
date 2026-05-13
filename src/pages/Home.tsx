import type { Route } from '../lib/router';
import { useReveal } from '../lib/useReveal';

interface HomeProps {
  navigate: (r: Route) => void;
  onContribute: () => void;
}

const KPIS: { label: string; value: string }[] = [
  { label: 'Fiches publiées',     value: '142' },
  { label: 'Projets en chantier', value: '67' },
  { label: 'Régions couvertes',   value: '12' },
];

const LAST_UPDATE = '2026·04·28';

const POIS: { x: number; y: number }[] = [
  { x: 52, y: 30 }, // Paris
  { x: 62, y: 14 }, // Lille
  { x: 86, y: 32 }, // Strasbourg
  { x: 22, y: 38 }, // Rennes
  { x: 22, y: 50 }, // Nantes
  { x: 30, y: 66 }, // Bordeaux
  { x: 44, y: 76 }, // Toulouse
  { x: 68, y: 78 }, // Marseille
  { x: 84, y: 78 }, // Nice
  { x: 66, y: 56 }, // Lyon
];

const FRANCE_PATH =
  'M 60 10 L 70 12 L 75 18 L 84 22 L 90 30 L 92 40 L 86 50 L 92 56 L 90 68 ' +
  'L 84 76 L 78 84 L 70 88 L 56 90 L 48 88 L 38 86 L 28 82 L 22 76 L 16 70 ' +
  'L 12 60 L 14 50 L 10 42 L 6 36 L 14 30 L 22 28 L 30 22 L 40 16 L 50 12 Z';

export function Home({ navigate, onContribute }: HomeProps) {
  const stats = useReveal();
  const mapviz = useReveal();
  const editorial = useReveal();

  const cls = (revealed: boolean) =>
    `is-reveal-target${revealed ? ' is-revealed' : ''}`;

  return (
    <main>
      <section className="oz-home-hero">
        <div className="oz-container">
          <div className="oz-home-hero-stack">
            <h1 className="oz-home-hero-title">
              Observatoire national<br />
              de la transformation des entrées de ville et des zones commerciales
            </h1>
            <p className="oz-home-hero-lede">
              <strong>Open Zone Acte</strong> est la base de données collaborative
              qui centralise, géolocalise, valorise et diffuse les projets de
              transformation des entrées de ville et des zones commerciales
              périphériques françaises.
            </p>
            <div className="oz-home-hero-actions">
              <button
                type="button"
                className="oz-btn ghost"
                onClick={() => navigate('carte')}
              >
                Recherche par localisation
              </button>
              <button
                type="button"
                className="oz-btn ghost"
                onClick={() => navigate('galerie')}
              >
                Critères de recherche avancés
              </button>
              <button
                type="button"
                className="oz-btn primary"
                onClick={onContribute}
              >
                <span aria-hidden="true">+</span> Ajouter un projet
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={stats.ref}
        className={`oz-home-stats ${cls(stats.revealed)}`}
        aria-label="État de la base"
      >
        <div className="oz-container">
          <ul className="oz-home-stats-grid">
            {KPIS.map((kpi) => (
              <li key={kpi.label} className="oz-home-stat">
                <div className="oz-home-stat-label">{kpi.label}</div>
                <div className="oz-home-stat-value">{kpi.value}</div>
              </li>
            ))}
          </ul>
          <p className="oz-home-stats-meta">
            <span>Dernière mise à jour</span>
            <time dateTime="2026-04-28">{LAST_UPDATE}</time>
          </p>
        </div>
      </section>

      <section
        ref={mapviz.ref}
        className={`oz-home-mapviz ${cls(mapviz.revealed)}`}
      >
        <div className="oz-container">
          <div className="oz-home-mapviz-eyebrow">
            <span className="oz-eyebrow">Couverture</span>
            <span className="oz-home-mapviz-coord">FR · métropole · 142 zones</span>
          </div>
          <button
            type="button"
            className="oz-home-mapviz-trigger"
            onClick={() => navigate('carte')}
            aria-label="Accéder à la carte interactive complète"
          >
            <svg
              viewBox="0 0 100 100"
              className="oz-home-mapviz-svg"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
              focusable="false"
            >
              <path d={FRANCE_PATH} className="oz-home-mapviz-france" />
              {POIS.map((p, i) => (
                <g key={i} className="oz-home-mapviz-poi">
                  <circle cx={p.x} cy={p.y} r="2.4" className="halo" />
                  <circle cx={p.x} cy={p.y} r="1.1" className="core" />
                </g>
              ))}
            </svg>
            <div className="oz-home-mapviz-caption">
              <span>Aperçu non-interactif · 10 villes échantillons</span>
              <span className="oz-home-mapviz-cta">Accéder à la carte complète ↗</span>
            </div>
          </button>
        </div>
      </section>

      <section
        ref={editorial.ref}
        className={`oz-home-editorial ${cls(editorial.revealed)}`}
      >
        <div className="oz-container">
          <div className="oz-home-editorial-grid">
            <article className="oz-home-editorial-col">
              <div className="oz-eyebrow">L'observatoire</div>
              <h3 className="oz-home-editorial-title">Pourquoi Open Zone Acte ?</h3>
              <p className="dropcap">
                La transformation des entrées de ville et des zones d'activités
                monofonctionnelles vieillissantes est enjeu majeur pour répondre
                aux défis écologiques, climatiques et socioéconomiques. Elle
                représente un gisement de fonciers déjà imperméabilisés et
                valorisables évalué à 80 000&nbsp;ha.
              </p>
              <p>
                Open Zone Acte apporte à tous les acteurs de cette transformation
                la connaissance, les informations et les inspirations nécessaires
                à l'engagement et à la réussite de leur projet dans une logique
                d'essaimage.
              </p>
              <p>
                La plateforme permet de pallier la dispersion, l'incomplétude ou
                l'inaccessibilité des données de projets (toutes échelles) qui
                freinent aujourd'hui leur valorisation et la transmission des
                bonnes pratiques. Il répond au besoin urgent d'un outil partagé
                pour mutualiser les connaissances, comparer les démarches,
                stimuler l'implication des acteurs publics et privés, encourager
                le dialogue et favoriser la diffusion des innovations. Il
                contribue ainsi à accélérer la transformation des entrées de
                ville.
              </p>
            </article>

            <article className="oz-home-editorial-col oz-home-editorial-col--sub">
              <div className="oz-eyebrow">Deuxième acte</div>
              <h3 className="oz-home-editorial-title">Qui sommes-nous ?</h3>
              <p>
                Open Zone Acte est un projet porté par Deuxième Acte, association
                loi 1901 créée en juillet 2025 dont la mission est d'accélérer la
                transformation des entrées de ville et des zones commerciales en
                France, pour en faire des quartiers urbains, écologiques, vivants
                et audacieux, en réponse aux défis socioéconomiques, écologiques,
                climatiques et sanitaires.
              </p>
              <p className="oz-home-editorial-link-row">
                Plus d'informations sur{' '}
                <a
                  href="https://deuxieme-acte.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  deuxieme-acte.fr&nbsp;↗
                </a>
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
