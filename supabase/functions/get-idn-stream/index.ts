import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "id-ID,id;q=0.9,en;q=0.8",
  Referer: "https://www.idn.app/",
};

function extractStreamUrl(html: string): string | null {
  const patterns = [
    /"stream_url"\s*:\s*"(https?:\/\/[^"]+\.m3u8[^"]*)"/i,
    /"playback_url"\s*:\s*"(https?:\/\/[^"]+\.m3u8[^"]*)"/i,
    /"hls_url"\s*:\s*"(https?:\/\/[^"]+\.m3u8[^"]*)"/i,
    /"src"\s*:\s*"(https?:\/\/[^"]+\.m3u8[^"]*)"/i,
    /"url"\s*:\s*"(https?:\/\/[^"]+\.m3u8[^"]*)"/i,
    /"stream_url"\s*:\s*"(https?:\\\/\\\/[^"]+\.m3u8[^"]*)"/i,
    /"playback_url"\s*:\s*"(https?:\\\/\\\/[^"]+\.m3u8[^"]*)"/i,
    /"streamUrl"\s*:\s*"(https?:\/\/[^"]+\.m3u8[^"]*)"/i,
    /"streamURL"\s*:\s*"(https?:\/\/[^"]+\.m3u8[^"]*)"/i,
    /(https?:\/\/[a-zA-Z0-9.\-_\/]+\.m3u8(?:\?[^"'\s<>]*)?)/i,
  ];

  for (const p of patterns) {
    const m = html.match(p);
    if (m) {
      const url = m[1].replace(/\\\//g, "/");
      if (url.startsWith("http") && url.includes(".m3u8")) {
        return url;
      }
    }
  }
  return null;
}

function extractStreamFromScriptTags(html: string): string | null {
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    const scriptContent = match[1];
    if (
      !scriptContent.includes("m3u8") &&
      !scriptContent.includes("stream") &&
      !scriptContent.includes("playback")
    )
      continue;

    const url = extractStreamUrl(scriptContent);
    if (url) return url;
  }
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const username: string = body?.username ?? "jkt48_kimmy";
    const slug: string | null = body?.slug ?? null;

    if (!slug) {
      return new Response(JSON.stringify({ stream_url: null, error: "slug is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const liveRoomUrl = `https://www.idn.app/${username}/live/${slug}`;
    console.log("[get-idn-stream] Fetching:", liveRoomUrl);

    const res = await fetch(liveRoomUrl, { headers: FETCH_HEADERS });
    const html = await res.text();

    let streamUrl = extractStreamUrl(html);

    if (!streamUrl) {
      streamUrl = extractStreamFromScriptTags(html);
    }

    if (!streamUrl) {
      const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i);
      if (nextDataMatch) {
        try {
          const nextData = JSON.parse(nextDataMatch[1]);
          const jsonStr = JSON.stringify(nextData);
          const m3u8Match =
            jsonStr.match(/(https?:\\\/\\\/[^"]+\.m3u8[^"]*)/i) ??
            jsonStr.match(/(https?:\/\/[^"]+\.m3u8[^"]*)/i);
          if (m3u8Match) {
            streamUrl = m3u8Match[1].replace(/\\\//g, "/");
          }
        } catch (e) {
          console.error("[NEXT_DATA] Parse error:", e);
        }
      }
    }

    console.log("[get-idn-stream] stream_url found:", streamUrl ? "YES" : "NO");

    return new Response(
      JSON.stringify({
        stream_url: streamUrl,
        live_room_url: liveRoomUrl,
        fetched_at: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("[get-idn-stream] Error:", error);
    return new Response(
      JSON.stringify({
        stream_url: null,
        error: "Failed to extract stream URL",
        fetched_at: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  }
});
