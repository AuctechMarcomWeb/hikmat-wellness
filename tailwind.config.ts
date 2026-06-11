import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B5D4B",
          50: "#E8F4F1",
          100: "#C5E3DC",
          200: "#8EC9BA",
          300: "#57B098",
          400: "#2D8F78",
          500: "#0B5D4B",
          600: "#094D3E",
          700: "#073D31",
          800: "#052D24",
          900: "#031D17",
        },
        secondary: {
          DEFAULT: "#D4AF37",
          50: "#FBF7E8",
          100: "#F5EBC2",
          200: "#EDD77B",
          300: "#E5C434",
          400: "#D4AF37",
          500: "#B8962E",
          600: "#9C7C25",
          700: "#80631C",
          800: "#644A13",
          900: "#48310A",
        },
        accent: "#F8F5F0",
        background: "#FFFFFF",
        foreground: "#1A1A1A",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern": "linear-gradient(135deg, #0B5D4B 0%, #1a8a6e 50%, #0d7a5f 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "luxury": "0 4px 24px rgba(11, 93, 75, 0.08), 0 1px 4px rgba(11, 93, 75, 0.04)",
        "luxury-lg": "0 8px 40px rgba(11, 93, 75, 0.12), 0 2px 8px rgba(11, 93, 75, 0.06)",
        "gold": "0 4px 24px rgba(212, 175, 55, 0.2)",
        "card": "0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
