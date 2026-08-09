import { useEffect, useState } from "react";
import {
  useGithubStats,
  getLangColor,
  type PinnedRepo,
  type LangStats,
} from "@/hooks/useGithubStats";
import {
  PixelGithub,
  PixelStar,
  PixelFork,
  PixelUsers,
  PixelBook,
  PixelRefresh,
  PixelCalendar,
  PixelTrending,
  PixelPin,
  PixelExternal,
} from "@/components/common/PixelIcon";
import { github } from "@/data/skills";
import { useLanguage } from "@/lib/i18n";

type Tab = "overview" | "repos" | "langs";

const tabs: { key: Tab; file: string; icon: typeof PixelTrending }[] = [
  { key: "overview", file: "overview.ts", icon: PixelTrending },
  { key: "repos", file: "starred.ts", icon: PixelStar },
  { key: "langs", file: "languages.ts", icon: PixelBook },
];

function StatBlock({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof PixelStar;
  label: string;
  value: number;
}) {
  return (
    <div className="pixel-inset flex flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <Icon size={16} className="text-secondary" />
      </div>
      <span className="pixel-label text-foreground" style={{ fontSize: 18 }}>
        {value.toLocaleString("id-ID")}
      </span>
      <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
        {label}
      </span>
    </div>
  );
}

function LangBar({ langs }: { langs: LangStats[] }) {
  return (
    <div>
      <div className="pixel-inset flex h-6 overflow-hidden">
        {langs.map((l) => (
          <div
            key={l.name}
            style={{ width: `${l.percentage}%`, backgroundColor: getLangColor(l.name) }}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {langs.map((l) => (
          <div key={l.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0"
              style={{ backgroundColor: getLangColor(l.name) }}
            />
            <span className="body-text text-muted-foreground">{l.name}</span>
            <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
              {l.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PinnedRepoCard({ repo }: { repo: PinnedRepo }) {
  return (
    <a
      href={repo.link}
      target="_blank"
      rel="noopener noreferrer"
      className="pixel-card flex min-w-0 flex-col gap-3 overflow-hidden p-5"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <PixelBook size={14} className="shrink-0 text-secondary" />
          <span className="pixel-label truncate text-foreground" style={{ fontSize: 10 }}>
            {repo.repo}
          </span>
        </div>
        <PixelExternal size={12} className="shrink-0 text-muted-foreground" />
      </div>
      {repo.description && (
        <p
          className="body-text line-clamp-2 break-words text-muted-foreground"
          style={{ fontSize: "0.95rem" }}
        >
          {repo.description}
        </p>
      )}
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
        {repo.language && (
          <div className="flex min-w-0 max-w-full items-center gap-1.5">
            <span className="h-2 w-2 shrink-0" style={{ backgroundColor: repo.languageColor }} />
            <span className="pixel-label truncate text-muted-foreground" style={{ fontSize: 8 }}>
              {repo.language}
            </span>
          </div>
        )}
        <div className="flex shrink-0 items-center gap-1 text-muted-foreground">
          <PixelStar size={11} />
          <span className="pixel-label" style={{ fontSize: 8 }}>
            {repo.stars}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-muted-foreground">
          <PixelFork size={11} />
          <span className="pixel-label" style={{ fontSize: 8 }}>
            {repo.forks}
          </span>
        </div>
      </div>
    </a>
  );
}

function ContribChart({ username }: { username: string }) {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const cacheBust = Math.floor(Date.now() / (60 * 60 * 1000));
  const src = `https://ghchart.rshah.org/${username}?v=${cacheBust}`;

  return (
    <div className="pixel-inset relative w-full overflow-hidden p-2.5 sm:p-3">
      {!loaded && !error && (
        <p className="pixel-label py-6 text-center text-muted-foreground" style={{ fontSize: 9 }}>
          {t("skill.github.loadingChart")}
          <span className="anim-blink">_</span>
        </p>
      )}
      {error && (
        <p className="pixel-label py-6 text-center text-muted-foreground" style={{ fontSize: 9 }}>
          {t("skill.github.chartError")}
        </p>
      )}
      {/* On mobile the chart is scaled down to fit the card width instead of
          forcing a wide horizontal scroll — keeps the section short and tidy.
          From sm+ there's enough room to show it at native size with a
          horizontal scroll fallback for very small tablets. */}
      <div className="w-full overflow-x-auto sm:overflow-x-visible">
        <img
          src={src}
          alt={`${username} GitHub contribution chart`}
          className="w-full sm:w-full sm:min-w-[560px]"
          style={{ display: loaded ? "block" : "none" }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      </div>
    </div>
  );
}

export default function GithubActivity() {
  const { t, language } = useLanguage();
  const { data, isLoading, isFetching, isError, error, refetch } = useGithubStats(github.username);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (data) setNow(Date.now());
  }, [data]);

  const memberSince = data?.user.created_at ? new Date(data.user.created_at).getFullYear() : null;
  const activeReposThisYear = data
    ? data.repos.filter((r) => new Date(r.updated_at).getFullYear() === new Date().getFullYear())
        .length
    : 0;

  return (
    <div className="pixel-card overflow-visible">
      <div className="flex items-center justify-between bg-muted/50 border-b-4 border-border">
        <div className="flex flex-1 items-center overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex shrink-0 items-center gap-2 border-r-4 border-border px-2.5 py-2.5 transition-colors sm:px-5 sm:py-3"
              style={{
                background: activeTab === tab.key ? "var(--card)" : "transparent",
                borderBottom:
                  activeTab === tab.key ? "3px solid var(--secondary)" : "3px solid transparent",
              }}
            >
              <tab.icon
                size={13}
                className={activeTab === tab.key ? "text-secondary" : "text-muted-foreground"}
              />
              <span
                className="pixel-label hidden sm:inline"
                style={{
                  fontSize: 9,
                  color: activeTab === tab.key ? "var(--foreground)" : "var(--muted-foreground)",
                }}
              >
                {tab.file}
              </span>
            </button>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2 px-3">
          <span className="hidden items-center gap-1.5 border-2 border-border bg-background px-2 py-1 sm:flex">
            <span className="h-2 w-2 bg-secondary" />
            <span className="pixel-label text-secondary" style={{ fontSize: 8 }}>
              {t("skill.github.live")}
            </span>
          </span>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isLoading || isFetching}
            aria-label={t("skill.github.refreshAria")}
            className="grid h-8 w-8 place-items-center border-2 border-border bg-background text-muted-foreground disabled:opacity-40"
          >
            <PixelRefresh size={13} className={isFetching ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {isLoading && !data && (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <PixelGithub size={32} className="animate-pulse text-secondary" />
          <p className="pixel-label text-muted-foreground" style={{ fontSize: 9 }}>
            {t("skill.github.loadingData")}
            <span className="anim-blink">_</span>
          </p>
        </div>
      )}

      {isError && !data && (
        <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
          <PixelGithub size={28} className="text-destructive" />
          <div>
            <p className="pixel-label text-foreground" style={{ fontSize: 10 }}>
              {t("skill.github.statsError")}
            </p>
            <p className="body-text mt-2 text-muted-foreground">
              {error instanceof Error ? error.message : t("skill.github.genericError")}
            </p>
            <p className="pixel-label mt-1 text-muted-foreground/70" style={{ fontSize: 8 }}>
              {t("skill.github.rateLimitNote")}
            </p>
          </div>
          <button type="button" onClick={() => refetch()} className="pixel-btn pixel-btn-alt">
            <PixelRefresh size={14} /> {t("skill.github.tryAgain")}
          </button>
        </div>
      )}

      {data && (
        <>
          {activeTab === "overview" && (
            <div className="flex flex-col gap-5 p-4 sm:gap-6 sm:p-7">
              <div className="pixel-inset flex flex-wrap items-center gap-4 p-4">
                <img
                  src={data.user.avatar_url}
                  alt={data.user.login}
                  className="h-14 w-14 shrink-0 border-4 border-border object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="pixel-label text-foreground" style={{ fontSize: 11 }}>
                      {data.user.name || data.user.login}
                    </span>
                    <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                      @{data.user.login}
                    </span>
                    {memberSince && (
                      <span className="pixel-tag pixel-tag-secondary">
                        {t("skill.github.since", { year: memberSince })}
                      </span>
                    )}
                  </div>
                  {data.user.bio && (
                    <p className="body-text mt-2 line-clamp-2 text-muted-foreground">
                      {data.user.bio}
                    </p>
                  )}
                </div>
                <a
                  href={github.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-tag pixel-tag-accent inline-flex shrink-0 items-center gap-2"
                >
                  <PixelGithub size={12} /> {t("skill.github.profile")}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <StatBlock
                  icon={PixelBook}
                  label={t("skill.github.repos")}
                  value={data.user.public_repos}
                />
                <StatBlock
                  icon={PixelStar}
                  label={t("skill.github.stars")}
                  value={data.totalStars}
                />
                <StatBlock
                  icon={PixelFork}
                  label={t("skill.github.forks")}
                  value={data.totalForks}
                />
                <StatBlock
                  icon={PixelUsers}
                  label={t("skill.github.followers")}
                  value={data.user.followers}
                />
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PixelCalendar size={14} className="text-secondary" />
                    <span className="pixel-label text-foreground" style={{ fontSize: 10 }}>
                      {t("skill.github.contributionActivity")}
                    </span>
                  </div>
                  <a
                    href={github.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-label flex items-center gap-1 text-muted-foreground"
                    style={{ fontSize: 8 }}
                  >
                    <PixelExternal size={10} /> {t("skill.github.viewOnGithub")}
                  </a>
                </div>
                <ContribChart username={github.username} />
              </div>

              <div className="pixel-inset flex flex-wrap items-center justify-around gap-4 p-4 text-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="pixel-label text-foreground" style={{ fontSize: 16 }}>
                    {activeReposThisYear}
                  </span>
                  <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                    {t("skill.github.activeRepos")}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 shrink-0"
                      style={{
                        backgroundColor: data.langs[0]
                          ? getLangColor(data.langs[0].name)
                          : "#8b949e",
                      }}
                    />
                    <span className="pixel-label text-foreground" style={{ fontSize: 12 }}>
                      {data.langs[0]?.name ?? "—"}
                    </span>
                  </div>
                  <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                    {t("skill.github.topLanguage")}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="pixel-label text-foreground" style={{ fontSize: 16 }}>
                    {data.user.public_repos}
                  </span>
                  <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                    {t("skill.github.publicRepos")}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "repos" && (
            <div className="p-4 sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PixelPin size={14} className="text-secondary" />
                  <span className="pixel-label text-foreground" style={{ fontSize: 10 }}>
                    {t("skill.github.starredRepositories")}
                  </span>
                </div>
                <a
                  href={`${github.profileUrl}?tab=stars`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-label flex items-center gap-1 text-muted-foreground"
                  style={{ fontSize: 8 }}
                >
                  <PixelExternal size={10} /> {t("skill.github.viewAll")}
                </a>
              </div>
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                {data.pinnedRepos.map((repo) => (
                  <PinnedRepoCard key={`${repo.owner}/${repo.repo}`} repo={repo} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "langs" && (
            <div className="p-4 sm:p-7">
              <div className="mb-5 flex items-center gap-2">
                <PixelBook size={14} className="text-secondary" />
                <span className="pixel-label text-foreground" style={{ fontSize: 10 }}>
                  {t("skill.github.languageBreakdown")}
                </span>
              </div>
              {data.langs.length > 0 ? (
                <LangBar langs={data.langs} />
              ) : (
                <p className="body-text py-8 text-center text-muted-foreground">
                  {t("skill.github.noLanguageData")}
                </p>
              )}
            </div>
          )}

          <div className="flex items-center justify-between border-t-4 border-border bg-muted/30 px-4 py-2">
            <span
              className="pixel-label flex items-center gap-2 text-muted-foreground"
              style={{ fontSize: 8 }}
            >
              <span className="h-1.5 w-1.5 bg-secondary" />
              GitHub REST API
            </span>
            <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
              {t("skill.github.updated", {
                time: new Date(now).toLocaleTimeString(language === "id" ? "id-ID" : "en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              })}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
