import { siteConfig } from "@/lib/config";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubStats {
  totalContributions: number;
  /** 53 weeks of days, oldest first — consumed by ContributionGraph (GH-78) */
  weeks: ContributionDay[][];
  publicRepos: number;
  lastPush: { repo: string; pushedAt: string } | null;
}

const LEVELS: Record<string, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
    repositories(first: 1, privacy: PUBLIC, ownerAffiliations: OWNER, orderBy: {field: PUSHED_AT, direction: DESC}) {
      totalCount
      nodes { name pushedAt }
    }
  }
}`;

interface GraphQLDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
}

/**
 * Server-only. Returns null when GITHUB_TOKEN is unset or anything fails —
 * callers must render a designed fallback, never a broken state.
 */
export async function getGitHubStats(): Promise<GitHubStats | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: siteConfig.githubUsername },
      }),
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;

    const json = await res.json();
    const user = json?.data?.user;
    if (!user) return null;

    const calendar = user.contributionsCollection.contributionCalendar;
    const lastNode = user.repositories.nodes?.[0] ?? null;

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map((week: { contributionDays: GraphQLDay[] }) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: LEVELS[day.contributionLevel] ?? 0,
        }))
      ),
      publicRepos: user.repositories.totalCount,
      lastPush: lastNode
        ? { repo: lastNode.name, pushedAt: lastNode.pushedAt }
        : null,
    };
  } catch {
    return null;
  }
}

export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
