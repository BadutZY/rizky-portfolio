import { Link } from "react-router-dom";
import { rizkyImages } from "@/data/image";
import { profile } from "@/data/home";
import { PixelArrowRight } from "@/components/common/PixelIcon";
import { useLanguage } from "@/lib/i18n";

const STAT_KEYS = ["projects", "modsReleased", "gamesShipped", "techStack"] as const;

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="crt-lines relative overflow-hidden border-b-4 border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-11 sm:px-6 sm:py-24">
        <div className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="pixel-tag pixel-tag-secondary anim-pop inline-block">
              {t("profile.status")}
            </span>

            <h1
              className="pixel-title anim-in mt-6 text-foreground"
              style={{ fontSize: "clamp(22px, 7vw, 46px)", ["--delay" as string]: "60ms" }}
            >
              Rizky ({profile.alias})
            </h1>

            <p
              className="pixel-label anim-in mt-5 text-secondary"
              style={{ fontSize: 11, ["--delay" as string]: "120ms" }}
            >
              {profile.name}, {profile.role}
              <span className="anim-blink ml-1">_</span>
            </p>

            <p
              className="anim-in body-text mt-6 max-w-xl text-muted-foreground"
              style={{ ["--delay" as string]: "180ms" }}
            >
              {t("profile.tagline")}
            </p>

            <div
              className="anim-in mt-9 flex flex-wrap gap-4"
              style={{ ["--delay" as string]: "240ms" }}
            >
              <Link to="/project" className="pixel-btn">
                {t("home.hero.viewProject")} <PixelArrowRight size={16} />
              </Link>
              <Link to="/about" className="pixel-btn pixel-btn-ghost">
                {t("home.hero.aboutMe")}
              </Link>
            </div>
          </div>

          <div
            className="anim-pop mx-auto w-full max-w-[320px]"
            style={{ ["--delay" as string]: "160ms" }}
          >
            <div className="pixel-panel p-3">
              <img
                src={rizkyImages.avatar}
                alt={t("home.hero.photoAlt", { name: profile.name })}
                className="block w-full object-cover"
                style={{ aspectRatio: "1 / 1" }}
              />
              <div className="mt-3 flex items-center justify-between bg-muted px-3 py-2">
                <span className="pixel-label text-foreground" style={{ fontSize: 9 }}>
                  {t("home.hero.level")}
                </span>
                <span className="pixel-label text-muted-foreground" style={{ fontSize: 9 }}>
                  {profile.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {profile.stats.map((s, i) => (
            <div
              key={s.label}
              className="pixel-card anim-in p-5 text-center"
              style={{ ["--delay" as string]: `${i * 70}ms` }}
            >
              <p
                className="pixel-title text-secondary"
                style={{ fontSize: "clamp(16px, 5vw, 22px)" }}
              >
                {s.value}
              </p>
              <p className="pixel-label mt-3 text-muted-foreground" style={{ fontSize: 8 }}>
                {t(`profile.stats.${STAT_KEYS[i]}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}