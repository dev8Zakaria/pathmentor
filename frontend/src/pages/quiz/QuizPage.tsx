import { CheckCircle, GraduationCap, Play, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { api } from "../../services/api";
import type { Profile, Quiz } from "../../types";

export function QuizPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; strengths: string[]; weaknesses: string[] } | null>(null);

  useEffect(() => {
    api.get("/users/me/profile").then((profileResponse) => {
      setProfile(profileResponse.data);
      if (profileResponse.data.targetCareerId) {
        api.get(`/quizzes/${profileResponse.data.targetCareerId}`).then((quizResponse) => setQuiz(quizResponse.data));
      }
    });
  }, []);

  const answeredCount = Object.keys(answers).length;
  const progress = useMemo(() => quiz ? Math.round((answeredCount / quiz.questions.length) * 100) : 0, [answeredCount, quiz]);

  async function submit() {
    if (!quiz) return;
    const response = await api.post(`/quizzes/${quiz._id}/submit`, {
      answers: Object.entries(answers).map(([questionId, selectedOptionIndex]) => ({ questionId, selectedOptionIndex }))
    });
    setResult(response.data);
  }

  async function generateRoadmap() {
    await api.post("/roadmaps/generate");
    window.location.href = "/roadmap";
  }

  if (!profile?.targetCareerId) {
    return (
      <div className="panel p-6">
        <h1 className="text-2xl font-black text-ink">Choose a target career first</h1>
        <p className="mt-2 text-sm text-slate-600">The diagnostic quiz is generated for a specific role, so select your objective before starting.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <p className="mono-space flex items-center gap-2 text-sm font-bold uppercase text-[#FF5C00]">
          <GraduationCap size={16} />
          Senior CS diagnostic
        </p>
        <h1 className="mt-2 text-3xl font-black text-ink">{quiz?.title ?? "Loading diagnostic..."}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          These questions test engineering judgment, not memorized slogans. Choose the answer you would defend in a code review.
        </p>
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-[#FF5C00] to-[#E55300]" animate={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-sm font-bold text-slate-600">{answeredCount}/{quiz?.questions.length ?? 0} answered</p>
      </section>

      {quiz && (
        <div className="space-y-4">
          {quiz.questions.map((question, index) => (
            <motion.div key={question.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="panel p-5">
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-500">
                <Target size={15} />
                Question {index + 1} - {question.skillTag}
              </p>
              <h2 className="text-lg font-black leading-7 text-ink">{question.question}</h2>
              <div className="mt-4 grid gap-2">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswers({ ...answers, [question.id]: optionIndex })}
                    className={`interactive-card rounded-[4px] border px-4 py-3 text-left text-sm leading-6 ${answers[question.id] === optionIndex ? "border-[#666666] bg-[#FF5C00]/10 font-semibold text-[#111827]" : "border-slate-200 bg-white text-slate-700"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button disabled={!quiz || answeredCount < quiz.questions.length} onClick={submit} className="mono-space inline-flex items-center gap-2 rounded-[4px] border-2 border-[#666666] bg-[#FF5C00] px-5 py-3 text-sm font-black text-white transition-colors hover:bg-[#E55300] disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-300">
          <CheckCircle size={16} />
          Submit diagnostic
        </button>
        {result && (
          <button onClick={generateRoadmap} className="mono-space inline-flex items-center gap-2 rounded-[4px] border-2 border-[#666666] bg-[#FF5C00] px-5 py-3 text-sm font-black text-white transition-colors hover:bg-[#E55300]">
            <Play size={16} />
            Generate career map
          </button>
        )}
      </div>

      {result && (
        <div className="panel p-5">
          <h2 className="text-xl font-black text-ink">Diagnostic score: {result.score}%</h2>
          <p className="mt-2 text-sm text-slate-600">Strengths: {result.strengths.join(", ") || "none detected yet"}</p>
          <p className="mt-1 text-sm text-slate-600">Priority gaps: {result.weaknesses.join(", ") || "no major gaps detected"}</p>
        </div>
      )}
    </div>
  );
}
