import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ExternalLink,
  Heart,
  ListMusic,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { SP_GREEN, spPlaylists, ytPlaylists, type SPPlaylist, type YTPlaylist } from "@/data/about";

// ─────────────────────────────────────────────────────────────────────────────
// Real YouTube IFrame API + Spotify IFrame API loaders (headless audio engines)
// ─────────────────────────────────────────────────────────────────────────────

let _ytReady = false;
const _ytQueue: (() => void)[] = [];
function loadYTApi(cb: () => void) {
  if (_ytReady) {
    cb();
    return;
  }
  _ytQueue.push(cb);
  if (document.getElementById("yt-iframe-api")) return;
  const s = document.createElement("script");
  s.id = "yt-iframe-api";
  s.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(s);
  (window as any).onYouTubeIframeAPIReady = () => {
    _ytReady = true;
    _ytQueue.forEach((fn) => fn());
    _ytQueue.length = 0;
  };
}

let _spReady = false;
const _spQueue: (() => void)[] = [];
function loadSpotifyApi(cb: () => void) {
  if (_spReady) {
    cb();
    return;
  }
  _spQueue.push(cb);
  if (document.getElementById("spotify-iframe-api")) return;
  const s = document.createElement("script");
  s.id = "spotify-iframe-api";
  s.src = "https://open.spotify.com/embed/iframe-api/v1";
  document.head.appendChild(s);
  (window as any).onSpotifyIframeApiReady = (IFrameAPI: any) => {
    (window as any)._SpotifyIFrameAPI = IFrameAPI;
    _spReady = true;
    _spQueue.forEach((fn) => fn());
    _spQueue.length = 0;
  };
}

// only one player (YT or Spotify) plays at a time
let _activeStop: (() => void) | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Shared pixel bits
// ─────────────────────────────────────────────────────────────────────────────

const PixelTransportBtn = ({
  onClick,
  active,
  title,
  children,
  disabled,
}: {
  onClick: () => void;
  active?: boolean;
  title?: string;
  children: React.ReactNode;
  disabled?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className="flex h-8 w-8 items-center justify-center border-2 border-border bg-surface text-foreground transition-transform disabled:opacity-40"
    style={{
      cursor: disabled ? "default" : "pointer",
      color: active ? "var(--secondary)" : undefined,
    }}
  >
    {children}
  </button>
);

function EqBars({ color, playing }: { color: string; playing: boolean }) {
  return (
    <div className="flex h-3 w-4 shrink-0 items-end justify-center gap-[2px]">
      {[0, 1, 2].map((b) => (
        <span
          key={b}
          className="w-[3px]"
          style={{
            background: color,
            height: "100%",
            animation: playing
              ? `card-eq ${0.5 + b * 0.19}s ease-in-out infinite alternate`
              : undefined,
            opacity: playing ? 1 : 0.35,
          }}
        />
      ))}
    </div>
  );
}

const fmtSec = (s: number) => {
  if (!s || isNaN(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};
const fmtMs = (ms: number) => {
  if (!ms || isNaN(ms)) return "0:00";
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

// ─────────────────────────────────────────────────────────────────────────────
// YouTube Music pixel player card
// ─────────────────────────────────────────────────────────────────────────────

function YTPlayerCard({ playlist, index }: { playlist: YTPlaylist; index: number }) {
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [curSec, setCurSec] = useState(0);
  const [durSec, setDurSec] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [liked, setLiked] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  const ytRef = useRef<any>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const playingRef = useRef(false);
  const trackIdxRef = useRef(0);
  const durSecRef = useRef(0);
  const isDraggingRef = useRef(false);
  const shuffleRef = useRef(false);
  const repeatRef = useRef(false);

  useEffect(() => {
    shuffleRef.current = shuffle;
  }, [shuffle]);
  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);
  useEffect(() => {
    trackIdxRef.current = trackIdx;
  }, [trackIdx]);
  useEffect(() => {
    durSecRef.current = durSec;
  }, [durSec]);

  const track = playlist.tracks[trackIdx] ?? playlist.tracks[0]!;

  const startPoll = useCallback(() => {
    if (pollRef.current) return;
    pollRef.current = setInterval(() => {
      const p = ytRef.current;
      if (!p?.getCurrentTime) return;
      const c = p.getCurrentTime();
      const d = p.getDuration();
      if (!isDraggingRef.current) {
        setCurSec(Math.floor(c));
        setProgress(d > 0 ? (c / d) * 100 : 0);
      }
      setDurSec(Math.floor(d));
    }, 250);
  }, []);
  const stopPoll = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);
  const stopThis = useCallback(() => {
    ytRef.current?.pauseVideo?.();
    setPlaying(false);
    playingRef.current = false;
    stopPoll();
  }, [stopPoll]);

  const handleEnded = useCallback(() => {
    const len = playlist.tracks.length;
    const cur = trackIdxRef.current;
    if (repeatRef.current) {
      setTimeout(() => {
        ytRef.current?.seekTo?.(0, true);
        ytRef.current?.playVideo?.();
      }, 50);
      return;
    }
    let next: number;
    if (shuffleRef.current) {
      do {
        next = Math.floor(Math.random() * len);
      } while (len > 1 && next === cur);
    } else next = (cur + 1) % len;
    setTrackIdx(next);
    trackIdxRef.current = next;
    setTimeout(() => {
      ytRef.current?.loadVideoById?.(playlist.tracks[next]?.videoId);
    }, 80);
  }, [playlist.tracks]);

  useEffect(() => {
    loadYTApi(() => {
      if (!holderRef.current) return;
      ytRef.current = new (window as any).YT.Player(`yt-${playlist.id}`, {
        height: "1",
        width: "1",
        videoId: playlist.tracks[0]!.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          iv_load_policy: 3,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => setApiReady(true),
          onStateChange: (e: any) => {
            const S = (window as any).YT?.PlayerState;
            if (!S) return;
            if (e.data === S.PLAYING) {
              setPlaying(true);
              playingRef.current = true;
              startPoll();
            }
            if (e.data === S.PAUSED || e.data === S.BUFFERING) {
              setPlaying(false);
              playingRef.current = false;
              stopPoll();
            }
            if (e.data === S.ENDED) handleEnded();
          },
        },
      });
    });
    return () => {
      stopPoll();
      ytRef.current?.destroy?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!apiReady) return;
    if (playingRef.current) ytRef.current?.loadVideoById?.(track.videoId);
    else ytRef.current?.cueVideoById?.(track.videoId);
    if (!isDraggingRef.current) {
      setProgress(0);
      setCurSec(0);
    }
    setDurSec(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIdx, apiReady]);

  const handlePlayPause = () => {
    if (!apiReady) return;
    if (playing) {
      ytRef.current.pauseVideo();
      setPlaying(false);
      playingRef.current = false;
    } else {
      if (_activeStop && _activeStop !== stopThis) _activeStop();
      _activeStop = stopThis;
      ytRef.current.playVideo();
      setPlaying(true);
      playingRef.current = true;
    }
  };
  const handlePrev = () => {
    if (curSec > 3) ytRef.current?.seekTo?.(0, true);
    else setTrackIdx((trackIdxRef.current - 1 + playlist.tracks.length) % playlist.tracks.length);
  };
  const handleNext = () => {
    const len = playlist.tracks.length;
    const cur = trackIdxRef.current;
    let next: number;
    if (shuffleRef.current) {
      do {
        next = Math.floor(Math.random() * len);
      } while (len > 1 && next === cur);
    } else next = (cur + 1) % len;
    setTrackIdx(next);
  };
  const pickTrack = (i: number) => {
    if (i === trackIdx) {
      handlePlayPause();
      return;
    }
    setTrackIdx(i);
    trackIdxRef.current = i;
    setTimeout(() => {
      if (_activeStop && _activeStop !== stopThis) _activeStop();
      _activeStop = stopThis;
      ytRef.current?.playVideo?.();
      setPlaying(true);
      playingRef.current = true;
    }, 120);
  };

  const getBarRatio = (x: number) => {
    const r = barRef.current?.getBoundingClientRect();
    if (!r) return 0;
    return Math.max(0, Math.min(1, (x - r.left) / r.width));
  };
  const handleBarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDraggingRef.current = true;
    stopPoll();
    const ratio = getBarRatio(e.clientX);
    setProgress(ratio * 100);
    setCurSec(Math.floor(ratio * durSecRef.current));
    const onMove = (me: MouseEvent) => {
      const r = getBarRatio(me.clientX);
      setProgress(r * 100);
      setCurSec(Math.floor(r * durSecRef.current));
    };
    const onUp = (me: MouseEvent) => {
      isDraggingRef.current = false;
      const r = getBarRatio(me.clientX);
      const s = r * durSecRef.current;
      setProgress(r * 100);
      setCurSec(Math.floor(s));
      ytRef.current?.seekTo?.(s, true);
      if (playingRef.current) startPoll();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <article
      className="pixel-card anim-in flex flex-col overflow-hidden"
      style={{ ["--delay" as string]: `${index * 70}ms` }}
    >
      <div
        ref={holderRef}
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div id={`yt-${playlist.id}`} />
      </div>

      <div className="relative border-b-4 border-border" style={{ aspectRatio: "1 / 1" }}>
        <img
          src={playlist.cover}
          alt={playlist.name}
          loading="lazy"
          className="block h-full w-full object-cover"
        />
        <div className="absolute left-2 top-2 flex items-center gap-1">
          <span className="flex h-3 w-3 items-center justify-center bg-destructive">
            <span className="h-0 w-0 border-y-[3px] border-l-[4px] border-y-transparent border-l-white" />
          </span>
          <span
            className="pixel-label bg-black/70 px-1.5 py-0.5 text-white"
            style={{ fontSize: 7 }}
          >
            YouTube Music
          </span>
        </div>
        <a
          href={playlist.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center border-2 border-white/40 bg-black/60 text-white"
        >
          <ExternalLink size={12} />
        </a>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-foreground">{track.title}</p>
            <p className="truncate text-xs text-muted-foreground">{track.artist}</p>
          </div>
          <button
            type="button"
            onClick={() => setLiked((v) => !v)}
            className="mt-0.5 shrink-0"
            aria-label="Like"
          >
            <Heart
              size={16}
              className={liked ? "fill-destructive text-destructive" : "text-muted-foreground"}
            />
          </button>
        </div>

        <div
          ref={barRef}
          onMouseDown={handleBarMouseDown}
          className="relative mt-3 h-2 cursor-pointer border-2 border-border bg-muted"
        >
          <div
            className="absolute left-0 top-0 h-full"
            style={{ width: `${progress}%`, background: playlist.accentColor }}
          />
        </div>
        <div className="mt-1.5 flex justify-between">
          <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
            {fmtSec(curSec)}
          </span>
          <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
            {durSec ? fmtSec(durSec) : track.duration}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <PixelTransportBtn onClick={() => setShuffle((v) => !v)} active={shuffle} title="Shuffle">
            <Shuffle size={13} />
          </PixelTransportBtn>
          <PixelTransportBtn onClick={handlePrev} title="Previous">
            <SkipBack size={15} />
          </PixelTransportBtn>
          <button
            type="button"
            onClick={handlePlayPause}
            disabled={!apiReady}
            className="flex h-11 w-11 items-center justify-center border-4 border-border text-white disabled:opacity-50"
            style={{ background: playlist.accentColor }}
          >
            {playing ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" className="ml-0.5" />
            )}
          </button>
          <PixelTransportBtn onClick={handleNext} title="Next">
            <SkipForward size={15} />
          </PixelTransportBtn>
          <PixelTransportBtn onClick={() => setRepeat((v) => !v)} active={repeat} title="Repeat">
            <Repeat size={13} />
          </PixelTransportBtn>
        </div>

        <button
          type="button"
          onClick={() => setQueueOpen((v) => !v)}
          className="pixel-inset mt-4 flex items-center justify-center gap-2 px-2 py-2"
          style={{ cursor: "pointer" }}
        >
          <ListMusic size={12} className="text-muted-foreground" />
          <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
            {playlist.name} &middot; {playlist.tracks.length} songs
          </span>
          <ChevronDown
            size={12}
            className="text-muted-foreground transition-transform"
            style={{ transform: queueOpen ? "rotate(180deg)" : "none" }}
          />
        </button>

        <div className="pixel-collapse mt-2" data-open={queueOpen}>
          <div className="space-y-1">
            {playlist.tracks.map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() => pickTrack(i)}
                className="flex w-full items-center gap-2.5 px-2 py-1.5 text-left"
                style={{
                  background: i === trackIdx ? `${playlist.accentColor}22` : "transparent",
                  cursor: "pointer",
                }}
              >
                {i === trackIdx ? (
                  <EqBars color={playlist.accentColor} playing={playing} />
                ) : (
                  <span className="w-4 shrink-0 text-center text-[10px] text-muted-foreground">
                    {i + 1}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold text-foreground">{t.title}</p>
                  <p className="truncate text-[10px] text-muted-foreground">{t.artist}</p>
                </div>
                <span className="shrink-0 text-[9px] text-muted-foreground">{t.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Spotify pixel player card
// ─────────────────────────────────────────────────────────────────────────────

function SPPlayerCard({ playlist, index }: { playlist: SPPlaylist; index: number }) {
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [curMs, setCurMs] = useState(0);
  const [durMs, setDurMs] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [liked, setLiked] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  const holderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<any>(null);
  const playingRef = useRef(false);
  const trackIdxRef = useRef(0);
  const durMsRef = useRef(0);
  const isDraggingRef = useRef(false);
  const shuffleRef = useRef(false);
  const repeatRef = useRef(false);

  useEffect(() => {
    shuffleRef.current = shuffle;
  }, [shuffle]);
  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);
  useEffect(() => {
    trackIdxRef.current = trackIdx;
  }, [trackIdx]);
  useEffect(() => {
    durMsRef.current = durMs;
  }, [durMs]);

  const track = playlist.tracks[trackIdx] ?? playlist.tracks[0]!;
  const stopThis = useCallback(() => {
    controllerRef.current?.pause?.();
    setPlaying(false);
    playingRef.current = false;
  }, []);

  useEffect(() => {
    loadSpotifyApi(() => {
      const IFrameAPI = (window as any)._SpotifyIFrameAPI;
      if (!IFrameAPI || !holderRef.current) return;
      const mountEl = holderRef.current.querySelector(`#sp-embed-${playlist.id}`);
      if (!mountEl) return;
      IFrameAPI.createController(
        mountEl,
        { uri: `spotify:track:${playlist.tracks[0]!.trackId}` },
        (controller: any) => {
          controllerRef.current = controller;
          setApiReady(true);
          controller.addListener("playback_update", (e: any) => {
            const { position, duration, isPaused } = e.data;
            if (!isDraggingRef.current) {
              setCurMs(position);
              setProgress(duration > 0 ? (position / duration) * 100 : 0);
            }
            setDurMs(duration);
            durMsRef.current = duration;
            const isNowPlaying = !isPaused && duration > 0;
            setPlaying(isNowPlaying);
            playingRef.current = isNowPlaying;
            if (!isPaused && duration > 0 && duration - position < 800 && position > 0) {
              const len = playlist.tracks.length;
              const cur = trackIdxRef.current;
              if (repeatRef.current) {
                setTimeout(() => {
                  controller.seek(0);
                  controller.play();
                }, 100);
                return;
              }
              let next: number;
              if (shuffleRef.current) {
                do {
                  next = Math.floor(Math.random() * len);
                } while (len > 1 && next === cur);
              } else next = (cur + 1) % len;
              setTrackIdx(next);
              trackIdxRef.current = next;
              setTimeout(() => {
                controller.loadUri(`spotify:track:${playlist.tracks[next]?.trackId}`);
                setTimeout(() => controller.play(), 400);
              }, 100);
            }
          });
        },
      );
    });
    return () => {
      controllerRef.current?.destroy?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!apiReady || !controllerRef.current) return;
    trackIdxRef.current = trackIdx;
    controllerRef.current.loadUri(`spotify:track:${playlist.tracks[trackIdx]?.trackId}`);
    if (!isDraggingRef.current) {
      setProgress(0);
      setCurMs(0);
    }
    setDurMs(0);
    if (playingRef.current) setTimeout(() => controllerRef.current?.play(), 350);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIdx, apiReady]);

  const handlePlayPause = () => {
    if (!apiReady) return;
    if (playing) {
      controllerRef.current.pause();
      setPlaying(false);
      playingRef.current = false;
    } else {
      if (_activeStop && _activeStop !== stopThis) _activeStop();
      _activeStop = stopThis;
      controllerRef.current.play();
      setPlaying(true);
      playingRef.current = true;
    }
  };
  const handlePrev = () => {
    if (curMs > 3000) controllerRef.current?.seek(0);
    else setTrackIdx((trackIdxRef.current - 1 + playlist.tracks.length) % playlist.tracks.length);
  };
  const handleNext = () => {
    const len = playlist.tracks.length;
    const cur = trackIdxRef.current;
    let next: number;
    if (shuffleRef.current) {
      do {
        next = Math.floor(Math.random() * len);
      } while (len > 1 && next === cur);
    } else next = (cur + 1) % len;
    setTrackIdx(next);
  };
  const pickTrack = (i: number) => {
    if (i === trackIdx) {
      handlePlayPause();
      return;
    }
    setTrackIdx(i);
    trackIdxRef.current = i;
    setTimeout(() => {
      if (_activeStop && _activeStop !== stopThis) _activeStop();
      _activeStop = stopThis;
      controllerRef.current?.play();
      setPlaying(true);
      playingRef.current = true;
    }, 450);
  };

  const getBarRatio = (x: number) => {
    const r = barRef.current?.getBoundingClientRect();
    if (!r) return 0;
    return Math.max(0, Math.min(1, (x - r.left) / r.width));
  };
  const handleBarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDraggingRef.current = true;
    const ratio = getBarRatio(e.clientX);
    setProgress(ratio * 100);
    setCurMs(Math.floor(ratio * durMsRef.current));
    const onMove = (me: MouseEvent) => {
      const r = getBarRatio(me.clientX);
      setProgress(r * 100);
      setCurMs(Math.floor(r * durMsRef.current));
    };
    const onUp = (me: MouseEvent) => {
      isDraggingRef.current = false;
      const r = getBarRatio(me.clientX);
      setProgress(r * 100);
      setCurMs(Math.floor(r * durMsRef.current));
      controllerRef.current?.seek(r * durMsRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <article
      className="pixel-card anim-in flex flex-col overflow-hidden"
      style={{ ["--delay" as string]: `${index * 70}ms` }}
    >
      <div
        ref={holderRef}
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div id={`sp-embed-${playlist.id}`} />
      </div>

      <div className="relative border-b-4 border-border" style={{ aspectRatio: "1 / 1" }}>
        <img
          src={playlist.cover}
          alt={playlist.name}
          loading="lazy"
          className="block h-full w-full object-cover"
        />
        <div
          className="absolute left-2 top-2 flex items-center gap-1 px-1.5 py-1"
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          <span
            className="h-2 w-2 shrink-0"
            style={{ background: SP_GREEN, borderRadius: "50%" }}
          />
          <span className="pixel-label text-white" style={{ fontSize: 7 }}>
            Spotify
          </span>
        </div>
        <a
          href={playlist.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center border-2 border-white/40 bg-black/60 text-white"
        >
          <ExternalLink size={12} />
        </a>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-foreground">{track.title}</p>
            <p className="truncate text-xs text-muted-foreground">{track.artist}</p>
          </div>
          <button
            type="button"
            onClick={() => setLiked((v) => !v)}
            className="mt-0.5 shrink-0"
            aria-label="Like"
          >
            <Heart
              size={16}
              style={{ color: liked ? SP_GREEN : undefined }}
              className={!liked ? "text-muted-foreground" : "fill-current"}
            />
          </button>
        </div>

        <div
          ref={barRef}
          onMouseDown={handleBarMouseDown}
          className="relative mt-3 h-2 cursor-pointer border-2 border-border bg-muted"
        >
          <div
            className="absolute left-0 top-0 h-full"
            style={{ width: `${progress}%`, background: SP_GREEN }}
          />
        </div>
        <div className="mt-1.5 flex justify-between">
          <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
            {fmtMs(curMs)}
          </span>
          <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
            {durMs ? fmtMs(durMs) : track.duration}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <PixelTransportBtn onClick={() => setShuffle((v) => !v)} active={shuffle} title="Shuffle">
            <Shuffle size={13} />
          </PixelTransportBtn>
          <PixelTransportBtn onClick={handlePrev} title="Previous">
            <SkipBack size={15} />
          </PixelTransportBtn>
          <button
            type="button"
            onClick={handlePlayPause}
            disabled={!apiReady}
            className="flex h-11 w-11 items-center justify-center border-4 border-border text-black disabled:opacity-50"
            style={{ background: SP_GREEN }}
          >
            {playing ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" className="ml-0.5" />
            )}
          </button>
          <PixelTransportBtn onClick={handleNext} title="Next">
            <SkipForward size={15} />
          </PixelTransportBtn>
          <PixelTransportBtn onClick={() => setRepeat((v) => !v)} active={repeat} title="Repeat">
            <Repeat size={13} />
          </PixelTransportBtn>
        </div>

        <button
          type="button"
          onClick={() => setQueueOpen((v) => !v)}
          className="pixel-inset mt-4 flex items-center justify-center gap-2 px-2 py-2"
          style={{ cursor: "pointer" }}
        >
          <ListMusic size={12} className="text-muted-foreground" />
          <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
            {playlist.name} &middot; {playlist.tracks.length} songs
          </span>
          <ChevronDown
            size={12}
            className="text-muted-foreground transition-transform"
            style={{ transform: queueOpen ? "rotate(180deg)" : "none" }}
          />
        </button>

        <div className="pixel-collapse mt-2" data-open={queueOpen}>
          <div className="space-y-1">
            {playlist.tracks.map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() => pickTrack(i)}
                className="flex w-full items-center gap-2.5 px-2 py-1.5 text-left"
                style={{
                  background: i === trackIdx ? `${SP_GREEN}22` : "transparent",
                  cursor: "pointer",
                }}
              >
                {i === trackIdx ? (
                  <EqBars color={SP_GREEN} playing={playing} />
                ) : (
                  <span className="w-4 shrink-0 text-center text-[10px] text-muted-foreground">
                    {i + 1}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold text-foreground">{t.title}</p>
                  <p className="truncate text-[10px] text-muted-foreground">{t.artist}</p>
                </div>
                <span className="shrink-0 text-[9px] text-muted-foreground">{t.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Platform toggle + section wrapper
// ─────────────────────────────────────────────────────────────────────────────

type Platform = "youtube" | "spotify";

function PlatformBtn({
  platform,
  active,
  onClick,
}: {
  platform: Platform;
  active: boolean;
  onClick: () => void;
}) {
  const isYT = platform === "youtube";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pixel-btn ${active ? "" : "pixel-btn-ghost"}`}
      style={{
        background: active ? (isYT ? "#FF0000" : SP_GREEN) : undefined,
        color: active ? "#fff" : undefined,
      }}
    >
      {isYT ? (
        <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
          <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm-1.5 17.25V6.75L18.75 12l-8.25 5.25z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      )}
      {isYT ? "YouTube Music" : "Spotify"}
    </button>
  );
}

export default function PlaylistPlayers() {
  const [platform, setPlatform] = useState<Platform>("youtube");

  const handleSwitch = (p: Platform) => {
    if (p === platform) return;
    setPlatform(p);
    if (_activeStop) {
      _activeStop();
      _activeStop = null;
    }
  };

  return (
    <div>
      <style>{`
        @keyframes card-eq { 0% { transform: scaleY(0.25); } 100% { transform: scaleY(1); } }
      `}</style>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {platform === "youtube"
          ? ytPlaylists.map((pl, i) => <YTPlayerCard key={pl.id} playlist={pl} index={i} />)
          : spPlaylists.map((pl, i) => <SPPlayerCard key={pl.id} playlist={pl} index={i} />)}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <PlatformBtn
          platform="youtube"
          active={platform === "youtube"}
          onClick={() => handleSwitch("youtube")}
        />
        <PlatformBtn
          platform="spotify"
          active={platform === "spotify"}
          onClick={() => handleSwitch("spotify")}
        />
      </div>
    </div>
  );
}
