import { createContext, useCallback, useContext, useEffect, useState } from "react";

const Ctx = createContext(() => {});
export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }) {
  const [t, setT] = useState(null);
  const show = useCallback((msg) => setT({ msg, id: Date.now() }), []);

  useEffect(() => {
    if (!t) return;
    const id = setTimeout(() => setT(null), 3200);
    return () => clearTimeout(id);
  }, [t]);

  return (
    <Ctx.Provider value={show}>
      {children}
      {t && (
        <div role="status" className="fixed bottom-5 right-5 z-50 rounded-xl bg-brand px-4 py-3 font-semibold text-brandfg shadow-lg">
          {t.msg}
        </div>
      )}
    </Ctx.Provider>
  );
}
