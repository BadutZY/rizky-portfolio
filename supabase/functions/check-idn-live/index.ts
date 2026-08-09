import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const JKT48CONNECT_API_KEY = "J-D55B";
const JKT48CONNECT_BASE_URL = "https://v2.jkt48connect.my.id/api";

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "id-ID,id;q=0.9,en;q=0.8",
};

function extractSlugFromHtml(html: string, username: string): string | null {
  const patterns = [
    new RegExp(`/${username}/live/([\\w-]+)`, "i"),
    /"slug"\s*:\s*"([\w-]+)"/i,
    new RegExp(`"live_url"\\s*:\\s*"https://www\\.idn\\.app/${username}/live/([\\w-]+)"`, "i"),
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m) return m[1];
  }
  return null;
}

function extractStreamUrlFromHtml(html: string): string | null {
  const patterns = [
    /"stream_url"\s*:\s*"(https?:\/\/[^"]+\.m3u8[^"]*)"/i,
    /"playback_url"\s*:\s*"(https?:\/\/[^"]+\.m3u8[^"]*)"/i,
    /"hls_url"\s*:\s*"(https?:\/\/[^"]+\.m3u8[^"]*)"/i,
    /"url"\s*:\s*"(https?:\/\/[^"]+\.m3u8[^"]*)"/i,
    /"stream_url"\s*:\s*"(https?:\\\/\\\/[^"]+\.m3u8[^"]*)"/i,
    /"playback_url"\s*:\s*"(https?:\\\/\\\/[^"]+\.m3u8[^"]*)"/i,
    /(https?:\/\/[a-zA-Z0-9._\-\/]+\.m3u8(?:\?[^"'\s]*)?)/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m) {
      return m[1].replace(/\\\//g, "/");
    }
  }
  return null;
}

async function getLiveDataFromJkt48Connect(
  username: string,
): Promise<{ slug: string | null; stream_url: string | null }> {
  try {
    const res = await fetch(`${JKT48CONNECT_BASE_URL}/live/idn?api_key=${JKT48CONNECT_API_KEY}`, {
      headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" },
    });
    if (!res.ok) return { slug: null, stream_url: null };

    const data = await res.json();
    const list: any[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.lives)
          ? data.lives
          : Array.isArray(data?.live)
            ? data.live
            : [];

    const entry = list.find((item: any) => {
      const candidates = [
        item?.user?.username,
        item?.username,
        item?.idn_username,
        item?.member?.idn_username,
        item?.member?.username,
        item?.streamer?.username,
        item?.account_id,
      ]
        .filter(Boolean)
        .map((v: string) => v.toLowerCase());
      return candidates.includes(username.toLowerCase());
    });

    if (!entry) return { slug: null, stream_url: null };

    let stream_url: string | null = null;
    for (const f of ["stream_url", "playback_url", "hls_url", "live_url"]) {
      const v = entry?.[f] ?? entry?.user?.[f] ?? entry?.stream?.[f];
      if (v && typeof v === "string" && v.includes(".m3u8")) {
        stream_url = v;
        break;
      }
    }

    let slug: string | null = null;
    for (const f of ["slug", "live_slug", "stream_key", "live_id"]) {
      if (entry[f]) {
        const raw = String(entry[f]);
        slug = raw.startsWith("http") ? (raw.match(/\/live\/([\w-]+)/)?.[1] ?? null) : raw;
        break;
      }
    }

    return { slug, stream_url };
  } catch (e) {
    console.error("[JKT48Connect] Error:", e);
    return { slug: null, stream_url: null };
  }
}

async function scrapeStreamUrlFromLiveRoom(username: string, slug: string): Promise<string | null> {
  try {
    const liveRoomUrl = `https://www.idn.app/${username}/live/${slug}`;
    const res = await fetch(liveRoomUrl, { headers: FETCH_HEADERS });
    const html = await res.text();
    return extractStreamUrlFromHtml(html);
  } catch (e) {
    console.error("[LiveRoom scrape] Error:", e);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let username = "jkt48_kimmy";
    try {
      const body = await req.json();
      if (body?.username) username = body.username;
    } catch {
      /**/
    }

    const profileUrl = `https://www.idn.app/${username}`;
    let profileHtml = "";
    let isLiveFromProfile = false;

    try {
      const profileRes = await fetch(profileUrl, { headers: FETCH_HEADERS });
      profileHtml = await profileRes.text();

      const liveIndicators = [
        "sedang live",
        "is-live",
        "live-badge",
        "live-room",
        "btn-watch-live",
        "live_stream",
        "playback_url",
        '"isLive":true',
        '"is_live":true',
        'data-live="true"',
        'class="live"',
        "LIVE</span>",
        "LIVE</div>",
        "LIVE</p>",
        `/${username}/live/`,
      ];
      const htmlLower = profileHtml.toLowerCase();
      isLiveFromProfile = liveIndicators.some((ind) => htmlLower.includes(ind.toLowerCase()));
    } catch (e) {
      console.error("[Profile scrape] Error:", e);
    }

    let isLiveFromHomepage = false;
    let homepageHtml = "";

    try {
      const homepageRes = await fetch("https://www.idn.app/?category=jkt48", {
        headers: FETCH_HEADERS,
      });
      homepageHtml = await homepageRes.text();
      if (
        homepageHtml.includes(username) &&
        (homepageHtml.includes("live/") || homepageHtml.includes("live-room"))
      ) {
        isLiveFromHomepage = true;
      }
    } catch (e) {
      console.error("[Homepage scrape] Error:", e);
    }

    const finalIsLive = isLiveFromProfile || isLiveFromHomepage;

    let liveUrl: string | null = null;
    let streamUrl: string | null = null;

    if (finalIsLive) {
      let slug =
        extractSlugFromHtml(profileHtml, username) ?? extractSlugFromHtml(homepageHtml, username);

      streamUrl = extractStreamUrlFromHtml(profileHtml) ?? extractStreamUrlFromHtml(homepageHtml);

      if (!slug || !streamUrl) {
        const jkt48Data = await getLiveDataFromJkt48Connect(username);
        if (!slug) slug = jkt48Data.slug;
        if (!streamUrl) streamUrl = jkt48Data.stream_url;
      }

      if (slug && !streamUrl) {
        streamUrl = await scrapeStreamUrlFromLiveRoom(username, slug);
      }

      liveUrl = slug ? `https://www.idn.app/${username}/live/${slug}` : profileUrl;
    }

    return new Response(
      JSON.stringify({
        is_live: finalIsLive,
        username,
        live_url: liveUrl,
        stream_url: streamUrl,
        checked_at: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        is_live: false,
        live_url: null,
        stream_url: null,
        error: "Failed to check IDN live status",
        checked_at: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  }
});
