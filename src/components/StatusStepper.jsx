import { Check } from "lucide-react";

const steps = ["Open", "Accepted", "Completed"];

export default function StatusStepper({ status }) {
  const current = steps.indexOf(status);
  return (
    <ol className="flex items-center gap-2" aria-label="Request progress">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${i <= current ? "bg-teal text-white" : "bg-surface2 text-muted"}`}>
            {i < current ? <Check size={16} /> : i + 1}
          </span>
          <span className={`text-sm font-semibold ${i <= current ? "" : "text-muted"}`}>{s}</span>
          {i < 2 && <span className={`h-0.5 w-6 ${i < current ? "bg-teal" : "bg-line"}`} />}
        </li>
      ))}
    </ol>
  );
}
