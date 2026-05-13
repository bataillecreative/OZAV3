import { Suspense, lazy, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import type { Route } from './lib/router';

// Code-split — chacun de ces écrans tire ses propres lourdeurs (maplibre-gl
// pour Carte, illustrations SVG pour Galerie, mini-carte + meta pour Fiche).
// Home reste eager, c'est la page d'atterrissage.
const Carte = lazy(() => import('./pages/Carte').then((m) => ({ default: m.Carte })));
const Galerie = lazy(() => import('./pages/Galerie').then((m) => ({ default: m.Galerie })));
const Fiche = lazy(() => import('./pages/Fiche').then((m) => ({ default: m.Fiche })));

function PageFallback() {
  // Réserve la hauteur sous le header — évite un CLS pendant le chunk-load.
  return <div className="oz-page-fallback" aria-busy="true" aria-live="polite" />;
}

function App() {
  const [route, setRoute] = useState<Route>('home');
  const [projectId, setProjectId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  const scrollTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  const navigate = (r: Route) => {
    setRoute(r);
    scrollTop();
  };

  const openProject = (id: string) => {
    setProjectId(id);
    setRoute('fiche');
    scrollTop();
  };

  const onContribute = () => {
    setToast(
      "Le formulaire de contribution arrive bientôt. En attendant : contribuer@open-zones-act.fr",
    );
  };

  const onLogin = () => {
    setToast(
      "Espace contributeur — bientôt. En attendant : contribuer@open-zones-act.fr",
    );
  };

  // Page-frame · key={route+projectId} pour remonter à chaque changement.
  // L'animation est portée par CSS .oz-page-frame (cf. app.css). Respecte
  // prefers-reduced-motion sans dépendance JS supplémentaire.
  const pageKey = route + (route === 'fiche' ? `:${projectId}` : '');

  return (
    <div className="oz-shell">
      <Header
        route={route}
        navigate={navigate}
        onContribute={onContribute}
        onLogin={onLogin}
      />

      <div key={pageKey} className="oz-page-frame">
        <Suspense fallback={<PageFallback />}>
          {route === 'home' && (
            <Home navigate={navigate} onContribute={onContribute} />
          )}
          {route === 'carte' && <Carte openProject={openProject} />}
          {route === 'galerie' && <Galerie openProject={openProject} />}
          {route === 'fiche' && <Fiche projectId={projectId} navigate={navigate} />}
        </Suspense>
      </div>

      <Footer />

      {toast && (
        <div className="oz-toast" role="status" aria-live="polite">
          <span>{toast}</span>
          <button
            type="button"
            className="oz-toast-close"
            onClick={() => setToast(null)}
            aria-label="Fermer la notification"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
