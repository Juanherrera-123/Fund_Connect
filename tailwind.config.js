/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        igates: {
          900: "#0b0b14",
          800: "#151528",
          700: "#1f1f3d",
          600: "#2f2f5b",
          500: "#5a4bff",
          400: "#7d6bff",
        },
      },
      fontFamily: {
        heading: ["Poppins", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
