import { ChevronDown, ChevronRight } from "lucide-react";
import { techDescriptions } from "@/data/skills";
import { resolveTechLogo } from "./skillCodeSnippets";

export function TechTag({
  name,
  isOpen,
  onToggle,
}: {
  name: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const info = techDescriptions[name];
  return (
    <button
      type="button"
      onClick={onToggle}
      className="pixel-tag inline-flex items-center gap-1.5"
      style={{
        borderColor: isOpen ? "var(--secondary)" : undefined,
        color: isOpen ? "var(--secondary)" : undefined,
      }}
    >
      {info && <img src={resolveTechLogo(info.logo)} alt={name} className="h-3.5 w-3.5 shrink-0" />}
      <span>{name}</span>
      {isOpen ? (
        <ChevronDown size={14} strokeWidth={2.5} />
      ) : (
        <ChevronRight size={14} strokeWidth={2.5} />
      )}
    </button>
  );
}