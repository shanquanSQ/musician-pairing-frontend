/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Libre Franklin", "sans-serif"],
      },

      backgroundColor: {
        fill: {
          primary: "hsl(var(--color-primary) / 1)",
          secondary: "hsl(var(--color-secondary) / 1)",
          bg: "hsl(var(--color-bg) / 1)",
        },
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
