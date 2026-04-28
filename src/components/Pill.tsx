import type { EtatId } from '../data/taxonomy';

interface PillProps {
  state?: EtatId;
  className?: string;
  children: React.ReactNode;
}

export function Pill({ state, className = '', children }: PillProps) {
  return (
    <span className={`oz-pill ${className}`} {...(state ? { 'data-state': state } : {})}>
      {state && <span className="dot" />}
      {children}
    </span>
  );
}
