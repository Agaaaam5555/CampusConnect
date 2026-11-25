import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { api } from "../api/client";
import PageHeader from "../components/PageHeader";
import RequestCard from "../components/RequestCard";
import Skeleton from "../components/Skeleton";
import { CATEGORIES, URGENCIES } from "../lib/utils";

export default function Requests() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("");
  const [list, setList] = useState(null);

  useEffect(() => {
    setList(null);
    api.getRequests({ category, urgency }).then(setList);
  }, [category, urgency]);

  const shown = list?.filter((r) => `${r.title} ${r.description}`.toLowerCase().includes(q.toLowerCase()));
  const chip = (active) => `btn btn-sm ${active ? "btn-primary" : ""}`;

  return (
    <>
      <PageHeader title="Help requests" subtitle="Find something you can help with, or see what others need.">
        <Link to="/requests/new" className="btn btn-primary"><Plus size={18} />Post a request</Link>
      </PageHeader>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button className={chip(!category)} onClick={() => setCategory("")}>All</button>
        {CATEGORIES.map((c) => <button key={c} className={chip(category === c)} onClick={() => setCategory(c)}>{c}</button>)}
        <select className="input !w-auto sm:ml-auto" aria-label="Urgency" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
          <option value="">Any urgency</option>
          {URGENCIES.map((u) => <option key={u}>{u}</option>)}
        </select>
      </div>

      {q && (
        <p className="mb-4 text-sm text-muted">
          Results for "{q}" · <button className="font-semibold text-fg underline" onClick={() => setParams({})}>Clear search</button>
        </p>
      )}

      {!shown ? <Skeleton count={6} /> : shown.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="font-bold">No requests match.</p>
          <p className="text-muted">Try another category, or post the request yourself.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">{shown.map((r) => <RequestCard key={r._id} request={r} />)}</div>
      )}
    </>
  );
}
