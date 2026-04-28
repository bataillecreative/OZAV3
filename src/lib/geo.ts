/**
 * Parse "DD.DDDD° N · DD.DDDD° E" → [lng, lat] for MapLibre.
 * Returns null if the string is malformed.
 */
export function parseCoords(coords: string): [number, number] | null {
  const m = coords.match(/(-?\d+(?:\.\d+)?)\s*°\s*([NS])\s*[·.,]\s*(-?\d+(?:\.\d+)?)\s*°\s*([EW])/i);
  if (!m) return null;
  const lat = parseFloat(m[1]) * (m[2].toUpperCase() === 'S' ? -1 : 1);
  const lng = parseFloat(m[3]) * (m[4].toUpperCase() === 'W' ? -1 : 1);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return [lng, lat];
}

export const FRANCE_CENTER: [number, number] = [2.5, 46.5];
export const FRANCE_ZOOM = 5.2;
