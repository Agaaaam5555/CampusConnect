import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { useAuth } from "../context/AuthContext";
import { ZONE_NAMES } from "../data/campus";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", skills: "", campusZone: ZONE_NAMES[0] });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    setBusy(true);
    setError("");
    try {
      await register({
        name: form.name, email: form.email, password: form.password,
        skillsOffered: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
        campusZone: form.campusZone,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create your account. Try again.");
      setBusy(false);
    }
  };

  return (
    <AuthShell title="Create your account" subtitle="Your skills and zone decide how you are matched.">
      <form onSubmit={submit} className="space-y-4">
        <div><label className="label" htmlFor="name">Full name</label><input id="name" required className="input" value={form.name} onChange={set("name")} /></div>
        <div><label className="label" htmlFor="email">College email</label><input id="email" type="email" required className="input" value={form.email} onChange={set("email")} /></div>
        <div><label className="label" htmlFor="password">Password</label><input id="password" type="password" required className="input" value={form.password} onChange={set("password")} /></div>
        <div>
          <label className="label" htmlFor="skills">Skills you can offer</label>
          <input id="skills" className="input" placeholder="Coding, Notes" value={form.skills} onChange={set("skills")} />
          <p className="mt-1 text-sm text-muted">Separate with commas.</p>
        </div>
        <div>
          <label className="label" htmlFor="zone">Where are you usually on campus?</label>
          <select id="zone" className="input" value={form.campusZone} onChange={set("campusZone")}>{ZONE_NAMES.map((z) => <option key={z}>{z}</option>)}</select>
        </div>
        {error && <p className="font-semibold text-alert">{error}</p>}
        <button className="btn btn-primary w-full" disabled={busy}>{busy ? "Creating..." : "Sign up"}</button>
        <p className="text-sm text-muted">Already have an account? <Link to="/login" className="font-semibold text-fg underline">Log in</Link></p>
      </form>
    </AuthShell>
  );
}
