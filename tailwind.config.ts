import type { Config } from "tailwindcss";

/**
 * Design tokens — ultra-modern dark editorial.
 * Dark canvas, bold display type, electric-gold accent, soft glass surfaces.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary
        forest: {
          deep: "#163C28",
          DEFAULT: "#163C28",
          moss: "#4F7A5A",
        },
        // neutrals — dark canvas system
        bone: "#15151B",
        sand: "#1E1E26",
        warmwhite: "#0A0A0C",
        ink: "#F3F1EA",
        // guaranteed-light text/border token (use on dark-green / image-overlay surfaces)
        paper: "#FAF8F2",
        // earth — brightened for legibility on dark
        clay: "#E2A467",
        umber: "#D6905F",
        // accent — electric gold, the one bold color
        gold: "#E8C46E",
      },
      fontFamily: {
        // High-contrast editorial serif → display
        display: ["var(--font-display)", "Canela", "Cormorant Garamond", "Georgia", "serif"],
        // Clean neutral grotesk → body / UI
        body: ["var(--font-body)", "Neue Haas Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3rem, 7vw, 6.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        h1: ["clamp(2.25rem, 4vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        h2: ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        body: ["1.0625rem", { lineHeight: "1.7" }],
        caption: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.12em" }],
      },
      letterSpacing: {
        label: "0.12em",
        button: "0.08em",
      },
      maxWidth: {
        container: "1280px",
      },
      spacing: {
        gutter: "clamp(20px, 5vw, 80px)",
        section: "clamp(96px, 12vh, 180px)",
      },
      borderRadius: {
        // luxury restraint — max 2px
        sharp: "2px",
      },
      transitionTimingFunction: {
        // shared easing curve from motion.defaults
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
