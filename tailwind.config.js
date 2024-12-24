/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "png-navtitle-color": "var(--png-color_secondary-100)",
      },
      backgroundImage: {
        "png-primary-gradient": "var(--png-primary-color-gradient)",
      },
    },
  },
  plugins: [],
};
