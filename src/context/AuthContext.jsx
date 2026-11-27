import { createContext, useContext, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cc_user")); } catch { return null; }
  });

  const save = ({ token, user }) => {
    localStorage.setItem("cc_token", token);
    localStorage.setItem("cc_user", JSON.stringify(user));
    setUser(user);
  };
  const login = async (d) => save(await api.login(d));
  const register = async (d) => save(await api.register(d));
  const updateUser = (u) => {
    localStorage.setItem("cc_user", JSON.stringify(u));
    setUser(u);
  };
  const logout = () => {
    localStorage.removeItem("cc_token");
    localStorage.removeItem("cc_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
