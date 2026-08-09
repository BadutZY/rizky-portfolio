import { useState, useEffect, useCallback, useRef } from "react";
import { YOUTUBE_CONFIG } from "@/config/youtubeConfig";

export interface YouTubeVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export type ReplayError =
  | "no_api_key"
  | "quota_exceeded"
  | "invalid_playlist"
  | "empty_playlist"
  | "timeout"
  | "network_error"
  | "unknown";

const CACHE_PREFIX = "yt_replay_v2_";
const POLL_INTERVAL = 6 * 60 * 60 * 1_000;

interface CacheEntry {
  data: YouTubeVideo;
  savedAt: number;
}

function readCache(playlistId: string): YouTubeVideo | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + playlistId);
    if (!raw) return null;
    const parsed: CacheEntry = JSON.parse(raw);
    return parsed.data ?? null;
  } catch {
    return null;
  }
}

function writeCache(playlistId: string, data: YouTubeVideo): void {
  try {
    const entry: CacheEntry = { data, savedAt: Date.now() };
    localStorage.setItem(CACHE_PREFIX + playlistId, JSON.stringify(entry));
  } catch {}
}

async function fetchLatestFromAPI(
  playlistId: string,
  signal: AbortSignal,
): Promise<{ result: YouTubeVideo | null; error: ReplayError | null }> {
  const apiKey = YOUTUBE_CONFIG.apiKey;
  if (!apiKey) return { result: null, error: "no_api_key" };

  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("maxResults", "1");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("key", apiKey);

  let res: Response;
  try {
    res = await fetch(url.toString(), { signal });
  } catch (err) {
    if ((err as Error).name === "AbortError") return { result: null, error: null };
    return { result: null, error: "network_error" };
  }

  if (!res.ok) {
    if (res.status === 403) return { result: null, error: "quota_exceeded" };
    if (res.status === 400) return { result: null, error: "invalid_playlist" };
    return { result: null, error: "unknown" };
  }

  const json = await res.json();
  const items: any[] = json.items ?? [];
  if (items.length === 0) return { result: null, error: "empty_playlist" };

  const snippet = items[0].snippet;
  const videoId: string | undefined = snippet?.resourceId?.videoId;
  if (!videoId) return { result: null, error: "unknown" };

  const thumbs = snippet?.thumbnails ?? {};
  const thumbnail =
    thumbs?.maxres?.url ||
    thumbs?.high?.url ||
    thumbs?.medium?.url ||
    thumbs?.default?.url ||
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const result: YouTubeVideo = {
    videoId,
    title: snippet?.title ?? "Live Replay",
    thumbnail,
    publishedAt: snippet?.publishedAt ?? new Date().toISOString(),
  };

  return { result, error: null };
}

export function useLatestPlaylistVideo(playlistId: string) {
  const [video, setVideo] = useState<YouTubeVideo | null>(() => readCache(playlistId));
  const [loading, setLoading] = useState<boolean>(() => !readCache(playlistId));
  const [error, setError] = useState<ReplayError | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAndDetect = useCallback(
    async (showLoadingSpinner = false) => {
      if (!playlistId) return;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      if (showLoadingSpinner) {
        setLoading(true);
        setError(null);
      }

      const { result, error: fetchError } = await fetchLatestFromAPI(playlistId, controller.signal);

      if (controller.signal.aborted) return;

      if (fetchError) {
        setError(fetchError);
        setLoading(false);
        return;
      }

      if (result) {
        const cached = readCache(playlistId);
        const isNewVideo = !cached || cached.videoId !== result.videoId;
        if (isNewVideo) {
          writeCache(playlistId, result);
          setVideo(result);
        }
        setError(null);
      }

      setLoading(false);
    },
    [playlistId],
  );

  useEffect(() => {
    fetchAndDetect(!readCache(playlistId));

    intervalRef.current = setInterval(() => {
      fetchAndDetect(false);
    }, POLL_INTERVAL);

    return () => {
      abortRef.current?.abort();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchAndDetect, playlistId]);

  const refresh = useCallback(() => fetchAndDetect(true), [fetchAndDetect]);

  return { video, loading, error, refresh };
}
