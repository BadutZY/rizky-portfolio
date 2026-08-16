import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  PixelMonitor,
  PixelTablet,
  PixelSmartphone,
  PixelExternal,
  PixelRefresh,
  PixelGlobe,
  PixelChevronRight,
  PixelMaximize,
  PixelClose,
} from "@/components/common/PixelIcon";
import { PREVIEW_SITES } from "@/data/project";
import { useLanguage } from "@/lib/i18n";

type SiteId = (typeof PREVIEW_SITES)[number]["id"];
type Viewport = "desktop" | "tablet" | "mobile";

const VIEWPORT_CFG: Record<Viewport, { icon: typeof PixelMonitor; width: string; aspect: number }> =
  {
    desktop: { icon: PixelMonitor, width: "100%", aspect: 56.25 },
    tablet: { icon: PixelTablet, width: "768px", aspect: 75 },
    mobile: { icon: PixelSmartphone, width: "380px", aspect: 177.78 },
  };

function FullscreenModal({
  url,
  title,
  onClose,
}: {
  url: string;
  title: string;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex flex-col bg-background">
      <div className="flex shrink-0 items-center justify-between border-b-4 border-border bg-muted/60 px-4 py-3">
        <div className="flex items-center gap-3">
          <PixelGlobe size={15} className="text-secondary" />
          <span className="pixel-label text-foreground" style={{ fontSize: 10 }}>
            {title}
          </span>
          <span
            className="pixel-label hidden text-muted-foreground sm:inline"
            style={{ fontSize: 8 }}
          >
            {url}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn pixel-btn-ghost"
            style={{ padding: "6px 10px" }}
          >
            <PixelExternal size={13} />
            <span className="hidden sm:inline">
              {t("project.livePreviewWidget.openNewTabLong")}
            </span>
          </a>
          <button
            onClick={onClose}
            aria-label={t("project.livePreviewWidget.closeFullscreen")}
            className="grid h-9 w-9 place-items-center border-2 border-border bg-background text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
          >
            <PixelClose size={15} />
          </button>
        </div>
      </div>
      <iframe src={url} title={title} className="w-full flex-1 border-none" />
    </div>,
    document.body,
  );
}

export default function LivePreview() {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<SiteId>(1);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    const onChange = () => setIsMobileScreen(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isMobileScreen) setViewport("mobile");
  }, [isMobileScreen]);

  const activeSite = PREVIEW_SITES.find((s) => s.id === activeId)!;
  const activeIndex = PREVIEW_SITES.findIndex((s) => s.id === activeId);
  const vpCfg = VIEWPORT_CFG[viewport];
  const viewportKeys = (Object.keys(VIEWPORT_CFG) as Viewport[]).filter(
    (vp) => !isMobileScreen || vp === "mobile",
  );

  const switchSite = useCallback(
    (id: SiteId) => {
      if (id === activeId) return;
      setActiveId(id);
      setIsLoading(true);
      setRefreshKey((k) => k + 1);
    },
    [activeId],
  );

  const handlePrev = useCallback(() => {
    const prev = PREVIEW_SITES[(activeIndex - 1 + PREVIEW_SITES.length) % PREVIEW_SITES.length];
    if (prev) switchSite(prev.id);
  }, [activeIndex, switchSite]);

  const handleNext = useCallback(() => {
    const next = PREVIEW_SITES[(activeIndex + 1) % PREVIEW_SITES.length];
    if (next) switchSite(next.id);
  }, [activeIndex, switchSite]);

  const refresh = () => {
    setIsLoading(true);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div>
      <div className="pixel-card overflow-visible">
        {/* Browser chrome */}
        <div className="flex flex-wrap items-center gap-2 border-b-4 border-border bg-muted/50 px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
            <span className="h-3 w-3 shrink-0 border-2 border-border bg-destructive" />
            <span className="h-3 w-3 shrink-0 border-2 border-border bg-secondary" />
            <span className="h-3 w-3 shrink-0 border-2 border-border bg-accent" />
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={handlePrev}
              className="grid h-7 w-7 place-items-center text-muted-foreground hover:bg-border/60"
              aria-label={t("project.livePreviewWidget.prev")}
            >
              <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}>
                <PixelChevronRight size={13} />
              </span>
            </button>
            <button
              onClick={handleNext}
              className="grid h-7 w-7 place-items-center text-muted-foreground hover:bg-border/60"
              aria-label={t("project.livePreviewWidget.next")}
            >
              <PixelChevronRight size={13} />
            </button>
          </div>

          <div className="pixel-inset flex min-w-0 flex-1 items-center gap-2 px-3 py-1.5">
            <span className="h-2 w-2 shrink-0" style={{ backgroundColor: activeSite.color }} />
            <span className="truncate font-mono text-muted-foreground" style={{ fontSize: 11 }}>
              {activeSite.url}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={refresh}
              title={t("project.livePreviewWidget.refresh")}
              className="grid h-8 w-8 place-items-center text-muted-foreground hover:bg-border/60"
            >
              <PixelRefresh size={14} className={isLoading ? "animate-spin" : ""} />
            </button>
            <a
              href={activeSite.url}
              target="_blank"
              rel="noopener noreferrer"
              title={t("project.livePreviewWidget.openNewTab")}
              className="grid h-8 w-8 place-items-center text-muted-foreground hover:bg-border/60"
            >
              <PixelExternal size={14} />
            </a>
            <button
              onClick={() => setFullscreen(true)}
              title={t("project.livePreviewWidget.fullscreen")}
              className="grid h-8 w-8 place-items-center text-muted-foreground hover:bg-border/60"
            >
              <PixelMaximize size={14} />
            </button>
          </div>
        </div>

        {/* Tabs + viewport toggle */}
        <div className="flex items-center border-b-4 border-border bg-muted/30">
          <div className="flex flex-1 items-center overflow-x-auto">
            {PREVIEW_SITES.map((site) => {
              const isActive = site.id === activeId;
              return (
                <button
                  key={site.id}
                  onClick={() => switchSite(site.id)}
                  className="relative flex shrink-0 items-center gap-1.5 border-r-2 border-border/40 px-3 py-2 whitespace-nowrap sm:gap-2 sm:px-4 sm:py-2.5"
                  style={{ background: isActive ? "var(--card)" : "transparent" }}
                >
                  {isActive && (
                    <span
                      className="absolute inset-x-0 bottom-0 h-[3px]"
                      style={{ backgroundColor: site.color }}
                    />
                  )}
                  <span
                    className="h-2 w-2 shrink-0 border"
                    style={{
                      backgroundColor: isActive ? site.color : "transparent",
                      borderColor: site.color,
                    }}
                  />
                  <span
                    className="pixel-label"
                    style={{
                      fontSize: 8,
                      color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                    }}
                  >
                    {site.title}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex shrink-0 items-center gap-1 border-l-2 border-border/40 px-2 py-2 sm:px-3">
            {viewportKeys.map((vp) => {
              const VPIcon = VIEWPORT_CFG[vp].icon;
              const active = viewport === vp;
              return (
                <button
                  key={vp}
                  onClick={() => setViewport(vp)}
                  title={t(`project.livePreviewWidget.viewport.${vp}`)}
                  disabled={isMobileScreen}
                  className="grid h-7 w-7 place-items-center disabled:cursor-default"
                  style={{
                    background: active ? "var(--secondary)" : "transparent",
                    color: active ? "var(--secondary-foreground)" : "var(--muted-foreground)",
                  }}
                >
                  <VPIcon size={13} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Iframe stage */}
        <div className="flex min-h-[300px] items-start justify-center bg-[#1a1a1a] p-3 sm:min-h-[420px] sm:p-4 md:p-6">
          <div
            className="pixel-inset relative overflow-hidden bg-white"
            style={{ width: vpCfg.width, maxWidth: "100%" }}
          >
            <div className="relative w-full" style={{ paddingTop: `${vpCfg.aspect}%` }}>
              <iframe
                key={`${activeId}-${refreshKey}`}
                src={activeSite.url}
                title={`Preview: ${activeSite.title}`}
                className="absolute inset-0 block h-full w-full border-none"
                allow="fullscreen"
                onLoad={() => setIsLoading(false)}
              />
              {isLoading && (
                <div
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3"
                  style={{ background: "#0f0f0f" }}
                >
                  <span
                    className="animate-pulse"
                    style={{ color: activeSite.color, display: "inline-flex" }}
                  >
                    <PixelGlobe size={26} />
                  </span>
                  <p className="pixel-label text-white/50" style={{ fontSize: 9 }}>
                    {t("project.livePreviewWidget.loading")}
                    <span className="anim-blink">_</span>
                  </p>
                  <p className="font-mono text-white/25" style={{ fontSize: 10 }}>
                    {activeSite.url}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {isMobileScreen && (
          <p
            className="pixel-label border-t-2 border-border/40 bg-muted/20 px-4 py-2 text-center text-muted-foreground/70"
            style={{ fontSize: 7 }}
          >
            {t("project.livePreviewWidget.mobileOnlyNote")}
          </p>
        )}

        {/* Footer */}
        <div className="flex flex-col items-start justify-between gap-3 border-t-4 border-border bg-muted/20 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="grid h-9 w-9 shrink-0 place-items-center border-2 border-border"
              style={{ backgroundColor: activeSite.color + "22", color: activeSite.color }}
            >
              <PixelGlobe size={16} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="pixel-label text-foreground" style={{ fontSize: 9 }}>
                  {activeSite.title}
                </span>
                <span className="pixel-tag" style={{ fontSize: 7 }}>
                  {activeSite.badge}
                </span>
              </div>
              <p
                className="body-text mt-1 truncate text-muted-foreground"
                style={{ fontSize: "0.9rem" }}
              >
                {activeSite.description}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex items-center gap-1.5">
              {PREVIEW_SITES.map((site) => (
                <button
                  key={site.id}
                  onClick={() => switchSite(site.id)}
                  aria-label={site.title}
                  className="block h-1.5"
                  style={{
                    width: site.id === activeId ? 20 : 6,
                    backgroundColor:
                      site.id === activeId ? activeSite.color : "var(--muted-foreground)",
                    opacity: site.id === activeId ? 1 : 0.4,
                    transition: "width 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              ))}
            </div>
            <a
              href={activeSite.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn pixel-btn-ghost"
              style={{ padding: "8px 14px" }}
            >
              {t("project.livePreviewWidget.open")} <PixelExternal size={13} />
            </a>
          </div>
        </div>
      </div>

      {fullscreen && (
        <FullscreenModal
          url={activeSite.url}
          title={activeSite.title}
          onClose={() => setFullscreen(false)}
        />
      )}
    </div>
  );
}
