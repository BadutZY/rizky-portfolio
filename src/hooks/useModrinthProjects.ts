/**
 * useModrinthProjects.ts
 *
 * Fetches all projects (mods) from a Modrinth user via the public API.
 * Uses @tanstack/react-query for caching + background revalidation.
 *
 * Data fetched per project:
 *  - title, description (tagline), icon_url
 *  - downloads, followers, loaders, game_versions, categories
 *  - date_modified, slug (for canonical URL)
 *  - body (full markdown description — fetched separately per project)
 *
 * Usage:
 *   const { data, isLoading, isError } = useModrinthProjects('BadutZY');
 */

import { useQuery } from "@tanstack/react-query";

// ─────────────────────────────────────────────────────────────────────────────
// Types that mirror Modrinth API v2 responses
// ─────────────────────────────────────────────────────────────────────────────

export interface ModrinthProject {
  id: string;
  slug: string;
  title: string;
  description: string; // short tagline
  body: string; // full markdown (fetched per-project)
  icon_url: string | null;
  downloads: number;
  followers: number;
  loaders: string[];
  game_versions: string[];
  categories: string[];
  date_modified: string; // ISO string
  project_type: string; // "mod" | "modpack" | "resourcepack" etc.
  source_url: string | null;
  issues_url: string | null;
  client_side: string;
  server_side: string;
}

// Subset returned from /user/:id/projects (no body field)
interface ModrinthProjectSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon_url: string | null;
  downloads: number;
  followers: number;
  loaders: string[];
  game_versions: string[];
  categories: string[];
  date_modified: string;
  project_type: string;
  source_url: string | null;
  issues_url: string | null;
  client_side: string;
  server_side: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const BASE = "https://api.modrinth.com/v2";

/** Capitalize first letter: "fabric" → "Fabric" */
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Convert loader names to display form */
function normalizeLoaders(loaders: string[]): string[] {
  const map: Record<string, string> = {
    fabric: "Fabric",
    forge: "Forge",
    neoforge: "NeoForge",
    quilt: "Quilt",
    liteloader: "LiteLoader",
    modloader: "ModLoader",
  };
  return loaders.map((l) => map[l.toLowerCase()] ?? capitalize(l)).filter(Boolean);
}

/** Human-readable relative time: "3 days ago"
 *  Returns empty string if iso is falsy or results in NaN. */
export function timeAgo(iso: string | null | undefined): string {
  if (!iso) return "";

  const date = new Date(iso);
  // Guard against invalid date strings → NaN
  if (isNaN(date.getTime())) return "";

  const diff = Date.now() - date.getTime();
  // Guard against negative diff (future dates or clock skew)
  if (diff < 0) return "just now";

  const s = Math.floor(diff / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} minute${m !== 1 ? "s" : ""} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h !== 1 ? "s" : ""} ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} day${d !== 1 ? "s" : ""} ago`;
  const w = Math.floor(d / 7);
  if (w < 5) return `${w} week${w !== 1 ? "s" : ""} ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo} month${mo !== 1 ? "s" : ""} ago`;
  const y = Math.floor(d / 365);
  return `${y} year${y !== 1 ? "s" : ""} ago`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Fetch functions
// ─────────────────────────────────────────────────────────────────────────────

async function fetchUserProjects(username: string): Promise<ModrinthProjectSummary[]> {
  const res = await fetch(`${BASE}/user/${username}/projects`, {
    headers: { "User-Agent": `portfolio-website/1.0 (${username})` },
  });
  if (!res.ok) throw new Error(`Modrinth API error: ${res.status}`);
  const data = await res.json();
  // Only include mod projects, not modpacks/resource packs
  return (data as ModrinthProjectSummary[]).filter((p) => p.project_type === "mod");
}

async function fetchProjectBody(slug: string): Promise<string> {
  const res = await fetch(`${BASE}/project/${slug}`, {
    headers: { "User-Agent": "portfolio-website/1.0" },
  });
  if (!res.ok) return "";
  const data = await res.json();
  return data.body ?? "";
}

async function fetchAllProjects(username: string): Promise<ModrinthProject[]> {
  const summaries = await fetchUserProjects(username);

  // Fetch full body for each project in parallel
  const bodies = await Promise.all(summaries.map((p) => fetchProjectBody(p.slug)));

  return summaries.map((p, i) => ({
    ...p,
    loaders: normalizeLoaders(p.loaders),
    body: bodies[i] ?? "",
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

export function useModrinthProjects(username: string) {
  return useQuery({
    queryKey: ["modrinth-projects", username],
    queryFn: () => fetchAllProjects(username),
    staleTime: 1000 * 60 * 15, // consider data fresh for 15 minutes
    gcTime: 1000 * 60 * 60, // keep in cache for 1 hour
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
