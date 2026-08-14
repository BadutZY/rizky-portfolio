import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader, PageShell, SectionTitle } from "@/components/layout/PageShell";
import {
  PixelArrowRight,
  PixelFilter,
  PixelGamepad,
  PixelFork,
  PixelRefresh,
} from "@/components/common/PixelIcon";
import { useModrinthProjects, timeAgo } from "@/hooks/useModrinthProjects";
import { projectImages } from "@/data/image";
import {
  REGULAR_WEBSITE_PROJECTS,
  CONTRIBUTION_WEBSITE_PROJECTS,
  STATIC_MOD_PROJECTS,
  GAME_PROJECTS,
  CONTRIBUTION_GAME_PROJECTS,
  categories,
  type ModProjectData,
  type GameProjectData,
} from "@/data/project";
import ProjectModal, { type SimpleProject } from "./components/ProjectModal";
import ModCard from "./components/ModCard";
import ModProjectModal from "./components/ModProjectModal";
import GameCard from "./components/GameCard";
import GameProjectModal from "./components/GameProjectModal";
import LivePreview from "./components/LivePreview";
import { WebsiteCard } from "./components/WebsiteCard";
import { SubsectionHeading } from "./components/SubsectionHeading";
import { useLanguage } from "@/lib/i18n";

type CategoryKey = (typeof categories)[number]["key"];

export default function ProjectPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<CategoryKey>("all");
  const [selectedWebsite, setSelectedWebsite] = useState<SimpleProject | null>(null);
  const [selectedMod, setSelectedMod] = useState<ModProjectData | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameProjectData | null>(null);

  const { data: modrinthData, isLoading, isError, refetch } = useModrinthProjects("BadutZY");

  const modrinthModProjects: ModProjectData[] = useMemo(() => {
    if (!modrinthData) return [];
    return modrinthData
      .map((p, i): ModProjectData => {
        const base: ModProjectData = {
          id: 1000 + i,
          slug: p.slug,
          title: p.title,
          category: "Mod",
          lang: ["Java", ...p.loaders].join(" / "),
          image: p.icon_url ?? projectImages["spawn-all-mod"]!,
          modIcon: p.icon_url ?? projectImages["spawn-all-mod"]!,
          link: `https://modrinth.com/mod/${p.slug}`,
          description: p.description,
          modDescription: p.description,
          fullDescription: p.description,
          downloads: p.downloads,
          likes: p.followers,
          updatedAgo: timeAgo(p.date_modified),
          tags: p.categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)),
          loaders: p.loaders,
          versions: p.game_versions,
          status: "public",
        };
        return p.body ? { ...base, markdownFile: p.body } : base;
      })
      .sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0));
  }, [modrinthData]);

  const allModProjects: ModProjectData[] = useMemo(() => {
    if (isLoading) return STATIC_MOD_PROJECTS;
    return [...modrinthModProjects, ...STATIC_MOD_PROJECTS];
  }, [modrinthModProjects, isLoading]);

  const totalWebsite = REGULAR_WEBSITE_PROJECTS.length + CONTRIBUTION_WEBSITE_PROJECTS.length;
  const totalGame = GAME_PROJECTS.length + CONTRIBUTION_GAME_PROJECTS.length;
  const totalAll = totalWebsite + allModProjects.length + totalGame;

  const countFor = (key: CategoryKey) => {
    if (key === "all") return totalAll;
    if (key === "Website") return totalWebsite;
    if (key === "Mod") return allModProjects.length;
    return totalGame;
  };

  const showWebsites = activeFilter === "all" || activeFilter === "Website";
  const showMods = activeFilter === "all" || activeFilter === "Mod";
  const showGames = activeFilter === "all" || activeFilter === "Game";

  return (
    <PageShell>
      <PageHeader
        kicker={t("project.kicker")}
        title={t("project.title")}
        description={t("project.description")}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-11 sm:px-6 sm:py-20">
        <div className="mb-10 flex items-center gap-2">
          <PixelFilter size={13} className="text-secondary" />
          <span className="pixel-label text-muted-foreground" style={{ fontSize: 9 }}>
            {t("project.filterLabel")}
          </span>
          <div className="h-1 flex-1 bg-border/30" />
        </div>

        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((cat) => {
            const isActive = activeFilter === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveFilter(cat.key)}
                className={`pixel-tag inline-flex items-center gap-2 ${isActive ? "pixel-tag-primary" : ""}`}
                style={{ cursor: "pointer", fontSize: 9, padding: "8px 14px" }}
                aria-pressed={isActive}
              >
                {cat.key === "all" && <PixelFilter size={11} />}
                {cat.key === "Game" && <PixelGamepad size={11} />}
                {t(`project.categories.${cat.key}`)}
                <span
                  className="pixel-label inline-flex h-5 min-w-[20px] items-center justify-center px-1"
                  style={{
                    fontSize: 7,
                    background: isActive ? "var(--primary-foreground)" : "var(--muted)",
                    color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                  }}
                >
                  {isLoading && cat.key === "Mod" ? "…" : countFor(cat.key)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Websites */}
        {showWebsites && (
          <div className="mb-14">
            {activeFilter === "all" && <SubsectionHeading label={t("project.sections.websites")} />}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {REGULAR_WEBSITE_PROJECTS.map((p, i) => (
                <WebsiteCard
                  key={p.id}
                  project={p}
                  index={i}
                  onClick={() => setSelectedWebsite(p)}
                />
              ))}
            </div>

            {CONTRIBUTION_WEBSITE_PROJECTS.length > 0 && (
              <div className="mt-10">
                <SubsectionHeading
                  icon={PixelFork}
                  label={t("project.sections.contributionWebsites")}
                  count={t("project.collabCount", { count: CONTRIBUTION_WEBSITE_PROJECTS.length })}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                  {CONTRIBUTION_WEBSITE_PROJECTS.map((p, i) => (
                    <WebsiteCard
                      key={p.id}
                      project={p}
                      index={i}
                      onClick={() => setSelectedWebsite(p)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mods — Modrinth live + local static, merged in one list */}
        {showMods && (
          <div className="mb-14">
            <div className="mb-5 flex items-center gap-2">
              <span className="pixel-label text-muted-foreground/70" style={{ fontSize: 9 }}>
                {t("project.sections.mods")}
              </span>
              <div className="h-1 flex-1 bg-border/30" />
              {isLoading && (
                <span
                  className="pixel-label inline-flex items-center gap-1.5 text-muted-foreground"
                  style={{ fontSize: 7 }}
                >
                  <PixelRefresh size={10} className="animate-spin" /> {t("project.syncingModrinth")}
                </span>
              )}
              {isError && (
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="pixel-tag inline-flex items-center gap-1.5"
                  style={{ fontSize: 7, cursor: "pointer" }}
                >
                  <PixelRefresh size={10} /> {t("project.syncFailed")}
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {isLoading && STATIC_MOD_PROJECTS.length === 0 && (
                <p className="pixel-label text-muted-foreground" style={{ fontSize: 9 }}>
                  {t("project.loadingMods")}
                  <span className="anim-blink">_</span>
                </p>
              )}
              {allModProjects.map((mod, i) => (
                <ModCard key={mod.id} project={mod} index={i} onClick={() => setSelectedMod(mod)} />
              ))}
            </div>
          </div>
        )}

        {/* Games */}
        {showGames && (GAME_PROJECTS.length > 0 || CONTRIBUTION_GAME_PROJECTS.length > 0) && (
          <div className="mb-4">
            {GAME_PROJECTS.length > 0 && (
              <div className="mb-10">
                <SubsectionHeading
                  icon={PixelGamepad}
                  label={t("project.sections.games")}
                  count={t("project.gameCount", { count: GAME_PROJECTS.length })}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                  {GAME_PROJECTS.map((p, i) => (
                    <GameCard key={p.id} project={p} index={i} onClick={() => setSelectedGame(p)} />
                  ))}
                </div>
              </div>
            )}

            {CONTRIBUTION_GAME_PROJECTS.length > 0 && (
              <div>
                <SubsectionHeading
                  icon={PixelFork}
                  label={t("project.sections.contributionGames")}
                  count={t("project.collabCount", { count: CONTRIBUTION_GAME_PROJECTS.length })}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                  {CONTRIBUTION_GAME_PROJECTS.map((p, i) => (
                    <GameCard key={p.id} project={p} index={i} onClick={() => setSelectedGame(p)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Live Preview */}
      <section className="border-t-4 border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-11 sm:px-6 sm:py-20">
          <SectionTitle
            index="02"
            title={t("project.livePreview.title")}
            description={t("project.livePreview.description")}
          />
          <LivePreview />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-11 sm:px-6 sm:py-20">
        <Link to="/about" className="pixel-btn pixel-btn-ghost">
          {t("project.getToKnowMe")} <PixelArrowRight size={16} />
        </Link>
      </section>

      {/* Modals */}
      <ProjectModal project={selectedWebsite} onClose={() => setSelectedWebsite(null)} />
      <ModProjectModal project={selectedMod} onClose={() => setSelectedMod(null)} />
      <GameProjectModal project={selectedGame} onClose={() => setSelectedGame(null)} />
    </PageShell>
  );
}
