/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Pixelify Sans'", "sans-serif;"],
      },

      textColor: {
        txtcolor: {
          primary: "hsl(var(--text-pri) / 1)",
          secondary: "hsl(var(--text-secondary) / 1)",
          neutral: "hsl(var(--text-neutral) / 1)",
        },
      },
    },
    plugins: [],
  },
  variants: {},
  plugins: [],
};
