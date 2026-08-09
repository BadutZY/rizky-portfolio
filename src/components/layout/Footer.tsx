import { Link } from "@tanstack/react-router";
import { PixelHeart } from "@/components/common/PixelIcon";
import SocialIcon from "@/components/common/SocialIcon";
import { socialLinks } from "@/data/contact";
import { useLanguage } from "@/lib/i18n";

const links = [
  { to: "/", label: "nav.home" },
  { to: "/about", label: "nav.about" },
  { to: "/skill", label: "nav.skill" },
  { to: "/project", label: "nav.project" },
  { to: "/equipment", label: "nav.equipment" },
  { to: "/wife", label: "nav.wife" },
  { to: "/contact", label: "nav.contact" },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="mt-20 border-t-4 border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="pixel-label text-foreground" style={{ fontSize: 15 }}>
              Rizky (BadutZY)
            </h2>
            <p className="body-text mt-3 max-w-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>

          <nav className="flex flex-wrap gap-2">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="pixel-tag">
                {t(l.label)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pixel-rule my-8" />

        <div className="mb-8 flex flex-wrap gap-2">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-tag pixel-tag-accent inline-flex items-center gap-1.5"
            >
              <SocialIcon label={s.label} size={20} />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="pixel-label text-muted-foreground" style={{ fontSize: 9 }}>
            {t("footer.copyright", { year: currentYear })}
          </p>
          <p
            className="pixel-label flex items-center gap-2 text-muted-foreground"
            style={{ fontSize: 9 }}
          >
            {t("footer.builtWith")} <PixelHeart size={14} className="text-destructive" />{" "}
            {t("footer.forKimmy")}
          </p>
        </div>
      </div>
    </footer>
  );
}
