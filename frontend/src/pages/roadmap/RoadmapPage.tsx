import { CheckCircle2, Clock, Flag, LockKeyhole, RefreshCcw, Route, ShieldAlert, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { StatusPill } from "../../components/StatusPill";
import { api } from "../../services/api";
import type { Roadmap, RoadmapTask } from "../../types";

const phasePositions = [
  { x: 14, y: 22 },
  { x: 36, y: 68 },
  { x: 63, y: 28 },
  { x: 84, y: 64 }
];

const statusOptions: RoadmapTask["status"][] = ["TODO", "IN_PROGRESS", "DONE", "BLOCKED"];

function statusIcon(status: RoadmapTask["status"]) {
  if (status === "DONE") return <CheckCircle2 size={16} />;
  if (status === "BLOCKED") return <ShieldAlert size={16} />;
  if (status === "IN_PROGRESS") return <Clock size={16} />;
  return <LockKeyhole size={16} />;
}

export function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);

  function load() {
    api.get("/users/me/roadmap").then((response) => {
      setRoadmap(response.data);
      setSelectedPhaseId(response.data?.phases?.[0]?.id ?? null);
    });
  }

  useEffect(load, []);

  const selectedPhase = useMemo(() => {
    return roadmap?.phases.find((phase) => phase.id === selectedPhaseId) ?? roadmap?.phases[0] ?? null;
  }, [roadmap, selectedPhaseId]);

  async function updateTask(task: RoadmapTask, status: RoadmapTask["status"]) {
    if (!roadmap) return;
    const response = await api.put(`/roadmaps/${roadmap._id}/tasks/${task.id}/status`, { status });
    setRoadmap(response.data);
  }

  async function regenerate() {
    setLoading(true);
    try {
      const response = await api.post("/roadmaps/generate");
      setRoadmap(response.data.roadmap);
      setSelectedPhaseId(response.data.roadmap.phases[0]?.id ?? null);
    } finally {
      setLoading(false);
    }
  }

  if (!roadmap) {
    return (
      <div className="panel p-6">
        <h1 className="text-2xl font-black text-ink">No active roadmap yet</h1>
        <p className="mt-2 text-sm text-slate-600">Take the diagnostic quiz, then generate your personalized roadmap.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="panel overflow-hidden p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold uppercase text-indigo-700">
              <Route size={16} />
              Career map
            </p>
            <h1 className="mt-2 text-3xl font-black text-ink">{roadmap.title}</h1>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">{roadmap.summary}</p>
          </div>
          <button onClick={regenerate} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-700">
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
            Regenerate
          </button>
        </div>
        <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${roadmap.progressPercentage}%` }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-emerald-500"
          />
        </div>
        <p className="mt-2 text-sm font-bold text-slate-600">{roadmap.progressPercentage}% complete</p>
      </section>

      <section className="space-y-5">
        <div className="roadmap-canvas panel relative min-h-[760px] overflow-hidden p-4 md:p-6">
          <div className="relative z-[2] flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-indigo-700">
                <Sparkles size={15} />
                Canvas view
              </p>
              <h2 className="mt-1 text-xl font-black text-ink">Full roadmap and phase notes</h2>
            </div>
            {selectedPhase && (
              <div className="rounded-2xl border border-indigo-100 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
                <p className="text-xs font-black uppercase text-slate-400">Selected</p>
                <p className="text-sm font-black text-indigo-700">Phase {selectedPhase.order}: {selectedPhase.title}</p>
              </div>
            )}
          </div>

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 80" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M 12 22 C 24 12, 30 72, 38 62 S 54 18, 66 26 S 78 74, 88 66"
              fill="none"
              stroke="rgba(79, 70, 229, 0.28)"
              strokeWidth="1.25"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>

          {roadmap.phases.map((phase, index) => {
            const position = phasePositions[index] ?? phasePositions[phasePositions.length - 1];
            const done = phase.tasks.filter((task) => task.status === "DONE").length;
            const blocked = phase.tasks.filter((task) => task.status === "BLOCKED").length;
            const selected = selectedPhase?.id === phase.id;
            return (
              <motion.button
                key={phase.id}
                type="button"
                onClick={() => setSelectedPhaseId(phase.id)}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 }}
                className={`roadmap-node absolute w-[min(21vw,300px)] min-w-[220px] rounded-2xl border p-4 text-left shadow-soft transition-colors ${selected ? "border-indigo-500 bg-indigo-50" : "border-slate-200 bg-white/95 hover:border-indigo-300"}`}
                style={{ left: `${position.x}%`, top: `${position.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase text-indigo-700">Phase {phase.order}</p>
                    <h3 className="mt-1 text-lg font-black leading-tight text-ink">{phase.title}</h3>
                  </div>
                  {index === roadmap.phases.length - 1 ? <Flag className="text-emerald-600" size={22} /> : <Route className="text-indigo-600" size={22} />}
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-600">{phase.objective}</p>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>{done}/{phase.tasks.length} done</span>
                  {blocked > 0 && <span className="text-red-700">{blocked} blocked</span>}
                </div>
              </motion.button>
            );
          })}

          {selectedPhase && (
            <motion.div
              key={selectedPhase.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-5 left-5 right-5 z-[3] rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-soft backdrop-blur md:left-6 md:right-auto md:w-[430px] md:p-5"
            >
              <p className="text-xs font-black uppercase text-indigo-700">Phase note</p>
              <h3 className="mt-1 text-xl font-black text-ink">{selectedPhase.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{selectedPhase.objective}</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl bg-slate-50 px-3 py-2">
                  <p className="text-lg font-black text-ink">{selectedPhase.tasks.length}</p>
                  <p className="text-[11px] font-bold uppercase text-slate-400">Tasks</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-3 py-2">
                  <p className="text-lg font-black text-emerald-700">{selectedPhase.tasks.filter((task) => task.status === "DONE").length}</p>
                  <p className="text-[11px] font-bold uppercase text-emerald-700/70">Done</p>
                </div>
                <div className="rounded-2xl bg-indigo-50 px-3 py-2">
                  <p className="text-lg font-black text-indigo-700">{selectedPhase.tasks.reduce((sum, task) => sum + task.estimatedHours, 0)}h</p>
                  <p className="text-[11px] font-bold uppercase text-indigo-700/70">Effort</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <aside className="panel p-5 md:p-6">
          {selectedPhase && (
            <>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase text-indigo-700">Task workbench</p>
                  <h2 className="mt-1 text-2xl font-black text-ink">{selectedPhase.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{selectedPhase.objective}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">
                  {selectedPhase.tasks.filter((task) => task.status === "DONE").length}/{selectedPhase.tasks.length} tasks complete
                </div>
              </div>
              <div className="mt-5 grid gap-3 xl:grid-cols-2 2xl:grid-cols-3">
                {selectedPhase.tasks.map((task) => (
                  <div key={task.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-indigo-700">{statusIcon(task.status)}</span>
                          <h3 className="font-black text-ink">{task.title}</h3>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{task.description}</p>
                        <p className="mt-2 text-xs font-bold uppercase text-slate-400">{task.skill} - {task.estimatedHours}h</p>
                      </div>
                      <StatusPill value={task.status} />
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => updateTask(task, status)}
                          className={`rounded-lg border px-3 py-2 text-xs font-black transition-colors ${task.status === status ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600 hover:border-indigo-300"}`}
                        >
                          {status.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </aside>
      </section>
    </div>
  );
}
