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
          <rect width="6" height="6" fill="#F0EBDF" />
          <circle cx="3" cy="3" r="0.4" fill="#A8A097" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#pg-${project.id})`} />
      {variant === 0 && (
        <>
          <path d="M 0 0 L 400 0 L 400 70 Q 280 90 180 75 Q 80 65 0 80 Z" fill="#BBC5BB" opacity="0.6" />
          <rect x="100" y="120" width="80" height="50" fill="#8C7B96" stroke="#4E4360" strokeWidth="1.5" />
          <rect x="200" y="110" width="70" height="60" fill="#8C7B96" stroke="#4E4360" strokeWidth="1.5" />
          <rect x="290" y="130" width="60" height="40" fill="#8C7B96" stroke="#4E4360" strokeWidth="1.5" />
          <rect x="100" y="190" width="60" height="30" fill="#E8C282" stroke="#7A5224" strokeDasharray="4 3" strokeWidth="1.2" />
          <line x1="0" y1="240" x2="400" y2="240" stroke="#4E4360" strokeWidth="6" />
          <line x1="0" y1="240" x2="400" y2="240" stroke="#8C7B96" strokeWidth="2.5" />
          <circle cx="180" cy="135" r="6" fill="#F0EBDF" />
          <circle cx="180" cy="135" r="3.5" fill="#D4A975" stroke="#7A5224" strokeWidth="1" />
        </>
      )}
      {variant === 1 && (
        <>
          <ellipse cx="80" cy="220" rx="80" ry="20" fill="#8AAFB6" opacity="0.7" />
          <path d="M 0 50 L 400 60 L 400 90 L 0 80 Z" fill="#BBC5BB" opacity="0.5" />
          <circle cx="200" cy="150" r="55" fill="#8C7B96" stroke="#4E4360" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="22" fill="#F0EBDF" />
          <line x1="0" y1="210" x2="400" y2="210" stroke="#7A5224" strokeWidth="3" />
          <line x1="0" y1="210" x2="400" y2="210" stroke="#E8C282" strokeWidth="1" />
          <circle cx="200" cy="150" r="4" fill="#D4A975" stroke="#7A5224" strokeWidth="1" />
        </>
      )}
      {variant === 2 && (
        <>
          <path d="M 0 0 L 400 0 L 400 50 L 0 60 Z" fill="#BBC5BB" opacity="0.55" />
          <rect x="60" y="100" width="280" height="100" fill="#8C7B96" stroke="#4E4360" strokeWidth="1.5" />
          <line x1="60" y1="130" x2="340" y2="130" stroke="#4E4360" strokeWidth="0.8" />
          <line x1="60" y1="160" x2="340" y2="160" stroke="#4E4360" strokeWidth="0.8" />
          <line x1="150" y1="100" x2="150" y2="200" stroke="#4E4360" strokeWidth="0.8" />
          <line x1="250" y1="100" x2="250" y2="200" stroke="#4E4360" strokeWidth="0.8" />
          <line x1="0" y1="240" x2="400" y2="240" stroke="#4E4360" strokeWidth="6" />
          <line x1="0" y1="240" x2="400" y2="240" stroke="#8C7B96" strokeWidth="2.5" />
          <circle cx="200" cy="150" r="6" fill="#F0EBDF" />
          <circle cx="200" cy="150" r="3.5" fill="#D4A975" stroke="#7A5224" strokeWidth="1" />
        </>
      )}
    </svg>
  );
}
