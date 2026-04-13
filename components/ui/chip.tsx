"use client";

import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  variant?: "assist" | "filter" | "primary";
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({ label, variant = "assist", active = false, onClick, className }: ChipProps) {
  const base =
    "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 select-none";

  const variants = {
    assist: "border border-[var(--outline-variant)] text-[var(--on-surface-variant)] bg-transparent hover:bg-[var(--surface-variant)]",
    filter: active
      ? "bg-[var(--secondary-container)] text-[var(--on-secondary-container)] border border-transparent"
      : "border border-[var(--outline)] text-[var(--on-surface-variant)] bg-transparent hover:bg-[var(--surface-variant)]",
    primary: "bg-[var(--primary-container)] text-[var(--on-primary-container)] border border-transparent",
  };

  return (
    <span
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={cn(base, variants[variant], onClick && "cursor-pointer", className)}
    >
      {label}
    </span>
  );
}
