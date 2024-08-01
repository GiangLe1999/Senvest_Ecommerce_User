import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionContainer({ children, className }: Props) {
  return (
    <div
      className={cn(
        "mx-auto max-w-5xl px-4 xl:max-w-[1430px] xl:px-[30px]",
        className
      )}
    >
      {children}
    </div>
  );
}
