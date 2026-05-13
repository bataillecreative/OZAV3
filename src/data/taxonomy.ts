export type EtatId = 'amont' | 'etudes' | 'chantier' | 'realise' | 'arrete';

export interface Etat {
  id: EtatId;
  label: string;
}

export const ETATS: Etat[] = [
  { id: 'amont',    label: 'Amont' },
  { id: 'etudes',   label: 'Études' },
  { id: 'chantier', label: 'Chantier' },
  { id: 'realise',  label: 'Réalisé' },
  { id: 'arrete',   label: 'Arrêté' },
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
