import type { Route } from '../lib/router';

interface HeaderProps {
  route: Route;
  navigate: (r: Route) => void;
  onContribute: () => void;
}

const NAV_ITEMS: { route: Route | 'contribuer'; label: string }[] = [
  { route: 'home',     label: 'Accueil' },
  { route: 'carte',    label: 'Carte' },
  { route: 'galerie',  label: 'Galerie' },
  { route: 'contribuer', label: 'Contribuer' },
];

// Slate · format clap de tournage. Le site est figé sur dawn.
const SLATE_TIME = '05·42 — pre-dawn';

const CHAPTER_FROM_ROUTE: Record<Route, string> = {
  home:    'I · Observatoire',
  carte:   'II · Carte',
  galerie: 'III · Galerie',
  fiche:   'IV · Fiche',
};

export function Header({ route, navigate, onContribute }: HeaderProps) {
  const isActive = (target: string) => {
    if (target === 'galerie') return route === 'galerie' || route === 'fiche';
    return target === route;
  };

  return (
    <header className="oz-header">
      <div className="oz-header-inner">
        <button
          type="button"
          className="oz-brand"
          onClick={() => navigate('home')}
          aria-label="Retour à l'accueil — Open Zones Act"
        >
          <span className="oz-wordmark">
            Open Zones Act<span className="dot">.</span>
          </span>
          <span className="oz-tagline">cartographie éditoriale des marges</span>
        </button>

        <nav className="oz-nav" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => {
            if (item.route === 'contribuer') {
              return (
                <button
                  key={item.route}
                  type="button"
                  className="oz-nav-cta"
                  onClick={onContribute}
                >
                  {item.label} ↗
                </button>
              );
            }
            const active = isActive(item.route);
            return (
              <button
                key={item.route}
                type="button"
                className={`oz-nav-item ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => navigate(item.route as Route)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="oz-header-actions">
          <div className="oz-slate" aria-hidden="true">
            <span className="oz-slate-time">{SLATE_TIME}</span>
            <span className="oz-slate-chapter">{CHAPTER_FROM_ROUTE[route]}</span>
          </div>
          <button className="oz-login" type="button">Connexion</button>
        </div>
      </div>
    </header>
  );
}
