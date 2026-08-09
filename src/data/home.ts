// ─────────────────────────────────────────────────────────────────────────
// Content for the Home / landing page (src/pages/home).
// `profile` is also the single source of truth for identity info reused on
// the About page (src/data/about.ts) and in the site Footer.
// ─────────────────────────────────────────────────────────────────────────

export const profile = {
  handle: "badutzy",
  name: "Rizky Maulana Putra",
  alias: "BadutZY",
  role: "Beginner Programmer",
  tagline:
    "A beginner programmer just starting out on my coding journey. I've created websites, mods, and released games. Every project is a new opportunity to learn and grow.",
  location: "Bogor, Indonesia",
  status: "Keep Learning",
  age: "17 Years",
  education: "SMK (Vocational High School)",
  major: "RPL (Rekayasa Perangkat Lunak / Software Engineering)",
  birthday: "March 6, 2009",
  quote: "Don't be afraid to fail. Be afraid not to try.",
  aboutText:
    "I'm a beginner programmer learning programming languages. I strive to create engaging and functional websites, games, and mods. Every project is a new opportunity to learn and grow.",
  stats: [
    { label: "Projects", value: "12+" },
    { label: "Mods Released", value: "10+" },
    { label: "Games Shipped", value: "1+" },
    { label: "Tech Stack", value: "X" },
  ],
};

// "ABOUT" summary cards shown in the Home page's second section.
export const values = [
  {
    title: "Keep Learning",
    desc: "Setiap project, sekecil apapun, adalah kesempatan baru untuk belajar dan berkembang.",
  },
  { title: "Random Quotes", desc: '"Don\'t be afraid to fail. Be afraid not to try."' },
  {
    title: "Ship It",
    desc: "Website, mod, atau game lebih baik dirilis dan dipakai daripada disimpan tanpa akhir.",
  },
];

// Short project summary type used only for the Home page's "PROJECT" preview
// section (3 featured cards). The full, detailed project data used on the
// Project page itself lives in src/data/project.ts.
export type FeaturedProject = {
  slug: string;
  title: string;
  category: "Website" | "Game" | "Mod";
  year: string;
  summary: string;
  detail: string;
  stack: string[];
  role: string;
  status: "Live" | "In Progress" | "Archived";
  isContribution: boolean;
  link?: string;
  image?: string;
  highlights: string[];
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "game",
    title: "Game",
    category: "Game",
    year: "2025 - 2026",
    summary: "Game yang saya buat.",
    detail:
      "Immerse yourself in the ultimate PvP co-op 2D experience with Box Siege, exclusively available for Windows PC. Built entirely with Unity & C# by a small indie team (Equinox Interactive).",
    stack: ["Unity", "C#"],
    role: "Game Developer",
    status: "In Progress",
    isContribution: true,
    link: "https://boxsiege.vercel.app/",
    highlights: [
      "Built entirely with Unity & C#",
      "Developed by a small indie team, Equinox Interactive",
      "Genre: PvP · Platform: Windows · Version 1.5-beta",
    ],
  },
  {
    slug: "mods",
    title: "Mods",
    category: "Mod",
    year: "2025 - 2026",
    summary: "Beberapa Minecraft mod yang saya buat.",
    detail:
      "A Fabric mod for Minecraft 1.21.4 that allows all spawn eggs to be placed and used inside a mob spawner, opening up custom farm and mechanic possibilities.",
    stack: ["Java", "Fabric", "Forge"],
    role: "Solo Developer",
    status: "Live",
    isContribution: false,
    link: "https://github.com/BadutZY/spawn-all-mod-template",
    highlights: [
      "Client & Server compatible",
      "Category: Game Mechanics",
      "Supports Minecraft 1.21.4 (Fabric)",
    ],
  },
  {
    slug: "website",
    title: "Website ",
    category: "Website",
    year: "2023 - 2026",
    summary: "Beberapa Website yang saya buat.",
    detail: "Website from the team that I created with my friend to make games.",
    stack: ["HTML", "JAVA SCRIPT", "REACT"],
    role: "Game & Web Developer",
    status: "Live",
    isContribution: true,
    link: "https://equinoxinteractive.vercel.app/",
    highlights: ["Company profile for Equinox Interactive", "Showcases the team's game projects"],
  },
];
