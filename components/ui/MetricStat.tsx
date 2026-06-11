import { cn } from "@/lib/utils";

interface MetricStatProps {
  label: string;
  value: string;
  delta?: string;
  size?: "sm" | "md";
  className?: string;
}

export function MetricStat({
  label,
  value,
  delta,
  size = "md",
  className,
}: MetricStatProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-mono font-medium tabular-nums",
            size === "md" ? "text-2xl sm:text-3xl" : "text-base"
          )}
        >
          {value}
        </span>
        {delta && (
          <span className="rounded-full bg-accent-subtle px-1.5 py-0.5 font-mono text-[10px] font-medium text-accent">
            {delta}
          </span>
        )}
      </div>
      <span
        className={cn(
          "text-foreground-muted",
          size === "md" ? "mt-1 text-xs" : "text-[11px]"
        )}
      >
        {label}
      </span>
    </div>
  );
}
