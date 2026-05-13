import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  align?: "center" | "start";
  className?: string;
}

export function SectionLabel({ children, align = "center", className }: Props) {
  return (
    <div className={cn("mb-8 flex items-center gap-4", className)}>
      <span className="h-px flex-1 bg-border" />
      <span
        className={cn(
          "small-caps text-accent",
          align === "start" && "flex-none"
        )}
      >
        {children}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
