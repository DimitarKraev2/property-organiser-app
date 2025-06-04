import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const base = "rounded-lg px-4 py-2 text-sm font-medium transition-colors";
    const styles =
      variant === "secondary"
        ? "bg-gray-700 text-white hover:bg-gray-600"
        : "bg-blue-600 text-white hover:bg-blue-700";

    return (
      <button
        ref={ref}
        className={`${base} ${styles} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
