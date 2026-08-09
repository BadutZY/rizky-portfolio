// ─────────────────────────────────────────────────────────────────────────
// Centralised static asset imports (photos, videos, icons, cover art).
// Every data/*.ts file that needs an image imports it from here instead of
// reaching into src/assets directly — keeps all binary-asset wiring in one
// place, separate from the actual page content/copy.
// ─────────────────────────────────────────────────────────────────────────

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

import kimmy1 from "@/assets/rizky/wife/kimmy1.jfif";
import kimmy2 from "@/assets/rizky/wife/kimmy2.jfif";
import kimmy3 from "@/assets/rizky/wife/kimmy3.jfif";
import kimmy4 from "@/assets/rizky/wife/kimmy4.jfif";
import kimmy5 from "@/assets/rizky/wife/kimmy5.jfif";
import kimmy6 from "@/assets/rizky/wife/kimmy6.jfif";
import kimmy7 from "@/assets/rizky/wife/kimmy7.jfif";
import kimmy8 from "@/assets/rizky/wife/kimmy8.jfif";
import kimmy9 from "@/assets/rizky/wife/kimmy9.jfif";
import kimmy10 from "@/assets/rizky/wife/kimmy10.jfif";
import kimmy11 from "@/assets/rizky/wife/kimmy11.jfif";
import kimmy12 from "@/assets/rizky/wife/kimmy12.jfif";
import kimmy13 from "@/assets/rizky/wife/kimmy13.jfif";

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

// ─── Wife page: photo gallery ───────────────────────────────────────────────
export const wifePhotos = [
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
