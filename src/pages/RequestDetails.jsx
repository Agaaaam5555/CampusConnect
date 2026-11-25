import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Link2, MapPin, MessageSquare } from "lucide-react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Avatar from "../components/Avatar";
import CatIcon from "../components/CatIcon";
import HelperCard from "../components/HelperCard";
import StatusStepper from "../components/StatusStepper";
import { idOf, timeAgo } from "../lib/utils";

export default function RequestDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const [r, setR] = useState(null);
  const [matches, setMatches] = useState([]);

  const load = async () => {
    const req = await api.getRequest(id);
    setR(req || false);
    if (req && req.requester._id === user._id && req.status === "Open") setMatches(await api.getMatches(id));
  };
  useEffect(() => { load(); }, [id]);

  if (r === null) return <p>Loading...</p>;
  if (r === false) return <p>This request could not be found. <Link to="/requests" className="font-semibold underline">Back to requests</Link></p>;

  const isOwner = r.requester._id === user._id;
  const isHelper = idOf(r.helper) === user._id;

  const accept = async () => { await api.acceptRequest(id); toast("Request accepted. Say hello in the chat."); load(); };
  const complete = async () => { await api.completeRequest(id); toast("Marked complete. Your helper earned 10 points."); load(); };
  const copyLink = async () => { await navigator.clipboard.writeText(window.location.href); toast("Link copied"); };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-8">
        <article className="card p-6">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="chip"><CatIcon category={r.category} size={14} />{r.category}</span>
            <span className="chip">{r.urgency} urgency</span>
            {r.campusZone && <span className="chip"><MapPin size={14} />{r.campusZone}</span>}
          </div>
          <h1 className="mt-3 text-3xl font-extrabold">{r.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">{r.description}</p>
          <div className="mt-5 flex items-center gap-3 text-sm">
            <Avatar name={r.requester.name} size={32} />
            <span className="font-semibold">{r.requester.name}</span>
            {r.createdAt && <span className="text-muted">posted {timeAgo(r.createdAt)}</span>}
          </div>
          <div className="mt-6 overflow-x-auto border-t border-line pt-5"><StatusStepper status={r.status} /></div>

          <div className="mt-6 flex flex-wrap gap-3">
            {!isOwner && r.status === "Open" && <button className="btn btn-primary" onClick={accept}>Accept this request</button>}
            {(isOwner || isHelper) && r.status !== "Open" && <Link to={`/chat/${id}`} className="btn"><MessageSquare size={18} />Open chat</Link>}
            {isOwner && r.status === "Accepted" && <button className="btn btn-primary" onClick={complete}>Mark complete</button>}
            {isOwner && r.status === "Open" && <button className="btn" onClick={copyLink}><Link2 size={16} />Copy link</button>}
          </div>
        </article>

        {isOwner && r.status === "Open" && (
          <section>
            <h2 className="mb-1 text-2xl font-bold">Recommended helpers</h2>
            <p className="mb-4 text-muted">Best matches first, based on skills and campus zone.</p>
            {matches.length === 0 ? <p className="text-muted">No matches yet.</p> : (
              <div className="grid gap-4 md:grid-cols-2">
                {matches.map((h, i) => <HelperCard key={h._id} helper={h} rank={i + 1} fromZone={r.campusZone} />)}
              </div>
            )}
          </section>
        )}
      </div>

      <aside className="card h-fit p-5">
        <h2 className="font-bold">Request details</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex"><dt className="text-muted">Status</dt><dd className="ml-auto font-semibold">{r.status}</dd></div>
          <div className="flex"><dt className="text-muted">Requester</dt><dd className="ml-auto font-semibold">{r.requester.name}</dd></div>
          <div className="flex"><dt className="text-muted">Helper</dt><dd className="ml-auto font-semibold">{r.helper?.name || (r.helper ? "Assigned" : "Not yet")}</dd></div>
        </dl>
      </aside>
    </div>
  );
}
