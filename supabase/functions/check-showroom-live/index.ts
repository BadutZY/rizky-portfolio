import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SHOWROOM_API = "https://www.showroom-live.com/api";
const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json",
  Referer: "https://www.showroom-live.com/",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let roomUrlKey = "JKT48_Kimmy";
    try {
      const body = await req.json();
      if (body?.room_url_key) roomUrlKey = body.room_url_key;
    } catch {
      /**/
    }

    const statusRes = await fetch(
      `${SHOWROOM_API}/room/status?room_url_key=${encodeURIComponent(roomUrlKey)}`,
      { headers: FETCH_HEADERS },
    );
    const statusData = await statusRes.json();

    const isLive = statusData?.is_live === true || statusData?.live_status === 2;
    const roomId: number | null = statusData?.room_id ?? null;

    let streamUrl: string | null = null;
    let streamUrlLow: string | null = null;

    if (isLive && roomId) {
      try {
        const streamRes = await fetch(`${SHOWROOM_API}/live/streaming_url?room_id=${roomId}`, {
          headers: FETCH_HEADERS,
        });
        const streamData = await streamRes.json();

        const urlList: any[] = streamData?.streaming_url_list ?? [];

        const hlsStreams = urlList
          .filter((s: any) => s?.type === "hls" && s?.url)
          .sort((a: any, b: any) => (b?.quality ?? 0) - (a?.quality ?? 0));

        if (hlsStreams.length > 0) {
          streamUrl = hlsStreams[0].url;
          streamUrlLow = hlsStreams[hlsStreams.length - 1].url;
        }

        if (!streamUrl) {
          const allStreams = urlList.filter((s: any) => s?.url);
          if (allStreams.length > 0) streamUrl = allStreams[0].url;
        }

        console.log(`[Showroom] room_id=${roomId}, HLS streams: ${hlsStreams.length}`);
      } catch (e) {
        console.error("[Showroom] Failed to fetch streaming URL:", e);
      }
    }

    return new Response(
      JSON.stringify({
        is_live: isLive,
        room_url_key: roomUrlKey,
        room_id: roomId,
        room_name: statusData?.room_name ?? null,
        started_at: statusData?.started_at ?? null,
        image: statusData?.image_s ?? null,
        stream_url: streamUrl,
        stream_url_low: streamUrlLow,
        checked_at: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error checking Showroom live status:", error);
    return new Response(
      JSON.stringify({
        is_live: false,
        stream_url: null,
        error: "Failed to check Showroom live status",
        checked_at: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  }
});
