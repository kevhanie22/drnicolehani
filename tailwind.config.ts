import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0E2A5A",
          deep: "#081E45",
          50: "#F2F5FB",
          100: "#E0E8F4",
          200: "#C9DAEF",
          300: "#9FB7DD",
          400: "#5C7FB6",
          500: "#1E3D7C",
          600: "#0E2A5A",
          700: "#081E45",
          800: "#051633",
          900: "#030E22",
        },
        gold: {
          DEFAULT: "#C8A85B",
          50: "#FAF6EB",
          100: "#F2E8C9",
          200: "#E5D199",
          300: "#D6BB75",
          400: "#C8A85B",
          500: "#B08F40",
          600: "#8C7032",
          700: "#695327",
          800: "#46371B",
          900: "#241C0E",
        },
        cream: "#F7F2E8",
        paper: "#F7F2E8",
        ink: "#0B1220",
        muted: "#6B6256",
        line: "#E5DFD0",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "ui-serif", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2rem, 4vw + 1rem, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.75rem, 2.5vw + 0.75rem, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.25rem, 1.5vw + 0.5rem, 1.5rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,18,32,0.04), 0 8px 24px -8px rgba(11,18,32,0.08)",
        "card-lg": "0 4px 12px rgba(11,18,32,0.06), 0 24px 48px -16px rgba(11,18,32,0.12)",
        ring: "0 0 0 1px rgba(14,42,90,0.08)",
        gold: "0 8px 32px -8px rgba(200,168,91,0.4)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "shimmer": "shimmer 2.5s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
