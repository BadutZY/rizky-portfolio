import { useModrinthProjects, timeAgo } from "@/hooks/useModrinthProjects";
import { PixelExternal } from "@/components/common/PixelIcon";
import { useLanguage } from "@/lib/i18n";

const MODRINTH_USERNAME = "BadutZY";

export default function ModrinthMods() {
  const { t, language } = useLanguage();
  const { data, isLoading, isError } = useModrinthProjects(MODRINTH_USERNAME);

  if (isLoading) {
    return (
      <div className="pixel-inset p-8 text-center">
        <p className="pixel-label text-muted-foreground" style={{ fontSize: 9 }}>
          {t("project.modrinth.loading")}
          <span className="anim-blink">_</span>
        </p>
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <div className="pixel-inset p-8 text-center">
        <p className="pixel-label text-muted-foreground" style={{ fontSize: 9 }}>
          {isError ? t("project.modrinth.error") : t("project.modrinth.empty")}
        </p>
        <a
          href={`https://modrinth.com/user/${MODRINTH_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-tag pixel-tag-accent mt-4 inline-flex items-center gap-2"
        >
          {t("project.modrinth.openProfile")} <PixelExternal size={12} />
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {data.map((mod, i) => (
        <a
          key={mod.id}
          href={`https://modrinth.com/mod/${mod.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-card anim-in flex flex-col gap-4 p-6 sm:flex-row sm:items-start"
          style={{ ["--delay" as string]: `${i * 70}ms` }}
        >
          {mod.icon_url ? (
            <img
              src={mod.icon_url}
              alt={mod.title}
              loading="lazy"
              className="h-16 w-16 shrink-0 border-2 border-border object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center border-2 border-border bg-muted">
              <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                mod
              </span>
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <h3 className="pixel-label truncate text-foreground" style={{ fontSize: 11 }}>
                {mod.title}
              </h3>
              <PixelExternal size={14} className="shrink-0 text-secondary" />
            </div>
            <p className="body-text mt-2 text-muted-foreground">{mod.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {mod.loaders.map((l) => (
                <span key={l} className="pixel-tag" style={{ fontSize: 8 }}>
                  {l}
                </span>
              ))}
              <span className="pixel-tag pixel-tag-secondary" style={{ fontSize: 8 }}>
                {mod.downloads.toLocaleString(language === "id" ? "id-ID" : "en-US")}{" "}
                {t("project.modrinth.downloads")}
              </span>
            </div>

            {mod.date_modified && (
              <p className="pixel-label mt-3 text-muted-foreground" style={{ fontSize: 8 }}>
                {t("project.modrinth.updated", { time: timeAgo(mod.date_modified) })}
              </p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
