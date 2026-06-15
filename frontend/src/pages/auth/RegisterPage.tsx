import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AuthShell } from "./AuthShell";

function FieldHelp({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs leading-5 text-[#4B5563]">{children}</p>;
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
    } catch (error) {
      const message =
        error instanceof AxiosError && typeof error.response?.data?.message === "string"
          ? error.response.data.message
          : "Sign up failed. Check that your email is valid and your password has at least 8 characters.";
      setError(message);
    }
  }

  return (
    <AuthShell title="Create a learning profile the mentor can actually use." subtitle="We ask for a few study details so your diagnostic, roadmap, and mentor advice are calibrated instead of generic.">
      <form onSubmit={submit} className="space-y-5">
        <div>
          <p className="auth-eyebrow mono-space text-xs font-black uppercase tracking-[0.22em] text-[#FF5C00]">Build the profile</p>
          <h2 className="display-space mt-2 text-3xl font-medium text-[#111827]">Create your account</h2>
          <p className="mt-1 text-sm text-[#4B5563]">You will choose your target career on the next screen.</p>
        </div>
        {error && <p className="auth-error rounded-[4px] border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

        <label className="block text-sm font-bold text-[#111827]">
          Full name
          <input
            value={form.fullName}
            onChange={(event) => setForm({ ...form, fullName: event.target.value })}
            className="focus-ring mt-2 w-full rounded-[4px] border-2 border-[#666666] bg-white px-4 py-3 text-[#111827] placeholder:text-[#4B5563]/55 outline-none transition-colors hover:bg-[#FF5C00]/5"
            placeholder="Example: Zakaria El Amrani"
            autoComplete="name"
          />
          <FieldHelp>Used only to personalize your dashboard and mentor messages.</FieldHelp>
        </label>

        <label className="block text-sm font-bold text-[#111827]">
          Email address
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="focus-ring mt-2 w-full rounded-[4px] border-2 border-[#666666] bg-white px-4 py-3 text-[#111827] placeholder:text-[#4B5563]/55 outline-none transition-colors hover:bg-[#FF5C00]/5"
            placeholder="you@example.com"
            autoComplete="email"
          />
          <FieldHelp>This is your login identifier.</FieldHelp>
        </label>

        <label className="block text-sm font-bold text-[#111827]">
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            className="focus-ring mt-2 w-full rounded-[4px] border-2 border-[#666666] bg-white px-4 py-3 text-[#111827] placeholder:text-[#4B5563]/55 outline-none transition-colors hover:bg-[#FF5C00]/5"
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
          <FieldHelp>Use at least 8 characters. You can improve password rules later for production.</FieldHelp>
        </label>

        <label className="block text-sm font-bold text-[#111827]">
          Current education level
          <input
            value={form.educationLevel}
            onChange={(event) => setForm({ ...form, educationLevel: event.target.value })}
            className="focus-ring mt-2 w-full rounded-[4px] border-2 border-[#666666] bg-white px-4 py-3 text-[#111827] placeholder:text-[#4B5563]/55 outline-none transition-colors hover:bg-[#FF5C00]/5"
            placeholder="Example: 2nd year CS student, self-taught beginner"
          />
          <FieldHelp>This helps the roadmap avoid being too basic or too advanced.</FieldHelp>
        </label>

        <label className="block text-sm font-bold text-[#111827]">
          Weekly study capacity
          <input
            type="number"
            min={1}
            max={40}
            value={form.weeklyStudyHours}
            onChange={(event) => setForm({ ...form, weeklyStudyHours: Number(event.target.value) })}
            className="focus-ring mt-2 w-full rounded-[4px] border-2 border-[#666666] bg-white px-4 py-3 text-[#111827] placeholder:text-[#4B5563]/55 outline-none transition-colors hover:bg-[#FF5C00]/5"
          />
          <FieldHelp>How many focused hours per week you can realistically commit.</FieldHelp>
        </label>

        <button className="mono-space w-full rounded-[4px] border-2 border-[#666666] bg-[#FF5C00] px-4 py-3 text-sm font-black text-white shadow-[5px_5px_0_rgba(102,102,102,0.24)] transition-colors hover:bg-[#E55300]">
          Continue to career selection
        </button>
        <p className="text-center text-sm text-[#4B5563]">
          Already registered? <Link to="/login" className="font-bold text-[#FF5C00] hover:text-[#E55300]">Sign in</Link>
        </p>
      </form>
    </AuthShell>
  );
}
