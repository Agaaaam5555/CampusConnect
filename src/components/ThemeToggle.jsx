import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { resolved, toggle } = useTheme();
  return (
    <button className="btn btn-sm !px-2.5" onClick={toggle} aria-label={`Switch to ${resolved === "dark" ? "light" : "dark"} mode`}>
      {resolved === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
