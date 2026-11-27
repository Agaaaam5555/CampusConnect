const ZONES = {
  "Main Gate": { x: 70, y: 310 },
  "Library": { x: 190, y: 110 },
  "Block A": { x: 360, y: 80 },
  "Block B": { x: 500, y: 170 },
  "Canteen": { x: 330, y: 250 },
  "Hostel": { x: 550, y: 310 },
  "Sports Ground": { x: 170, y: 250 },
};

export const walkMinutes = (a, b) => {
  if (!ZONES[a] || !ZONES[b]) return 8;
  const d = Math.hypot(ZONES[a].x - ZONES[b].x, ZONES[a].y - ZONES[b].y);
  return Math.max(1, Math.round(d / 28));
};

export const rankHelpers = (users, request) => {
  const text = `${request.title} ${request.description} ${request.category}`.toLowerCase();
  const score = (u) => {
    const skillMatches = u.skillsOffered.filter((s) => text.includes(s.toLowerCase())).length;
    return skillMatches * 10 - walkMinutes(u.campusZone, request.campusZone) + (u.reputationPoints || 0) * 0.05;
  };
  return [...users].sort((a, b) => score(b) - score(a)).slice(0, 4);
};
