import {
  formatSubscribers,
  formatTotalViews,
  formatVideoCount,
  useYouTubeChannelStats,
} from "@/hooks/useYouTubeChannelStats";
import { PixelExternal } from "@/components/common/PixelIcon";
import { useLanguage } from "@/lib/i18n";

export default function YouTubeChannelCard({
  handle,
  channelUrl,
}: {
  handle: string;
  channelUrl: string;
}) {
  const { t } = useLanguage();
  const { stats, loading, error } = useYouTubeChannelStats(handle);

  if (loading) {
    return (
      <div className="pixel-inset p-8 text-center">
        <p className="pixel-label text-muted-foreground" style={{ fontSize: 9 }}>
          {t("contact.youtubeCard.loadingStats")}
          <span className="anim-blink">_</span>
        </p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="pixel-inset flex flex-col items-center gap-4 p-8 text-center">
        <p className="pixel-label text-muted-foreground" style={{ fontSize: 9 }}>
          {error === "no_api_key"
            ? t("contact.youtubeCard.apiKeyMissing")
            : t("contact.youtubeCard.statsUnavailable")}
        </p>
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-btn pixel-btn-ghost"
        >
          {t("contact.youtubeCard.openChannel")} <PixelExternal size={14} />
        </a>
      </div>
    );
  }

  const items = [
    { key: "subscribers", value: formatSubscribers(stats.subscriberCount) },
    { key: "videos", value: formatVideoCount(stats.videoCount) },
    { key: "totalViews", value: formatTotalViews(stats.viewCount) },
  ] as const;

  return (
    <div className="pixel-card overflow-hidden">
      <div className="flex items-center gap-4 border-b-4 border-border p-6">
        {stats.thumbnailUrl && (
          <img
            src={stats.thumbnailUrl}
            alt={stats.title}
            className="h-14 w-14 shrink-0 border-2 border-border object-cover"
          />
        )}
        <div className="min-w-0">
          <h3 className="pixel-label truncate text-foreground" style={{ fontSize: 12 }}>
            {stats.title}
          </h3>
          <p className="pixel-label mt-2 text-muted-foreground" style={{ fontSize: 9 }}>
            {stats.customUrl}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x-4 divide-border border-b-4 border-border">
        {items.map((it) => (
          <div key={it.key} className="p-4 text-center">
            <p className="pixel-title text-secondary" style={{ fontSize: 15 }}>
              {it.value}
            </p>
            <p className="pixel-label mt-2 text-muted-foreground" style={{ fontSize: 7 }}>
              {t(`contact.youtubeCard.${it.key}`)}
            </p>
          </div>
        ))}
      </div>

      <div className="p-4">
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-btn flex w-full items-center justify-center gap-2"
        >
          {t("contact.youtubeCard.subscribe")} <PixelExternal size={14} />
        </a>
      </div>
    </div>
  );
}
