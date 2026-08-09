import { useState, useEffect, useCallback, useRef } from "react";
import { YOUTUBE_CONFIG } from "@/config/youtubeConfig";

export interface ChannelVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  duration?: string;
  viewCount?: string;
}

export type VideoType = "video" | "short" | "stream";

export type ChannelVideoError =
  | "no_api_key"
  | "quota_exceeded"
  | "channel_not_found"
  | "no_video_found"
  | "network_error"
  | "unknown";

const CACHE_PREFIX = "yt_ch_v3_";
const POLL_INTERVAL = 6 * 60 * 60 * 1_000;

interface CacheEntry {
  data: ChannelVideo;
  savedAt: number;
}

function readCache(key: string): ChannelVideo | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    return (JSON.parse(raw) as CacheEntry).data ?? null;
  } catch {
    return null;
  }
}

function writeCache(key: string, data: ChannelVideo): void {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ data, savedAt: Date.now() }));
  } catch {
    /**/
  }
}

async function resolveChannelId(
  handle: string,
  apiKey: string,
  signal: AbortSignal,
): Promise<string | null> {
  const ck = "cid_" + handle;
  const cached = localStorage.getItem(CACHE_PREFIX + ck);
  if (cached) return cached;

  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.set("part", "id");
  url.searchParams.set("forHandle", handle);
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString(), { signal });
  if (!res.ok) return null;
  const json = await res.json();
  const id: string | undefined = json.items?.[0]?.id;
  if (id) {
    try {
      localStorage.setItem(CACHE_PREFIX + ck, id);
    } catch {
      /**/
    }
  }
  return id ?? null;
}

function parseDurationSeconds(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return parseInt(m[1] || "0") * 3600 + parseInt(m[2] || "0") * 60 + parseInt(m[3] || "0");
}

async function fetchLatestOfType(
  channelId: string,
  type: VideoType,
  apiKey: string,
  signal: AbortSignal,
  maxCandidates = 10,
): Promise<{ result: ChannelVideo | null; error: ChannelVideoError | null }> {
  const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
  searchUrl.searchParams.set("part", "snippet");
  searchUrl.searchParams.set("channelId", channelId);
  searchUrl.searchParams.set("maxResults", String(maxCandidates));
  searchUrl.searchParams.set("order", "date");
  searchUrl.searchParams.set("type", "video");
  searchUrl.searchParams.set("key", apiKey);

  if (type === "stream") {
    searchUrl.searchParams.set("eventType", "completed");
  }

  let searchRes: Response;
  try {
    searchRes = await fetch(searchUrl.toString(), { signal });
  } catch (e) {
    if ((e as Error).name === "AbortError") return { result: null, error: null };
    return { result: null, error: "network_error" };
  }

  if (!searchRes.ok) {
    if (searchRes.status === 403) return { result: null, error: "quota_exceeded" };
    if (searchRes.status === 400) return { result: null, error: "channel_not_found" };
    return { result: null, error: "unknown" };
  }

  const searchJson = await searchRes.json();
  const candidates: any[] = searchJson.items ?? [];
  if (candidates.length === 0) return { result: null, error: "no_video_found" };

  const videoIds = candidates
    .map((c: any) => c.id?.videoId)
    .filter(Boolean)
    .join(",");

  const detailUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
  detailUrl.searchParams.set("part", "contentDetails,liveStreamingDetails,statistics,snippet");
  detailUrl.searchParams.set("id", videoIds);
  detailUrl.searchParams.set("key", apiKey);

  let detailRes: Response;
  try {
    detailRes = await fetch(detailUrl.toString(), { signal });
  } catch (e) {
    if ((e as Error).name === "AbortError") return { result: null, error: null };
    return { result: null, error: "network_error" };
  }

  if (!detailRes.ok) return { result: null, error: "unknown" };
  const detailJson = await detailRes.json();
  const details: any[] = detailJson.items ?? [];

  const matched = details.find((item: any) => {
    const durationSec = parseDurationSeconds(item.contentDetails?.duration ?? "PT0S");
    const hasLiveEnd = !!item.liveStreamingDetails?.actualEndTime;
    const hasLiveStart = !!item.liveStreamingDetails?.actualStartTime;
    const isLive = hasLiveEnd || hasLiveStart;

    if (type === "stream") return isLive;
    if (type === "short") return !isLive && durationSec <= 60;
    return !isLive && durationSec > 60;
  });

  if (!matched) return { result: null, error: "no_video_found" };

  const snippet = matched.snippet ?? {};
  const thumbs = snippet.thumbnails ?? {};
  const thumbnail =
    thumbs?.maxres?.url ||
    thumbs?.high?.url ||
    thumbs?.medium?.url ||
    thumbs?.default?.url ||
    `https://img.youtube.com/vi/${matched.id}/hqdefault.jpg`;

  const result: ChannelVideo = {
    videoId: matched.id,
    title: snippet.title ?? "Video",
    thumbnail,
    publishedAt: snippet.publishedAt ?? new Date().toISOString(),
    duration: matched.contentDetails?.duration,
    viewCount: matched.statistics?.viewCount,
  };

  return { result, error: null };
}

export function useLatestChannelVideo(channelHandle: string, type: VideoType) {
  const cacheKey = `${channelHandle}_${type}`;

  const [video, setVideo] = useState<ChannelVideo | null>(() => readCache(cacheKey));
  const [loading, setLoading] = useState<boolean>(() => !readCache(cacheKey));
  const [error, setError] = useState<ChannelVideoError | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAndDetect = useCallback(
    async (showSpinner = false) => {
      const apiKey = YOUTUBE_CONFIG.apiKey;
      if (!apiKey) {
        setError("no_api_key");
        setLoading(false);
        return;
      }

      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      if (showSpinner) {
        setLoading(true);
        setError(null);
      }

      try {
        const channelId = await resolveChannelId(channelHandle, apiKey, ctrl.signal);
        if (ctrl.signal.aborted) return;
        if (!channelId) {
          setError("channel_not_found");
          setLoading(false);
          return;
        }

        const { result, error: fe } = await fetchLatestOfType(channelId, type, apiKey, ctrl.signal);
        if (ctrl.signal.aborted) return;

        if (fe) {
          setError(fe);
          setLoading(false);
          return;
        }

        if (result) {
          const cached = readCache(cacheKey);
          if (!cached || cached.videoId !== result.videoId) {
            writeCache(cacheKey, result);
            setVideo(result);
          }
          setError(null);
        }
      } catch (e) {
        if ((e as Error).name !== "AbortError") setError("network_error");
      }

      setLoading(false);
    },
    [channelHandle, type, cacheKey],
  );

  useEffect(() => {
    fetchAndDetect(!readCache(cacheKey));
    intervalRef.current = setInterval(() => fetchAndDetect(false), POLL_INTERVAL);
    return () => {
      abortRef.current?.abort();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchAndDetect, cacheKey]);

  const refresh = useCallback(() => fetchAndDetect(true), [fetchAndDetect]);
  return { video, loading, error, refresh };
}
