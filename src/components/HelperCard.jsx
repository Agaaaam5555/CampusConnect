import { Footprints, MapPin, Trophy } from "lucide-react";
import Avatar from "./Avatar";
import { walkMinutes } from "../data/campus";

export default function HelperCard({ helper: h, rank, fromZone }) {
  const walk = walkMinutes(h.campusZone, fromZone);
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        <Avatar name={h.name} size={44} />
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-bold"><span className="mr-1 text-muted">#{rank}</span>{h.name}</p>
          <p className="flex flex-wrap items-center gap-x-3 text-sm text-muted">
            {h.campusZone && <span className="inline-flex items-center gap-1"><MapPin size={14} />{h.campusZone}</span>}
            {walk && <span className="inline-flex items-center gap-1"><Footprints size={14} />{walk} min walk</span>}
          </p>
        </div>
        {rank === 1 && <span className="chip ml-auto bg-teal/15 text-teal">Best match</span>}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {h.skillsOffered?.map((s) => <span key={s} className="chip">{s}</span>)}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-sm text-muted"><Trophy size={14} />{h.reputationPoints} reputation points</p>
    </div>
  );
}
