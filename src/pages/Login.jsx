import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Could not log in. Check your email and password.");
      setBusy(false);
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to see your requests and matches.">
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="label" htmlFor="email">College email</label>
          <input id="email" type="email" required className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input id="password" type="password" required className="input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        {error && <p className="font-semibold text-alert">{error}</p>}
        <button className="btn btn-primary w-full" disabled={busy}>{busy ? "Logging in..." : "Log in"}</button>
        <p className="text-sm text-muted">New here? <Link to="/register" className="font-semibold text-fg underline">Create an account</Link></p>
      </form>
    </AuthShell>
  );
}
