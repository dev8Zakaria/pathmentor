import gsap from "gsap";
import { ArrowRight, BarChart3, Bot, CheckCircle2, Compass, Play, Route, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/pathmentor-hero.png";

const topCredits = ["Diagnostic", "Roadmap", "Mentor AI", "Portfolio"];
const roadmapRail = ["Python", "Docker", "SQL", "Cloud", "Projects", "Interviews", "Mentor"];
const proofPoints = [
  { label: "Diagnostic", value: "Role-aware", icon: Target },
  { label: "Roadmap", value: "4 phases", icon: Route },
  { label: "Mentor", value: "Contextual", icon: Bot }
];
const flow = [
  { title: "Pick the role", detail: "Choose the career target before the system judges what progress means.", icon: Compass },
  { title: "Expose the gaps", detail: "Run a diagnostic built around practical CS decisions, not trivia.", icon: BarChart3 },
  { title: "Build the proof", detail: "Turn every phase into portfolio evidence, deployments, diagrams, and interview stories.", icon: CheckCircle2 }
];

export function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo("[data-cinema-line]", { y: 36 }, { y: 0, duration: 0.85, stagger: 0.07, ease: "power3.out" });
      gsap.fromTo("[data-credit]", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, delay: 0.2, ease: "power2.out" });
      gsap.to("[data-rail]", { xPercent: -18, duration: 18, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to("[data-scan]", { xPercent: 110, duration: 3.8, repeat: -1, ease: "power1.inOut" });
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <main className="cinematic-landing min-h-screen overflow-hidden bg-slate-950 text-white" ref={heroRef}>
      <section className="relative min-h-[94vh] overflow-hidden">
        <img src={heroImage} alt="Student reviewing a cinematic PathMentor career roadmap workspace" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_38%,rgba(99,102,241,0.05),transparent_22rem),linear-gradient(90deg,rgba(2,6,23,0.97)_0%,rgba(2,6,23,0.80)_36%,rgba(2,6,23,0.34)_67%,rgba(2,6,23,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.78)_0%,rgba(2,6,23,0.12)_40%,rgba(2,6,23,0.94)_100%)]" />
        <div data-scan className="absolute inset-y-0 left-[-30%] w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm" />

        <nav className="relative z-30 mx-auto flex max-w-[1520px] items-center justify-between px-5 py-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
              <Target size={20} />
            </span>
            <span>
              <span className="block text-sm font-black uppercase tracking-[0.22em] text-white">PathMentor</span>
              <span className="block text-xs font-semibold text-white/58">Career learning OS</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-full border border-white/15 px-4 py-2 text-sm font-black text-white/82 backdrop-blur transition-colors hover:bg-white hover:text-slate-950">
              Sign in
            </Link>
            <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950 transition-colors hover:bg-emerald-200">
              Start
              <ArrowRight size={16} />
            </Link>
          </div>
        </nav>

        <div className="relative z-20 mx-auto flex min-h-[calc(94vh-92px)] max-w-[1520px] flex-col justify-between px-5 pb-8 lg:px-8">
          <div className="grid grid-cols-2 gap-4 pt-8 text-[11px] font-black uppercase tracking-[0.2em] text-white/62 sm:grid-cols-4">
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
                <span key={item} className="rounded-full border border-white/20 bg-slate-950/36 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/78 backdrop-blur">
                  {item}
                </span>
              ))}
            </div>

            <h1 data-cinema-line className="max-w-5xl text-[clamp(4rem,9vw,8.7rem)] font-black uppercase leading-[0.8] tracking-normal text-white">
              PathMentor AI
            </h1>
            <p data-cinema-line className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/78">
              A cinematic career cockpit for CS students: diagnose the gaps, generate the route, and build the evidence that proves you are ready for the role.
            </p>
            <div data-cinema-line className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(79,70,229,0.38)] transition-colors hover:bg-indigo-400">
                Generate my roadmap
                <ArrowRight size={17} />
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur transition-colors hover:bg-white hover:text-slate-950">
                <Play size={17} />
                Try demo
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[7%] left-[-6vw] right-[-6vw] z-10 rotate-[-4deg] overflow-hidden border-y border-white/10 bg-slate-950/74 py-3 shadow-2xl backdrop-blur">
          <div data-rail className="flex w-[150%] gap-5">
            {[...roadmapRail, ...roadmapRail, ...roadmapRail].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex min-w-28 items-center justify-center rounded-full border border-indigo-300/30 bg-indigo-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-indigo-100">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-slate-950 px-5 py-10 lg:px-8">
        <div className="mx-auto grid max-w-[1520px] gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">What changes</p>
            <h2 className="mt-3 max-w-xl text-4xl font-black leading-tight text-white">The roadmap becomes the scene, not a checklist.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                <point.icon className="text-emerald-300" size={21} />
                <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-white/48">{point.label}</p>
                <p className="mt-1 text-2xl font-black text-white">{point.value}</p>
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
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-slate-950">
                <item.icon size={21} />
              </div>
              <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
