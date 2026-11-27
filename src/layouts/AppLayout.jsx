import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  ClipboardList, LayoutDashboard, LogOut, Map as MapIcon, Menu, MessageSquare,
  Plus, Search, Settings, User, X,
} from "lucide-react";
import Logo from "../components/Logo";
import Avatar from "../components/Avatar";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";

const items = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/requests", "Requests", ClipboardList],
  ["/map", "Campus map", MapIcon],
  ["/messages", "Messages", MessageSquare],
  ["/profile", "My profile", User],
  ["/settings", "Settings", Settings],
];

function Nav({ onNavigate }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const link = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 font-semibold ${isActive ? "bg-brand text-brandfg" : "hover:bg-surface2"}`;

  return (
    <div className="flex h-full flex-col gap-1 p-4">
      <Link to="/" className="mb-4 px-1"><Logo /></Link>
      <Link to="/requests/new" onClick={onNavigate} className="btn btn-primary mb-3"><Plus size={18} />Post a request</Link>
      {items.map(([to, label, Icon]) => (
        <NavLink key={to} to={to} className={link} onClick={onNavigate}>
          <Icon size={19} />{label}
        </NavLink>
      ))}
      <div className="mt-auto flex items-center gap-3 border-t border-line pt-4">
        <Avatar name={user.name} size={36} />
        <div className="min-w-0">
          <p className="truncate font-semibold">{user.name}</p>
          <p className="truncate text-xs text-muted">{user.email}</p>
        </div>
        <button className="ml-auto" aria-label="Log out" onClick={() => { logout(); navigate("/"); }}><LogOut size={18} /></button>
      </div>
    </div>
  );
}

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    navigate(`/requests?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="min-h-screen md:grid md:grid-cols-[250px_1fr]">
      <aside className="sticky top-0 hidden h-screen border-r border-line bg-surface md:block">
        <Nav />
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-surface">
            <button className="absolute right-3 top-3" aria-label="Close menu" onClick={() => setOpen(false)}><X size={22} /></button>
            <Nav onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-bg/90 px-4 py-3 backdrop-blur">
          <button className="md:hidden" aria-label="Open menu" onClick={() => setOpen(true)}><Menu size={24} /></button>
          <form onSubmit={search} className="relative max-w-md flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input className="input !pl-10" placeholder="Search requests" aria-label="Search requests" value={q} onChange={(e) => setQ(e.target.value)} />
          </form>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8"><Outlet /></main>
      </div>
    </div>
  );
}
