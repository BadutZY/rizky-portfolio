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

const JKT48CONNECT_API_KEY = "J-D55B";
const JKT48CONNECT_BASE_URL = "https://v2.jkt48connect.my.id/api";

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

function parseCount(raw: string): number | null {
  if (!raw) return null;
  const clean = raw.trim().replace(/,/g, "");
  const m = clean.match(/^([\d.]+)\s*([KkMmBb]?)$/);
  if (!m) return null;
  const num = parseFloat(m[1]);
  const suffix = m[2].toUpperCase();
  if (suffix === "K") return Math.round(num * 1_000);
  if (suffix === "M") return Math.round(num * 1_000_000);
  if (suffix === "B") return Math.round(num * 1_000_000_000);
  return Math.round(num);
}

function extractProfileFromHtml(html: string): {
  followers: number | null;
  following: number | null;
  display_name: string | null;
  avatar_url: string | null;
} {
  let followers: number | null = null;
  let following: number | null = null;
  let display_name: string | null = null;
  let avatar_url: string | null = null;

  const nextMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i);
  if (nextMatch) {
    try {
      const nextData = JSON.parse(nextMatch[1]);
      const jsonStr = JSON.stringify(nextData);

      const followerPatterns = [
        /"follower[s]?[_]?count"\s*:\s*(\d+)/i,
        /"fans[_]?count"\s*:\s*(\d+)/i,
        /"total[_]?follower[s]?"\s*:\s*(\d+)/i,
        /"subscribers[_]?count"\s*:\s*(\d+)/i,
      ];
      for (const p of followerPatterns) {
        const m = jsonStr.match(p);
        if (m) {
          followers = parseInt(m[1], 10);
          break;
        }
      }

      const followingPatterns = [
        /"following[_]?count"\s*:\s*(\d+)/i,
        /"total[_]?following"\s*:\s*(\d+)/i,
        /"followings[_]?count"\s*:\s*(\d+)/i,
      ];
      for (const p of followingPatterns) {
        const m = jsonStr.match(p);
        if (m) {
          following = parseInt(m[1], 10);
          break;
        }
      }

      const namePatterns = [
        /"display[_]?name"\s*:\s*"([^"]+)"/i,
        /"name"\s*:\s*"([^"]+)"/i,
        /"fullName"\s*:\s*"([^"]+)"/i,
      ];
      for (const p of namePatterns) {
        const m = jsonStr.match(p);
        if (m && m[1].length > 1) {
          display_name = m[1];
          break;
        }
      }

      const avatarPatterns = [
        /"avatar[_]?url"\s*:\s*"(https?:[^"]+)"/i,
        /"profile[_]?picture"\s*:\s*"(https?:[^"]+)"/i,
        /"photo[_]?url"\s*:\s*"(https?:[^"]+)"/i,
      ];
      for (const p of avatarPatterns) {
        const m = jsonStr.match(p);
        if (m) {
          avatar_url = m[1].replace(/\\\//g, "/");
          break;
        }
      }
    } catch (e) {
      console.error("[__NEXT_DATA__] parse error:", e);
    }
  }

  if (followers === null) {
    const patterns = [
      /"followers_count"\s*:\s*(\d+)/i,
      /data-followers="(\d+)"/i,
      /(\d[\d,.]+[KkMm]?)\s*(?:Follower|fans)/i,
    ];
    for (const p of patterns) {
      const m = html.match(p);
      if (m) {
        const n = parseCount(m[1]);
        if (n !== null) {
          followers = n;
          break;
        }
      }
    }
  }

  if (following === null) {
    const patterns = [
      /"following_count"\s*:\s*(\d+)/i,
      /data-following="(\d+)"/i,
      /(\d[\d,.]+[KkMm]?)\s*Following/i,
    ];
    for (const p of patterns) {
      const m = html.match(p);
      if (m) {
        const n = parseCount(m[1]);
        if (n !== null) {
          following = n;
          break;
        }
      }
    }
  }

  if (!display_name) {
    const ogTitle = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i);
    if (ogTitle) display_name = ogTitle[1].replace(/\s*[-|].*$/, "").trim();
  }
  if (!avatar_url) {
    const ogImg = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i);
    if (ogImg) avatar_url = ogImg[1];
  }

  return { followers, following, display_name, avatar_url };
}

async function getProfileFromJkt48Connect(username: string): Promise<{
  followers: number | null;
  following: number | null;
  display_name: string | null;
} | null> {
  try {
    const res = await fetch(
      `${JKT48CONNECT_BASE_URL}/idn/user?username=${username}&api_key=${JKT48CONNECT_API_KEY}`,
      { headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" } },
    );
    if (!res.ok) return null;
    const data = await res.json();

    const followers =
      data?.followers_count ??
      data?.follower_count ??
      data?.fans_count ??
      data?.data?.followers_count ??
      null;
    const following = data?.following_count ?? data?.data?.following_count ?? null;
    const display_name = data?.display_name ?? data?.name ?? data?.data?.display_name ?? null;

    return {
      followers: typeof followers === "number" ? followers : null,
      following: typeof following === "number" ? following : null,
      display_name: typeof display_name === "string" ? display_name : null,
    };
  } catch {
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
    let followers: number | null = null;
    let following: number | null = null;
    let display_name: string | null = null;
    let avatar_url: string | null = null;
    let source = "unknown";

    try {
      const res = await fetch(profileUrl, { headers: FETCH_HEADERS });
      const html = await res.text();
      const extracted = extractProfileFromHtml(html);
      followers = extracted.followers;
      following = extracted.following;
      display_name = extracted.display_name;
      avatar_url = extracted.avatar_url;
      if (followers !== null || following !== null) source = "idn_scrape";
    } catch (e) {
      console.error("[Profile scrape] Error:", e);
    }

    if (followers === null && following === null) {
      const jkt48Data = await getProfileFromJkt48Connect(username);
      if (jkt48Data) {
        if (followers === null) followers = jkt48Data.followers;
        if (following === null) following = jkt48Data.following;
        if (display_name === null) display_name = jkt48Data.display_name;
        if (followers !== null || following !== null) source = "jkt48connect";
      }
    }

    return new Response(
      JSON.stringify({
        username,
        display_name,
        avatar_url,
        followers,
        following,
        followers_formatted: followers !== null ? formatCount(followers) : null,
        following_formatted: following !== null ? formatCount(following) : null,
        source,
        fetched_at: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        username: "jkt48_kimmy",
        followers: null,
        following: null,
        followers_formatted: null,
        following_formatted: null,
        error: "Failed to fetch profile data",
        fetched_at: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  }
});
