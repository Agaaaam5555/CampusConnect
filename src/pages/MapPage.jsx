import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import PageHeader from "../components/PageHeader";
import { ZONES, ZONE_NAMES, walkMinutes } from "../data/campus";

const colour = { High: "var(--alert)", Medium: "var(--accent)", Low: "var(--teal)" };

export default function MapPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [from, setFrom] = useState(user.campusZone || ZONE_NAMES[1]);

  useEffect(() => { api.getRequests().then((r) => setRequests(r.filter((x) => x.status === "Open"))); }, []);

  // Spread several pins at one location so they do not overlap
  const pins = requests.map((r, i) => {
    const s = ZONES[r.campusZone] || ZONES.Library;
    const n = requests.slice(0, i).filter((x) => x.campusZone === r.campusZone).length;
    return { r, x: s.x + 18 + n * 20, y: s.y - 22 };
  });
  const sel = requests.find((r) => r._id === selected);

  return (
    <>
      <PageHeader title="Campus map" subtitle="See where open requests are and how far they are from you.">
        <div>
          <label htmlFor="from" className="sr-only">You are at</label>
          <select id="from" className="input" value={from} onChange={(e) => setFrom(e.target.value)}>
            {ZONE_NAMES.map((z) => <option key={z} value={z}>I am at {z}</option>)}
          </select>
        </div>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="card overflow-hidden p-2">
          <svg viewBox="0 0 640 380" className="w-full" role="img" aria-label="Campus map with open requests">
            <rect width="640" height="380" rx="12" fill="var(--surface2)" />
            <path d="M70 310 L170 250 L190 110 L360 80 L500 170 L550 310 M170 250 L330 250 L500 170 M330 250 L550 310" fill="none" stroke="var(--line)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            {Object.entries(ZONES).map(([k, s]) => (
              <g key={k}>
                <rect x={s.x - 34} y={s.y - 16} width="68" height="32" rx="8" fill="var(--surface)" stroke={k === from ? "var(--accent)" : "var(--line)"} strokeWidth={k === from ? 3 : 1.5} />
                <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--fg)">{k}</text>
              </g>
            ))}
            {pins.map(({ r, x, y }) => (
              <g key={r._id} onClick={() => setSelected(r._id)} className="cursor-pointer" role="button" tabIndex={0}
                aria-label={r.title} onKeyDown={(e) => e.key === "Enter" && setSelected(r._id)}>
                <circle cx={x} cy={y} r={selected === r._id ? 11 : 8} fill={colour[r.urgency]} stroke="var(--fg)" strokeWidth="2" />
              </g>
            ))}
          </svg>
          <ul className="flex flex-wrap gap-4 px-3 py-2 text-sm text-muted">
            {Object.entries(colour).map(([k, c]) => (
              <li key={k} className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full" style={{ background: c }} />{k} urgency</li>
            ))}
          </ul>
        </div>

        <aside className="card h-fit p-5">
          {sel ? (
            <>
              <p className="text-sm text-muted">{sel.campusZone} · {walkMinutes(from, sel.campusZone) ?? "?"} min walk from you</p>
              <h2 className="mt-1 text-xl font-bold">{sel.title}</h2>
              <p className="mt-2 text-muted">{sel.description}</p>
              <Link to={`/requests/${sel._id}`} className="btn btn-primary mt-4">View request</Link>
            </>
          ) : (
            <>
              <h2 className="font-bold">{requests.length} open requests</h2>
              <p className="mt-1 text-muted">Select a pin to see the request and your walking time to it.</p>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
