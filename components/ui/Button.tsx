import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
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
        "inline-flex touch-manipulation items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        size === "sm" && "min-h-[36px] px-3 text-sm",
        size === "md" && "min-h-[44px] px-5 text-sm",
        variant === "primary" && [
          "bg-accent text-accent-foreground shadow-sm",
          "hover:-translate-y-0.5 hover:bg-accent-secondary hover:shadow-md",
          "active:translate-y-0",
        ],
        variant === "secondary" && [
          "border border-foreground bg-transparent text-foreground",
          "hover:border-accent hover:bg-muted hover:text-accent",
        ],
        variant === "ghost" && [
          "bg-transparent text-foreground-muted underline-offset-4",
          "hover:text-accent hover:underline hover:decoration-accent",
        ],
        className
      )}
      {...props}
    >
      {children}
    </As>
  );
}
