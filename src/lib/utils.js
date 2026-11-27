// Change this list to match the categories your backend accepts.
export const CATEGORIES = ["Hardware", "Notes", "Coding", "Academics", "Other"];
export const URGENCIES = ["High", "Medium", "Low"];

// helper can come back as an object ({_id, name}) or as a plain id string
export const idOf = (x) => x?._id ?? x ?? null;

export function timeAgo(iso) {
  if (!iso) return "";
  const s = (Date.now() - new Date(iso)) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export const LEVELS = [
  { name: "Newcomer", min: 0 },
  { name: "Helper", min: 50 },
  { name: "Mentor", min: 150 },
  { name: "Campus Hero", min: 300 },
];

export function levelFor(rep = 0) {
  let i = 0;
  LEVELS.forEach((l, k) => { if (rep >= l.min) i = k; });
  const cur = LEVELS[i], next = LEVELS[i + 1];
  return {
    name: cur.name,
    next: next?.name,
    toNext: next ? next.min - rep : 0,
    pct: next ? Math.round(((rep - cur.min) / (next.min - cur.min)) * 100) : 100,
  };
}
