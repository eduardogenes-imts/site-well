import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      /* Manual de marca: Aeonik (corpo) + Agrandir Narrow (títulos) via next/font em layout.tsx */
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))",
          warm: "hsl(var(--background-warm))",
        },
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontSize: {
        monumental: [
          "clamp(4rem, 12vw, 14rem)",
          { lineHeight: "0.88", letterSpacing: "-0.04em" },
        ],
        architectural: [
          "clamp(2.5rem, 6vw, 7rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em" },
        ],
        "body-lg": [
          "clamp(1.1rem, 1.5vw, 1.4rem)",
          { lineHeight: "1.65" },
        ],
        caption: [
          "0.6875rem",
          { lineHeight: "1.3", letterSpacing: "0.18em" },
        ],
        micro: [
          "0.625rem",
          { lineHeight: "1.2", letterSpacing: "0.22em" },
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;