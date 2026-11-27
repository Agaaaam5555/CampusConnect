import { useNavigate } from "react-router-dom";
import { Monitor, Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import PageHeader from "../components/PageHeader";

const modes = [["light", "Light", Sun], ["dark", "Dark", Moon], ["system", "System", Monitor]];

export default function Settings() {
  const { user, logout } = useAuth();
  const { mode, setMode } = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Settings" />
      <div className="max-w-2xl space-y-6">
        <section className="card p-6">
          <h2 className="text-lg font-bold">Appearance</h2>
          <div className="mt-3 grid grid-cols-3 gap-3" role="radiogroup" aria-label="Theme">
            {modes.map(([key, label, Icon]) => (
              <button key={key} role="radio" aria-checked={mode === key} onClick={() => setMode(key)}
                className={`btn flex-col !py-4 ${mode === key ? "!border-accent !bg-accent/15" : ""}`}>
                <Icon size={22} />{label}
              </button>
            ))}
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-bold">Account</h2>
          <p className="mt-2 text-muted">Signed in as {user.email}</p>
          <button className="btn btn-danger mt-4" onClick={() => { logout(); navigate("/"); }}>Log out</button>
        </section>
      </div>
    </>
  );
}
