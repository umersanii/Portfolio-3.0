"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface MdButtonProps {
  children: ReactNode;
  variant?: "filled" | "outlined" | "tonal" | "text" | "fab";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  target?: string;
  rel?: string;
}

export function MdButton({
  children,
  variant = "filled",
  size = "md",
  href,
  onClick,
  className,
  icon,
  disabled,
  target,
  rel,
}: MdButtonProps) {
  const base =
    "ripple inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:opacity-38 disabled:cursor-not-allowed";

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const variants = {
    filled:
      "bg-[var(--primary)] text-[var(--on-primary)] hover:shadow-md active:shadow-sm",
    outlined:
      "border border-[var(--outline)] text-[var(--primary)] hover:bg-[var(--primary-container)]",
    tonal:
      "bg-[var(--secondary-container)] text-[var(--on-secondary-container)] hover:shadow-sm",
    text: "text-[var(--primary)] hover:bg-[var(--primary-container)] px-3",
    fab: "bg-[var(--primary-container)] text-[var(--on-primary-container)] px-5 py-3.5 rounded-2xl shadow-md hover:shadow-lg gap-3",
  };

  const classes = cn(base, sizes[size], variants[variant], className);

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {icon}
      {children}
    </button>
  );
}
