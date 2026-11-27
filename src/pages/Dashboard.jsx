import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import PageHeader from "../components/PageHeader";
import RequestCard from "../components/RequestCard";
import Skeleton from "../components/Skeleton";
import { idOf, levelFor } from "../lib/utils";

export default function Dashboard() {
  const { user } = useAuth();
  const [all, setAll] = useState(null);
  useEffect(() => { api.getRequests().then(setAll); }, []);

  const rep = user.reputationPoints ?? 0;
  const lvl = levelFor(rep);
  const posted = all?.filter((r) => r.requester._id === user._id) || [];
  const helped = all?.filter((r) => idOf(r.helper) === user._id && r.status === "Completed") || [];
  const suggested = all
    ?.filter((r) => r.status === "Open" && r.requester._id !== user._id)
    .sort((a, b) => (b.campusZone === user.campusZone) - (a.campusZone === user.campusZone))
    .slice(0, 4);

  const stats = [
    ["Reputation points", rep],
    ["Requests posted", all ? posted.length : "-"],
    ["People helped", all ? helped.length : "-"],
    ["Skills offered", user.skillsOffered?.length ?? 0],
  ];

  return (
    <>
      <PageHeader title={`Hi, ${user.name}`} subtitle="Here is what is happening on campus today.">
        <Link to="/requests/new" className="btn btn-primary"><Plus size={18} />Post a request</Link>
      </PageHeader>

      <div className="card grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
        {stats.map(([label, value]) => (
          <div key={label} className="p-5">
            <p className="text-sm text-muted">{label}</p>
            <p className="font-display text-4xl font-extrabold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <section>
          <h2 className="text-xl font-bold">Open requests you could help with</h2>
          <p className="mb-4 text-sm text-muted">Requests in {user.campusZone} come first.</p>
          {!suggested ? <Skeleton count={4} /> : suggested.length === 0 ? (
            <div className="card p-8 text-center text-muted">No open requests right now.</div>
          ) : (
            <div className="grid gap-4">{suggested.map((r) => <RequestCard key={r._id} request={r} />)}</div>
          )}
        </section>

        <aside className="card h-fit p-5">
          <p className="text-sm text-muted">Your level</p>
          <p className="font-display text-2xl font-extrabold">{lvl.name}</p>
          <div className="mt-3 h-2 rounded bg-surface2"><div className="h-2 rounded bg-accent" style={{ width: `${lvl.pct}%` }} /></div>
          <p className="mt-2 text-sm text-muted">{lvl.next ? `${lvl.toNext} points to ${lvl.next}` : "Top level reached"}</p>
          <p className="mt-4 text-sm text-muted">Each completed request you help with earns you 10 points.</p>
        </aside>
      </div>
    </>
  );
}
