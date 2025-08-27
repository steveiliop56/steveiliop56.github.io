/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.25s ease-in-out",
        "fade-out": "fadeOut 0.25s ease-in-out",
        blink: "blink 1s infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        fadeOut: { "0%": { opacity: 1 }, "100%": { opacity: 0 } },
        blink: { "0%, 100%": { opacity: 1 }, "50%": { opacity: 0 } },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
  applyBaseStyle: false,
  safelist: ["bg-orange-600", "bg-sky-500", "bg-sky-800"],
};
