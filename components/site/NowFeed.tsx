import { ArrowUpRight } from "lucide-react";
import { Bezel } from "@/components/ui/Bezel";
import type { NowEntry } from "@/sanity/lib/queries";

const STATUS_STYLES: Record<NowEntry["status"], { dot: string; label: string }> = {
  building: { dot: "bg-accent", label: "text-accent" },
  shipped: { dot: "bg-green-500", label: "text-green-600 dark:text-green-500" },
  learning: { dot: "bg-accent-2", label: "text-accent-2" },
  paused: { dot: "bg-foreground-muted", label: "text-foreground-muted" },
};

function formatSince(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function NowFeed({ entries }: { entries: NowEntry[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => {
        const style = STATUS_STYLES[entry.status] ?? STATUS_STYLES.building;
        const Title = entry.link ? "a" : "div";
        return (
          <Bezel
            key={entry._id}
            shellClassName="transition-shadow duration-300 hover:shadow-[0_0_24px_var(--accent-glow)]"
            className="p-4"
          >
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${style.dot}`} />
              <span
                className={`text-xs font-medium uppercase tracking-wide ${style.label}`}
              >
                {entry.status}
              </span>
              <span className="ml-auto font-mono text-[11px] text-foreground-muted">
                since {formatSince(entry.startedAt)}
              </span>
            </div>
            <Title
              {...(entry.link
                ? {
                    href: entry.link,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className:
                      "group mt-3 flex items-start justify-between gap-2",
                  }
                : { className: "mt-3" })}
            >
              <h3 className="text-sm font-semibold tracking-tight">
                {entry.title}
              </h3>
              {entry.link && (
                <ArrowUpRight
                  size={14}
                  className="mt-0.5 shrink-0 text-foreground-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              )}
            </Title>
            {entry.description && (
              <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                {entry.description}
              </p>
            )}
          </Bezel>
        );
      })}
    </div>
  );
}
