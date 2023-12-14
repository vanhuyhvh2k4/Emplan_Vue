/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FABB18",
        danger: "#c90019",
        secondary: "#FFF8E8",
        background: "#F9F9F9",
        input_label: "#7C838A",
      },
      fontSize: {
        small: "12px",
        medium: "16px",
        large: "20px",
        super: "50px",
      },
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
      },
    },
  },
  plugins: [],
};
