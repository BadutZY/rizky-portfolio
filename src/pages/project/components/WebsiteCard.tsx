import { useState } from "react";
import { PixelFork } from "@/components/common/PixelIcon";
import type { WebsiteProject } from "@/data/project";
import { useLanguage } from "@/lib/i18n";

export function WebsiteCard({
  project,
  index,
  onClick,
}: {
  project: WebsiteProject;
  index: number;
  onClick: () => void;
}) {
  const { t } = useLanguage();
  const [bloom, setBloom] = useState(false);
  return (
    <article
      onClick={() => {
        onClick();
        setBloom(false);
      }}
      onMouseEnter={() => setBloom(true)}
      onMouseLeave={() => setBloom(false)}
      className="pixel-card anim-in group relative flex aspect-video cursor-pointer flex-col overflow-hidden"
      style={{ ["--delay" as string]: `${index * 50}ms` }}
    >
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          filter: bloom ? "none" : "grayscale(85%)",
          transition: "filter 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {project.isContribution && (
        <span
          className="pixel-tag pixel-tag-accent absolute top-2 left-2 z-10 inline-flex items-center gap-1"
          style={{ fontSize: 7 }}
        >
          <PixelFork size={10} /> {t("project.modal.contribution")}
        </span>
      )}

      <div
        className="absolute inset-0 flex flex-col justify-between bg-background/80 p-3 text-center"
        style={{ opacity: bloom ? 0 : 1, transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div />
        <div className="flex flex-col items-center gap-1 px-1">
          <h4 className="pixel-label text-foreground" style={{ fontSize: 9 }}>
            {project.title}
          </h4>
          <p
            className="body-text line-clamp-2 text-muted-foreground"
            style={{ fontSize: "0.85rem" }}
          >
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-1.5">
          {project.lang.split(" / ").map((tech) => (
            <span key={tech} className="pixel-tag" style={{ fontSize: 7 }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 bg-background/85 p-3"
        style={{ opacity: bloom ? 1 : 0, transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <h4 className="pixel-label text-foreground" style={{ fontSize: 9 }}>
          {project.title}
        </h4>
        <p className="pixel-label mt-1 text-muted-foreground" style={{ fontSize: 7 }}>
          {project.isContribution
            ? (project.role ?? t("project.modal.contributor"))
            : t(`project.categories.${project.category}`)}
        </p>
      </div>
    </article>
  );
}
