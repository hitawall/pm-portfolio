import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export function Section({
  as: As = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <As className={cn("py-16 sm:py-24", className)} {...props}>
      {children}
    </As>
  );
}
