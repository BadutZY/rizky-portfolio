import type { PixelFork } from "@/components/common/PixelIcon";

export function SubsectionHeading({
  icon: Icon,
  label,
  count,
}: {
  icon?: typeof PixelFork;
  label: string;
  count?: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-2">
      {Icon && <Icon size={13} className="text-secondary/70" />}
      <span className="pixel-label text-muted-foreground/70" style={{ fontSize: 9 }}>
        {label}
      </span>
      <div className="h-1 flex-1 bg-border/30" />
      {count && (
        <span className="pixel-tag" style={{ fontSize: 7 }}>
          {count}
        </span>
      )}
    </div>
  );
}
