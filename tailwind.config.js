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
        'noiselab': "linear-gradient(to right bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url('/img/bg.jpg')"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
