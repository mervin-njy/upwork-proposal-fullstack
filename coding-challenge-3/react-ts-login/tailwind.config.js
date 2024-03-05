/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html, js, jsx, ts, tsx, css}"],
  theme: {
    extend: {
      fontFamily: {
        karla: ["Karla"],
        montserrat: ["Montserrat"],
        oxygen: ["Oxygen"],
      },
      colors: {
        redAccent: "#ECBFBF", // error / delete
        redMain: "#d63031",
        yellowAccent: "#ffeaa7", // TBC
        yellowMain: "#fdcb6e",
        greenAccent: "#55efc4", // success / add
        greenMain: "#00b894",
        blueAccent: "#74b9ff", // TBC
        blueMain: "#0984e3",
        purpleAccent: "#a29bfe", // primary highlight
        purpleMain: "#6c5ce7",
        main: "#F1FDFF", // teal-emerald-turquoise
        main2: "#A8CAD0",
        main3: "#7EAAB3",
        main4: "#49777F",
        main5: "#3B5F67",
        main6: "#344C51",
        main7: "#2F3D40",
        main8: "#2D3436",
        main9: "#222425",
        mainDarkest: "#141516",
        modalBg: "rgba(66, 79, 82, 0.4)",
      },
    },
  },
  plugins: [],
};
