import type { ReactNode, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "sm" | "md" | "lg";
}

const paddings = {
  sm: "p-3",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export function Card({ children, padding = "md", className = "", ...props }: Props) {
  return (
    <div
      className={`bg-surface rounded-card shadow-card border border-border
        hover:shadow-card-hover hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200
        ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
