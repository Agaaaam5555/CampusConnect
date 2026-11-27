import { CircleHelp, Code, FileText, GraduationCap, Wrench } from "lucide-react";

const icons = { Hardware: Wrench, Notes: FileText, Coding: Code, Academics: GraduationCap };

export default function CatIcon({ category, size = 18 }) {
  const Icon = icons[category] || CircleHelp;
  return <Icon size={size} />;
}
