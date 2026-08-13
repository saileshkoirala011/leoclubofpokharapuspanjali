"use client";

import React from "react";
import { motion } from "framer-motion";

export interface CardProps {
  children:   React.ReactNode;
  className?: string;
  hover?:     boolean;
  accent?:    "royal" | "crimson" | "gold" | "none";
  onClick?:   () => void;
  elevated?:  boolean;
}

const accentClass = {
  royal:   "border-t-4 border-royal",
  crimson: "border-t-4 border-crimson",
  gold:    "border-t-4 border-gold",
  none:    "",
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", hover = false, accent = "none", onClick, elevated = false }, ref) => {
    const cls = [
      "card",
      hover ? "cursor-pointer" : "",
      accent !== "none" ? accentClass[accent] : "",
      elevated ? "shadow-lg" : "",
      className,
    ].filter(Boolean).join(" ");

    if (hover) {
      return (
        <motion.div
          ref={ref}
          className={cls}
          onClick={onClick}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          whileHover={{ 
            y: -8, 
            boxShadow: accent === "royal" 
              ? "0 20px 40px rgba(27,58,107,0.15)" 
              : accent === "crimson" 
                ? "0 20px 40px rgba(200,16,46,0.15)" 
                : accent === "gold" 
                  ? "0 20px 40px rgba(232,160,0,0.15)" 
                  : "0 20px 40px rgba(0,0,0,0.1)"
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cls}
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => <div className={`p-6 pb-4 ${className}`}>{children}</div>;

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => <div className={`p-6 pt-2 ${className}`}>{children}</div>;

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => <div className={`p-6 pt-0 border-t border-gray-100 ${className}`}>{children}</div>;

export default Card;
