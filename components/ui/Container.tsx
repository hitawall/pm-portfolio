import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: "sm" | "md" | "lg";
}

export function Container({
  as: As = "div",
  size = "md",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <As
      className={cn(
        "mx-auto w-full px-6",
        size === "sm" && "max-w-2xl",
        size === "md" && "max-w-3xl",
        size === "lg" && "max-w-5xl",
        className
      )}
      {...props}
    >
      {children}
    </As>
  );
}
