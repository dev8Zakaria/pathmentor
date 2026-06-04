import { BookOpen, Bot, LayoutDashboard, LogOut, Map, Settings, Target } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/onboarding", label: "Objective", icon: Target },
  { to: "/quiz", label: "Diagnostic", icon: BookOpen },
  { to: "/roadmap", label: "Career map", icon: Map },
  { to: "/mentor", label: "Mentor", icon: Bot },
  { to: "/admin", label: "Admin", icon: Settings }
];

export function AppLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="app-surface min-h-screen">
      <aside className="fixed inset-y-4 left-4 z-10 hidden w-72 rounded-3xl border border-slate-200 bg-white/90 px-4 py-5 shadow-soft backdrop-blur lg:block">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-white">
            <Target size={20} />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-wider text-indigo-700">PathMentor</p>
            <p className="text-xs text-slate-500">Career learning OS</p>
          </div>
        </div>
        <nav className="space-y-1">
          {nav.filter((item) => user?.role === "ADMIN" || item.to !== "/admin").map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isActive ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="absolute bottom-5 left-4 right-4 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </aside>
      <main className="lg:pl-80">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase text-indigo-700">PathMentor AI</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
          <button onClick={() => navigate("/mentor")} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-indigo-700">
            Mentor AI
          </button>
        </header>
        <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
