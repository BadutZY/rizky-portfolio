import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PixelExternal } from "@/components/common/PixelIcon";
import { useLanguage } from "@/lib/i18n";

const IDN_USERNAME = "jkt48_kimmy";
const SHOWROOM_KEY = "JKT48_Kimmy";

type PlatformKey = "idn" | "showroom";

type PlatformStatus = {
  checking: boolean;
  isLive: boolean;
  liveUrl: string | null;
  streamUrl: string | null;
};

const initialStatus: PlatformStatus = {
  checking: true,
  isLive: false,
  liveUrl: null,
  streamUrl: null,
};

function usePlayer(streamUrl: string | null) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "playing" | "error">("idle");

  useEffect(() => {
    if (!streamUrl || !videoRef.current) {
      setState("idle");
      return;
    }
    const video = videoRef.current;
    setState("loading");

    let hls: import("hls.js").default | null = null;
    let cancelled = false;

    (async () => {
      const HlsModule = (await import("hls.js")).default;
      if (cancelled) return;

      if (HlsModule.isSupported()) {
        hls = new HlsModule({ enableWorker: true });
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        hls.on(HlsModule.Events.MANIFEST_PARSED, () => {
          if (cancelled) return;
          video.play().catch(() => {});
          setState("playing");
        });
        hls.on(HlsModule.Events.ERROR, (_evt, data) => {
          if (data?.fatal) setState("error");
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = streamUrl;
        video.play().catch(() => {});
        setState("playing");
      } else {
        setState("error");
      }
    })();

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [streamUrl]);

  return { videoRef, state };
}

function PlatformCard({
  label,
  logo,
  status,
  liveRoomFallback,
}: {
  label: string;
  logo: string;
  status: PlatformStatus;
  liveRoomFallback: string;
}) {
  const { t } = useLanguage();
  const { videoRef, state } = usePlayer(status.isLive ? status.streamUrl : null);
  const [muted, setMuted] = useState(true);

  return (
    <div className="pixel-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b-4 border-border p-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt={label} className="h-6 w-6 object-contain" />
          <span className="pixel-label text-foreground" style={{ fontSize: 10 }}>
            {label}
          </span>
        </div>
        {status.checking ? (
          <span className="pixel-tag" style={{ fontSize: 8 }}>
            {t("wife.liveStatus.checking")}
            <span className="anim-blink">_</span>
          </span>
        ) : status.isLive ? (
          <span
            className="pixel-tag pixel-tag-accent flex items-center gap-2"
            style={{ fontSize: 8 }}
          >
            <span className="h-2 w-2 animate-pulse bg-destructive" /> {t("wife.liveStatus.live")}
          </span>
        ) : (
          <span className="pixel-tag" style={{ fontSize: 8 }}>
            {t("wife.liveStatus.offline")}
          </span>
        )}
      </div>

      {status.isLive && status.streamUrl ? (
        <div className="relative bg-black" style={{ aspectRatio: "16 / 9" }}>
          <video
            ref={videoRef}
            muted={muted}
            playsInline
            className="block h-full w-full object-contain"
          />
          {state === "loading" && (
            <div
              className="pixel-label absolute inset-0 flex items-center justify-center text-muted-foreground"
              style={{ fontSize: 9 }}
            >
              {t("wife.liveStatus.connecting")}
              <span className="anim-blink">_</span>
            </div>
          )}
          {state === "error" && (
            <div
              className="pixel-label absolute inset-0 flex items-center justify-center px-4 text-center text-muted-foreground"
              style={{ fontSize: 9 }}
            >
              {t("wife.liveStatus.unplayable")}
            </div>
          )}
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="pixel-tag absolute bottom-3 right-3"
            style={{ fontSize: 8, cursor: "pointer" }}
          >
            {muted ? t("wife.liveStatus.unmute") : t("wife.liveStatus.mute")}
          </button>
        </div>
      ) : (
        <div className="pixel-inset m-4 p-6 text-center">
          <p className="pixel-label text-muted-foreground" style={{ fontSize: 9 }}>
            {status.checking ? t("wife.liveStatus.checkingStatus") : t("wife.liveStatus.notLive")}
          </p>
        </div>
      )}

      <div className="p-4">
        <a
          href={status.liveUrl ?? liveRoomFallback}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-btn pixel-btn-ghost flex w-full items-center justify-center gap-2"
        >
          {t("wife.liveStatus.openOn", { label })} <PixelExternal size={14} />
        </a>
      </div>
    </div>
  );
}

export default function KimmyLiveStatus({
  idnLogo,
  showroomLogo,
}: {
  idnLogo: string;
  showroomLogo: string;
}) {
  const [idn, setIdn] = useState<PlatformStatus>(initialStatus);
  const [showroom, setShowroom] = useState<PlatformStatus>(initialStatus);

  const checkIdn = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke("check-idn-live", {
        body: { username: IDN_USERNAME },
      });
      if (error) throw error;
      setIdn({
        checking: false,
        isLive: !!data?.is_live,
        liveUrl: data?.live_url ?? null,
        streamUrl: data?.stream_url ?? null,
      });
    } catch {
      setIdn({ checking: false, isLive: false, liveUrl: null, streamUrl: null });
    }
  }, []);

  const checkShowroom = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke("check-showroom-live", {
        body: { room_url_key: SHOWROOM_KEY },
      });
      if (error) throw error;
      setShowroom({
        checking: false,
        isLive: !!data?.is_live,
        liveUrl: data?.live_url ?? null,
        streamUrl: data?.stream_url ?? null,
      });
    } catch {
      setShowroom({ checking: false, isLive: false, liveUrl: null, streamUrl: null });
    }
  }, []);

  useEffect(() => {
    checkIdn();
    checkShowroom();
    const interval = setInterval(() => {
      checkIdn();
      checkShowroom();
    }, 60_000);
    return () => clearInterval(interval);
  }, [checkIdn, checkShowroom]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <PlatformCard
        label="IDN Live"
        logo={idnLogo}
        status={idn}
        liveRoomFallback={`https://www.idn.app/${IDN_USERNAME}`}
      />
      <PlatformCard
        label="Showroom"
        logo={showroomLogo}
        status={showroom}
        liveRoomFallback="https://www.showroom-live.com/room/profile?room_id=510073"
      />
    </div>
  );
}
