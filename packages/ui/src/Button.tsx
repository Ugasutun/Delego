import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "background:#2563eb;color:#fff;border:none",
  secondary: "background:#e5e7eb;color:#111;border:none",
  ghost: "background:transparent;color:#2563eb;border:1px solid #2563eb",
};

/** Base button component — TODO: migrate to design system tokens */
export function Button({
  variant = "primary",
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        cursor: "pointer",
        fontWeight: 500,
        ...Object.fromEntries(
          variantStyles[variant].split(";").map((s) => {
            const [k, v] = s.split(":");
            return [k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v?.trim()];
          })
        ),
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
