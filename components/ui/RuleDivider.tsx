import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function RuleDivider({ className }: Props) {
  return <hr className={cn("h-px border-0 bg-border", className)} />;
}
