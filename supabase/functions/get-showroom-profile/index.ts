import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { room_id } = await req.json();

    if (!room_id) {
      return new Response(JSON.stringify({ error: "room_id is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch(`https://www.showroom-live.com/api/room/profile?room_id=${room_id}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
        Referer: "https://www.showroom-live.com/",
      },
    });

    if (!res.ok) {
      throw new Error(`Showroom API responded with status ${res.status}`);
    }

    const data = await res.json();

    const followerNum: number = data?.follower_num ?? 0;
    const scoreNum: number = data?.live_score_num ?? data?.score ?? 0;
    const levelNum: number = data?.room_level ?? 0;

    return new Response(
      JSON.stringify({
        room_id: room_id,
        room_name: data?.room_name ?? null,
        main_name: data?.main_name ?? null,
        followers_raw: followerNum,
        score_raw: scoreNum,
        followers_formatted: formatNumber(followerNum),
        score_formatted: formatNumber(scoreNum),
        avatar_url: data?.image ?? null,
        checked_at: new Date().toISOString(),
        level_raw: levelNum,
        level_formatted: String(levelNum),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("get-showroom-profile error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
