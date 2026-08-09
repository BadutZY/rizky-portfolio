import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  PixelClose,
  PixelExternal,
  PixelDownload,
  PixelHeart,
  PixelClock,
  PixelPackage,
  PixelFileText,
  PixelCheck,
  PixelChevronDown,
} from "@/components/common/PixelIcon";
import MarkdownRenderer from "@/pages/project/components/MarkdownRenderer";
import { loaderIcons } from "@/data/image";
import type { ModProjectData, ModDownloadEntry, ReleaseType, ModStatus } from "@/data/project";
import { STATUS_LABEL } from "@/pages/project/components/ModCard";
import { useLanguage } from "@/lib/i18n";

interface ModProjectModalProps {
  project: ModProjectData | null;
  onClose: () => void;
}

const LOADER_ICONS: Record<string, string> = {
  Fabric: loaderIcons.fabric,
  Forge: loaderIcons.forge,
  NeoForge: loaderIcons.neoforge,
  Neoforge: loaderIcons.neoforge,
  Quilt: loaderIcons.quilt,
};

const TECH_ICONS: Record<string, string> = {
  Fabric: loaderIcons.fabric,
  Forge: loaderIcons.forge,
  NeoForge: loaderIcons.neoforge,
  Quilt: loaderIcons.quilt,
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
};

function formatDownloads(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".0", "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(".0", "") + "K";
  return n.toString();
}

function getSiteName(url: string, viewSiteLabel: string): string {
  if (url.includes("modrinth")) return "Modrinth";
  if (url.includes("curseforge")) return "CurseForge";
  if (url.includes("github")) return "GitHub";
  return viewSiteLabel;
}

function timeAgoShort(iso: string): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "—";
  const diff = Date.now() - date.getTime();
  if (diff < 0) return "just now";
  const d = Math.floor(diff / 86_400_000);
  if (d === 0) return "today";
  if (d < 7) return `${d}d ago`;
  const w = Math.floor(d / 7);
  if (w < 5) return `${w}w ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(d / 365)}y ago`;
}

const RELEASE_INITIAL: Record<ReleaseType, string> = { alpha: "A", beta: "B", release: "R" };

// Warna latar per channel rilis: Release = hijau, Beta = oranye, Alpha = merah.
const RELEASE_COLOR: Record<ReleaseType, string> = {
  release: "#2f9e44",
  beta: "#e8830c",
  alpha: "#e03131",
};

function ReleaseDot({ type }: { type: ReleaseType }) {
  return (
    <span
      title={type}
      className="grid h-7 w-7 shrink-0 place-items-center pixel-label select-none border-2 border-border"
      style={{ fontSize: 10, background: RELEASE_COLOR[type], color: "#fff" }}
    >
      {RELEASE_INITIAL[type]}
    </span>
  );
}

// ── Filter dropdown (multi-select, clean & compact) ───────────────────
function DropdownFilter({
  label,
  options,
  selected,
  onChange,
  icons,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  icons?: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 176, openUp: false });

  const PANEL_WIDTH = 176; // must match w-44 below
  const PANEL_MAX_HEIGHT = 224; // must match max-h-56 below

  const updateCoords = () => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < PANEL_MAX_HEIGHT + 12 && rect.top > PANEL_MAX_HEIGHT + 12;
    let left = rect.left;
    if (left + PANEL_WIDTH > window.innerWidth - 8) left = window.innerWidth - PANEL_WIDTH - 8;
    if (left < 8) left = 8;
    setCoords({
      top: openUp ? rect.top - 6 : rect.bottom + 6,
      left,
      width: PANEL_WIDTH,
      openUp,
    });
  };

  useEffect(() => {
    if (!open) return;
    updateCoords();
    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (rootRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // capture=true so this also catches scrolling inside the modal's inner
    // scroll container (scroll events don't bubble, but capture still fires).
    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    document.addEventListener("scroll", updateCoords, true);
    window.addEventListener("resize", updateCoords);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("scroll", updateCoords, true);
      window.removeEventListener("resize", updateCoords);
    };
  }, [open]);

  if (options.length === 0) return null;

  const toggle = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`pixel-tag inline-flex items-center gap-1.5 ${selected.length > 0 ? "pixel-tag-secondary" : ""}`}
        style={{ fontSize: 8, cursor: "pointer" }}
      >
        {label}
        {selected.length > 0 && (
          <span
            className="pixel-tag pixel-tag-primary inline-flex items-center justify-center"
            style={{ fontSize: 7, padding: "1px 5px", minWidth: 14 }}
          >
            {selected.length}
          </span>
        )}
        <PixelChevronDown
          size={9}
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open &&
        createPortal(
          <div
            ref={panelRef}
            role="listbox"
            className="pixel-inset fixed z-[999] max-h-56 w-44 overflow-y-auto bg-background p-1.5"
            style={{
              top: coords.openUp ? undefined : coords.top,
              bottom: coords.openUp ? window.innerHeight - coords.top : undefined,
              left: coords.left,
              width: coords.width,
              boxShadow: "6px 6px 0 0 var(--pixel-shadow)",
            }}
          >
            {options.map((opt) => {
              const active = selected.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => toggle(opt)}
                  className={`flex w-full items-center gap-2 border-2 border-transparent px-2 py-1.5 text-left hover:border-border ${
                    active ? "bg-secondary text-secondary-foreground" : "text-foreground"
                  }`}
                >
                  <span className="grid h-3.5 w-3.5 shrink-0 place-items-center border-2 border-current">
                    {active && <PixelCheck size={8} />}
                  </span>
                  {icons?.[opt] && (
                    <img
                      src={icons[opt]}
                      alt={opt}
                      className="h-3.5 w-3.5 shrink-0 object-contain"
                    />
                  )}
                  <span className="pixel-label truncate" style={{ fontSize: 8 }}>
                    {opt}
                  </span>
                </button>
              );
            })}

            {selected.length > 0 && (
              <button
                type="button"
                onClick={() => onChange([])}
                className="pixel-label mt-1 w-full border-t-2 border-border pt-1.5 text-center text-muted-foreground hover:text-foreground"
                style={{ fontSize: 7, cursor: "pointer" }}
              >
                {t("project.modal.reset", { label })}
              </button>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}

// ── Static Versions Tab (bundled downloads, no Modrinth API) ──────────
function StaticVersionsTab({ downloads }: { downloads: ModDownloadEntry[] }) {
  const { t } = useLanguage();
  const [selVersions, setSelVersions] = useState<string[]>([]);
  const [selLoaders, setSelLoaders] = useState<string[]>([]);
  const [selChannels, setSelChannels] = useState<string[]>([]);

  const gameVersions = useMemo(
    () =>
      [...new Set(downloads.flatMap((d) => d.game_versions))].sort((a, b) =>
        b.localeCompare(a, undefined, { numeric: true }),
      ),
    [downloads],
  );
  const loaders = useMemo(
    () => [...new Set(downloads.flatMap((d) => d.loaders))].sort(),
    [downloads],
  );
  const channels = useMemo(() => {
    const order: ReleaseType[] = ["release", "beta", "alpha"];
    const present = new Set(downloads.map((d) => d.release_type ?? "release"));
    return order.filter((c) => present.has(c));
  }, [downloads]);

  const filtered = downloads.filter((d) => {
    const mV = selVersions.length === 0 || d.game_versions.some((v) => selVersions.includes(v));
    const mL = selLoaders.length === 0 || d.loaders.some((l) => selLoaders.includes(l));
    const mC = selChannels.length === 0 || selChannels.includes(d.release_type ?? "release");
    return mV && mL && mC;
  });

  const handleDownload = (entry: ModDownloadEntry) => {
    const a = document.createElement("a");
    a.href = entry.filePath;
    a.download = entry.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-4">
      <div className="pixel-inset flex flex-wrap items-center gap-1.5 p-2.5 sm:gap-2 sm:p-3">
        <span className="pixel-label mr-1 text-muted-foreground/60" style={{ fontSize: 7 }}>
          {t("project.modal.filter")}
        </span>
        <DropdownFilter
          label="Loader"
          options={loaders}
          selected={selLoaders}
          onChange={setSelLoaders}
          icons={LOADER_ICONS}
        />
        <DropdownFilter
          label="Version"
          options={gameVersions}
          selected={selVersions}
          onChange={setSelVersions}
        />
        <DropdownFilter
          label="Channel"
          options={channels}
          selected={selChannels}
          onChange={setSelChannels}
        />
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <p className="body-text py-6 text-center text-muted-foreground">
            {t("project.modal.noVersionsMatch")}
          </p>
        ) : (
          filtered.map((entry, idx) => (
            <div key={idx} className="pixel-inset flex items-center gap-2.5 p-2.5 sm:gap-3 sm:p-3">
              <ReleaseDot type={entry.release_type ?? "release"} />
              <div className="min-w-0 flex-1">
                <p className="pixel-label text-foreground" style={{ fontSize: 9 }}>
                  {entry.name}{" "}
                  <span className="text-muted-foreground/60">v{entry.version_number}</span>
                </p>
                <div
                  className="mt-1 flex flex-wrap gap-1 text-muted-foreground"
                  style={{ fontSize: 9 }}
                >
                  <span>{entry.game_versions.join(", ")}</span>
                  <span>·</span>
                  <span>{entry.loaders.join(", ")}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDownload(entry)}
                title={`Download ${entry.filename}`}
                className="grid h-9 w-9 shrink-0 place-items-center border-2 border-border bg-background text-secondary hover:bg-secondary hover:text-secondary-foreground"
              >
                <PixelDownload size={15} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ── Modrinth live Versions Tab ─────────────────────────────────────────
interface ModrinthVersion {
  id: string;
  name: string;
  version_number: string;
  version_type: ReleaseType;
  game_versions: string[];
  loaders: string[];
  date_published: string;
  downloads: number;
  files: { url: string; filename: string; primary: boolean }[];
}

function VersionsTab({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const [versions, setVersions] = useState<ModrinthVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selVersions, setSelVersions] = useState<string[]>([]);
  const [selLoaders, setSelLoaders] = useState<string[]>([]);
  const [selChannels, setSelChannels] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setSelVersions([]);
    setSelLoaders([]);
    setSelChannels([]);
    fetch(`https://api.modrinth.com/v2/project/${slug}/version`, {
      headers: { Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((data: ModrinthVersion[]) => {
        setVersions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  const gameVersions = useMemo(
    () =>
      [...new Set(versions.flatMap((v) => v.game_versions))].sort((a, b) =>
        b.localeCompare(a, undefined, { numeric: true }),
      ),
    [versions],
  );
  const loaders = useMemo(
    () =>
      [
        ...new Set(
          versions.flatMap((v) => v.loaders.map((l) => l.charAt(0).toUpperCase() + l.slice(1))),
        ),
      ].sort(),
    [versions],
  );
  const channels = useMemo(() => {
    const order: ReleaseType[] = ["release", "beta", "alpha"];
    const present = new Set(versions.map((v) => v.version_type ?? "release"));
    return order.filter((c) => present.has(c));
  }, [versions]);

  const filtered = versions.filter((v) => {
    const mV = selVersions.length === 0 || v.game_versions.some((g) => selVersions.includes(g));
    const mL =
      selLoaders.length === 0 ||
      v.loaders.some((l) => selLoaders.includes(l.charAt(0).toUpperCase() + l.slice(1)));
    const mC = selChannels.length === 0 || selChannels.includes(v.version_type ?? "release");
    return mV && mL && mC;
  });

  if (loading) {
    return (
      <p className="pixel-label py-10 text-center text-muted-foreground" style={{ fontSize: 9 }}>
        {t("project.modal.loadingVersions")}
        <span className="anim-blink">_</span>
      </p>
    );
  }
  if (error) {
    return (
      <p className="pixel-label py-10 text-center text-muted-foreground" style={{ fontSize: 9 }}>
        {t("project.modal.versionsError")}
      </p>
    );
  }
  if (versions.length === 0) {
    return (
      <p className="body-text py-10 text-center text-muted-foreground">
        {t("project.modal.noVersionsYet")}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="pixel-inset flex flex-wrap items-center gap-1.5 p-2.5 sm:gap-2 sm:p-3">
        <span className="pixel-label mr-1 text-muted-foreground/60" style={{ fontSize: 7 }}>
          {t("project.modal.filter")}
        </span>
        <DropdownFilter
          label="Loader"
          options={loaders}
          selected={selLoaders}
          onChange={setSelLoaders}
          icons={LOADER_ICONS}
        />
        <DropdownFilter
          label="Version"
          options={gameVersions}
          selected={selVersions}
          onChange={setSelVersions}
        />
        <DropdownFilter
          label="Channel"
          options={channels}
          selected={selChannels}
          onChange={setSelChannels}
        />
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <p className="body-text py-6 text-center text-muted-foreground">
            {t("project.modal.noVersionsMatch")}
          </p>
        ) : (
          filtered.map((v) => {
            const primaryFile = v.files.find((f) => f.primary) ?? v.files[0];
            const loaderDisplay = v.loaders
              .map((l) => l.charAt(0).toUpperCase() + l.slice(1))
              .join(", ");
            return (
              <div
                key={v.id}
                className="pixel-inset flex items-center gap-2.5 p-2.5 sm:gap-3 sm:p-3"
              >
                <ReleaseDot type={v.version_type ?? "release"} />
                <div className="min-w-0 flex-1">
                  <p className="pixel-label text-foreground" style={{ fontSize: 9 }}>
                    {v.name} <span className="text-muted-foreground/60">v{v.version_number}</span>
                  </p>
                  <div
                    className="mt-1 flex flex-wrap gap-1 text-muted-foreground"
                    style={{ fontSize: 9 }}
                  >
                    <span>{v.game_versions.slice(0, 3).join(", ")}</span>
                    <span>·</span>
                    <span>{loaderDisplay}</span>
                    <span>·</span>
                    <span>{timeAgoShort(v.date_published)}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <PixelDownload size={9} /> {formatDownloads(v.downloads)}
                    </span>
                  </div>
                </div>
                {primaryFile && (
                  <a
                    href={primaryFile.url}
                    download={primaryFile.filename}
                    onClick={(e) => e.stopPropagation()}
                    title={`Download ${primaryFile.filename}`}
                    className="grid h-9 w-9 shrink-0 place-items-center border-2 border-border bg-background text-secondary hover:bg-secondary hover:text-secondary-foreground"
                  >
                    <PixelDownload size={15} />
                  </a>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ── Main Modal ────────────────────────────────────────────────────────
export default function ModProjectModal({ project, onClose }: ModProjectModalProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "download">("description");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (project) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      window.addEventListener("keydown", handleEscape);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      setActiveTab("description");
    } else {
      setIsVisible(false);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  if (!project) return null;

  const tagline = project.modDescription || project.description;
  const hasMarkdown = !!project.markdownFile;
  const status: ModStatus = project.status ?? "public";

  const modrinthSlug = project.link.includes("modrinth.com")
    ? project.link.split("/mod/")[1]?.replace(/\/$/, "")
    : null;
  const hasStaticDownloads = !!project.staticDownloads && project.staticDownloads.length > 0;
  const hasDownloadTab = !!modrinthSlug || hasStaticDownloads;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mod-modal-title"
    >
      <div
        className="absolute inset-0 bg-background/90"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={handleClose}
      />

      <div
        className="pixel-card relative flex w-full max-w-4xl flex-col overflow-hidden"
        style={{
          maxHeight: "min(94vh, 860px)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
          transition:
            "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <button
          onClick={handleClose}
          aria-label={t("project.modal.close")}
          className="absolute top-3 right-3 z-20 grid h-8 w-8 place-items-center border-4 border-border bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground sm:top-4 sm:right-4 sm:h-9 sm:w-9"
        >
          <PixelClose size={15} />
        </button>

        {/* Fixed header */}
        <div className="shrink-0 border-b-4 border-border bg-muted/40 p-3.5 sm:p-4 md:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="pixel-inset h-12 w-12 shrink-0 overflow-hidden sm:h-14 sm:w-14 md:h-16 md:w-16">
              {project.modIcon ? (
                <img
                  src={project.modIcon}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center">
                  <PixelPackage size={24} className="text-muted-foreground/40" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 pr-8 sm:pr-10">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3
                  id="mod-modal-title"
                  className="pixel-label text-foreground"
                  style={{ fontSize: "clamp(12px, 3.4vw, 14px)" }}
                >
                  {project.title}
                </h3>
                <span className="pixel-tag" style={{ fontSize: 7 }}>
                  {STATUS_LABEL[status]}
                </span>
              </div>

              <p className="body-text mb-3 text-muted-foreground">{tagline}</p>

              <div
                className="mb-3 flex flex-wrap items-center gap-3 text-muted-foreground sm:gap-4"
                style={{ fontSize: 10 }}
              >
                {project.downloads !== undefined && (
                  <span
                    className="pixel-label inline-flex items-center gap-1.5"
                    style={{ fontSize: 8 }}
                  >
                    <PixelDownload size={12} /> {formatDownloads(project.downloads)}{" "}
                    {t("project.modal.downloads")}
                  </span>
                )}
                {project.likes !== undefined && (
                  <span
                    className="pixel-label inline-flex items-center gap-1.5"
                    style={{ fontSize: 8 }}
                  >
                    <PixelHeart size={12} /> {project.likes} {t("project.modal.followers")}
                  </span>
                )}
                {project.updatedAgo && (
                  <span
                    className="pixel-label inline-flex items-center gap-1.5 text-muted-foreground/70"
                    style={{ fontSize: 8 }}
                  >
                    <PixelClock size={11} />{" "}
                    {t("project.modal.updated", { time: project.updatedAgo })}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.tags?.map((tag) => (
                  <span key={tag} className="pixel-tag" style={{ fontSize: 8 }}>
                    {tag}
                  </span>
                ))}
                {project.loaders?.map((loader) => (
                  <span
                    key={loader}
                    className="pixel-tag pixel-tag-secondary inline-flex items-center gap-1"
                    style={{ fontSize: 8 }}
                  >
                    {LOADER_ICONS[loader] && (
                      <img
                        src={LOADER_ICONS[loader]}
                        alt={loader}
                        className="h-3.5 w-3.5 object-contain"
                      />
                    )}
                    {loader}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3.5 flex flex-wrap gap-2 sm:mt-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn pixel-btn-alt flex-1 sm:flex-none"
            >
              {t("project.modal.viewOn", {
                site: getSiteName(project.link, t("project.modal.visitWebsite")),
              })}{" "}
              <PixelExternal size={15} />
            </a>
            <button onClick={handleClose} className="pixel-btn pixel-btn-ghost">
              {t("project.modal.close")}
            </button>
          </div>

          <div className="mt-3.5 flex gap-2 sm:mt-4">
            <button
              type="button"
              onClick={() => {
                setActiveTab("description");
                if (scrollRef.current) scrollRef.current.scrollTop = 0;
              }}
              className={`pixel-tag inline-flex items-center gap-1.5 ${activeTab === "description" ? "pixel-tag-primary" : ""}`}
              style={{ cursor: "pointer" }}
            >
              <PixelFileText size={12} /> {t("project.modal.description")}
            </button>
            {hasDownloadTab && (
              <button
                type="button"
                onClick={() => {
                  setActiveTab("download");
                  if (scrollRef.current) scrollRef.current.scrollTop = 0;
                }}
                className={`pixel-tag inline-flex items-center gap-1.5 ${activeTab === "download" ? "pixel-tag-primary" : ""}`}
                style={{ cursor: "pointer" }}
              >
                <PixelDownload size={12} /> {t("project.modal.download")}
              </button>
            )}
          </div>
        </div>

        {/* Scrollable body */}
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-3.5 sm:p-4 md:p-6">
            {activeTab === "description" ? (
              <div className="anim-in">
                {hasMarkdown ? (
                  <>
                    <div className="mb-4 flex items-center gap-2">
                      <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                        {t("project.modal.description")}
                      </span>
                      <div className="h-1 flex-1 bg-border/40" />
                    </div>
                    <MarkdownRenderer content={project.markdownFile!} />
                  </>
                ) : (
                  <p className="body-text text-muted-foreground">
                    {project.fullDescription || project.description}
                  </p>
                )}

                {project.versions && project.versions.length > 0 && (
                  <div className="mt-6 border-t-4 border-border pt-5">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                        {t("project.modal.supportedVersions")}
                      </span>
                      <div className="h-1 flex-1 bg-border/40" />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.versions.map((v) => (
                        <span key={v} className="pixel-tag">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 border-t-4 border-border pt-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                      {t("project.modal.techStack")}
                    </span>
                    <div className="h-1 flex-1 bg-border/40" />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.lang.split(" / ").map((tech) => {
                      const icon = TECH_ICONS[tech];
                      return (
                        <span key={tech} className="pixel-tag inline-flex items-center gap-1.5">
                          {icon && (
                            <img src={icon} alt={tech} className="h-3.5 w-3.5 object-contain" />
                          )}
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="anim-in">
                <div className="mb-4 flex items-center gap-2">
                  <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                    {t("project.modal.allVersions")}
                  </span>
                  <div className="h-1 flex-1 bg-border/40" />
                </div>
                {modrinthSlug ? (
                  <VersionsTab slug={modrinthSlug} />
                ) : hasStaticDownloads ? (
                  <StaticVersionsTab downloads={project.staticDownloads!} />
                ) : (
                  <p className="body-text py-10 text-center text-muted-foreground">
                    {t("project.modal.noFilesYet")}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
