import { useEffect, useState } from "react";

export default function ScoreRing({ value, size = 56 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setV(value), 120);
    return () => clearTimeout(t);
  }, [value]);

  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const color = value >= 85 ? "var(--teal)" : value >= 70 ? "var(--accent)" : "var(--muted)";

  return (
    <svg width={size} height={size} role="img" aria-label={`${value}% match`} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth="5" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - v / 100)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill="currentColor"
        className="font-display font-bold" fontSize={size * 0.3}>
        {value}
      </text>
    </svg>
  );
}
