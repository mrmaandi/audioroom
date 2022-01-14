const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      fontWeight: {
        "bold": "300",
        "extra-bold": "700"
      },
      backgroundImage: {
        'noiselab': "linear-gradient(to left bottom, rgba(0, 30, 45, 0.8), rgba(43, 108, 176, 0.2)), url('/noiselab.jpg')"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
