// ─────────────────────────────────────────────────────────────────────────
// Content for the About page (src/pages/about).
// ─────────────────────────────────────────────────────────────────────────

import { playlistCovers } from "@/data/image";

// `profile` lives in data/home.ts (it's the site-wide identity source of
// truth used by both Home and About). Re-exported here so the About page
// can do `import { profile } from "@/data/about"` like every other page.
export { profile } from "@/data/home";

// Journey / history timeline. Not currently rendered on the page, kept here
// (ready to use) since it's About-page biography content.
export const timeline = [
  {
    year: "2023",
    title: "Mulai Belajar",
    desc: "Mulai belajar HTML, CSS, dan JavaScript dari nol.",
  },
  {
    year: "2024",
    title: "Masuk SMK RPL",
    desc: "Fokus ke pemrograman web dan dasar-dasar software engineering.",
  },
  {
    year: "2025",
    title: "Modding & Kolaborasi",
    desc: "Merilis mod Minecraft pertama dan bergabung membangun Equinox Interactive bersama teman.",
  },
  {
    year: "2026",
    title: "Portfolio & Game",
    desc: "Membangun portfolio penuh dan berkontribusi di game PvP co-op Box Siege.",
  },
];

// ─── My Playlists section ──────────────────────────────────────────────────
export interface YTTrack {
  title: string;
  artist: string;
  duration: string;
  videoId: string;
}
export interface SPTrack {
  title: string;
  artist: string;
  duration: string;
  trackId: string;
}
export interface YTPlaylist {
  id: string;
  name: string;
  cover: string;
  tracks: YTTrack[];
  url: string;
  accentColor: string;
}
export interface SPPlaylist {
  id: string;
  name: string;
  cover: string;
  tracks: SPTrack[];
  url: string;
  accentColor: string;
}

export const SP_GREEN = "#1DB954";

export const ytPlaylists: YTPlaylist[] = [
  {
    id: "yt-raavfy",
    name: "Raavfy Songs",
    cover: playlistCovers.youtube.raavfy,
    accentColor: "#7c3aed",
    url: "https://music.youtube.com/playlist?list=PLlusqwJxX40nnZWNJp_R00Oh0YjojKFR9&si=tjbz3mVDX63s1N8Y",
    tracks: [
      {
        title: "Kau Pilih Dia",
        artist: "Raavfy, Mas Jordan, Malikoendang",
        duration: "4:02",
        videoId: "nYefp88ahug",
      },
      { title: "Persetan", artist: "Raavfy", duration: "4:19", videoId: "2oQULwdi27I" },
      { title: "Berubah", artist: "Raavfy", duration: "3:53", videoId: "BsBx8TmO0sI" },
    ],
  },
  {
    id: "yt-english",
    name: "English Songs",
    cover: playlistCovers.youtube.english,
    accentColor: "#0ea5e9",
    url: "https://music.youtube.com/playlist?list=PLlusqwJxX40mkQFJAVQFbS_xCiZz3grK3&si=6dUgLGUTZIR2lu7O",
    tracks: [
      { title: "Those Eyes", artist: "New West", duration: "3:40", videoId: "YPeHGoGhHxg" },
      {
        title: "Cut My Fingers Off",
        artist: "Ethan Bortnick",
        duration: "2:19",
        videoId: "MX4PW0bHM2w",
      },
      { title: "From The Start", artist: "Laufey", duration: "2:49", videoId: "h8DeZSB2o-c" },
    ],
  },
  {
    id: "yt-jkt48",
    name: "JKT48 Songs",
    cover: playlistCovers.youtube.jkt48,
    accentColor: "#e11d48",
    url: "https://music.youtube.com/playlist?list=PLlusqwJxX40lDS5ViQN_vPXduLjPkMoRz&si=cYPB-QJM0PFSuhJP",
    tracks: [
      { title: "Sahabat atau Cinta", artist: "JKT48", duration: "4:06", videoId: "Sq0oSlmbDOc" },
      { title: "Dai Dai Dai", artist: "JKT48", duration: "3:34", videoId: "4_LDao9Aop8" },
      { title: "Ada Aku!", artist: "JKT48", duration: "4:26", videoId: "093VUafY4Po" },
    ],
  },
  {
    id: "yt-indonesia",
    name: "Indonesia Songs",
    cover: playlistCovers.youtube.indonesia,
    accentColor: "#d97706",
    url: "https://music.youtube.com/playlist?list=PLlusqwJxX40m_RClswTPLJx1lMlh5VCO2&si=Akjk12r6W2p5rUIl",
    tracks: [
      { title: "Di Batas Malam", artist: "Danilla", duration: "4:25", videoId: "HYSQ_3Ti86g" },
      { title: "Pecinta Wanita", artist: "Irwansyah", duration: "4:13", videoId: "Figow1PoksI" },
      { title: "Monolog", artist: "Pamungkas", duration: "3:27", videoId: "w_0RyTy-GlA" },
    ],
  },
];

export const spPlaylists: SPPlaylist[] = [
  {
    id: "sp-raavfy",
    name: "Raavfy Songs",
    cover: playlistCovers.spotify.raavfy,
    accentColor: "#7c3aed",
    url: "https://open.spotify.com/playlist/68mcR8wRMnnnoa69W85PIH",
    tracks: [
      {
        title: "Kau Pilih Dia",
        artist: "Raavfy, Mas Jordan, Malikoendang",
        duration: "4:01",
        trackId: "4EzaRRchzCQ2iRpWtbjBwD",
      },
      { title: "Persetan", artist: "Raavfy", duration: "4:19", trackId: "4yuMV2AQKsTuUhfxE8Ico9" },
      { title: "Berubah", artist: "Raavfy", duration: "3:53", trackId: "6xviSogMq7TaDFYviPh3Xs" },
    ],
  },
  {
    id: "sp-english",
    name: "English Songs",
    cover: playlistCovers.spotify.english,
    accentColor: "#0ea5e9",
    url: "https://open.spotify.com/playlist/3cm56kPrALzrJ2XayLL1Nw",
    tracks: [
      {
        title: "Those Eyes",
        artist: "New West",
        duration: "3:40",
        trackId: "50x1Ic8CaXkYNvjmxe3WXy",
      },
      {
        title: "Cut My Fingers Off",
        artist: "Ethan Bortnick",
        duration: "2:19",
        trackId: "5ARrWiDDRDocvURbemcnCy",
      },
      {
        title: "From The Start",
        artist: "Laufey",
        duration: "2:49",
        trackId: "43iIQbw5hx986dUEZbr3eN",
      },
    ],
  },
  {
    id: "sp-jkt48",
    name: "JKT48 Songs",
    cover: playlistCovers.spotify.jkt48,
    accentColor: "#e11d48",
    url: "https://open.spotify.com/playlist/2NbVci6S6mIHQFabr5AhGI",
    tracks: [
      {
        title: "Sahabat atau Cinta",
        artist: "JKT48",
        duration: "4:06",
        trackId: "6gmPSVwfO97scRd3UnDCUz",
      },
      {
        title: "Dai Dai Dai",
        artist: "JKT48",
        duration: "3:34",
        trackId: "6LcRqI57FUeEXgLD9fnegZ",
      },
      { title: "Ada Aku!", artist: "JKT48", duration: "4:26", trackId: "5anzL9URc82SrVbJZRFFpe" },
    ],
  },
  {
    id: "sp-indonesia",
    name: "Indonesia Songs",
    cover: playlistCovers.spotify.indonesia,
    accentColor: "#d97706",
    url: "https://open.spotify.com/playlist/1hbxHHaQq4WHS7znfyvsHz",
    tracks: [
      {
        title: "Di Batas Malam",
        artist: "Danilla",
        duration: "4:25",
        trackId: "57wJkQVl4krsMHaowArNgc",
      },
      {
        title: "Pecinta Wanita",
        artist: "Irwansyah",
        duration: "4:13",
        trackId: "0sMclGmddV8xeqBgI2k2yB",
      },
      {
        title: "Monolog",
        artist: "Pamungkas",
        duration: "3:27",
        trackId: "1zu5ZpnrSArdoaT6Qq3yo9",
      },
    ],
  },
];
