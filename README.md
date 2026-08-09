<div align="center">

<img src="public/icon.png" height="120">

# Rizky Portofolio

**A Pixel-Art Personal Portfolio Website for BadutZY**

[![Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen?style=for-the-badge)]()
[![Platform](https://img.shields.io/badge/Platform-Web-0078D6?style=for-the-badge)]()
[![Type](https://img.shields.io/badge/Type-Personal%20Portfolio-FF6B35?style=for-the-badge)]()
[![Built With](https://img.shields.io/badge/Built%20With-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)]()
[![Package%20Manager](https://img.shields.io/badge/Package%20Manager-pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)]()

[Visit Website](#) • [About](#about) • [Getting Started](#getting-started) • [Disclaimer](#disclaimer)

---

## About

Pixel Play Portfolio is a personal portfolio website built for BadutZY (Rizky Maulana Putra), a student and beginner programmer from Bogor, Indonesia. The site presents a pixel-art visual identity across every page, from typography and buttons to loading transitions and theme-switch animations, while remaining clean, responsive, and easy to navigate on both desktop and mobile.

The project brings together an identity profile, skills, projects, hardware setup, and social/contact information into a single cohesive experience, along with a curated music playlist section pulling from YouTube Music and Spotify.

---

## Getting Started

No installation is required to view the live site — simply open the deployed URL in a browser. To run the project locally for development, see [Local Development](#local-development) below.

---

## Site Sections

Pixel Play Portfolio is organized into the following pages, each accessible from the main navigation:

| Page | Description |
|---|---|
| Home | Landing page summarizing identity, skills, and featured projects in a condensed pixel-art layout |
| About | Detailed profile, biography, and curated music playlists (YouTube Music and Spotify) |
| Skill | Full breakdown of skill categories with progress indicators and technology tags |
| Project | Detailed showcase of games, mods, and websites, including stack, role, and status for each |
| Equipment | Hardware specifications of the setup used for development (CPU, GPU, storage, and peripherals) |
| Contact | Social links, contact channels, and latest YouTube activity (videos, shorts, and streams) |

---

## Core Features

| Feature | Description |
|---|---|
| Pixel-Art Design System | Consistent pixelated visuals across typography, buttons, panels, and page transitions |
| Animated Loading Screen | Custom pixel-style loading screen shown on initial site load |
| Theme Switching | Light and dark themes with a matching pixelated transition animation, persisted across sessions |
| Language Switching | Content available in English and Indonesian, persisted across sessions |
| Responsive Layout | Optimized pixel-art experience across desktop, tablet, and mobile screen sizes |
| Music Playlists | Embedded YouTube Music and Spotify playlists with per-track details |
| Live Stats Integration | Real-time YouTube channel and GitHub statistics fetched via dedicated hooks |
| Client-Side Routing | Fully typed, file-based routing with automatic code splitting |

---

## Data Sources

Pixel Play Portfolio retrieves supplementary data through the following sources:

| Source | Purpose |
|---|---|
| YouTube Data API | Fetches channel statistics and the latest video, short, and stream content |
| GitHub API | Fetches public repository and contribution statistics |
| Modrinth API | Fetches published mod project statistics |
| Supabase | Backend services and data storage for site features |

---

## Technology

| Layer | Technology |
|---|---|
| Frontend Framework | React 19 with TypeScript |
| Routing | TanStack Router (file-based, with automatic code splitting) |
| Data Fetching | TanStack Query |
| Styling | Tailwind CSS 4 |
| UI Primitives | Radix UI, shadcn-style components |
| Forms & Validation | React Hook Form with Zod |
| Media Playback | hls.js |
| Backend / Database | Supabase |
| Build Tool | Vite |
| Package Manager | pnpm |
| Linting & Formatting | ESLint and Prettier |
| Hosting & Deployment | Vercel |

---

## Local Development

### Prerequisites

- Node.js (version 18 or later is recommended)
- [pnpm](https://pnpm.io/installation)

### Installation

```sh
git clone <this-repository-url>
cd pixel-play-portfolio
pnpm install
```

### Environment Variables

Copy the example environment file and fill in your own credentials:

```sh
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_YOUTUBE_API_KEY` | API key for the YouTube Data API |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project identifier |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (anon) key |
| `VITE_SUPABASE_URL` | Supabase project URL |

### Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Starts the local development server |
| `pnpm build` | Builds the app for production |
| `pnpm build:dev` | Builds the app in development mode |
| `pnpm preview` | Serves the production build locally |
| `pnpm lint` | Runs ESLint across the project |
| `pnpm format` | Formats the project with Prettier |

### Running the Project

```sh
pnpm dev
```

The site will be available locally once the development server starts, with the terminal output showing the exact local URL.

---

## Deployment

The project is configured for deployment on [Vercel](https://vercel.com), using Vite as the build framework and `dist` as the output directory. Client-side routes are rewritten to `index.html` to support direct navigation and page refreshes.

---

</div>

## Project Structure

```
pixel-play-portfolio/
├── public/                # Static assets (icons, images)
├── src/
│   ├── components/        # Reusable UI and layout components
│   ├── config/             # App-level configuration (e.g. YouTube config)
│   ├── data/               # Static content for each page (profile, skills, projects, etc.)
│   ├── hooks/               # Custom hooks for live data (YouTube, GitHub, Modrinth)
│   ├── i18n/                 # English and Indonesian translation files
│   ├── lib/                   # Shared utilities, theming, and i18n logic
│   ├── routes/                 # File-based route definitions
│   ├── main.tsx                 # Application entry point
│   └── router.tsx                 # Router configuration
├── supabase/                        # Supabase project configuration
├── vite.config.ts                    # Vite build configuration
└── vercel.json                        # Vercel deployment configuration
```

---

<div align="center">

## Disclaimer

Pixel Play Portfolio is an independent, personal project built to showcase the work, skills, and setup of its owner, BadutZY. Any third-party content referenced or embedded within the site (such as music tracks, videos, or external project links) belongs to its respective rightful owners. This project is built solely for personal, non-commercial purposes.

---

*Built by BadutZY.*

[Back to Top](#pixel-play-portfolio)

</div>
