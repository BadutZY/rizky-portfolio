import {
  PixelGamepad,
  PixelFork,
  PixelMonitor,
  PixelZap,
  PixelExternal,
} from "@/components/common/PixelIcon";
import type { GameProjectData } from "@/data/project";
import { useLanguage } from "@/lib/i18n";

interface GameCardProps {
  project: GameProjectData;
  index: number;
  onClick: () => void;
}

export default function GameCard({ project, index, onClick }: GameCardProps) {
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={onClick}
      className="pixel-card anim-in group relative w-full overflow-hidden text-left"
      style={{ ["--delay" as string]: `${index * 60}ms`, aspectRatio: "16 / 9" }}
    >
      {project.video ? (
        <video
          src={project.video}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent" />

      <div className="absolute top-3 left-3 z-10 flex flex-col items-start gap-1.5">
        <span
          className="pixel-tag pixel-tag-secondary inline-flex items-center gap-1"
          style={{ fontSize: 8 }}
        >
          <PixelGamepad size={11} /> {t("project.categories.Game")}
        </span>
        {project.isContribution && (
          <span
            className="pixel-tag pixel-tag-accent inline-flex items-center gap-1"
            style={{ fontSize: 8 }}
          >
            <PixelFork size={11} /> {t("project.modal.contribution")}
          </span>
        )}
      </div>

      <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1.5">
        {project.platform?.map((p) => (
          <span
            key={p}
            className="pixel-tag inline-flex items-center gap-1"
            style={{ fontSize: 8 }}
          >
            <PixelMonitor size={11} /> {p}
          </span>
        ))}
        {project.engine && (
          <span className="pixel-tag" style={{ fontSize: 8 }}>
            {project.engine}
          </span>
        )}
      </div>

      <div className="absolute right-0 bottom-0 left-0 z-10 p-3 md:p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {project.genre?.map((g) => (
            <span key={g} className="pixel-tag pixel-tag-primary" style={{ fontSize: 8 }}>
              {g}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3
              className="pixel-label text-foreground group-hover:text-secondary"
              style={{ fontSize: 13 }}
            >
              {project.title}
            </h3>
            <p
              className="pixel-label mt-1 truncate text-muted-foreground/80"
              style={{ fontSize: 8 }}
            >
              {project.description}
            </p>
          </div>
          <div className="grid h-8 w-8 shrink-0 place-items-center border-2 border-border bg-background/70 text-muted-foreground">
            <PixelExternal size={14} />
          </div>
        </div>

        {project.version && (
          <div className="mt-1.5 flex items-center gap-1">
            <PixelZap size={11} className="text-secondary" />
            <span className="pixel-label text-muted-foreground/60" style={{ fontSize: 7 }}>
              v{project.version}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
