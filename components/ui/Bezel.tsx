import { cn } from "@/lib/utils";

interface BezelProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  shellClassName?: string;
}

/**
 * Double-Bezel nested card: an outer machined "tray" (bezel-shell) holding
 * an inner glass pane (bezel-core). Use for any premium card/panel surface.
 */
export function Bezel({
  as: As = "div",
  className,
  shellClassName,
  children,
  ...props
}: BezelProps) {
  return (
    <div className={cn("bezel-shell", shellClassName)}>
      <As
        className={cn("bezel-core border border-border bg-surface/60 backdrop-blur-2xl", className)}
        {...props}
      >
        {children}
      </As>
    </div>
  );
}
