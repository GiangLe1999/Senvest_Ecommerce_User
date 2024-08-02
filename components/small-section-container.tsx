import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SmallSectionContainer({ children, className }: Props) {
  return (
    <div className={cn("mx-auto px-4 xl:max-w-[1200px]", className)}>
      {children}
    </div>
  );
}
