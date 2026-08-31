import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fluid?: boolean;
}

export function Container({
  children,
  className,
  fluid = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        !fluid && "max-w-[1600px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

