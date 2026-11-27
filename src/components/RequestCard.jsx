import { Link } from "react-router-dom";
import { Clock, MapPin } from "lucide-react";
import Avatar from "./Avatar";
import CatIcon from "./CatIcon";
import { timeAgo } from "../lib/utils";

const edge = { High: "var(--alert)", Medium: "var(--accent)", Low: "var(--teal)" };
const statusStyle = { Open: "bg-teal/15 text-teal", Accepted: "bg-accent/20 text-fg", Completed: "bg-surface2 text-muted" };

export default function RequestCard({ request: r, preview = false }) {
  const body = (
    <article className="card h-full overflow-hidden p-5 pl-6 transition-colors hover:border-fg/40" style={{ boxShadow: `inset 5px 0 0 ${edge[r.urgency] || "var(--line)"}` }}>
      <div className="flex items-center gap-2 text-sm">
        <span className="chip"><CatIcon category={r.category} size={14} />{r.category}</span>
        <span className="font-semibold" style={{ color: edge[r.urgency] }}>{r.urgency} urgency</span>
        <span className={`chip ml-auto ${statusStyle[r.status] || ""}`}>{r.status}</span>
      </div>
      <h3 className="mt-3 text-lg font-bold leading-snug">{r.title || "Your request title"}</h3>
      <p className="mt-1 line-clamp-2 text-muted">{r.description || "Your details will show up here."}</p>
      <div className="mt-4 flex items-center gap-3 text-sm text-muted">
        <Avatar name={r.requester?.name} size={26} />
        <span className="font-semibold text-fg">{r.requester?.name}</span>
        {r.campusZone && <span className="inline-flex items-center gap-1"><MapPin size={14} />{r.campusZone}</span>}
        {r.createdAt && <span className="ml-auto inline-flex items-center gap-1"><Clock size={14} />{timeAgo(r.createdAt)}</span>}
      </div>
    </article>
  );
  return preview ? body : <Link to={`/requests/${r._id}`} className="block">{body}</Link>;
}
