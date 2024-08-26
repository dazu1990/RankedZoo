/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        navbar: "64px",
        screenNoNav: "calc(100vh - 64px)",
        gridRow: "calc((100vh - 64px)/6)",
      },
      fontFamily: {
        display: ["Silkscreen", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}