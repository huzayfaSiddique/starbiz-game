import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        parchment: {
          light: "#FDFBF7",
          DEFAULT: "#FAF5EA",
          dark: "#F4ECE0",
          border: "#E2D5C3",
          card: "#FFFFFF",
        },
        gold: {
          light: "#F3DC9B",
          DEFAULT: "#D4AF37",
          dark: "#B88A24",
          deep: "#8C6518",
        },
        ink: {
          navy: "#0D1B2A",
          charcoal: "#1E293B",
          muted: "#475569",
        },
        galaxy: {
          andromeda: "#1B4965",
          centaurus: "#5B2C8E",
          lynx: "#1E6B47",
          milkyway: "#A66D12",
        },
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "parchment-card": "0 8px 24px -4px rgba(138, 99, 54, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.05)",
        "parchment-card-hover": "0 14px 32px -4px rgba(138, 99, 54, 0.18), 0 4px 10px -1px rgba(0, 0, 0, 0.08)",
        "gold-border": "0 0 0 1px #D4AF37, 0 4px 12px rgba(212, 175, 55, 0.25)",
        "die-depth": "0 10px 25px rgba(138, 99, 54, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.8)",
      },
      keyframes: {
        diceShake: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg) scale(1)" },
          "20%": { transform: "translate(-3px, 3px) rotate(-6deg) scale(1.04)" },
          "40%": { transform: "translate(3px, -3px) rotate(6deg) scale(1.06)" },
          "60%": { transform: "translate(-3px, -2px) rotate(-4deg) scale(1.04)" },
          "80%": { transform: "translate(3px, 2px) rotate(4deg) scale(1.02)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "scale(0.97)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        diceShake: "diceShake 0.45s ease-in-out infinite",
        fadeIn: "fadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
