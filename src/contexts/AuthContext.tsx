import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { User, loginUser as loginFn, registerUser as registerFn, getUserById } from "@/lib/dataStore";

interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string) => boolean;
  register: (data: Omit<User, "id" | "alugueis">) => boolean;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY = "autorent_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const id = localStorage.getItem(SESSION_KEY);
    return id ? getUserById(Number(id)) : null;
  });

  const login = useCallback((email: string, senha: string) => {
    const u = loginFn(email, senha);
    if (u) {
      setUser(u);
      localStorage.setItem(SESSION_KEY, String(u.id));
      return true;
    }
    return false;
  }, []);

  const register = useCallback((data: Omit<User, "id" | "alugueis">) => {
    const u = registerFn(data);
    if (u) {
      setUser(u);
      localStorage.setItem(SESSION_KEY, String(u.id));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const refreshUser = useCallback(() => {
    if (user) {
      const fresh = getUserById(user.id);
      if (fresh) setUser(fresh);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
