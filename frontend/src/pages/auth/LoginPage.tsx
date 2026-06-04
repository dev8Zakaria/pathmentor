import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AuthShell } from "./AuthShell";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("student@pathmentor.ai");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Login failed. Check the email and password.");
    }
  }

  return (
    <AuthShell title="Navigate your CS career with a plan, not guesswork." subtitle="Diagnose your level, choose a target role, generate a roadmap, and keep every mentor conversation tied to your progress.">
      <form onSubmit={submit} className="space-y-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Continue the route</p>
          <h2 className="mt-2 text-3xl font-black text-white">Sign in</h2>
          <p className="mt-1 text-sm text-white/60">Demo account is pre-filled after the seed container runs.</p>
        </div>
        {error && <p className="rounded-2xl border border-red-300/25 bg-red-500/12 p-3 text-sm font-semibold text-red-100">{error}</p>}
        <label className="block text-sm font-bold text-white/80">
          Email address
          <input value={email} onChange={(event) => setEmail(event.target.value)} className="focus-ring mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/35 shadow-inner outline-none transition-colors hover:border-white/25" />
        </label>
        <label className="block text-sm font-bold text-white/80">
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="focus-ring mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/35 shadow-inner outline-none transition-colors hover:border-white/25" />
        </label>
        <button className="w-full rounded-full bg-indigo-500 px-4 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(79,70,229,0.34)] transition-colors hover:bg-indigo-400">Sign in</button>
        <p className="text-center text-sm text-white/55">
          New here? <Link to="/register" className="font-bold text-emerald-300 hover:text-emerald-200">Create an account</Link>
        </p>
      </form>
    </AuthShell>
  );
}
