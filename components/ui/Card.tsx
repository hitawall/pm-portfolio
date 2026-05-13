import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  accentTop?: boolean;
  hoverEffect?: boolean;
}

export function Card({
  accentTop = false,
  hoverEffect = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-8 shadow-sm",
        accentTop && "border-t-2 border-t-accent",
        hoverEffect &&
          "transition-all duration-200 ease-out hover:border-border-strong hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
