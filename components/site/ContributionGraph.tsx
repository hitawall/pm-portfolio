import type { ContributionDay } from "@/lib/github";

interface Props {
  weeks: ContributionDay[][];
  totalContributions: number;
}

const CELL = 10;
const GAP = 2;
const STEP = CELL + GAP;

// Accent-scale fill per contribution level; level 0 stays neutral
function cellFill(level: ContributionDay["level"]): string {
  if (level === 0) return "var(--border)";
  if (level === 4) return "var(--accent)";
  const pct = [0, 35, 60, 80][level];
  return `color-mix(in srgb, var(--accent) ${pct}%, transparent)`;
}

export function ContributionGraph({ weeks, totalContributions }: Props) {
  const width = weeks.length * STEP - GAP;
  const height = 7 * STEP - GAP;

  return (
    <div className="rounded-xl border border-border bg-surface/60 p-4 backdrop-blur-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
          GitHub activity
        </p>
        <p className="font-mono text-[11px] tabular-nums text-foreground-muted">
          {totalContributions.toLocaleString("en-US")} contributions · past 12
          months
        </p>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label={`GitHub contribution graph: ${totalContributions} contributions in the last year`}
      >
        {weeks.map((week, w) =>
          week.map((day, d) => (
            <rect
              key={day.date}
              x={w * STEP}
              y={d * STEP}
              width={CELL}
              height={CELL}
              rx={2}
              fill={cellFill(day.level)}
            />
          ))
        )}
      </svg>
    </div>
  );
}
