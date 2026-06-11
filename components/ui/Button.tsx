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
}

export function Button({
  variant = "primary",
  size = "md",
  as: As = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <As
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-[200ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        size === "sm" && "h-8 px-3 text-sm",
        size === "md" && "h-10 px-4 text-sm",
        variant === "primary" &&
          "bg-accent text-accent-foreground shadow-[0_4px_16px_var(--accent-glow)] hover:bg-accent-hover hover:shadow-[0_4px_28px_var(--accent-glow)]",
        variant === "ghost" &&
          "border border-border bg-surface/60 text-foreground hover:border-border-strong hover:bg-surface",
        className
      )}
      {...props}
    >
      {children}
    </As>
  );
}
