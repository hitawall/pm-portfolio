import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  /** Renders a nested circular trailing icon (button-in-button). */
  icon?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  as: As = "button",
  icon = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <As
      className={cn(
        "group inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300 ease-[var(--ease-spring)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-[0.98]",
        size === "md" && cn("h-10 py-1.5 pl-5 text-sm", icon ? "pr-2" : "pr-5"),
        size === "sm" && cn("h-8 py-1 pl-4 text-sm", icon ? "pr-1.5" : "pr-4"),
        variant === "primary" &&
          "bg-accent text-accent-foreground shadow-[0_4px_16px_var(--accent-glow)] hover:bg-accent-hover hover:shadow-[0_4px_28px_var(--accent-glow)]",
        variant === "ghost" &&
          "border border-border bg-surface/60 text-foreground backdrop-blur-sm hover:border-border-strong hover:bg-surface",
        className
      )}
      {...props}
    >
      {children}
      {icon && (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-[var(--ease-spring)] group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105",
            size === "md" ? "h-7 w-7" : "h-6 w-6",
            variant === "primary" ? "bg-black/10" : "bg-accent/10"
          )}
        >
          <ArrowUpRight size={size === "md" ? 14 : 12} strokeWidth={1.5} />
        </span>
      )}
    </As>
  );
}
