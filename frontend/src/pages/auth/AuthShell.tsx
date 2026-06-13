import { BrainCircuit, GraduationCap, Route, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "../../assets/pathmentor-hero.png";

export function AuthShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-[#111827] px-4 py-8 text-white">
      <img src={heroImage} alt="Student reviewing a PathMentor-style career roadmap workspace" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,24,39,0.97)_0%,rgba(17,24,39,0.80)_48%,rgba(17,24,39,0.48)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_34%,rgba(255,92,0,0.18),transparent_24rem),linear-gradient(180deg,rgba(17,24,39,0.28),rgba(17,24,39,0.92))]" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_0.8fr]"
      >
        <div className="relative flex min-h-[520px] flex-col justify-between p-2 md:p-4">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-[4px] border-2 border-white/30 bg-[#FF5C00] text-white shadow-[5px_5px_0_rgba(102,102,102,0.45)] backdrop-blur">
                <BrainCircuit size={23} />
              </div>
              <div>
                <p className="mono-space text-lg font-black uppercase tracking-[0.12em]">PathMentor AI</p>
                <p className="text-sm text-white/60">Career roadmap system</p>
              </div>
            </div>
            <p className="mono-space text-xs font-black uppercase tracking-[0.24em] text-[#FF5C00]">Student career cockpit</p>
            <h1 className="display-space mt-4 max-w-2xl text-4xl font-medium uppercase leading-[0.95] md:text-6xl">{title}</h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/70">{subtitle}</p>
          </div>
          <div className="grid gap-3 text-sm text-white/86">
            <div className="flex items-center gap-3 rounded-[4px] border border-white/15 bg-white/10 p-3 backdrop-blur">
              <Route size={18} />
              Roadmaps generated from career goal, quiz results, and progress.
            </div>
            <div className="flex items-center gap-3 rounded-[4px] border border-white/15 bg-white/10 p-3 backdrop-blur">
              <ShieldCheck size={18} />
              Mentor context keeps guidance tied to your actual learning path.
            </div>
            <div className="flex items-center gap-3 rounded-[4px] border border-white/15 bg-white/10 p-3 backdrop-blur">
              <GraduationCap size={18} />
              Built for CS students choosing concrete portfolio evidence.
            </div>
          </div>
        </div>
        <div className="max-h-[88vh] overflow-y-auto rounded-[4px] border-2 border-[#666666] bg-[#F8F9F9]/94 p-6 text-[#111827] shadow-[10px_10px_0_rgba(102,102,102,0.26)] backdrop-blur-2xl md:p-8">{children}</div>
      </motion.div>
    </div>
  );
}
