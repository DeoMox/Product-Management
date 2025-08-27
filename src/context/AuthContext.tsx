import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios"; // direct axios for login test
import api from "../services/api";

interface User {
  id: number;
  username: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // ✅ Debug log
      console.log("Sending payload:", { username, password });

      // ✅ Call API directly to avoid interceptor issues
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      }, {
        headers: { "Content-Type": "application/json" }
      });

      const loggedUser = res.data;
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));

      console.log("Login success:", loggedUser);

      return true;
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid credentials");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
