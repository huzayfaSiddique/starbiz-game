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
        background: "#04040c",
        foreground: "#f8fafc",
        cosmic: {
          darkest: "#04040c",
          dark: "#070817",
          panel: "#0e1329",
          card: "#121938",
          cardHover: "#17214a",
          border: "#1d2951",
          borderCyan: "rgba(0, 240, 255, 0.4)",
          borderYellow: "rgba(255, 208, 38, 0.5)",
          borderGreen: "rgba(0, 255, 136, 0.5)",
        },
        neon: {
          cyan: "#00f0ff",
          purple: "#b829ff",
          yellow: "#ffd026",
          green: "#00ff88",
          gold: "#ffb800",
          amber: "#f59e0b",
          crimson: "#ef4444",
        },
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "cyan-glow": "0 0 20px rgba(0, 240, 255, 0.35), inset 0 0 10px rgba(0, 240, 255, 0.15)",
        "yellow-glow": "0 0 25px rgba(255, 208, 38, 0.4), inset 0 0 12px rgba(255, 208, 38, 0.2)",
        "green-glow": "0 0 25px rgba(0, 255, 136, 0.4), inset 0 0 12px rgba(0, 255, 136, 0.2)",
        "purple-glow": "0 0 25px rgba(184, 41, 255, 0.4), inset 0 0 12px rgba(184, 41, 255, 0.2)",
        "gold-glow": "0 0 30px rgba(255, 184, 0, 0.45), inset 0 0 15px rgba(255, 184, 0, 0.25)",
      },
      keyframes: {
        diceShake: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg) scale(1)" },
          "20%": { transform: "translate(-3px, 3px) rotate(-6deg) scale(1.05)" },
          "40%": { transform: "translate(3px, -3px) rotate(6deg) scale(1.08)" },
          "60%": { transform: "translate(-3px, -2px) rotate(-4deg) scale(1.06)" },
          "80%": { transform: "translate(3px, 2px) rotate(4deg) scale(1.03)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.02)" },
        },
      },
      animation: {
        diceShake: "diceShake 0.45s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
