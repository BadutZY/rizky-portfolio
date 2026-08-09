// ─────────────────────────────────────────────────────────────────────────
// Content for the Skill page (src/pages/skills).
// ─────────────────────────────────────────────────────────────────────────

export type Skill = {
  name: string;
  level: number;
  group: "Frontend" | "Backend" | "Tools";
  note: string;
};

// Short skill summary (kept for potential compact/summary displays; not
// currently rendered on any page — the Skill page uses `skillCategories`
// below instead).
export const skills: Skill[] = [
  {
    name: "HTML & CSS",
    level: 45,
    group: "Frontend",
    note: "Struktur & styling dasar halaman web.",
  },
  { name: "JavaScript", level: 45, group: "Frontend", note: "Interaksi & logika di sisi client." },
  { name: "React", level: 45, group: "Frontend", note: "Component-driven UI untuk web modern." },
  {
    name: "Tailwind CSS",
    level: 45,
    group: "Frontend",
    note: "Utility-first styling yang cepat & konsisten.",
  },
  { name: "Java", level: 75, group: "Backend", note: "Bahasa utama untuk modding Minecraft." },
  { name: "C#", level: 25, group: "Tools", note: "Scripting gameplay di Unity." },
];

export type SkillCategory = {
  key: string;
  title: string;
  description: string;
  progress: number;
  tags: string[];
  file: string;
};

// Main skill categories — shown on the Home page (summary) and in full on
// the Skill page (with tabs, tags, and progress bars).
export const skillCategories: SkillCategory[] = [
  {
    key: "web-dev",
    title: "Web Developer",
    description: "Create dynamic and interactive websites with HTML, CSS, and JavaScript.",
    progress: 45,
    tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
    file: "web-dev.tsx",
  },
  {
    key: "mc-modding",
    title: "Minecraft Modding",
    description:
      "Item stack size modification, unbreakable block override, uncraftable item crafting, etc with Java.",
    progress: 75,
    tags: ["Java", "Fabric", "Forge"],
    file: "mc-modding.java",
  },
  {
    key: "game-dev",
    title: "Game Developer",
    description: "Create simple PvP Co-op games with Unity and C#.",
    progress: 25,
    tags: ["Unity", "C#"],
    file: "game-dev.cs",
  },
];

// Tech-tag popovers shown when a tag is clicked in the Skill panel.
export type TechInfo = { logo: string; description: string };

export const techDescriptions: Record<string, TechInfo> = {
  HTML: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    description:
      "HyperText Markup Language (HTML) adalah bahasa standar untuk menyusun struktur dan konten halaman web.",
  },
  CSS: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    description:
      "Cascading Style Sheets (CSS) dipakai untuk mengatur tampilan dan layout halaman web.",
  },
  JavaScript: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    description:
      "JavaScript (JS) adalah bahasa pemrograman serbaguna untuk menambahkan interaktivitas pada website.",
  },
  React: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    description:
      "React adalah library JavaScript populer dari Meta untuk membangun UI berbasis komponen.",
  },
  Tailwind: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    description:
      "Tailwind CSS adalah framework CSS utility-first untuk membangun desain custom dengan cepat.",
  },
  Java: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    description:
      "Java adalah bahasa pemrograman berorientasi objek yang banyak dipakai untuk modding Minecraft.",
  },
  Fabric: {
    logo: "fabric",
    description:
      "Fabric adalah toolchain modding Minecraft yang ringan, dikenal cepat update dan performanya bagus.",
  },
  Forge: {
    logo: "forge",
    description:
      "Forge adalah API modding Minecraft yang sudah mapan dengan komunitas besar dan dukungan mod luas.",
  },
  Unity: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg",
    description:
      "Unity adalah game engine cross-platform yang kuat untuk membuat game 2D maupun 3D.",
  },
  "C#": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
    description:
      "C# adalah bahasa modern berorientasi objek dari Microsoft, umum dipakai bersama Unity.",
  },
};

// "TECH STACK" grid of logos.
export type TechLogo = { name: string; src: string };

export const techStackLogos: TechLogo[] = [
  {
    name: "HTML5",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "Bootstrap",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  { name: "Tailwind CSS", src: "https://skillicons.dev/icons?i=tailwind" },
  {
    name: "JavaScript",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "C#",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  {
    name: "Unity",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
  },
  {
    name: "Java",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  { name: "Fabric", src: "fabric" },
  { name: "Forge", src: "forge" },
  { name: "Gradle", src: "https://skillicons.dev/icons?i=gradle" },
  {
    name: "TypeScript",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  { name: "Vite", src: "https://skillicons.dev/icons?i=vite" },
  { name: "PHP", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  {
    name: "Laravel",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  },
  {
    name: "MySQL",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  { name: "Supabase", src: "https://skillicons.dev/icons?i=supabase" },
];

// Things currently being learned. Not currently rendered on any page, kept
// here (ready to use) for a future "Currently Learning" section.
export const currentlyLearning = [
  "Advanced Minecraft mod mechanics",
  "Unity multiplayer networking",
  "TypeScript & backend dengan Supabase",
  "Clean code & project architecture",
];

// "GITHUB ACTIVITY" section — live data fetched client-side using this
// username/profile URL.
export const github = {
  username: "BadutZY",
  profileUrl: "https://github.com/BadutZY",
};
