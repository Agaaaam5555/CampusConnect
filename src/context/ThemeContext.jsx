import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);
export const useTheme = () => useContext(Ctx);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem("cc_theme") || "system");
  const [sysDark, setSysDark] = useState(() => matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const f = (e) => setSysDark(e.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  const resolved = mode === "system" ? (sysDark ? "dark" : "light") : mode;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark");
    localStorage.setItem("cc_theme", mode);
  }, [resolved, mode]);

  const toggle = () => setMode(resolved === "dark" ? "light" : "dark");
  return <Ctx.Provider value={{ mode, setMode, resolved, toggle }}>{children}</Ctx.Provider>;
}
