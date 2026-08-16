import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Globe } from "lucide-react";
import {
  PixelClose,
  PixelDownload,
  PixelMonitor,
  PixelGamepad,
  PixelCode,
  PixelExternal,
  PixelChevronRight,
  PixelZap,
  PixelLayers,
  PixelCpu,
  PixelUsers,
  PixelFork,
  PixelBuilding,
  PixelPackage,
} from "@/components/common/PixelIcon";
import MarkdownRenderer from "@/pages/project/components/MarkdownRenderer";
import type { GameProjectData, SocialLink, TeamMemberData } from "@/data/project";
import { useLanguage } from "@/lib/i18n";

interface GameProjectModalProps {
  project: GameProjectData | null;
  onClose: () => void;
}

const TECH_LOGOS: Record<string, string> = {
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  Unity: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Godot: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg",
};

// ── Small brand social icons (kept as accurate vector logos) ──────────
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);
const GitHubMarkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const SOCIAL_ICON: Record<SocialLink["platform"], React.ReactNode> = {
  youtube: <YouTubeIcon />,
  tiktok: <YouTubeIcon />,
  instagram: <InstagramIcon />,
  github: <GitHubMarkIcon />,
  website: <Globe className="h-3.5 w-3.5" strokeWidth={2} />,
};

const SocialPill = ({ social }: { social: SocialLink }) => (
  <a
    href={social.url}
    target="_blank"
    rel="noopener noreferrer"
    className="pixel-tag inline-flex items-center gap-1.5"
    style={{ fontSize: 8 }}
    onClick={(e) => e.stopPropagation()}
  >
    {SOCIAL_ICON[social.platform]}
    {social.label ?? social.platform}
  </a>
);

const MemberCard = ({ member }: { member: TeamMemberData }) => {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="pixel-inset flex flex-col gap-3 p-4">
      <div className="flex items-center gap-3">
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            className="h-10 w-10 shrink-0 border-2 border-border object-cover"
          />
        ) : (
          <div
            className="grid h-10 w-10 shrink-0 place-items-center border-2 border-border bg-muted pixel-label text-secondary"
            style={{ fontSize: 9 }}
          >
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="pixel-label truncate text-foreground" style={{ fontSize: 9 }}>
            {member.name}
          </p>
          {member.role && (
            <p
              className="pixel-label mt-0.5 truncate text-muted-foreground/70"
              style={{ fontSize: 7 }}
            >
              {member.role}
            </p>
          )}
        </div>
      </div>
      {(member.socials?.length ?? 0) > 0 && (
        <div className="flex flex-wrap gap-1.5 border-t-2 border-border/40 pt-2.5">
          {member.socials!.map((s, i) => (
            <SocialPill key={`${s.platform}-${i}`} social={s} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function GameProjectModal({ project, onClose }: GameProjectModalProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
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

  const team = project.developerTeam;
  const hasMembers = (team?.members?.length ?? 0) > 0;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-modal-title"
    >
      <div
        className="absolute inset-0 bg-background/92"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={handleClose}
      />

      <div
        className="pixel-card relative flex w-full max-w-3xl flex-col overflow-hidden"
        style={{
          maxHeight: "min(94vh, 940px)",
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

        {/* Hero */}
        <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden border-b-4 border-border sm:aspect-16/6">
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
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

          <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-1.5 sm:top-4 sm:left-5 sm:gap-2">
            <span className="pixel-tag pixel-tag-secondary inline-flex items-center gap-1.5">
              <PixelGamepad size={13} /> {t("project.categories.Game")}
            </span>
            {project.isContribution && (
              <span className="pixel-tag pixel-tag-accent inline-flex items-center gap-1.5">
                <PixelFork size={12} /> {t("project.modal.contribution")}
              </span>
            )}
          </div>

          <div className="absolute right-12 bottom-3 left-3 z-10 flex flex-wrap gap-1.5 sm:right-16 sm:bottom-4 sm:left-5">
            {project.genre?.map((g) => (
              <span key={g} className="pixel-tag pixel-tag-primary">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Scrollable body */}
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-5 p-4 sm:space-y-6 sm:p-5 md:p-6">
            <div>
              <h3
                id="game-modal-title"
                className="pixel-label mb-2 text-foreground"
                style={{ fontSize: "clamp(13px, 3.6vw, 16px)" }}
              >
                {project.title}
              </h3>
              <p className="body-text text-muted-foreground">{project.description}</p>
            </div>

            {/* Developer team */}
            {team && (
              <div className="pixel-inset flex items-center gap-3 p-3.5 sm:gap-4 sm:p-4 md:p-5">
                {team.logo ? (
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="h-12 w-12 shrink-0 border-2 border-border object-cover sm:h-14 sm:w-14 md:h-16 md:w-16"
                  />
                ) : (
                  <div className="grid h-12 w-12 shrink-0 place-items-center border-2 border-border bg-muted sm:h-14 sm:w-14 md:h-16 md:w-16">
                    <PixelBuilding size={22} className="text-muted-foreground/40" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="pixel-label text-secondary" style={{ fontSize: 7 }}>
                    {t("project.modal.developerTeam")}
                  </p>
                  <p className="pixel-label mt-1 truncate text-foreground" style={{ fontSize: 12 }}>
                    {team.name}
                  </p>
                  {project.role && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <PixelFork size={11} className="text-secondary/70" />
                      <span
                        className="pixel-label text-muted-foreground/70"
                        style={{ fontSize: 8 }}
                      >
                        {t("project.modal.role")}:{" "}
                        <span className="text-secondary">{project.role}</span>
                      </span>
                    </div>
                  )}
                  {hasMembers && (
                    <div className="mt-1 flex items-center gap-1.5">
                      <PixelUsers size={11} className="text-muted-foreground/40" />
                      <span
                        className="pixel-label text-muted-foreground/50"
                        style={{ fontSize: 8 }}
                      >
                        {team.members!.length} {t("project.modal.teamMembers")}
                      </span>
                    </div>
                  )}
                </div>
                {team.website && (
                  <a
                    href={team.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-btn pixel-btn-ghost shrink-0"
                    style={{ padding: "8px 12px" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PixelExternal size={14} />
                    <span className="hidden sm:inline">{t("project.modal.teamSite")}</span>
                  </a>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn pixel-btn-alt flex-1 sm:flex-none"
              >
                {t("project.modal.visitWebsite")} <PixelExternal size={15} />
              </a>
              <button onClick={handleClose} className="pixel-btn pixel-btn-ghost sm:ml-auto">
                {t("project.modal.close")}
              </button>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-3">
              {project.engine && (
                <div className="pixel-inset flex flex-col gap-1.5 p-3.5">
                  <span className="pixel-label text-muted-foreground/60" style={{ fontSize: 7 }}>
                    {t("project.modal.engine")}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <PixelZap size={13} className="text-secondary" />
                    <span className="pixel-label text-foreground" style={{ fontSize: 9 }}>
                      {project.engine}
                    </span>
                  </div>
                </div>
              )}
              {project.version && (
                <div className="pixel-inset flex flex-col gap-1.5 p-3.5">
                  <span className="pixel-label text-muted-foreground/60" style={{ fontSize: 7 }}>
                    {t("project.modal.version")}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <PixelLayers size={13} className="text-secondary" />
                    <span className="pixel-label text-foreground" style={{ fontSize: 9 }}>
                      v{project.version}
                    </span>
                  </div>
                </div>
              )}
              {project.platform && project.platform.length > 0 && (
                <div className="pixel-inset flex flex-col gap-1.5 p-3.5">
                  <span className="pixel-label text-muted-foreground/60" style={{ fontSize: 7 }}>
                    {t("project.modal.platform")}
                  </span>
                  {project.platform.map((p) => (
                    <div key={p} className="flex items-center gap-1.5">
                      <PixelMonitor size={13} className="text-secondary" />
                      <span className="pixel-label text-foreground" style={{ fontSize: 9 }}>
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {project.fileSize && (
                <div className="pixel-inset flex flex-col gap-1.5 p-3.5">
                  <span className="pixel-label text-muted-foreground/60" style={{ fontSize: 7 }}>
                    {t("project.modal.fileSize")}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <PixelDownload size={13} className="text-secondary" />
                    <span className="pixel-label text-foreground" style={{ fontSize: 9 }}>
                      {project.fileSize}
                    </span>
                  </div>
                </div>
              )}
              {project.lang && (
                <div className="pixel-inset col-span-2 flex flex-col gap-1.5 p-3.5 sm:col-span-1">
                  <span className="pixel-label text-muted-foreground/60" style={{ fontSize: 7 }}>
                    {t("project.modal.language")}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <PixelCode size={13} className="text-secondary" />
                    <span className="pixel-label truncate text-foreground" style={{ fontSize: 9 }}>
                      {project.lang}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* About */}
            {(project.markdownFile || project.fullDescription) && (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                    {t("project.modal.about")}
                  </span>
                  <div className="h-1 flex-1 bg-border/40" />
                </div>
                {project.markdownFile ? (
                  <MarkdownRenderer content={project.markdownFile} />
                ) : (
                  <p className="body-text text-muted-foreground">{project.fullDescription}</p>
                )}
              </div>
            )}

            {/* Min specs */}
            {project.minSpecs && (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                    {t("project.modal.minimumRequirements")}
                  </span>
                  <div className="h-1 flex-1 bg-border/40" />
                </div>
                <div className="pixel-inset space-y-2.5 p-4">
                  {[
                    {
                      label: "OS",
                      value: project.minSpecs.os,
                      icon: <PixelMonitor size={13} className="text-secondary/70" />,
                    },
                    {
                      label: "Processor",
                      value: project.minSpecs.processor,
                      icon: <PixelCpu size={13} className="text-secondary/70" />,
                    },
                    {
                      label: "Memory",
                      value: project.minSpecs.memory,
                      icon: <PixelCpu size={13} className="text-secondary/70" />,
                    },
                    {
                      label: "Graphics",
                      value: project.minSpecs.graphics,
                      icon: <PixelLayers size={13} className="text-secondary/70" />,
                    },
                    {
                      label: "Storage",
                      value: project.minSpecs.storage,
                      icon: <PixelPackage size={13} className="text-secondary/70" />,
                    },
                  ]
                    .filter((s) => s.value)
                    .map((spec) => (
                      <div key={spec.label} className="flex items-center gap-3">
                        <div className="flex w-28 shrink-0 items-center gap-2 text-muted-foreground/60">
                          {spec.icon}
                          <span className="pixel-label" style={{ fontSize: 8 }}>
                            {spec.label}
                          </span>
                        </div>
                        <span className="body-text text-foreground/80">{spec.value}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                    {t("project.modal.features")}
                  </span>
                  <div className="h-1 flex-1 bg-border/40" />
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {project.features.map((feature, i) => (
                    <div key={i} className="pixel-inset flex items-start gap-2.5 p-3">
                      <PixelChevronRight size={13} className="mt-0.5 shrink-0 text-secondary" />
                      <span
                        className="body-text text-muted-foreground"
                        style={{ fontSize: "0.95rem" }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team members */}
            {hasMembers && team?.members && (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <PixelUsers size={13} className="text-secondary/70" />
                  <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                    {t("project.modal.teamMembersLabel")}
                  </span>
                  <div className="h-1 flex-1 bg-border/40" />
                  <span className="pixel-tag" style={{ fontSize: 7 }}>
                    {team.members.length} {t("project.modal.membersSuffix")}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {team.members.map((member, i) => (
                    <MemberCard key={i} member={member} />
                  ))}
                </div>
              </div>
            )}

            {/* Tech stack */}
            <div className="border-t-4 border-border pt-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                  {t("project.modal.techStack")}
                </span>
                <div className="h-1 flex-1 bg-border/40" />
              </div>
              <div className="flex flex-wrap gap-2">
                {project.lang.split(" / ").map((tech) => {
                  const logo = TECH_LOGOS[tech];
                  return (
                    <span key={tech} className="pixel-tag inline-flex items-center gap-1.5">
                      {logo && (
                        <img
                          src={logo}
                          alt={tech}
                          className="h-4 w-4 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      )}
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}