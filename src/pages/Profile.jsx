import { MapPin, Trophy } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/Avatar";
import PageHeader from "../components/PageHeader";
import { levelFor } from "../lib/utils";

export default function Profile() {
  const { user } = useAuth();
  const rep = user.reputationPoints ?? 0;
  const lvl = levelFor(rep);

  return (
    <>
      <PageHeader title="My profile" subtitle="Your skills and campus zone decide how you are matched as a helper." />
      <div className="grid gap-8 md:grid-cols-[320px_1fr]">
        <div className="card p-6 text-center">
          <Avatar name={user.name} size={84} />
          <h2 className="mt-3 text-xl font-bold">{user.name}</h2>
          <p className="text-muted">{user.email}</p>
          <span className="chip mt-3 bg-accent/20">{lvl.name}</span>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <p className="flex items-center gap-2 text-sm text-muted"><Trophy size={16} />Reputation</p>
            <p className="font-display text-4xl font-extrabold">{rep} <span className="text-lg font-semibold text-muted">points</span></p>
            <div className="mt-3 h-2 rounded bg-surface2"><div className="h-2 rounded bg-accent" style={{ width: `${lvl.pct}%` }} /></div>
            <p className="mt-2 text-sm text-muted">{lvl.next ? `${lvl.toNext} points to ${lvl.next}` : "Top level reached"}</p>
          </div>
          <div className="card p-6">
            <h3 className="font-bold">Skills offered</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {user.skillsOffered?.length ? user.skillsOffered.map((s) => <span key={s} className="chip">{s}</span>) : <span className="text-muted">No skills added.</span>}
            </div>
            <p className="mt-5 flex items-center gap-2 text-muted"><MapPin size={16} />{user.campusZone || "No campus zone set"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
