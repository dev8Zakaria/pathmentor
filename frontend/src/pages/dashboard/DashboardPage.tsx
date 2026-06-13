import { ArrowRight, BookOpen, Clock, Compass, MessageCircle, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StatusPill } from "../../components/StatusPill";
import { api } from "../../services/api";
import type { Profile, Project, Resource, Roadmap } from "../../types";

export function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    Promise.all([
      api.get("/users/me/profile"),
      api.get("/users/me/roadmap").catch(() => ({ data: null })),
      api.get("/resources/recommended").catch(() => ({ data: [] })),
      api.get("/projects/recommended").catch(() => ({ data: [] }))
    ]).then(([profileResponse, roadmapResponse, resourceResponse, projectResponse]) => {
      setProfile(profileResponse.data);
      setRoadmap(roadmapResponse.data);
      setResources(resourceResponse.data ?? []);
      setProjects(projectResponse.data ?? []);
    });
  }, []);

  const nextTask = roadmap?.phases.flatMap((phase) => phase.tasks).find((task) => task.status !== "DONE");

  return (
    <div className="space-y-6">
      <section className="grid gap-5 md:grid-cols-[1.25fr_0.75fr]">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="panel p-6">
          <p className="mono-space mb-2 flex items-center gap-2 text-sm font-bold uppercase text-[#FF5C00]">
            <Compass size={16} />
            Student command center
          </p>
          <h1 className="text-3xl font-black text-ink">Hi {profile?.fullName ?? "there"}, here is your next best move</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Your dashboard connects career choice, diagnostic evidence, roadmap execution, and mentor history. Start with the missing piece that blocks progress.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/onboarding" className="inline-flex items-center gap-2 rounded-[4px] border-2 border-[#666666] bg-[#FF5C00] px-4 py-2.5 text-sm font-bold text-white shadow-[4px_4px_0_rgba(102,102,102,0.18)] transition-colors hover:bg-[#E55300]">
              <Target size={16} />
              Choose objective
            </Link>
            <Link to="/quiz" className="inline-flex items-center gap-2 rounded-[4px] border-2 border-[#666666] bg-white px-4 py-2.5 text-sm font-bold text-[#4B5563] transition-colors hover:bg-[#FF5C00]/10 hover:text-[#111827]">
              <BookOpen size={16} />
              Take diagnostic
            </Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="panel p-6">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-500">
            <TrendingUp size={16} />
            Roadmap progress
          </p>
          <div className="mt-5 grid h-32 place-items-center rounded-[4px] border-2 border-[#666666] bg-[#FF5C00]/10">
            <p className="display-space text-5xl font-medium text-[#E55300]">{roadmap?.progressPercentage ?? 0}%</p>
          </div>
          <p className="mt-3 text-sm text-slate-600">Progress is calculated from completed roadmap tasks.</p>
        </motion.div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="panel p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black text-ink">Next action</h2>
            <Link to="/roadmap" className="inline-flex items-center gap-1 text-sm font-bold text-[#FF5C00] hover:text-[#E55300]">
              Open career map <ArrowRight size={14} />
            </Link>
          </div>
          {nextTask ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-black text-ink">{nextTask.title}</h3>
                <StatusPill value={nextTask.status} />
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{nextTask.description}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                <Clock size={15} />
                {nextTask.estimatedHours}h estimated
              </p>
            </div>
          ) : (
            <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Take the diagnostic and generate your career map to get execution tasks.</p>
          )}
        </div>

        <div className="panel p-5">
          <h2 className="mb-4 text-lg font-black text-ink">Mentor AI</h2>
          <p className="text-sm leading-6 text-slate-600">Ask questions tied to your roadmap, blockers, and previous conversation history.</p>
          <Link to="/mentor" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[4px] border-2 border-[#666666] bg-[#FF5C00] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#E55300]">
            <MessageCircle size={16} />
            Open mentor
          </Link>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="panel p-5">
          <h2 className="mb-4 text-lg font-black text-ink">Recommended resources</h2>
          <div className="space-y-3">
            {resources.slice(0, 4).map((resource) => (
              <a key={resource._id} href={resource.url} target="_blank" className="interactive-card block rounded-xl border border-slate-200 bg-white p-3">
                <p className="font-bold text-ink">{resource.title}</p>
                <p className="text-xs text-slate-500">{resource.skillTags.join(", ")}</p>
              </a>
            ))}
          </div>
        </div>
        <div className="panel p-5">
          <h2 className="mb-4 text-lg font-black text-ink">Recommended projects</h2>
          <div className="space-y-3">
            {projects.slice(0, 4).map((project) => (
              <div key={project._id} className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="font-bold text-ink">{project.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
