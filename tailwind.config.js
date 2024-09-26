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
      },
    },
  },
  plugins: [],
};
