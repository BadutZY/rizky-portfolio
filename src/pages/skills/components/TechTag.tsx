import { PixelChevronDown, PixelChevronRight } from "@/components/common/PixelIcon";
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
      {isOpen ? <PixelChevronDown size={10} /> : <PixelChevronRight size={10} />}
    </button>
  );
}
