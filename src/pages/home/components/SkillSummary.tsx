import { Link } from "react-router-dom";
import { SectionTitle } from "@/components/layout/PageShell";
import { PixelArrowRight } from "@/components/common/PixelIcon";
import { skillCategories } from "@/data/skills";
import { useLanguage } from "@/lib/i18n";

export function SkillSummary() {
  const { t } = useLanguage();

  return (
    <section className="border-y-4 border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionTitle index="02" title="SKILL" description={t("home.skill.description")} />

        <div className="grid gap-6 sm:grid-cols-3">
          {skillCategories.map((s, i) => (
            <div
              key={s.key}
              className="pixel-card anim-in p-6"
              style={{ ["--delay" as string]: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="pixel-label text-foreground" style={{ fontSize: 11 }}>
                  {t(`skill.categories.${s.key}.title`)}
                </span>
                <span className="pixel-label text-secondary" style={{ fontSize: 10 }}>
                  {s.progress}%
                </span>
              </div>
              <div className="pixel-meter mt-4">
                <i style={{ width: `${s.progress}%`, animationDelay: `${i * 60}ms` }} />
              </div>
              <p className="body-text mt-4 text-muted-foreground">
                {t(`skill.categories.${s.key}.description`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link to="/skill" className="pixel-btn pixel-btn-alt">
            {t("home.skill.viewAll")} <PixelArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}