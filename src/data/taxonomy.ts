export type EtatId = 'amont' | 'etudes' | 'chantier' | 'realise' | 'arrete';

export interface Etat {
  id: EtatId;
  label: string;
  color: string;
  border: string;
}

export const ETATS: Etat[] = [
  { id: 'amont',    label: 'Amont',    color: '#BAAFC2', border: '#4E4360' },
  { id: 'etudes',   label: 'Études',   color: '#E8C282', border: '#7A5224' },
  { id: 'chantier', label: 'Chantier', color: '#D4A975', border: '#7A5224' },
  { id: 'realise',  label: 'Réalisé',  color: '#8FA597', border: '#5F7066' },
  { id: 'arrete',   label: 'Arrêté',   color: '#A8A097', border: '#4E4360' },
];

export type Typologie =
  | 'Centre commercial'
  | 'Retail park'
  | 'Zone commerciale périphérique'
  | "Zone d'activité mixte"
  | 'Friche commerciale';

export const TYPOLOGIES: Typologie[] = [
  'Centre commercial',
  'Retail park',
  'Zone commerciale périphérique',
  "Zone d'activité mixte",
  'Friche commerciale',
];

export type Region =
  | 'Île-de-France'
  | "Provence-Alpes-Côte d'Azur"
  | 'Hauts-de-France'
  | 'Pays de la Loire'
  | 'Bretagne'
  | 'Grand Est'
  | 'Occitanie'
  | 'Auvergne-Rhône-Alpes';

export const REGIONS: Region[] = [
  'Île-de-France',
  "Provence-Alpes-Côte d'Azur",
  'Hauts-de-France',
  'Pays de la Loire',
  'Bretagne',
  'Grand Est',
  'Occitanie',
  'Auvergne-Rhône-Alpes',
];
