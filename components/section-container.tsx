import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionContainer({ children, className }: Props) {
  return (
    <div className={cn("mx-auto px-4 lg:px-[60px]", className)}>{children}</div>
  );
}
