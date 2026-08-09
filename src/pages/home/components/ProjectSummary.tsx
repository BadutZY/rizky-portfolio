import { Link } from "@tanstack/react-router";
import { SectionTitle } from "@/components/layout/PageShell";
import { PixelArrowRight, PixelFolder } from "@/components/common/PixelIcon";
import { featuredProjects } from "@/data/home";
import { useLanguage } from "@/lib/i18n";

export function ProjectSummary() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionTitle index="03" title="PROJECT" description={t("home.project.description")} />

      <div className="grid gap-6 md:grid-cols-3">
        {featuredProjects.map((p, i) => (
          <article
            key={p.slug}
            className="pixel-card anim-in flex flex-col p-7"
            style={{ ["--delay" as string]: `${i * 80}ms` }}
          >
            <div className="flex items-center justify-between gap-3">
              <PixelFolder size={24} className="text-accent" />
              <span className="pixel-label text-muted-foreground" style={{ fontSize: 9 }}>
                {p.year}
              </span>
            </div>
            <h3 className="pixel-label mt-5 text-foreground" style={{ fontSize: 11 }}>
              {p.title}
            </h3>
            <p className="body-text mt-4 flex-1 text-muted-foreground">
              {t(`home.project.items.${p.slug}.summary`)}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.slice(0, 3).map((tech) => (
                <span key={tech} className="pixel-tag">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Link to="/project" className="pixel-btn">
          {t("home.project.viewAll")} <PixelArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
