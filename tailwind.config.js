/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "luxury-gold": "#D4AF37",
        "luxury-gold-hover": "#D4AF37",
        "luxury-gold-active": "#D4AF37",
        "luxury-gold-disabled": "#D4AF37",
        "luxury-gold-gredient-from": "#BF954F",
        "luxury-gold-gredient-via": "#FCF6BA",
        "luxury-gold-gredient-to": "#AA771C",
        "header-dark-gredient-from": "#3A3633",
        "header-dark-gredient-via": "#74706F",
        "header-dark-gredient-to": "#383430",
        "main-dark-gredient-from": "#4B4947",
        "main-dark-gredient-via": "#C6C4C3",
        "main-dark-gredient-to": "#3A3633",
        "luxury-light-background": "#FBF2E7"
      },
    },
  },
  plugins: [],
};
