// ─────────────────────────────────────────────────────────────────────────
// Centralised static asset imports (photos, videos, icons, cover art).
// Every data/*.ts file that needs an image imports it from here instead of
// reaching into src/assets directly — keeps all binary-asset wiring in one
// place, separate from the actual page content/copy.
// ─────────────────────────────────────────────────────────────────────────

import type { WifePersonKey } from "@/data/wife";

import rizkyAvatar from "@/assets/rizky/rizky.png";
import setupPhoto from "@/assets/rizky/setup.jpeg";

import eqnoxWebsite from "@/assets/rizky/project/eqnox-website.png";
import boxSiegeWebsite from "@/assets/rizky/project/box-siege-website.png";
import chainedWebsite from "@/assets/rizky/project/chained.png";
import jkt48Website from "@/assets/rizky/project/jkt48-website.png";
import jkt48Stream from "@/assets/rizky/project/jkt48-stream.png";
import taskManager from "@/assets/rizky/project/task-manager.png";
import classWebsite from "@/assets/rizky/project/class-website.png";
import badutzyWebsite from "@/assets/rizky/project/rizky-website.png";
import fritzyForce from "@/assets/rizky/project/fritzyforce-website.png";
import valoGuess from "@/assets/rizky/project/valo-guess-who.png";
import jkt48Guess from "@/assets/rizky/project/jkt48guesswho.png";
import werewolfCard from "@/assets/rizky/project/werewolf-card.png";
import modIcon from "@/assets/rizky/project/mod-icon.png";

import cpuImg from "@/assets/rizky/equipment/cpu.png";
import gpuImg from "@/assets/rizky/equipment/gpu.png";
import ramImg from "@/assets/rizky/equipment/ram.png";
import moboImg from "@/assets/rizky/equipment/mobo.png";
import storageImg from "@/assets/rizky/equipment/storage.png";
import psuImg from "@/assets/rizky/equipment/psu.png";
import caseImg from "@/assets/rizky/equipment/case.jpeg";
import coolingImg from "@/assets/rizky/equipment/cooling.webp";
import monitorImg from "@/assets/rizky/equipment/monitor.png";
import keyboardImg from "@/assets/rizky/equipment/keyboard.png";
import mouseImg from "@/assets/rizky/equipment/mouse.webp";
import headsetImg from "@/assets/rizky/equipment/headset.png";

import erine1 from "@/assets/rizky/wife/erine/erine1.jfif";
import erine2 from "@/assets/rizky/wife/erine/erine2.jfif";
import erine3 from "@/assets/rizky/wife/erine/erine3.jfif";
import erine4 from "@/assets/rizky/wife/erine/erine4.jfif";
import erine5 from "@/assets/rizky/wife/erine/erine5.jfif";
import erine6 from "@/assets/rizky/wife/erine/erine6.jfif";
import erine7 from "@/assets/rizky/wife/erine/erine7.jfif";
import erine8 from "@/assets/rizky/wife/erine/erine8.jfif";
import erine9 from "@/assets/rizky/wife/erine/erine9.jfif";
import erine10 from "@/assets/rizky/wife/erine/erine10.jfif";
import erine11 from "@/assets/rizky/wife/erine/erine11.jfif";
import erine12 from "@/assets/rizky/wife/erine/erine12.jfif";
import erine13 from "@/assets/rizky/wife/erine/erine13.jfif";

import kimmy1 from "@/assets/rizky/wife/kimmy/kimmy1.jfif";
import kimmy2 from "@/assets/rizky/wife/kimmy/kimmy2.jfif";
import kimmy3 from "@/assets/rizky/wife/kimmy/kimmy3.jfif";
import kimmy4 from "@/assets/rizky/wife/kimmy/kimmy4.jfif";
import kimmy5 from "@/assets/rizky/wife/kimmy/kimmy5.jfif";
import kimmy6 from "@/assets/rizky/wife/kimmy/kimmy6.jfif";
import kimmy7 from "@/assets/rizky/wife/kimmy/kimmy7.jfif";
import kimmy8 from "@/assets/rizky/wife/kimmy/kimmy8.jfif";
import kimmy9 from "@/assets/rizky/wife/kimmy/kimmy9.jfif";
import kimmy10 from "@/assets/rizky/wife/kimmy/kimmy10.jfif";
import kimmy11 from "@/assets/rizky/wife/kimmy/kimmy11.jfif";
import kimmy12 from "@/assets/rizky/wife/kimmy/kimmy12.jfif";
import kimmy13 from "@/assets/rizky/wife/kimmy/kimmy13.jfif";

import fritzy1 from "@/assets/rizky/wife/fritzy/fritzy1.jfif";
import fritzy2 from "@/assets/rizky/wife/fritzy/fritzy2.jfif";
import fritzy3 from "@/assets/rizky/wife/fritzy/fritzy3.jfif";
import fritzy4 from "@/assets/rizky/wife/fritzy/fritzy4.jfif";
import fritzy5 from "@/assets/rizky/wife/fritzy/fritzy5.jfif";
import fritzy6 from "@/assets/rizky/wife/fritzy/fritzy6.jfif";
import fritzy7 from "@/assets/rizky/wife/fritzy/fritzy7.jfif";
import fritzy8 from "@/assets/rizky/wife/fritzy/fritzy8.jfif";
import fritzy9 from "@/assets/rizky/wife/fritzy/fritzy9.jfif";
import fritzy10 from "@/assets/rizky/wife/fritzy/fritzy10.jfif";
import fritzy11 from "@/assets/rizky/wife/fritzy/fritzy11.jfif";
import fritzy12 from "@/assets/rizky/wife/fritzy/fritzy12.jfif";
import fritzy13 from "@/assets/rizky/wife/fritzy/fritzy13.jfif";

import idnLogoImg from "@/assets/rizky/icons/idn-logo.png";
import showroomLogoImg from "@/assets/rizky/icons/showroom-logo.png";
import fabricIconImg from "@/assets/rizky/icons/fabric.png";
import forgeIconImg from "@/assets/rizky/icons/forge.png";
import neoforgeIconImg from "@/assets/rizky/loader/neoforge.png";
import quiltIconImg from "@/assets/rizky/loader/quilt.png";

import boxSiegeVideoFile from "@/assets/rizky/game/boxsiege.mp4";

import equinoxMember from "@/assets/rizky/members/eqnox.jpg";
import badutzyMember from "@/assets/rizky/members/BadutZY.jpg";
import ariMember from "@/assets/rizky/members/Ari.jpg";
import swimmingFoxMember from "@/assets/rizky/members/SwimmingFOX.jpg";

import ytRaavfyCover from "@/assets/rizky/playlist/yt-music/Rv.jpg";
import ytEnglishCover from "@/assets/rizky/playlist/yt-music/Hendem.jpg";
import ytJkt48Cover from "@/assets/rizky/playlist/yt-music/Jkt.jpg";
import ytIndonesiaCover from "@/assets/rizky/playlist/yt-music/Indos.jpg";
import spRaavfyCover from "@/assets/rizky/playlist/spotify/Rv.jfif";
import spEnglishCover from "@/assets/rizky/playlist/spotify/hendem.jfif";
import spJkt48Cover from "@/assets/rizky/playlist/spotify/jkt.jfif";
import spIndonesiaCover from "@/assets/rizky/playlist/spotify/indos.jfif";

// ─── Home / About: profile photos ──────────────────────────────────────────
export const rizkyImages = {
  avatar: rizkyAvatar,
  setup: setupPhoto,
};

// ─── Project page: website & mod thumbnails ────────────────────────────────
export const projectImages: Record<string, string> = {
  "equinox-interactive": eqnoxWebsite,
  "box-siege-website": boxSiegeWebsite,
  "box-siege": boxSiegeWebsite,
  "chained-together": chainedWebsite,
  "jkt48-remake": jkt48Website,
  "jkt48-stream": jkt48Stream,
  "task-manager": taskManager,
  "class-website": classWebsite,
  "badutzy-website": badutzyWebsite,
  "fritzy-force-website": fritzyForce,
  "valorant-guess-who": valoGuess,
  "jkt48-guess-who": jkt48Guess,
  "werewolf-card": werewolfCard,
  "spawn-all-mod": modIcon,
};

// ─── Equipment page: hardware photos ───────────────────────────────────────
export const equipmentImages: Record<string, string> = {
  cpu: cpuImg,
  gpu: gpuImg,
  ram: ramImg,
  mobo: moboImg,
  storage: storageImg,
  psu: psuImg,
  case: caseImg,
  cooling: coolingImg,
  monitor: monitorImg,
  keyboard: keyboardImg,
  mouse: mouseImg,
  headset: headsetImg,
};

const erinePhotos = [
  erine1,
  erine2,
  erine3,
  erine4,
  erine5,
  erine6,
  erine7,
  erine8,
  erine9,
  erine10,
  erine11,
  erine12,
  erine13,
];

const kimmyPhotos = [
  kimmy1,
  kimmy2,
  kimmy3,
  kimmy4,
  kimmy5,
  kimmy6,
  kimmy7,
  kimmy8,
  kimmy9,
  kimmy10,
  kimmy11,
  kimmy12,
  kimmy13,
];

const fritzyPhotos = [
  fritzy1,
  fritzy2,
  fritzy3,
  fritzy4,
  fritzy5,
  fritzy6,
  fritzy7,
  fritzy8,
  fritzy9,
  fritzy10,
  fritzy11,
  fritzy12,
  fritzy13,
];

export const wifePhotos: Record<WifePersonKey, string[]> = {
  erine: erinePhotos,
  kimmy: kimmyPhotos,
  fritzy: fritzyPhotos,
};

// ─── Wife page: live-status platform logos ─────────────────────────────────
export const platformLogos = {
  idn: idnLogoImg,
  showroom: showroomLogoImg,
};

// ─── Skill page: modloader icons ───────────────────────────────────────────
export const loaderIcons = {
  fabric: fabricIconImg,
  forge: forgeIconImg,
  neoforge: neoforgeIconImg,
  quilt: quiltIconImg,
};

// ─── Project page: Box Siege trailer ───────────────────────────────────────
export const boxSiegeVideo = boxSiegeVideoFile;

// ─── Project page: team member avatars ─────────────────────────────────────
export const teamMembers = {
  equinox: equinoxMember,
  badutzy: badutzyMember,
  ari: ariMember,
  swimmingFox: swimmingFoxMember,
};

// ─── About page: playlist cover art ────────────────────────────────────────
export const playlistCovers = {
  youtube: {
    raavfy: ytRaavfyCover,
    english: ytEnglishCover,
    jkt48: ytJkt48Cover,
    indonesia: ytIndonesiaCover,
  },
  spotify: {
    raavfy: spRaavfyCover,
    english: spEnglishCover,
    jkt48: spJkt48Cover,
    indonesia: spIndonesiaCover,
  },
};