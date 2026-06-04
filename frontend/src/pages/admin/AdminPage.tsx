import { BarChart3, Database, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { StatusPill } from "../../components/StatusPill";
import { api } from "../../services/api";
import type { CareerGoal, Resource } from "../../types";

type Stats = {
  users: number;
  roadmaps: number;
  quizAttempts: number;
};

export function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [careers, setCareers] = useState<CareerGoal[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.get("/admin/stats"),
      api.get("/career-goals"),
      api.get("/resources")
    ])
      .then(([statsResponse, careerResponse, resourceResponse]) => {
        setStats(statsResponse.data);
        setCareers(careerResponse.data);
        setResources(resourceResponse.data);
      })
      .catch(() => setError("Accès admin requis."));
  }, []);

  if (error) return <p className="rounded-lg bg-white p-6 font-bold text-red-800 shadow-soft">{error}</p>;

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-white p-6 shadow-soft">
        <p className="text-sm font-bold uppercase text-pine">Administration</p>
        <h1 className="text-3xl font-black text-ink">Pilotage du catalogue</h1>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Utilisateurs", value: stats?.users ?? 0, icon: GraduationCap },
          { label: "Roadmaps", value: stats?.roadmaps ?? 0, icon: BarChart3 },
          { label: "Quiz passés", value: stats?.quizAttempts ?? 0, icon: Database }
        ].map((item) => (
          <div key={item.label} className="rounded-lg bg-white p-5 shadow-soft">
            <item.icon className="text-pine" size={22} />
            <p className="mt-4 text-sm font-bold text-slate-500">{item.label}</p>
            <p className="text-3xl font-black text-ink">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-5 shadow-soft">
          <h2 className="mb-4 text-lg font-black text-ink">Métiers</h2>
          <div className="space-y-3">
            {careers.map((career) => (
              <div key={career._id} className="rounded-md border border-slate-200 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-ink">{career.name}</p>
                  <StatusPill value={career.difficulty} />
                </div>
                <p className="mt-1 text-sm text-slate-600">{career.domains.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-soft">
          <h2 className="mb-4 text-lg font-black text-ink">Ressources</h2>
          <div className="space-y-3">
            {resources.slice(0, 8).map((resource) => (
              <div key={resource._id} className="rounded-md border border-slate-200 p-3">
                <p className="font-bold text-ink">{resource.title}</p>
                <p className="mt-1 text-sm text-slate-600">{resource.skillTags.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
