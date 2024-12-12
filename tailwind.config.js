/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    // Configuring only for StylingReactComponents folder.
    "./src/components/StylingReactComponents/SRCButtonWithTailWind.jsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

