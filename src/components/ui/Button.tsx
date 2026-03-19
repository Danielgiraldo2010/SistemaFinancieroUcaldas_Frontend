"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly leftIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#003e70] hover:bg-[#002f56] text-white border border-[#003e70]",
  secondary:
    "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300",
  ghost:
    "bg-transparent hover:bg-slate-100 text-slate-700 border border-transparent",
};

export function Button({
  variant = "primary",
  leftIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${variantClasses[variant]} ${className ?? ""}`}
      {...props}
    >
      {leftIcon}
      {children}
    </button>
  );
}
