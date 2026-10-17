import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
}

export function Button({
  className,
  variant = "secondary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition disabled:opacity-50",
        size === "sm" ? "px-3 py-1.5 text-sm" : "px-3.5 py-2 text-sm",
        variant === "primary" && "bg-[var(--accent)] text-white dark:text-[#12211c] hover:opacity-90",
        variant === "secondary" &&
          "border border-[var(--line)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-muted)]",
        variant === "ghost" && "hover:bg-[var(--surface-muted)]",
        variant === "danger" && "bg-red-700 text-white hover:bg-red-800",
        className,
      )}
      {...props}
    />
  );
}
