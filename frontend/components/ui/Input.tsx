"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?:      string;
  error?:      string;
  success?:    boolean;
  helperText?: string;
  dark?:       boolean;
  fullWidth?:  boolean;
  icon?:       React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success = false, helperText, dark = false, fullWidth = false, className = "", id, icon, ...props }, ref) => {
    const uid = id ?? React.useId();
    const [isFocused, setIsFocused] = React.useState(false);

    const inputCls = [
      "input",
      dark ? "input-dark" : "",
      error ? "input-error" : "",
      success && !error ? "border-green-500 focus:border-green-500 focus:shadow-green" : "",
      isFocused && !error ? "ring-2 ring-royal/20" : "",
      icon ? "pl-12" : "",
      className,
    ].filter(Boolean).join(" ");

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label
            htmlFor={uid}
            className={`block text-sm font-semibold mb-1.5 transition-colors ${
              dark 
                ? "text-white/70" 
                : error 
                  ? "text-crimson" 
                  : success 
                    ? "text-green-600" 
                    : "text-gray-700"
            }`}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${dark ? "text-white/40" : "text-gray-400"}`}>
              {icon}
            </div>
          )}
          <motion.div
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <input
              ref={ref}
              id={uid}
              className={inputCls}
              aria-invalid={!!error}
              aria-describedby={error ? `${uid}-error` : helperText ? `${uid}-helper` : undefined}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />
          </motion.div>
          {success && !error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
            >
              <CheckCircle2 className="w-5 h-5" />
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-crimson"
            >
              <AlertCircle className="w-5 h-5" />
            </motion.div>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            id={`${uid}-error`}
            className="mt-1.5 text-xs text-crimson font-medium flex items-center gap-1"
          >
            {error}
          </motion.p>
        )}
        {!error && helperText && (
          <p
            id={`${uid}-helper`}
            className={`mt-1.5 text-xs ${dark ? "text-white/40" : "text-gray-500"}`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
