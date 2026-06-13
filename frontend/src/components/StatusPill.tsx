const colors: Record<string, string> = {
  TODO: "bg-slate-100 text-slate-700",
  IN_PROGRESS: "bg-amber-100 text-amber-800",
  DONE: "bg-[#FF5C00]/10 text-[#E55300]",
  BLOCKED: "bg-red-100 text-red-800",
  Beginner: "bg-[#FF5C00]/10 text-[#E55300]",
  Intermediate: "bg-[#666666]/10 text-[#4B5563]",
  Advanced: "bg-amber-100 text-amber-800"
};

export function StatusPill({ value }: { value: string }) {
  return <span className={`mono-space inline-flex rounded-[4px] px-2.5 py-1 text-xs font-semibold ${colors[value] ?? "bg-slate-100 text-slate-700"}`}>{value}</span>;
}
