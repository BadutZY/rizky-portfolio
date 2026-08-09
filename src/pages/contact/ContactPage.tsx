import { PageHeader, PageShell, SectionTitle } from "@/components/layout/PageShell";
import { PixelExternal } from "@/components/common/PixelIcon";
import { contactChannels, socialLinks, youtube } from "@/data/contact";
import YouTubeChannelCard from "./components/YouTubeChannelCard";
import SocialIcon from "@/components/common/SocialIcon";
import { useLanguage } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <PageShell>
      <PageHeader
        kicker={t("contact.kicker")}
        title={t("contact.title")}
        description={t("contact.description")}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-11 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionTitle index="01" title={t("contact.sections.youtubeChannel")} />
          <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
            <YouTubeChannelCard handle={youtube.channelHandle} channelUrl={youtube.channelUrl} />
            <div className="grid gap-6 sm:grid-cols-3">
              {contactChannels.map((c, i) => (
                <a
                  key={c.key}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-card anim-in flex items-center justify-between gap-4 p-6"
                  style={{ ["--delay" as string]: `${i * 70}ms` }}
                >
                  <span className="pixel-label text-foreground" style={{ fontSize: 11 }}>
                    {t(`contact.channels.${c.key}`)}
                  </span>
                  <PixelExternal size={18} className="text-secondary" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-4 border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionTitle index="02" title={t("contact.sections.socialMedia")} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {socialLinks.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-inset anim-in flex items-center gap-4 p-5"
                style={{ ["--delay" as string]: `${i * 60}ms` }}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-border bg-background text-foreground">
                  <SocialIcon label={s.label} size={18} />
                </span>
                <span className="body-text flex-1 text-foreground">{s.label}</span>
                <PixelExternal size={16} className="shrink-0 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
