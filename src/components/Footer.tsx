export function Footer() {
  return (
    <footer className="oz-footer">
      <div className="oz-footer-inner">
        <div className="oz-footer-cols">
          <div className="oz-footer-col">
            <div className="oz-footer-col-label">Sources & données</div>
            <ul>
              <li>OpenStreetMap · IGN BD ORTHO</li>
              <li>INSEE — équipements 2024</li>
              <li>Relevés in situ, contributeurs</li>
              <li>Données ouvertes etalab</li>
            </ul>
          </div>
          <div className="oz-footer-col">
            <div className="oz-footer-col-label">Contact</div>
            <ul>
              <li><a href="mailto:contact@open-zones-act.fr">contact@open-zones-act.fr</a></li>
              <li><a href="mailto:contribuer@open-zones-act.fr">contribuer@open-zones-act.fr</a></li>
              <li>Marseille · Paris · Nantes</li>
            </ul>
          </div>
        </div>

        <div className="oz-footer-bar">
          <a
            href="https://deuxieme-acte.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="oz-footer-da-logo"
            aria-label="Visiter Deuxième Acte"
          />
          <div className="oz-footer-bar-meta">
            <span>© 2026 Deuxième Acte · loi 1901</span>
            <span className="oz-footer-credit">Webdesign · <strong>Théophile Bataille</strong></span>
            <span><a href="#mentions">Mentions légales</a> · <a href="#rgpd">Données personnelles</a> · <a href="/ds/index.html" target="_blank" rel="noopener noreferrer">Design system ↗</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
