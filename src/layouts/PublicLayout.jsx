import { Link, NavLink, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function PublicLayout() {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <Link to="/"><Logo /></Link>
          <NavLink to="/how-it-works" className="ml-4 hidden font-semibold hover:underline sm:block">How it works</NavLink>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <Link to="/dashboard" className="btn btn-primary btn-sm">Open app</Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-sm">Log in</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Sign up</Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1"><Outlet /></main>

      <footer className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-8 text-sm text-muted">
          <Logo size={22} />
          <p>A Backend Development course project · Chitkara University, Punjab</p>
          <Link to="/how-it-works" className="ml-auto font-semibold hover:underline">How it works</Link>
        </div>
      </footer>
    </div>
  );
}
