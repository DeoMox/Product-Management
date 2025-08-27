import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
});

// ✅ Skip Authorization for login request
api.interceptors.request.use((config) => {
  if (!config.url?.includes("/auth/login")) {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        const token = JSON.parse(saved).token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        // ignore parse errors
      }
    }
  }
  return config;
});

export default api;
