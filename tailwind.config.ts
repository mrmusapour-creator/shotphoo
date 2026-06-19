import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#132232",
        carbon: "#1C3048",
        gold: "#9CA0A6",
        champagne: "#FFFFFF",
        pearl: "#FFFFFF",
        aurora: "#35465A",
        rosefire: "#9CA0A6",
        navy: "#132232",
        deep: "#1C3048",
        royal: "#35465A",
        silver: "#9CA0A6"
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        halo: "0 0 80px rgba(214,180,105,0.14)"
      }
    }
  },
  plugins: []
};

export default config;
