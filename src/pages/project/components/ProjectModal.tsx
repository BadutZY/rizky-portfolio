import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PixelClose, PixelArrowRight, PixelCode, PixelFork } from "@/components/common/PixelIcon";
import { useLanguage } from "@/lib/i18n";

export interface SimpleProject {
  id: number;
  title: string;
  category: string;
  description: string;
  link: string;
  fullDescription?: string;
  image?: string;
  isContribution?: boolean;
  role?: string;
  lang?: string;
}

interface ProjectModalProps {
  project: SimpleProject | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
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

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-background/85"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={handleClose}
      />

      <div
        className="pixel-card relative flex w-full max-w-3xl flex-col overflow-hidden"
        style={{
          maxHeight: "min(91vh, 860px)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
          transition:
            "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <button
          onClick={handleClose}
          aria-label={t("project.modal.close")}
          className="absolute top-4 right-4 z-20 grid h-9 w-9 place-items-center border-4 border-border bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground"
        >
          <PixelClose size={16} />
        </button>

        {project.image && (
          <div
            className="relative shrink-0 overflow-hidden border-b-4 border-border bg-muted"
            style={{ aspectRatio: "16/8" }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="pixel-tag pixel-tag-secondary inline-flex items-center gap-1.5">
                <PixelCode size={12} /> {project.category}
              </span>
              {project.isContribution && (
                <span className="pixel-tag inline-flex items-center gap-1.5">
                  <PixelFork size={12} /> {project.role ?? "Contributor"}
                </span>
              )}
            </div>

            <h3
              id="modal-title"
              className="pixel-label mb-4 text-foreground"
              style={{ fontSize: 16 }}
            >
              {project.title}
            </h3>

            <p className="body-text mb-6 text-muted-foreground">
              {project.fullDescription || project.description}
            </p>

            {project.lang && (
              <div className="mb-8 flex flex-wrap gap-2">
                {project.lang.split(" / ").map((tech) => (
                  <span key={tech} className="pixel-tag">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn pixel-btn-alt"
              >
                {t("project.modal.viewProject")} <PixelArrowRight size={16} />
              </a>
              <button onClick={handleClose} className="pixel-btn pixel-btn-ghost ml-auto">
                {t("project.modal.close")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
