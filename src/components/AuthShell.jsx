import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const points = ["Post a request in under a minute", "See helpers ranked by skills and campus zone", "Chat on every request and build your reputation"];

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen md:grid-cols-[1fr_1.1fr]">
      <aside className="hidden flex-col justify-between bg-[#0f1b3d] p-10 text-white md:flex">
        <Link to="/"><Logo invert /></Link>
        <div>
          <h2 className="max-w-sm text-4xl font-extrabold leading-tight">Campus favours, organised.</h2>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-white/80">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[#0f1b3d]"><Check size={14} /></span>{p}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-white/50">Backend Development project · Chitkara University</p>
      </aside>

      <section className="flex flex-col px-6 py-6">
        <div className="flex items-center">
          <Link to="/" className="text-sm font-semibold underline md:invisible">Back to home</Link>
          <div className="ml-auto"><ThemeToggle /></div>
        </div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-8">
          <h1 className="text-3xl font-extrabold">{title}</h1>
          <p className="mb-6 mt-1 text-muted">{subtitle}</p>
          {children}
        </div>
      </section>
    </div>
  );
}
