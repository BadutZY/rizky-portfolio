import { projectImages, teamMembers, boxSiegeVideo } from "@/data/image";

// Local (non-Modrinth) mod files — bundled with this build so the mod can be
// downloaded even though it isn't published publicly on Modrinth.
import spawnAllJar from "@/assets/rizky/mod/spawn-all-1.0.0.jar?url";
import spawnAllMd from "@/assets/rizky/mod/spawnall.md?raw";

// ─── Website projects ───────────────────────────────────────────────────────
export interface WebsiteProject {
  id: number;
  slug: string;
  title: string;
  category: "Website";
  lang: string;
  image: string;
  link: string;
  description: string;
  fullDescription: string;
  isContribution?: boolean;
  role?: string;
}

export const REGULAR_WEBSITE_PROJECTS: WebsiteProject[] = [
  {
    id: 1,
    slug: "jkt48-remake",
    title: "JKT48 Remake",
    category: "Website",
    lang: "HTML / CSS / JS",
    image: projectImages["jkt48-remake"]!,
    link: "https://jkt48-website.vercel.app/",
    description: "Fan site",
    fullDescription:
      "A fan-made website for JKT48 featuring member profiles, event schedules, news updates.",
  },
  {
    id: 2,
    slug: "jkt48-stream",
    title: "JKT48 Stream",
    category: "Website",
    lang: "TypeScript / React / Tailwind / Supabase",
    image: projectImages["jkt48-stream"]!,
    link: "https://jkt48-stream.vercel.app",
    description: "Fanbase website",
    fullDescription: "This is a fan-made website created for watch JKT48 Videos.",
  },
  {
    id: 3,
    slug: "task-manager",
    title: "Task Manager",
    category: "Website",
    lang: "HTML / CSS / JS / Local Storage",
    image: projectImages["task-manager"]!,
    link: "https://task-web-snowy.vercel.app/",
    description: "Task manager",
    fullDescription: "Website to remind me about unfinished tasks.",
  },
  {
    id: 4,
    slug: "class-website",
    title: "Class Website",
    category: "Website",
    lang: "TypeScript / React / Tailwind",
    image: projectImages["class-website"]!,
    link: "https://rpl2.vercel.app/",
    description: "Class website",
    fullDescription: "Website for my class schedule and duty schedule.",
  },
  {
    id: 5,
    slug: "badutzy-website",
    title: "BadutZY Website",
    category: "Website",
    lang: "TypeScript / React / Tailwind / Supabase",
    image: projectImages["badutzy-website"]!,
    link: "https://badutzy.vercel.app/",
    description: "Portfolio Website",
    fullDescription: "Portfolio website to showcase projects.",
  },
  {
    id: 6,
    slug: "fritzy-force-website",
    title: "Fritzy Force Website",
    category: "Website",
    lang: "TypeScript / React / Tailwind / Supabase",
    image: projectImages["fritzy-force-website"]!,
    link: "https://fritzyforce.vercel.app/",
    description: "Fanbase Website",
    fullDescription: "Remake of Fritzy Force Website.",
  },
  {
    id: 7,
    slug: "valorant-guess-who",
    title: "Valorant Guess Who",
    category: "Website",
    lang: "TypeScript / React / Tailwind / Supabase",
    image: projectImages["valorant-guess-who"]!,
    link: "https://valorantguesswho.vercel.app/",
    description: "Game Website",
    fullDescription: "A fun guessing game based on Valorant agents, weapon, maps, and abilities.",
  },
  {
    id: 8,
    slug: "jkt48-guess-who",
    title: "JKT48 Member Guess Who",
    category: "Website",
    lang: "TypeScript / React / Tailwind / Supabase",
    image: projectImages["jkt48-guess-who"]!,
    link: "https://jkt48guesswho.vercel.app/",
    description: "Game Website",
    fullDescription: "A fun guessing game based on JKT48 members.",
  },
  {
    id: 9,
    slug: "werewolf-card",
    title: "Werewolf Card",
    category: "Website",
    lang: "TypeScript / React / Tailwind",
    image: projectImages["werewolf-card"]!,
    link: "https://card-werewolf.vercel.app/",
    description: "Game Website",
    fullDescription: "website for werewolf card role selection.",
  },
];

export const CONTRIBUTION_WEBSITE_PROJECTS: WebsiteProject[] = [
  {
    id: 100,
    slug: "equinox-interactive",
    title: "Equinox Interactive",
    category: "Website",
    isContribution: true,
    role: "Game & Web Developer",
    lang: "TypeScript / React / Tailwind",
    image: projectImages["equinox-interactive"]!,
    link: "https://equinoxinteractive.vercel.app/",
    description: "Company Website",
    fullDescription: "Website from the team that I created with my friend to make games.",
  },
  {
    id: 101,
    slug: "box-siege-website",
    title: "Box Siege",
    category: "Website",
    isContribution: true,
    role: "Game & Web Developer",
    lang: "TypeScript / React / Tailwind",
    image: projectImages["box-siege-website"]!,
    link: "https://boxsiege.vercel.app/",
    description: "Game Website",
    fullDescription: "website to introduce games.",
  },
  {
    id: 102,
    slug: "chained-together",
    title: "Chained Together",
    category: "Website",
    isContribution: true,
    role: "Web Developer",
    lang: "TypeScript / React / Tailwind",
    image: projectImages["chained-together"]!,
    link: "https://chained-together.vercel.app/",
    description: "E-Commerce website",
    fullDescription: "website for e-commerce.",
  },
];

// ─── Mod projects ────────────────────────────────────────────────────────────
export type ModStatus = "public" | "private" | "unlisted" | "under_review";
export type ReleaseType = "alpha" | "beta" | "release";

export interface ModDownloadEntry {
  name: string;
  version_number: string;
  game_versions: string[];
  loaders: string[];
  filename: string;
  filePath: string;
  release_type?: ReleaseType;
}

export interface ModProjectData {
  id: number;
  slug?: string;
  title: string;
  category: "Mod";
  lang: string;
  image: string;
  modIcon?: string;
  link: string;
  description: string;
  modDescription?: string;
  fullDescription: string;
  markdownFile?: string;
  downloads?: number;
  likes?: number;
  updatedAgo?: string;
  loaders?: string[];
  tags?: string[];
  versions?: string[];
  status?: ModStatus;
  staticDownloads?: ModDownloadEntry[];
}

// Mods that aren't published on Modrinth (kept local, bundled with this site).
export const STATIC_MOD_PROJECTS: ModProjectData[] = [
  {
    id: 200,
    title: "Spawn All MOD",
    category: "Mod",
    lang: "Java / Fabric",
    image: projectImages["spawn-all-mod"]!,
    modIcon: projectImages["spawn-all-mod"]!,
    link: "https://github.com/BadutZY/spawn-all-mod-template",
    description: "All spawn eggs can be spawn in the spawner.",
    modDescription: "All spawn eggs can be spawn in the spawner.",
    fullDescription: "All spawn eggs can be spawn in the spawner.",
    markdownFile: spawnAllMd,
    downloads: 0,
    likes: 0,
    tags: ["Client & Server", "Game Mechanics"],
    loaders: ["Fabric"],
    versions: ["1.21.4"],
    status: "private",
    staticDownloads: [
      {
        name: "Spawn All",
        version_number: "1.0.0",
        game_versions: ["1.21.4"],
        loaders: ["Fabric"],
        filename: "spawn-all-1.0.0.jar",
        filePath: spawnAllJar,
        release_type: "beta",
      },
    ],
  },
];

// ─── Game projects ───────────────────────────────────────────────────────────
export interface SocialLink {
  platform: "youtube" | "tiktok" | "instagram" | "github" | "website";
  url: string;
  label?: string;
}

export interface TeamMemberData {
  name: string;
  role?: string;
  avatar?: string;
  socials?: SocialLink[];
}

export interface DeveloperTeam {
  name: string;
  logo?: string;
  website?: string;
  members?: TeamMemberData[];
}

export interface GameProjectData {
  id: number;
  title: string;
  category: "Game";
  isContribution?: boolean;
  role?: string;
  developerTeam?: DeveloperTeam;
  lang: string;
  image: string;
  video?: string;
  link: string;
  description: string;
  fullDescription: string;
  genre?: string[];
  platform?: string[];
  engine?: string;
  version?: string;
  fileSize?: string;
  features?: string[];
  markdownFile?: string;
  minSpecs?: {
    os?: string;
    processor?: string;
    memory?: string;
    graphics?: string;
    storage?: string;
  };
}

// My own games (none shipped solo yet).
export const GAME_PROJECTS: GameProjectData[] = [];

export const CONTRIBUTION_GAME_PROJECTS: GameProjectData[] = [
  {
    id: 300,
    title: "Box Siege",
    category: "Game",
    isContribution: true,
    role: "Game Developer",
    developerTeam: {
      name: "Equinox Interactive",
      logo: teamMembers.equinox,
      website: "https://equinoxinteractive.vercel.app/",
      members: [
        {
          avatar: teamMembers.badutzy,
          name: "BadutZY",
          role: "Game Programmer",
          socials: [
            { platform: "github", url: "https://github.com/BadutZY" },
            { platform: "instagram", url: "https://www.instagram.com/rzky.mp_36/" },
            { platform: "website", url: "https://badutzy.vercel.app/" },
          ],
        },
        {
          avatar: teamMembers.ari,
          name: "Ari8Bit",
          role: "Sound Designer",
          socials: [
            { platform: "github", url: "https://github.com/AriAja17" },
            { platform: "youtube", url: "https://www.youtube.com/@AriAja17" },
            { platform: "website", url: "https://ariaja.pages.dev/" },
          ],
        },
        {
          avatar: teamMembers.swimmingFox,
          name: "SwimmingFox",
          role: "Sprite Artist",
          socials: [
            { platform: "github", url: "https://github.com/Marrwertz" },
            { platform: "instagram", url: "https://www.instagram.com/swimmingfoxx_/" },
          ],
        },
      ],
    },
    lang: "C# / Unity",
    image: projectImages["box-siege"]!,
    video: boxSiegeVideo,
    link: "https://boxsiege.vercel.app/",
    description: "PvP Co-op game",
    fullDescription:
      "Immerse yourself in the ultimate PvP co-op 2D experience with Box Siege, exclusively available for Windows PC.",
    genre: ["PvP"],
    platform: ["Windows"],
    engine: "Unity",
    version: "1.5-beta",
    fileSize: "100 MB",
    features: ["Built entirely with Unity & C#", "Developed by a small indie team"],
    minSpecs: {
      os: "Windows 10+",
      processor: "Dual Core 2GHz",
      memory: "6 GB RAM",
      graphics: "512MB VRAM",
      storage: "500 MB available space",
    },
  },
];

export const categories = [
  { key: "all", label: "All Projects" },
  { key: "Website", label: "Website" },
  { key: "Mod", label: "Mod" },
  { key: "Game", label: "Game" },
] as const;

// ─── Live Preview (browser mockup) sites ───────────────────────────────────
export const PREVIEW_SITES = [
  {
    id: 1,
    title: "JKT48 Stream",
    description: "Watch JKT48 videos",
    url: "https://jkt48-stream.vercel.app",
    color: "#eb1a1a",
    badge: "React · TypeScript · Supabase",
  },
  {
    id: 2,
    title: "BadutZY Website",
    description: "Personal portfolio website",
    url: "https://badutzy.vercel.app/",
    color: "#727272",
    badge: "React · TypeScript · Supabase",
  },
  {
    id: 3,
    title: "Box Siege Website",
    description: "Game website",
    url: "https://boxsiege.vercel.app/",
    color: "#0871c7",
    badge: "React · Tailwind · TypeScript",
  },
] as const;
