import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, clearSession, setSession } from "../services/api";
import type { User } from "../types";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: { email: string; password: string; fullName: string; educationLevel?: string; weeklyStudyHours?: number }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("pathmentor_access_token");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get<User>("/users/me")
      .then((response) => setUser(response.data))
      .catch(() => clearSession())
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      async login(email, password) {
        const response = await api.post("/auth/login", { email, password });
        setSession(response.data.accessToken, response.data.refreshToken);
        setUser(response.data.user);
      },
      async register(input) {
        const response = await api.post("/auth/register", input);
        setSession(response.data.accessToken, response.data.refreshToken);
        setUser(response.data.user);
      },
      logout() {
        clearSession();
        setUser(null);
      }
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
