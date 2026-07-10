"use client";

import React from "react";
import { motion } from "framer-motion";

export interface CardProps {
  children:   React.ReactNode;
  className?: string;
  hover?:     boolean;
  accent?:    "royal" | "crimson" | "gold" | "none";
  onClick?:   () => void;
}

const accentClass = {
  royal:   "border-t-royal",
  crimson: "border-t-crimson",
  gold:    "border-t-gold",
  none:    "",
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", hover = false, accent = "none", onClick }, ref) => {
    const cls = [
      "card",
      hover ? "card-hover cursor-pointer" : "",
      accent !== "none" ? `border-t-4 ${accentClass[accent]}` : "",
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
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={cls} onClick={onClick}>
        {children}
      </div>
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
