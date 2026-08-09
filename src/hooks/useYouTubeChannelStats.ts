import { useState, useEffect, useCallback, useRef } from "react";
import { YOUTUBE_CONFIG } from "@/config/youtubeConfig";

export interface YouTubeChannelStats {
  channelId: string;
  title: string;
  description: string;
  customUrl: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
  thumbnailUrl: string;
  bannerUrl: string | null;
  publishedAt: string;
}

export type ChannelStatsError =
  "no_api_key" | "quota_exceeded" | "channel_not_found" | "network_error" | "unknown";

const CACHE_KEY_PREFIX = "yt_ch_stats_v1_";
const CACHE_TTL_MS = 30 * 60 * 1_000;

interface CacheEntry {
  data: YouTubeChannelStats;
  savedAt: number;
}

function readCache(handle: string): YouTubeChannelStats | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY_PREFIX + handle);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (Date.now() - entry.savedAt > CACHE_TTL_MS) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function writeCache(handle: string, data: YouTubeChannelStats): void {
  try {
    localStorage.setItem(CACHE_KEY_PREFIX + handle, JSON.stringify({ data, savedAt: Date.now() }));
  } catch {
    /**/
  }
}

export function formatSubscribers(raw: string): string {
  const n = parseInt(raw, 10);
  if (isNaN(n)) return raw;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toLocaleString("id-ID");
}

export function formatVideoCount(raw: string): string {
  const n = parseInt(raw, 10);
  if (isNaN(n)) return raw;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toLocaleString("id-ID");
}

export function formatTotalViews(raw: string): string {
  const n = parseInt(raw, 10);
  if (isNaN(n)) return raw;
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString("id-ID");
}

async function resolveChannelId(
  handle: string,
  apiKey: string,
  signal: AbortSignal,
): Promise<string | null> {
  const ck = "cid_" + handle;
  try {
    const cached = localStorage.getItem("yt_ch_v3_" + ck);
    if (cached) return cached;
  } catch {
    /**/
  }

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
      localStorage.setItem("yt_ch_v3_" + ck, id);
    } catch {
      /**/
    }
  }
  return id ?? null;
}

async function fetchChannelStats(
  handle: string,
  apiKey: string,
  signal: AbortSignal,
): Promise<{ result: YouTubeChannelStats | null; error: ChannelStatsError | null }> {
  const channelId = await resolveChannelId(handle, apiKey, signal);
  if (!channelId) return { result: null, error: "channel_not_found" };

  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.set("part", "snippet,statistics,brandingSettings");
  url.searchParams.set("id", channelId);
  url.searchParams.set("key", apiKey);

  let res: Response;
  try {
    res = await fetch(url.toString(), { signal });
  } catch (e) {
    if ((e as Error).name === "AbortError") return { result: null, error: null };
    return { result: null, error: "network_error" };
  }

  if (!res.ok) {
    if (res.status === 403) return { result: null, error: "quota_exceeded" };
    return { result: null, error: "unknown" };
  }

  const json = await res.json();
  const item = json.items?.[0];
  if (!item) return { result: null, error: "channel_not_found" };

  const snippet = item.snippet ?? {};
  const stats = item.statistics ?? {};
  const branding = item.brandingSettings ?? {};
  const thumbs = snippet.thumbnails ?? {};

  const bannerUrl: string | null =
    branding.image?.bannerExternalUrl ??
    branding.image?.bannerImageUrl ??
    branding.image?.bannerTvHighImageUrl ??
    branding.image?.bannerTabletHdImageUrl ??
    branding.image?.bannerMobileHdImageUrl ??
    null;

  const thumbnailUrl: string = thumbs.high?.url || thumbs.medium?.url || thumbs.default?.url || "";

  const result: YouTubeChannelStats = {
    channelId,
    title: snippet.title ?? handle,
    description: snippet.description ?? "",
    customUrl: snippet.customUrl ?? `@${handle}`,
    subscriberCount: stats.subscriberCount ?? "0",
    videoCount: stats.videoCount ?? "0",
    viewCount: stats.viewCount ?? "0",
    thumbnailUrl,
    bannerUrl,
    publishedAt: snippet.publishedAt ?? "",
  };

  return { result, error: null };
}

export function useYouTubeChannelStats(channelHandle: string) {
  const [stats, setStats] = useState<YouTubeChannelStats | null>(() => readCache(channelHandle));
  const [loading, setLoading] = useState<boolean>(() => !readCache(channelHandle));
  const [error, setError] = useState<ChannelStatsError | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchStats = useCallback(
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
        const { result, error: fe } = await fetchChannelStats(channelHandle, apiKey, ctrl.signal);
        if (ctrl.signal.aborted) return;

        if (fe) {
          setError(fe);
          setLoading(false);
          return;
        }
        if (result) {
          writeCache(channelHandle, result);
          setStats(result);
          setError(null);
        }
      } catch (e) {
        if ((e as Error).name !== "AbortError") setError("network_error");
      }

      setLoading(false);
    },
    [channelHandle],
  );

  useEffect(() => {
    fetchStats(!readCache(channelHandle));
    intervalRef.current = setInterval(() => fetchStats(false), CACHE_TTL_MS);
    return () => {
      abortRef.current?.abort();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchStats, channelHandle]);

  const refresh = useCallback(() => fetchStats(true), [fetchStats]);
  return { stats, loading, error, refresh };
}
