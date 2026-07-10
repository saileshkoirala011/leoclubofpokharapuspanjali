"use client";

import React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?:      string;
  error?:      string;
  helperText?: string;
  dark?:       boolean;
  fullWidth?:  boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, dark = false, fullWidth = false, className = "", id, ...props }, ref) => {
    const uid = id ?? React.useId();

    const inputCls = [
      "input",
      dark ? "input-dark" : "",
      error ? "input-error" : "",
      className,
    ].filter(Boolean).join(" ");

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label
            htmlFor={uid}
            className={`block text-sm font-semibold mb-1.5 ${dark ? "text-white/70" : "text-gray-700"}`}
          >
            {label}
          </label>
        )}
        <input ref={ref} id={uid} className={inputCls} aria-invalid={!!error} {...props} />
        {error && (
          <p role="alert" className="mt-1.5 text-xs text-crimson font-medium flex items-center gap-1">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className={`mt-1.5 text-xs ${dark ? "text-white/40" : "text-gray-500"}`}>{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
