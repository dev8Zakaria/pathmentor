import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AuthShell } from "./AuthShell";

function FieldHelp({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs leading-5 text-white/48">{children}</p>;
}

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", educationLevel: "", weeklyStudyHours: 6 });
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/onboarding");
    } catch {
      setError("Sign up failed. Check that your email is valid and your password has at least 8 characters.");
    }
  }

  return (
    <AuthShell title="Create a learning profile the mentor can actually use." subtitle="We ask for a few study details so your diagnostic, roadmap, and mentor advice are calibrated instead of generic.">
      <form onSubmit={submit} className="space-y-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Build the profile</p>
          <h2 className="mt-2 text-3xl font-black text-white">Create your account</h2>
          <p className="mt-1 text-sm text-white/60">You will choose your target career on the next screen.</p>
        </div>
        {error && <p className="rounded-2xl border border-red-300/25 bg-red-500/12 p-3 text-sm font-semibold text-red-100">{error}</p>}

        <label className="block text-sm font-bold text-white/80">
          Full name
          <input
            value={form.fullName}
            onChange={(event) => setForm({ ...form, fullName: event.target.value })}
            className="focus-ring mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/35 shadow-inner outline-none transition-colors hover:border-white/25"
            placeholder="Example: Zakaria El Amrani"
            autoComplete="name"
          />
          <FieldHelp>Used only to personalize your dashboard and mentor messages.</FieldHelp>
        </label>

        <label className="block text-sm font-bold text-white/80">
          Email address
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="focus-ring mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/35 shadow-inner outline-none transition-colors hover:border-white/25"
            placeholder="you@example.com"
            autoComplete="email"
          />
          <FieldHelp>This is your login identifier.</FieldHelp>
        </label>

        <label className="block text-sm font-bold text-white/80">
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            className="focus-ring mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/35 shadow-inner outline-none transition-colors hover:border-white/25"
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
          <FieldHelp>Use at least 8 characters. You can improve password rules later for production.</FieldHelp>
        </label>

        <label className="block text-sm font-bold text-white/80">
          Current education level
          <input
            value={form.educationLevel}
            onChange={(event) => setForm({ ...form, educationLevel: event.target.value })}
            className="focus-ring mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/35 shadow-inner outline-none transition-colors hover:border-white/25"
            placeholder="Example: 2nd year CS student, self-taught beginner"
          />
          <FieldHelp>This helps the roadmap avoid being too basic or too advanced.</FieldHelp>
        </label>

        <label className="block text-sm font-bold text-white/80">
          Weekly study capacity
          <input
            type="number"
            min={1}
            max={40}
            value={form.weeklyStudyHours}
            onChange={(event) => setForm({ ...form, weeklyStudyHours: Number(event.target.value) })}
            className="focus-ring mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/35 shadow-inner outline-none transition-colors hover:border-white/25"
          />
          <FieldHelp>How many focused hours per week you can realistically commit.</FieldHelp>
        </label>

        <button className="w-full rounded-full bg-indigo-500 px-4 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(79,70,229,0.34)] transition-colors hover:bg-indigo-400">
          Continue to career selection
        </button>
        <p className="text-center text-sm text-white/55">
          Already registered? <Link to="/login" className="font-bold text-emerald-300 hover:text-emerald-200">Sign in</Link>
        </p>
      </form>
    </AuthShell>
  );
}
