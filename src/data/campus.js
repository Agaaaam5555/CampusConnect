// Zone names MUST match the strings your backend stores in campusZone.
export const ZONES = {
  "Main Gate": { x: 70, y: 310 },
  "Library": { x: 190, y: 110 },
  "Block A": { x: 360, y: 80 },
  "Block B": { x: 500, y: 170 },
  "Canteen": { x: 330, y: 250 },
  "Hostel": { x: 550, y: 310 },
  "Sports Ground": { x: 170, y: 250 },
};
export const ZONE_NAMES = Object.keys(ZONES);

export const walkMinutes = (a, b) => {
  if (!ZONES[a] || !ZONES[b]) return null;
  const d = Math.hypot(ZONES[a].x - ZONES[b].x, ZONES[a].y - ZONES[b].y);
  return Math.max(1, Math.round(d / 28));
};
