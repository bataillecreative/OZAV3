import { useEffect, useRef, useState } from 'react';
import type { Route } from '../lib/router';
import { useDialog } from '../lib/useDialog';

interface HeaderProps {
  route: Route;
  navigate: (r: Route) => void;
  onContribute: () => void;
  onLogin: () => void;
}

const NAV_ITEMS: { route: Route | 'contribuer'; label: string }[] = [
  { route: 'home',       label: 'Observatoire' },
  { route: 'carte',      label: 'Carte' },
  { route: 'galerie',    label: 'Galerie' },
  { route: 'contribuer', label: 'Contribuer' },
];

export function Header({ route, navigate, onContribute, onLogin }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const isActive = (target: string) => {
    if (target === 'galerie') return route === 'galerie' || route === 'fiche';
    return target === route;
  };

  const handleNavClick = (item: typeof NAV_ITEMS[number]) => {
    setDrawerOpen(false);
    if (item.route === 'contribuer') {
      onContribute();
    } else {
      navigate(item.route as Route);
    }
  };

  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const drawerRef = useDialog<HTMLElement>({
    open: drawerOpen,
    onClose: () => setDrawerOpen(false),
    initialFocusRef: closeRef,
    returnFocusRef: burgerRef,
    // Marque le header (hors drawer), la page courante et le footer
    // comme inert pendant que le drawer est ouvert. Replace l'ancien
    // aria-hidden + tabIndex juggling.
    inertSelectors: ['.oz-header', '.oz-page-frame', '.oz-footer'],
  });

  return (
    <>
      <header className="oz-header">
        <div className="oz-header-inner">
          <button
            type="button"
            className="oz-brand"
            onClick={() => navigate('home')}
            aria-label="Retour à l'observatoire — OpenZoneAct"
          >
            <span className="oz-wordmark">
              OpenZoneAct<span className="dot">.</span>
            </span>
          </button>

          <nav className="oz-nav" aria-label="Navigation principale">
            {NAV_ITEMS.map((item) => {
              const active = item.route !== 'contribuer' && isActive(item.route);
              return (
                <button
                  key={item.route}
                  type="button"
                  className={`oz-nav-item ${active ? 'active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="oz-header-actions">
            <button
              ref={burgerRef}
              type="button"
              className="oz-burger"
              aria-label="Ouvrir la navigation"
              aria-expanded={drawerOpen}
              aria-controls="oz-mobile-drawer"
              onClick={() => setDrawerOpen(true)}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
            <button type="button" className="oz-login" onClick={onLogin}>
              Connexion
            </button>
          </div>
        </div>
      </header>

      <div
        className={`oz-drawer-overlay${drawerOpen ? ' is-open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside
        ref={drawerRef as React.RefObject<HTMLElement>}
        id="oz-mobile-drawer"
        className={`oz-drawer${drawerOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation mobile"
        aria-hidden={!drawerOpen}
      >
        <div className="oz-drawer-head">
          <span className="oz-drawer-eyebrow">Navigation</span>
          <button
            ref={closeRef}
            type="button"
            className="oz-drawer-close"
            aria-label="Fermer la navigation"
            onClick={() => setDrawerOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav className="oz-drawer-nav" aria-label="Navigation mobile principale">
          {NAV_ITEMS.map((item) => {
            const active = item.route !== 'contribuer' && isActive(item.route);
            return (
              <button
                key={item.route}
                type="button"
                className={`oz-drawer-link${active ? ' active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => handleNavClick(item)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="oz-drawer-foot">
          <button
            type="button"
            className="oz-login oz-drawer-login"
            onClick={() => {
              setDrawerOpen(false);
              onLogin();
            }}
          >
            Connexion
          </button>
        </div>
      </aside>
    </>
  );
}
