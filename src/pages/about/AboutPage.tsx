import { rizkyImages } from "@/data/image";
import { PageHeader, PageShell, SectionTitle } from "@/components/layout/PageShell";
import { profile } from "@/data/about";
import PlaylistPlayers from "./components/PlaylistPlayers";
import { useLanguage } from "@/lib/i18n";

const FACT_KEYS = ["name", "age", "education", "major", "location", "birthday"] as const;

export default function AboutPage() {
  const { t } = useLanguage();

  const facts = [
    { k: "name", v: profile.name },
    { k: "age", v: t("profile.age") },
    { k: "education", v: t("profile.education") },
    { k: "major", v: t("profile.major") },
    { k: "location", v: profile.location },
    { k: "birthday", v: t("profile.birthday") },
  ] satisfies { k: (typeof FACT_KEYS)[number]; v: string }[];

  return (
    <PageShell>
      <PageHeader
        kicker={t("about.kicker")}
        title={t("about.title")}
        description={t("about.description")}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-11 sm:px-6 sm:py-20">
        <div className="grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div className="pixel-panel anim-pop p-3 md:sticky md:top-24">
            <img
              src={rizkyImages.avatar}
              alt={t("about.photoAlt", { name: profile.name })}
              loading="lazy"
              className="block w-full object-cover"
              style={{ aspectRatio: "1 / 1" }}
            />
          </div>

          <div>
            <h2 className="pixel-label text-foreground" style={{ fontSize: 13 }}>
              {t("about.greeting", { alias: profile.alias, name: profile.name })}
            </h2>
            <p className="body-text mt-5 text-muted-foreground">{t("profile.aboutText")}</p>
            <p className="body-text mt-4 text-muted-foreground">
              {t("about.paragraphEducation", { major: t("profile.major") })}
            </p>
            <p className="body-text mt-4 text-muted-foreground">{t("about.paragraphHobby")}</p>

            <div className="pixel-inset anim-in mt-6 p-5">
              <p className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                {t("about.quoteLabel")}
              </p>
              <p className="body-text mt-2 text-foreground">&ldquo;{profile.quote}&rdquo;</p>
            </div>

            <dl className="mt-9 grid gap-4 sm:grid-cols-2">
              {facts.map((f, i) => (
                <div
                  key={f.k}
                  className="pixel-inset anim-in p-4"
                  style={{ ["--delay" as string]: `${i * 60}ms` }}
                >
                  <dt className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                    {t(`about.facts.${f.k}`)}
                  </dt>
                  <dd className="body-text mt-2 text-foreground">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-t-4 border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionTitle
            index="02"
            title={t("about.playlists.title")}
            description={t("about.playlists.description")}
          />
          <PlaylistPlayers />
        </div>
      </section>
    </PageShell>
  );
}
