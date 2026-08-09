export const YOUTUBE_CONFIG = {
  apiKey: import.meta.env["VITE_YOUTUBE_API_KEY"] as string | undefined,

  idnPlaylistId: "PLfEpwox-vkk46x1M2ZWYba-uMDu-9d9BO",
  showroomPlaylistId: "PLfEpwox-vkk68ceU2bCtgrKHcC2coH4XD",

  channelHandle: "@48DailyLive",
  channelUrl: "https://www.youtube.com/@48DailyLive",

  cacheDurationMinutes: 30,
} as const;

export type PlatformType = "idn" | "showroom";
