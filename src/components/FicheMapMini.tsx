import type { Project } from '../data/projects';

interface FicheMapMiniProps {
  project: Project;
}

export function FicheMapMini({ project }: FicheMapMiniProps) {
  return (
    <figure>
      <svg className="oz-fiche-map-svg" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`tile-${project.id}`} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#F0EBDF" />
            <circle cx="3" cy="3" r="0.4" fill="#A8A097" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="1280" height="720" fill={`url(#tile-${project.id})`} />

        {/* Sols perméables */}
        <path d="M 0 0 L 1280 0 L 1280 180 Q 940 220 720 200 Q 460 180 280 220 Q 100 240 0 230 Z" fill="#BBC5BB" opacity="0.6" />
        <path d="M 0 540 Q 200 520 380 560 Q 560 600 720 580 Q 900 560 1100 600 L 1280 580 L 1280 720 L 0 720 Z" fill="#BBC5BB" opacity="0.45" />

        {/* Eau */}
        <ellipse cx="180" cy="500" rx="120" ry="38" fill="#8AAFB6" opacity="0.85" />
        <path d="M 60 500 Q 180 485 300 500 L 1280 460 L 1280 480 L 320 500 Q 200 515 80 510 Z" fill="#8AAFB6" opacity="0.55" />

        {/* Zones commerciales */}
        <g>
          <rect x="380" y="280" width="240" height="140" fill="#8C7B96" stroke="#4E4360" strokeWidth="2" />
          <rect x="640" y="260" width="180" height="100" fill="#8C7B96" stroke="#4E4360" strokeWidth="2" />
          <rect x="640" y="380" width="120" height="120" fill="#8C7B96" stroke="#4E4360" strokeWidth="2" />
          <rect x="780" y="380" width="160" height="80" fill="#8C7B96" stroke="#4E4360" strokeWidth="2" />
          <rect x="960" y="280" width="200" height="180" fill="#8C7B96" stroke="#4E4360" strokeWidth="2" />
          <rect x="380" y="450" width="160" height="80" fill="#E8C282" stroke="#7A5224" strokeWidth="1.5" strokeDasharray="6 4" />
        </g>

        {/* Bâti courant */}
        <g fill="#D4A975" stroke="#7A5224" strokeWidth="0.8">
          <rect x="120" y="320" width="40" height="30" />
          <rect x="180" y="340" width="32" height="26" />
          <rect x="80" y="380" width="36" height="28" />
          <rect x="1100" y="500" width="50" height="36" />
          <rect x="1180" y="520" width="36" height="28" />
        </g>

        {/* Autoroute */}
        <g>
          <line x1="0" y1="600" x2="1280" y2="600" stroke="#4E4360" strokeWidth="14" />
          <line x1="0" y1="600" x2="1280" y2="600" stroke="#8C7B96" strokeWidth="6" />
        </g>
        {/* Voie rapide */}
        <g>
          <line x1="500" y1="0" x2="500" y2="720" stroke="#4E4360" strokeWidth="9" />
          <line x1="500" y1="0" x2="500" y2="720" stroke="#BAAFC2" strokeWidth="3" />
        </g>
        {/* Artère urbaine */}
        <g>
          <path d="M 0 350 Q 200 340 380 360 L 620 360 L 880 380 L 1280 360" fill="none" stroke="#7A5224" strokeWidth="6" />
          <path d="M 0 350 Q 200 340 380 360 L 620 360 L 880 380 L 1280 360" fill="none" stroke="#E8C282" strokeWidth="2" />
        </g>

        {/* POI majeur (magenta de Jane) */}
        <g>
          <circle cx="500" cy="350" r="14" fill="#F0EBDF" />
          <circle cx="500" cy="350" r="8" fill="#D63A6E" stroke="#4E4360" strokeWidth="2" />
        </g>
        {/* POI mineurs */}
        <g>
          <circle cx="700" cy="310" r="5" fill="#D4A975" stroke="#7A5224" strokeWidth="1.5" />
          <circle cx="1060" cy="370" r="5" fill="#D4A975" stroke="#7A5224" strokeWidth="1.5" />
          <circle cx="450" cy="490" r="5" fill="#D4A975" stroke="#7A5224" strokeWidth="1.5" />
        </g>

        {/* Étiquettes */}
        <g fontFamily="Anton, sans-serif" fontSize="14" letterSpacing="2.5" fill="#2C2820">
          <text x="525" y="346">{project.toponym.toUpperCase()}</text>
          <text x="650" y="615" fontSize="13" fill="#4E4360">{project.axes.split('·')[0]}</text>
        </g>
      </svg>
      <figcaption className="oz-fiche-map-caption">
        {project.toponym} · échelle 1/15 000 · sources OSM, IGN, relevé in situ avril 2026
      </figcaption>
    </figure>
  );
}
