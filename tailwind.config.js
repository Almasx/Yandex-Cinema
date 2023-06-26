/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "#E1E3E6",
      },
      colors: {
        white: {
          DEFAULT: "#FFFFFF",
          secondary: "#F5F5F5",
          tertiary: "#F8F8F8",
        },
        content: {
          primary: "#1B1F23",
          tertiary: "#999FA6",
        },
        gray: {
          1: "#333333",
          3: "#828282",
          5: "#E0E0E0",
        },
        orange: {
          DEFAULT: "#FF5500",
          tertiary: "#FFA375",
          secondary: "#E94E00",
        },
        tertiary: "#999FA6",
      },
    },
  },
  plugins: [],
};
