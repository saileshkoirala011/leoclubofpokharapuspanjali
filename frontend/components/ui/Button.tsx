"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export interface ButtonProps {
  variant?:   "primary" | "secondary" | "gold" | "crimson" | "ghost" | "outline-white";
  size?:      "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  icon?:      React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children:   React.ReactNode;
  disabled?:  boolean;
  onClick?:   () => void;
  type?:      "button" | "submit" | "reset";
  href?:      string;
}

const variantClass: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:       "btn btn-primary",
  secondary:     "btn btn-secondary",
  gold:          "btn btn-gold",
  crimson:       "btn btn-crimson",
  ghost:         "btn btn-ghost",
  "outline-white": "btn btn-outline-white",
};

const sizeClass: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
  xl: "btn-xl",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant   = "primary",
    size      = "md",
    isLoading = false,
    icon,
    iconRight,
    fullWidth = false,
    className = "",
    children,
    disabled,
    onClick,
    type = "button",
  }, ref) => {
    const cls = [
      variantClass[variant],
      sizeClass[size],
      fullWidth ? "w-full" : "",
      className,
    ].filter(Boolean).join(" ");

    return (
      <motion.button
        ref={ref}
        type={type}
        className={cls}
        disabled={disabled || isLoading}
        onClick={onClick}
        whileHover={!(disabled || isLoading) ? { scale: 1.02 } : {}}
        whileTap={!(disabled || isLoading) ? { scale: 0.97 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          icon && <span className="shrink-0">{icon}</span>
        )}
        {children}
        {!isLoading && iconRight && <span className="shrink-0">{iconRight}</span>}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
