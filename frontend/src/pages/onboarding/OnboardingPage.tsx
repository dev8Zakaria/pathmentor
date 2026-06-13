import gsap from "gsap";
import { ArrowRight, CheckCircle2, Compass, Save, Search, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { StatusPill } from "../../components/StatusPill";
import { api } from "../../services/api";
import type { CareerGoal, Profile } from "../../types";

const fitCopy: Record<string, string[]> = {
  career_software_engineer: ["You like broad engineering problems", "You want backend + systems + quality", "You can tolerate ambiguity"],
  career_frontend_developer: ["You care about product feel", "You enjoy visual detail and accessibility", "You want fast feedback loops"],
  career_backend_developer: ["You like APIs and data flow", "You care about reliability and security", "You enjoy debugging server behavior"],
  career_data_engineer: ["You like data quality and pipelines", "You enjoy SQL/Python", "You care about trustworthy analytics"],
  career_devops_engineer: ["You like automation and infrastructure", "You enjoy Linux and containers", "You care about uptime and deployment"]
};

export function OnboardingPage() {
  const [careers, setCareers] = useState<CareerGoal[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [knownTechnologies, setKnownTechnologies] = useState("");
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([api.get("/career-goals"), api.get("/users/me/profile")]).then(([careerResponse, profileResponse]) => {
      setCareers(careerResponse.data);
      setProfile(profileResponse.data);
      setKnownTechnologies((profileResponse.data.knownTechnologies ?? []).join(", "));
    });
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    gsap.fromTo(
      cardsRef.current.querySelectorAll("[data-career-card]"),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" }
    );
  }, [careers.length, query]);

  const filteredCareers = useMemo(() => {
    const needle = query.toLowerCase().trim();
    if (!needle) return careers;
    return careers.filter((career) =>
      [career.name, career.description, ...career.domains].join(" ").toLowerCase().includes(needle)
    );
  }, [careers, query]);

  const selectedCareer = careers.find((career) => career._id === profile?.targetCareerId);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!profile) return;
    const response = await api.put("/users/me/profile", {
      ...profile,
      knownTechnologies: knownTechnologies.split(",").map((item) => item.trim()).filter(Boolean)
    });
    setProfile(response.data);
    setMessage("Profile saved. Next: take the diagnostic quiz for this career.");
  }

  if (!profile) return <p className="text-sm text-slate-500">Loading profile...</p>;

  return (
    <form onSubmit={submit} className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="panel p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mono-space flex items-center gap-2 text-sm font-bold uppercase text-[#FF5C00]">
              <Compass size={16} />
              Career targeting
            </p>
            <h1 className="mt-2 text-3xl font-black text-ink">Choose the role your roadmap should optimize for</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              This is not a permanent label. It tells the quiz, roadmap, and mentor what “progress” means for you right now.
            </p>
          </div>
          {selectedCareer && (
            <div className="rounded-[4px] border-2 border-[#666666] bg-[#FF5C00]/10 px-4 py-3 text-sm">
              <p className="font-black text-[#111827]">Selected target</p>
              <p className="text-[#E55300]">{selectedCareer.name}</p>
            </div>
          )}
        </div>
      </motion.section>

      {message && <p className="rounded-[4px] border border-[#FF5C00]/30 bg-[#FF5C00]/10 p-3 text-sm font-bold text-[#E55300]">{message}</p>}

      <section className="grid gap-5 xl:grid-cols-[0.78fr_1.22fr]">
        <div className="panel p-5">
          <h2 className="text-lg font-black text-ink">Learning profile</h2>
          <p className="mt-1 text-sm text-slate-600">These fields calibrate difficulty and weekly workload.</p>
          <div className="mt-5 grid gap-4">
            <label className="text-sm font-bold text-slate-800">
              Display name
              <input value={profile.fullName} onChange={(event) => setProfile({ ...profile, fullName: event.target.value })} className="focus-ring mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5" />
            </label>
            <label className="text-sm font-bold text-slate-800">
              Education or current situation
              <input value={profile.educationLevel} onChange={(event) => setProfile({ ...profile, educationLevel: event.target.value })} className="focus-ring mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5" placeholder="CS student, self-taught, bootcamp..." />
            </label>
            <label className="text-sm font-bold text-slate-800">
              Current confidence level
              <select value={profile.currentLevel} onChange={(event) => setProfile({ ...profile, currentLevel: event.target.value as Profile["currentLevel"] })} className="focus-ring mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>
            <label className="text-sm font-bold text-slate-800">
              Weekly focused study hours
              <input type="number" min={1} max={60} value={profile.weeklyStudyHours} onChange={(event) => setProfile({ ...profile, weeklyStudyHours: Number(event.target.value) })} className="focus-ring mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5" />
            </label>
            <label className="text-sm font-bold text-slate-800">
              Technologies you already know
              <textarea value={knownTechnologies} onChange={(event) => setKnownTechnologies(event.target.value)} rows={4} className="focus-ring mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5" placeholder="JavaScript, Git, SQL, Linux basics" />
              <p className="mt-1 text-xs text-slate-500">Separate items with commas. The roadmap will avoid wasting time on what you already know.</p>
            </label>
          </div>
        </div>

        <div className="panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-ink">Career options</h2>
              <p className="mt-1 text-sm text-slate-600">Pick one role. Your choice controls the quiz and roadmap.</p>
            </div>
            <label className="relative min-w-[260px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="focus-ring w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm" placeholder="Search role or skill" />
            </label>
          </div>

          <div ref={cardsRef} className="mt-5 grid gap-3 lg:grid-cols-2">
            {filteredCareers.map((career) => {
              const selected = profile.targetCareerId === career._id;
              return (
                <button
                  data-career-card
                  key={career._id}
                  type="button"
                  onClick={() => setProfile({ ...profile, targetCareerId: career._id })}
                  className={`interactive-card rounded-[4px] border p-4 text-left ${selected ? "border-[#666666] bg-[#FF5C00]/10" : "border-slate-200 bg-white"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black text-ink">{career.name}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{career.description}</p>
                    </div>
                    {selected ? <CheckCircle2 className="shrink-0 text-[#FF5C00]" size={22} /> : <StatusPill value={career.difficulty} />}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {career.domains.map((domain) => (
                      <span key={domain} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{domain}</span>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl bg-slate-50 p-3">
                    <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase text-slate-500">
                      <Sparkles size={14} />
                      Good fit if
                    </p>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {(fitCopy[career._id] ?? []).map((item) => <li key={item}>- {item}</li>)}
                    </ul>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <button className="mono-space inline-flex items-center gap-2 rounded-[4px] border-2 border-[#666666] bg-[#FF5C00] px-5 py-3 text-sm font-black text-white shadow-[4px_4px_0_rgba(102,102,102,0.18)] transition-colors hover:bg-[#E55300]">
        <Save size={16} />
        Save target and continue
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
