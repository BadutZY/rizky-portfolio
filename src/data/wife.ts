// ─────────────────────────────────────────────────────────────────────────
// Content for the Wife page (src/pages/wife). Now holds 3 profiles that
// share the exact same page layout/style — only the content differs:
//   E = Erine, K = Kimmy, F = Fritzy
// `kimmy` keeps the real data that was already here. `erine` and `fritzy`
// are DUMMY placeholders (bio, social links) — fill them in yourself.
// ─────────────────────────────────────────────────────────────────────────

export type WifePersonKey = "erine" | "kimmy" | "fritzy";

export interface WifeBioField {
  label: string;
  value: string;
}

export interface WifeSocialLink {
  label: string;
  href: string;
}

export interface WifeProfile {
  code: "E" | "K" | "F";
  name: string;
  alias: string;
  bio: WifeBioField[];
  socialLinks: WifeSocialLink[];
}

export const wifeProfiles: Record<WifePersonKey, WifeProfile> = {
  erine: {
    code: "E",
    name: "Catherina Vallencia Kurniawan",
    alias: "Erine",
    bio: [
      { label: "Name", value: "Catherina Vallencia Kurniawan (Erine)" },
      { label: "Birthday", value: "August 21, 2007 (Age 20)" },
      { label: "Hometown", value: "Jakarta, Indonesia" },
      { label: "Blood Type", value: "B" },
      { label: "Zodiac", value: "♌︎ Leo" },
      { label: "Height", value: "162 cm" },
      { label: "Status", value: "BadutZY's Wife" },
    ],
    socialLinks: [
      { label: "Instagram", href: "https://www.instagram.com/jkt48.erine" },
      { label: "TikTok", href: "https://www.tiktok.com/@jkt48.erine_" },
      { label: "X", href: "https://x.com/CErine_JKT48" },
      { label: "Threads", href: "https://www.threads.com/@jkt48.erine" },
      { label: "Showroom", href: "https://www.showroom-live.com/room/profile?room_id=510000" },
      { label: "IDN Live", href: "https://www.idn.app/jkt48_erine" },
    ],
  },

  kimmy: {
    code: "K",
    name: "Victoria Kimberly Lukitama",
    alias: "Kimmy",
    bio: [
      { label: "Name", value: "Victoria Kimberly Lukitama (Kimmy)" },
      { label: "Birthday", value: "March 8, 2010 (Age 16)" },
      { label: "Hometown", value: "Jakarta, Indonesia" },
      { label: "Blood Type", value: "AB" },
      { label: "Zodiac", value: "♓︎ Pisces" },
      { label: "Height", value: "162 cm" },
      { label: "Status", value: "BadutZY's Wife" },
    ],
    socialLinks: [
      { label: "Instagram", href: "https://www.instagram.com/jkt48.kimmy" },
      { label: "TikTok", href: "https://www.tiktok.com/@jkt48.kimmy" },
      { label: "X", href: "https://x.com/Kimmy_JKT48?s=20" },
      { label: "Threads", href: "https://www.threads.com/@jkt48.kimmy" },
      { label: "Showroom", href: "https://www.showroom-live.com/room/profile?room_id=510073" },
      { label: "IDN Live", href: "https://www.idn.app/jkt48_kimmy" },
    ],
  },

  fritzy: {
    code: "F",
    name: "Fritzy Rosmerian",
    alias: "Fritzy",
    bio: [
      { label: "Name", value: "Fritzy Rosmerian (Fritzy)" },
      { label: "Birthday", value: "July 28, 2008 (Age 19)" },
      { label: "Hometown", value: "Jakarta, Indonesia" },
      { label: "Blood Type", value: "A" },
      { label: "Zodiac", value: "♌︎ Leo" },
      { label: "Height", value: "155 cm" },
      { label: "Status", value: "BadutZY's Wife" },
    ],
    socialLinks: [
      { label: "Instagram", href: "https://www.instagram.com/jkt48.fritzy.r" },
      { label: "TikTok", href: "https://www.tiktok.com/@jkt48.fritzy" },
      { label: "X", href: "https://x.com/RFritzy_JKT48" },
      { label: "Threads", href: "https://www.threads.com/@jkt48.fritzy.r" },
      { label: "Showroom", href: "https://www.showroom-live.com/room/profile?room_id=510011" },
      { label: "IDN Live", href: "https://www.idn.app/jkt48_fritzy" },
    ],
  },
};

export const wifeNavOrder: WifePersonKey[] = ["erine", "kimmy", "fritzy"];
export const wifeRoutes: Record<WifePersonKey, string> = {
  erine: "/wife/erine",
  kimmy: "/wife",
  fritzy: "/wife/fritzy",
};