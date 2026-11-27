import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import PageHeader from "../components/PageHeader";
import RequestCard from "../components/RequestCard";
import { ZONE_NAMES } from "../data/campus";
import { CATEGORIES, URGENCIES } from "../lib/utils";

export default function CreateRequest() {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", category: CATEGORIES[0], urgency: "Medium", campusZone: user.campusZone || ZONE_NAMES[0] });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const created = await api.createRequest(form);
      toast("Request posted");
      navigate(`/requests/${created._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not post your request. Try again.");
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader title="Post a request" subtitle="Be specific. Clear requests get matched faster." />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={submit} className="card space-y-4 p-6">
          <div><label className="label" htmlFor="title">What do you need?</label><input id="title" required className="input" placeholder="e.g. Need Scientific Calculator" value={form.title} onChange={set("title")} /></div>
          <div><label className="label" htmlFor="description">Details</label><textarea id="description" required rows={4} className="input" value={form.description} onChange={set("description")} /></div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div><label className="label" htmlFor="category">Category</label><select id="category" className="input" value={form.category} onChange={set("category")}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
            <div><label className="label" htmlFor="urgency">Urgency</label><select id="urgency" className="input" value={form.urgency} onChange={set("urgency")}>{URGENCIES.map((u) => <option key={u}>{u}</option>)}</select></div>
            <div><label className="label" htmlFor="zone">Campus zone</label><select id="zone" className="input" value={form.campusZone} onChange={set("campusZone")}>{ZONE_NAMES.map((z) => <option key={z}>{z}</option>)}</select></div>
          </div>
          {error && <p className="font-semibold text-alert">{error}</p>}
          <button className="btn btn-primary" disabled={busy}>{busy ? "Posting..." : "Post request"}</button>
        </form>

        <div>
          <p className="mb-2 text-sm font-semibold text-muted">Preview</p>
          <RequestCard preview request={{ ...form, status: "Open", requester: { name: user.name }, createdAt: new Date().toISOString() }} />
        </div>
      </div>
    </>
  );
}
