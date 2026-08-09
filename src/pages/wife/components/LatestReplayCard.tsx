import { useEffect, useState } from "react";
import { useLatestPlaylistVideo } from "@/hooks/useLatestPlaylistVideo";
import { PixelExternal, PixelPlay } from "@/components/common/PixelIcon";
import { useLanguage } from "@/lib/i18n";

export default function LatestReplayCard({
  playlistId,
  label,
}: {
  playlistId: string;
  label: string;
}) {
  const { t } = useLanguage();
  const { video, loading, error } = useLatestPlaylistVideo(playlistId);
  const [playing, setPlaying] = useState(false);

  // Reset ke thumbnail lagi kalau video-nya berganti (mis. ada replay baru).
  useEffect(() => {
    setPlaying(false);
  }, [video?.videoId]);

  if (loading) {
    return (
      <div className="pixel-inset p-6 text-center">
        <p className="pixel-label text-muted-foreground" style={{ fontSize: 9 }}>
          {t("wife.replayCard.loading", { label })}
          <span className="anim-blink">_</span>
        </p>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="pixel-inset p-6 text-center">
        <p className="pixel-label text-muted-foreground" style={{ fontSize: 9 }}>
          {error === "no_api_key"
            ? t("wife.replayCard.apiKeyMissing")
            : t("wife.replayCard.noReplayYet", { label })}
        </p>
      </div>
    );
  }

  return (
    <div className="pixel-card anim-in flex flex-col overflow-hidden">
      <div className="relative aspect-video w-full border-b-4 border-border bg-black">
        {playing ? (
          <iframe
            key={video.videoId}
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={t("wife.replayCard.playAria", { title: video.title })}
            className="group relative block h-full w-full"
            style={{ cursor: "pointer" }}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              className="block h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/45">
              <span
                className="grid h-14 w-14 place-items-center border-4 border-border bg-primary text-primary-foreground transition-transform group-hover:scale-110"
                style={{ boxShadow: "6px 6px 0 0 var(--pixel-shadow)" }}
              >
                <PixelPlay size={22} />
              </span>
            </span>
          </button>
        )}
      </div>
      <a
        href={`https://www.youtube.com/watch?v=${video.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-3 p-5 hover:bg-muted/40"
        style={{ cursor: "pointer" }}
      >
        <div className="min-w-0">
          <p className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
            {label}
          </p>
          <h3 className="body-text mt-2 truncate text-foreground">{video.title}</h3>
        </div>
        <PixelExternal size={16} className="shrink-0 text-secondary" />
      </a>
    </div>
  );
}
