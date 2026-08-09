/**
 * useGithubStats.ts
 *
 * Fetches live public data from the GitHub REST API for a given username:
 *  - profile (avatar, bio, followers, public repo count, created_at)
 *  - repositories (used to total stars/forks and to derive "starred" fallback)
 *  - starred repositories (shown as highlighted repos)
 *  - per-repo language byte counts, aggregated into a language breakdown
 *
 * Uses @tanstack/react-query for caching + background revalidation, mirroring
 * the pattern already used by useModrinthProjects.ts in this project.
 *
 * Usage:
 *   const { data, isLoading, isError, error, refetch, isFetching } = useGithubStats('BadutZY');
 */

import { useQuery } from "@tanstack/react-query";

const LANG_COLORS: Record<string, string> = {
  Java: "#b07219",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  "C#": "#178600",
  CSS: "#563d7c",
  HTML: "#e34c26",
  PHP: "#4F5D95",
  Python: "#3572A5",
  Kotlin: "#A97BFF",
  Rust: "#dea584",
  Go: "#00ADD8",
  Swift: "#F05138",
  GLSL: "#5686a5",
  HLSL: "#aace60",
  Lua: "#000080",
  Shell: "#89e051",
  Groovy: "#e69f56",
};

export function getLangColor(lang: string): string {
  return LANG_COLORS[lang] ?? "#8b949e";
}

export interface GitHubUser {
  name: string;
  login: string;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  description: string | null;
  updated_at: string;
}

export interface PinnedRepo {
  owner: string;
  repo: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  link: string;
}

export interface LangStats {
  name: string;
  bytes: number;
  percentage: number;
}

export interface GitHubData {
  user: GitHubUser;
  repos: GitHubRepo[];
  pinnedRepos: PinnedRepo[];
  langs: LangStats[];
  totalStars: number;
  totalForks: number;
  fetchedAt: number;
}

async function fetchGitHubData(username: string): Promise<GitHubData> {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers }),
  ]);
  if (!userRes.ok) throw new Error(`GitHub API ${userRes.status}`);
  const user: GitHubUser = await userRes.json();
  const repos: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];

  let totalStars = 0;
  let totalForks = 0;
  repos.forEach((r) => {
    totalStars += r.stargazers_count;
    totalForks += r.forks_count;
  });

  let pinnedRepos: PinnedRepo[] = [];
  try {
    const starredRes = await fetch(
      `https://api.github.com/users/${username}/starred?per_page=4&sort=created&direction=desc`,
      { headers },
    );
    if (starredRes.ok) {
      const raw: any[] = await starredRes.json();
      if (Array.isArray(raw)) {
        pinnedRepos = raw.slice(0, 4).map((r) => ({
          owner: r.owner?.login ?? r.full_name?.split("/")[0] ?? username,
          repo: r.name ?? "",
          description: r.description ?? "",
          language: r.language ?? "",
          languageColor: getLangColor(r.language ?? ""),
          stars: Number(r.stargazers_count ?? 0),
          forks: Number(r.forks_count ?? 0),
          link: r.html_url ?? `https://github.com/${r.full_name}`,
        }));
      }
    }
  } catch {
    /* fall back below */
  }

  if (pinnedRepos.length === 0) {
    pinnedRepos = [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4)
      .map((r) => ({
        owner: username,
        repo: r.name,
        description: r.description ?? "",
        language: r.language ?? "",
        languageColor: getLangColor(r.language ?? ""),
        stars: r.stargazers_count,
        forks: r.forks_count,
        link: r.html_url,
      }));
  }

  pinnedRepos = pinnedRepos.slice(0, 4);

  const langBytes: Record<string, number> = {};
  await Promise.allSettled(
    repos
      .filter((r) => r.language)
      .slice(0, 8)
      .map(async (repo) => {
        try {
          const res = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/languages`,
            { headers },
          );
          if (!res.ok) return;
          const d: Record<string, number> = await res.json();
          Object.entries(d).forEach(([lang, b]) => {
            langBytes[lang] = (langBytes[lang] ?? 0) + b;
          });
        } catch {
          /* skip this repo */
        }
      }),
  );

  const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0);
  const langs: LangStats[] = Object.entries(langBytes)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 7);

  return { user, repos, pinnedRepos, langs, totalStars, totalForks, fetchedAt: Date.now() };
}

export function useGithubStats(username: string) {
  return useQuery({
    queryKey: ["github-stats", username],
    queryFn: () => fetchGitHubData(username),
    staleTime: 1000 * 60 * 15, // fresh for 15 minutes
    gcTime: 1000 * 60 * 60, // keep in cache for 1 hour
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
