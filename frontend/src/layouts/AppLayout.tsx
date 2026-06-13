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
      <aside className="fixed inset-y-4 left-4 z-10 hidden w-72 rounded-[4px] border-2 border-[#666666] bg-[#F8F9F9]/95 px-4 py-5 shadow-[8px_8px_0_rgba(102,102,102,0.22)] backdrop-blur lg:block">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="grid h-11 w-11 place-items-center rounded-[4px] border-2 border-[#666666] bg-[#FF5C00] text-white shadow-[4px_4px_0_rgba(102,102,102,0.22)]">
            <Target size={20} />
          </div>
          <div>
            <p className="mono-space text-sm font-black uppercase tracking-wider text-[#FF5C00]">PathMentor</p>
            <p className="text-xs text-[#4B5563]">Career learning OS</p>
          </div>
        </div>
        <nav className="space-y-1">
          {nav.filter((item) => user?.role === "ADMIN" || item.to !== "/admin").map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-[4px] border-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-[#666666] bg-[#666666] text-white shadow-[4px_4px_0_rgba(17,24,39,0.16)]"
                    : "border-transparent text-[#4B5563] hover:border-[#666666] hover:bg-[#FF5C00]/10 hover:text-[#111827]"
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
          className="absolute bottom-5 left-4 right-4 flex items-center justify-center gap-2 rounded-[4px] border-2 border-[#666666] bg-white px-3 py-2 text-sm font-semibold text-[#4B5563] transition-colors hover:bg-[#FF5C00]/10 hover:text-[#111827]"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </aside>
      <main className="lg:pl-80">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b-2 border-[#666666] bg-[#F8F9F9]/92 px-4 shadow-[0_8px_0_rgba(102,102,102,0.08)] backdrop-blur lg:px-8">
          <div>
            <p className="mono-space text-xs font-bold uppercase text-[#FF5C00]">PathMentor AI</p>
            <p className="text-sm text-[#4B5563]">{user?.email}</p>
          </div>
          <button onClick={() => navigate("/mentor")} className="mono-space rounded-[4px] border-2 border-[#666666] bg-[#FF5C00] px-4 py-2 text-sm font-bold text-white shadow-[4px_4px_0_rgba(102,102,102,0.22)] transition-colors hover:bg-[#E55300]">
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
