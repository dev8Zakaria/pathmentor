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
          <p className="mono-space text-xs font-black uppercase tracking-[0.22em] text-[#FF5C00]">Continue the route</p>
          <h2 className="display-space mt-2 text-3xl font-medium text-[#111827]">Sign in</h2>
          <p className="mt-1 text-sm text-[#4B5563]">Demo account is pre-filled after the seed container runs.</p>
        </div>
        {error && <p className="rounded-2xl border border-red-300/25 bg-red-500/12 p-3 text-sm font-semibold text-red-100">{error}</p>}
        <label className="block text-sm font-bold text-[#111827]">
          Email address
          <input value={email} onChange={(event) => setEmail(event.target.value)} className="focus-ring mt-2 w-full rounded-[4px] border-2 border-[#666666] bg-white px-4 py-3 text-[#111827] placeholder:text-[#4B5563]/55 outline-none transition-colors hover:bg-[#FF5C00]/5" />
        </label>
        <label className="block text-sm font-bold text-[#111827]">
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="focus-ring mt-2 w-full rounded-[4px] border-2 border-[#666666] bg-white px-4 py-3 text-[#111827] placeholder:text-[#4B5563]/55 outline-none transition-colors hover:bg-[#FF5C00]/5" />
        </label>
        <button className="mono-space w-full rounded-[4px] border-2 border-[#666666] bg-[#FF5C00] px-4 py-3 text-sm font-black text-white shadow-[5px_5px_0_rgba(102,102,102,0.24)] transition-colors hover:bg-[#E55300]">Sign in</button>
        <p className="text-center text-sm text-[#4B5563]">
          New here? <Link to="/register" className="font-bold text-[#FF5C00] hover:text-[#E55300]">Create an account</Link>
        </p>
      </form>
    </AuthShell>
  );
}
