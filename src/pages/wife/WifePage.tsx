import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/layout/PageShell";
import { PixelArrowRight, PixelHeart } from "@/components/common/PixelIcon";
import { wife } from "@/data/wife";
import { platformLogos, wifePhotos } from "@/data/image";
import { YOUTUBE_CONFIG } from "@/config/youtubeConfig";
import KimmyLiveStatus from "./components/KimmyLiveStatus";
import LatestReplayCard from "./components/LatestReplayCard";
import SocialIcon from "@/components/common/SocialIcon";
import { PhotoLightbox } from "./components/PhotoLightbox";
import { useLanguage } from "@/lib/i18n";

const BIO_KEY_MAP: Record<string, string> = {
  Name: "name",
  Birthday: "birthday",
  Hometown: "hometown",
  "Blood Type": "bloodType",
  Zodiac: "zodiac",
  Height: "height",
  Status: "status",
};

export default function WifePage() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <PageShell>
      <PageHeader
        kicker={t("wife.kicker")}
        title={t("wife.title")}
        description={t("wife.description", { name: wife.name, alias: wife.alias })}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-11 sm:px-6 sm:py-20">
        <div className="grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div className="pixel-panel anim-pop p-3 md:sticky md:top-24">
            <img
              src={wifePhotos[0]}
              alt={wife.name}
              loading="lazy"
              className="block w-full object-cover"
              style={{ aspectRatio: "3 / 4" }}
            />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <PixelHeart size={24} className="text-destructive" />
              <h2 className="pixel-label text-foreground" style={{ fontSize: 13 }}>
                {wife.alias}
              </h2>
            </div>
            <p className="body-text mt-5 text-muted-foreground">
              {t("wife.paragraph", { name: wife.name, alias: wife.alias, who: "BadutZY" })}
            </p>

            <dl className="mt-9 grid gap-4 sm:grid-cols-2">
              {wife.bio.map((f, i) => (
                <div
                  key={f.label}
                  className="pixel-inset anim-in p-4"
                  style={{ ["--delay" as string]: `${i * 60}ms` }}
                >
                  <dt className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                    {t(`wife.bio.${BIO_KEY_MAP[f.label] ?? f.label}`)}
                  </dt>
                  <dd className="body-text mt-2 text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-2">
              {wife.socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-tag pixel-tag-accent inline-flex items-center gap-2"
                >
                  <SocialIcon label={s.label} size={25} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-4 border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-10">
            <span className="pixel-tag pixel-tag-accent">{t("wife.liveSection.tag")}</span>
            <h2
              className="pixel-title mt-5 text-foreground"
              style={{ fontSize: "clamp(16px, 4.2vw, 26px)" }}
            >
              {t("wife.liveSection.title")}
            </h2>
            <p className="body-text mt-3 max-w-xl text-muted-foreground">
              {t("wife.liveSection.description")}
            </p>
          </div>
          <KimmyLiveStatus idnLogo={platformLogos.idn} showroomLogo={platformLogos.showroom} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-11 sm:px-6 sm:py-20">
        <div className="grid items-start ">
          <div className="mb-10">
            <span className="pixel-tag pixel-tag-primary">{t("wife.replaySection.tag")}</span>
            <h2
              className="pixel-title mt-5 text-foreground"
              style={{ fontSize: "clamp(16px, 4.2vw, 26px)" }}
            >
              {t("wife.replaySection.title")}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <LatestReplayCard playlistId={YOUTUBE_CONFIG.idnPlaylistId} label="IDN Live" />
            <LatestReplayCard playlistId={YOUTUBE_CONFIG.showroomPlaylistId} label="Showroom" />
          </div>
        </div>
      </section>

      <section className="border-y-4 border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-10">
            <span className="pixel-tag pixel-tag-primary">{t("wife.gallerySection.tag")}</span>
            <h2
              className="pixel-title mt-5 text-foreground"
              style={{ fontSize: "clamp(16px, 4.2vw, 26px)" }}
            >
              {t("wife.gallerySection.title")}
            </h2>
          </div>

          <div className="columns-2 gap-1 sm:columns-3 md:columns-4">
            {wifePhotos.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative mb-1 block w-full overflow-hidden bg-muted p-0"
                style={{ cursor: "pointer", breakInside: "avoid" }}
              >
                <img
                  src={src}
                  alt={t("wife.gallerySection.photoAlt", { alias: wife.alias, n: i + 1 })}
                  loading="lazy"
                  className="block h-auto w-full transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {openIndex !== null && (
        <PhotoLightbox
          photos={wifePhotos}
          altPrefix={t("wife.photoAlt", { name: wife.alias })}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}

      <section className="mx-auto w-full max-w-6xl px-4 py-11 sm:px-6 sm:py-20">
        <div className="flex flex-wrap gap-4">
          <Link to="/about" className="pixel-btn pixel-btn-ghost">
            {t("wife.aboutMe")}
          </Link>
          <Link to="/contact" className="pixel-btn">
            {t("wife.contactMe")} <PixelArrowRight size={16} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
