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
      sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px",
    },
    extend: {
      fontFamily: {
        sans:    ["Nunito Sans", "Nunito", "system-ui", "sans-serif"],
        display: ["Nunito", "system-ui", "sans-serif"],
      },
      colors: {
        // ── Brand palette ──────────────────────────────────────────────────
        royal: {
          DEFAULT: "#1B3A6B",
          dark:    "#0D2146",
          mid:     "#1E4587",
          light:   "#2D5FAA",
          xlight:  "#4A7FD4",
          pale:    "#EBF3FF",
          ultra:   "#F0F6FF",
        },
        crimson: {
          DEFAULT: "#C8102E",
          dark:    "#A00D25",
          light:   "#E8243F",
          pale:    "#FEF2F4",
        },
        gold: {
          DEFAULT: "#D4A017",
          bright:  "#E8B820",
          pale:    "#FEF9EC",
        },
        // ── "leoSky" — avoids overriding Tailwind's built-in "sky" scale ──
        // Tailwind 3 ships sky-50 … sky-950; redefining "sky" wipes them all.
        // Use "leoSky" for brand sky tones; keep Tailwind's sky-* utilities.
        leoSky: {
          DEFAULT: "#87CEEB",
          mid:     "#5BB8E8",
          light:   "#B8E4F7",
          pale:    "#EBF5FB",
        },
        leoBlue: {
          50:  "#F0F6FF",
          100: "#EBF3FF",
          200: "#D6E8FF",
          300: "#B3D1FF",
          400: "#80B4FF",
          500: "#4A7FD4",
          600: "#2D5FAA",
          700: "#1E4587",
          800: "#1B3A6B",
          900: "#0D2146",
        },
        // ── Surface / neutral shortcuts ────────────────────────────────────
        surface: "#FFFFFF",
        bg:      "#F8FAFC",
        bgAlt:   "#F0F6FF",
        border:  "#D6EAF8",
        muted:   "#64748B",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        xs:           "0 1px 3px rgba(30,64,175,0.06)",
        sm:           "0 2px 8px rgba(30,64,175,0.08)",
        card:         "0 2px 12px rgba(30,64,175,0.08), 0 1px 4px rgba(30,64,175,0.05)",
        "card-hover": "0 8px 32px rgba(30,64,175,0.15), 0 2px 8px rgba(30,64,175,0.08)",
        royal:        "0 4px 20px rgba(27,58,107,0.22)",
        "royal-lg":   "0 8px 36px rgba(27,58,107,0.30)",
        crimson:      "0 4px 20px rgba(200,16,46,0.20)",
        gold:         "0 4px 20px rgba(212,160,23,0.28)",
        glow:         "0 0 40px rgba(27,58,107,0.18)",
        "glow-sky":   "0 0 40px rgba(135,206,235,0.35)",
      },
      animation: {
        "fade-up":    "fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":    "fadeIn 0.5s ease both",
        float:        "float 4s ease-in-out infinite",
        shimmer:      "shimmer 1.5s infinite",
        "spin-slow":  "spin 3s linear infinite",
        "pulse-ring": "pulse-ring 1.5s cubic-bezier(0,0,0.2,1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)"     },
          "50%":     { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
        "pulse-ring": {
          "0%":   { transform: "scale(1)",   opacity: "0.6" },
          "100%": { transform: "scale(1.5)", opacity: "0"   },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        spring:     "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      backgroundImage: {
        "hero-gradient":  "linear-gradient(145deg, #0D2146 0%, #1B3A6B 40%, #1E4587 70%, #2D5FAA 100%)",
        "royal-gradient": "linear-gradient(135deg, #0D2146 0%, #1B3A6B 50%, #1E4587 100%)",
        "sky-gradient":   "linear-gradient(160deg, #5BB8E8 0%, #87CEEB 30%, #B8E4F7 60%, #EBF5FB 85%, #fff 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
