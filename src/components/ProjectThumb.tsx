import type { Project } from '../data/projects';

interface ProjectThumbProps {
  project: Project;
}

export function ProjectThumb({ project }: ProjectThumbProps) {
  const seed = project.id.charCodeAt(0) + project.id.charCodeAt(1);
  const variant = seed % 3;

  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`pg-${project.id}`} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" className="svg-fill-cream" />
          <circle cx="3" cy="3" r="0.4" className="svg-fill-warm-grey" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#pg-${project.id})`} />
      {variant === 0 && (
        <>
          <path d="M 0 0 L 400 0 L 400 70 Q 280 90 180 75 Q 80 65 0 80 Z" className="svg-fill-perm" opacity="0.6" />
          <rect x="100" y="120" width="80" height="50" className="svg-commerce" strokeWidth="1.5" />
          <rect x="200" y="110" width="70" height="60" className="svg-commerce" strokeWidth="1.5" />
          <rect x="290" y="130" width="60" height="40" className="svg-commerce" strokeWidth="1.5" />
          <rect x="100" y="190" width="60" height="30" className="svg-project" strokeDasharray="4 3" strokeWidth="1.2" />
          <line x1="0" y1="240" x2="400" y2="240" className="svg-axe-network-base" strokeWidth="6" />
          <line x1="0" y1="240" x2="400" y2="240" className="svg-axe-network-top" strokeWidth="2.5" />
          <circle cx="180" cy="135" r="6" className="svg-fill-cream" />
          <circle cx="180" cy="135" r="3.5" className="svg-poi-minor" strokeWidth="1" />
        </>
      )}
      {variant === 1 && (
        <>
          <ellipse cx="80" cy="220" rx="80" ry="20" className="svg-fill-water" opacity="0.7" />
          <path d="M 0 50 L 400 60 L 400 90 L 0 80 Z" className="svg-fill-perm" opacity="0.5" />
          <circle cx="200" cy="150" r="55" className="svg-commerce" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="22" className="svg-fill-cream" />
          <line x1="0" y1="210" x2="400" y2="210" className="svg-axe-warm-base" strokeWidth="3" />
          <line x1="0" y1="210" x2="400" y2="210" className="svg-axe-warm-top" strokeWidth="1" />
          <circle cx="200" cy="150" r="4" className="svg-poi-minor" strokeWidth="1" />
        </>
      )}
      {variant === 2 && (
        <>
          <path d="M 0 0 L 400 0 L 400 50 L 0 60 Z" className="svg-fill-perm" opacity="0.55" />
          <rect x="60" y="100" width="280" height="100" className="svg-commerce" strokeWidth="1.5" />
          <line x1="60" y1="130" x2="340" y2="130" className="svg-stroke-commerce" strokeWidth="0.8" />
          <line x1="60" y1="160" x2="340" y2="160" className="svg-stroke-commerce" strokeWidth="0.8" />
          <line x1="150" y1="100" x2="150" y2="200" className="svg-stroke-commerce" strokeWidth="0.8" />
          <line x1="250" y1="100" x2="250" y2="200" className="svg-stroke-commerce" strokeWidth="0.8" />
          <line x1="0" y1="240" x2="400" y2="240" className="svg-axe-network-base" strokeWidth="6" />
          <line x1="0" y1="240" x2="400" y2="240" className="svg-axe-network-top" strokeWidth="2.5" />
          <circle cx="200" cy="150" r="6" className="svg-fill-cream" />
          <circle cx="200" cy="150" r="3.5" className="svg-poi-minor" strokeWidth="1" />
        </>
      )}
    </svg>
  );
}
