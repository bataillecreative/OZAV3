import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Carte } from './pages/Carte';
import { Galerie } from './pages/Galerie';
import { Fiche } from './pages/Fiche';
import type { Route } from './lib/router';

function App() {
  const [route, setRoute] = useState<Route>('home');
  const [projectId, setProjectId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
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

  // Page transition : framer-motion respecte la préférence utilisateur.
  // Sous reduced-motion, on collapse à un fade instantané.
  const pageTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <div className="oz-shell">
      <Header route={route} navigate={navigate} onContribute={onContribute} />

      <AnimatePresence mode="wait">
        <motion.div
          key={route + (route === 'fiche' ? `:${projectId}` : '')}
          className="oz-page-frame"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
          transition={pageTransition}
        >
          {route === 'home' && (
            <Home navigate={navigate} onContribute={onContribute} openProject={openProject} />
          )}
          {route === 'carte'   && <Carte openProject={openProject} />}
          {route === 'galerie' && <Galerie openProject={openProject} />}
          {route === 'fiche'   && <Fiche projectId={projectId} navigate={navigate} />}
        </motion.div>
      </AnimatePresence>

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
