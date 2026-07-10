import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        royal: {
          DEFAULT: "#1B3A6B",
          dark:    "#0D2146",
          mid:     "#1E4587",
          light:   "#2D5FAA",
        },
        crimson: {
          DEFAULT: "#C8102E",
          dark:    "#A00D25",
          light:   "#E8243F",
          pale:    "#FEF2F4",
        },
        gold: {
          DEFAULT: "#E8A000",
          light:   "#F5C518",
          pale:    "#FEF9EC",
        },
        sky: {
          DEFAULT: "#87CEEB",
          light:   "#B8E4F7",
          pale:    "#EBF5FB",
        },
        lotus: {
          DEFAULT: "#D4447A",
          pale:    "#FDE8F0",
        },
        gray: {
          50:  "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
      spacing: {
        "4.5": "1.125rem",
        "13":  "3.25rem",
        "15":  "3.75rem",
        "18":  "4.5rem",
        "22":  "5.5rem",
        "26":  "6.5rem",
        "30":  "7.5rem",
        "34":  "8.5rem",
        "38":  "9.5rem",
        "42":  "10.5rem",
        "46":  "11.5rem",
        "50":  "12.5rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
        "144": "36rem",
      },
      maxWidth: {
        "screen-xl":  "1280px",
        "screen-2xl": "1440px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        xs:       "0 1px 2px rgba(0,0,0,0.05)",
        soft:     "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
        card:     "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)",
        "card-hover": "0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)",
        medium:   "0 4px 16px rgba(0,0,0,0.1)",
        large:    "0 8px 32px rgba(0,0,0,0.12)",
        royal:    "0 4px 20px rgba(27,58,107,0.25)",
        "royal-lg": "0 8px 32px rgba(27,58,107,0.35)",
        crimson:  "0 4px 20px rgba(200,16,46,0.22)",
        gold:     "0 4px 20px rgba(232,160,0,0.3)",
        sky:      "0 4px 20px rgba(135,206,235,0.3)",
        glow:     "0 0 40px rgba(27,58,107,0.2)",
      },
      animation: {
        "fade-in":   "fadeIn 0.5s ease-out",
        "slide-up":  "slideUp 0.6s cubic-bezier(0.16,1,0.3,1)",
        "slide-down":"slideDown 0.4s cubic-bezier(0.16,1,0.3,1)",
        "scale-in":  "scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        float:       "float 4s ease-in-out infinite",
        shimmer:     "shimmer 2s linear infinite",
        "spin-slow": "spin 3s linear infinite",
        "bounce-sm": "bounceSm 1s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%":   { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceSm: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-4px)" },
        },
      },
      transitionTimingFunction: {
        "out-expo":  "cubic-bezier(0.16, 1, 0.3, 1)",
        spring:      "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      backgroundImage: {
        "sky-gradient":   "linear-gradient(160deg,#87CEEB 0%,#B8E4F7 45%,#EBF5FB 80%,#fff 100%)",
        "royal-gradient": "linear-gradient(135deg,#0D2146 0%,#1B3A6B 60%,#1E4587 100%)",
        "hero-gradient":  "linear-gradient(160deg,#5BB8E8 0%,#87CEEB 25%,#B8E4F7 55%,#EBF5FB 80%,#fff 100%)",
        "crimson-gradient":"linear-gradient(135deg,#C8102E 0%,#E8243F 100%)",
        "gold-gradient":  "linear-gradient(135deg,#E8A000 0%,#F5C518 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
