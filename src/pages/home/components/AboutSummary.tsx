import { Link } from "react-router-dom";
import { SectionTitle } from "@/components/layout/PageShell";
import { PixelArrowRight, PixelUser } from "@/components/common/PixelIcon";
import { useLanguage } from "@/lib/i18n";

const VALUE_KEYS = ["keepLearning", "randomQuotes", "shipIt"] as const;

export function AboutSummary() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionTitle index="01" title="ABOUT" description={t("home.about.description")} />

      <div className="grid gap-6 md:grid-cols-3">
        {VALUE_KEYS.map((key, i) => (
          <div
            key={key}
            className="pixel-card anim-in p-7"
            style={{ ["--delay" as string]: `${i * 80}ms` }}
          >
            <PixelUser size={26} className="text-secondary" />
            <h3 className="pixel-label mt-5 text-foreground" style={{ fontSize: 11 }}>
              {t(`home.about.values.${key}.title`)}
            </h3>
            <p className="body-text mt-4 text-muted-foreground">
              {t(`home.about.values.${key}.desc`)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link to="/about" className="pixel-btn pixel-btn-ghost">
          {t("home.about.viewMore")} <PixelArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}