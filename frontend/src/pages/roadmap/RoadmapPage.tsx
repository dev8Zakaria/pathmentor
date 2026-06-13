import { CheckCircle2, Clock, Flag, LockKeyhole, Maximize2, Minus, Move, Plus, RefreshCcw, Route, ShieldAlert, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { StatusPill } from "../../components/StatusPill";
import { api } from "../../services/api";
import type { Roadmap, RoadmapTask } from "../../types";

const phasePositions = [
  { x: 260, y: 240 },
  { x: 720, y: 590 },
  { x: 1160, y: 260 },
  { x: 1540, y: 560 }
];

const CANVAS_WIDTH = 1840;
const CANVAS_HEIGHT = 820;
const NODE_WIDTH = 310;
const statusOptions: RoadmapTask["status"][] = ["TODO", "IN_PROGRESS", "DONE", "BLOCKED"];
type NodePosition = { x: number; y: number };
type RouteEdge = { start: NodePosition; end: NodePosition; path: string };

function statusIcon(status: RoadmapTask["status"]) {
  if (status === "DONE") return <CheckCircle2 size={16} />;
  if (status === "BLOCKED") return <ShieldAlert size={16} />;
  if (status === "IN_PROGRESS") return <Clock size={16} />;
  return <LockKeyhole size={16} />;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function buildWorkflowEdge(from: NodePosition, to: NodePosition): RouteEdge {
  const start = { x: from.x + NODE_WIDTH / 2, y: from.y };
  const end = { x: to.x - NODE_WIDTH / 2, y: to.y };
  const distance = Math.max(90, Math.abs(end.x - start.x) * 0.5);
  return {
    start,
    end,
    path: `M ${start.x} ${start.y} C ${start.x + distance} ${start.y}, ${end.x - distance} ${end.y}, ${end.x} ${end.y}`
  };
}

export function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.72);
  const [nodePositions, setNodePositions] = useState<Record<string, NodePosition>>({});

  function load() {
    api.get("/users/me/roadmap").then((response) => {
      setRoadmap(response.data);
      setSelectedPhaseId(response.data?.phases?.[0]?.id ?? null);
    });
  }

  useEffect(load, []);

  useEffect(() => {
    if (!roadmap) return;
    setNodePositions((current) => {
      const next = { ...current };
      roadmap.phases.forEach((phase, index) => {
        if (!next[phase.id]) next[phase.id] = phasePositions[index] ?? phasePositions[phasePositions.length - 1];
      });
      return next;
    });
  }, [roadmap]);

  const selectedPhase = useMemo(() => {
    return roadmap?.phases.find((phase) => phase.id === selectedPhaseId) ?? roadmap?.phases[0] ?? null;
  }, [roadmap, selectedPhaseId]);

  const routePoints = useMemo(() => {
    if (!roadmap) return [];
    return roadmap.phases.map((phase, index) => nodePositions[phase.id] ?? phasePositions[index] ?? phasePositions[phasePositions.length - 1]);
  }, [roadmap, nodePositions]);

  const routeEdges = useMemo(() => {
    return routePoints.slice(0, -1).map((point, index) => buildWorkflowEdge(point, routePoints[index + 1]));
  }, [routePoints]);

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

  function startNodeDrag(phaseId: string, fallbackPosition: NodePosition, event: ReactPointerEvent<HTMLButtonElement>) {
    if (window.matchMedia("(max-width: 900px)").matches) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedPhaseId(phaseId);

    const origin = nodePositions[phaseId] ?? fallbackPosition;
    const startX = event.clientX;
    const startY = event.clientY;

    function onMove(moveEvent: PointerEvent) {
      const nextX = clamp(origin.x + (moveEvent.clientX - startX) / zoom, 130, CANVAS_WIDTH - 130);
      const nextY = clamp(origin.y + (moveEvent.clientY - startY) / zoom, 120, CANVAS_HEIGHT - 120);
      setNodePositions((current) => ({ ...current, [phaseId]: { x: nextX, y: nextY } }));
    }

    function onUp() {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
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
            <p className="mono-space flex items-center gap-2 text-sm font-bold uppercase text-[#FF5C00]">
              <Route size={16} />
              Career map
            </p>
            <h1 className="display-space mt-2 text-4xl text-ink">{roadmap.title}</h1>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">{roadmap.summary}</p>
          </div>
          <button onClick={regenerate} className="mono-space inline-flex items-center gap-2 rounded-[4px] border-2 border-[#666666] bg-[#FF5C00] px-4 py-2 text-sm font-bold text-white shadow-[4px_4px_0_rgba(102,102,102,0.22)] transition-colors hover:bg-[#E55300]">
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
            Regenerate
          </button>
        </div>
        <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${roadmap.progressPercentage}%` }}
            className="h-full rounded-full bg-gradient-to-r from-[#FF5C00] to-[#E55300]"
          />
        </div>
        <p className="mt-2 text-sm font-bold text-slate-600">{roadmap.progressPercentage}% complete</p>
      </section>

      <section className="space-y-5">
        <div className="panel overflow-hidden p-4 md:p-6">
          <div className="relative z-[2] flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="mono-space flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#FF5C00]">
                <Sparkles size={15} />
                Canvas view
              </p>
              <h2 className="display-space mt-1 text-3xl text-ink">Full roadmap and phase notes</h2>
              <p className="mt-1 text-xs font-bold text-slate-500">Scroll sideways, zoom the map, then grab any phase node to move it.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => setZoom((value) => clamp(Number((value - 0.08).toFixed(2)), 0.5, 1.1))} className="grid h-10 w-10 place-items-center rounded-[4px] border-2 border-[#666666] bg-white text-[#4B5563] transition-colors hover:bg-[#FF5C00] hover:text-white" aria-label="Zoom out">
                <Minus size={16} />
              </button>
              <div className="mono-space rounded-[4px] border-2 border-[#666666] bg-white px-3 py-2 text-xs font-black text-[#4B5563]">{Math.round(zoom * 100)}%</div>
              <button type="button" onClick={() => setZoom((value) => clamp(Number((value + 0.08).toFixed(2)), 0.5, 1.1))} className="grid h-10 w-10 place-items-center rounded-[4px] border-2 border-[#666666] bg-white text-[#4B5563] transition-colors hover:bg-[#FF5C00] hover:text-white" aria-label="Zoom in">
                <Plus size={16} />
              </button>
              <button type="button" onClick={() => setZoom(0.72)} className="mono-space inline-flex h-10 items-center gap-2 rounded-[4px] border-2 border-[#666666] bg-white px-3 text-xs font-black text-[#4B5563] transition-colors hover:bg-[#E55300] hover:text-white">
                <Maximize2 size={15} />
                Fit
              </button>
              {selectedPhase && (
                <div className="rounded-[4px] border-2 border-[#666666] bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
                  <p className="text-xs font-black uppercase text-slate-400">Selected</p>
                  <p className="text-sm font-black text-[#FF5C00]">Phase {selectedPhase.order}: {selectedPhase.title}</p>
                </div>
              )}
            </div>
          </div>

          <div className="roadmap-canvas mt-5 overflow-x-auto overflow-y-hidden rounded-[4px] border-2 border-[#666666]">
            <div
              className="relative"
              style={{
                width: CANVAS_WIDTH * zoom,
                height: CANVAS_HEIGHT * zoom
              }}
            >
              <div
                className="absolute left-0 top-0"
                style={{
                  width: CANVAS_WIDTH,
                  height: CANVAS_HEIGHT,
                  transform: `scale(${zoom})`,
                  transformOrigin: "top left"
                }}
              >
                <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`} preserveAspectRatio="none" aria-hidden="true">
                  {routeEdges.map((edge, index) => (
                    <g key={`${edge.start.x}-${edge.end.x}-${index}`}>
                      <motion.path
                        d={edge.path}
                        fill="none"
                        stroke="rgba(102, 102, 102, 0.22)"
                        strokeWidth="16"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1, d: edge.path }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      />
                      <motion.path
                        d={edge.path}
                        fill="none"
                        stroke="rgba(255, 92, 0, 0.8)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="10 12"
                        animate={{ d: edge.path, strokeDashoffset: -132 }}
                        transition={{ duration: 0.95, repeat: Infinity, ease: "linear" }}
                      />
                      <circle r="5" fill="#FF5C00">
                        <animateMotion dur="1.05s" repeatCount="indefinite" path={edge.path} begin={`${index * 0.18}s`} />
                      </circle>
                      <circle cx={edge.start.x} cy={edge.start.y} r="7" fill="#F8F9F9" stroke="#FF5C00" strokeWidth="4" />
                      <circle cx={edge.end.x} cy={edge.end.y} r="7" fill="#F8F9F9" stroke="#E55300" strokeWidth="4" />
                    </g>
                  ))}
                </svg>

                {roadmap.phases.map((phase, index) => {
                  const fallbackPosition = phasePositions[index] ?? phasePositions[phasePositions.length - 1];
                  const position = nodePositions[phase.id] ?? fallbackPosition;
                  const done = phase.tasks.filter((task) => task.status === "DONE").length;
                  const blocked = phase.tasks.filter((task) => task.status === "BLOCKED").length;
                  const selected = selectedPhase?.id === phase.id;
                  return (
                    <motion.button
                      key={phase.id}
                      type="button"
                      onPointerDown={(event) => startNodeDrag(phase.id, fallbackPosition, event)}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.08 }}
                      className={`roadmap-node absolute w-[310px] cursor-grab touch-none rounded-[4px] border-2 p-4 text-left transition-colors active:cursor-grabbing ${selected ? "border-[#FF5C00] bg-white shadow-[8px_8px_0_rgba(255,92,0,0.22)] ring-4 ring-[#FF5C00]/10" : "border-[#666666] bg-white/95 shadow-[8px_8px_0_rgba(102,102,102,0.16)] hover:bg-[#F8F9F9]"}`}
                      style={{ left: position.x, top: position.y, translate: "-50% -50%" }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="mono-space flex items-center gap-2 text-xs font-black uppercase text-[#FF5C00]">
                            <Move size={13} />
                            Phase {phase.order}
                          </p>
                          <h3 className="display-space mt-1 text-2xl leading-tight text-ink">{phase.title}</h3>
                        </div>
                        {index === roadmap.phases.length - 1 ? <Flag className="text-[#E55300]" size={22} /> : <Route className="text-[#FF5C00]" size={22} />}
                      </div>
                      <p className={`mt-3 text-xs leading-5 ${selected ? "text-[#111827]" : "text-slate-600"}`}>{phase.objective}</p>
                      <div className="mt-4 flex items-center justify-between text-xs font-bold text-slate-500">
                        <span>{done}/{phase.tasks.length} done</span>
                        {blocked > 0 && <span className="text-red-700">{blocked} blocked</span>}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {selectedPhase && (
            <motion.div
              key={selectedPhase.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 rounded-[4px] border-2 border-[#666666] bg-white/95 p-4 shadow-[6px_6px_0_rgba(102,102,102,0.14)] backdrop-blur md:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="mono-space text-xs font-black uppercase text-[#FF5C00]">Phase note</p>
                  <h3 className="mt-1 text-xl font-black text-ink">{selectedPhase.title}</h3>
                  <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{selectedPhase.objective}</p>
                </div>
                <p className="mono-space rounded-[4px] border border-[#666666] bg-[#FF5C00]/10 px-3 py-1 text-xs font-black text-[#111827]">Drag phase nodes to reorganize the map</p>
              </div>
              <div className="mt-4 grid gap-2 text-center sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 px-3 py-2">
                  <p className="text-lg font-black text-ink">{selectedPhase.tasks.length}</p>
                  <p className="text-[11px] font-bold uppercase text-slate-400">Tasks</p>
                </div>
                <div className="rounded-[4px] bg-[#FF5C00]/10 px-3 py-2">
                  <p className="text-lg font-black text-[#E55300]">{selectedPhase.tasks.filter((task) => task.status === "DONE").length}</p>
                  <p className="text-[11px] font-bold uppercase text-[#4B5563]">Done</p>
                </div>
                <div className="rounded-[4px] bg-[#666666]/10 px-3 py-2">
                  <p className="text-lg font-black text-[#111827]">{selectedPhase.tasks.reduce((sum, task) => sum + task.estimatedHours, 0)}h</p>
                  <p className="text-[11px] font-bold uppercase text-[#4B5563]">Effort</p>
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
                  <p className="mono-space text-sm font-bold uppercase text-[#FF5C00]">Task workbench</p>
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
                          <span className="text-[#FF5C00]">{statusIcon(task.status)}</span>
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
                          className={`mono-space rounded-[4px] border px-3 py-2 text-xs font-black transition-colors ${task.status === status ? "border-[#666666] bg-[#FF5C00]/10 text-[#E55300]" : "border-slate-200 text-slate-600 hover:border-[#FF5C00]"}`}
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
