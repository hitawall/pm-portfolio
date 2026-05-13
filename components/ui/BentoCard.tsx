import { cn } from "@/lib/utils";

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: "1" | "2" | "3";
}

export function BentoCard({ span = "1", className, children, ...props }: BentoCardProps) {
  return (
    <div
      className={cn(
        "bento-glow group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300",
        span === "2" && "md:col-span-2",
        span === "3" && "md:col-span-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
