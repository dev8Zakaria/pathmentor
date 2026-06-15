import gsap from "gsap";
import { ArrowRight, BarChart3, Bot, BrainCircuit, CheckCircle2, Compass, Database, Layers3, Play, Route, ShieldCheck, Target, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/pathmentor-hero.png";

const topCredits = ["Diagnostic", "Roadmap", "Mentor AI", "Portfolio"];
const roadmapRail = ["Python", "Docker", "SQL", "Cloud", "Projects", "Interviews", "Mentor"];
const proofPoints = [
  { label: "Diagnostic", value: "Role-aware", detail: "Questions adapt to the career you select, so the result reflects backend, frontend, data, DevOps, or software engineering expectations.", icon: Target },
  { label: "Roadmap", value: "4 phases", detail: "Each plan is broken into foundations, project work, reliability, and capstone preparation with concrete deliverables.", icon: Route },
  { label: "Mentor", value: "Contextual", detail: "The mentor reads your profile, active roadmap, task progress, and prior conversations before answering.", icon: Bot }
];
const flow = [
  { title: "Pick the role", detail: "Choose the career target before the system judges what progress means.", icon: Compass },
  { title: "Expose the gaps", detail: "Run a diagnostic built around practical CS decisions, not trivia.", icon: BarChart3 },
  { title: "Build the proof", detail: "Turn every phase into portfolio evidence, deployments, diagrams, and interview stories.", icon: CheckCircle2 }
];
const chapters = [
  {
    kicker: "Profile intelligence",
    title: "It starts from your actual level.",
    detail: "PathMentor combines your target role, current confidence, weekly capacity, known technologies, and quiz results before it generates any plan.",
    icon: BrainCircuit
  },
  {
    kicker: "Roadmap execution",
    title: "Every task has a reason.",
    detail: "The career map turns gaps into phases, tasks, evidence, and blockers, so you know what to do next and why it matters for the role.",
    icon: Route
  },
  {
    kicker: "Portfolio outcomes",
    title: "The portfolio gets built.",
    detail: "Each task pushes toward a visible artifact: code, tests, deployments, READMEs, diagrams, demos, and interview stories that prove practical readiness.",
    icon: Trophy
  }
];
const stackSignals = [
  { label: "React + Vite cockpit", detail: "A fast frontend for dashboards, diagnostic flows, draggable roadmap nodes, and mentor conversations.", icon: Layers3 },
  { label: "Express + JWT API", detail: "Authenticated routes for users, profiles, quizzes, roadmaps, resources, projects, and mentor chat.", icon: ShieldCheck },
  { label: "MongoDB + Redis memory", detail: "MongoDB stores profiles, roadmaps, tasks, and conversations while Redis keeps active roadmap context quick to retrieve.", icon: Database },
  { label: "Neo4j + LangGraph AI flow", detail: "Neo4j models skill relationships and LangGraph orchestrates roadmap generation from context to saved plan.", icon: Route }
];

export function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const context = gsap.context(() => {
      gsap.set("[data-cinema-line], [data-credit], [data-rail], [data-scan]", { force3D: true });
      gsap.fromTo("[data-cinema-line]", { y: 36 }, { y: 0, duration: 0.85, stagger: 0.07, ease: "power3.out", force3D: true });
      gsap.fromTo("[data-credit]", { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, delay: 0.2, ease: "power2.out", force3D: true });
      gsap.to("[data-rail]", { xPercent: -18, duration: 18, repeat: -1, yoyo: true, ease: "sine.inOut", force3D: true });
      gsap.to("[data-scan]", { xPercent: 110, duration: 3.8, repeat: -1, ease: "power1.inOut", force3D: true });
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <main className="cinematic-landing min-h-screen overflow-hidden bg-[#F8F9F9] text-[#111827]" ref={heroRef}>
      <section className="relative min-h-[94vh] overflow-hidden">
        <img src={heroImage} alt="Student reviewing a cinematic PathMentor career roadmap workspace" className="absolute inset-0 h-full w-full object-cover object-center" loading="eager" decoding="async" fetchPriority="high" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_38%,rgba(255,92,0,0.08),transparent_22rem),linear-gradient(90deg,rgba(17,24,39,0.97)_0%,rgba(17,24,39,0.80)_36%,rgba(17,24,39,0.34)_67%,rgba(17,24,39,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.78)_0%,rgba(2,6,23,0.12)_40%,rgba(2,6,23,0.94)_100%)]" />
        <div data-scan className="absolute inset-y-0 left-[-30%] w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm" />

        <nav className="relative z-30 mx-auto flex max-w-[1520px] items-center justify-between px-5 py-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
              <Target size={20} />
            </span>
            <span>
              <span className="mono-space block text-sm font-black uppercase tracking-[0.22em] text-white">PathMentor</span>
              <span className="block text-xs font-semibold text-white/60">Career learning OS</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/login" className="mono-space rounded-full border border-white/15 px-4 py-2 text-sm font-black text-white/80 backdrop-blur transition-colors hover:bg-white hover:text-[#111827]">
              Sign in
            </Link>
            <Link to="/register" className="mono-space inline-flex items-center gap-2 rounded-[4px] border-2 border-[#666666] bg-[#FF5C00] px-4 py-2 text-sm font-black text-white shadow-[4px_4px_0_rgba(102,102,102,0.35)] transition-colors hover:bg-[#E55300]">
              Start
              <ArrowRight size={16} />
            </Link>
          </div>
        </nav>

        <div className="relative z-20 mx-auto flex min-h-[calc(94vh-92px)] max-w-[1520px] flex-col justify-between px-5 pb-8 lg:px-8">
          <div className="mono-space grid grid-cols-2 gap-4 pt-8 text-[11px] font-black uppercase tracking-[0.2em] text-white/60 sm:grid-cols-4">
            {topCredits.map((credit) => (
              <span key={credit} data-credit>{credit}</span>
            ))}
          </div>

          <div className="pointer-events-none absolute left-1/2 top-[32%] z-0 -translate-x-1/2 text-[16vw] font-black leading-none tracking-normal text-white/[0.07]">
            PATHMENTOR
          </div>

          <div className="relative z-20 max-w-5xl pb-28">
            <div data-cinema-line className="mb-5 flex flex-wrap gap-2">
              {["AI", "CS careers", "Portfolio proof"].map((item) => (
                <span key={item} className="mono-space rounded-full border border-white/20 bg-[#111827]/40 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/80 backdrop-blur">
                  {item}
                </span>
              ))}
            </div>

            <h1 data-cinema-line className="display-space max-w-5xl text-[clamp(4.4rem,10vw,9.4rem)] uppercase leading-[0.8] tracking-normal text-white">
              PathMentor
            </h1>
            <p data-cinema-line className="mono-space mt-5 max-w-3xl text-sm font-black uppercase tracking-[0.22em] text-[#FF5C00]">
              AI-assisted career roadmap system for CS students
            </p>
            <p data-cinema-line className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/80">
              Choose a target role, take a serious diagnostic, generate a four-phase plan, and turn each task into portfolio evidence.
            </p>
            <div data-cinema-line className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="mono-space inline-flex items-center gap-2 rounded-[4px] border-2 border-[#666666] bg-[#FF5C00] px-6 py-3 text-sm font-black text-white shadow-[6px_6px_0_rgba(102,102,102,0.45)] transition-colors hover:bg-[#E55300]">
                Generate my roadmap
                <ArrowRight size={17} />
              </Link>
              <Link to="/login" className="mono-space inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur transition-colors hover:bg-white hover:text-[#111827]">
                <Play size={17} />
                Try demo
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[7%] left-[-6vw] right-[-6vw] z-10 rotate-[-4deg] overflow-hidden border-y border-white/10 bg-[#111827]/74 py-3 shadow-2xl backdrop-blur">
          <div data-rail className="flex w-[150%] gap-5">
            {[...roadmapRail, ...roadmapRail, ...roadmapRail].map((item, index) => (
              <span key={`${item}-${index}`} className="mono-space inline-flex min-w-28 items-center justify-center rounded-[4px] border border-[#FF5C00]/50 bg-[#FF5C00]/15 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-orange-100">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#F8F9F9] px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1520px] gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mono-space text-xs font-black uppercase tracking-[0.22em] text-[#FF5C00]">What changes</p>
            <h2 className="display-space mt-3 max-w-xl text-5xl leading-tight text-[#111827] md:text-7xl">A plan that knows what role you are aiming for.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point.label} className="space-material flex min-h-[270px] flex-col p-6 text-white">
                <point.icon className="text-[#FF5C00]" size={21} />
                <p className="mono-space mt-4 text-xs font-black uppercase tracking-[0.16em] text-white/48">{point.label}</p>
                <p className="display-space mt-1 text-3xl text-white">{point.value}</p>
                <p className="mt-auto pt-8 text-sm leading-6 text-white/68">{point.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-5 grid max-w-[1520px] gap-4 md:grid-cols-3">
          {flow.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08 }}
              className="space-material p-6 text-white"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#111827]">
                <item.icon size={21} />
              </div>
              <h3 className="display-space mt-5 text-3xl text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F8F9F9] px-5 py-20 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-16 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[#FF5C00]/10 blur-3xl" />
        <div className="mx-auto max-w-[1520px]">
          <div className="max-w-3xl">
            <p className="mono-space text-xs font-black uppercase tracking-[0.24em] text-[#E55300]">How it works</p>
            <h2 className="display-space mt-4 text-5xl uppercase leading-[0.95] text-[#111827] md:text-8xl">
              From uncertainty to proof.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#4B5563]">
              PathMentor is built for students who need a concrete route to a role, not another generic list of skills.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {chapters.map((chapter, index) => (
              <motion.article
                data-story-card
                key={chapter.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                className="space-material relative min-h-[420px] overflow-hidden p-6 text-white"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#FF5C00] via-[#E55300] to-transparent" />
                <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-[#111827]">
                  <chapter.icon size={24} />
                </div>
                <p className="mono-space mt-10 text-xs font-black uppercase tracking-[0.22em] text-[#FF5C00]">{chapter.kicker}</p>
                <h3 className="display-space mt-4 text-4xl leading-tight text-white">{chapter.title}</h3>
                <p className="mt-5 text-base leading-8 text-white/72">{chapter.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F8F9F9] px-5 py-20 lg:px-8">
        <div className="space-material mx-auto grid max-w-[1520px] gap-8 p-6 text-white lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
          <div>
            <p className="mono-space text-xs font-black uppercase tracking-[0.24em] text-[#FF5C00]">Technical stack</p>
            <h2 className="display-space mt-4 text-5xl uppercase leading-none text-white md:text-7xl">Built as a full-stack system.</h2>
            <p className="mt-5 text-sm leading-7 text-white/60">
              The app combines a React experience, authenticated API, persistent student memory, a skill graph, and an orchestrated AI roadmap workflow.
            </p>
            <Link to="/register" className="mono-space mt-8 inline-flex items-center gap-2 rounded-[4px] border-2 border-white bg-[#FF5C00] px-5 py-3 text-sm font-black text-white transition-colors hover:bg-[#E55300]">
              Start the workflow
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {stackSignals.map((signal, index) => (
              <motion.div
                key={signal.label}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[4px] border border-white/10 bg-[#111827]/65 p-5"
              >
                <signal.icon className="text-[#FF5C00]" size={22} />
                <p className="display-space mt-8 text-2xl text-white">{signal.label}</p>
                <p className="mt-2 text-sm leading-6 text-white/58">{signal.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[70vh] overflow-hidden bg-[#111827] px-5 py-20 lg:px-8">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96),rgba(2,6,23,0.68)),linear-gradient(180deg,rgba(2,6,23,0.2),rgba(2,6,23,0.95))]" />
        <div className="relative mx-auto max-w-[1520px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="max-w-4xl"
          >
            <p className="mono-space text-xs font-black uppercase tracking-[0.24em] text-[#FF5C00]">Final scene</p>
            <h2 className="display-space mt-5 text-6xl uppercase leading-[0.9] text-white md:text-9xl">Make the next move visible.</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
              Choose the career, take the diagnostic, generate the route, then use the mentor to remove blockers phase by phase.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="mono-space inline-flex items-center gap-2 rounded-[4px] border-2 border-[#666666] bg-[#FF5C00] px-6 py-3 text-sm font-black text-white shadow-[6px_6px_0_rgba(102,102,102,0.45)] transition-colors hover:bg-[#E55300]">
                Build my path
                <ArrowRight size={17} />
              </Link>
              <Link to="/login" className="mono-space inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur transition-colors hover:bg-white hover:text-[#111827]">
                Continue demo
                <Play size={17} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
