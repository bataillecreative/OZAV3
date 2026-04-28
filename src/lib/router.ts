export type Route = 'home' | 'carte' | 'galerie' | 'fiche';

export interface RouterState {
  route: Route;
  projectId: string | null;
}
