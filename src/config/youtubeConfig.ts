// ─────────────────────────────────────────────────────────────────────────
// YouTube config. `wifePlaylists` holds the IDN Live + Showroom replay
// playlist for each "wife" tab (E = Erine, K = Kimmy, F = Fritzy).
// Add/replace playlist IDs here — the Wife page reads from this object
// based on the `person` it's rendering, so nothing else needs to change.
// ─────────────────────────────────────────────────────────────────────────

export type WifePersonKey = "erine" | "kimmy" | "fritzy";

export interface WifePlaylistPair {
  idnPlaylistId: string;
  showroomPlaylistId: string;
}

export const YOUTUBE_CONFIG = {
  apiKey: import.meta.env["VITE_YOUTUBE_API_KEY"] as string | undefined,

  wifePlaylists: {
    erine: {
      showroomPlaylistId: "PLfEpwox-vkk4ff25HS0IJVXUEqn7RoN18",
      idnPlaylistId: "PLfEpwox-vkk7ZcZMO8FjW0B_gRUfOBCZh",
    },
    kimmy: {
      idnPlaylistId: "PLfEpwox-vkk46x1M2ZWYba-uMDu-9d9BO",
      showroomPlaylistId: "PLfEpwox-vkk68ceU2bCtgrKHcC2coH4XD",
    },
    fritzy: {
      showroomPlaylistId: "PLfEpwox-vkk7mhss2LaUefd-HFzbgs3I9",
      idnPlaylistId: "PLfEpwox-vkk5IHfrpgRLnP_Ao69igmM4v",
    },
  } as Record<WifePersonKey, WifePlaylistPair>,

  channelHandle: "@48DailyLive",
  channelUrl: "https://www.youtube.com/@48DailyLive",

  cacheDurationMinutes: 30,
} as const;

export type PlatformType = "idn" | "showroom";