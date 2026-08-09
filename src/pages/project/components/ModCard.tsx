import {
  PixelDownload,
  PixelHeart,
  PixelClock,
  PixelPackage,
  PixelExternal,
} from "@/components/common/PixelIcon";
import { loaderIcons } from "@/data/image";
import type { ModProjectData, ModStatus } from "@/data/project";

export const STATUS_LABEL: Record<ModStatus, string> = {
  public: "Public",
  private: "Private",
  unlisted: "Unlisted",
  under_review: "Under Review",
};

const LOADER_ICONS: Record<string, string> = {
  Fabric: loaderIcons.fabric,
  Forge: loaderIcons.forge,
  NeoForge: loaderIcons.neoforge,
  Neoforge: loaderIcons.neoforge,
  Quilt: loaderIcons.quilt,
};

function formatDownloads(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".0", "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(".0", "") + "K";
  return n.toString();
}

interface ModCardProps {
  project: ModProjectData;
  index: number;
  onClick: () => void;
}

export default function ModCard({ project, index, onClick }: ModCardProps) {
  const tagline = project.modDescription || project.description;
  const status = project.status ?? "public";

  return (
    <button
      type="button"
      onClick={onClick}
      className="pixel-card anim-in group flex w-full items-center gap-4 p-4 text-left md:gap-5 md:p-5"
      style={{ ["--delay" as string]: `${index * 50}ms` }}
    >
      <div className="pixel-inset h-[68px] w-[68px] shrink-0 overflow-hidden md:h-20 md:w-20">
        {project.modIcon ? (
          <img src={project.modIcon} alt={project.title} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <PixelPackage size={26} className="text-muted-foreground/50" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <h3
            className="pixel-label text-foreground group-hover:text-secondary"
            style={{ fontSize: 11 }}
          >
            {project.title}
          </h3>
          <span className="pixel-tag" style={{ fontSize: 7 }}>
            {STATUS_LABEL[status]}
          </span>
        </div>

        <p
          className="body-text mb-2.5 line-clamp-1 text-muted-foreground"
          style={{ fontSize: "0.95rem" }}
        >
          {tagline}
        </p>

        <div className="flex flex-wrap items-center gap-1.5">
          {project.tags?.map((tag) => (
            <span key={tag} className="pixel-tag" style={{ fontSize: 7 }}>
              {tag}
            </span>
          ))}
          {project.loaders?.map((loader) => (
            <span
              key={loader}
              className="pixel-tag pixel-tag-secondary inline-flex items-center gap-1"
              style={{ fontSize: 7 }}
            >
              {LOADER_ICONS[loader] && (
                <img src={LOADER_ICONS[loader]} alt={loader} className="h-3 w-3 object-contain" />
              )}
              {loader}
            </span>
          ))}
        </div>

        <div
          className="mt-2 flex flex-wrap items-center gap-3 text-muted-foreground"
          style={{ fontSize: 10 }}
        >
          {project.downloads !== undefined && (
            <span className="pixel-label inline-flex items-center gap-1" style={{ fontSize: 8 }}>
              <PixelDownload size={11} /> {formatDownloads(project.downloads)}
            </span>
          )}
          {project.likes !== undefined && (
            <span className="pixel-label inline-flex items-center gap-1" style={{ fontSize: 8 }}>
              <PixelHeart size={11} /> {project.likes}
            </span>
          )}
          {project.updatedAgo && (
            <span
              className="pixel-label inline-flex items-center gap-1 text-muted-foreground/70"
              style={{ fontSize: 8 }}
            >
              <PixelClock size={11} /> {project.updatedAgo}
            </span>
          )}
        </div>
      </div>

      <div className="hidden shrink-0 md:block">
        <div className="grid h-9 w-9 place-items-center border-2 border-border bg-background text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          <PixelExternal size={15} />
        </div>
      </div>
    </button>
  );
}
