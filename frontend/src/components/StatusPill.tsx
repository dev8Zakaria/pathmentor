const colors: Record<string, string> = {
  TODO: "bg-slate-100 text-slate-700",
  IN_PROGRESS: "bg-amber-100 text-amber-800",
  DONE: "bg-emerald-100 text-emerald-700",
  BLOCKED: "bg-red-100 text-red-800",
  Beginner: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-indigo-100 text-indigo-700",
  Advanced: "bg-amber-100 text-amber-800"
};

export function StatusPill({ value }: { value: string }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${colors[value] ?? "bg-slate-100 text-slate-700"}`}>{value}</span>;
}
