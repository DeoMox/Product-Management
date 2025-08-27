import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, error, loading } = useAuth();
  const [username, setUsername] = useState("kminchelle");
  const [password, setPassword] = useState("0lelplR");
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await login(username.trim(), password.trim());
    if (ok) navigate("/products");
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="card w-full max-w-md space-y-4 p-6 shadow rounded-xl bg-white">
        <h1 className="text-2xl font-bold text-center">Sign in</h1>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </div>
        )}

        <div>
          <label className="label">Username</label>
          <input
            className="input w-full border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            className="input w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Signing in…" : "Login"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Tip: Dummy creds prefilled (<b>kminchelle / 0lelplR</b>)
        </p>
      </form>
    </div>
  );
}
